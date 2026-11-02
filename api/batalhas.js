/*
  Coletor de batalhas navais.
  Junta várias fontes públicas, completa coordenadas e nomes em português,
  remove duplicatas e devolve uma lista única para o app.

  Fontes:
  - Wikidata (CC0): itens classificados como batalha naval.
  - Wikipedia, "List of naval battles" (CC BY-SA): artigos ligados à lista, com coordenadas.
  - The War Atlas (CC BY 4.0): catálogo de batalhas com coordenadas; entram as navais.
  - NAVBATTLE (Harvard Dataverse): 573 batalhas navais de superfície, 1649–1988.
  - American Civil War Battle Data: engajamentos com navios (arquivo _acw.json).
  - MAREA Scale Models, registro pós-1945 (arquivo _marea.json, localizado via Wikipedia).

  /api/batalhas?debug=1 mostra contagens, tempos e erros por fonte.
*/
const fs = require("fs");
const path = require("path");

const UA = "AtlasNaval/1.0 (https://carta-de-combate-naval.vercel.app)";
const WD = "https://query.wikidata.org/sparql";
const NAVAL_RE = /\b(naval|sea|seas|strait|straits|bay|gulf|channel|sound|bight|cape|harbou?r|roads|convoy|sinking|scuttling|flotilla|fleet|action of|action off|frigate action|blockade|landing|amphibious|raid on .* harbou?r)\b/i;
const BATTLE_TITLE_RE = /\b(battle|action|siege|raid|sinking|bombardment|capture|operation|combat|engagement|attack|incident|blockade|landing|affair|expedition|convoy|skirmish|campaign|invasion|evacuation)\b/i;

const sleep = ms => new Promise(r => setTimeout(r, ms));
async function getJSON(url, opts = {}, tries = 2){
  for(let i = 0; i < tries; i++){
    try{
      const r = await fetch(url, { ...opts, headers: { "User-Agent": UA, Accept: "application/json", ...(opts.headers || {}) } });
      if(r.status === 429 || r.status >= 500){ await sleep(800 * (i + 1)); continue; }
      if(!r.ok) throw new Error(`HTTP ${r.status} em ${url.slice(0, 80)}`);
      return await r.json();
    }catch(e){ if(i === tries - 1) throw e; await sleep(600); }
  }
  throw new Error("Falha ao buscar " + url.slice(0, 80));
}
async function getText(url){
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if(!r.ok) throw new Error(`HTTP ${r.status} em ${url.slice(0, 80)}`);
  return await r.text();
}
async function sparql(q){
  const r = await fetch(WD, { method: "POST", headers: { "User-Agent": UA, Accept: "application/sparql-results+json", "Content-Type": "application/x-www-form-urlencoded" }, body: "query=" + encodeURIComponent(q) });
  if(!r.ok) throw new Error("Wikidata HTTP " + r.status);
  return (await r.json()).results.bindings;
}
function parseCSV(text, sep = ","){
  const rows = []; let row = [], cur = "", q = false;
  for(let i = 0; i < text.length; i++){
    const c = text[i];
    if(q){
      if(c === '"'){ if(text[i + 1] === '"'){ cur += '"'; i++; } else q = false; }
      else cur += c;
    } else if(c === '"') q = true;
    else if(c === sep){ row.push(cur); cur = ""; }
    else if(c === "\n"){ row.push(cur); rows.push(row); row = []; cur = ""; }
    else if(c !== "\r") cur += c;
  }
  if(cur || row.length){ row.push(cur); rows.push(row); }
  const head = (rows.shift() || []).map(h => h.trim());
  return { head, rows: rows.filter(r => r.length > 1).map(r => Object.fromEntries(head.map((h, i) => [h, r[i]]))) };
}
function parseDate(v){
  if(!v) return { year: null, date: null };
  const m = /^(-?)(\d{1,4})(?:-(\d{2})-(\d{2}))?/.exec(String(v).trim());
  if(!m) { const y = /(-?\d{3,4})/.exec(v); return { year: y ? +y[1] : null, date: null }; }
  const year = (m[1] ? -1 : 1) * +m[2];
  const date = !m[1] && m[3] && m[3] !== "00" ? `${m[4] && m[4] !== "00" ? m[4] + "/" : ""}${m[3]}/${m[2]}` : null;
  return { year, date };
}
const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "")
  .replace(/\(.*?\)/g, " ").replace(/\b(the|battle|of|naval|batalha|de|da|do|naval)\b/g, " ").replace(/[^a-z0-9]+/g, " ").trim();
