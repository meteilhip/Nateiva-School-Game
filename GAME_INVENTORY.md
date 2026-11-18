# GAME_INVENTORY.md — Audit of the 22 current games (v1.16.0) & why they feel samey

## A. What each game does today

| # | Game (key) | What the child actually does | Visual format today | Learning objective (KEPT in any rebuild) |
|---|---|---|---|---|
| 1 | Magie Maths (math_magic_tricks) | Taps answer bubbles on canvas after an animated "trick" demo | Emoji sprites on flat gradient canvas + white DOM chrome | Mental-math strategies: bridge-to-10, ×9 fingers, doubles |
| 2 | Super Science (science_hero_tricks) | Taps answer bubbles after lever/water-cycle/light demos | Same emoji-canvas | Levers, water cycle, body, light |
| 3 | Tetris (tetris_blocks) | Moves/rotates falling number blocks to complete a 10-row | DOM grid board, 4 arrow buttons | Number bonds to 10, syllables |
| 4 | Course Auto (auto_racer) | Steers 3 lanes through answer gates | Pseudo-3D road on canvas, emoji car | Grade-scaled arithmetic |
| 5 | Monstres Maths (math_monster_quest) | Picks a spell (3 bubbles) to battle a creature | Emoji wizard/dragon on canvas | Addition→tables→fractions→algebra |
| 6 | Labo Nature (science_ecosystem) | Taps answers about food chain / magnets / space | Emoji-canvas | Ecosystem, states of water, magnets, solar system |
| 7–9 | Grammaire / Mots / Verbes (labs) | Picture↔word matching lanes, sentence-train, tense portals + floating canvas bubbles | DOM boards hidden behind canvas bubbles | FR/EN grammar, vocabulary, conjugation |
| 10 | Je Parle ! (pronunciation_lab) | Listens, speaks into mic, gets score | DOM panel, rhythm dots | FR/EN pronunciation |
| 11 | Mission Atlas (africa_geography) | Finds country on real SVG map, collects flags | Dark SVG map + white mission card | 49 African countries, capitals, regions |
| 12 | Tour du Savoir (fun_facts_quiz) | Taps answer bubble; block drops on physics tower, Kahoot timer | Canvas bubbles + tower canvas | General knowledge MCQ |
| 13 | Contes (story_lab) | Listens to read-along highlighted story, answers picture question | Text panel + sentence highlight | Listening & reading comprehension |
| 14 | Syllabes (reading_lab) | Feeds syllable chips to a monster to build words | DOM chips + emoji monster | Phonics, syllable blending |
| 15 | Maths 3D (math_lab) | Taps canvas tokens (ten-frames, arrays, fraction disc, balance) | Emoji tokens on canvas | Counting→fractions→algebra balance |
| 16 | Chimie (chemistry) | Drags/pours test tubes, watches pH indicator | Canvas beaker sim | Mixtures, pH, reactions |
| 17 | Flotte ? (density) | Drops objects into water tank, sees forces | Canvas water sim with vectors | Buoyancy / Archimedes |
| 18 | Électricité (circuit) | Closes knife switch, watches electrons flow | Canvas circuit sim | Circuits, Ohm's law |
| 19 | Jardin (botany) | Doses rain & sun sliders, plant grows | Canvas plant sim | Germination, photosynthesis |
| 20 | Fusée (comet) | Steers ship, lasers the correct comet | Canvas space shooter | Arithmetic under action |
| 21 | Tangram (tangram_puzzle) | Taps buttons to snap pieces (not real drag) | Canvas pieces + DOM buttons | Geometry, spatial reasoning |
| 22 | Labyrinthe (maze_quest) | D-pad/Blockly steps through maze collecting syllables | Raycast-ish canvas + D-pad | Spatial logic, paths |

**Color/format system today**: Apple-white floating cards, Coca-Cola red #E5252A accents, one shared HUD (level pills, steppers, Rhea coach, instruction banner), one shared 800×380 canvas, emoji as the only art, Fredoka-style type. Since v1.14–1.16: age-adaptive buttons, sticker book, mastery stars, Kids-Cinema hub tiles.

## B. Why it all "feels like the same game" (root causes)

1. **One shared chrome**: every game lives inside the identical dashboard (same banner, same stepper, same coach panel, same answer area) — 22 fillings, one sandwich.
2. **Emoji-sprite art**: every scene is emojis on a flat gradient canvas — no drawn characters, no parallax, no cinematic framing.
3. **Answer-selection DNA**: most interactions still terminate in "pick 1 of N" — even when dressed as bubbles, gates or spells.
4. **Same pacing**: prompt → narration → pick → toast → next, identical rhythm in all 22.

## C. Verdict → NATEIVA WORLD (new build, from zero)

A separate, brand-new full-screen cartoon adventure (`play.html`) that keeps ONLY column 5 (learning objectives): a living island world map, hand-drawn SVG characters and scenery (no emoji sprites), 100% direct manipulation (drag, pop, paint, pour, throw, fly — zero answer buttons, zero required reading), audio-first narration FR/EN, per-class difficulty MAT→CM2, stars/stickers progression. Inventory of its zones is documented in the file header of `play.html`.
