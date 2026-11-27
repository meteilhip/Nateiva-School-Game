# GAME_DESIGN_RESEARCH.md — REA Top-Game Feature Matrix & Curriculum Differentiation (v3.0 — Nov 2026)

REA (Reverse-Engineering Analysis) of the top-rated education games in each category and age band that Nateiva School Game covers. Each principle marked ➜ is implemented in Nateiva School Game across both our main portal (`index.html`) and our tactile adventure world (`play.html`).

---

## 1. Category Leaders Deep REA Analysis

### A. Preschool & Early Learning (MAT / Ages 2–5)
- **Top Game:** **Khan Academy Kids** (Common Sense Media 5★, #1 Early Learning App)
- **Signature Pedagogical Mechanics:**
  1. **100% Audio-First & Mascot Companionship:** Instructions, feedback, and encouraging prompts are 100% narrated. Mascots (Ollo, Kodi, Reya) physically demonstrate actions. Zero reading required.
  2. **3-Part Activity Arc:**
     - *Activity 1 (Explore):* Free tactile interaction or guided story.
     - *Activity 2 (Practice):* Concrete manipulative task (e.g. dragging bananas into a basket, tapping animal sounds).
     - *Activity 3 (Reward):* Celebration with stickers, dancing mascots, and positive reinforcement.
  3. **No-Fail Gentle Retry:** Never displays red failure marks; instead provides warm audio redirection ("Let's try that together!").
- ➜ **Nateiva Implementation:**
  - Dedicated MAT game selection (10 games only: counting, rhymes, fables, animal care, gentle puzzles). Advanced games (Ohm's law, acid/base chemistry, coordinate geometry, complex conjugation) are strictly filtered out of MAT.
  - Slower audio rate (0.68), massive cartoon targets (≥76px), tap-first mechanics with animated pointing hand guide.

---

### B. Early Reading & Phonics (MAT–CP / Ages 4–7)
- **Top Games:** **Duolingo ABC** & **Teach Your Monster to Read** (App Store 4.8★, BAFTA Nominated)
- **Signature Pedagogical Mechanics:**
  1. **Syllable Karaoke & Acoustic Highlighting:** Words are segmented into visible, clickable syllables that light up in sync with audio narration (e.g., `BA` — `NA` — `NE`).
  2. **Multi-Modal Phonics Progression:**
     - *Activity 1 (Acoustic Ear Training):* Hear sound / phoneme, identify matching sound character.
     - *Activity 2 (Syllable Assembly):* Drag or tap syllable stones in left-to-right order to construct the word.
     - *Activity 3 (Spoken Reinforcement):* Microphone repetition mode with friendly pitch feedback.
- ➜ **Nateiva Implementation:**
  - `reading_lab` and `play.html` (`river` / `parrot`): 3 distinct activity doors: *Oreille magique* (listening distinction), *Lis avec Coco* (syllable karaoke), and *Répète au micro* (speech recognition practice).
  - Progressive banks: CV syllables at SIL (`BA, MA, TA`), digraphs at CP (`CH, OU, ON, IN`), polysyllabic words at CE1 (`DO-MI-NO, CA-MI-ON`).

---

### C. Mathematics & Problem Solving (SIL–CM2 / Ages 5–12)
- **Top Game:** **Prodigy Math** (#1 Kid-Voted Math Game, 1,500+ Curriculum Skills) & **DragonBox Numbers**
- **Signature Pedagogical Mechanics:**
  1. **Concrete ➔ Representational ➔ Abstract (CRA) Sequence:**
     - *Phase 1 (Concrete):* Ten-frames, fruit counters, visual rods.
     - *Phase 2 (Representational):* Number lines, 2D arrays, fraction circles.
     - *Phase 3 (Abstract / RPG Spell Battle):* Timed equations, mental math strategies, boss battles.
  2. **The "Math Gates the Fun" Meta-Loop:** Math answers fuel hero spells, defeat monsters, unlock treasure chests, and earn stars.
- ➜ **Nateiva Implementation:**
  - `math_lab`, `math_magic_tricks`, and `math_monster_quest`:
    - Activity 1 = Visual Ten-Frame / Concrete manipulative counting.
    - Activity 2 = Visual array / multiplication grid / speed spell duel.
    - Activity 3 = Algebraic balance scale ($ax + b = c$) / Boss battle with golden chest unlock.

---

### D. Interactive Sciences & Tactile Simulations (All Ages)
- **Top Apps:** **Toca Lab: Elements & Plants** (4.8★) & **PhET Interactive Simulations** (Univ. of Colorado)
- **Signature Pedagogical Mechanics:**
  1. **Genuine 2D Tactile Physics:** Direct manipulation of physical variables (pouring liquids, regulating heat/light, closing circuit switches, dropping buoyancy weights) with immediate visual cause-and-effect.
  2. **3-Tab Scientific Method Flow:**
     - *Tab 1 (Sandbox Discovery):* Free exploration without failure constraints.
     - *Tab 2 (Controlled Experiment):* Test specific hypothesis (e.g., "Does oil float on water?", "Does closing switch 2 light bulb B?").
     - *Tab 3 (Scientific Challenge / Diagnosis):* Predict outcomes, balance density vectors, diagnose plant sickness or broken circuits.
- ➜ **Nateiva Implementation:**
  - `chemistry`, `density`, `circuit`, `botany`, and `splash`:
    - Activity 1 = Interactive visual demonstration & free tactile manipulation.
    - Activity 2 = Controlled experiment (measuring buoyancy, series/parallel loop, dosing water/sun).
    - Activity 3 = Boss Scientific Challenge (pH neutralization, Archimedes floating equilibrium, Ohm's law circuit tuning).

---

### E. Geography & Continental Discovery (CP–CM2 / Ages 6–12)
- **Top Games:** **Seterra Geography** & **Stack the Countries** (4.7★)
- **Signature Pedagogical Mechanics:**
  1. **Map Exploration ➔ Capital Locator ➔ Flag/Culture Blitz:**
     - *Activity 1:* Tap named country on interactive SVG map (learn outline and geographic location).
     - *Activity 2:* Match capitals and major waterways (Nile, Congo, Niger, Zambezi, Lake Victoria).
     - *Activity 3:* Speed Flag & Landmark Blitz (Mount Kilimanjaro, Victoria Falls, Sahara Desert).
- ➜ **Nateiva Implementation:**
  - `africa_geography` & `play.html` (`safari`): 49 African countries on real interactive vector map, capital matching, flag collection, and regional challenges (West, Central, East, North, Southern Africa).

---

### F. General Knowledge & Assessment (All Ages)
- **Top Apps:** **Kahoot!** (8.6M Educators) & **Quizlet**
- **Signature Pedagogical Mechanics:**
  1. **Juice & Gamification:** Streak fire multipliers, 50/50 lifeline button, timed excitement, confetti celebrations.
  2. **Class-Specific Mock Exam (Examen Blanc):** Multi-subject diagnostic assessment (Math, Reading, Science, Geography) with step-by-step worked solutions (*Astuces*) and score mentions (🏆 Excellent, 🌟 Très bien).
- ➜ **Nateiva Implementation:**
  - `fun_facts_quiz`, `academy`, and `index.html` exam engine: 10-question mixed exam per class with step-by-step coaching and persistent best scores.

---

## 2. Mandatory Law: Different Games Per Class

Developmentally, presenting the same games across all grades damages engagement. Pre-schoolers are overwhelmed by advanced formulas; grade 5–6 exam candidates are under-stimulated by early sensory games.

| Class Level | Age Band | Curated Games Roster | Pedagogical Rationale |
|:---|:---|:---|:---|
| **MAT (Maternelle)** | 2–5 | **10 Games:** `math_magic_tricks` (1–10 counting), `pronunciation_lab` (listening), `reading_lab` (sounds), `story_lab` (animal fables), `science_ecosystem` (animal sounds), `tangram_puzzle` (simple shapes), `maze_quest` (Leo's easy maze), `fun_facts_quiz` (toddler curiosities), `math_lab` (ten-frame), `botany` (water & sun). | 100% audio-first, big cartoon pictures, zero text decoding, sensory delight. |
| **SIL / Primary 1** | 5–6 | **12 Games:** `reading_lab` (CV syllables), `pronunciation_lab` (consonant sounds), `math_lab` (market 1–20), `story_lab` (visual tales), `science_hero_tricks` (levers & water), `tetris_blocks` (number bonds), `density` (float or sink), `botany` (germination), `africa_geography` (flags), `fun_facts_quiz`, `maze_quest`, `tangram_puzzle`. | Concrete math 1–20, early syllabic blending, floating/sinking exploration. |
| **CP / Primary 2** | 6–7 | **13 Games:** `reading_lab` (digraphs `ou, on, ch`), `pronunciation_lab` (minimal pairs), `vocabulary_lab` (word families), `math_lab` (tens & units 1–100), `math_magic_tricks` (doubles & make-10), `story_lab` (bilingual tales), `botany` (plant organs), `density` (comparing weights), `auto_racer` (mental math), `africa_geography` (capitals), `fun_facts_quiz`, `tangram_puzzle`, `maze_quest`. | Transition from syllables to words, base-10 structure, capital cities. |
| **CE1 / Primary 3** | 7–8 | **14 Games:** `grammar_lab` (noun/verb/adjective), `reading_lab` (fluent short texts), `pronunciation_lab` (phonetic precision), `math_lab` (arrays & tables 2–5), `math_monster_quest` (addition & tables RPG), `story_lab` (comprehension questions), `science_ecosystem` (food chains), `science_hero_tricks` (states of matter), `circuit` (simple bulb & switch), `africa_geography` (regions & rivers), `vocabulary_lab`, `auto_racer`, `tetris_blocks`, `fun_facts_quiz`. | Formal grammar introduction, multiplication arrays, electrical loops. |
| **CE2 / Primary 4** | 8–9 | **15 Games:** `conjugation_lab` (past/present/future), `grammar_lab` (subject-verb agreement), `vocabulary_lab` (bilingual idioms), `math_lab` (tables 6–9 & division), `math_magic_tricks` (rapid calculation), `math_monster_quest` (multiplication spells), `story_lab` (historical tales & comprehension), `circuit` (series circuits & switches), `botany` (photosynthesis & leaves), `density` (mass & water displacement), `africa_geography` (lakes, mountains, relief), `fun_facts_quiz`, `comet` (mental math defense), `auto_racer`, `pronunciation_lab`. | Division / sharing, verb tenses, scientific circuits, African geographic relief. |
| **CM1 / Primary 5** | 9–10 | **16 Games:** `math_lab` (fractions disc & decimals), `math_monster_quest` (fraction dungeons), `grammar_lab` (word functions & clauses), `conjugation_lab` (imparfait & conditionnel), `vocabulary_lab` (prefixes & suffixes), `pronunciation_lab` (fluent dialogue), `story_lab` (inferential comprehension), `chemistry` (mixtures & solutions), `circuit` (series & parallel circuits), `density` (buoyancy force & Archimedes), `science_ecosystem` (solar system & renewable energy), `africa_geography` (African Union & economies), `comet`, `tetris_blocks`, `auto_racer`, `fun_facts_quiz`. | Fractions, decimals, chemical solutions, parallel circuits, solar system. |
| **CM2 / Primary 6** | 10–12 | **16 Games:** `math_lab` (algebraic balance scale $ax+b=c$, percentages, ratio), `math_monster_quest` (algebra boss), `math_magic_tricks` (exam competition tricks), `circuit` (Ohm's law $U=RI$ & 12V super-lab), `chemistry` (acid/base pH & reactions), `density` (Archimedes buoyancy calculations), `science_ecosystem` (ecology & climate), `grammar_lab` (exam syntax & analysis), `conjugation_lab` (subjunctive & tense harmony), `vocabulary_lab` (advanced lexicon), `story_lab` (critical literary texts), `pronunciation_lab` (bilingual fluency), `africa_geography` (all 49 countries & capitals), `fun_facts_quiz` (continental championship), `comet`, `auto_racer`. | National exam prep (CEP / FSLC / KCPE), algebraic equations, Ohm's law, acid-base neutralization. |

---

## 3. Mandatory Law: Different Activity Per Game (3-Phase Activity Arc)

In every game, `activityPhase` (1, 2, and 3) provides three distinct pedagogical modes:

1. **Activity 1 (Phase 1): Mode Découverte & Exploration Guidée (Discovery Mode)**
   - Guided visual / auditory exploration.
   - Interactive tactile manipulation with step-by-step Rhea / Mascot voice coach.
   - Low pressure, foundational concept setup.
2. **Activity 2 (Phase 2): Mode Défi Arcade / Pratique Active (Practice & Challenge Mode)**
   - Active challenge: faster tempo, varied problem configurations, tactical interaction.
   - Earns +75 XP and combo multipliers (1.5x).
3. **Activity 3 (Phase 3): Mode Maîtrise & Défi du Boss 👑 (Boss Mastery Mode)**
   - Synthesis challenge synthesizing previous steps.
   - Defeating the Boss unlocks the level star ⭐, triggers 3D confetti fanfare, and earns +100 XP.

---

## 4. Quality Gate & Automated Testing
- `npm run test:games`: Executes `scripts/smoke-test.mjs` (jsdom 154/154 game × class bug hunt) and `scripts/age-adaptive-audit.mjs` (requires all 22 games to score 5/5).
- `npm run test:world`: Tests all 21 zones in `play.html` across classes and verifies mission variety.
- Zero crashes, zero broken buttons, 100% audio narration coverage, and zero repetition.
