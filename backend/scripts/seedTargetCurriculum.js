/**
 * Seed or synchronize a target-language textbook curriculum module.
 *
 * Safe refresh (default):
 *   node scripts/seedTargetCurriculum.js es
 *
 * Preview only:
 *   node scripts/seedTargetCurriculum.js es --dry-run
 *
 * Preview stale lessons that no longer exist in the source curriculum:
 *   node scripts/seedTargetCurriculum.js es --sync --dry-run
 *
 * Archive stale lessons explicitly after review:
 *   node scripts/seedTargetCurriculum.js es --sync --archive-stale
 *
 * Re-seeding an unchanged curriculum is intentionally idempotent:
 * it reports unchanged lessons and performs no replacements.
 */

/* eslint-disable no-console */
const mongoose = require('mongoose');
const Lesson = require('../models/Lesson');
const {
  comparableLessonShape,
  curriculumSourceHash,
  preparedCurriculumLesson,
} = require('../utils/curriculumSync');
const { loadTargetCurriculum } = require('../utils/loadTargetCurriculum');
require('dotenv').config();

const CLASS_LESSON_TRACK = 'textbook';

function parseArgs(argv) {
  const args = { targetLang: '', dryRun: false, sync: false, archiveStale: false };
  for (const value of argv.slice(2)) {
    if (!value.startsWith('--') && !args.targetLang) {
      args.targetLang = value;
      continue;
    }
    if (value === '--dry-run') args.dryRun = true;
    if (value === '--sync') args.sync = true;
    if (value === '--archive-stale') args.archiveStale = true;
  }
  return args;
}

function lessonHash(doc) {
  if (doc.curriculumSourceHash) return doc.curriculumSourceHash;
  return curriculumSourceHash(comparableLessonShape(Lesson, doc));
}

function summaryLine(label, values) {
  return `${label}: ${values.length ? values.join(', ') : 'none'}`;
}

async function seed() {
  const args = parseArgs(process.argv);
  if (!args.targetLang) {
    console.error('Usage: node scripts/seedTargetCurriculum.js <targetLang> [--dry-run] [--sync] [--archive-stale]');
    process.exit(1);
  }
  if (args.archiveStale && !args.sync) {
    console.error('--archive-stale requires --sync so stale lessons are reviewed as part of an explicit sync.');
    process.exit(1);
  }

  try {
    const targetLang = String(args.targetLang).trim().toLowerCase();
    const { curriculum, sourceKind, sourcePath } = loadTargetCurriculum(targetLang);
    const sourceEntries = Object.entries(curriculum);
    const sourceKeys = new Set(sourceEntries.map(([curriculumKey]) => curriculumKey));
    const now = new Date();

    await mongoose.connect(process.env.MONGODB_URI);

    const existingLessons = await Lesson.find({
      targetLang,
      track: CLASS_LESSON_TRACK,
    });
    const existingByKey = new Map(
      existingLessons
        .filter((lesson) => lesson.curriculumKey)
        .map((lesson) => [lesson.curriculumKey, lesson]),
    );
    const legacyByTitle = new Map(
      existingLessons
        .filter((lesson) => !lesson.curriculumKey)
        .map((lesson) => [lesson.title, lesson]),
    );

    const result = {
      inserted: [],
      updated: [],
      unchanged: [],
      reactivated: [],
      migratedLegacy: [],
      stale: [],
      archived: [],
    };
    const matchedExistingIds = new Set();

    for (const [curriculumKey, lesson] of sourceEntries) {
      const prepared = preparedCurriculumLesson(Lesson, curriculumKey, lesson, now);
      const existing = existingByKey.get(curriculumKey) || legacyByTitle.get(lesson.title) || null;

      if (!existing) {
        result.inserted.push(curriculumKey);
        if (!args.dryRun) {
          await Lesson.create(prepared);
        }
        continue;
      }
      matchedExistingIds.add(String(existing._id));

      const changed = lessonHash(existing) !== prepared.curriculumSourceHash;
      const needsReactivation = existing.curriculumStatus === 'archived';
      const needsLegacyMigration = !existing.curriculumKey;

      if (!changed && !needsReactivation && !needsLegacyMigration) {
        result.unchanged.push(curriculumKey);
        continue;
      }

      if (needsReactivation) result.reactivated.push(curriculumKey);
      if (needsLegacyMigration) result.migratedLegacy.push(curriculumKey);
      result.updated.push(curriculumKey);

      if (!args.dryRun) {
        await Lesson.findOneAndReplace(
          { _id: existing._id },
          {
            ...prepared,
            createdAt: existing.createdAt,
          },
          { new: true },
        );
      }
    }

    const staleLessons = existingLessons.filter((lesson) => (
      lesson.curriculumStatus !== 'archived'
      && !matchedExistingIds.has(String(lesson._id))
      && (
        !lesson.curriculumKey
        || !sourceKeys.has(lesson.curriculumKey)
      )
    ));
    result.stale = staleLessons.map((lesson) => lesson.curriculumKey || `[legacy:${lesson.title}]`);

    if (args.sync && args.archiveStale && staleLessons.length && !args.dryRun) {
      await Lesson.updateMany(
        { _id: { $in: staleLessons.map((lesson) => lesson._id) } },
        {
          $set: {
            curriculumStatus: 'archived',
            curriculumArchivedAt: now,
          },
        },
      );
      result.archived = [...result.stale];
    }

    console.log(`Curriculum seed report for ${targetLang}${args.dryRun ? ' [dry-run]' : ''}${args.sync ? ' [sync]' : ''}`);
    console.log(`Source shape: ${sourceKind}`);
    console.log(`Source path: ${sourcePath}`);
    console.log(`Source lessons: ${sourceEntries.length}`);
    console.log(summaryLine('Inserted', result.inserted));
    console.log(summaryLine('Updated', result.updated));
    console.log(summaryLine('Unchanged', result.unchanged));
    console.log(summaryLine('Reactivated', result.reactivated));
    console.log(summaryLine('Migrated legacy matches', result.migratedLegacy));
    console.log(summaryLine('Stale active lessons', result.stale));
    console.log(summaryLine('Archived this run', result.archived));

    if (result.stale.length && !args.sync) {
      console.log('Tip: run again with --sync --dry-run to review stale lessons, then --sync --archive-stale after approval.');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Seed error:', err);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

seed();
