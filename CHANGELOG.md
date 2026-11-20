# Changelog

## v1.28.0 — Activity doors in every playground + 3 new playgrounds (21 zones)
- **Choose your game**: 12 playgrounds now open on premium glassy "activity doors" — big cards with icons, a ⭐ on activities already played, and a 🎮 button in-game to switch anytime. Verger: Compter/Additions/Multiplier/Partager · Bulles: Attrape/Sommes · Studio: Zèbre/Formes/Fractions · Splash: Observe/Scientifique · Jardin: Fais pousser/Docteur des plantes · Safari: Pays/Capitales · Échecs: one door per piece + Tous mélangés · Mots: Première lettre/Épelle · Chantier: choose your structure (maison/fusée/pont/robot/bateau) · plus the new zones below. Doors unlock with the class level.
- **🎵 Studio Rythmo (new)** — after the top-rated kids' music apps: a glowing xylophone with real notes (DO-RÉ-MI, dual-oscillator WebAudio) for free play, and "Répète la mélodie" — a Simon-style memory game whose melodies grow with the class.
- **🏥 Clinique Câlins (new)** — Toca-style pet care: choose Biscuit the puppy, Plume the kitten or Cotton the bunny, then wash the mud spots, feed exactly N treats (counting aloud), and bandage the blinking ouchie — hearts everywhere.
- **🧩 Puzzles de l'Île (new)** — Busy-Shapes-style shape sorter (3→6 silhouettes by age) and REAL picture jigsaws cut with clip-paths (2→4 slices by class) from the Imagier drawings.
- Island regrown to 21 zones (3×7 desktop grid, trail auto-extends); smoke suite now opens EVERY door of every playground at MAT and CM2 in both orientations — ALL CLEAR.

## v1.27.0 — Glass mission bar, native female narrator, working microphone, EXAM mode
- **Mission bar fixed in ALL 18 games**: the long class chip was crushing the text into a huge half-screen column (missing flex/min-width). Now a slim translucent glass strip (backdrop blur), chip ellipsised, text capped at 3 lines — and after ~5s it folds into a small pill so nothing ever hides the game (tap the pill to re-read/re-hear).
- **Narration: native female voice**: every installed voice is scored (native fr-FR/en-US +, known female voices — Amélie/Denise/Julie… and Samantha/Jenny/Aria… +, neural/Google +, male −) and the best is cached per language; brighter pitch.
- **Microphone actually works**: recognition now starts synchronously inside the tap (mobile browsers block it otherwise), speech is silenced while listening, red "PARLE !" state, up to 3 retries with coaching ("parle plus fort, tout près du téléphone"), friendly permission message, and a green continue button — the round now WAITS for the mic instead of racing past it.
- **📝 EXAMEN BLANC per class**: in the Académie — 10 mixed questions (maths, lecture/compréhension, sciences, géographie) at the class level, no hints during the exam, results sheet with ✓/✗, corrections with step-by-step astuces, mention (🏆 Excellent / 🌟 Très bien / 👍 Bien / 💪), and best score saved per class shown in the picker. Topic quizzes are labelled as exam prep.
- **Answers can't sit in the same place**: FLOTTE/COULE and hypothesis buttons swap sides randomly each round (all quiz-type zones already shuffle).
- **Goal → result**: the victory card now names the mastered lesson ("✅ Leçon maîtrisée : × et ÷ partage") and says it aloud.
- Smoke suite now simulates the full exam (10 varied answers, asserts a /10 results sheet and ≥8 unique questions) at SIL and CM2, both orientations ALL CLEAR.

