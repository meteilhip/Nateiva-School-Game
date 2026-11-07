# Changelog

# Changelog

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
