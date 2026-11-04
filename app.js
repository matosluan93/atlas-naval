(() => {
"use strict";
const CFG = window.APP_CONFIG || {};
const CURADAS = window.CURADAS || [];
const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const httpsUrl = value => {
  if (typeof value !== "string") return "";
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : "";
  } catch {
    return "";
  }
};
const PHASE_S = 10;          // segundos de simulação por fase
const R_EARTH = 6371000;
const HOME_H = () => (innerWidth < 600 ? 1.45e7 : 2.2e7);
const COL = { a:"#4ea6e6", b:"#e3584c", auto:"#9fd3ee", gold:"#e9a23b", sunk:"#6b6f73" };

const state = {
  mode: "home", tab: "ficha", filter: "all", era: "", q: "",
  battle: null, auto: null, all: [], loaded: false,
  speed: 1, phase: 0, start: null, n: 0,
  answers: {}, train: null
};

/* ---------- utilidades ---------- */
function dms(v, pos, neg){ const a=Math.abs(v), d=Math.floor(a), m=Math.round((a-d)*60); return `${d}°${String(m===60?0:m).padStart(2,"0")}′${v>=0?pos:neg}`; }
function coord(lat, lng){ return `${dms(lat,"N","S")} ${dms(lng,"E","W")}`; }
function yearLabel(y){ if(y==null) return "s/d"; return y < 0 ? `${-y} a.C.` : String(y); }
function store(k, v){ try{ if(v===undefined) return JSON.parse(localStorage.getItem(k)); localStorage.setItem(k, JSON.stringify(v)); }catch(e){ return null; } }
function distKm(a, b, c, d){ const r=Math.PI/180, x=Math.sin((c-a)*r/2)**2 + Math.cos(a*r)*Math.cos(c*r)*Math.sin((d-b)*r/2)**2; return 12742*Math.asin(Math.sqrt(x)); }
function shuffle(a){ for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
const progress = store("nb_progress") || {};

/* ---------- globo ---------- */
let viewer, dsAll, dsCur, dsAnim, dsMark, labelsLayer, lastMove = 0;
function initGlobe(){
  const token = (CFG.cesiumIonToken || "").trim();
  Cesium.Ion.defaultAccessToken = token;
  // Base garantida: mapa-múndi que acompanha o próprio Cesium (não depende de serviço externo).
  const opts = {
    baseLayer: Cesium.ImageryLayer.fromProviderAsync(Cesium.TileMapServiceImageryProvider.fromUrl(Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"))),
    animation:false, timeline:false, baseLayerPicker:false, geocoder:false, homeButton:false,
    sceneModePicker:false, navigationHelpButton:false, fullscreenButton:false, infoBox:false,
    selectionIndicator:false, creditContainer: $("#credits"), shouldAnimate:false
  };
  if(token) opts.terrain = Cesium.Terrain.fromWorldTerrain();
  viewer = new Cesium.Viewer("cesium", opts);
  // No celular: menos detalhe de tiles e sem antisserrilhado, para manter a animação fluida.
  if(matchMedia("(max-width: 900px)").matches){ viewer.scene.globe.maximumScreenSpaceError = 2.5; viewer.scene.postProcessStages.fxaa.enabled = false; }
  // Satélite em alta resolução por cima, direto dos tiles da Esri (sem chave de acesso).
  viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    maximumLevel: 19, credit: "Imagem de satélite: Esri, Maxar, Earthstar Geographics"
  }));
  const sc = viewer.scene;
  // Globo sempre iluminado: sem lado noturno nem escurecimento da atmosfera ao afastar o zoom.
  sc.globe.enableLighting = false;
  sc.globe.dynamicAtmosphereLighting = false;
  sc.globe.showGroundAtmosphere = false;
  sc.light = new Cesium.DirectionalLight({ direction: new Cesium.Cartesian3(0, 0, -1) });
  sc.preRender.addEventListener(() => { sc.light.direction = Cesium.Cartesian3.clone(sc.camera.directionWC, sc.light.direction); });
  if(sc.sun) sc.sun.show = false;
  if(sc.moon) sc.moon.show = false;
  sc.globe.baseColor = Cesium.Color.fromCssColorString("#16324a");
  sc.globe.depthTestAgainstTerrain = false;
  sc.fog.enabled = true;
  if(sc.skyAtmosphere) sc.skyAtmosphere.show = true;
  sc.screenSpaceCameraController.minimumZoomDistance = 300;

  dsAll = new Cesium.CustomDataSource("todas");
  dsCur = new Cesium.CustomDataSource("curadas");
  dsAnim = new Cesium.CustomDataSource("animacao");
  dsMark = new Cesium.CustomDataSource("marcador");
  [dsAll, dsCur, dsAnim, dsMark].forEach(d => viewer.dataSources.add(d));
  const cl = dsAll.clustering;
  cl.enabled = true; cl.pixelRange = 28; cl.minimumClusterSize = 3;
  cl.clusterEvent.addEventListener((ents, cluster) => {
    cluster.billboard.show = false;
    cluster.point.show = true;
    cluster.point.pixelSize = Math.min(30, 14 + Math.sqrt(ents.length)*2);
    cluster.point.color = Cesium.Color.fromCssColorString("#0e1d2a").withAlpha(.9);
    cluster.point.outlineColor = Cesium.Color.fromCssColorString(COL.auto);
    cluster.point.outlineWidth = 2;
    cluster.point.disableDepthTestDistance = Number.POSITIVE_INFINITY;
    cluster.label.show = true;
    cluster.label.text = String(ents.length);
    cluster.label.font = "600 11px JetBrains Mono, monospace";
    cluster.label.fillColor = Cesium.Color.WHITE;
    cluster.label.style = Cesium.LabelStyle.FILL;
    cluster.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
    cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
    cluster.label.disableDepthTestDistance = Number.POSITIVE_INFINITY;
    cluster.label.eyeOffset = new Cesium.Cartesian3(0,0,-10);
  });

  CURADAS.forEach(b => dsCur.entities.add({
    id: "cur-" + b.id,
    position: Cesium.Cartesian3.fromDegrees(b.lng, b.lat),
    point: { pixelSize: 12, color: Cesium.Color.fromCssColorString(COL.gold), outlineColor: Cesium.Color.fromCssColorString("#1a1206"), outlineWidth: 2, heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, disableDepthTestDistance: Number.POSITIVE_INFINITY },
    label: { text: `${b.name.toUpperCase()} · ${yearLabel(b.year)}`, font: "600 13px Saira Extra Condensed, Arial Narrow, sans-serif", fillColor: Cesium.Color.WHITE, showBackground: true, backgroundColor: Cesium.Color.fromCssColorString("#08131d").withAlpha(.85), backgroundPadding: new Cesium.Cartesian2(6,3), pixelOffset: new Cesium.Cartesian2(0,-18), heightReference: Cesium.HeightReference.CLAMP_TO_GROUND, disableDepthTestDistance: Number.POSITIVE_INFINITY, distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 9.0e6), scaleByDistance: new Cesium.NearFarScalar(1e6, 1, 2e7, .7) },
    properties: { kind: "cur", ref: b.id }
  }));

  const h = new Cesium.ScreenSpaceEventHandler(sc.canvas);
  h.setInputAction(click => {
    const p = sc.pick(click.position);
    if(!p) return;
    if(Array.isArray(p.id)){ // agrupamento
      const e = p.id[0]; const pos = e.position.getValue(Cesium.JulianDate.now());
      const carto = Cesium.Cartographic.fromCartesian(pos);
      const hNow = viewer.camera.positionCartographic.height;
      viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromRadians(carto.longitude, carto.latitude, Math.max(hNow/3, 150000)), duration: 1.2 });
      return;
    }
    const e = p.id;
    if(!(e instanceof Cesium.Entity) || !e.properties) return;
    const kind = e.properties.kind && e.properties.kind.getValue();
    const ref = e.properties.ref && e.properties.ref.getValue();
    if(kind === "cur") openCurated(ref);
    else if(kind === "auto") openAuto(ref);
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  ["LEFT_DOWN","WHEEL","PINCH_START","RIGHT_DOWN"].forEach(t => h.setInputAction(() => { lastMove = performance.now(); }, Cesium.ScreenSpaceEventType[t]));

  viewer.clock.onTick.addEventListener(onTick);
  viewer.camera.setView({ destination: Cesium.Cartesian3.fromDegrees(-35, -5, HOME_H()) });
  $("#status").hidden = true;
}

