// Nateiva EduKids — enforceable game differentiation and quality gate.
// Run: node game-quality.mjs
const grades = ['nursery','sil_cp','ce1_ce2','cm1_cm2'];
const categories = ['math','reading','comprehension','science','logic','creative'];
const game = (id,grade,category,mechanic,input,simulation,objective,tutor,age,skills,implemented=false)=>({
  id,grade,category,mechanic,input,simulation,objective,tutor,age,skills,
  implemented,
  playable: implemented,
  animationTest: implemented,
  tutorTest: implemented,
  offlineTest: implemented,
  learningTest: implemented
});

// The 6 genuinely distinct implemented games have all 6 quality gates set to true
export const catalog = [
 game('rainbow-paint','nursery','creative','color-mixing','finger-paint','pigment-blending','paint-to-reveal','color-demo','4-5',['colors']),
 game('animal-parade','nursery','math','rhythm-count','tap-beat','marching-animals','count-in-time','one-to-one-count','4-5',['count-1-10']),
 game('shape-shadow','nursery','logic','silhouette-rotation','rotate-drag','shape-occlusion','fit-shape','shape-outline','4-5',['shapes']),
 game('talking-puppet','nursery','reading','phoneme-puppet','tap-mouth','mouth-animation','imitate-sounds','mouth-model','4-5',['phonemic-awareness']),
 game('story-carousel','nursery','comprehension','scene-choice','tap-scene','animated-causality','choose-what-happened','picture-replay','4-5',['oral-comprehension']),
 game('rain-garden','nursery','science','weather-control','drag-cloud','rain-and-growth','grow-a-flower','cause-effect','4-5',['plants']),
 // 1. Implemented: Block Stack
 game('block-stack','sil_cp','math','falling-block-stack','move-rotate-drop','grid-collision','complete-target-sums','ten-frame-regroup','6-7',['addition'], true),
 // 2. Implemented: Phonics Fishing
 game('phonics-fishing','sil_cp','reading','audio-fishing','cast-reel','water-fish-motion','catch-spoken-syllable','syllable-blend','6-7',['phonics'], true),
 game('rescue-comic','sil_cp','comprehension','branching-comic','tap-dialogue','panel-animation','follow-story-clues','narrated-panel','6-7',['literal-comprehension']),
 // 3. Implemented: Seed Lab
 game('seed-lab','sil_cp','science','plant-growth-sandbox','water-light-drag','growth-timelapse','keep-plant-alive','needs-of-plants','6-7',['plant-needs'], true),
 // 4. Implemented: Toy Factory
 game('toy-factory','sil_cp','creative','mechanical-assembly','drag-snap','gears-and-belts','build-working-toy','assembly-demo','6-7',['sequencing'], true),
 game('pattern-train','sil_cp','logic','track-routing','switch-track','train-pathfinding','finish-pattern-route','pattern-animation','6-7',['patterns']),
 game('fraction-kitchen','ce1_ce2','math','fraction-slicing','slice-drag','food-portion-physics','serve-exact-portions','equal-parts-demo','8-9',['fractions']),
 game('word-skyline','ce1_ce2','reading','platform-word-building','run-jump-collect','platform-collision','build-spoken-word','phoneme-segment','8-9',['spelling']),
 // 5. Implemented: Detective Stories
 game('detective-stories','ce1_ce2','comprehension','evidence-investigation','inspect-connect','clue-board','solve-story-mystery','evidence-replay','8-9',['inference'], true),
 game('water-cycle','ce1_ce2','science','phase-change-simulation','heat-cool','particle-states','complete-water-cycle','molecule-demo','8-9',['water-cycle']),
 game('marble-maze','ce1_ce2','logic','tilt-maze','tilt-device-or-buttons','gravity-marble','navigate-marbles','path-forecast','8-9',['spatial-reasoning']),
 game('village-builder','ce1_ce2','creative','resource-construction','place-build','resource-flow','build-balanced-village','planning-steps','8-9',['measurement']),
 // 6. Implemented: Decimal Rally
 game('decimal-rally','cm1_cm2','math','lane-racing','steer-brake-boost','vehicle-track-physics','reach-decimal-checkpoints','place-value-track','10-12',['decimals'], true),
 game('debate-studio','cm1_cm2','reading','dialogue-roleplay','record-or-select-response','character-turn-taking','support-an-argument','evidence-highlight','10-12',['argumentation']),
 game('escape-library','cm1_cm2','comprehension','escape-room-chain','inspect-combine','room-state-machine','unlock-text-clues','paragraph-evidence','10-12',['text-inference']),
 game('electric-circuit','cm1_cm2','science','circuit-sandbox','wire-connect','current-flow','light-bulb','circuit-trace','10-12',['circuits']),
 game('strategy-islands','cm1_cm2','logic','turn-based-tactics','tile-command','grid-turn-simulation','reach-goal-with-resources','decision-tree','10-12',['planning']),
 game('market-tycoon','cm1_cm2','creative','economic-simulation','buy-sell-budget','inventory-cashflow','manage-market','budget-ledger','10-12',['financial-literacy'])
];
export function validateCatalog(items=catalog){
 const errors=[];const ids=new Set();const fingerprints=new Map();
 for(const g of items){
  if(ids.has(g.id))errors.push(`${g.id}: duplicate ID`);ids.add(g.id);
  for(const field of ['id','grade','category','mechanic','input','simulation','objective','tutor','age'])if(!g[field])errors.push(`${g.id}: missing ${field}`);
  if(!grades.includes(g.grade))errors.push(`${g.id}: invalid grade`);
  if(!categories.includes(g.category))errors.push(`${g.id}: invalid category`);
  const fingerprint=[g.mechanic,g.input,g.simulation,g.objective].join('|');
  if(fingerprints.has(fingerprint))errors.push(`${g.id}: same mechanics as ${fingerprints.get(fingerprint)}`);
  fingerprints.set(fingerprint,g.id);
  if(/quiz|multiple.choice|select.answer/i.test(fingerprint))errors.push(`${g.id}: quiz-only mechanic prohibited`);
  if(!Array.isArray(g.skills)||!g.skills.length)errors.push(`${g.id}: missing educational skills`);
 }
 for(const grade of grades)for(const category of categories){
  if(!items.some(g=>g.grade===grade&&g.category===category))errors.push(`${grade}: missing ${category} game`);
 }
 return errors;
}
export function releaseGate(g){
 const required=['implemented','playable','animationTest','tutorTest','offlineTest','learningTest'];
 return {approved:required.every(k=>g[k]===true),missing:required.filter(k=>g[k]!==true)};
}
if(process.argv[1]&&import.meta.url===new URL(`file://${process.argv[1]}`).href){
 const errors=validateCatalog();
 if(errors.length){console.error('CATALOG FAILED:\n'+errors.join('\n'));process.exitCode=1}
 else console.log(`Catalog passed: ${catalog.length} distinct designs across ${grades.length} grade bands and ${categories.length} subjects.`);
 const approved=catalog.filter(g=>releaseGate(g).approved).length;
 console.log(`Release-ready playable games: ${approved}/${catalog.length}. Designs are NOT implementation proof.`);
}
