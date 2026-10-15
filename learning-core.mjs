// Nateiva EduKids: deterministic, testable learning core. No UI dependencies.
export const BANDS = ['nursery','sil_cp','ce1_ce2','cm1_cm2'];
export const SKILLS = {
 nursery:['count','compare','shapes'],
 sil_cp:['add','subtract','numberline'],
 ce1_ce2:['multiply','divide','add','subtract'],
 cm1_cm2:['multiply','divide','fractions','decimals']
};
export function createLearner({id='child',band='sil_cp',language='en'}={}) {
 if(!BANDS.includes(band)) throw new Error('Invalid grade band');
 return {id,band,language,mastery:{},history:[],session:null};
}
export function skillFor(learner, index=0){const arr=SKILLS[learner.band];return arr[index%arr.length];}
export function levelFor(learner,skill){
 const m=learner.mastery[skill]||{independentCorrect:0,independentAttempts:0,streak:0};
 return Math.min(4,1+Math.floor(m.independentCorrect/4));
}
function int(rng,min,max){return min+Math.floor(rng()*(max-min+1));}
export function generateProblem(learner,skill,rng=Math.random){
 const level=levelFor(learner,skill), band=learner.band;
 const caps={nursery:[5,10,15,20],sil_cp:[10,20,50,100],ce1_ce2:[30,100,500,1000],cm1_cm2:[100,1000,10000,100000]};
 const cap=caps[band][level-1];
 let a,b,answer,display;
 if(skill==='count'||skill==='compare'||skill==='shapes'){
  a=int(rng,1,cap);b=int(rng,1,cap);
  answer=skill==='compare'?(a>b?'left':a<b?'right':'equal'):a;
  display=skill==='compare'?`${a} ? ${b}`:skill==='shapes'?`Find ${a} objects`:`Count ${a} objects`;
 } else if(skill==='multiply'){
  a=int(rng,2,Math.min(12,level*3+2));b=int(rng,2,Math.min(12,level*3+2));answer=a*b;display=`${a} × ${b}`;
 } else if(skill==='divide'){
  b=int(rng,2,Math.min(12,level*3+2));answer=int(rng,2,Math.min(12,level*3+2));a=b*answer;display=`${a} ÷ ${b}`;
 } else if(skill==='fractions'){
  b=[2,4,5,8][level-1];a=int(rng,1,b-1);answer=`${a}/${b}`;display=`Show ${a}/${b}`;
 } else if(skill==='decimals'){
  const scale=level<3?10:100;a=int(rng,1,cap);b=int(rng,1,cap);answer=(a+b)/scale;display=`${a/scale} + ${b/scale}`;
 } else if(skill==='subtract'){
  a=int(rng,2,cap);b=int(rng,1,a);answer=a-b;display=`${a} − ${b}`;
 } else {
  a=int(rng,1,Math.max(2,Math.floor(cap*.6)));b=int(rng,1,Math.max(2,cap-a));answer=a+b;display=`${a} + ${b}`;
 }
 return {id:`${skill}:${a}:${b}:${level}`,skill,level,a,b,answer,display,band};
}
export function nextProblem(learner,skill,rng=Math.random){
 const recent=new Set(learner.history.filter(h=>h.skill===skill).slice(-8).map(h=>h.problemId));
 for(let n=0;n<40;n++){const p=generateProblem(learner,skill,rng);if(!recent.has(p.id))return p;}
 throw new Error('Not enough varied problems: expand generator range; do not repeat silently');
}
export function recordAttempt(learner,problem,{response,assisted=false,gameId,elapsedMs=0}){
 if(!gameId)throw new Error('gameId required');
 const correct=String(response)===String(problem.answer);
 const old=learner.mastery[problem.skill]||{independentCorrect:0,independentAttempts:0,streak:0};
 const m={...old};
 if(!assisted){m.independentAttempts++;m.streak=correct?m.streak+1:0;if(correct)m.independentCorrect++;}
 learner.mastery[problem.skill]=m;
 learner.history.push({problemId:problem.id,skill:problem.skill,gameId,response,correct,assisted,elapsedMs,at:Date.now()});
 return {correct,level:levelFor(learner,problem.skill),mastery:m};
}
export function tutorSteps(problem,language='en'){
 const fr=language==='fr';const {a,b,skill,answer}=problem;
 const t=(en,french)=>fr?french:en;
 if(skill==='add'||skill==='numberline')return [
  {action:'SHOW_GROUP',values:[a],speech:t('Look at the first group.','Regarde le premier groupe.')},
  {action:'ADD_GROUP',values:[a,b],speech:t('Move the second group next to it.','Rapproche le deuxième groupe.')},
  {action:'COMBINE_AND_COUNT',values:[a,b],speech:t('Count everything together.','Compte tous les objets ensemble.')},
  {action:'MAKE_TEN_IF_USEFUL',values:[a,b],speech:t('Try making a group of ten.','Essaie de former un groupe de dix.')},
  {action:'GUIDED_NEW_EXAMPLE',speech:t('Now try a new one!','Essaie un nouvel exercice !')}
 ];
 if(skill==='subtract')return [
  {action:'SHOW_GROUP',values:[a],speech:t('Look at all the objects.','Regarde tous les objets.')},
  {action:'REMOVE_GROUP',values:[a,b],speech:t('Take away this many.','Enlève cette quantité.')},
  {action:'COUNT_REMAINING',values:[answer],speech:t('Count what is left.','Compte ce qui reste.')},
  {action:'GUIDED_NEW_EXAMPLE',speech:t('Your turn!','À toi !')}
 ];
 if(skill==='multiply')return [
  {action:'BUILD_ARRAY',values:[a,b],speech:t('Build rows and columns.','Construis des lignes et des colonnes.')},
  {action:'COUNT_ROWS',values:[a,b],speech:t('Count each row.','Compte chaque ligne.')},
  {action:'REPEATED_ADDITION',values:[a,b],speech:t('Add equal groups.','Additionne les groupes égaux.')},
  {action:'GUIDED_NEW_EXAMPLE',speech:t('Try another array.','Essaie un autre tableau.')}
 ];
 if(skill==='divide')return [
  {action:'SHOW_GROUP',values:[a],speech:t('Start with all the objects.','Commence avec tous les objets.')},
  {action:'DISTRIBUTE_EQUALLY',values:[a,b],speech:t('Share them equally.','Partage-les équitablement.')},
  {action:'COUNT_EACH_SHARE',values:[answer],speech:t('Count each share.','Compte chaque part.')},
  {action:'GUIDED_NEW_EXAMPLE',speech:t('Now share a new group.','Partage maintenant un nouveau groupe.')}
 ];
 return [{action:'SHOW_MODEL',values:[a,b],speech:t('Watch the model.','Regarde le modèle.')},{action:'MANIPULATE',values:[a,b],speech:t('Move the pieces yourself.','Déplace les pièces toi-même.')},{action:'GUIDED_NEW_EXAMPLE',speech:t('Now you try.','À toi de jouer.')}];
}
export function gameFingerprint(g){return [g.control,g.physics,g.objective,g.interaction].join('|').toLowerCase();}
export function auditGames(games){
 const errors=[],seen=new Map();
 for(const g of games){
  if(!g.id||!g.subject||!g.control||!g.physics||!g.objective||!g.interaction)errors.push(`Incomplete definition: ${g.id||'unknown'}`);
  if(g.implemented!==true)errors.push(`Not playable: ${g.id}`);
  const fp=gameFingerprint(g);
  if(seen.has(fp))errors.push(`Duplicate mechanics: ${seen.get(fp)} and ${g.id}`);
  else seen.set(fp,g.id);
 }
 return {ok:errors.length===0,errors};
}