/* ---------- dados: todas as batalhas navais (Wikidata) ---------- */
const SPARQL = `SELECT ?b ?bLabel (SAMPLE(?c) AS ?coord) (MIN(?d) AS ?date) (SAMPLE(?pt) AS ?ptT) (SAMPLE(?en) AS ?enT) (SAMPLE(?cl) AS ?conf) (MAX(?isBr) AS ?br) WHERE {
  ?cls rdfs:label "naval battle"@en .
  ?b wdt:P31/wdt:P279* ?cls ; wdt:P625 ?c .
  OPTIONAL { ?b wdt:P585 ?d1 } OPTIONAL { ?b wdt:P580 ?d2 }
  BIND(COALESCE(?d1, ?d2) AS ?d)
  OPTIONAL { ?ptA schema:about ?b ; schema:isPartOf <https://pt.wikipedia.org/> ; schema:name ?pt }
  OPTIONAL { ?enA schema:about ?b ; schema:isPartOf <https://en.wikipedia.org/> ; schema:name ?en }
  OPTIONAL { ?b wdt:P361 ?cf . ?cf rdfs:label ?cl . FILTER(LANG(?cl) = "pt") }
  BIND(IF(EXISTS { ?b wdt:P710|wdt:P17 ?pp . VALUES ?pp { wd:Q155 wd:Q217230 } }, 1, 0) AS ?isBr)
  SERVICE wikibase:label { bd:serviceParam wikibase:language "pt,pt-br,en,es,fr,de,it". }
} GROUP BY ?b ?bLabel`;

