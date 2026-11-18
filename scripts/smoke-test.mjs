// Nateiva School Game — V21.0 Full Bug-Hunt Smoke Test (jsdom)
// Launches every game × every class level. Hunts:
//   1. BUTTON BUGS  — dead launches, zero actionable controls, buttons that throw on click
//   2. VOICE BUGS   — prompts that are never narrated (pre-readers depend on audio)
//   3. VISUAL BUGS  — pictures/emojis that don't match their answer text; unwinnable MCQs
//   4. JS ERRORS    — any uncaught exception anywhere
// Run: node scripts/smoke-test.mjs   → writes scripts/smoke-results.json, exit 1 on failures
import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');

const pageErrors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on('jsdomError', e => {
  const msg = String(e && (e.detail && e.detail.stack || e.stack || e.message) || e);
  if (!/not implemented|Could not load/i.test(msg)) pageErrors.push(msg.split('\n').slice(0, 3).join(' | '));
});
virtualConsole.on('error', () => {});

const dom = new JSDOM(html, {
  url: 'http://localhost:8081/',
  runScripts: 'outside-only',
  pretendToBeVisual: true,
  virtualConsole
});
const { window } = dom;

// ---------- Browser API stubs (canvas, audio, speech) ----------
const ctxStub = () => new Proxy({}, {
  get(t, p) {
    if (p === 'measureText') return () => ({ width: 50 });
    if (p === 'createLinearGradient' || p === 'createRadialGradient') return () => ({ addColorStop: () => {} });
    if (p === 'getImageData') return () => ({ data: new Uint8ClampedArray(4) });
    if (p === 'canvas') return { width: 900, height: 520 };
    if (typeof p === 'string') return () => {};
    return undefined;
  },
  set() { return true; }
});
window.HTMLCanvasElement.prototype.getContext = function () { return ctxStub(); };
class FakeAudioCtx {
  constructor() { this.currentTime = 0; this.destination = {}; }
  createOscillator() { return { connect: () => {}, start: () => {}, stop: () => {}, frequency: { value: 0, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {} }, type: 'sine', onended: null }; }
  createGain() { return { connect: () => {}, gain: { value: 0, setValueAtTime: () => {}, exponentialRampToValueAtTime: () => {}, linearRampToValueAtTime: () => {} } }; }
  resume() { return Promise.resolve(); }
}
window.AudioContext = FakeAudioCtx;
window.webkitAudioContext = FakeAudioCtx;
window.speechSynthesis = { speak: () => {}, cancel: () => {}, getVoices: () => [], paused: false, pending: false, speaking: false, addEventListener: () => {} };
window.SpeechSynthesisUtterance = class { constructor(t) { this.text = t; } };
window.fetch = () => Promise.resolve({ ok: false, status: 404, json: () => Promise.resolve({}), blob: () => Promise.resolve({}) });
window.Audio = class { play() { return Promise.resolve(); } pause() {} addEventListener() {} };
window.scrollTo = () => {};
window.onerror = (msg, src, line) => { pageErrors.push(`window.onerror: ${msg} @${line}`); };

// Track intervals so each game's leftover timers can be cleared between launches
const liveIntervals = new Set();
const origSetInterval = window.setInterval.bind(window);
window.setInterval = (fn, ms, ...a) => { const id = origSetInterval(fn, ms, ...a); liveIntervals.add(id); return id; };
const clearAllIntervals = () => { for (const id of liveIntervals) window.clearInterval(id); liveIntervals.clear(); };

// ---------- Execute the app script ----------
const scriptEl = [...window.document.querySelectorAll('script')].map(s => s.textContent).join('\n;\n');
try {
  window.eval(scriptEl);
} catch (e) {
  pageErrors.push('BOOT CRASH: ' + (e.stack || e.message).split('\n').slice(0, 4).join(' | '));
}

const sleep = ms => new Promise(r => setTimeout(r, ms));
const EMOJI_RE = /\p{Extended_Pictographic}(?:️|‍\p{Extended_Pictographic})*/gu;

const GRADES = ['MAT', 'SIL', 'CP', 'CE', 'CE2', 'CM1', 'CM'];
const GAMES = ['math_magic_tricks', 'science_hero_tricks', 'tetris_blocks', 'auto_racer', 'math_monster_quest',
  'science_ecosystem', 'grammar_lab', 'vocabulary_lab', 'conjugation_lab', 'pronunciation_lab',
  'africa_geography', 'fun_facts_quiz', 'story_lab', 'reading_lab', 'math_lab', 'chemistry',
  'density', 'circuit', 'botany', 'comet', 'tangram_puzzle', 'maze_quest'];
// Games that render into canvas/special overlays and legitimately may show few/no shared answer buttons
const CANVAS_GAMES = new Set(['chemistry', 'density', 'circuit', 'botany', 'comet', 'tetris_blocks', 'auto_racer', 'pronunciation_lab']);

const results = [];
const failures = [];
const d = window.document;
const $ = id => d.getElementById(id);

function visibleButtons() {
  const sels = ['#answers-container button', '#funfact-mcq-grid button', '#lang-quest-options button',
    '#geo-options-grid button', '.comprehension-options-grid button', '#story-overlay button',
    '#reading-overlay button', '#pronunciation-overlay button', '.tetris-controls button', '#maze-dpad-container button'];
  const set = new Set();
  sels.forEach(s => d.querySelectorAll(s).forEach(b => set.add(b)));
  return [...set];
}

