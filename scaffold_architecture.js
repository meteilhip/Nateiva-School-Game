const fs = require('fs');
const path = require('path');

const dirs = [
  'src/app', 'src/components', 'src/screens', 'src/games', 'src/engine',
  'src/adaptive', 'src/curriculum', 'src/curriculum/cameroon', 'src/content', 
  'src/tutor', 'src/speech', 'src/audio', 'src/animation', 'src/rewards', 
  'src/profiles', 'src/analytics', 'src/storage', 'src/accessibility', 
  'src/localization', 'src/sync', 'src/utils', 'src/tests', 
  'public/audio', 'public/icons', 'public/fonts', 'public/illustrations', 'public/curriculum',
  'docs'
];

dirs.forEach(d => {
  const fullPath = path.join(__dirname, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

console.log('Project directory structure created successfully.');
