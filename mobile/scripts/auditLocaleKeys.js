/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const localesDir = path.resolve(__dirname, '..', 'src', 'locales');
const baseFile = path.join(localesDir, 'en', 'translation.json');
const base = JSON.parse(fs.readFileSync(baseFile, 'utf8'));

function flattenKeys(obj, prefix = '') {
  return Object.entries(obj || {}).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flattenKeys(value, next);
    }
    return [next];
  });
}

const baseKeys = new Set(flattenKeys(base));
const issues = [];

for (const entry of fs.readdirSync(localesDir, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name === 'en') continue;
  const translationFile = path.join(localesDir, entry.name, 'translation.json');
  if (!fs.existsSync(translationFile)) {
    issues.push(`${entry.name}: missing translation.json`);
    continue;
  }

  const translation = JSON.parse(fs.readFileSync(translationFile, 'utf8'));
  const keys = new Set(flattenKeys(translation));
  const missing = [...baseKeys].filter((key) => !keys.has(key));

  if (missing.length > 0) {
    issues.push(`${entry.name}: missing ${missing.length} key(s): ${missing.slice(0, 12).join(', ')}${missing.length > 12 ? ', ...' : ''}`);
  }
}

if (issues.length > 0) {
  console.error('Mobile locale key audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Mobile locale key audit passed.');
