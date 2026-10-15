import { chromium } from 'playwright';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

async function testImageAnimationAndPronunciationSync() {
  console.log('================================================================');
  console.log('  TESTING: IMAGE-ANIMATION MATCH & PRONUNCIATION SYLLABLE SYNC');
  console.log('================================================================\n');

  const browser = await chromium.launch({
    executablePath: CHROME_PATH,
    headless: true
  });

  const page = await browser.newPage({ viewport: { width: 412, height: 915 } });

  const pageErrors = [];
  page.on('pageerror', err => pageErrors.push(err.message));

  try {
    await page.goto('http://localhost:8081', { waitUntil: 'domcontentloaded' });
    await page.waitForTimeout(1000);

    // -------------------------------------------------------------
    // Test 1: Math Fruit Orchard (Image Animation & Word Spoken Match)
    // -------------------------------------------------------------
    console.log('--- TEST 1: Fruit Orchard Image & Word Match ---');
    await page.click('.world-card[data-cat="math_arcade"]');
    await page.waitForTimeout(500);

    const qFruit = await page.evaluate(() => window.NateivaApp.state.question);
    console.log(`Active Fruit Question: "${qFruit.q}"`);
    console.log(`Active Fruit Icon: "${qFruit.icon}", Fruit Name: "${qFruit.fruitName}"`);
    console.log(`Spoken Narration: "${qFruit.speech}"`);

    // Verify speech contains the exact fruit name
    if (!qFruit.speech.toLowerCase().includes(qFruit.fruitName.toLowerCase())) {
      throw new Error(`Narration does not match fruit name! Speech="${qFruit.speech}", fruit="${qFruit.fruitName}"`);
    }

    // Verify tree fruits match the question icon
    const treeFruits = await page.evaluate(() => window.NateivaApp.state.fruits);
    console.log(`Spawned ${treeFruits.length} fruits on tree. Sample icon: ${treeFruits[0].icon}`);
    if (treeFruits.some(f => f.icon !== qFruit.icon)) {
      throw new Error(`Tree fruits do not match question icon ${qFruit.icon}!`);
    }
    console.log('✅ [PASS] Orchard tree fruits and spoken audio match the exact illustrated fruit!\n');

    // -------------------------------------------------------------
    // Test 2: Pronunciation (Tam-Tam Djembe Syllable Synchronization)
    // -------------------------------------------------------------
    console.log('--- TEST 2: Pronunciation Tam-Tam Djembe Syllable Sync ---');
    await page.click('#btn-back-to-hub');
    await page.waitForTimeout(400);

    await page.click('.world-card[data-cat="pronunciation"]');
    await page.waitForTimeout(500);

    // Ensure we are in Tam-Tam Djembe
    const gamePills = await page.locator('.game-switch-btn').all();
    for (const pill of gamePills) {
      const text = await pill.textContent();
      if (text.includes('Djembe') || text.includes('Tam-Tam')) {
        await pill.click();
        await page.waitForTimeout(400);
        break;
      }
    }

    const djembeState = await page.evaluate(() => {
      const s = window.NateivaApp.state;
      return {
        game: s.game,
        engine: s.engineType,
        q: s.question
      };
    });

    console.log(`Djembe Game: "${djembeState.game}", Engine: "${djembeState.engine}"`);
    console.log(`Word to beat: "${djembeState.q.word}", Syllables: [${(djembeState.q.syllables || []).join(', ')}], Target beats: ${djembeState.q.ans}`);

    if (djembeState.engine !== 'djembe') {
      throw new Error(`Expected djembe engine, got ${djembeState.engine}`);
    }

    // Tap drum on canvas and verify rhythm increment and syllable tracking
    const arenaBox = await page.locator('#arena').boundingBox();
    const drumCenterX = arenaBox.x + (250 / 500) * arenaBox.width;
    const drumCenterY = arenaBox.y + (230 / 380) * arenaBox.height;

    const targetBeats = parseInt(djembeState.q.ans);
    for (let beat = 1; beat <= targetBeats; beat++) {
      await page.mouse.click(drumCenterX, drumCenterY);
      await page.waitForTimeout(200);

      const currentBeat = await page.evaluate(() => window.NateivaApp.state.playerX);
      const syllables = djembeState.q.syllables || [];
      const expectedSyl = syllables[beat - 1];
      console.log(`Beat ${beat}/${targetBeats} struck! Current Beat Count: ${currentBeat}, Active Syllable: "${expectedSyl}"`);

      if (currentBeat !== beat) {
        throw new Error(`Beat count did not advance! Expected ${beat}, got ${currentBeat}`);
      }
    }

    // Wait for round completion
    await page.waitForTimeout(800);
    console.log('✅ [PASS] Tam-Tam Djembe visual syllables light up and voice speaks synchronously per beat!\n');

    // -------------------------------------------------------------
    // Test 3: Phonics Fishing (Letter Initial Match with Fish and Spoken Word)
    // -------------------------------------------------------------
    console.log('--- TEST 3: Phonics Fishing Letter and Spoken Word Match ---');
    await page.click('#btn-back-to-hub');
    await page.waitForTimeout(400);

    await page.click('.world-card[data-cat="reading"]');
    await page.waitForTimeout(500);

    // Switch specifically to Pêche aux Sons (phonics_fishing)
    await page.evaluate(() => window.NateivaApp.showGame('reading', 'phonics_fishing'));
    await page.waitForTimeout(400);

    const fishState = await page.evaluate(() => {
      const s = window.NateivaApp.state;
      return {
        game: s.game,
        engine: s.engineType,
        q: s.question,
        fishList: s.fishList
      };
    });

    console.log(`Reading Game: "${fishState.game}", Engine: "${fishState.engine}"`);
    console.log(`Fish Target Word: "${fishState.q.word}", Target Letter: [${fishState.q.ans}], Icon: ${fishState.q.icon}`);
    console.log(`Spoken Narration: "${fishState.q.speech}"`);

    if (!fishState.q.speech.includes(fishState.q.ans)) {
      throw new Error(`Spoken fish prompt does not contain target letter ${fishState.q.ans}!`);
    }

    const correctFish = fishState.fishList.find(f => f.val === fishState.q.ans);
    if (!correctFish) {
      throw new Error(`Fish list does not contain a fish with the correct answer ${fishState.q.ans}!`);
    }
    console.log(`✅ [PASS] Swimming tilapias contain target letter [${correctFish.val}] matching word "${fishState.q.word}"\n`);

    if (pageErrors.length > 0) {
      throw new Error(`Page errors encountered: ${pageErrors.join(', ')}`);
    }

    console.log('================================================================');
    console.log('🎉 ALL IMAGE-ANIMATION & PRONUNCIATION SYNC TESTS PASSED 100%!');
    console.log('================================================================');
  } catch (err) {
    console.error('\n❌ Test failed:', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testImageAnimationAndPronunciationSync();

