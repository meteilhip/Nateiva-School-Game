// NATEIVA WORLD — jsdom smoke: boot, open all 8 zones at MAT/CP/CM2, hunt JS errors.
import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'play.html'), 'utf8');
const africaData = readFileSync(join(root, 'africa-data.js'), 'utf8');
const errs = [];
const vc = new VirtualConsole();
vc.on('jsdomError', e => { const m = String(e.detail?.stack || e.stack || e); if (!/not implemented/i.test(m)) errs.push(m.split('\n').slice(0, 3).join(' | ')); });
const dom = new JSDOM(html, { url: 'http://localhost:8081/play.html', runScripts: 'outside-only', pretendToBeVisual: true, virtualConsole: vc });
const { window } = dom;
const PORTRAIT = !!process.env.PORTRAIT;
if (PORTRAIT) {
  Object.defineProperty(window, 'innerWidth', { get: () => 412, configurable: true });
  Object.defineProperty(window, 'innerHeight', { get: () => 915, configurable: true });
}
// --- stubs for APIs jsdom lacks ---
window.DOMMatrix = class { constructor() { this.e = 0; this.f = 0; } };
const fakeAnim = { cancel() {}, finished: Promise.resolve(), set onfinish(f) { setTimeout(f, 5); }, animate: null };
window.Element.prototype.animate = function () { return { cancel() {}, set onfinish(f) { setTimeout(f, 5); } }; };
window.SVGElement.prototype.getScreenCTM = function () { return { inverse: () => ({}) }; };
window.SVGElement.prototype.getBBox = function () { return { x: 0, y: 0, width: 20, height: 20 }; };
if (!window.SVGSVGElement.prototype.createSVGPoint) window.SVGSVGElement.prototype.createSVGPoint = function () { return { x: 0, y: 0, matrixTransform: () => ({ x: 0, y: 0 }) }; };
class FA { constructor() { this.currentTime = 0; this.destination = {}; this.state = 'running'; } createOscillator() { return { connect: () => {}, start: () => {}, stop: () => {}, frequency: { value: 0 }, type: '' }; } createGain() { return { connect: () => {}, gain: { setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} } }; } resume() { return Promise.resolve(); } }
window.AudioContext = FA; window.webkitAudioContext = FA;
window.speechSynthesis = { cancel: () => {}, speak: () => {}, getVoices: () => [] };
window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
window.onerror = (m, s, l) => errs.push('onerror: ' + m + ' @' + l);
try {
  window.eval(africaData);
  window.eval([...window.document.querySelectorAll('script')].map(s => s.textContent).join('\n'));
} catch (e) { errs.push('BOOT: ' + (e.stack || e.message).split('\n').slice(0, 4).join(' | ')); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
const d = window.document;
(async () => {
  await sleep(50);
  const W = window.__WORLD__;
  if (!W) { console.log('FATAL: world did not boot'); errs.forEach(e => console.log(' ✗ ' + e)); process.exit(1); }
  if (!d.querySelector('#scene-map svg')) errs.push('MAP: no svg built');
  if (d.querySelectorAll('#scene-map .station').length !== 21) errs.push('MAP: expected 21 stations, got ' + d.querySelectorAll('#scene-map .station').length);
  for (const grade of [0, 2, 6]) {
    W.save.grade = grade;
    for (const z of W.ZONES) {
      const before = errs.length;
      try { W.enterZone(z.key); } catch (e) { errs.push(z.key + '@g' + grade + ' ENTER CRASH: ' + (e.stack || e.message).split('\n')[0]); }
      await sleep(80);
      const door0 = d.querySelector('#scene-game .act-card');
      if (door0) { door0.click(); await sleep(110); }
      await sleep(40);
      const svg = d.querySelector('#scene-game svg');
      const quizHtml = d.querySelector('#scene-game .quiz-wrap');
      if (z.key === 'academy' || z.key === 'mathlab' || z.key === 'griot' || z.key === 'themes') { if (!quizHtml || !quizHtml.textContent.trim()) errs.push(z.key + '@g' + grade + ': quiz UI empty'); }
      else if (!svg || svg.childNodes.length < 3) errs.push(z.key + '@g' + grade + ': stage looks empty');
      // off-canvas detector: no element may sit beyond the stage width (depth <= 2)
      if (svg) {
        const stW = PORTRAIT ? 850 : 1500;
        let bad = 0, badEx = '';
        [...svg.children].forEach(c1 => {
          [c1, ...c1.children].forEach(el => {
            const m2 = /translate\(\s*(-?[\d.]+)/.exec(el.getAttribute && (el.getAttribute('transform') || '') || '');
            if (m2) { const x = parseFloat(m2[1]); if (x > stW + 140) { bad++; if (!badEx) badEx = (el.tagName || '?') + ' x=' + x; } }
          });
        });
        if (bad) errs.push(z.key + '@g' + grade + (PORTRAIT ? ' [PORTRAIT]' : '') + ': ' + bad + ' off-canvas (' + badEx + ')');
      }
      const mt = d.getElementById('mission-text').textContent;
      if (z.key !== 'theatre' && !mt) errs.push(z.key + '@g' + grade + ': no mission set');
      if (errs.length > before) errs.slice(before).forEach(e => console.log(' ✗ ' + e));
      try { W.showMap(); } catch (e) { errs.push('showMap crash after ' + z.key + ': ' + e.message); }
      await sleep(30);
    }
  }
  // fuzz every quiz generator at every grade — shape + crash check
  const QT = W.QUIZ_TOPICS;
  for (let g = 0; g <= 6; g++) {
    W.save.grade = g;
    for (const t of QT.filter(t => g >= t.lo && g <= t.hi)) {
      for (let k = 0; k < 25; k++) {
        try {
          const q = t.gen(g);
          if (!q || !Array.isArray(q.ch) || q.ch.length < 2) { errs.push('quiz ' + t.id + '@g' + g + ': bad choices'); break; }
          if (!(q.ci >= 0 && q.ci < q.ch.length)) { errs.push('quiz ' + t.id + '@g' + g + ': ci out of range (' + q.ci + ')'); break; }
          if (!Array.isArray(q.sf) || !q.sf.length || !Array.isArray(q.se) || !q.se.length) { errs.push('quiz ' + t.id + '@g' + g + ': missing steps'); break; }
          if (q.ch.some(c => !c[0] || !c[1])) { errs.push('quiz ' + t.id + '@g' + g + ': empty choice label'); break; }
          const labels = q.ch.map(c => c[0]);
          if (new Set(labels).size !== labels.length) { errs.push('quiz ' + t.id + '@g' + g + ': duplicate choices ' + labels.join('/')); break; }
        } catch (e) { errs.push('quiz ' + t.id + '@g' + g + ' GEN CRASH: ' + (e.stack || e.message).split('\n')[0]); break; }
      }
    }
  }
  // differentiation checks: paint fractions at CM, garden organ round at CE1+
  W.save.grade = 6; W.enterZone('paint', 'fraction'); await sleep(150);
  if (!/\d\/\d/.test(d.getElementById('mission-text').textContent)) errs.push('paint@g6: no fraction task (' + d.getElementById('mission-text').textContent + ')');
  W.showMap(); await sleep(30);
  for (const g of [3, 6]) {
    W.save.grade = g; W.enterZone('garden', 'grow'); await sleep(120);
    try { window.__GARDEN_TEST__.partRound(); await sleep(80); const mt = d.getElementById('mission-text').textContent; if (!/[Tt]ouche|[Tt]ap/.test(mt)) errs.push('garden@g' + g + ': organ round has no tap mission'); } catch (e) { errs.push('garden partRound@g' + g + ' CRASH: ' + e.message); }
    W.showMap(); await sleep(30);
  }
  // differentiation proof: distinct missions across grades per zone
  const diffReport = [];
  for (const z of W.ZONES) {
    const seen = new Set();
    for (const g of [0, 3, 6]) { W.save.grade = g; try { W.enterZone(z.key); } catch (e) {} await sleep(90); const dd2 = d.querySelector('#scene-game .act-card'); if (dd2) { dd2.click(); await sleep(90); } seen.add(d.getElementById('mission-text').textContent.slice(0, 60)); try { W.showMap(); } catch (e) {} await sleep(20); }
    diffReport.push(z.key + ':' + seen.size);
  }
  console.log('MISSION VARIETY (zone:distinct across MAT/CE1/CM2):', diffReport.join(' '));
  // every activity door opens and builds a stage (pre-master everything so all chapters are unlocked for the crawl)
  const MENUZ = ['orchard', 'bubbles', 'paint', 'splash', 'garden', 'safari', 'chess', 'words', 'builder', 'music', 'pets', 'puzzle', 'parrot'];
  for (const g of [0, 6]) { W.save.grade = g; for (const z of W.ZONES) for (const a of W.Mastery.zoneActs(z.key)) W.Mastery.mark(z.key, a.id); }
  for (const zk of MENUZ) {
    for (const g of [0, 6]) {
      W.save.grade = g;
      W.enterZone(zk); await sleep(90);
      const doors = [...d.querySelectorAll('#scene-game .act-card')];
      for (let di = 0; di < doors.length; di++) {
        W.enterZone(zk); await sleep(70);
        const ds2 = [...d.querySelectorAll('#scene-game .act-card')];
        if (!ds2[di]) break;
        ds2[di].click(); await sleep(110);
        const stg = d.querySelector('#scene-game svg') || d.querySelector('#scene-game .quiz-wrap');
        if (!stg) errs.push(zk + ' door' + di + '@g' + g + ': no stage after pick');
      }
      W.showMap(); await sleep(30);
    }
  }
  // EXAM simulation: 10 questions, varied answers, results sheet with score
  for (const g of [1, 6]) {
    W.save.grade = g;
    W.enterZone('academy'); await sleep(150);
    try {
      W.Academy._exam();
      await sleep(150);
      const seenQs = new Set();
      for (let k = 0; k < 10; k++) {
        const btns = [...d.querySelectorAll('.qz-a:not(:disabled)')];
        if (!btns.length) { errs.push('exam@g' + g + ': no answers at Q' + (k + 1)); break; }
        const qTxt = d.querySelector('.qz-q') ? d.querySelector('.qz-q').textContent : '';
        seenQs.add(qTxt);
        btns[k % btns.length].click();
        await sleep(60);
        const nx = d.querySelector('.qz-next.on');
        if (!nx) { errs.push('exam@g' + g + ': next missing at Q' + (k + 1)); break; }
        nx.click();
        await sleep(90);
      }
      const sc = d.querySelector('.qz-score');
      if (!sc || !/\/ 10/.test(sc.textContent)) errs.push('exam@g' + g + ': no /10 results sheet');
      if (!((W.save.examLog || {})[g] || []).length) errs.push('exam@g' + g + ': trial not logged in examLog');
      if (seenQs.size < (g <= 2 ? 7 : 8)) errs.push('exam@g' + g + ': questions repeat too much (' + seenQs.size + '/10 unique)');
    } catch (e) { errs.push('exam@g' + g + ' CRASH: ' + (e.stack || e.message).split('\n')[0]); }
    W.showMap(); await sleep(40);
  }
  // step through every Math Lab lesson at its grades — catch run() crashes
  for (const L of W.ML_LESSONS) {
    for (const g of [L.lo, L.hi]) {
      W.save.grade = g;
      try {
        const sv = d.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const steps = L.make(sv, g);
        if (!Array.isArray(steps) || steps.length < 3) { errs.push('mathlab ' + L.id + ': too few steps'); continue; }
        steps.forEach((st2, i) => { if (!st2.f || !st2.e) errs.push('mathlab ' + L.id + ' step' + i + ': missing text'); try { st2.run(); } catch (e) { errs.push('mathlab ' + L.id + ' step' + i + ' RUN CRASH: ' + e.message); } });
      } catch (e) { errs.push('mathlab ' + L.id + ' MAKE CRASH: ' + e.message); }
    }
  }
  // griot stories shape check
  for (const st2 of W.GRIOT_STORIES) {
    if (!st2.panels || st2.panels.length < 2) errs.push('griot ' + st2.id + ': too few panels');
    if (!st2.qs || st2.qs.length !== 3) errs.push('griot ' + st2.id + ': needs 3 questions');
    (st2.qs || []).forEach((q, i) => {
      if (!(q.ci >= 0 && q.ci < q.ch.length)) errs.push('griot ' + st2.id + ' q' + i + ': ci out of range');
      if (q.ch.some(c => !c[0] || !c[1])) errs.push('griot ' + st2.id + ' q' + i + ': empty choice');
      if (!q.sf || !q.sf.length || !q.se || !q.se.length) errs.push('griot ' + st2.id + ' q' + i + ': missing steps');
    });
  }
  // ---- CHAPTER LOCKS: with a fresh save, chapter 2 must refuse until chapter 1 is mastered ----
  {
    W.save.acts = {}; W.save.grade = 6;
    W.enterZone('orchard'); await sleep(90);
    let cards = [...d.querySelectorAll('#scene-game .act-card')];
    if (cards.length < 3) errs.push('chapters: orchard@g6 expected several chapters, got ' + cards.length);
    if (!cards.some(c => c.classList.contains('locked'))) errs.push('chapters: no locked chapter on fresh save');
    if (!cards[cards.length - 1] || !cards[cards.length - 1].textContent.includes('FINAL')) errs.push('chapters: Grand Défi card missing/last');
    const locked = cards.find(c => c.classList.contains('locked'));
    if (locked) { locked.click(); await sleep(80); if (!d.querySelector('#scene-game .act-menu')) errs.push('chapters: locked chapter opened anyway'); }
    cards[0].click(); await sleep(110);
    if (!d.querySelector('#scene-game svg')) errs.push('chapters: chapter 1 did not open on fresh save');
    W.showMap(); await sleep(30);
    // GRAND DÉFI: master the regular chapters, then the final must run as a 5-question themed quiz to the crown
    for (const a of W.Mastery.zoneActs('orchard')) if (a.id !== '_final') W.Mastery.mark('orchard', a.id);
    W.enterZone('orchard', '_final'); await sleep(120);
    let okGD = true;
    for (let k = 0; k < 5 && okGD; k++) {
      const ans = [...d.querySelectorAll('#scene-game .qz-a')];
      if (!ans.length) { errs.push('granddefi: no answers at Q' + (k + 1)); okGD = false; break; }
      ans[k % ans.length].click(); await sleep(60);
      const nx = d.querySelector('#scene-game .qz-next.on');
      if (!nx) { errs.push('granddefi: next missing at Q' + (k + 1)); okGD = false; break; }
      nx.click(); await sleep(90);
    }
    if (okGD && !W.Mastery.has('orchard', '_final')) errs.push('granddefi: final not marked mastered after completion');
    if (okGD && !W.Mastery.zoneDone('orchard')) errs.push('granddefi: zone not crowned after final');
    d.getElementById('cheer-card').classList.remove('on');
    W.save.acts = {}; W.showMap(); await sleep(30);
  }
  // ---- SAGE Q&A: every sample question + country lookups must answer ----
  {
    const QS = ['pourquoi il pleut', 'why does the sun shine', 'que mange le lion', 'comment poussent les plantes',
      'pourquoi le bateau flotte', "c'est quoi une fraction", 'pourquoi on dort', 'capitale du cameroun',
      'nigeria', 'kenya', 'pourquoi le ciel est bleu', 'what is a syllable', 'multiplication', 'kilimandjaro'];
    for (const q of QS) {
      const a = W.sageAnswer(q);
      if (!a) { errs.push('sage: no answer for "' + q + '"'); continue; }
      if (!a.a || !a.a[0] || !a.a[1] || a.a[0].length < 20) errs.push('sage "' + q + '": bad answer shape');
      if (a.z && !W.ZONES.find(z => z.key === a.z)) errs.push('sage "' + q + '": unknown zone ' + a.z);
    }
    const cm = W.sageAnswer('capitale du cameroun');
    if (!cm || !/Yaound/.test(cm.a[0])) errs.push('sage: cameroun capital wrong: ' + (cm && cm.a[0]));
    if (W.sageAnswer('xyzqwk blorp')) errs.push('sage: answered gibberish');
    // the search panel renders the sage card + chips without crashing
    try { W.renderSearch(''); W.renderSearch('pourquoi il pleut ?'); } catch (e) { errs.push('sage render CRASH: ' + e.message); }
  }
  // ---- MASTERY: complete every activity -> 21 crowns -> next-class button -> grade switch ----
  {
    W.save.grade = 1;
    const M = W.Mastery;
    if (typeof W.Rounds.ramp !== 'function' || W.Rounds.ramp.call({ idx: 4 }) !== 2) errs.push('mastery: Rounds.ramp broken');
    W.save.acts = {};
    if (M.classCount() !== 0) errs.push('mastery: expected 0 crowns after reset, got ' + M.classCount());
    for (const z of W.ZONES) for (const a of M.zoneActs(z.key)) M.mark(z.key, a.id);
    if (!M.classDone()) errs.push('mastery: classDone false after marking all (' + M.classCount() + '/' + W.ZONES.length + ')');
    W.save.grade = 0; // marks were for g1: crowns must be per-class
    if (M.classCount() !== 0) errs.push('mastery: crowns leaked across grades (' + M.classCount() + ' at g0)');
    W.save.grade = 1;
    W.showMap(); await sleep(60);
    const mapTxt = d.getElementById('scene-map').textContent;
    if (!/TERMIN|COMPLETE|Passe en|Move up/.test(mapTxt)) errs.push('mastery: class-complete banner missing on map');
    const g0 = W.save.grade;
    W.nextClass(); await sleep(60);
    if (W.save.grade !== g0 + 1) errs.push('mastery: nextClass did not advance grade');
    W.save.acts = {}; W.save.grade = 0; // clean state for theatre step
  }
  // theatre needs longer (timed narration) — let timers run briefly at g0
  W.save.grade = 0; W.enterZone('theatre'); await sleep(400);
  console.log(errs.length ? `WORLD SMOKE${PORTRAIT ? ' [PORTRAIT 412x915]' : ''}: ${errs.length} issues` : 'WORLD SMOKE' + (PORTRAIT ? ' [PORTRAIT 412x915]' : ' [LANDSCAPE]') + ': ALL CLEAR ✅ (' + W.ZONES.length + ' zones × 3 grades)');
  errs.forEach(e => console.log(' ✗ ' + e.slice(0, 220)));
  process.exit(errs.length ? 1 : 0);
})();
