/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { SUPPORTED_LANGUAGES } = require('../config/languages');
const { mergeDuplicateContentItems } = require('../textbookLessons/shared/richCurriculumFactory');

const ROOT = path.join(__dirname, '..', 'textbookLessons');

function rootFor(lang) {
  return lang === 'ko' ? ROOT : path.join(ROOT, lang);
}

function lessonFiles(root) {
  return fs.readdirSync(root)
    .filter((file) => /^level.*\.js$/.test(file))
    .map((file) => path.join(root, file));
}

let changedLessons = 0;
let removedDuplicates = 0;

for (const lang of SUPPORTED_LANGUAGES) {
  const root = rootFor(lang);
  if (!fs.existsSync(root)) continue;

  lessonFiles(root).forEach((file) => {
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const before = lesson.content?.length || 0;
    const nextContent = mergeDuplicateContentItems(lesson.content || []);
    const after = nextContent.length;
    if (after === before) return;

    lesson.content = nextContent;
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
    changedLessons += 1;
    removedDuplicates += before - after;
  });
}

console.log(`Normalized curriculum content: ${removedDuplicates} duplicate entries merged across ${changedLessons} lessons.`);
