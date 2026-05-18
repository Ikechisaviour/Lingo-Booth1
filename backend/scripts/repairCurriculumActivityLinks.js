/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const CURRICULUM_ROOTS = [
  ROOT,
  ...['zh', 'ja', 'de', 'es', 'fr', 'ms', 'ar', 'he', 'hi', 'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn']
    .map((lang) => path.join(ROOT, lang)),
];

let changedFiles = 0;
let removedLinks = 0;

for (const root of CURRICULUM_ROOTS) {
  if (!fs.existsSync(root)) continue;
  const files = fs.readdirSync(root).filter((name) => /^level.*\.js$/.test(name));

  for (const name of files) {
    const file = path.join(root, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const validActivityIds = new Set((lesson.activities || []).map((activity) => activity.id));
    let fileChanged = false;

    (lesson.content || []).forEach((item) => {
      if (!Array.isArray(item.activityIds)) return;
      const before = item.activityIds.length;
      item.activityIds = item.activityIds.filter((activityId) => activityId && validActivityIds.has(activityId));
      if (item.activityIds.length !== before) {
        removedLinks += before - item.activityIds.length;
        fileChanged = true;
      }
    });

    if (fileChanged) {
      fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
      changedFiles += 1;
    }
  }
}

console.log(`Repaired ${removedLinks} invalid activity links across ${changedFiles} curriculum files.`);