const SRC_NAMES = { wikidata: "Wikidata", wikipedia: "Wikipedia (lista de batalhas navais)", waratlas: "The War Atlas", navbattle: "NAVBATTLE (Harvard Dataverse)", acw: "American Civil War Battle Data", marea: "MAREA, registro pós-1945" };
async function fetchCollector(){
  const r = await fetch("/api/batalhas");
  if(!r.ok) throw new Error("HTTP " + r.status);
  const j = await r.json();
  if(!j.items || !j.items.length) throw new Error("vazio");
  return j.items.map(x => ({ ...x, qid: x.qid || x.id, real: !!x.qid, br: !!x.br || (x.sides || []).some(s => /brazil|brasil/i.test(s.name)) || /brasil|brazil|cisplatin|paraguai|paraguay|tr[ií]plice/i.test(x.conf || "") }));
}
async function fetchWikidataDirect(){
  const url = "https://query.wikidata.org/sparql?format=json&query=" + encodeURIComponent(SPARQL);
  const r = await fetch(url, { headers: { Accept: "application/sparql-results+json" } });
  if(!r.ok) throw new Error("HTTP " + r.status);
  const j = await r.json();
  const items = [];
  for(const x of j.results.bindings){
    const m = /Point\(([-\d.eE]+) ([-\d.eE]+)\)/.exec(x.coord && x.coord.value || "");
    if(!m) continue;
    const lng = +m[1], lat = +m[2];
    if(!isFinite(lat) || !isFinite(lng)) continue;
    let year = null, date = null;
    if(x.date){ const dm = /^(-?)(\d{1,4})-(\d{2})-(\d{2})/.exec(x.date.value); if(dm){ year = (dm[1] ? -1 : 1) * +dm[2]; date = dm[1] ? null : `${dm[4]}/${dm[3]}/${dm[2]}`; } }
    const qid = x.b.value.split("/").pop();
    const name = x.bLabel ? x.bLabel.value : qid;
    if(/^Q\d+$/.test(name)) continue;
    items.push({ qid, real: true, name, lat, lng, year, date, pt: x.ptT && x.ptT.value, en: x.enT && x.enT.value, conf: x.conf && x.conf.value, br: x.br && +x.br.value === 1, src: ["wikidata"] });
  }
  return items;
}
async function loadAll(force){
  const cached = store("nb_all_v2");
  if(!force && cached && cached.items && Date.now() - cached.t < 2*864e5){ ingest(cached.items); return; }
  setStatus("Carregando todas as batalhas navais…");
  try{
    let items;
    try{ items = await fetchCollector(); }
    catch(e){ items = await fetchWikidataDirect(); }
    store("nb_all_v2", { t: Date.now(), items });
    ingest(items);
    setStatus(null);
  }catch(e){
    if(cached && cached.items){ ingest(cached.items); setStatus(null); return; }
    setStatus(`A lista completa não carregou agora. As ${CURADAS.length} batalhas de estudo completo continuam disponíveis. <button class="btn ghost" id="retry">Tentar de novo</button><button class="x" id="dismiss" aria-label="Fechar aviso">✕</button>`, true);
    $("#count").textContent = `${CURADAS.length} batalhas com estudo completo`;
    const rb = $("#retry"); if(rb) rb.onclick = () => loadAll(true);
    const dz = $("#dismiss"); if(dz) dz.onclick = () => setStatus(null);
    renderAside();
  }
}
function setStatus(html, keep){
  const s = $("#status");
  if(!html){ s.hidden = true; return; }
  s.innerHTML = html; s.hidden = false;
  s.style.pointerEvents = keep ? "auto" : "none";
}
function ingest(items){
  // remove as que já existem no estudo completo
  state.all = items.filter(it => !CURADAS.some(c => it.year != null && Math.abs(c.year - it.year) <= 1 && distKm(c.lat, c.lng, it.lat, it.lng) < 250)).sort((a,b) => (a.year ?? 1e9) - (b.year ?? 1e9));
  state.loaded = true;
  dsAll.entities.suspendEvents();
  dsAll.entities.removeAll();
  const col = Cesium.Color.fromCssColorString(COL.auto), out = Cesium.Color.fromCssColorString("#08131d");
  for(const it of state.all){
    it.ent = dsAll.entities.add({
      position: Cesium.Cartesian3.fromDegrees(it.lng, it.lat),
      point: { pixelSize: 8, color: col, outlineColor: out, outlineWidth: 1.5, disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: { text: it.name, font: "12px Barlow, sans-serif", fillColor: Cesium.Color.WHITE, showBackground: true, backgroundColor: out.withAlpha(.8), pixelOffset: new Cesium.Cartesian2(0,-14), disableDepthTestDistance: Number.POSITIVE_INFINITY, distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0, 6e5) },
      properties: { kind: "auto", ref: it.qid }
    });
  }
  dsAll.entities.resumeEvents();
  applyFilters();
  $("#count").textContent = `${(state.all.length + CURADAS.length).toLocaleString("pt-BR")} batalhas · ${CURADAS.length} com estudo completo`;
  routeFromHash();
}

/* ---------- filtros ---------- */
function eraOk(y){ if(!state.era) return true; if(y == null) return false; const [a,b] = state.era.split(",").map(Number); return y >= a && y <= b; }
function textOk(s){ if(!state.q) return true; return s.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,"").includes(state.q); }
function curVisible(b){
  const f = state.filter;
  if(f === "br" && !b.tags.includes("br")) return false;
  if(f === "amph" && !b.tags.includes("amph")) return false;
  return eraOk(b.year) && textOk(`${b.name} ${b.conflict} ${b.year} ${b.place}`);
}
function autoVisible(it){
  const f = state.filter;
  if(f === "study" || f === "amph") return false;
  if(f === "br" && !it.br) return false;
  return eraOk(it.year) && textOk(`${it.name} ${it.en || ""} ${it.conf || ""} ${it.place || ""} ${it.year ?? ""}`);
}
function applyFilters(){
  const anim = state.mode === "curated";
  CURADAS.forEach(b => { const e = dsCur.entities.getById("cur-" + b.id); if(e) e.show = !anim && curVisible(b); });
  dsAll.show = !anim;
  state.all.forEach(it => { if(it.ent) it.ent.show = autoVisible(it); });
  if(state.mode === "home") renderAside();
}

