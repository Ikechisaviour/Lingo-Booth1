/**
 * fixOrientationItems.js
 *
 * Fixes the 51 upgraded textbook lessons whose Orientation activity contains
 * items with English meta-labels in the Korean (target) slot — e.g.
 *   createContentItem('Lesson goal', 'phone calls', 'By end: ...', ...)
 *
 * These render as broken vocabulary cards because the "Korean" field shows
 * "Lesson goal" instead of Korean. This script replaces the first two
 * arguments with real Korean text + romanization. The description (3rd arg)
 * and example fields are preserved and will be translated at runtime via the
 * Translation cache.
 *
 * Usage: node scripts/fixOrientationItems.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'textbookLessons');

const META_MAP = {
  'Lesson goal':            { ko: '학습 목표',         rom: 'hakseup mokpyo' },
  'Cluster goal':           { ko: '단원 목표',         rom: 'danwon mokpyo' },
  'Review goal':            { ko: '복습 목표',         rom: 'bokseup mokpyo' },
  'Real-world scenario':    { ko: '오늘의 상황',       rom: 'oneurui sanghwang' },
  'Scenario':               { ko: '상황 설정',         rom: 'sanghwang seoljeong' },
  'Two politeness levels':  { ko: '두 가지 말투',      rom: 'du gaji maltu' },
};

function processFile(filename) {
  const filepath = path.join(ROOT, filename);
  let src = fs.readFileSync(filepath, 'utf8');
  let changed = 0;

  // Pattern: createContentItem('<META>', '<anything>', ...)
  // We replace just the first two single-quoted string arguments when the
  // first one matches a known meta-label.
  for (const [label, { ko, rom }] of Object.entries(META_MAP)) {
    // Match the literal first arg + a comma + the second string arg.
    // First arg is the exact label (may contain spaces); second arg is any
    // single-quoted string.
    const escLabel = label.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(
      `createContentItem\\(\\s*'${escLabel}'\\s*,\\s*'([^']*)'`,
      'g',
    );
    const next = src.replace(re, (match, oldRom) => {
      changed += 1;
      return `createContentItem('${ko}', '${rom}'`;
    });
    src = next;
  }

  if (changed > 0) {
    fs.writeFileSync(filepath, src, 'utf8');
    console.log(`  ${filename}: fixed ${changed} orientation item(s)`);
  }
  return changed;
}

function main() {
  const files = fs
    .readdirSync(ROOT)
    .filter(f => f.endsWith('.js') && !fs.statSync(path.join(ROOT, f)).isDirectory());

  console.log(`Scanning ${files.length} lesson files in ${ROOT}…`);
  let totalChanges = 0;
  let filesChanged = 0;
  for (const f of files) {
    const n = processFile(f);
    if (n > 0) filesChanged += 1;
    totalChanges += n;
  }
  console.log(`\nDone. Changed ${totalChanges} item(s) across ${filesChanged} file(s).`);
}

main();
