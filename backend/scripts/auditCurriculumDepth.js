/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { SUPPORTED_LANGUAGES } = require('../config/languages');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const MIN_LESSONS = 51;
const MIN_AVG_ACTIVITIES = 10;
const MIN_AVG_CONTENT = 50;
const MIN_CONTENT_FLOOR = 45;
const MAX_SPARSE_GLOSS_RATE = 0.1;
const RICHNESS_HINTS = /\b(formal|informal|polite|casual|used|usage|contrast|instead|rather|often|when|with|setting|register|service|spoken|written|common|safer|avoid|differs?|while)\b/i;

function rootFor(lang) {
  return lang === 'ko' ? ROOT : path.join(ROOT, lang);
}

function lessonFiles(root) {
  return fs.readdirSync(root)
    .filter((file) => /^level.*\.js$/.test(file))
    .map((file) => path.join(root, file));
}

function glossesFor(lessons) {
  return lessons.flatMap((lesson) => (lesson.content || []).flatMap((entry) => [
    entry.nativeText,
    entry.exampleNative,
    ...(entry.breakdown || []).map((row) => row.native),
  ])).filter(Boolean);
}

const issues = [];

for (const lang of SUPPORTED_LANGUAGES) {
  const root = rootFor(lang);
  if (!fs.existsSync(root)) {
    issues.push(`${lang}: missing textbook lesson root`);
    continue;
  }

  const files = lessonFiles(root);
  const lessons = files.map((file) => {
    delete require.cache[require.resolve(file)];
    return require(file);
  });
  if (lessons.length !== MIN_LESSONS) {
    issues.push(`${lang}: expected ${MIN_LESSONS} lessons, found ${lessons.length}`);
    continue;
  }

  const avgActivities = lessons.reduce((sum, lesson) => sum + (lesson.activities?.length || 0), 0) / lessons.length;
  const avgContent = lessons.reduce((sum, lesson) => sum + (lesson.content?.length || 0), 0) / lessons.length;
  const minContent = Math.min(...lessons.map((lesson) => lesson.content?.length || 0));
  const glosses = glossesFor(lessons);
  const sparseGlossRate = glosses.length
    ? glosses.filter((value) => String(value).trim().split(/\s+/).length <= 3).length / glosses.length
    : 1;
  const richGlossRate = glosses.length
    ? glosses.filter((value) => RICHNESS_HINTS.test(String(value))).length / glosses.length
    : 0;

  if (avgActivities < MIN_AVG_ACTIVITIES) {
    issues.push(`${lang}: average activities ${avgActivities.toFixed(1)} is below ${MIN_AVG_ACTIVITIES}`);
  }
  if (avgContent < MIN_AVG_CONTENT) {
    issues.push(`${lang}: average content ${avgContent.toFixed(1)} is below ${MIN_AVG_CONTENT}`);
  }
  if (minContent < MIN_CONTENT_FLOOR) {
    issues.push(`${lang}: minimum content ${minContent} is below ${MIN_CONTENT_FLOOR}`);
  }
  if (sparseGlossRate > MAX_SPARSE_GLOSS_RATE) {
    issues.push(`${lang}: sparse gloss rate ${(sparseGlossRate * 100).toFixed(0)}% exceeds ${(MAX_SPARSE_GLOSS_RATE * 100).toFixed(0)}%`);
  }
  if (!Number.isFinite(richGlossRate) || richGlossRate <= 0) {
    issues.push(`${lang}: rich gloss coverage could not be measured`);
  }
}

if (issues.length) {
  console.error('Curriculum depth audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Curriculum depth audit passed.');
