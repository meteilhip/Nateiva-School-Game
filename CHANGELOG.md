# Changelog

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
