# GAME_DESIGN_RESEARCH.md — REA Top-Game Feature Matrix (v2.0 — Nov 2026)

REA (Reverse-Engineering Analysis) of the top-rated education game in each category and age band that Nateiva School Game currently covers. Each feature marked ➜ is rebuilt into our engine by the Age-Adaptive Redesign (v1.14.0).

## 1. Category Leaders Analyzed

| Our Category | Top Game (Rating) | Age Band | Signature Features Extracted |
|:---|:---|:---|:---|
| Preschool / All (MAT) | **Khan Academy Kids** (Common Sense 5★) | 2–8 | 100% audio-first, zero reading required, mascot guides, tap-only, no-fail gentle retry, warm narration ➜ `AgeUX` MAT profile |
| Early Reading (MAT–CP) | **Duolingo ABC** / **Teach Your Monster to Read** (4.3–4.5★) | 3–7 | Bite-sized lessons, picture↔word matching, custom monster avatar, journey map, collectible rewards (costumes/"Trickies"), phonics mini-games (catch the grapheme, build-word jumps) ➜ Sticker Book + pictorial answer buttons |
| Math (SIL–CM2) | **Prodigy Math** (#1 kid-voted, 1,500+ skills) | 6–14 | RPG wrapper (battles/pets/quests), adaptive difficulty, math gates the fun, collectibles, worked-example manipulatives ➜ auto-hint tutor escalation + mastery stars + reward chest |
| Science (all) | **Toca Lab / Tinybop / PhET** (4.8–4.9★) | 4–12 | Elements-as-characters, no-fail sandbox, manipulate variable → observe outcome in real time, no reading needed ➜ our tactile sims keep drag-physics; MAT gets picture-only controls |
| Geography | **Stack the Countries / Seterra** (4.5–4.7★) | 5–16 | Answers earn collectible country pieces, Learn-mode before quiz, unlockable bonus games, personal map fills up, Africa-specific drills ➜ mastery collection per game card |
| Quiz / Trivia | **Kahoot!** (8.6M educators) | 6+ | Energy music, speed points, streak bonuses, podium, 50/50 lifeline, images-as-answers ➜ 50/50 kept, pictorial MCQ, combo streaks |
| Stories / Comprehension | **Epic! / Khan Kids stories** | 2–12 | Synchronized read-aloud highlighting, choose-what-happened picture questions ➜ story_lab keeps sentence highlight; MAT questions become picture choices |

## 2. Cross-Cutting Laws Extracted (applied to ALL 22 games)

1. **MAT (Maternelle, 2–5, pre-readers)**: no reading ever required — every prompt auto-narrated, every answer choice is a BIG PICTURE first (emoji/cartoon ≥3rem), text dimmed to caption size, tap-to-hear speaker on every choice, bigger touch targets (≥76px), slower speech rate (0.68), auto-demo/hint after 1 miss, gentle no-fail retry.
2. **Progressive literacy ladder**: SIL/CP keep pictures primary + short words visible; CE1→CM2 progressively text-forward with normal rate; reading load per answer scales with grade.
3. **Reward meta-loop** (Prodigy/TYMTR): persistent Sticker Book (localStorage) — African animal & badge stickers earned by completed activities, collection viewer with silhouettes for locked items, celebratory unlock popup with confetti + narration.
4. **Mastery visibility** (Seterra/Prodigy): per-game × per-class mastery stars shown directly on each portal card, persisted.
5. **Tutor escalation** (Khan/Prodigy): wrong-answer streak triggers automatic slow re-narration of the prompt + visual coach pulse (Rhea coach panel).
6. **Juice** (Kahoot): combo streaks, confetti, floating scores, level-up fanfares (already present — kept).

## 3. Quality Gate

`scripts/age-adaptive-audit.mjs` scores every game 0–5 against the matrix (pictorial answers, audio coverage, celebration, grade adaptation, mastery/reward integration). `scripts/smoke-test.mjs` (jsdom) launches all 22 games × 7 classes hunting: dead/broken buttons, missing voice narration, visual-vs-text mismatches, JS exceptions. Release requires **every game ≥ 4/5** and zero smoke failures.
