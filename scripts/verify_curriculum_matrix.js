// scripts/verify_curriculum_matrix.js
const fs = require('fs');
const path = require('path');

console.log('🧪 Starting 28-Cell Master Curriculum Matrix Verification...\n');

const dataPath = path.join(__dirname, '../src/curriculum/cameroon/data.ts');
const dataContent = fs.readFileSync(dataPath, 'utf8');

const categories = [
  'math_arcade',
  'reading',
  'comprehension',
  'pronunciation',
  'science',
  'logic_puzzles',
  'creative_play'
];

const grades = [
  'Nursery',
  'SIL/CP',
  'CE1/CE2',
  'CM1/CM2'
];

const expectedTopics = {
  'math_arcade': ['Counting', 'Add/subtract', 'Multiply/divide', 'Fractions/decimals'],
  'reading': ['Letters/pictures', 'Phonics/words', 'Fluency', 'Advanced reading'],
  'comprehension': ['Spoken stories', 'Story sequence', 'Cause/effect', 'Inference/evidence'],
  'pronunciation': ['Sounds', 'Syllables', 'Words/phrases', 'Oral reading'],
  'science': ['Animals/plants', 'Habitats', 'Water/materials', 'Forces/energy'],
  'logic_puzzles': ['Sorting', 'Patterns', 'Mazes', 'Strategy'],
  'creative_play': ['Shapes/toys', 'Construction', 'Experiments', 'Engineering']
};

let verifiedCount = 0;

categories.forEach(cat => {
  const topics = expectedTopics[cat];
  console.log(`📂 Checking Category: ${cat}`);
  grades.forEach((grade, idx) => {
    const topic = topics[idx];
    const regex = new RegExp(`category:\\s*'${cat}'[\\s\\S]*?grade:\\s*'${grade}'[\\s\\S]*?topicEnglish:\\s*'${topic}'`, 'm');
    if (regex.test(dataContent)) {
      console.log(`  ✅ [${grade}] ${topic} verified`);
      verifiedCount++;
    } else {
      console.error(`  ❌ Missing Matrix Cell: ${cat} + ${grade} + ${topic}`);
      process.exit(1);
    }
  });
});

console.log(`\n🎉 ALL ${verifiedCount} / 28 CURRICULUM MATRIX CELLS VERIFIED 100%!`);
