// NATEIVA WORLD — jsdom smoke: boot, open all 8 zones at MAT/CP/CM2, hunt JS errors.
import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'play.html'), 'utf8');
const errs = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { const m = String(e.detail?.stack || e.stack || e); if (!/not implemented/i.test(m)) errs.push(m.split('\n').slice(0, 3).join(' | ')); });
const dom = new JSDOM(html, { url: 'http://localhost:8081/play.html', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
const { window } = dom;
// --- stubs for APIs jsdom lacks ---
window.DOMMatrix = class { constructor() { this.e = 0; this.f = 0; } };
const fakeAnim = { cancel() {}, finished: Promise.resolve(), set onfinish(f) { setTimeout(f, 5); }, animate: null };
window.Element.prototype.animate = function () { return { cancel() {}, set onfinish(f) { setTimeout(f, 5); } }; };
window.SVGElement.prototype.getScreenCTM = function () { return { inverse: () => ({}) }; };
if (!window.SVGSVGElement.prototype.createSVGPoint) window.SVGSVGElement.prototype.createSVGPoint = function () { return { x: 0, y: 0, matrixTransform: () => ({ x: 0, y: 0 }) }; };
class FA { constructor() { this.currentTime = 0; this.destination = {}; this.state = 'running'; } createOscillator() { return { connect: () => {}, start: () => {}, stop: () => {}, frequency: { value: 0 }, type: '' }; } createGain() { return { connect: () => {}, gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} } }; } resume() { return Promise.resolve(); } }
window.AudioContext = FA; window.webkitAudioContext = FA;
window.speechSynthesis = { cancel: () => {}, speak: () => {}, getVoices: () => [] };
window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
window.onerror = (m, s, l) => errs.push('onerror: ' + m + ' @' + l);
try {
  window.eval([...window.document.querySelectorAll('script')].map(s => s.textContent).join('\n'));
} catch (e) { errs.push('BOOT: ' + (e.stack || e.message).split('\n').slice(0, 4).join(' | ')); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const d = window.document;
(async () => {
  await sleep(50);
  const W = window.__WORLD__;
  if (!W) { console.log('FATAL: world did not boot'); errs.forEach(e => console.log(' ✗ ' + e)); process.exit(1); }
  if (!d.querySelector('#scene-map svg')) errs.push('MAP: no svg built');
  if (d.querySelectorAll('#scene-map .station').length !== 8) errs.push('MAP: expected 8 stations');
  for (const grade of [0, 2, 6]) {
    W.save.grade = grade;
    for (const z of W.ZONES) {
      const before = errs.length;
      try { W.enterZone(z.key); } catch (e) { errs.push(z.key + '@g' + grade + ' ENTER CRASH: ' + (e.stack || e.message).split('\n')[0]); }
      await sleep(120);
      const svg = d.querySelector('#scene-game svg');
      if (!svg || svg.childNodes.length < 3) errs.push(z.key + '@g' + grade + ': stage looks empty');
      const mt = d.getElementById('mission-text').textContent;
      if (z.key !== 'theatre' && !mt) errs.push(z.key + '@g' + grade + ': no mission set');
      if (errs.length > before) errs.slice(before).forEach(e => console.log(' ✗ ' + e));
      try { W.showMap(); } catch (e) { errs.push('showMap crash after ' + z.key + ': ' + e.message); }
      await sleep(30);
    }
  }
  // theatre needs longer (timed narration) — let timers run briefly at g0
  W.save.grade = 0; W.enterZone('theatre'); await sleep(400);
  console.log(errs.length ? `WORLD SMOKE: ${errs.length} issues` : 'WORLD SMOKE: ALL CLEAR ✅ (8 zones × 3 grades)');
  errs.forEach(e => console.log(' ✗ ' + e.slice(0, 220)));
  process.exit(errs.length ? 1 : 0);
})();
