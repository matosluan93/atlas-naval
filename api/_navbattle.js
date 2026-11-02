/* Leitura da planilha NAVBATTLE (Harvard Dataverse, doi:10.7910/DVN/HGZGCY). */
function parseCoord(v){
  if(v == null) return null;
  const s = String(v).trim();
  if(!s) return null;
  const hemi = [...s.matchAll(/(\d+(?:\.\d+)?)\s*[°º]?\s*(?:(\d+(?:\.\d+)?)\s*['′’]?\s*)?(?:(\d+(?:\.\d+)?)\s*["″”]?\s*)?([NSEWnsew])\b/g)];
  if(hemi.length >= 2){
    let lat = null, lng = null;
    for(const m of hemi){
      const val = (+m[1]) + (m[2] ? +m[2] / 60 : 0) + (m[3] ? +m[3] / 3600 : 0);
      const h = m[4].toUpperCase();
      if(h === "N" || h === "S"){ if(lat == null) lat = h === "S" ? -val : val; }
      else if(lng == null) lng = h === "W" ? -val : val;
    }
    if(lat != null && lng != null) return [lat, lng];
  }
  const d = /(-?\d+(?:\.\d+)?)\s*[,;\s]\s*(-?\d+(?:\.\d+)?)/.exec(s);
  return d ? [+d[1], +d[2]] : null;
}
module.exports = async function fromNavbattle(dbg, { getJSON, parseDate, UA }){
  const XLSX = require("xlsx");
  const meta = await getJSON("https://dataverse.harvard.edu/api/datasets/:persistentId/?persistentId=doi:10.7910/DVN/HGZGCY");
  const files = (((meta.data || {}).latestVersion || {}).files || []).map(f => ({ id: f.dataFile.id, name: f.dataFile.filename || f.label }));
  const pick = files.find(f => /^navbattle\.xlsx$/i.test(f.name)) || files.find(f => /navbattle/i.test(f.name) && /\.xlsx$/i.test(f.name) && !/formula/i.test(f.name));
  if(!pick) throw new Error("Planilha NAVBATTLE não encontrada");
  const r = await fetch(`https://dataverse.harvard.edu/api/access/datafile/${pick.id}`, { headers: { "User-Agent": UA } });
  if(!r.ok) throw new Error("NAVBATTLE HTTP " + r.status);
  const wb = XLSX.read(Buffer.from(await r.arrayBuffer()), { type: "buffer", cellDates: true });
  const sheets = wb.SheetNames.map(n => ({ n, head: ((XLSX.utils.sheet_to_json(wb.Sheets[n], { header: 1, blankrows: false })[0]) || []).map(h => String(h ?? "").trim()) }));
  dbg.navbattleSheets = sheets.map(s => ({ nome: s.n, colunas: s.head }));
  const isLat = h => /(^|[_\s.])lat(itude)?([_\s.]|$)|latitude/i.test(h), isLng = h => /(^|[_\s.])(lon|lng|long|longitude)([_\s.]|$)|longitude/i.test(h);
  const isCoord = h => /^(coord|coords|coordinates|geo|location_coord)$/i.test(h);
  const sh = sheets.find(s => s.head.some(isLat) && s.head.some(isLng)) || sheets.find(s => s.head.some(isCoord));
  if(!sh) throw new Error("Nenhuma aba com coordenadas no NAVBATTLE");
  const H = sh.head, col = test => H.find(test);
  const cLat = col(isLat), cLng = col(isLng), cCoord = col(isCoord);
  const cName = col(h => /^(battle[ _]?name|battle|name|engagement)$/i.test(h)) || col(h => /battle|engagement|name/i.test(h) && !/(id|num|number|code|#)$/i.test(h));
  const cDate = col(h => /start.?date|^date|begin/i.test(h)), cYear = col(h => /^year$|start.?year/i.test(h)) || col(h => /year/i.test(h));
  const cWar = col(h => /^(war|conflict)([ _]?name)?$/i.test(h)) || col(h => /war|conflict/i.test(h) && !/(id|num|number|code)$/i.test(h));
  const cWin = col(h => /winner|victor|outcome|result/i.test(h));
  dbg.navbattleUsado = { aba: sh.n, cLat, cLng, cCoord, cName, cDate, cYear, cWar, cWin };
  if(!cName) throw new Error("Coluna de nome não reconhecida no NAVBATTLE");
  const rows = XLSX.utils.sheet_to_json(wb.Sheets[sh.n], { defval: null });
  if(cCoord) dbg.navbattleExemplosCoord = rows.slice(0, 6).map(r => r[cCoord]);
  const out = [];
  for(const row of rows){
    let lat = parseFloat(row[cLat]), lng = parseFloat(row[cLng]);
    if((!isFinite(lat) || !isFinite(lng)) && cCoord){ const c = parseCoord(row[cCoord]); if(c){ lat = c[0]; lng = c[1]; } }
    if(!isFinite(lat) || !isFinite(lng) || (lat === 0 && lng === 0) || Math.abs(lat) > 90 || Math.abs(lng) > 180){ lat = null; lng = null; }
    let year = null, date = null;
    const dv = cDate ? row[cDate] : null;
    if(dv instanceof Date && !isNaN(dv)){ year = dv.getUTCFullYear(); date = `${String(dv.getUTCDate()).padStart(2, "0")}/${String(dv.getUTCMonth() + 1).padStart(2, "0")}/${year}`; }
    else if(dv){ const p = parseDate(String(dv)); year = p.year; date = p.date; }
    if(year == null && cYear) year = parseInt(row[cYear]) || null;
    if(!date && year && row.day && row.month) date = `${String(row.day).padStart(2, "0")}/${String(row.month).padStart(2, "0")}/${year}`;
    const name = String(row[cName] ?? "").trim();
    if(!name) continue;
    const num = v => (v == null || v === "" || isNaN(+v)) ? null : +v;
    const side = k => row[k] != null && row[k] !== "" ? { name: String(row[k]), cmd: row[k + "_com"] ? String(row[k + "_com"]) : null,
      ships: num(row[k + "_ships"]), lost: num(row[k + "_ships_lost"]), fat: num(row[k + "_fat"]), cas: num(row[k + "_cas"]) } : null;
    const sides = [side("a"), side("b")].filter(Boolean);
    let result = cWin && row[cWin] != null && row[cWin] !== "" ? String(row[cWin]).trim() : null;
    if(result && /^a$/i.test(result) && row.a) result = "Vitória: " + row.a;
    else if(result && /^b$/i.test(result) && row.b) result = "Vitória: " + row.b;
    else if(result && /^(d|draw|tie|0|indecisive|inconclusive)$/i.test(result)) result = "Empate ou indeciso";
    out.push({ name: /battle|action|engagement|combat/i.test(name) ? name : "Battle of " + name, lat, lng, year, date,
      war: cWar ? row[cWar] : null, result, place: row.location ? String(row.location) : null, sides, src: ["navbattle"] });
  }
  // Batalhas sem coordenadas na planilha: localiza pelo artigo da Wikipedia com o mesmo nome.
  const missing = out.filter(o => o.lat == null);
  dbg.navbattleSemCoord = missing.length;
  let found = 0;
  for(let i = 0; i < missing.length; i += 45){
    const batch = missing.slice(i, i + 45);
    try{
      const p = new URLSearchParams({ action: "query", format: "json", formatversion: "2", redirects: "1", titles: batch.map(o => o.name).join("|"),
        prop: "coordinates|pageprops", ppprop: "wikibase_item", colimit: "max", coprimary: "primary" });
      const j = await getJSON("https://en.wikipedia.org/w/api.php?" + p);
      const q = j.query || {};
      const step = {};
      for(const x of q.normalized || []) step[x.from] = x.to;
      for(const x of q.redirects || []) step[x.from] = x.to;
      const pages = {};
      for(const pg of q.pages || []) pages[pg.title] = pg;
      for(const o of batch){
        let t = o.name, guard = 0;
        while(step[t] && guard++ < 3) t = step[t];
        const pg = pages[t];
        if(!pg || pg.missing) continue;
        if(pg.pageprops && pg.pageprops.wikibase_item) o.qid = pg.pageprops.wikibase_item;
        o.en = pg.title;
        if(pg.coordinates && pg.coordinates.length){ o.lat = pg.coordinates[0].lat; o.lng = pg.coordinates[0].lon; found++; }
      }
    }catch(e){}
  }
  dbg.navbattleLocalizadasWikipedia = found;
  return out;
};
module.exports.parseCoord = parseCoord;
