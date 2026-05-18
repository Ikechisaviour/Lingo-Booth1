/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { buildRichLesson } = require('../textbookLessons/shared/richCurriculumFactory');
const { makeGermanProfile } = require('../textbookLessons/shared/germanProfiles');
const { withResolvedReviewLinks } = require('../textbookLessons/shared/reviewLinks');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'de');
const source = require(path.join(ROOT, 'sourceCurriculum'));
const lessonIds = Object.keys(source);

for (const [lessonId, sourceLesson] of Object.entries(source)) {
  const linkedSourceLesson = withResolvedReviewLinks(lessonId, sourceLesson, lessonIds);
  const rich = buildRichLesson('de', lessonId, linkedSourceLesson, makeGermanProfile(lessonId, linkedSourceLesson));
  fs.writeFileSync(path.join(ROOT, `${lessonId}.js`), `module.exports = ${JSON.stringify(rich, null, 2)};\n`, 'utf8');
}

const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
fs.writeFileSync(path.join(ROOT, 'curriculum.js'), aggregator, 'utf8');
console.log(`Rebuilt German curriculum with ${lessonIds.length} rich lesson files.`);
