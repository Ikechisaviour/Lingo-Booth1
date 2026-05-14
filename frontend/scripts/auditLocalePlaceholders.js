/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const localeRoots = [
  path.join(repoRoot, 'frontend', 'src', 'locales'),
  path.join(repoRoot, 'mobile', 'src', 'locales'),
];

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

function flatten(obj, prefix = '') {
  return Object.entries(obj || {}).flatMap(([key, value]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      return flatten(value, next);
    }
    return [[next, value]];
  });
}

function placeholders(value) {
  if (typeof value !== 'string') return [];
  const names = [];
  const pattern = /{{\s*([^{}\s]+)\s*}}/g;
  let match;
  while ((match = pattern.exec(value))) {
    names.push(match[1]);
  }
  return names;
}

function sameMultiset(a, b) {
  if (a.length !== b.length) return false;
  const left = [...a].sort();
  const right = [...b].sort();
  return left.every((value, index) => value === right[index]);
}

const issues = [];

for (const root of localeRoots) {
  if (!fs.existsSync(root)) continue;
  const label = path.relative(repoRoot, root);
  const enFile = path.join(root, 'en', 'translation.json');
  if (!fs.existsSync(enFile)) continue;

  const enEntries = new Map(flatten(readJson(enFile)));
  for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'en') continue;
    const file = path.join(root, entry.name, 'translation.json');
    if (!fs.existsSync(file)) continue;
    const entries = new Map(flatten(readJson(file)));

    for (const [key, value] of entries.entries()) {
      if (typeof value === 'string' && /\?{3,}/.test(value)) {
        issues.push(`${label}/${entry.name}: ${key} contains generated question-mark corruption.`);
      }
    }

    for (const [key, enValue] of enEntries.entries()) {
      const expected = placeholders(enValue);
      if (expected.length === 0) continue;
      const actual = placeholders(entries.get(key));
      if (!sameMultiset(expected, actual)) {
        issues.push(`${label}/${entry.name}: ${key} placeholders ${JSON.stringify(actual)} must match English ${JSON.stringify(expected)}`);
      }
    }
  }
}

if (issues.length > 0) {
  console.error('Locale placeholder audit failed:');
  issues.slice(0, 80).forEach((issue) => console.error(`- ${issue}`));
  if (issues.length > 80) console.error(`...and ${issues.length - 80} more.`);
  process.exit(1);
}

console.log('Locale placeholder audit passed.');
