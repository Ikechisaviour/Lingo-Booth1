/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LABELS = {
  es: 'objetivo de la lección',
  fr: 'objectif de la leçon',
  ja: '学習目標',
  de: 'Lernziel',
};

for (const [lang, label] of Object.entries(LABELS)) {
  const dir = path.join(ROOT, lang);
  const files = fs.readdirSync(dir).filter((name) => /^level.*\.js$/.test(name));
  let changed = 0;
  files.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const item = lesson.content?.[0];
    if (!item) return;
    const target = String(item.targetText || '').trim();
    const isLegacyOrientation = /^(foundation|level \d+ unit \d+|level \d+ review \d+|adult unit \d+|level \d+ cluster \d+)\s+goal$/i.test(target);
    let fileChanged = false;
    if (isLegacyOrientation) {
      item.targetText = label;
      item.korean = label;
      item.exampleTarget = label;
      item.example = label;
      fileChanged = true;
    }
    if (lang === 'es') {
      (lesson.content || []).forEach((entry) => {
        if (entry.targetText === 'sound check') {
          entry.targetText = 'control de sonido';
          entry.korean = 'control de sonido';
          fileChanged = true;
        }
      });
    }
    if (!fileChanged) return;
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
    changed += 1;
  });
  console.log(`${lang}: normalized ${changed} generated orientation items.`);
}
