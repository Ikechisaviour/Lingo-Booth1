/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  featureLibraries,
  matchingFeatureItems,
} = require('../textbookLessons/shared/japaneseProfiles');

const ROOT = path.join(__dirname, '..', 'textbookLessons', 'ja');
const allFeatureNotes = new Set(
  featureLibraries.flatMap((feature) => feature.items.map(([, note]) => note)),
);

for (const name of fs.readdirSync(ROOT).filter((file) => /^level.*\.js$/.test(file))) {
  const file = path.join(ROOT, name);
  delete require.cache[require.resolve(file)];
  const lesson = require(file);
  const allowedNotes = new Set(matchingFeatureItems(lesson).map((entry) => entry.note));
  lesson.content = lesson.content.filter((entry) => {
    const featureNote = allFeatureNotes.has(entry.nativeText)
      ? entry.nativeText
      : entry.nativeText?.startsWith('Applied example: ')
        ? entry.nativeText.slice('Applied example: '.length)
        : null;
    return !featureNote || allowedNotes.has(featureNote);
  });
  fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
}

console.log('Repaired Japanese feature spillover.');
