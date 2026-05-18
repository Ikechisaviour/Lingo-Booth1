/* eslint-disable no-console */
const path = require('path');

const beginnerLanguages = [
  'ms',
  'ar',
  'he',
  'hi',
  'it',
  'fil',
  'id',
  'pt',
  'ru',
  'tr',
  'nl',
  'ta',
  'bn',
];

const expectedUnitPrefixes = Array.from(
  { length: 21 },
  (_, index) => `level1Unit${String(index + 1).padStart(2, '0')}`,
);

const issues = [];

for (const lang of beginnerLanguages) {
  const curriculumPath = path.join(__dirname, '..', 'textbookLessons', lang, 'curriculum.js');
  let curriculum;

  try {
    curriculum = require(curriculumPath);
  } catch (error) {
    issues.push(`${lang}: could not load curriculum module (${error.message})`);
    continue;
  }

  const keys = Object.keys(curriculum);
  const level1Keys = keys.filter((key) => /^level1/i.test(key));
  const lessons = level1Keys.map((key) => curriculum[key]);

  if (level1Keys.length !== expectedUnitPrefixes.length + 1) {
    issues.push(`${lang}: expected ${expectedUnitPrefixes.length + 1} Level 1 lessons, found ${level1Keys.length}`);
  }

  if (!curriculum.level1Foundation) {
    issues.push(`${lang}: missing level1Foundation`);
  }

  expectedUnitPrefixes.forEach((prefix) => {
    if (!level1Keys.some((key) => key.startsWith(prefix))) {
      issues.push(`${lang}: missing unit with prefix ${prefix}`);
    }
  });

  lessons.forEach((lesson, index) => {
    const key = level1Keys[index];
    if (lesson.targetLang !== lang) {
      issues.push(`${lang}: ${key} has targetLang "${lesson.targetLang}"`);
    }
    if (lesson.nativeLang !== 'en') {
      issues.push(`${lang}: ${key} must keep canonical nativeLang "en"`);
    }
    if (!String(lesson.title || '').trim()) {
      issues.push(`${lang}: ${key} is missing a title`);
    }
    if (!Array.isArray(lesson.activities) || lesson.activities.length < 6) {
      issues.push(`${lang}: ${key} has fewer than 6 activities`);
    }
    if (!Array.isArray(lesson.content) || lesson.content.length < 8) {
      issues.push(`${lang}: ${key} has fewer than 8 content items`);
    }
  });

  const foundationLessons = lessons.filter((lesson) => lesson.lessonType === 'foundation');
  if (foundationLessons.length !== 1) {
    issues.push(`${lang}: expected exactly one foundation lesson, found ${foundationLessons.length}`);
  }

  const thematicLessons = lessons.filter((lesson) => lesson.lessonType === 'thematic');
  if (thematicLessons.length !== 21) {
    issues.push(`${lang}: expected 21 thematic lessons, found ${thematicLessons.length}`);
  }
}

if (issues.length) {
  console.error('Beginner curriculum coverage audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Beginner curriculum coverage audit passed.');
