import { chromium } from 'playwright';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function runTest() {
  console.log('================================================================');
  console.log('  TESTING: TITLE UPDATES & NO ENDLESS SECTION LOOPS');
  console.log('================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 412, height: 915 } });

  const pageErrors = [];
  page.on('pageerror', err => {
    console.error('Captured page error stack:', err.stack || err.message);
    pageErrors.push(err.message);
  });

  try {
    console.log('--- Step 1: Navigate to Hub and open Math Kingdom ---');
    await page.goto('http://localhost:8081', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    await page.click('.world-card[data-cat="math_arcade"]');
    await page.waitForTimeout(500);

    const title1 = await page.textContent('#display-equation');
    const topic1 = await page.textContent('#matrix-topic-label');
    const gameName1 = await page.textContent('#current-game-name');
    console.log(`Initial Game: "${gameName1.trim()}" | Topic: "${topic1.trim()}"`);
    console.log(`Question Title: "${title1.trim()}"`);

    if (!title1.includes('Cueille')) {
      throw new Error(`Expected fruit picking question, got: ${title1}`);
    }
    console.log('✅ [PASS] Initial section starts with proper fruit picking title\n');

    console.log('--- Step 2: Switch to another game pill and verify title updates ---');
    // Switch to Course Turbo or Base-10 Robot
    const gameBtns = await page.locator('.game-switch-btn').all();
    console.log(`Found ${gameBtns.length} game pills in section`);
    
    // Click 2nd game (Robot Base-10)
    await gameBtns[1].click();
    await page.waitForTimeout(400);

    const title2 = await page.textContent('#display-equation');
    const topic2 = await page.textContent('#matrix-topic-label');
    const gameName2 = await page.textContent('#current-game-name');
    console.log(`Switched to Game: "${gameName2.trim()}" | Topic: "${topic2.trim()}"`);
    console.log(`New Question Title: "${title2.trim()}"`);

    if (title2 === title1) {
      throw new Error(`Title failed to change when switching games! Still "${title1}"`);
    }
    console.log('✅ [PASS] Title changes immediately when switching to another game\n');

    // Click 3rd game (Course Turbo)
    await gameBtns[2].click();
    await page.waitForTimeout(400);

    const title3 = await page.textContent('#display-equation');
    const gameName3 = await page.textContent('#current-game-name');
    console.log(`Switched to Game: "${gameName3.trim()}" | New Question Title: "${title3.trim()}"`);
    if (title3 === title2 || title3 === title1) {
      throw new Error(`Title failed to change for Course Turbo! Still "${title3}"`);
    }
    console.log('✅ [PASS] Title changes dynamically for 3-lane racing calculation\n');

    console.log('--- Step 3: Test Round-by-Round Question Variation & Section Completion ---');
    // Switch back to Fruit Orchard
    await gameBtns[0].click();
    await page.waitForTimeout(400);

    const titlesSeen = [];

    // Solve 5 rounds to complete the section
    for (let round = 1; round <= 5; round++) {
      const qText = await page.textContent('#display-equation');
      const roundText = await page.textContent('#stat-round');
      console.log(`Round ${round} (${roundText.trim()}): Question Title = "${qText.trim()}"`);

      // Verify title is unique across rounds
      if (titlesSeen.includes(qText)) {
        throw new Error(`Duplicate question title detected in round ${round}: "${qText}"! Titles seen: ${titlesSeen.join(' | ')}`);
      }
      titlesSeen.push(qText);

      // Solve this round by touching the required number of fruits on canvas
      const targetAns = await page.evaluate(() => parseInt(window.NateivaApp.state.question.ans));
      console.log(`   👉 Target fruits to pluck: ${targetAns}`);

      // Pluck exactly targetAns fruits
      for (let fIdx = 0; fIdx < targetAns; fIdx++) {
        const fruitCoords = await page.evaluate((idx) => {
          const unpicked = window.NateivaApp.state.fruits.filter(f => !f.picked);
          return unpicked[0] ? { x: unpicked[0].x, y: unpicked[0].y } : null;
        }, fIdx);

        if (fruitCoords) {
          const canvasBox = await page.locator('#arena').boundingBox();
          const clickX = canvasBox.x + (fruitCoords.x / 500) * canvasBox.width;
          const clickY = canvasBox.y + (fruitCoords.y / 380) * canvasBox.height;
          await page.mouse.click(clickX, clickY);
          await page.waitForTimeout(150);
        }
      }

      // Wait for answer animation & next round transition
      await page.waitForTimeout(1400);
    }

    console.log('\n--- Step 4: Verify Section Completion (NO ENDLESS LOOP) ---');
    const isVictoryOpen = await page.isVisible('#victory-modal.open');
    const vicTitle = await page.textContent('#victory-title');
    const vicStats = await page.textContent('#victory-stats-text');
    console.log(`Victory Modal Open: ${isVictoryOpen}`);
    console.log(`Victory Title: "${vicTitle.trim()}"`);
    console.log(`Victory Message: "${vicStats.trim()}"`);

    if (!isVictoryOpen) {
      throw new Error('Section did NOT complete after 5 rounds! Endless loop bug still active.');
    }
    console.log('✅ [PASS] Section completed with triumph after finishing all questions!\n');

    console.log('--- Step 5: Test "Activité Suivante" Button ---');
    await page.click('#btn-victory-next-game');
    await page.waitForTimeout(600);

    const activeGameAfterNext = await page.textContent('#current-game-name');
    const isVictoryClosed = !(await page.isVisible('#victory-modal.open'));
    console.log(`Transitioned to Next Game: "${activeGameAfterNext.trim()}" | Modal closed: ${isVictoryClosed}`);

    if (activeGameAfterNext.includes('Verger Gourmand')) {
      throw new Error(`Failed to advance to next game! Still "${activeGameAfterNext}"`);
    }
    console.log('✅ [PASS] Activité Suivante advances smoothly to the next game in the world\n');

    if (pageErrors.length > 0) {
      throw new Error(`Encountered page errors: ${pageErrors.join(', ')}`);
    }

    console.log('================================================================');
    console.log('🎉 ALL TESTS PASSED: TITLES UPDATE DYNAMICALLY & ZERO ENDLESS LOOPS!');
    console.log('================================================================');
  } finally {
    await browser.close();
  }
}

runTest().catch(err => {
  console.error('\n❌ Test failed:', err);
  process.exit(1);
});
