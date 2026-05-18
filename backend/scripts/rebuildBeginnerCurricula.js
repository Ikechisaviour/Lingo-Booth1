/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  buildRichLesson,
  extractCanonicalSourceItemsFromRichLesson,
  hasInstructionalTargetLeak,
} = require('../textbookLessons/shared/richCurriculumFactory');
const { makeBeginnerProfile } = require('../textbookLessons/shared/beginnerProfiles');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['ms', 'ar', 'he', 'hi', 'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn'];
const MAX_EXPECTED_RICH_CONTENT = 160;

for (const lang of LANGS) {
  const dir = path.join(ROOT, lang);
  const lessonFiles = fs.readdirSync(dir).filter((name) => /^level1.*\.js$/.test(name) && name !== 'curriculum.js');

  lessonFiles.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const sourceLesson = require(file);
    const alreadyRich = (sourceLesson.activities?.length || 0) >= 10
      && (sourceLesson.content?.length || 0) >= 45;
    const overExpanded = (sourceLesson.content?.length || 0) > MAX_EXPECTED_RICH_CONTENT;
    const targetLayerLeak = hasInstructionalTargetLeak(sourceLesson, lang);
    if (alreadyRich && !overExpanded && !targetLayerLeak) return;

    const lessonId = name.replace(/\.js$/, '');
    const canonicalSource = alreadyRich
      ? {
          ...sourceLesson,
          content: extractCanonicalSourceItemsFromRichLesson(sourceLesson),
        }
      : sourceLesson;
    const rich = buildRichLesson(
      lang,
      lessonId,
      canonicalSource,
      makeBeginnerProfile(lang, lessonId, canonicalSource),
    );
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(rich, null, 2)};\n`, 'utf8');
  });

  console.log(`Rebuilt beginner depth for ${lang}.`);
}
