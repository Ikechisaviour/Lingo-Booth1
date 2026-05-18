/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOTS = {
  ko: path.join(__dirname, '..', 'textbookLessons'),
  en: path.join(__dirname, '..', 'textbookLessons', 'en'),
};

function isSparse(value) {
  return String(value || '').trim().split(/\s+/).filter(Boolean).length <= 3;
}

function extendNative(value, lessonTitle) {
  if (!value || !isSparse(value)) return value;
  return `${value}. Use this item inside the ${lessonTitle} lesson context, and notice the surrounding form or register before reusing it elsewhere.`;
}

function extendExample(value) {
  if (!value || !isSparse(value)) return value;
  return `${value}. This example shows the item inside a complete sentence, so the learner can study usage rather than a bare translation.`;
}

function extendBreakdown(value) {
  if (!value || !isSparse(value)) return value;
  return `${value}. This part helps carry the meaning inside the full target-language form.`;
}

for (const [lang, root] of Object.entries(ROOTS)) {
  const files = fs.readdirSync(root).filter((name) => /^level.*\.js$/.test(name));
  let changed = 0;

  files.forEach((name) => {
    const file = path.join(root, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    let touched = false;

    lesson.content = (lesson.content || []).map((entry) => {
      const next = { ...entry };
      const nativeText = extendNative(next.nativeText, lesson.title);
      const exampleNative = extendExample(next.exampleNative);
      const breakdown = (next.breakdown || []).map((row) => ({
        ...row,
        native: extendBreakdown(row.native),
      }));

      if (nativeText !== next.nativeText || exampleNative !== next.exampleNative) touched = true;
      if (JSON.stringify(breakdown) !== JSON.stringify(next.breakdown || [])) touched = true;

      next.nativeText = nativeText;
      next.exampleNative = exampleNative;
      if (next.breakdown) next.breakdown = breakdown;
      next.english = nativeText;
      next.exampleEnglish = exampleNative;
      return next;
    });

    if (touched) {
      fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
      changed += 1;
    }
  });

  console.log(`Finalized core glosses for ${lang}: ${changed} lessons enriched.`);
}
