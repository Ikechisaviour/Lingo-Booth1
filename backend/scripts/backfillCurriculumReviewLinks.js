/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  REVIEW_SOURCE_PATTERNS,
  resolveReviewOf,
} = require('../textbookLessons/shared/reviewLinks');

const ROOT = path.join(__dirname, '..', 'textbookLessons');

function loadCurriculum(curriculumPath) {
  delete require.cache[require.resolve(curriculumPath)];
  return require(curriculumPath);
}

function writeLessonFile(filePath, lesson) {
  fs.writeFileSync(filePath, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
}

for (const lang of fs.readdirSync(ROOT)) {
  const curriculumPath = path.join(ROOT, lang, 'curriculum.js');
  if (!fs.existsSync(curriculumPath)) continue;

  const curriculum = loadCurriculum(curriculumPath);
  const keys = Object.keys(curriculum);

  Object.entries(REVIEW_SOURCE_PATTERNS).forEach(([reviewKey, patterns]) => {
    const lesson = curriculum[reviewKey];
    if (!lesson || lesson.lessonType !== 'review') return;

    const reviewOf = resolveReviewOf(reviewKey, keys);
    if (reviewOf.length !== patterns.length) {
      throw new Error(`${lang}/${reviewKey} could not resolve every source lesson key.`);
    }

    if (JSON.stringify(lesson.reviewOf || []) === JSON.stringify(reviewOf)) return;

    lesson.reviewOf = reviewOf;
    writeLessonFile(path.join(ROOT, lang, `${reviewKey}.js`), lesson);
    console.log(`Backfilled ${lang}/${reviewKey}: ${reviewOf.join(', ')}`);
  });
}

console.log('Curriculum review links backfill complete.');