async function testGame(grade, game) {
  const rec = { grade, game, ok: true, issues: [] };
  const errBase = pageErrors.length;
  const speechBase = window.__NATEIVA_SPEECH_COUNT__ || 0;
  try {
    window.__NATEIVA_SELECT_CLASS__(grade, false);
    window.__NATEIVA_LAUNCH__(game);
  } catch (e) {
    rec.ok = false;
    rec.issues.push('LAUNCH CRASH: ' + (e.message || e));
    results.push(rec); failures.push(rec);
    clearAllIntervals();
    return;
  }
  await sleep(60);

  // VOICE: the challenge prompt must be narrated (pre-reader law)
  if ((window.__NATEIVA_SPEECH_COUNT__ || 0) <= speechBase) {
    rec.ok = false;
    rec.issues.push('VOICE BUG: no narration fired on launch');
  }

  // AGE: body must carry the age class for this grade
  const prof = window.__NATEIVA_AGEUX__.profiles[grade];
  if (!d.body.classList.contains(prof.cls)) {
    rec.ok = false;
    rec.issues.push('AGE BUG: body missing ' + prof.cls);
  }

  // BUTTONS: interactive controls must exist and none may throw when clicked
  const btns = visibleButtons();
  if (btns.length === 0 && !CANVAS_GAMES.has(game)) {
    rec.ok = false;
    rec.issues.push('BUTTON BUG: zero interactive controls rendered');
  }
  let clicked = 0;
  for (const b of btns.slice(0, 14)) {
    try {
      b.click();
      clicked++;
      await sleep(5);
    } catch (e) {
      rec.ok = false;
      rec.issues.push('BUTTON CLICK CRASH [' + (b.textContent || '').trim().slice(0, 36) + ']: ' + (e.message || e));
    }
  }
  rec.buttons = btns.length; rec.clicked = clicked;
  rec.picts = d.querySelectorAll('.ux-pict').length;
  rec.decorated = d.querySelectorAll('.ux-aged').length;
  rec.speaks = (window.__NATEIVA_SPEECH_COUNT__ || 0) - speechBase;

  // VISUAL MATCH: every big picture must match its answer (emoji from label or icon map)
  await sleep(30);
  d.querySelectorAll('.ux-pict').forEach(p => {
    const btn = p.closest('button');
    if (!btn) return;
    const pict = p.textContent.trim();
    if (!pict) { rec.ok = false; rec.issues.push('VISUAL BUG: empty picture slot'); return; }
    const label = window.__NATEIVA_AGEUX__.cleanLabel(btn);
    const fromLabel = ((btn.getAttribute('data-ux-orig') || label).match(EMOJI_RE) || []).includes(pict);
    const fromMap = window.__NATEIVA_AGEUX__.resolveIcon(label) === pict;
    const inOriginal = (label + ' ' + (btn.textContent || '')).includes(pict);
    if (!fromLabel && !fromMap && !inOriginal) {
      // allow the hero-emoji fallback used across the engine
      const hero = window.state.cartoonHeroEmoji;
      if (pict !== hero && pict !== '🌟') {
        rec.ok = false;
        rec.issues.push('VISUAL MISMATCH: pict "' + pict + '" vs label "' + label.slice(0, 30) + '"');
      }
    }
  });

  // JS ERRORS during this game
  if (pageErrors.length > errBase) {
    rec.ok = false;
    rec.issues.push(...pageErrors.slice(errBase).map(e => 'JS ERROR: ' + e.slice(0, 160)));
    pageErrors.length = errBase; // consume
  }
  results.push(rec);
  if (!rec.ok) failures.push(rec);
  clearAllIntervals();
}

// ---------- CONTENT AUDIT: unwinnable MCQs & missing bilingual fields ----------
function auditContent() {
  const DB = window.__NATEIVA_DB__;
  const issues = [];
  const checkPool = (name, arr) => {
    (arr || []).forEach((item, i) => {
      if (item && item.options && item.ans) {
        ['fr', 'en'].forEach(lk => {
          if (item.ans[lk] != null && !item.options.some(o => o && o[lk] === item.ans[lk])) {
            issues.push(`UNWINNABLE: DB.${name}[${i}] (${lk}) answer "${String(item.ans[lk]).slice(0, 40)}" not among options`);
          }
        });
      }
      if (item && item.q && (item.q.fr == null || item.q.en == null)) {
        issues.push(`BILINGUAL GAP: DB.${name}[${i}] missing fr/en question`);
      }
    });
  };
  for (const key of Object.keys(DB)) {
    if (Array.isArray(DB[key])) checkPool(key, DB[key]);
  }
  return issues;
}

(async () => {
  for (const grade of GRADES) {
    for (const game of GAMES) {
      await testGame(grade, game);
    }
  }
  const contentIssues = auditContent();
  const passed = results.filter(r => r.ok).length;
  const summary = {
    date: new Date().toISOString(),
    totalRuns: results.length,
    passed,
    failed: results.length - passed,
    contentIssues,
    failures: failures.map(f => ({ grade: f.grade, game: f.game, issues: f.issues }))
  };
  writeFileSync(join(root, 'scripts', 'smoke-results.json'), JSON.stringify({ summary, results }, null, 1));
  console.log(`SMOKE: ${passed}/${results.length} game×class runs passed; ${contentIssues.length} content issues.`);
  if (failures.length || contentIssues.length) {
    const grouped = {};
    failures.forEach(f => f.issues.forEach(i => { const k = i.slice(0, 90); grouped[k] = (grouped[k] || []).concat(f.game + '@' + f.grade); }));
    Object.entries(grouped).slice(0, 40).forEach(([k, v]) => console.log(' ✗ ' + k + '  [' + v.slice(0, 6).join(', ') + (v.length > 6 ? ` +${v.length - 6}` : '') + ']'));
    contentIssues.slice(0, 40).forEach(i => console.log(' ✗ ' + i));
    process.exitCode = 1;
  } else {
    console.log('ALL CLEAR ✅');
  }
  window.close();
  setTimeout(() => process.exit(process.exitCode || 0), 200);
})();
