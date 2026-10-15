import test from 'node:test';import assert from 'node:assert/strict';
import {createLearner,generateProblem,nextProblem,recordAttempt,levelFor,tutorSteps,auditGames} from './learning-core.mjs';
test('grade-specific content and bounds',()=>{
 for(const band of ['nursery','sil_cp','ce1_ce2','cm1_cm2']){
  const p=generateProblem(createLearner({band}),band==='nursery'?'count':'add',()=>.5);
  assert.equal(p.band,band);assert.equal(p.level,1);
 }
});
test('progress only after independent correct answers',()=>{
 const l=createLearner(),p=generateProblem(l,'add',()=>.4);
 for(let i=0;i<8;i++)recordAttempt(l,p,{response:p.answer,assisted:true,gameId:'racing'});
 assert.equal(levelFor(l,'add'),1);
 for(let i=0;i<4;i++)recordAttempt(l,p,{response:p.answer,gameId:'racing'});
 assert.equal(levelFor(l,'add'),2);
});
test('wrong answer does not advance',()=>{
 const l=createLearner(),p=generateProblem(l,'add',()=>.4);
 for(let i=0;i<6;i++)recordAttempt(l,p,{response:-99,gameId:'racing'});
 assert.equal(levelFor(l,'add'),1);
});
test('question generator avoids recent repeats',()=>{
 const l=createLearner(),p=generateProblem(l,'add',()=>.4);
 recordAttempt(l,p,{response:p.answer,gameId:'racing'});
 const next=nextProblem(l,'add',()=>Math.random());assert.notEqual(next.id,p.id);
});
test('tutor uses correct visual math operation',()=>{
 const l=createLearner();
 assert.ok(tutorSteps(generateProblem(l,'add'), 'en').some(s=>s.action==='COMBINE_AND_COUNT'));
 assert.ok(tutorSteps(generateProblem(l,'subtract'), 'fr').some(s=>s.action==='REMOVE_GROUP'));
 assert.ok(tutorSteps(generateProblem(l,'multiply'), 'en').some(s=>s.action==='BUILD_ARRAY'));
});
test('duplicate mechanics are rejected',()=>{
 const base={subject:'math',control:'tap',physics:'none',objective:'choose',interaction:'tap-answer',implemented:true};
 assert.equal(auditGames([{...base,id:'a'},{...base,id:'b'}]).ok,false);
});