function distKm(a, b, c, d){ const r = Math.PI / 180, x = Math.sin((c - a) * r / 2) ** 2 + Math.cos(a * r) * Math.cos(c * r) * Math.sin((d - b) * r / 2) ** 2; return 12742 * Math.asin(Math.sqrt(x)); }
const titleFromUrl = u => { try{ return decodeURIComponent(String(u).split("/wiki/")[1] || "").replace(/_/g, " "); }catch(e){ return ""; } };

/* ---------- fontes ---------- */
const wdInfo = {};
async function fromWikidata(){
  const q = `SELECT ?b ?bLabel ?enLabel (SAMPLE(?c) AS ?coord) (MIN(?d) AS ?date) (SAMPLE(?pt) AS ?ptT) (SAMPLE(?en) AS ?enT) (SAMPLE(?cl) AS ?conf) (MAX(?isBr) AS ?br) WHERE {
    VALUES ?lbl { "naval battle"@en "amphibious landing"@en "amphibious assault"@en "naval engagement"@en }
    ?cls rdfs:label ?lbl .
    ?b wdt:P31/wdt:P279* ?cls ; wdt:P625 ?c .
    OPTIONAL { ?b wdt:P585 ?d1 } OPTIONAL { ?b wdt:P580 ?d2 }
    BIND(COALESCE(?d1, ?d2) AS ?d)
    OPTIONAL { ?ptA schema:about ?b ; schema:isPartOf <https://pt.wikipedia.org/> ; schema:name ?pt }
    OPTIONAL { ?enA schema:about ?b ; schema:isPartOf <https://en.wikipedia.org/> ; schema:name ?en }
    OPTIONAL { ?b wdt:P361 ?cf . ?cf rdfs:label ?cl . FILTER(LANG(?cl) = "pt") }
    OPTIONAL { ?b rdfs:label ?enLabel . FILTER(LANG(?enLabel) = "en") }
    BIND(IF(EXISTS { ?b wdt:P710|wdt:P17 ?pp . VALUES ?pp { wd:Q155 wd:Q217230 } }, 1, 0) AS ?isBr)
    SERVICE wikibase:label { bd:serviceParam wikibase:language "pt,pt-br,en,es,fr,de,it". }
  } GROUP BY ?b ?bLabel ?enLabel`;
  const out = [];
  for(const x of await sparql(q)){
    const m = /Point\(([-\d.eE]+) ([-\d.eE]+)\)/.exec(x.coord.value); if(!m) continue;
    const { year, date } = parseDate(x.date && x.date.value);
    const qid = x.b.value.split("/").pop();
    const label = x.bLabel && x.bLabel.value, enLabel = x.enLabel && x.enLabel.value;
    wdInfo[qid] = { label, enLabel, lat: +m[2], lng: +m[1], year, date, pt: x.ptT && x.ptT.value, en: x.enT && x.enT.value,
      conf: x.conf && x.conf.value, br: x.br && +x.br.value === 1 };
    out.push({ qid, name: (label && !/^Q\d+$/.test(label)) ? label : enLabel || null, lat: +m[2], lng: +m[1], year, date, src: ["wikidata"] });
  }
  return out;
}

