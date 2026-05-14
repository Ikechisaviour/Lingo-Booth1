/* eslint-disable no-console */
// Invalidate cached Translation rows. Per AGENTS.md "Class Lesson Content
// Language": after editing the canonical English in a lesson seed, run this
// to drop the stale per-native translations so the next learner request
// triggers a fresh lazy-fill.
//
// Usage:
//   node scripts/invalidateTranslations.js --lessonId=<id>
//   node scripts/invalidateTranslations.js --target=ko
//   node scripts/invalidateTranslations.js --target=ko --native=es
//   node scripts/invalidateTranslations.js --all
//
// `--all` nukes every cached translation. Reserve it for schema bumps or when
// the source-language for translation itself changed. Otherwise prefer the
// scoped flags so unrelated lessons keep their warm cache.
require('dotenv').config();
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const Translation = require('../models/Translation');

function parseArgs(argv) {
  const out = {};
  for (const a of argv.slice(2)) {
    if (!a.startsWith('--')) continue;
    const eq = a.indexOf('=');
    if (eq === -1) out[a.slice(2)] = true;
    else out[a.slice(2, eq)] = a.slice(eq + 1);
  }
  return out;
}

async function main() {
  const args = parseArgs(process.argv);
  const { lessonId, target, native, all } = args;

  if (!lessonId && !target && !all) {
    console.error('Usage: node scripts/invalidateTranslations.js [--lessonId=<id>] [--target=<lang>] [--native=<lang>] [--all]');
    process.exit(1);
  }

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI is not set in backend/.env');
    process.exit(1);
  }

  await mongoose.connect(uri, { family: 4 });

  let filter = {};
  if (lessonId) {
    if (!mongoose.Types.ObjectId.isValid(lessonId)) {
      console.error(`Not a valid ObjectId: ${lessonId}`);
      await mongoose.disconnect();
      process.exit(1);
    }
    filter.lessonId = lessonId;
  } else if (target) {
    // Translate target → list of lesson ids, then filter Translation by those.
    const lessons = await Lesson.find({ targetLang: target }).select('_id').lean();
    const ids = lessons.map(l => l._id);
    if (!ids.length) {
      console.log(`No lessons found for targetLang=${target}.`);
      await mongoose.disconnect();
      return;
    }
    filter.lessonId = { $in: ids };
    console.log(`Found ${ids.length} lessons with targetLang=${target}.`);
  }
  // `--all` leaves filter empty.

  if (native) {
    filter.lang = String(native).toLowerCase();
  }

  const before = await Translation.countDocuments(filter);
  if (!before) {
    console.log('Nothing to invalidate.');
    await mongoose.disconnect();
    return;
  }

  console.log(`About to delete ${before} Translation row(s).`);
  if (all && !lessonId && !target) {
    console.log('Scope: ALL cached translations (no scope flags provided).');
  } else {
    console.log(`Scope: ${JSON.stringify({ lessonId, target, native, all: !!all })}`);
  }

  const result = await Translation.deleteMany(filter);
  console.log(`Deleted ${result.deletedCount} row(s).`);
  console.log('Next learner request per (lesson, nativeLang) will trigger fresh lazy-fill.');

  await mongoose.disconnect();
}

main().catch((err) => {
  console.error('Invalidate failed:', err.message || err);
  process.exit(1);
});
