# SchoolGameSoul.md — Nateiva School Game Core Identity & Engineering Constitution

> **MANDATORY PRE-IMPLEMENTATION DIRECTIVE:**
> Every developer and AI coding agent MUST read and strictly adhere to `SchoolGameSoul.md` before designing, modifying, building, or deploying any feature in this repository.

---

## 1. Project Identity & Canonical Naming
- **Official Project Name:** **Nateiva School Game** (`nateiva-school-game`)
- **Primary Audience:** Children in **Kindergarten (*Maternelle*) and Primary School everywhere in Africa** across all class levels:
  - **MAT (Maternelle 1, 2, 3 / Pre-K, Nursery & Kindergarten / PP1–PP2 / Crèche, ages 2–5):** 100% Audio-First, colors, shapes, animal sounds, counting 1–10, African fables, sensory exploration.
  - **SIL / CI / CP1 (Grade 1 / Primary 1, ages 5–6):** Vowels, consonants, CV syllables (*ba, ma, ta, li*), numbers 1–20, simple addition, floating/sinking, germination.
  - **CP / CP2 (Grade 1–2 / Primary 2, ages 6–7):** Digraphs & nasal sounds (*ou, on, ch, an, in*), numbers 1–100, mental addition & subtraction, water cycle & plant organs.
  - **CE1 (Grade 2 / Primary 2–3, ages 7–8):** Polysyllabic reading, grammar (noun/verb/adjective), multiplication tables (2–5), geometry shapes, states of matter.
  - **CE2 (Grade 3 / Primary 3–4, ages 8–9):** Reading comprehension of African & world tales, conjugation, multiplication tables (6–9), division, perimeter, compass & electricity.
  - **CM1 (Grade 4 / Primary 4–5, ages 9–10):** Fractions, decimals, area ($L \times l$), solar system, energy & water cycle, morphology & prefixes.
  - **CM2 (Grade 5–6 / Primary 6 / CEP-FSLC-KCPE-PSLE Prep, ages 10–12):** Proportionality, percentages, algebraic balance scale, 3D volume, photosynthesis, Ohm's law & Archimedes buoyancy.
- **Mission:** Deliver an Apple-grade, video-game quality bilingual (French & English) educational arcade and interactive simulation platform tailored for Kindergarten and Primary Schools across all African countries (Francophone, Anglophone, and Bilingual curricula: CONFEMEN, PASEC, WAEC/NERDC, CBC, MINEDUB/MINEDUC).

---

## 2. Canonical Repository & Deployment Pipeline (Non-Negotiable)
All code changes, features, and assets in **Nateiva School Game** MUST be pushed and deployed exclusively to:

1. **GitHub Repository (`origin`):**
   - **URL:** [https://github.com/meteilhip/Nateiva-School-Game](https://github.com/meteilhip/Nateiva-School-Game)
   - **Remote:** `https://github.com/meteilhip/Nateiva-School-Game.git`
   - **Branch:** `main`
   - **Command:** `git push origin main`

2. **Vercel Production Project:**
   - **Dashboard URL:** [https://vercel.com/nateiva-s-projects/nateiva-school-game](https://vercel.com/nateiva-s-projects/nateiva-school-game)
   - **Production Alias:** [https://nateiva-school-game.vercel.app](https://nateiva-school-game.vercel.app)
   - **Vercel Scope / Team:** `nateiva-s-projects` (`team_xu7HitbK8IJQQ7zXqCoKnwsN`)
   - **Vercel Project ID:** `prj_VCAJzG3xRnpNQPNKIF2zKigTrQqe` (`nateiva-school-game`)
   - **Deploy Command:** `vercel --prod --yes`

---

## 3. UI/UX & Aesthetic Soul (Apple × Coca-Cola Design System)
- **Floating Cards & Levitation:** All cards use Apple squircle curvature (`24px`), frosted glass (`backdrop-filter: blur(24px)`), and staggered floating animation (`@keyframes appleFloat`).
- **Sleek Defined Borders:** Every card, navbar, level pill, and interactive control uses a crisp, visible `2px solid rgba(17, 24, 39, 0.24)` border (`--border-card`), elevating to a glowing Coca-Cola red border (`#E5252A`) on hover/active states.
- **Lustrous Red Accents:** Primary actions, active levels, and progress indicators use signature high-gloss gradients (`linear-gradient(135deg, #FF2A32 0%, #E5252A 100%)`).
- **Level-First Flow:** Students select their Level (`Niv 1`–`Niv 5`) and Grade (`MAT`–`CM2`) first; the game cards dynamically rearrange and adapt their curriculum and difficulty based on that selection.

---

## 4. Pedagogical & Gameplay Laws
1. **Zero Repetition Across Activities:**
   - Every level consists of **3 Activities**, and each Activity contains **5 Exercises**.
   - Exercises and activities **MUST NEVER repeat** after a completed activity. Each activity and exercise within a level must present a distinct word, story, equation, maze map, tangram silhouette, or simulation challenge.
2. **Automatic Progression:**
   - Completing all 5 exercises advances automatically to the next Activity (`Activité 1/3 -> 2/3 -> 3/3`).
   - Completing all 3 activities unlocks and advances to the next Level (`Niveau N -> Niveau N+1`).
3. **Native-Level Bilingual Narration & Pronunciation (FR / EN):**
   - Every instruction, phonics syllable, vocabulary word, story passage, and math prompt is narrated in studio-quality native French (`fr-FR-DeniseNeural`) and native English (`en-US-JennyNeural`), with automatic browser Web Speech API fallback on static cloud hosts.
   - Pre-schoolers (*Maternelle*) can play 100% by listening without needing to read text prompts.
4. **Real Tactile Physics & Arcade Simulations:**
   - Science and arcade modules must feature genuine HTML5 Canvas 2D physics, direct finger/mouse drag-and-drop manipulation (pouring liquids in chemistry, watering & sunlight in botany, buoyancy in Archimedes' tank, closing the knife switch in circuits, steering the ship in Comet Defender), and real-time visual feedback.

---

## 5. Single Localhost Architecture
- Local development and testing must run on a **single unified localhost port (`http://localhost:8081`)** serving both the web application (`index.html`, `arcade.html`, `public/*`) and the `/tts` neural voice endpoint—never split across multiple ports.
- Always sync all 4 HTML targets (`index.html`, `arcade.html`, `public/index.html`, `public/arcade.html`) before committing and deploying.