async function wikiLinksWithCoords(page){
  const out = []; let cont = {};
  for(let n = 0; n < 40; n++){
    const p = new URLSearchParams({ action: "query", format: "json", formatversion: "2", generator: "links", titles: page, gplnamespace: "0", gpllimit: "max",
      prop: "coordinates|pageprops|description", ppprop: "wikibase_item", colimit: "max", coprimary: "primary", ...cont });
    const j = await getJSON("https://en.wikipedia.org/w/api.php?" + p);
    for(const pg of (j.query && j.query.pages) || []) out.push(pg);
    if(!j.continue) break;
    cont = j.continue;
  }
  return out;
}
async function fromWikipediaList(){
  const pages = await wikiLinksWithCoords("List of naval battles");
  const sub = pages.filter(p => /^List of .*naval (battles|engagements)/i.test(p.title)).slice(0, 12).map(p => p.title);
  for(const t of sub){ try{ pages.push(...await wikiLinksWithCoords(t)); }catch(e){} }
  const seen = new Set(), out = [];
  for(const p of pages){
    if(seen.has(p.title)) continue; seen.add(p.title);
    if(!p.coordinates || !p.coordinates.length || /^List of/i.test(p.title)) continue;
    if(!BATTLE_TITLE_RE.test(p.title) && !/battle|naval|engagement/i.test(p.description || "")) continue;
    const y = /\((\d{3,4})\)|\b(1\d{3}|20\d{2})\b/.exec(p.title);
    out.push({ qid: p.pageprops && p.pageprops.wikibase_item, en: p.title, name: p.title, lat: p.coordinates[0].lat, lng: p.coordinates[0].lon,
      year: y ? +(y[1] || y[2]) : null, desc: p.description, src: ["wikipedia"] });
  }
  return out;
}

async function fromWarAtlas(navalQids){
  const { rows } = parseCSV(await getText("https://thewaratlas.co/downloads/battles.csv"));
  const out = [];
  for(const r of rows){
    const lat = parseFloat(r.lat), lng = parseFloat(r.lng);
    if(!isFinite(lat) || !isFinite(lng)) continue;
    const qid = (r.wikidata_qid || "").trim() || null;
    const naval = (qid && navalQids.has(qid)) || NAVAL_RE.test(r.title || "");
    if(!naval) continue;
    const { year, date } = parseDate(r.date_iso || r.year);
    out.push({ qid, name: r.title, en: titleFromUrl(r.wikipedia_url) || null, lat, lng, year: year ?? (+r.year || null), date,
      war: (r.war_slug || "").replace(/_/g, " "), result: r.result || null, place: r.location || null, atlas: r.url || null, src: ["waratlas"] });
  }
  return out;
}

const fromNavbattle = require("./_navbattle.js");

function fromACW(){
  const data = JSON.parse(fs.readFileSync(path.join(__dirname, "_acw.json"), "utf8"));
  return data.map(b => {
    const { year, date } = parseDate(b.start);
    return { name: "Battle of " + b.name, ptName: b.name, lat: b.lat, lng: b.lng, year, date, war: "Guerra Civil Americana",
      result: b.result === "Union" ? "Vitória da União" : b.result === "Confederate" ? "Vitória confederada" : "Inconclusivo",
      ships: { us: b.us, cs: b.cs }, forces: b.forces, cas: b.cas, summary: b.summary, src: ["acw"] };
  });
}

async function fromMarea(){
  const titles = JSON.parse(fs.readFileSync(path.join(__dirname, "_marea.json"), "utf8"));
  const out = [];
  for(let i = 0; i < titles.length; i += 45){
    const p = new URLSearchParams({ action: "query", format: "json", formatversion: "2", redirects: "1", titles: titles.slice(i, i + 45).join("|"),
      prop: "coordinates|pageprops|description", ppprop: "wikibase_item", colimit: "max", coprimary: "primary" });
    const j = await getJSON("https://en.wikipedia.org/w/api.php?" + p);
    for(const pg of (j.query && j.query.pages) || []){
      if(pg.missing) continue;
      out.push({ qid: pg.pageprops && pg.pageprops.wikibase_item, en: pg.title, name: pg.title,
        lat: pg.coordinates ? pg.coordinates[0].lat : null, lng: pg.coordinates ? pg.coordinates[0].lon : null, desc: pg.description, src: ["marea"] });
    }
  }
  return out;
}