/* ---------- animação tática (estudo completo) ---------- */
function J(s){ return Cesium.JulianDate.addSeconds(state.start, s, new Cesium.JulianDate()); }
function secs(t){ return Cesium.JulianDate.secondsDifference(t, state.start); }
function openCurated(id){
  const b = CURADAS.find(x => x.id === id); if(!b) return;
  clearMarks();
  state.mode = "curated"; state.battle = b; state.auto = null; state.tab = state.tab || "ficha";
  state.n = b.phases.length; state.phase = -1;
  state.start = Cesium.JulianDate.fromIso8601("2000-01-01T00:00:00Z");
  const clock = viewer.clock;
  clock.startTime = state.start.clone(); clock.stopTime = J(state.n * PHASE_S);
  clock.currentTime = state.start.clone(); clock.clockRange = Cesium.ClockRange.CLAMPED;
  clock.multiplier = state.speed; clock.shouldAnimate = false;

  dsAnim.entities.removeAll();
  let spanKm = 0; b.units.forEach(u => u.track.forEach(p => { spanKm = Math.max(spanKm, distKm(b.lat, b.lng, p[0], p[1])); }));
  const maxR = Math.max(spanKm * 1000 * 0.12, 400);
  const sideIdx = { a: 0, b: 0 };
  b.units.forEach(u => {
    const k = sideIdx[u.side]++;
    const lx = u.side === "a" ? -12 : 12;
    const pos = new Cesium.SampledPositionProperty();
    pos.addSample(J(0), Cesium.Cartesian3.fromDegrees(u.track[0][1], u.track[0][0], 30));
    u.track.forEach((p, i) => pos.addSample(J((i + 1) * PHASE_S), Cesium.Cartesian3.fromDegrees(p[1], p[0], 30)));
    const base = Cesium.Color.fromCssColorString(COL[u.side]), gray = Cesium.Color.fromCssColorString(COL.sunk);
    const isOut = t => u.sunk != null && secs(t) >= (u.sunk + 0.75) * PHASE_S;
    dsAnim.entities.add({
      position: pos,
      point: { pixelSize: u.fixed ? 13 : 15, color: new Cesium.CallbackProperty(t => isOut(t) ? gray : base, false), outlineColor: Cesium.Color.WHITE, outlineWidth: 2, disableDepthTestDistance: Number.POSITIVE_INFINITY },
      label: { text: new Cesium.CallbackProperty(t => isOut(t) ? `${u.label} · fora de combate` : u.label, false), font: "12px JetBrains Mono, monospace", fillColor: Cesium.Color.WHITE, showBackground: true, backgroundColor: Cesium.Color.fromCssColorString("#08131d").withAlpha(.85), backgroundPadding: new Cesium.Cartesian2(6,3), horizontalOrigin: u.side === "a" ? Cesium.HorizontalOrigin.RIGHT : Cesium.HorizontalOrigin.LEFT, pixelOffset: new Cesium.Cartesian2(lx, -14 - k * 22), disableDepthTestDistance: Number.POSITIVE_INFINITY },
      path: u.fixed ? undefined : { leadTime: 0, trailTime: state.n * PHASE_S + 1, resolution: 1, width: 3, material: new Cesium.PolylineDashMaterialProperty({ color: base.withAlpha(.9), dashLength: 14 }) }
    });
  });
  b.phases.forEach((ph, i) => (ph.rings || []).forEach(r => {
    const radius = new Cesium.CallbackProperty(() => maxR * (0.15 + 0.85 * ((performance.now() % 1500) / 1500)), false);
    dsAnim.entities.add({
      availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ start: J(i * PHASE_S), stop: J((i + 1) * PHASE_S) })]),
      position: Cesium.Cartesian3.fromDegrees(r[1], r[0]),
      ellipse: { semiMajorAxis: radius, semiMinorAxis: radius, height: 40,
        material: new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(() => Cesium.Color.fromCssColorString(COL.gold).withAlpha(0.55 * (1 - (performance.now() % 1500) / 1500)), false)) }
    });
  }));

  const pts = [];
  b.units.forEach(u => u.track.forEach(p => pts.push(Cesium.Cartesian3.fromDegrees(p[1], p[0]))));
  b.phases.forEach(ph => (ph.rings || []).forEach(r => pts.push(Cesium.Cartesian3.fromDegrees(r[1], r[0]))));
  const sphere = Cesium.BoundingSphere.fromPoints(pts);
  sphere.radius = Math.max(sphere.radius, 1500);
  viewer.camera.flyToBoundingSphere(sphere, { offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-58), sphere.radius * 3.4), duration: 2.6 });

  $("#hud-dtg").textContent = `${b.dtg} · ${b.era.toUpperCase()}`;
  $("#hud-coord").textContent = coord(b.lat, b.lng);
  $("#legend").innerHTML = `<span><i style="background:${COL.a}"></i>${esc(b.a.name)}</span><span><i style="background:${COL.b}"></i>${esc(b.b.name)}</span><span>Posições esquemáticas</span>`;
  $("#caption").hidden = false; $("#transport").hidden = false;
  $("#track").innerHTML = b.phases.map((p, i) => `<button class="seg" data-i="${i}" aria-label="Fase ${i+1}: ${esc(p.t)}"><b></b><span>${i+1}</span></button>`).join("");
  document.querySelectorAll(".seg").forEach(s => s.addEventListener("click", () => seekPhase(+s.dataset.i, true)));
  applyFilters();
  updatePhaseUI(0);
  setPlaying(false);
  setTimeout(() => { if(state.battle === b && state.mode === "curated") setPlaying(true); }, 2800);
  location.hash = "b-" + b.id;
  renderAside();
}
function seekPhase(i, play){
  i = Math.max(0, Math.min(state.n - 1, i));
  viewer.clock.currentTime = play ? J(i * PHASE_S + 0.001) : J((i + 1) * PHASE_S - 0.01);
  updatePhaseUI(i);
  setPlaying(!!play);
}
function setPlaying(p){
  if(!viewer) return;
  if(p && secs(viewer.clock.currentTime) >= state.n * PHASE_S - 0.02) viewer.clock.currentTime = J(0.001);
  viewer.clock.shouldAnimate = p;
  $("#b-play").setAttribute("aria-label", p ? "Pausar" : "Reproduzir");
  $("#ico-play").innerHTML = p ? '<path d="M3 2h4v12H3zM9 2h4v12H9z"/>' : '<path d="M4 2l10 6-10 6z"/>';
}
function updatePhaseUI(i){
  const b = state.battle; if(!b) return;
  if(i !== state.phase){
    state.phase = i;
    const ph = b.phases[i];
    $("#cap-t").textContent = `Fase ${i+1} de ${state.n} · ${ph.t}`;
    $("#cap-p").textContent = ph.p;
    if(state.tab === "fases") renderAside();
  }
}
function onTick(clock){
  if(state.mode === "curated" && state.battle){
    const s = secs(clock.currentTime);
    const i = Math.min(state.n - 1, Math.max(0, Math.floor(s / PHASE_S)));
    updatePhaseUI(i);
    document.querySelectorAll(".seg b").forEach((el, k) => {
      const w = k < i ? 100 : k > i ? 0 : Math.min(100, (s - i * PHASE_S) / PHASE_S * 100);
      el.style.width = w + "%";
    });
    if(clock.shouldAnimate && s >= state.n * PHASE_S - 0.02) setPlaying(false);
  } else if(state.mode === "home" && performance.now() - lastMove > 5000 && viewer.camera.positionCartographic.height > 8e6){
    viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, -0.0008);
  }
}

