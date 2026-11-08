# Changelog

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