/* ---------- enriquecimento pela Wikidata ---------- */
async function enrich(qids){
  const info = {};
  const list = [...qids];
  const chunks = [];
  for(let i = 0; i < list.length; i += 200) chunks.push(list.slice(i, i + 200));
  const run = async ch => {
    const q = `SELECT ?b ?bLabel ?enLabel (SAMPLE(?c) AS ?coord) (MIN(?d) AS ?date) (SAMPLE(?pt) AS ?ptT) (SAMPLE(?en) AS ?enT) (SAMPLE(?cl) AS ?conf) (MAX(?isBr) AS ?br) WHERE {
      VALUES ?b { ${ch.map(q => "wd:" + q).join(" ")} }
      OPTIONAL { ?b wdt:P625 ?c } OPTIONAL { ?b wdt:P585 ?d1 } OPTIONAL { ?b wdt:P580 ?d2 } BIND(COALESCE(?d1, ?d2) AS ?d)
      OPTIONAL { ?ptA schema:about ?b ; schema:isPartOf <https://pt.wikipedia.org/> ; schema:name ?pt }
      OPTIONAL { ?enA schema:about ?b ; schema:isPartOf <https://en.wikipedia.org/> ; schema:name ?en }
      OPTIONAL { ?b wdt:P361 ?cf . ?cf rdfs:label ?cl . FILTER(LANG(?cl) = "pt") }
      OPTIONAL { ?b rdfs:label ?enLabel . FILTER(LANG(?enLabel) = "en") }
      BIND(IF(EXISTS { ?b wdt:P710|wdt:P17 ?pp . VALUES ?pp { wd:Q155 wd:Q217230 } }, 1, 0) AS ?isBr)
      SERVICE wikibase:label { bd:serviceParam wikibase:language "pt,pt-br,en,es,fr,de,it". }
    } GROUP BY ?b ?bLabel ?enLabel`;
    for(const x of await sparql(q)){
      const qid = x.b.value.split("/").pop();
      const m = x.coord && /Point\(([-\d.eE]+) ([-\d.eE]+)\)/.exec(x.coord.value);
      const { year, date } = parseDate(x.date && x.date.value);
      info[qid] = { label: x.bLabel && x.bLabel.value, enLabel: x.enLabel && x.enLabel.value, lat: m ? +m[2] : null, lng: m ? +m[1] : null, year, date,
        pt: x.ptT && x.ptT.value, en: x.enT && x.enT.value, conf: x.conf && x.conf.value, br: x.br && +x.br.value === 1 };
    }
  };
  const failed = [];
  for(let i = 0; i < chunks.length; i += 2) await Promise.all(chunks.slice(i, i + 2).map(c => run(c).catch(() => failed.push(c))));
  for(const c of failed){ await sleep(1500); try{ await run(c); }catch(e){ for(let k = 0; k < c.length; k += 80){ try{ await run(c.slice(k, k + 80)); }catch(e2){} } } }
  return info;
}

/* ---------- junção ---------- */
function merge(groups){
  const byQ = new Map(), byName = new Map(), byYear = new Map(), all = [];
  const index = o => {
    const n = norm(o.name); o._n = n;
    if(n){ if(!byName.has(n)) byName.set(n, []); byName.get(n).push(o); }
    if(o.year != null){ if(!byYear.has(o.year)) byYear.set(o.year, []); byYear.get(o.year).push(o); }
  };
  const absorb = (o, r) => {
    for(const k of Object.keys(r)) if(k !== "src" && (o[k] == null || o[k] === "") && r[k] != null) o[k] = r[k];
    for(const s of r.src) if(!o.src.includes(s)) o.src.push(s);
    if(r.qid && !byQ.has(r.qid)) byQ.set(r.qid, o);
  };
  for(const g of groups) for(const r of g){
    if(r.qid && byQ.has(r.qid)){ absorb(byQ.get(r.qid), r); continue; }
    const n = norm(r.name);
    const other = o => !o.src.some(s => r.src.includes(s));
    let hit = (byName.get(n) || []).find(o => other(o) && (!r.qid || !o.qid || o.qid === r.qid) && (o.year == null || r.year == null || Math.abs(o.year - r.year) <= 1));
    if(!hit && r.year != null && r.lat != null){
      hit = (byYear.get(r.year) || []).find(o => other(o) && (!r.qid || !o.qid) && o.lat != null && distKm(o.lat, o.lng, r.lat, r.lng) < 40 && sharesWord(o.name, r.name));
    }
    if(hit){ absorb(hit, r); continue; }
    const o = { ...r, src: [...r.src] };
    all.push(o); index(o);
    if(o.qid) byQ.set(o.qid, o);
  }
  all.forEach(o => delete o._n);
  return all;
}
function sharesWord(a, b){ const A = new Set(norm(a).split(" ").filter(w => w.length > 3)); return norm(b).split(" ").some(w => w.length > 3 && A.has(w)); }

