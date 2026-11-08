# Educational Game Design Research

Five reference products were reviewed for their interaction patterns. These are design inputs; Nateiva keeps its own characters, curriculum, art, and visual language.

| Reference | Observed design pattern | Nateiva application |
|---|---|---|
| [ST Math](https://www.stmath.com/) | Its official curriculum guides describe visual puzzles organized into objectives, games, levels, and puzzle sets, with the puzzle showing the effect of a learner's move. | Keep discovery visual, show an immediate world response, and advance mastery only on the track being practised. |
| [DragonBox Numbers](https://www.dragonbox.com/attachment/14/download) | Number characters can be pulled apart and recombined; children experiment with quantities in a sandbox before connecting the play to symbols. | Put objects and pictures before text, and give number activities a build-and-transform loop. |
| [Khan Academy Kids](https://www.khanacademy.org/kids/math) | Its early learning activities combine visual models, short playful feedback, varied skills, and progression adapted to the individual child. | Keep instructions spoken and brief, make feedback encouraging, and store progress for each type of activity and class. |
| [PBS KIDS Games](https://pbskids.org/games) | The game library spans many short, character-led activities with distinct stories and interactions rather than one uniform game format. | Give each Nateiva card a clear picture and action verb; keep maze, shape, story, language, and science play loops recognizable as different. |
| [Prodigy Math](https://www.prodigygame.com/main-en/prodigy-math) | Curriculum practice advances a character through quests and battles, while adaptive difficulty tracks the learner's skill. | Make correct work change the adventure, unlock the next level automatically inside that subject, and keep each subject's mastery separate. |
| [Browser Tetris reference](https://github.com/dh1542/tetris) | A small vanilla-JavaScript Tetris codebase isolates the falling-piece board loop and controls from its page shell. | Use original code for a child-safe block puzzle with touch controls, clear rows, unit-cube counting, and class-adjusted speed. |
| [Open-source letter learning game](https://github.com/Dicklesworthstone/letter_learning_game) | Short matching rounds pair visible letters with sound and preserve progress by skill. | Use picture/word matching and spoken feedback for vocabulary, rather than another fill-in-the-blank quiz. |

## Design Decisions

- Subject illustrations and animated state changes are part of the learning affordance, not decoration around a worksheet.
- The web arcade keeps French and English voice support, grade selection, progression, and the existing curriculum content.
- We use the references for interaction principles only; no characters, screens, or brand assets are copied.
- The mobile library leads with illustrated covers and one short action prompt per game; long descriptions are secondary.
- All eighteen portals have original cover illustrations. On phones, artwork, title, short action, and progress each have a separate zone.
- Each game type stores level, exercise progress, and wins separately for every class, so maths advancement never advances phonics or science.
- The literacy cluster now has separate interactions: vocabulary picture-pair matching, grammar sentence-train placement, and conjugation time-portals.
- Two original arcade loops were added: Number Tetris (rotate/drop, clear a row of ten unit cubes) and Safari Math Racer (steer by choosing the correct answer lane).
- Existing games retain their own core verbs: trace, build, match, listen, mix, grow, drop, power, defend, explore, spot, collect, or travel. Shared navigation and progress are deliberately common; the activity itself changes by game.
- Tetris and racing draw from the code patterns and game-design references above; Nateiva's implementation, code, characters, and artwork are original.

## Open-source REA source studies

REA's JavaScript application analyzer was run over the source trees for:

- [Tica Math](https://github.com/Carton/tica-math), a Phaser/TypeScript arithmetic adventure. Use per-skill difficulty and game-flow states as reference patterns.
- [Moonbeam](https://github.com/bitpshr/moonbeam), a phonics game for early readers. Use its short progressive sound/letter loop, mascot feedback, and audio cues as reference patterns.
- [Current Viewer](https://github.com/vbario/Current-Viewer), a browser electronics workbench. Use the separation between circuit components, connections, and live feedback as a science-simulation reference.

These projects were inspected for implementation patterns; Nateiva's source, art, curriculum, and characters remain original.
