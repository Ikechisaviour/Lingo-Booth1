/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['es', 'fr'];

for (const lang of LANGS) {
  const curriculum = require(path.join(ROOT, lang, 'curriculum.js'));
  const lessonIds = Object.keys(curriculum);

  lessonIds.forEach((lessonId) => {
    const lesson = curriculum[lessonId];
    const filePath = path.join(ROOT, lang, `${lessonId}.js`);
    fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
  });

  const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
  fs.writeFileSync(path.join(ROOT, lang, 'curriculum.js'), aggregator, 'utf8');
  console.log(`Materialized ${lang}: ${lessonIds.length} self-contained lesson files.`);
}