/* ---------- batalhas da camada geral ---------- */
const wikiCache = {};
async function wikiSummary(it){
  const key = it.qid;
  if(key in wikiCache) return wikiCache[key];
  const tries = [];
  if(it.pt) tries.push(["pt", it.pt]);
  if(it.en) tries.push(["en", it.en]);
  for(const [lang, title] of tries){
    try{
      const r = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title.replace(/ /g,"_"))}`);
      if(!r.ok) continue;
      const j = await r.json();
      return (wikiCache[key] = { lang, extract: j.extract, img: j.thumbnail && j.thumbnail.source, url: j.content_urls && j.content_urls.desktop && j.content_urls.desktop.page });
    }catch(e){}
  }
  return (wikiCache[key] = null);
}
function clearMarks(){ dsMark.entities.removeAll(); }
function markAt(lat, lng, maxR){
  clearMarks();
  const radius = new Cesium.CallbackProperty(() => maxR * (0.15 + 0.85 * ((performance.now() % 1600) / 1600)), false);
  dsMark.entities.add({ position: Cesium.Cartesian3.fromDegrees(lng, lat), ellipse: { semiMajorAxis: radius, semiMinorAxis: radius, height: 40,
    material: new Cesium.ColorMaterialProperty(new Cesium.CallbackProperty(() => Cesium.Color.fromCssColorString(COL.gold).withAlpha(0.6 * (1 - (performance.now() % 1600) / 1600)), false)) } });
}
function stopAnimation(){
  if(!viewer) return;
  viewer.clock.shouldAnimate = false;
  dsAnim.entities.removeAll();
  $("#caption").hidden = true; $("#transport").hidden = true;
  state.battle = null;
}
function openAuto(qid){
  const it = state.all.find(x => x.qid === qid); if(!it) return;
  stopAnimation();
  state.mode = "auto"; state.auto = it;
  markAt(it.lat, it.lng, 6000);
  viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(it.lng, it.lat), 20000),
    { offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-50), 260000), duration: 2.4 });
  $("#hud-dtg").textContent = it.date || yearLabel(it.year);
  $("#hud-coord").textContent = coord(it.lat, it.lng);
  $("#legend").innerHTML = "";
  applyFilters();
  location.hash = "q-" + it.qid;
  renderAside();
  wikiSummary(it).then(() => { if(state.auto === it) renderAside(); });
}
function goHome(){
  stopAnimation(); clearMarks();
  state.mode = "home"; state.auto = null;
  $("#hud-dtg").textContent = ""; $("#hud-coord").textContent = ""; $("#legend").innerHTML = "";
  applyFilters();
  if(location.hash) history.replaceState(null, "", location.pathname);
  viewer && viewer.camera.flyTo({ destination: Cesium.Cartesian3.fromDegrees(viewer.camera.positionCartographic ? Cesium.Math.toDegrees(viewer.camera.positionCartographic.longitude) : -35, 0, HOME_H()), duration: 2 });
  renderAside();
}

/* ---------- treino ---------- */
function makeQuestion(){
  const pool = state.all.filter(x => x.year != null);
  const roll = Math.random();
  if(roll < 0.4 || pool.length < 10){
    const b = CURADAS[Math.floor(Math.random() * CURADAS.length)];
    const q = b.quiz[Math.floor(Math.random() * b.quiz.length)];
    return { text: q.q, ctx: `Batalha: ${b.name} (${yearLabel(b.year)})`, opts: q.o, c: q.c, go: () => flyTo(b.lat, b.lng, b.alt * R_EARTH * 0.6) };
  }
  const it = pool[Math.floor(Math.random() * pool.length)];
  const withConf = pool.filter(x => x.conf);
  if(it.conf && roll < 0.7 && withConf.length > 20){
    const others = shuffle([...new Set(withConf.map(x => x.conf).filter(c => c !== it.conf))]).slice(0, 3);
    const opts = shuffle([it.conf, ...others]);
    return { text: `De qual conflito fez parte a batalha "${it.name}"?`, opts, c: opts.indexOf(it.conf), go: () => flyTo(it.lat, it.lng, 300000), qid: it.qid };
  }
  const right = yearLabel(it.year);
  const set = new Set([right]);
  const spread = Math.max(5, Math.round(Math.abs(it.year) * 0.02) + 5);
  while(set.size < 4){ const d = Math.round((Math.random() * 2 - 1) * spread * 3); if(d) set.add(yearLabel(it.year + d)); }
  const opts = shuffle([...set]);
  return { text: `Em que ano ocorreu a batalha "${it.name}"?`, opts, c: opts.indexOf(right), go: () => flyTo(it.lat, it.lng, 300000), qid: it.qid };
}
function flyTo(lat, lng, range){
  viewer.camera.flyToBoundingSphere(new Cesium.BoundingSphere(Cesium.Cartesian3.fromDegrees(lng, lat), range * .1),
    { offset: new Cesium.HeadingPitchRange(0, Cesium.Math.toRadians(-55), range), duration: 2 });
  markAt(lat, lng, Math.max(range * 0.03, 3000));
}
function openTrain(){
  stopAnimation(); clearMarks();
  state.mode = "train";
  state.train = { n: 0, right: 0, cur: makeQuestion(), ans: null };
  applyFilters();
  renderAside();
}

/* ---------- painel ---------- */
function rowsCurated(){
  return CURADAS.filter(curVisible).map(b => `<li><button data-cur="${esc(b.id)}"><span class="y">${esc(yearLabel(b.year))}</span><span class="n"><strong>${esc(b.name)}</strong><span>${esc(b.conflict)}</span></span><span>${progress[b.id] != null ? `<span class="done">${progress[b.id]}/${b.quiz.length}</span>` : `<span class="badge">Estudo</span>`}</span></button></li>`).join("");
}
function renderAside(){
  const A = $("#aside");
  if(state.mode === "home"){
    const cur = CURADAS.filter(curVisible);
    const auto = state.all.filter(autoVisible);
    const LIM = 250;
    const brCount = CURADAS.filter(b => b.tags.includes("br")).length + state.all.filter(x => x.br).length;
    A.innerHTML = `<div class="body">
      <h2>Todas as batalhas navais</h2>
      <p class="sub">Toque num ponto do globo ou escolha na lista. As batalhas em dourado têm animação tática, lições, papel dos fuzileiros e quiz.</p>
      <div class="stats"><div class="stat"><b>${(state.all.length + CURADAS.length).toLocaleString("pt-BR")}</b><span>no globo</span></div><div class="stat"><b>${CURADAS.length}</b><span>estudo completo</span></div><div class="stat"><b>${brCount}</b><span>com o Brasil</span></div></div>
      ${cur.length ? `<div class="sec">Estudo completo · ${cur.length}</div><ul class="results">${rowsCurated()}</ul>` : ""}
      ${state.loaded ? `<div class="sec">Ficha com resumo · ${auto.length.toLocaleString("pt-BR")}</div>
      <ul class="results">${auto.slice(0, LIM).map(it => `<li><button data-auto="${esc(it.qid)}"><span class="y">${esc(yearLabel(it.year))}</span><span class="n"><strong>${esc(it.name)}</strong>${it.conf ? `<span>${esc(it.conf)}</span>` : ""}</span><span class="badge auto">Ficha</span></button></li>`).join("")}</ul>
      ${auto.length > LIM ? `<p class="note">Mostrando ${LIM} de ${auto.length.toLocaleString("pt-BR")}. Use a busca ou a época para encontrar as demais; todas estão no globo.</p>` : ""}` : `<p class="note">Carregando a lista completa…</p>`}
      <p class="note">Fontes: Wikidata (CC0), Wikipedia (CC BY-SA), The War Atlas (CC BY 4.0, thewaratlas.co), NAVBATTLE (Harvard Dataverse), American Civil War Battle Data e registro MAREA pós-1945. Imagem de satélite: Esri World Imagery. Números de forças e perdas variam entre fontes e aparecem como aproximados.</p>
    </div>`;
    A.querySelectorAll("[data-cur]").forEach(x => x.onclick = () => openCurated(x.dataset.cur));
    A.querySelectorAll("[data-auto]").forEach(x => x.onclick = () => openAuto(x.dataset.auto));
    return;
  }
  if(state.mode === "auto"){
    const it = state.auto, w = wikiCache[it.qid];
    const wikiUrl = httpsUrl(w?.url), wikiImage = httpsUrl(w?.img), atlasUrl = httpsUrl(it.atlas);
    A.innerHTML = `<div class="ahead"><button class="back" id="back">← Todas</button><span class="badge auto">Ficha</span></div>
    <div class="body">
      <h2>${esc(it.name)}</h2>
      <p class="sub">${it.conf ? esc(it.conf) : it.desc ? esc(it.desc) : "Batalha naval"}</p>
      ${wikiImage ? `<img class="thumb" src="${esc(wikiImage)}" alt="">` : ""}
      <dl class="facts"><dt>Data</dt><dd class="mono">${esc(it.date || yearLabel(it.year))}</dd>
        <dt>Local</dt><dd>${it.place ? esc(it.place) + "<br>" : ""}<span class="mono">${coord(it.lat, it.lng)}</span></dd>
        ${it.result ? `<dt>Resultado</dt><dd>${esc(it.result)}</dd>` : ""}
        ${it.br ? `<dt>Brasil</dt><dd>Participação brasileira registrada</dd>` : ""}
        ${it.sides ? it.sides.map((s, k) => `<dt>${k ? "Lado B" : "Lado A"}</dt><dd><span class="sq" style="background:${k ? COL.b : COL.a}"></span><strong>${esc(s.name)}</strong>${s.cmd ? `<br>Comando: ${esc(s.cmd)}` : ""}${s.ships != null ? `<br>Navios: ${esc(s.ships)}` : ""}${s.lost != null ? ` · perdidos: ${esc(s.lost)}` : ""}${s.fat != null ? `<br>Mortos: ${esc(s.fat.toLocaleString("pt-BR"))}` : ""}${s.cas != null ? ` · baixas: ${esc(s.cas.toLocaleString("pt-BR"))}` : ""}</dd>`).join("") : ""}
        ${it.ships ? `<dt>Navios</dt><dd><span class="sq" style="background:${COL.a}"></span>União: ${esc((it.ships.us || []).join(", ") || "—")}<br><span class="sq" style="background:${COL.b}"></span>Confederação: ${esc((it.ships.cs || []).join(", ") || "—")}</dd>` : ""}
        ${it.forces ? `<dt>Forças</dt><dd>${esc(it.forces)}</dd>` : ""}
        ${it.cas ? `<dt>Baixas</dt><dd>${esc(it.cas)}</dd>` : ""}
        ${it.summary ? `<dt>Síntese</dt><dd>${esc(it.summary)}</dd>` : ""}
        <dt>Fontes</dt><dd>${(it.src || ["wikidata"]).map(s => esc(SRC_NAMES[s] || s)).join(" · ")}</dd></dl>
      <div style="margin-top:14px">${w === undefined ? `<p class="sub">Carregando resumo da Wikipedia…</p>` : w && w.extract ? `<p>${esc(w.extract)}</p>${w.lang === "en" ? `<p class="note">Resumo disponível apenas em inglês.</p>` : ""}` : `<p class="sub">Sem resumo disponível para esta batalha.</p>`}</div>
      <div class="row-actions">${wikiUrl ? `<a class="btn ghost" href="${esc(wikiUrl)}" target="_blank" rel="noopener">Ler na Wikipedia</a>` : ""}${it.real !== false && /^Q\d+$/.test(it.qid) ? `<a class="btn ghost" href="https://www.wikidata.org/wiki/${esc(it.qid)}" target="_blank" rel="noopener">Dados na Wikidata</a>` : ""}${atlasUrl ? `<a class="btn ghost" href="${esc(atlasUrl)}" target="_blank" rel="noopener">The War Atlas</a>` : ""}<button class="btn" id="to-train">Treinar</button></div>
      <p class="note">Esta batalha ainda não tem animação tática. As batalhas em dourado no globo têm o estudo completo.</p>
    </div>`;
    $("#back").onclick = goHome; $("#to-train").onclick = openTrain;
    return;
  }
  if(state.mode === "train"){
    const T = state.train, q = T.cur;
    A.innerHTML = `<div class="ahead"><button class="back" id="back">← Todas</button><span class="badge">Treino</span></div>
    <div class="body">
      <h2>Treino</h2>
      <p class="score">${T.n} respondidas · ${T.right} certas${T.n ? ` · ${Math.round(T.right / T.n * 100)}%` : ""}</p>
      ${q.ctx ? `<p class="sub">${esc(q.ctx)}</p>` : ""}
      <div class="q"><p>${esc(q.text)}</p><div class="opts">${q.opts.map((o, j) => { let c = ""; if(T.ans != null){ if(j === q.c) c = "right"; else if(j === T.ans) c = "wrong"; } return `<button class="opt ${c}" data-o="${j}" ${T.ans != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div></div>
      ${T.ans != null ? `<div class="row-actions"><button class="btn" id="nextq">Próxima pergunta</button>${q.qid ? `<button class="btn ghost" id="seeq">Ver a ficha</button>` : ""}</div>` : ""}
      <p class="note">As perguntas misturam o quiz das batalhas de estudo completo com perguntas geradas a partir de todas as batalhas do globo.</p>
    </div>`;
    $("#back").onclick = goHome;
    A.querySelectorAll(".opt").forEach(o => o.onclick = () => { T.ans = +o.dataset.o; T.n++; if(T.ans === q.c) T.right++; q.go(); renderAside(); });
    const nx = $("#nextq"); if(nx) nx.onclick = () => { T.cur = makeQuestion(); T.ans = null; renderAside(); };
    const sq = $("#seeq"); if(sq) sq.onclick = () => openAuto(q.qid);
    return;
  }
  // estudo completo
  const b = state.battle, W = b.winner;
  const tabs = [["ficha","Ficha"],["fases","Fases"],["licoes","Lições"],["fn","Fuzileiros"],["quiz","Quiz"]];
  let body = "";
  if(state.tab === "ficha"){
    body = `<h2>${b.name.startsWith("Passo") || b.name.startsWith("Passagem") || b.name.startsWith("Combate") || b.name.startsWith("Afundamento") ? esc(b.name) : "Batalha de " + esc(b.name)}</h2><p class="sub">${esc(b.conflict)}</p>
    <dl class="facts"><dt>Data</dt><dd class="mono">${esc(b.dtg)}</dd><dt>Local</dt><dd>${esc(b.place)}<br><span class="mono">${coord(b.lat, b.lng)}</span></dd></dl>
    <div class="sides">${["a","b"].map(s => `<div class="side ${s}">${W === s ? '<div class="win">VENCEDOR</div>' : W == null ? '<div class="win" style="color:var(--muted)">INDECISO</div>' : ""}<h3>${esc(b[s].name)}</h3><p>${esc(b[s].who)}</p></div>`).join("")}</div>
    <dl class="facts">
      <dt>Comando</dt><dd><span class="sq" style="background:${COL.a}"></span>${esc(b.a.cmd)}<br><span class="sq" style="background:${COL.b}"></span>${esc(b.b.cmd)}</dd>
      <dt>Forças</dt><dd><span class="sq" style="background:${COL.a}"></span>${esc(b.a.force)}<br><span class="sq" style="background:${COL.b}"></span>${esc(b.b.force)}</dd>
      <dt>Perdas</dt><dd><span class="sq" style="background:${COL.a}"></span>${esc(b.a.loss)}<br><span class="sq" style="background:${COL.b}"></span>${esc(b.b.loss)}</dd>
      <dt>Resultado</dt><dd>${esc(b.result)}</dd>
    </dl>`;
  } else if(state.tab === "fases"){
    body = `<h2>${esc(b.name)} em ${b.phases.length} fases</h2><p class="sub">Toque numa fase para vê-la no globo.</p><ol class="phases">${b.phases.map((p, i) => `<li data-i="${i}" aria-current="${i === state.phase}" tabindex="0"><span class="h">FASE ${i+1} · ${esc(p.h)}</span><strong>${esc(p.t)}</strong><p>${esc(p.p)}</p></li>`).join("")}</ol>`;
  } else if(state.tab === "licoes"){
    body = `<h2>Lições táticas</h2><p class="sub">O que ${esc(b.name)} ensina ao planejador.</p><ul class="lessons">${b.lessons.map(l => `<li><strong>${esc(l.t)}</strong><span>${esc(l.d)}</span></li>`).join("")}</ul>`;
  } else if(state.tab === "fn"){
    body = `<h2>Papel dos fuzileiros</h2><p class="sub">Tropa embarcada e infantaria naval em ${esc(b.name)}.</p><div class="fn"><span class="tag">Infantaria naval</span><p>${esc(b.fn)}</p></div>`;
  } else {
    const ans = state.answers[b.id] || (state.answers[b.id] = {});
    const done = Object.keys(ans).length, right = b.quiz.filter((q, i) => ans[i] === q.c).length;
    body = `<h2>Revisão</h2><p class="score">${done}/${b.quiz.length} respondidas · ${right} certas</p>${b.quiz.map((q, i) => `<div class="q"><p>${i+1}. ${esc(q.q)}</p><div class="opts">${q.o.map((o, j) => { let c = ""; if(ans[i] != null){ if(j === q.c) c = "right"; else if(j === ans[i]) c = "wrong"; } return `<button class="opt ${c}" data-q="${i}" data-o="${j}" ${ans[i] != null ? "disabled" : ""}>${esc(o)}</button>`; }).join("")}</div></div>`).join("")}<button class="btn ghost" id="quiz-reset">Refazer quiz</button>`;
  }
  A.innerHTML = `<div class="ahead"><button class="back" id="back">← Todas</button><span class="badge">Estudo completo</span></div>
  <div class="tabs" role="tablist">${tabs.map(([k, l]) => `<button class="tab" role="tab" data-t="${k}" aria-selected="${state.tab === k}">${l}</button>`).join("")}</div>
  <div class="body" role="tabpanel">${body}</div>`;
  $("#back").onclick = goHome;
  A.querySelectorAll(".tab").forEach(t => t.onclick = () => { state.tab = t.dataset.t; renderAside(); });
  A.querySelectorAll("ol.phases li").forEach(li => { const go = () => seekPhase(+li.dataset.i, true); li.onclick = go; li.onkeydown = e => { if(e.key === "Enter") go(); }; });
  A.querySelectorAll(".opt[data-q]").forEach(o => o.onclick = () => {
    const ans = state.answers[b.id]; ans[o.dataset.q] = +o.dataset.o;
    if(Object.keys(ans).length === b.quiz.length){ progress[b.id] = b.quiz.filter((q, i) => ans[i] === q.c).length; store("nb_progress", progress); }
    renderAside();
  });
  const rs = $("#quiz-reset"); if(rs) rs.onclick = () => { state.answers[b.id] = {}; renderAside(); };
}

/* ---------- rotas ---------- */
function routeFromHash(){
  const h = location.hash.slice(1);
  if(h.startsWith("b-")) { if(!state.battle || state.battle.id !== h.slice(2)) openCurated(h.slice(2)); }
  else if(h.startsWith("q-") && state.loaded) { if(!state.auto || state.auto.qid !== h.slice(2)) openAuto(h.slice(2)); }
}

/* ---------- controles ---------- */
document.querySelectorAll(".chip[data-f]").forEach(c => c.onclick = () => {
  state.filter = c.dataset.f;
  document.querySelectorAll(".chip[data-f]").forEach(x => x.setAttribute("aria-pressed", x === c));
  if(state.mode !== "home") goHome(); else applyFilters();
});
$("#era").onchange = e => { state.era = e.target.value; if(state.mode !== "home") goHome(); else applyFilters(); };
let qt;
$("#q").oninput = e => { clearTimeout(qt); qt = setTimeout(() => { state.q = e.target.value.trim().toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu,""); if(state.mode !== "home") goHome(); else applyFilters(); }, 180); };
$("#b-train").onclick = openTrain;
$("#b-home").onclick = goHome;
$("#b-play").onclick = () => setPlaying(!viewer.clock.shouldAnimate);
$("#b-prev").onclick = () => seekPhase(state.phase - 1, false);
$("#b-next").onclick = () => seekPhase(state.phase + 1, false);
$("#b-speed").onclick = () => { state.speed = state.speed === 1 ? 2 : state.speed === 2 ? 0.5 : 1; viewer.clock.multiplier = state.speed; $("#b-speed").textContent = (state.speed === .5 ? "½" : state.speed) + "×"; };
$("#b-labels").onclick = e => {
  const on = e.currentTarget.getAttribute("aria-pressed") !== "true";
  e.currentTarget.setAttribute("aria-pressed", on);
  if(on && !labelsLayer) labelsLayer = viewer.imageryLayers.addImageryProvider(new Cesium.UrlTemplateImageryProvider({
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}",
    maximumLevel: 19, credit: "Nomes: Esri"
  }));
  if(labelsLayer) labelsLayer.show = on;
};
window.addEventListener("hashchange", routeFromHash);

/* ---------- início ---------- */
try { initGlobe(); }
catch(e){ setStatus("Não foi possível iniciar o globo 3D neste navegador. Tente um navegador atualizado com WebGL ativado.", true); console.error(e); return; }
renderAside();
routeFromHash();
loadAll(false);
})();
