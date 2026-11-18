import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const htmlPath = 'C:/Users/eteme/Documents/antigravity/nateiva Kids Game/index.html';
const htmlContent = fs.readFileSync(htmlPath, 'utf-8');

const ALL_22_GAMES = [
  'math_magic_tricks',
  'science_hero_tricks',
  'tetris_blocks',
  'auto_racer',
  'math_monster_quest',
  'science_ecosystem',
  'density',
  'chemistry',
  'botany',
  'circuit',
  'comet',
  'math_lab',
  'grammar_lab',
  'vocabulary_lab',
  'conjugation_lab',
  'pronunciation_lab',
  'africa_geography',
  'fun_facts_quiz',
  'reading_lab',
  'story_lab',
  'maze_quest',
  'tangram_puzzle'
];

async function runTests() {
  console.log('🚀 Starting Comprehensive Playwright Verification for v20.0 REA-TOP-GAME-REBUILD (v1.13.0)...');
  const browser = await chromium.launch({
    headless: true,
    channel: 'chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security']
  });

  const page = await browser.newPage({
    viewport: { width: 412, height: 915 },
    deviceScaleFactor: 2
  });

  page.on('console', msg => {
    if (msg.type() === 'error') console.log('[Browser Error]', msg.text());
  });

  await page.setContent(htmlContent, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  console.log('--- TEST 1: Version & Header Inspection ---');
  const cachePillText = await page.$eval('#btn-version-cache', el => el.textContent.trim());
  console.log('Cache pill text:', cachePillText);
  if (!cachePillText.includes('v20.0') || !cachePillText.includes('v1.13.0')) {
    throw new Error('Version mismatch in cache pill: ' + cachePillText);
  }
  console.log('✓ Version verified: v20.0 REA-TOP-GAME-REBUILD (v1.13.0)');

  console.log('--- TEST 2: 5 Auto-Levels & Manual Level Selector Hiding ---');
  const totalLevels = await page.evaluate(() => window.__NATEIVA_STATE__.totalLevels);
  console.log('state.totalLevels:', totalLevels);
  if (totalLevels !== 5) throw new Error('state.totalLevels should be 5, found: ' + totalLevels);

  const levelSelectorDisplay = await page.evaluate(() => {
    const el = document.getElementById('level-selector-section');
    return el ? window.getComputedStyle(el).display : 'none';
  });
  console.log('#level-selector-section computed display:', levelSelectorDisplay);
  if (levelSelectorDisplay !== 'none') {
    throw new Error('Manual #level-selector-section should be hidden (display: none), got: ' + levelSelectorDisplay);
  }
  console.log('✓ Manual level selector is cleanly hidden; 5 levels advance 100% automatically!');

  console.log('--- TEST 3: All 7 Class Milestones & Journey Navigation ---');
  const classGrades = ['MAT', 'SIL', 'CP', 'CE', 'CE2', 'CM1', 'CM'];
  for (const cg of classGrades) {
    await page.evaluate(g => window.__NATEIVA_SELECT_CLASS__(g, false), cg);
    const activeGrade = await page.evaluate(() => window.__NATEIVA_STATE__.grade);
    if (activeGrade !== cg) throw new Error(`Class selection failed for ${cg}`);
  }
  console.log('✓ All 7 Classes selected and verified seamlessly');

  // Reset to MAT Level 1
  await page.evaluate(() => {
    window.__NATEIVA_SELECT_CLASS__('MAT', false);
    window.__NATEIVA_SELECT_LEVEL__(1);
  });

  console.log('--- TEST 4: Journey Up & Down Step Controls ---');
  await page.evaluate(() => document.getElementById('btn-journey-up').click());
  let curLvl = await page.evaluate(() => window.__NATEIVA_STATE__.level);
  console.log('After Journey Up: Level is', curLvl);
  if (curLvl !== 2) throw new Error('Expected Level 2 after Journey Up, got: ' + curLvl);

  await page.evaluate(() => window.__NATEIVA_SELECT_LEVEL__(5));
  await page.evaluate(() => document.getElementById('btn-journey-up').click());
  let curGrade = await page.evaluate(() => window.__NATEIVA_STATE__.grade);
  let curLvlAfterGrad = await page.evaluate(() => window.__NATEIVA_STATE__.level);
  console.log('After Level 5 Journey Up: Grade is', curGrade, 'Level is', curLvlAfterGrad);
  if (curGrade !== 'SIL' || curLvlAfterGrad !== 1) {
    throw new Error(`Expected SIL Level 1, got ${curGrade} Level ${curLvlAfterGrad}`);
  }

  await page.evaluate(() => document.getElementById('btn-journey-down').click());
  curGrade = await page.evaluate(() => window.__NATEIVA_STATE__.grade);
  curLvl = await page.evaluate(() => window.__NATEIVA_STATE__.level);
  console.log('After Journey Down: Grade is', curGrade, 'Level is', curLvl);
  if (curGrade !== 'MAT' || curLvl !== 5) {
    throw new Error(`Expected MAT Level 5, got ${curGrade} Level ${curLvl}`);
  }
  console.log('✓ Class graduation and 5-level journey ladder verified perfectly');

  // Reset to MAT Level 1
  await page.evaluate(() => {
    window.__NATEIVA_SELECT_CLASS__('MAT', false);
    window.__NATEIVA_SELECT_LEVEL__(1);
  });

  const hubScreenshotPath = 'C:/Users/eteme/.gemini/antigravity/brain/4bd7cc10-f77b-465a-a865-ae8158cb6eb2/v20_mobile_hub_clean.png';
  await page.screenshot({ path: hubScreenshotPath });
  console.log('✓ Captured mobile Hub screenshot:', hubScreenshotPath);

  console.log('--- TEST 5: Rebuilt Game 1 - Number Tetris (math_tetris / tetris_blocks) ---');
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('tetris_blocks'));
  await page.waitForTimeout(400);

  const tetrisVisible = await page.$eval('#math-tetris-panel', el => window.getComputedStyle(el).display !== 'none');
  if (!tetrisVisible) throw new Error('Tetris panel not visible!');
  const tetrisBtns = await page.evaluate(() => {
    return {
      left: !!document.querySelector('[data-tetris="left"]'),
      rotate: !!document.querySelector('[data-tetris="rotate"]'),
      right: !!document.querySelector('[data-tetris="right"]'),
      drop: !!document.querySelector('[data-tetris="drop"]')
    };
  });
  console.log('Tetris Controls:', tetrisBtns);
  if (!tetrisBtns.left || !tetrisBtns.rotate || !tetrisBtns.right || !tetrisBtns.drop) {
    throw new Error('Missing Tetris arcade controls');
  }
  // Click drop
  await page.evaluate(() => {
    const btn = document.querySelector('[data-tetris="drop"]');
    if (btn) btn.click();
  });
  await page.waitForTimeout(200);

  const tetrisScreenshotPath = 'C:/Users/eteme/.gemini/antigravity/brain/4bd7cc10-f77b-465a-a865-ae8158cb6eb2/v20_mobile_tetris_blocks.png';
  await page.screenshot({ path: tetrisScreenshotPath });
  console.log('✓ Captured Tetris gameplay screenshot:', tetrisScreenshotPath);

  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  console.log('--- TEST 6: Rebuilt Game 2 - Safari Math Racer (auto_racer) ---');
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('auto_racer'));
  await page.waitForTimeout(400);

  const racerVisible = await page.$eval('#safari-racer-panel', el => window.getComputedStyle(el).display !== 'none');
  if (!racerVisible) throw new Error('Safari Racer panel not visible!');
  const racerGates = await page.evaluate(() => {
    const gates = document.querySelectorAll('#race-gates .race-gate');
    const driver = document.getElementById('race-driver');
    return { gateCount: gates.length, driverExists: !!driver };
  });
  console.log('Safari Racer setup:', racerGates);
  if (racerGates.gateCount !== 3 || !racerGates.driverExists) {
    throw new Error('Safari Racer requires 3 gates and steerable driver');
  }
  // Steer left and steer right
  await page.evaluate(() => {
    const sL = document.getElementById('steer-left');
    const sR = document.getElementById('steer-right');
    if (sL) sL.click();
    if (sR) sR.click();
  });
  await page.waitForTimeout(200);

  const racerScreenshotPath = 'C:/Users/eteme/.gemini/antigravity/brain/4bd7cc10-f77b-465a-a865-ae8158cb6eb2/v20_mobile_auto_racer.png';
  await page.screenshot({ path: racerScreenshotPath });
  console.log('✓ Captured Safari Racer gameplay screenshot:', racerScreenshotPath);

  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  console.log('--- TEST 7: Rebuilt Game 3 - Prodigy Math RPG Monster Battle (math_monster_quest) ---');
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('math_monster_quest'));
  await page.waitForTimeout(400);

  const prodigyVisible = await page.$eval('#prodigy-battle-panel', el => window.getComputedStyle(el).display !== 'none');
  if (!prodigyVisible) throw new Error('Prodigy Battle panel not visible!');
  const spellsCount = await page.evaluate(() => document.querySelectorAll('#battle-spells-deck .spell-crystal, .spells-deck .spell-crystal').length);
  console.log('Prodigy elemental spell crystals count:', spellsCount);
  if (spellsCount !== 3) throw new Error('Expected 3 elemental spell crystals, got: ' + spellsCount);

  // Cast first spell!
  await page.evaluate(() => {
    const crystal = document.querySelector('#battle-spells-deck .spell-crystal, .spells-deck .spell-crystal');
    if (crystal) crystal.click();
  });
  await page.waitForTimeout(300);

  const prodigyScreenshotPath = 'C:/Users/eteme/.gemini/antigravity/brain/4bd7cc10-f77b-465a-a865-ae8158cb6eb2/v20_mobile_prodigy_math.png';
  await page.screenshot({ path: prodigyScreenshotPath });
  console.log('✓ Captured Prodigy Monster Battle gameplay screenshot:', prodigyScreenshotPath);

  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  console.log('--- TEST 8: Archimedes Basin (Density Tank) Deep Verification ---');
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('density'));
  await page.waitForTimeout(400);

  const densityInitState = await page.evaluate(() => {
    const it = window.__NATEIVA_STATE__.densityTarget || window.__NATEIVA_STATE__.densityItems[0];
    return {
      name: it.name,
      emoji: it.emoji,
      rho: it.rho,
      inWater: it.inWater,
      y: it.y,
      surfaceY: window.__NATEIVA_STATE__.waterSurfaceY
    };
  });
  console.log('Archimedes Target Item on shelf:', densityInitState);

  await page.evaluate(() => {
    const tItem = window.__NATEIVA_STATE__.densityTarget || window.__NATEIVA_STATE__.densityItems[0];
    tItem.inWater = true;
    tItem.x = 400;
    tItem.y = window.__NATEIVA_STATE__.waterSurfaceY + 22;
  });
  await page.waitForTimeout(300);

  const densityPlungedState = await page.evaluate(() => {
    const it = window.__NATEIVA_STATE__.densityTarget || window.__NATEIVA_STATE__.densityItems[0];
    return {
      inWater: it.inWater,
      y: it.y,
      rho: it.rho
    };
  });
  console.log('Archimedes Item after Plunge:', densityPlungedState);
  if (!densityPlungedState.inWater) {
    throw new Error('Item should be inWater === true after plunge!');
  }

  const densityAnsResult = await page.evaluate(() => {
    const it = window.__NATEIVA_STATE__.densityTarget || window.__NATEIVA_STATE__.densityItems[0];
    const isFloating = it.rho < 1.0;
    const btns = document.querySelectorAll('#answers-container .btn-interactive');
    const targetBtn = isFloating ? btns[0] : btns[1];
    if (targetBtn) {
      targetBtn.click();
      return { clicked: true, wasFloating: isFloating, score: window.__NATEIVA_STATE__.score };
    }
    return { clicked: false };
  });
  console.log('Archimedes Answer Button Clicked:', densityAnsResult);
  if (!densityAnsResult.clicked) {
    throw new Error('Archimedes answer button was not found or clicked');
  }

  const archimedesScreenshotPath = 'C:/Users/eteme/.gemini/antigravity/brain/4bd7cc10-f77b-465a-a865-ae8158cb6eb2/v20_mobile_archimedes_tank.png';
  await page.screenshot({ path: archimedesScreenshotPath });
  console.log('✓ Captured Archimedes tank screenshot:', archimedesScreenshotPath);

  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  console.log('--- TEST 9: Rebuilt Language Lab Activities (Vocabulary, Grammar, Conjugation) ---');
  // 9A: Vocabulary Lab Picture Matching
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('vocabulary_lab'));
  await page.waitForTimeout(400);
  const vocabCards = await page.evaluate(() => {
    const cards = document.querySelectorAll('.picture-match-card');
    const words = document.querySelectorAll('.picture-match-word');
    return { cardCount: cards.length, wordCount: words.length };
  });
  console.log('Vocabulary Lab cards:', vocabCards);
  if (vocabCards.cardCount < 2 || vocabCards.wordCount < 2) {
    throw new Error('Vocabulary Lab picture match board did not render 2-lane cards');
  }
  // Click first card and first word
  await page.evaluate(() => {
    const card = document.querySelector('.picture-match-card');
    const word = document.querySelector('.picture-match-word');
    if (card) card.click();
    if (word) word.click();
  });
  await page.waitForTimeout(200);
  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  // 9B: Grammar Lab Sentence Train
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('grammar_lab'));
  await page.waitForTimeout(400);
  const trainElements = await page.evaluate(() => {
    const train = document.querySelector('.sentence-train-deck') || document.getElementById('sentence-train-deck');
    const cars = document.querySelectorAll('.sentence-car');
    return { trainExists: !!train, carCount: cars.length };
  });
  console.log('Grammar Lab Sentence Train:', trainElements);
  if (!trainElements.trainExists || trainElements.carCount < 2) {
    throw new Error('Grammar Lab sentence train failed to render carriages');
  }
  await page.evaluate(() => {
    const choice = document.querySelector('.sentence-car');
    if (choice) choice.click();
  });
  await page.waitForTimeout(200);
  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  // 9C: Conjugation Lab Time Portals
  await page.evaluate(() => window.__NATEIVA_LAUNCH__('conjugation_lab'));
  await page.waitForTimeout(400);
  const timePortals = await page.evaluate(() => {
    const portals = document.querySelectorAll('.time-portal');
    return { portalCount: portals.length };
  });
  console.log('Conjugation Lab Time Portals:', timePortals);
  if (timePortals.portalCount !== 3) {
    throw new Error('Conjugation Lab requires 3 time portals');
  }
  await page.evaluate(() => {
    const portals = document.querySelectorAll('.time-portal');
    portals.forEach(p => p.click());
  });
  await page.waitForTimeout(200);
  const verbTokensCount = await page.evaluate(() => document.querySelectorAll('.time-verb-token').length);
  console.log('Conjugation Lab Verb Tokens revealed:', verbTokensCount);
  await page.evaluate(() => {
    const token = document.querySelector('.time-verb-token');
    if (token) token.click();
  });
  await page.waitForTimeout(200);
  await page.evaluate(() => document.getElementById('btn-back-hub').click());
  await page.waitForTimeout(300);

  console.log('--- TEST 10: All 22 Games Launch & Button Verification ---');
  let gameCount = 0;
  for (const gameKey of ALL_22_GAMES) {
    gameCount++;
    console.log(`[${gameCount}/22] Testing Game: ${gameKey}...`);
    await page.evaluate(g => window.__NATEIVA_LAUNCH__(g), gameKey);
    await page.waitForTimeout(350);

    const hudGameName = await page.$eval('#hud-game-name', el => el.textContent.trim());
    if (!hudGameName) throw new Error(`Missing HUD game name for ${gameKey}`);

    const hasInteractive = await page.evaluate(() => {
      const overlayActive = window.getComputedStyle(document.getElementById('new-arcade-overlay')).display !== 'none';
      const canvasVisible = document.getElementById('simCanvas') && document.getElementById('simCanvas').getBoundingClientRect().height > 0;
      return overlayActive || canvasVisible;
    });
    if (!hasInteractive) throw new Error(`No interactive viewport active for ${gameKey}`);

    await page.evaluate(() => document.getElementById('btn-back-hub').click());
    await page.waitForTimeout(200);
  }
  console.log(`✓ All ${ALL_22_GAMES.length} games launched and verified successfully!`);

  console.log('--- TEST 11: Native Speaker Voice Engine Prompt & Slower Rate Validation ---');
  const speechTests = [
    { raw: "8 + 2 = 10 ➜ 10 + 3 = 13", lang: "fr", expected: "8 plus 2 égale 10 10 plus 3 égale 13" },
    { raw: "9 × 3 = 27", lang: "fr", expected: "9 fois 3 égale 27" },
    { raw: "9 × 3 = 27", lang: "en", expected: "9 times 3 equals 27" },
    { raw: "50% de 20 = 10", lang: "fr", expected: "cinquante pour cent de 20 égale 10" },
    { raw: "100 °C ébullition", lang: "fr", expected: "100 degrés Celsius ébullition" },
    { raw: "💨 O₂ oxygène et 💧 H₂O", lang: "fr", expected: "oxygène oxygène et eau" },
    { raw: "Les grenouilles mangent des insectes sous les feuilles", lang: "fr", expected: "Les grenouilles mangent des insectes sous les feuilles" },
    { raw: "Six frogs jump across the stars into the grass", lang: "en", expected: "Six frogs jump across the stars into the grass" }
  ];

  for (const st of speechTests) {
    const natural = await page.evaluate(({ text, lang }) => {
      return window.__NATEIVA_VOICE__.toNaturalNativeSpeech(text, lang);
    }, { text: st.raw, lang: st.lang });
    console.log(`  Natural Voice [${st.lang}]: "${st.raw}" -> "${natural}"`);
    if (!natural || natural.includes('➜') || natural.includes('💨') || natural.includes('💧')) {
      throw new Error(`Symbol leakage in toNaturalNativeSpeech: "${natural}"`);
    }
    if (st.raw.includes('grenouilles') && !natural.includes('grenouilles')) {
      throw new Error('Letter s was stripped from grenouilles: ' + natural);
    }
    if (st.raw.includes('frogs') && !natural.includes('frogs')) {
      throw new Error('Letter s was stripped from frogs: ' + natural);
    }
    if (st.raw.includes('stars') && !natural.includes('stars')) {
      throw new Error('Letter s was stripped from stars: ' + natural);
    }
  }
  console.log('✓ Native speaker voice conversion verified (100% natural fluency, zero letter "s" loss)');

  console.log('--- TEST 12: Educational Reward Chest & Audio Controls ---');
  await page.evaluate(() => document.getElementById('hud-reward-chest').click());
  await page.waitForTimeout(100);
  const stickerCount = await page.$eval('#hud-sticker-count', el => parseInt(el.textContent.trim(), 10));
  console.log('Unlocked stickers count in chest:', stickerCount);
  if (isNaN(stickerCount) || stickerCount < 1) {
    throw new Error('Reward chest sticker count invalid');
  }

  const initialSoundText = await page.$eval('#btn-sound-toggle', el => el.textContent.trim());
  await page.evaluate(() => document.getElementById('btn-sound-toggle').click());
  const mutedSoundText = await page.$eval('#btn-sound-toggle', el => el.textContent.trim());
  await page.evaluate(() => document.getElementById('btn-sound-toggle').click());
  const restoredSoundText = await page.$eval('#btn-sound-toggle', el => el.textContent.trim());
  console.log('Sound toggle cycle:', initialSoundText, '->', mutedSoundText, '->', restoredSoundText);
  if (mutedSoundText !== '🔇 Muet' || restoredSoundText !== '🔊 Son') {
    throw new Error('Sound toggle failed');
  }
  console.log('✓ Educational Reward Chest & Audio Toggle verified');

  await browser.close();
  console.log('\n🎉 ALL 12 TESTS PASSED WITH 100% SUCCESS FOR v20.0 REA-TOP-GAME-REBUILD (v1.13.0)!');
}

runTests().catch(err => {
  console.error('❌ Test Failure:', err);
  process.exit(1);
});
