/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  buildRichLesson,
  extractCanonicalSourceItemsFromRichLesson,
  hasInstructionalTargetLeak,
} = require('../textbookLessons/shared/richCurriculumFactory');
const { makeJapaneseProfile } = require('../textbookLessons/shared/japaneseProfiles');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'ja');
const MAX_EXPECTED_RICH_CONTENT = 160;
const initialStandalone = fs.readdirSync(ROOT)
  .filter((name) => /^level.*\.js$/.test(name) && name !== 'curriculum.js')
  .map((name) => [name.replace(/\.js$/, ''), require(path.join(ROOT, name))]);
const compact = Object.entries(require(path.join(ROOT, 'curriculum.js')));
const lessons = Object.fromEntries([...initialStandalone, ...compact]);

for (const [lessonId, sourceLesson] of Object.entries(lessons)) {
  const alreadyRich = (sourceLesson.activities?.length || 0) >= 10
    && (sourceLesson.content?.length || 0) >= 45;
  const overExpanded = (sourceLesson.content?.length || 0) > MAX_EXPECTED_RICH_CONTENT;
  const targetLayerLeak = hasInstructionalTargetLeak(sourceLesson, 'ja');
  const canonicalSource = alreadyRich && (overExpanded || targetLayerLeak)
    ? {
        ...sourceLesson,
        content: extractCanonicalSourceItemsFromRichLesson(sourceLesson),
      }
    : sourceLesson;
  const rich = alreadyRich && !overExpanded && !targetLayerLeak
    ? sourceLesson
    : buildRichLesson('ja', lessonId, canonicalSource, makeJapaneseProfile(lessonId, canonicalSource));
  fs.writeFileSync(path.join(ROOT, `${lessonId}.js`), `module.exports = ${JSON.stringify(rich, null, 2)};\n`, 'utf8');
}

const lessonIds = Object.keys(lessons);
const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
fs.writeFileSync(path.join(ROOT, 'curriculum.js'), aggregator, 'utf8');
console.log(`Rebuilt Japanese curriculum with ${lessonIds.length} rich lesson files.`);
