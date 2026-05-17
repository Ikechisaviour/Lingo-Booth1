/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { buildRichLesson } = require('../textbookLessons/shared/richCurriculumFactory');
const { makeGermanProfile } = require('../textbookLessons/shared/germanProfiles');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'de');
const source = require(path.join(ROOT, 'sourceCurriculum'));

for (const [lessonId, sourceLesson] of Object.entries(source)) {
  const rich = buildRichLesson('de', lessonId, sourceLesson, makeGermanProfile(lessonId, sourceLesson));
  fs.writeFileSync(path.join(ROOT, `${lessonId}.js`), `module.exports = ${JSON.stringify(rich, null, 2)};\n`, 'utf8');
}

const lessonIds = Object.keys(source);
const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
fs.writeFileSync(path.join(ROOT, 'curriculum.js'), aggregator, 'utf8');
console.log(`Rebuilt German curriculum with ${lessonIds.length} rich lesson files.`);