## v1.26.0 — Tap-first rebuild of the 4 reported zones + visible version
User-reported: Verger, Formes & Couleurs, Lagon Splash and Jardin de Nana unusable/confusing on phone. Root cause: precision drag-to-target mechanics — wrong pattern for toddlers on touch screens (top kids apps are tap-first). Rebuilt:
- **Tap gesture everywhere**: a short press with no movement is now a TAP (makeDraggable gained a tap handler); dragging still works for desktop kids.
- **Verger de Momo**: tap a fruit → it arcs into the GLOWING basket by itself (rotating golden dashed ring marks the active basket; baskets take turns in share mode = visual division dealing); counting spoken on each landing.
- **Lagon Splash — fully rebuilt**: tap an object → it leaps into the water and the physics plays; then two giant FLOTTE!/COULE! buttons ask what happened (observe → answer). CE2+: hypothesis buttons come FIRST (🧪 "Ton HYPOTHÈSE d'abord !"), then the splash verifies it. No more dragging to docks. Densities still shown at CM.
- **Jardin de Nana — fully rebuilt**: the plant now shows a THOUGHT BUBBLE with what it needs (💧 or ☀); the cloud and sun are big ringed BUTTONS — tap the cloud, it glides over the plant and rains by itself; tap the sun, light flashes. Over-tapping still teaches "trop d'eau noie la plante". Organ-labelling rounds unchanged.
- **Studio de Zara**: at Maternelle the right paint pot now selects itself and bounces — toddlers only tap what to paint; clearer flow for everyone.
- **👉 Animated hand guide**: at MAT/SIL a drawn hand taps the first object of the round in these zones, showing toddlers exactly what to do.
- **Version visible on the site**: tiny "v1.26.0" tag bottom-right; africa-data.js cache-busted.

## v1.25.0 — Voice fixed on phones, Perroquet Coco, Imagier Magique (18 zones)
- **Voice works on Android/iPhone now**: speech is unlocked on the first tap (mobile browsers block speech before a user gesture), the cancel-then-speak race that silently swallowed utterances on Android is fixed (re-queued after a beat), long texts are split into sentences (mobile cuts long utterances), and the first tap replays the current instruction so no child misses it.
- **🦜 Perroquet Coco (new zone — PRONONCIATION FR+EN)**: Coco says a word, the child taps the word heard. Maternelle: very different words (pure listening). CP+: minimal pairs (PAIN/BAIN, TOUT/DOUX, CHOU/JOUE…) with articulation coaching ("P souffle, B fait vibrer ta gorge — pose ta main sur ton cou"). CE2+: English pairs too (SHIP/SHEEP, CAT/CUT, THREE/FREE). Slow-replay button; **optional microphone bonus**: the child repeats the word and real speech recognition cheers a good pronunciation (graceful fallback when no mic).
- **📖 Imagier Magique (new zone — THÉMATIQUES)**: 8 themed packs (animaux, fruits, couleurs, corps, météo, transports, école, famille) with ~30 hand-drawn pictures. Learn phase: big picture + word spoken in FRENCH then ENGLISH; play phase: 5 find-the-picture rounds (English prompts from CP); finish = **badge 🏅 "Je connais les animaux en français ET en anglais"**, saved forever.
- **Search now shows images**: theme cards with drawn pictures appear in the 🔍 (and 4 suggested themes before typing); typing "fruits", "body", "couleurs"… or even a single word like "banane" opens the right themed lesson.
- **Per-class differences now visible from the home page**: every island on the trail (and desktop map) shows a level line for the selected class — e.g. Verger de Momo: "MAT · Compte les fruits" vs "CM2 · × et ÷ partage" — and switching class rebuilds the map, announces the class program, changes the sky theme and the in-zone chip.
- Island regrown to 18 zones with a clean 3-row desktop grid; empty-transform guard; smoke = 18 zones × 3 grades × 2 orientations, ALL CLEAR.

## v1.24.0 — Premium scrolling trail home, FR|EN switch, anti-repeat engine, per-class look
- **New phone home — the Adventure Trail**: fitting 16 islands on one screen made everything tiny, so the phone home is now a Duolingo/Candy-Crush-style vertically scrolling golden path: giant 94-unit medallions with gold halo rings, 37pt island names with white outlines, 25pt subject pills, big star rows, swaying trees/flowers and Momo & Fela along the way. Desktop keeps the fitted island.
- **Visible FR | EN switch**: the globe button is now a pill that shows both languages with the active one highlighted — one tap flips the whole game (and announces it).
- **Anti-repeat engine** (`pickFresh`/`freshQ`, persisted): the river, word factory, seek-and-find, theatre and every Academy topic now rotate through their banks without serving the same item twice until the bank is exhausted; Griot stories show a ✅ once completed.
- **Bigger banks**: +8 French and +6 English river words (incl. 3-syllable DO-MI-NO, CA-MI-ON, PY-JA-MA), +4 word-factory pictures (ARBRE, BANANE, BATEAU, COEUR with new drawings), 3 new theatre fables (6 total), +12 English-vocab words, +3 school-context comprehension sentences (sur / après avoir / à moins que).
- **Classes now LOOK different too**: the sky itself changes with the class (bright day MAT–SIL, warm sunset CP–CE1, royal dusk CE2–CM2) in every outdoor zone, and the in-zone chip now reads e.g. "MATHS · CM1" so the tailoring is visible; Théâtre drops to 2 big answer cards at Maternelle.
- Dual-orientation smoke (desktop + 412×915) still ALL CLEAR across 16 zones × 3 grades.

