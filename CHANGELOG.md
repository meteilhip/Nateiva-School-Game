# Changelog

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
