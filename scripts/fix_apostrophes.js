const fs = require('fs');
let code = fs.readFileSync('src/curriculum/cameroon/data.ts', 'utf8');

const replacements = [
  ["jusqu'à 20", "jusqu\\'à 20"],
  ["images d'objets familiers", "images d\\'objets familiers"],
  ["à l'Oral", "à l\\'Oral"],
  ["d'un récit", "d\\'un récit"],
  ["d'un mot", "d\\'un mot"],
  ["l'intonation", "l\\'intonation"],
  ["'L'Eau & Les Matériaux'", "'L\\'Eau & Les Matériaux'"],
  ["Cycle de l'Eau", "Cycle de l\\'Eau"],
  ["cycle de l'eau", "cycle de l\\'eau"],
  ["l'équilibre", "l\\'équilibre"]
];

for (const [from, to] of replacements) {
  code = code.split(from).join(to);
}

fs.writeFileSync('src/curriculum/cameroon/data.ts', code, 'utf8');

const ts = require('typescript');
const sourceFile = ts.createSourceFile('data.ts', code, ts.ScriptTarget.Latest, true);
console.log('Parse diagnostics count:', sourceFile.parseDiagnostics.length);
for (const d of sourceFile.parseDiagnostics) {
  const { line, character } = sourceFile.getLineAndCharacterOfPosition(d.start);
  console.log(line + 1, character + 1, d.messageText);
}