## v1.23.0 — Portrait-native rebuild: every zone redesigned for the phone
The game was unplayable on phones inside zones (landscape 1500x850 stages letterboxed to thumbnails). Full rebuild:
- **New stage engine (`mkStage`)**: every zone now renders on a portrait-native 850x1500 canvas on phones with `slice` — the game fills the screen edge to edge, no letterboxing, with a `PT(landscape, portrait)` coordinate system per element.
- **All 13 playground zones re-laid-out for portrait**: content stacked vertically (clue/board top → play area middle → baskets/docks/palettes/trays in the thumb zone), touch targets enlarged to ≥44px on screen (fruit 58u, tiles 54u, pads 118u, chess cells 106u), SVG fonts ×1.3–1.7.
- Zone specifics: bubbles board top-center & bigger bubbles · orchard tree top, fruit grid middle, baskets bottom · river 2×2 pads, slots under the mission, Fela at the bottom · paint pots as a bottom row · splash shelves top, water middle, FLOTTE/COULE docks bottom, hypothesis buttons mid-screen · garden plant center, meters bottom · safari map scaled to full width, clue card bottom · theatre show plays in a scaled stage with full-width answer cards stacked below · builder blueprint center, tray rows in thumb zone · seek full-tall savanna · words picture top, slots middle, letter tiles bottom · create 2-row stamp palette at the bottom · chess board nearly full-width.
- **Island map**: clean 2-column serpentine grid for all 16 stations on portrait (no label overlaps, Léo in the sky, bigger island).
- Orientation flip rebuilds the active zone automatically; rotate-hint removed (no longer needed).
- **Smoke suite now runs twice — desktop landscape AND 412x915 portrait — with an off-canvas detector**: 16 zones × 3 grades, zero out-of-screen elements, both ALL CLEAR.

## v1.22.0 — Age-differentiation audit: no zone plays the same at 3 and 10
Audit of all 16 zones found 3 that were too flat across classes; each now has true per-age modes:
- **Studio de Zara (paint)**: MAT–CP paint the zebra's named body parts in the asked color; CE1–CE2 paint all of a shape; **CM1/CM2 get Magic Fractions — paint exactly k/N of a fence, with a live fraction counter (2/5…) spoken as they go**.
- **Lagon Splash**: Maternelle gets 3 strongly-contrasted objects; **CE2+ gets Scientist Mode — state your HYPOTHESIS (flotte/coule) BEFORE the drop, then verify** (wrong hypotheses coached, right ones celebrated); CM1/CM2 keep real density readouts.
- **Jardin de Nana**: MAT–CP grow the plant; **from CE1, growing rounds alternate with "plant organs" rounds — tap les racines/la tige/les feuilles/la fleur; at CM1/CM2 the prompt is by FUNCTION ("touche l'organe qui fabrique la nourriture avec la lumière")**, each answer narrating the organ's role.
- Smoke test now asserts the fraction task at CM2, runs the organ round at CE1 & CM2, and prints a mission-variety report across MAT/CE1/CM2 for every zone.

