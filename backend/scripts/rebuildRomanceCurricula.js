/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['es', 'fr'];

const serialize = (value) => JSON.stringify(value, null, 2);

for (const lang of LANGS) {
  const curriculumPath = path.join(ROOT, lang, 'curriculum.js');
  const original = require(curriculumPath);
  const lessonIds = Object.keys(original);

  lessonIds.forEach((lessonId) => {
    const filePath = path.join(ROOT, lang, `${lessonId}.js`);
    const sourceLesson = original[lessonId];
    const content = `const { buildRichLesson } = require('../shared/richCurriculumFactory');\nconst { makeProfile } = require('../shared/romanceProfiles');\n\nconst sourceLesson = ${serialize(sourceLesson)};\n\nmodule.exports = buildRichLesson('${lang}', '${lessonId}', sourceLesson, makeProfile('${lang}', '${lessonId}', sourceLesson));\n`;
    fs.writeFileSync(filePath, content, 'utf8');
  });

  const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
  fs.writeFileSync(curriculumPath, aggregator, 'utf8');
  console.log(`Rebuilt ${lang}: ${lessonIds.length} lesson files plus curriculum aggregator.`);
}
