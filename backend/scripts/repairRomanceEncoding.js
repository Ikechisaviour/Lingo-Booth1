/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['es', 'fr'];
const mojibakePattern = /[ÃÂâ]/;

const repairString = (value) => {
  if (!mojibakePattern.test(value)) return value;
  const repaired = Buffer.from(value, 'latin1').toString('utf8');
  return repaired.includes('�') ? value : repaired;
};

const repairValue = (value) => {
  if (typeof value === 'string') return repairString(value);
  if (Array.isArray(value)) return value.map(repairValue);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [key, repairValue(entry)]));
  }
  return value;
};

for (const lang of LANGS) {
  const dir = path.join(ROOT, lang);
  const lessonFiles = fs.readdirSync(dir).filter((name) => name.endsWith('.js') && name !== 'curriculum.js');
  lessonFiles.forEach((name) => {
    const file = path.join(dir, name);
    delete require.cache[require.resolve(file)];
    const lesson = repairValue(require(file));
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
  });
  console.log(`Repaired encoding for ${lang} lesson files.`);
}