## v1.21.0 — Phone-first + Math Lab + Griot History + Kids Chess (16 zones)
- **Phone-first pass** (95% of players are on phones): compact HUD/mission-bar/gems/grade-dock at ≤760px, horizontally scrollable class dock (was overflowing on 390px screens), responsive Academy/quiz typography, tighter search grid, and a "🔄 Tourne ton téléphone" hint when opening big playground zones in portrait.
- **🔬 Labo des Maths (new zone)**: lessons that MOVE — 10 animated step-by-step concept demos with highlights, drawn underlines and flying objects: counting, counting-on, make-a-ten (ten-frame), taking away, multiplication arrays (+ commutativity trick), fair-share division, fractions on a cut orange (+ 3/4 of 8), the 100-grid for percentages, square root as the side of a perfect square, and the equation balance. Filtered per class, narrated FR/EN, replayable step by step.
- **🌳 Baobab du Griot (new zone)**: African & Cameroon history as read-and-listen stories with per-story comprehension questions and "reread with me" coaching — flag of Cameroon, the giant continent, Mount Cameroon, pyramids of Egypt, Mansa Musa & Timbuktu, 1960 independence & bilingualism, Sultan Njoya's Shümom script, Nelson Mandela, the great kingdoms (Ghana/Mali/Songhai, Sao bronzes, Bamun & Bamileke). Banded MAT→CM2.
- **♟️ Échecs Magiques (new zone)**: kids chess on a 6×6 castle board with cartoon pieces — tap where the piece can catch the star; move rules spoken; green helper dots at Maternelle; piece set grows with class (pawn/rook → bishop → knight → queen/king); legal-but-wrong taps teach gently without penalty.
- **Sentence comprehension in school context**: new Academy topic "Comprendre les phrases" — 9 banded school-scene items (dans/pendant/avant-puis/parce que/sauf/bien que/dès que/si) with step-by-step rereading tricks, FR/EN.
- **Toddler word game**: Fabrique de Mots at Maternelle becomes tap-the-first-letter with giant letters and pictures.
- World smoke extended: 16 stations, all Math Lab steps executed, all Griot stories validated.

## v1.20.0 — Curriculum Engine, Real Africa & Quiz Academy
- **Layout engine**: the island map now computes the truly visible band under `slice` cropping plus the HUD/grade-dock overlays and uniformly fits the whole island inside it — the title is never cut, the grade pills never cover station labels/stars, and the sun no longer collides with the star counter.
- **Real Africa**: Balloon Safari now flies over the TRUE 49-country map (real cartography, shared `africa-data.js`), with region-colored countries, shape-recognition clue cards, capital-only mode for CM1/CM2, star markers on found countries and a 3-miss hint glow.
- **Académie des Champions (13th island)**: searchable curriculum quizzes per class — type "fractions", "conjugaison", "capitales"… → 5 grade-level MCQs, each with a spoken step-by-step Astuce, auto-opened on mistakes, and a full **fiche de réponses** (answer sheet) with per-question worked solutions.
- **Curriculum matrix**: official program per class (MAT→CM2 × maths/langues/sciences/géo) shown in the Academy and driving topic availability; 27 bilingual question generators (proportionnalité FCFA, pourcentages, aire/volume, équations-balance, nature des mots, préfixes, loi d'Ohm, photosynthèse, cycle de l'eau…).
- **Science realism**: Splash Lagoon shows & speaks real density values (ρ) for CM1/CM2 with the ρ>1 sinks rule.
- Island search now also returns quiz topics; world smoke test extended (13 stations, generator fuzzing ×25 per grade).

## v1.19.0 — Hover Fix + 4 New Zones
- Fixed the hover zig-zag that made island stations unclickable (CSS transform was replacing the SVG station position; hover is now glow-only).
- 4 new zones: Chantier de Tibo (blueprint building), Cherche & Trouve (hidden-object observation), Fabrique de Mots (drag-letter spelling), Atelier Magique (free stamp creation).

## v1.18.0 — NATEIVA WORLD responsive hardening
- Dual landscape/portrait layouts, fat touch targets, window-level drag tracking, safe-band repositioning of play objects.

## 1.17.x — 2026-11-18 — NATEIVA WORLD (brand-new game, built from zero)

- **`play.html` — a completely new experience** sharing only the learning objectives with the classic arcade (documented in `GAME_INVENTORY.md`): a living hand-drawn SVG cartoon island (no emoji sprites) with 8 adventure zones — Lagune aux Bulles (pop rising fish-bubbles to count/sum), Verger de Momo (drag fruit into baskets: counting→addition→multiplication→equal sharing), Rivière de Fela (the frog leaps on the lily pad that matches the spoken syllable, builds words), Studio de Zara (paint the zebra's parts / all the triangles in the asked color), Lagon Splash (drop objects into real buoyant water, then sort FLOTTE/COULE), Jardin de Nana (drag the rain cloud and sun to grow the plant — too much hurts it), Safari Ballon (fly Léo's balloon to the right country by name, flag or capital), Théâtre Kalulu (animated fable plays out, then pick/sequence picture panels).
- **100% direct manipulation**: drag, pop, paint, drop, fly, leap — zero answer buttons, zero required reading; everything narrated FR/EN (toggle), per-class difficulty MAT→CM2, round gems, zone stars and localStorage progression; blinking characters, parallax clouds, waves, confetti, WebAudio sound design.
- Fixes during live play-testing on OVH: CSS keyframe classes were overriding SVG positioning (invisible Momo/Léo/balloon) → composited Web-Animation FX; fat invisible touch targets for small draggables; window-level drag tracking with guarded pointer capture; play objects moved out from under the mission banner; class dock hidden during gameplay.
- `npm run test:world` boots the island and all 8 zones × 3 grades in jsdom hunting JS errors.
- Hub hero banner "NOUVEAU ! NATEIVA WORLD" links to the world from the classic arcade.

