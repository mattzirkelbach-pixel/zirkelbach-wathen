// Generates src/landlines.js: close-range geography for the globe, drawn only when zoomed in.
//   L1  state borders and coasts, eastern United States (us-atlas states-10m), simplified
//   L2  country borders and coasts, north-western Europe (world-atlas countries-50m), simplified
//   L3  county lines around the tri-state of Indiana, Illinois and Kentucky (us-atlas counties-10m)
//   DENSE  extra land dots in the regions the story visits, so land stays readable up close
// All packed as Int16 (lat, lon) × 100, base64; polylines separated by a 32767 sentinel.
import { readFileSync, writeFileSync } from 'node:fs';
import { mesh, feature } from 'topojson-client';
import { geoContains } from 'd3-geo';

const load = (p) => JSON.parse(readFileSync(new URL(p, import.meta.url), 'utf8'));
const states = load('../node_modules/us-atlas/states-10m.json');
const counties = load('../node_modules/us-atlas/counties-10m.json');
const world = load('../node_modules/world-atlas/countries-50m.json');
const landTopo = load('../node_modules/world-atlas/land-110m.json');
const land = feature(landTopo, landTopo.objects.land);

// Douglas–Peucker on [lon, lat] arrays
function simplify(points, tol) {
  if (points.length < 3) return points;
  const keep = new Uint8Array(points.length); keep[0] = keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [a, b] = stack.pop(); let maxD = 0, idx = -1;
    const [ax, ay] = points[a], [bx, by] = points[b];
    for (let i = a + 1; i < b; i++) {
      const [px, py] = points[i];
      const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
      let d;
      if (!L2) d = Math.hypot(px - ax, py - ay);
      else { const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L2)); d = Math.hypot(px - (ax + t * dx), py - (ay + t * dy)); }
      if (d > maxD) { maxD = d; idx = i; }
    }
    if (maxD > tol && idx > 0) { keep[idx] = 1; stack.push([a, idx], [idx, b]); }
  }
  return points.filter((_, i) => keep[i]);
}
const inBox = (p, box) => p[0] >= box[0] && p[0] <= box[2] && p[1] >= box[1] && p[1] <= box[3]; // box: [minLon, minLat, maxLon, maxLat]
function clipLines(multi, box, tol) {
  const out = [];
  for (const line of multi.coordinates) {
    let cur = [];
    for (const p of line) {
      if (inBox(p, box)) cur.push(p); else { if (cur.length > 1) out.push(simplify(cur, tol)); cur = []; }
    }
    if (cur.length > 1) out.push(simplify(cur, tol));
  }
  return out.filter((l) => l.length > 1);
}
function pack(lines) {
  const n = lines.reduce((a, l) => a + l.length + 1, 0);
  const buf = new Int16Array(n * 2); let i = 0;
  for (const l of lines) { for (const [lon, lat] of l) { buf[i++] = Math.round(lat * 100); buf[i++] = Math.round(lon * 100); } buf[i++] = 32767; buf[i++] = 32767; }
  return Buffer.from(buf.buffer).toString('base64');
}

// L1: eastern US states (borders + coast). Box: lon -100..-66, lat 24..50
const stateMesh = mesh(states, states.objects.states);
const L1 = clipLines(stateMesh, [-100, 24, -66, 50], 0.02);
// L2: north-western Europe. Box: lon -12..16, lat 47..56
const euMesh = mesh(world, world.objects.countries);
const L2 = clipLines(euMesh, [-12, 46, 16, 56.5], 0.03);
// L3: counties around the tri-state. Box: lon -90.6..-84.8, lat 36.4..39.6
const stateCodes = new Set(['17', '18', '21']); // IL, IN, KY
const tri = { type: 'GeometryCollection', geometries: counties.objects.counties.geometries.filter((g) => stateCodes.has(String(g.id).slice(0, 2))) };
const countyMesh = mesh(counties, tri);
const L3 = clipLines(countyMesh, [-90.6, 36.4, -84.8, 39.6], 0.01);

// DENSE dots: two tiers of Fibonacci-spread land points inside soft-edged regions, so close views stay readable
// and the regions blend into the global set instead of showing a hard rectangle.
function fibDots(spacingDeg, regions) {
  const sRad = spacingDeg * Math.PI / 180, N = Math.round(4 * Math.PI / (sRad * sRad));
  const golden = Math.PI * (3 - Math.sqrt(5)), out = [];
  const feather = (v, lo, hi, m) => Math.max(0, Math.min(1, Math.min(v - lo, hi - v) / m));
  const hash = (i) => { let x = Math.sin(i * 12.9898) * 43758.5453; return x - Math.floor(x); };
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = golden * i;
    const lat = Math.asin(y) * 180 / Math.PI, lon = Math.atan2(Math.sin(th) * r, Math.cos(th) * r) * 180 / Math.PI;
    let keep = 0;
    for (const reg of regions) {
      const b = reg.box, m = reg.margin || 1.5;
      if (lon < b[0] || lon > b[2] || lat < b[1] || lat > b[3]) continue;
      keep = Math.max(keep, Math.min(feather(lon, b[0], b[2], m), feather(lat, b[1], b[3], m)));
    }
    if (keep <= 0 || hash(i) > keep) continue;
    if (geoContains(land, [lon, lat])) out.push([lat, lon]);
  }
  return out;
}
const tierA = fibDots(0.36, [
  { box: [-97, 29, -73, 46], margin: 2.5 },  // Midwest, Ohio Valley, Appalachia, Chesapeake
  { box: [-12, 48.5, 16, 56.5], margin: 2 },  // Ireland, Britain, Germany, Low Countries
  { box: [-118, 29, -80, 36.5], margin: 2.5 } // the southern tier (Arizona, Georgia)
]);
const tierB = fibDots(0.13, [{ box: [-91.5, 35.8, -84, 40.2], margin: 1.2 }]); // the tri-state, up close
const packDots = (arr) => { const b = new Int16Array(arr.length * 2); arr.forEach(([lat, lon], i) => { b[i * 2] = Math.round(lat * 100); b[i * 2 + 1] = Math.round(lon * 100); }); return Buffer.from(b.buffer).toString('base64'); };
const DENSE = packDots(tierA), DENSE_B = packDots(tierB), dense = tierA;

const count = (L) => L.reduce((a, l) => a + l.length, 0);
writeFileSync(new URL('../src/landlines.js', import.meta.url),
  `/* Close-range geography for the globe. Sources: us-atlas states-10m and counties-10m (US Census), world-atlas countries-50m and land-110m (Natural Earth). Generated by scripts/make-lines.mjs. Int16 lat,lon × 100; polylines end with 32767. */\n` +
  `const LINES_US_B64 = "${pack(L1)}";\nconst LINES_EU_B64 = "${pack(L2)}";\nconst LINES_COUNTY_B64 = "${pack(L3)}";\nconst DENSE_DOTS_B64 = "${DENSE}";\nconst DENSE_B_DOTS_B64 = "${DENSE_B}";\n`);
console.log('US lines', L1.length, 'polylines', count(L1), 'pts;', 'EU', L2.length, count(L2), 'pts;', 'counties', L3.length, count(L3), 'pts;', 'dense dots', tierA.length, '+', tierB.length);
