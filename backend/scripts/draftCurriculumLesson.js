#!/usr/bin/env node
/**
 * Draft a v2 lesson file from a spec JSON via Anthropic.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-ant-... node backend/scripts/draftCurriculumLesson.js \
 *     --spec backend/curriculum/specs/pattern.identification.be.json \
 *     [--out backend/curriculum/lessons/pattern.identification.be.js] \
 *     [--dry-run]
 *
 * The spec JSON shape matches `draftPatternLesson(spec)` in
 * `backend/curriculum/aiAuthor.js`. By default the script writes the draft to
 * the conventional lesson path; `--dry-run` prints to stdout instead.
 *
 * After running, ALWAYS open the file in your editor and review:
 *   - Are particles correct (을/를, 이/가, 은/는, 에/에서)?
 *   - Are verb conjugations natural and unambiguous?
 *   - Are honorific levels consistent?
 *   - Are the cultural notes accurate (not stereotyped)?
 */

const fs = require('fs');
const path = require('path');
const { draftPatternLesson, isAiAuthorAvailable, DEFAULT_MODEL } = require('../curriculum/aiAuthor');

function parseArgs(argv) {
  const out = { spec: '', out: '', dryRun: false };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--spec' || a === '-s') out.spec = argv[++i];
    else if (a === '--out' || a === '-o') out.out = argv[++i];
    else if (a === '--dry-run') out.dryRun = true;
    else if (a === '--help' || a === '-h') {
      console.log(fs.readFileSync(__filename, 'utf8').split('*/')[0].split('/**')[1]);
      process.exit(0);
    }
  }
  return out;
}

function defaultOutputFor(conceptId) {
  if (!conceptId) return '';
  return path.join(__dirname, '..', 'curriculum', 'lessons', `${conceptId}.js`);
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.spec) {
    console.error('Missing required --spec <path>. See --help.');
    process.exit(2);
  }
  if (!isAiAuthorAvailable()) {
    console.error('ANTHROPIC_API_KEY is not set. Export it and retry.');
    process.exit(3);
  }

  let spec;
  try {
    spec = JSON.parse(fs.readFileSync(args.spec, 'utf8'));
  } catch (err) {
    console.error(`Could not read spec: ${err.message}`);
    process.exit(4);
  }

  console.error(`Drafting ${spec.conceptId} via ${DEFAULT_MODEL}…`);
  const t0 = Date.now();
  let result;
  try {
    result = await draftPatternLesson(spec);
  } catch (err) {
    console.error(`Drafting failed: ${err.message}`);
    process.exit(5);
  }
  const elapsed = ((Date.now() - t0) / 1000).toFixed(1);
  console.error(`Drafting completed in ${elapsed}s (${result.moduleText.length} chars).`);

  if (args.dryRun) {
    process.stdout.write(result.moduleText);
    return;
  }

  const outPath = args.out || defaultOutputFor(spec.conceptId);
  if (!outPath) {
    console.error('No --out path resolvable and spec.conceptId is empty.');
    process.exit(6);
  }
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  if (fs.existsSync(outPath)) {
    console.error(`Refusing to overwrite ${outPath}. Pass --out to a new path or remove first.`);
    process.exit(7);
  }
  fs.writeFileSync(outPath, result.moduleText, 'utf8');
  console.error(`Wrote ${outPath}.`);
  console.error('Now: open the file, native-speaker review, fix anything subtle, then commit.');
}

main().catch((err) => {
  console.error(err.stack || err.message || String(err));
  process.exit(1);
});