## 1.16.0 — 2026-11-18 — V23.0 KIDS CINEMA HOME + instant updates

- **Kid-friendly home page**: game cards became big cartoon tiles — huge bobbing icon (4.6 rem), a 1–2 word kid title (full title kept as tooltip/aria-label), a big red ▶ JOUER / PLAY bubble, vivid per-category gradient backgrounds, and a 3D perspective tilt on hover. All long text (descriptions, curriculum tags, pills) hidden — images and cartoons before words, for every class.
- **Animated cinematic sky**: pulsing sun, three drifting clouds, a rising balloon and a flying parrot behind the whole hub (pure CSS animations, pointer-safe), plus a sky-to-savanna page gradient.
- **"Version did not update" fixed**: the old service worker was cache-first for the page itself (every visit served the previous deploy) and was never re-registered, leaving stale zombie workers in browsers. `sw.js` is now **network-first for pages** (cache only as offline fallback, cache-first kept for audio/images), properly registered from the app, and served at the root on Vercel too. All version badges unified at v23.0 (v1.16.0).
- 154/154 test runs green; all 22 games ≥ 4/5.

## 1.15.0 — 2026-11-18 — V22.0 CORE-GAMEPLAY REBUILD (quiz-only mechanics eliminated)

- **Tour du Savoir** (rebuild of `fun_facts_quiz`, adapted from *Stack the Countries* × *Kahoot!*): every correct answer becomes a physical block that falls, bounces and stacks onto a wobbling Knowledge Tower rendered on a dedicated canvas (gravity + bounce physics, savanna backdrop, 5-block confetti milestones). Kahoot-style countdown (hidden at Maternelle, 45 s at SIL/CP, 30 s at CE1+) awards ⚡ speed stars; running out of time gives a **free 50/50 hint instead of a fail** (no-fail law).
- **Mission Atlas** (rebuild of `africa_geography`, adapted from *Seterra* × *Stack the Countries*): the answer is no longer pre-highlighted and the duplicate MCQ buttons are gone — the child must **find the country on the real 49-country SVG map**. 3 distinct missions per exercise (find by name+flag / by flag only / by capital at CE1+), ❤️ 3 tries then the country pulses as a hint, every wrong tap teaches that country's name and capital, and each found country is saved forever to a **personal Atlas** (flag collection strip + permanently green countries, localStorage). Maternelle/SIL get 4 big pulsing candidate countries with the rest dimmed.
- **Bug fixes found by the harness**: 6 corrupted regexes (lost backslashes) broke sentence-by-sentence story highlighting and emoji-stripping (`/(?<=[.!?])s+/` → `\s+`, etc.); uppercase ISO codes (e.g. "TZ") in geography questions never matched the lowercase map paths, making those rounds unwinnable by map-tap — now case-normalized.
- **Test suite extended**: mechanic-level checks (answer must not be pre-highlighted, wrong tap must consume a try, found country must persist to the atlas, correct quiz answer must drop a tower block, Maternelle must have no timer) + timeout tracking for test isolation. 154/154 runs green, all 22 games ≥ 4/5.

## 1.14.0 — 2026-11-18 — V21.0 AGE-ADAPTIVE REA TOP-GAME REBUILD