let memo = null;
async function build(dbg){
  const t0 = Date.now(), stats = {}, errors = {};
  const timed = async (k, fn) => { const s = Date.now(); try{ const r = await fn(); stats[k] = { n: r.length, ms: Date.now() - s }; return r; }catch(e){ errors[k] = String(e.message || e); stats[k] = { n: 0, ms: Date.now() - s }; return []; } };
  const wd = await timed("wikidata", fromWikidata);
  const navalQids = new Set(wd.map(x => x.qid));
  const [wp, atlas, nav, marea] = await Promise.all([
    timed("wikipedia", fromWikipediaList),
    timed("waratlas", () => fromWarAtlas(navalQids)),
    timed("navbattle", () => fromNavbattle(dbg, { getJSON, parseDate, UA })),
    timed("marea", fromMarea)
  ]);
  const acw = await timed("acw", async () => fromACW());
  let all = merge([wd, wp, atlas, marea, nav, acw]);
  const need = new Set(all.filter(x => x.qid).map(x => x.qid));
  return { all, stats, errors, t0, need };
}
async function finalize(){
  const dbg = {};
  const { all, stats, errors, t0, need } = await build(dbg);
  const s = Date.now();
  let info = {};
  for(const q of Object.keys(wdInfo)) need.delete(q);
  try{ info = await enrich(need); }catch(e){ errors.enriquecimento = String(e.message || e); }
  Object.assign(info, wdInfo);
  stats.enriquecimento = { n: Object.keys(info).length, ms: Date.now() - s };
  const items = [];
  for(const o of all){
    const w = o.qid ? info[o.qid] : null;
    const lat = o.lat ?? (w && w.lat), lng = o.lng ?? (w && w.lng);
    if(lat == null || lng == null || !isFinite(lat) || !isFinite(lng)) continue;
    const year = (w && w.year != null) ? w.year : o.year;
    let name = (w && w.label && !/^Q\d+$/.test(w.label)) ? w.label : (o.ptName || o.name || (w && w.enLabel));
    if(!name) continue;
    items.push({
      qid: o.qid || null, name, lat: Math.round(lat * 1e4) / 1e4, lng: Math.round(lng * 1e4) / 1e4,
      year: year ?? null, date: (w && w.date) || o.date || null,
      pt: w && w.pt || null, en: (w && w.en) || o.en || null,
      conf: (w && w.conf) || o.war || null, br: !!(w && w.br),
      result: o.result || null, place: o.place || null, desc: o.desc || null,
      ships: o.ships || null, forces: o.forces || null, cas: o.cas || null, summary: o.summary || null,
      atlas: o.atlas || null, sides: o.sides && o.sides.length ? o.sides : null, src: o.src
    });
  }
  items.sort((a, b) => (a.year ?? 1e9) - (b.year ?? 1e9));
  // identificador estável para itens sem QID
  items.forEach(x => { if(!x.qid) x.id = "x" + Math.abs([...`${x.name}|${x.year}`].reduce((h, c) => (h * 31 + c.charCodeAt(0)) | 0, 7)).toString(36); });
  return { items, stats, errors, dbg, ms: Date.now() - t0 };
}

module.exports = async (req, res) => {
  const debug = req.query && (req.query.debug === "1");
  try{
    if(!memo || Date.now() - memo.at > 6 * 3600e3 || debug) memo = { at: Date.now(), data: await finalize() };
    const d = memo.data;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=604800");
    res.setHeader("Access-Control-Allow-Origin", "*");
    if(debug){
      const bySrc = {}; d.items.forEach(x => x.src.forEach(s => bySrc[s] = (bySrc[s] || 0) + 1));
      res.setHeader("Cache-Control", "no-store");
      return res.status(200).json({ total: d.items.length, porFonte: bySrc, coletado: d.stats, erros: d.errors, extra: d.dbg, ms: d.ms, amostra: d.items.filter((_, i) => i % 200 === 0).slice(0, 12) });
    }
    res.status(200).json({ geradoEm: new Date(memo.at).toISOString(), total: d.items.length, items: d.items });
  }catch(e){
    res.status(500).json({ erro: String(e.message || e) });
  }
};
