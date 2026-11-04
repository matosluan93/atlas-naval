const assert = require("node:assert/strict");
const fs = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");
const path = require("node:path");

const apiPath = path.resolve(__dirname, "../api/batalhas.js");

function handler(fetch) {
  const source = fs.readFileSync(apiPath, "utf8");
  const sandbox = { module: { exports: {} }, require: require("node:module").createRequire(apiPath),
    __dirname: path.dirname(apiPath), fetch, URL, URLSearchParams, AbortSignal, setTimeout, console };
  vm.runInNewContext(source, sandbox);
  return sandbox.module.exports;
}

function response() {
  return {
    headers: {}, code: 0, payload: null,
    setHeader(name, value) { this.headers[name] = value; },
    status(code) { this.code = code; return this; },
    json(payload) { this.payload = payload; return this; },
  };
}

test("debug uses the same collection and exposes no upstream errors", async () => {
  let calls = 0;
  const fetch = async () => {
    calls++;
    throw new Error("private upstream error");
  };
  const run = handler(fetch);
  const first = response(), debug = response();
  await Promise.all([run({ method: "GET" }, first), run({ method: "GET", query: { debug: "1" } }, debug)]);
  const completed = calls;
  const next = response();
  await run({ method: "GET", query: { debug: "1" } }, next);
  assert.equal(calls, completed);
  assert.ok(completed > 0);
  assert.equal(first.code, 200);
  assert.equal(debug.code, 200);
  assert.equal(debug.headers["Cache-Control"], "no-store");
  assert.doesNotMatch(JSON.stringify(debug.payload), /private upstream error|navbattleSheets/);
  assert.ok(debug.payload.fontesComFalha.includes("wikidata"));
});

test("POST does not trigger collection", async () => {
  const run = handler(() => { throw new Error("unexpected fetch"); });
  const out = response();
  await run({ method: "POST" }, out);
  assert.equal(out.code, 405);
  assert.equal(out.headers.Allow, "GET, HEAD");
});

test("external URL validation rejects executable URLs and embedded credentials", () => {
  const source = fs.readFileSync(path.resolve(__dirname, "../app.js"), "utf8");
  const helper = source.match(/const httpsUrl = value => \{[\s\S]*?\n\};/)[0];
  const validate = vm.runInNewContext(helper + "\nhttpsUrl", { URL });
  for (const url of ["javascript:alert(1)", "data:text/html,x", "//example.com/path", "https://user:pass@example.com/"]) {
    assert.equal(validate(url), "");
  }
  assert.equal(validate("https://en.wikipedia.org/wiki/Naval_battle"), "https://en.wikipedia.org/wiki/Naval_battle");
});

test("the patched SheetJS release can parse a synthetic workbook", () => {
  const xlsx = require("xlsx");
  assert.equal(xlsx.version, "0.20.3");
  const book = xlsx.utils.book_new();
  xlsx.utils.book_append_sheet(book, xlsx.utils.aoa_to_sheet([["Name"], ["Synthetic battle"]]), "Battles");
  const decoded = xlsx.read(xlsx.write(book, { type: "buffer", bookType: "xlsx" }));
  assert.equal(xlsx.utils.sheet_to_json(decoded.Sheets.Battles)[0].Name, "Synthetic battle");
});
