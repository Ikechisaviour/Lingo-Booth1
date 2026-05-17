/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { buildRichLesson } = require('../textbookLessons/shared/richCurriculumFactory');
const { makeJapaneseProfile } = require('../textbookLessons/shared/japaneseProfiles');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'ja');
const initialStandalone = fs.readdirSync(ROOT)
  .filter((name) => /^level.*\.js$/.test(name) && name !== 'curriculum.js')
  .map((name) => [name.replace(/\.js$/, ''), require(path.join(ROOT, name))]);
const compact = Object.entries(require(path.join(ROOT, 'curriculum.js')));
const lessons = Object.fromEntries([...initialStandalone, ...compact]);

for (const [lessonId, sourceLesson] of Object.entries(lessons)) {
  const alreadyRich = (sourceLesson.activities?.length || 0) >= 10
    && (sourceLesson.content?.length || 0) >= 45;
  const rich = alreadyRich
    ? sourceLesson
    : buildRichLesson('ja', lessonId, sourceLesson, makeJapaneseProfile(lessonId, sourceLesson));
  fs.writeFileSync(path.join(ROOT, `${lessonId}.js`), `module.exports = ${JSON.stringify(rich, null, 2)};\n`, 'utf8');
}

const lessonIds = Object.keys(lessons);
const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
fs.writeFileSync(path.join(ROOT, 'curriculum.js'), aggregator, 'utf8');
console.log(`Rebuilt Japanese curriculum with ${lessonIds.length} rich lesson files.`);
