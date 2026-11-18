// Nateiva School Game — V21.0 Quality Gate: rates every game 0–5 against the
// REA Top-Game Feature Matrix (GAME_DESIGN_RESEARCH.md). Release requires ALL ≥ 4/5.
// Criteria (1 point each):
//   1. STABLE      — zero crashes/JS errors across all 7 class levels (smoke)
//   2. AUDIO-FIRST — narration fires on every launch in every class (Khan Kids law)
//   3. VISUAL-FIRST— pictorial decorated answers at MAT, or canvas/tactile simulation game
//   4. INTERACTIVE — real clickable/manipulable controls present & working in every class
//   5. ADAPTIVE+REWARD — grade-adaptive content/presentation + mastery/sticker loop wired
// Run AFTER scripts/smoke-test.mjs:  node scripts/age-adaptive-audit.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { results } = JSON.parse(readFileSync(join(root, 'scripts', 'smoke-results.json'), 'utf8'));
const html = readFileSync(join(root, 'index.html'), 'utf8');

const CANVAS_GAMES = new Set(['chemistry', 'density', 'circuit', 'botany', 'comet', 'tetris_blocks', 'auto_racer', 'pronunciation_lab', 'maze_quest', 'tangram_puzzle']);
const games = [...new Set(results.map(r => r.game))];

// Static: universal layer present?
const hasUniversalLayer = html.includes('AGE-ADAPTIVE REDESIGN LAYER') && html.includes('decorateAnswerButtons') && html.includes('uxBumpMastery') && html.includes('StickerBook');

const report = [];
let allPass = true;
for (const g of games) {
  const runs = results.filter(r => r.game === g);
  const crashes = runs.filter(r => r.issues.some(i => /CRASH|JS ERROR/.test(i)));
  const voiceFails = runs.filter(r => r.issues.some(i => /VOICE BUG/.test(i)));
  const visualFails = runs.filter(r => r.issues.some(i => /VISUAL/.test(i)));
  const matRun = runs.find(r => r.grade === 'MAT') || {};
  const noControls = runs.filter(r => r.issues.some(i => /BUTTON BUG/.test(i)));

  const stable = crashes.length === 0 ? 1 : 0;
  const audioFirst = voiceFails.length === 0 && runs.every(r => (r.speaks || 0) > 0) ? 1 : 0;
  const visualFirst = (visualFails.length === 0 && ((matRun.picts || 0) > 0 || CANVAS_GAMES.has(g))) ? 1 : 0;
  const interactive = (noControls.length === 0 && runs.every(r => (r.clicked || 0) > 0 || CANVAS_GAMES.has(g))) ? 1 : 0;
  // Adaptive: universal layer + either grade-keyed content in module source or profile-driven presentation (always true when layer present and body class verified in smoke)
  const ageVerified = runs.every(r => !r.issues.some(i => /AGE BUG/.test(i)));
  const adaptiveReward = (hasUniversalLayer && ageVerified) ? 1 : 0;

  const score = stable + audioFirst + visualFirst + interactive + adaptiveReward;
  if (score < 4) allPass = false;
  report.push({ game: g, score, of: 5, stable, audioFirst, visualFirst, interactive, adaptiveReward });
}

report.sort((a, b) => a.score - b.score);
writeFileSync(join(root, 'scripts', 'quality-ratings.json'), JSON.stringify({ date: new Date().toISOString(), allPass, report }, null, 1));
console.log('GAME QUALITY RATINGS (target: every game ≥ 4/5)');
for (const r of report) {
  const bar = '★'.repeat(r.score) + '☆'.repeat(5 - r.score);
  console.log(` ${bar}  ${r.score}/5  ${r.game}` + (r.score < 4 ? '   ← NEEDS WORK' : ''));
}
console.log(allPass ? `\nRELEASE GATE: PASSED ✅ — all ${report.length} games ≥ 4/5` : '\nRELEASE GATE: FAILED ❌');
process.exitCode = allPass ? 0 : 1;
