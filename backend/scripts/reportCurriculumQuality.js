/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANG_ROOTS = {
  ko: ROOT,
  zh: path.join(ROOT, 'zh'),
  en: path.join(ROOT, 'en'),
  ja: path.join(ROOT, 'ja'),
  de: path.join(ROOT, 'de'),
  es: path.join(ROOT, 'es'),
  fr: path.join(ROOT, 'fr'),
  ms: path.join(ROOT, 'ms'),
  ar: path.join(ROOT, 'ar'),
  he: path.join(ROOT, 'he'),
  hi: path.join(ROOT, 'hi'),
  it: path.join(ROOT, 'it'),
  fil: path.join(ROOT, 'fil'),
  id: path.join(ROOT, 'id'),
  pt: path.join(ROOT, 'pt'),
  ru: path.join(ROOT, 'ru'),
  tr: path.join(ROOT, 'tr'),
  nl: path.join(ROOT, 'nl'),
  ta: path.join(ROOT, 'ta'),
  bn: path.join(ROOT, 'bn'),
};

const RICHNESS_HINTS = /\b(formal|informal|polite|casual|used|usage|contrast|instead|rather|often|when|with|setting|register|service|spoken|written|common|safer|avoid|differs?|while)\b/i;

function lessonFiles(root) {
  return fs.readdirSync(root)
    .filter((file) => /^level.*\.js$/.test(file))
    .map((file) => path.join(root, file));
}

function lessonStats(lang, root) {
  const lessons = lessonFiles(root).map((file) => require(file));
  const counts = lessons.reduce((acc, lesson) => {
    acc[lesson.lessonType] = (acc[lesson.lessonType] || 0) + 1;
    return acc;
  }, {});
  const items = lessons.flatMap((lesson) => lesson.content || []);
  const glosses = items.flatMap((item) => [
    item.nativeText,
    item.exampleNative,
    ...(item.breakdown || []).map((entry) => entry.native),
  ]).filter(Boolean);
  const richGlossCount = glosses.filter((value) => RICHNESS_HINTS.test(String(value))).length;
  const sparseGlossCount = glosses.filter((value) => String(value).trim().split(/\s+/).length <= 3).length;

  return {
    lang,
    lessons: lessons.length,
    level1Lessons: lessonFiles(root).filter((file) => /level1/i.test(path.basename(file))).length,
    level2Lessons: lessonFiles(root).filter((file) => /level2/i.test(path.basename(file))).length,
    level3Lessons: lessonFiles(root).filter((file) => /level3/i.test(path.basename(file))).length,
    avgActivities: lessons.reduce((sum, lesson) => sum + (lesson.activities?.length || 0), 0) / lessons.length,
    avgContent: lessons.reduce((sum, lesson) => sum + (lesson.content?.length || 0), 0) / lessons.length,
    minContent: Math.min(...lessons.map((lesson) => lesson.content?.length || 0)),
    counts,
    glosses: glosses.length,
    richGlossRate: glosses.length ? richGlossCount / glosses.length : 0,
    sparseGlossRate: glosses.length ? sparseGlossCount / glosses.length : 0,
  };
}

function fmt(value) {
  return Number(value).toFixed(1);
}

function pct(value) {
  return `${(value * 100).toFixed(0)}%`;
}

const rows = Object.entries(LANG_ROOTS).map(([lang, root]) => lessonStats(lang, root));

console.log('lang\tlessons\tL1\tL2\tL3\tavg activities\tavg content\tmin content\trich glosses\tsparse glosses\tlesson types');
rows.forEach((row) => {
  console.log([
    row.lang,
    row.lessons,
    row.level1Lessons,
    row.level2Lessons,
    row.level3Lessons,
    fmt(row.avgActivities),
    fmt(row.avgContent),
    row.minContent,
    pct(row.richGlossRate),
    pct(row.sparseGlossRate),
    JSON.stringify(row.counts),
  ].join('\t'));
});

