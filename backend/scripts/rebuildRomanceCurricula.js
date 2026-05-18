/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  buildRichLesson,
  extractCanonicalSourceItemsFromRichLesson,
  hasInstructionalTargetLeak,
} = require('../textbookLessons/shared/richCurriculumFactory');
const { withResolvedReviewLinks } = require('../textbookLessons/shared/reviewLinks');
const { makeProfile } = require('../textbookLessons/shared/romanceProfiles');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['es', 'fr'];

const serialize = (value) => JSON.stringify(value, null, 2);

for (const lang of LANGS) {
  const curriculumPath = path.join(ROOT, lang, 'curriculum.js');
  const original = require(curriculumPath);
  const lessonIds = Object.keys(original);

  lessonIds.forEach((lessonId) => {
    const filePath = path.join(ROOT, lang, `${lessonId}.js`);
    const sourceLesson = withResolvedReviewLinks(lessonId, original[lessonId], lessonIds);
    const alreadyRich = (sourceLesson.activities?.length || 0) >= 10
      && (sourceLesson.content?.length || 0) >= 45;
    const targetLayerLeak = hasInstructionalTargetLeak(sourceLesson, lang);
    const canonicalSource = alreadyRich && targetLayerLeak
      ? {
          ...sourceLesson,
          content: extractCanonicalSourceItemsFromRichLesson(sourceLesson),
        }
      : sourceLesson;
    const lesson = alreadyRich && !targetLayerLeak
      ? sourceLesson
      : buildRichLesson(lang, lessonId, canonicalSource, makeProfile(lang, lessonId, canonicalSource));
    fs.writeFileSync(filePath, `module.exports = ${serialize(lesson)};\n`, 'utf8');
  });

  const aggregator = `${lessonIds.map((lessonId) => `const ${lessonId} = require('./${lessonId}');`).join('\n')}\n\nmodule.exports = {\n${lessonIds.map((lessonId) => `  ${lessonId},`).join('\n')}\n};\n`;
  fs.writeFileSync(curriculumPath, aggregator, 'utf8');
  console.log(`Rebuilt ${lang}: ${lessonIds.length} lesson files plus curriculum aggregator.`);
}