- REA analysis of the top-rated education game per category (Khan Academy Kids, Duolingo ABC, Teach Your Monster to Read, Prodigy Math, Toca Lab/PhET, Stack the Countries/Seterra, Kahoot!) distilled into `GAME_DESIGN_RESEARCH.md` v2 and rebuilt into the engine.
- **Age-Adaptive Presentation Layer across all 22 games**: Maternelle (2–5, pre-readers) now plays picture-first — every answer choice shows a BIG animated cartoon picture (≥3rem) matched to its meaning, long text dims to caption size, touch targets grow to ≥84px, speech slows to 0.68 rate, and every choice has a tap-to-hear 🔊 chip. SIL/CP keep pictures primary with short words; CE1→CM2 progressively text-forward with faster narration.
- **Persistent Sticker Book** (Teach-Your-Monster × Prodigy collection law): 24 African animal & badge stickers earned every 3 completed activities, saved in localStorage, with celebratory unlock popup (confetti + narration) and a floating 🎖️ collection viewer with silhouettes for locked stickers.
- **Mastery stars on every game card** (Seterra/Prodigy law): per-game × per-class progress (☆☆☆→★★★) persisted and displayed on the hub, updating live with the selected class.
- **Tutor escalation** (Khan/Prodigy law): a wrong-answer streak (1 miss at MAT, 2 at SIL/CP, 3 at CE+) auto-replays the prompt slowly and pulses the Rhea visual coach.
- **Full automated bug-hunt & quality gate**: `npm run test:games` launches all 22 games × 7 classes in jsdom hunting dead buttons, missing voice narration, visual/answer mismatches, unwinnable MCQs and JS errors (`scripts/smoke-test.mjs`), then rates every game 0–5 against the REA feature matrix (`scripts/age-adaptive-audit.mjs`). Current release: **154/154 runs pass, all 22 games rated 5/5** (gate requires ≥4/5).

## 1.4.0 — 2026-11-08

- Replaced the shared language quiz interaction with three distinct touch-first activities: vocabulary picture matching, grammar sentence-train building, and conjugation time portals.
- Added Number Tetris with rotate/move/drop controls, a ten-cube row objective, voice guidance, and class-adjusted fall speed.
- Added Safari Math Racer with an animated perspective road, three large answer gates, bilingual spoken prompts, and grade-adjusted equations.
- Added original 3D clay-style Tetris and safari-racing illustrations; included generation prompts alongside the shipped images.
- Refined the phone play view so the Tetris board stays inside its scene, the goal copy wraps cleanly, and launching the new games opens at the play area.
- Kept progress tracks independent by game and class, and kept automatic progression on every completed challenge.
- Rebuilt the version badge as NATEIVA · v1.4.0 in the upper-left header.

## 1.3.0 — 2026-11-07

- Added sixteen original cartoon cover illustrations, one for each game in the library.
- Rebuilt the mobile game shelf as image-led cards with separate title, short action, and per-game level rows to prevent text/art overlap.
- Added a distinct animated story scene to every game's play screen and refreshed its touch-first activity frame.
- Moved the visible release badge to the upper-left header and updated it to v1.3.0.
- Preserved the bilingual curriculum and independent progression for each game and class.

## 1.2.2 — 2026-11-06

- Run the isolated OVH Compose project through sudo on VPS hosts where the deployment user does not have Docker socket access.

## 1.2.1 — 2026-11-06

- Fix first-time OVH setup by creating the isolated Nateiva deployment directories with the deployment user's ownership.

## 1.2.0 — 2026-11-05

- Rebuilt the mobile game library as illustrated, animated adventure cards with short, action-led prompts.
- Added an independent level, mastery meter, and saved progress path for each game type and class.
- Automatically unlock the next level within the game a child completes; other subjects keep their own level.
- Expanded touch targets and removed the shared level picker that implied one level applied to every game.
- Updated the five-game design research notes with the patterns adapted for Nateiva.
- Synced the four HTML arcade entrypoints and aligned the app version with the release.

## 1.1.1 — 2026-11-05

- Add a GitHub Actions deployment path for the Nateiva School Game OVH mirror.
- Serve the static arcade under `/school-game/` with relative asset and PWA paths.
- Isolate the VPS copy in `/opt/nateiva-school-game` with dedicated Docker Compose names and a loopback-only upstream.
- Document the GitHub, Vercel, and OVH deployment pipeline.

## 1.1.0 — 2026-11-04

- Reframed the arcade as a premium illustrated field guide with a bilingual adventure entry point.
- Added original Léo and Kiki savanna artwork plus six subject illustrations for the game library.
- Introduced a matrix-style animated answer board for math arcade activities and clearer explore/play/master labels.
- Self-hosted Fredoka and Nunito fonts, improved focus visibility, and respected reduced-motion preferences.
- Kept Nateiva's curriculum, bilingual narration, class selection, and progression; aligned app and package versions.
