// scripts/verify_curriculum_and_games.ts
import { CameroonMathSkills, CameroonReadingSkills, CameroonScienceSkills } from '../src/curriculum/cameroon/data';
import { calculateNewMastery, SkillMastery } from '../src/adaptive/engine';
import { CemacCurriculumRegistry } from '../src/curriculum/cemac/packs';

console.log('🧪 Starting Automated Quality Verification for Nateiva EduKids...');

// Test 1: Curriculum Coverage
console.log(`\n📚 Checking Cameroon Curriculum:`);
console.log(`- Math Skills Count: ${CameroonMathSkills.length} (Expected >= 10)`);
console.log(`- Reading Skills Count: ${CameroonReadingSkills.length} (Expected >= 5)`);
console.log(`- Science Skills Count: ${CameroonScienceSkills.length} (Expected >= 5)`);

if (CameroonMathSkills.length >= 10 && CameroonReadingSkills.length >= 5 && CameroonScienceSkills.length >= 5) {
  console.log('✅ PASS: Curriculum coverage meets production standards.');
} else {
  console.error('❌ FAIL: Curriculum skills count insufficient.');
  process.exit(1);
}

// Test 2: Verify CEMAC Regional Registry
console.log(`\n🌍 Checking CEMAC Country Pack Architecture:`);
const countries = Object.keys(CemacCurriculumRegistry);
console.log(`- Countries configured: ${countries.join(', ')}`);
if (countries.length === 6 && CemacCurriculumRegistry['CM'].status === 'COMPLETE_AND_VERIFIED') {
  console.log('✅ PASS: CEMAC architecture properly structured with Cameroon as verified primary.');
} else {
  console.error('❌ FAIL: CEMAC pack missing or misconfigured.');
  process.exit(1);
}

// Test 3: Adaptive Bayesian Knowledge Tracing (BKT) Engine
console.log(`\n🧠 Testing Adaptive BKT Learning Logic:`);
let mastery: SkillMastery = {
  skillId: 'math_add_10',
  masteryValue: 0.3,
  state: 'LEARNING',
  consecutiveSuccesses: 0,
  consecutiveFailures: 0,
  lastPracticed: Date.now(),
  nextReviewDue: Date.now() + 86400000
};

// Simulate 3 successful answers with difficulty 1.0
mastery = calculateNewMastery(mastery, {
  learnerId: 'test_child',
  skillId: 'math_add_10',
  activityId: 'act_1',
  timestamp: Date.now(),
  correct: true,
  difficulty: 1.0,
  responseTimeMs: 2500,
  hintsUsed: 0,
  explanationUsed: false,
  retryCount: 0,
  inputMode: 'touch'
});

mastery = calculateNewMastery(mastery, {
  learnerId: 'test_child',
  skillId: 'math_add_10',
  activityId: 'act_2',
  timestamp: Date.now(),
  correct: true,
  difficulty: 1.0,
  responseTimeMs: 2000,
  hintsUsed: 0,
  explanationUsed: false,
  retryCount: 0,
  inputMode: 'touch'
});

mastery = calculateNewMastery(mastery, {
  learnerId: 'test_child',
  skillId: 'math_add_10',
  activityId: 'act_3',
  timestamp: Date.now(),
  correct: true,
  difficulty: 1.0,
  responseTimeMs: 1800,
  hintsUsed: 0,
  explanationUsed: false,
  retryCount: 0,
  inputMode: 'touch'
});

console.log(`- Mastery after 3 consecutive correct answers: ${(mastery.masteryValue * 100).toFixed(1)}% (State: ${mastery.state})`);

if (mastery.masteryValue > 0.6 && (mastery.state === 'DEVELOPING' || mastery.state === 'SECURE')) {
  console.log('✅ PASS: Adaptive BKT engine successfully increases mastery and promotes state.');
} else {
  console.error('❌ FAIL: BKT calculation did not advance student mastery.');
  process.exit(1);
}

// Test 4: Regression on errors
mastery = calculateNewMastery(mastery, {
  learnerId: 'test_child',
  skillId: 'math_add_10',
  activityId: 'act_4',
  timestamp: Date.now(),
  correct: false,
  difficulty: 1.0,
  responseTimeMs: 4000,
  hintsUsed: 2,
  explanationUsed: true,
  retryCount: 1,
  inputMode: 'touch'
});

console.log(`- Mastery after 1 error: ${(mastery.masteryValue * 100).toFixed(1)}% (Consecutive Failures: ${mastery.consecutiveFailures})`);
if (mastery.consecutiveFailures === 1) {
  console.log('✅ PASS: Adaptive engine properly tracks failures for prerequisite remediation.');
} else {
  console.error('❌ FAIL: Failure tracking did not record consecutive failures.');
  process.exit(1);
}

console.log('\n🎉 ALL QUALITY ASSURANCE TESTS PASSED SUCCESSFULLY!\n');
