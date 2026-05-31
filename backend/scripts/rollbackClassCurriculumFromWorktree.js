/**
 * Restore class-lesson documents from an older git worktree.
 *
 * This is intentionally separate from the normal curriculum seeder. It is used
 * when we need Atlas to show an earlier class-curriculum snapshot while newer
 * local code remains in place. It upserts the old textbook lessons and archives
 * active textbook lessons for the same target languages that are not present in
 * that snapshot.
 *
 * Usage:
 *   node scripts/rollbackClassCurriculumFromWorktree.js C:/tmp/lb-old-seed-8f554b0/backend
 */

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const Translation = require('../models/Translation');

const oldBackendRoot = path.resolve(
  process.argv[2] ||
    process.env.OLD_BACKEND_ROOT ||
    'C:/tmp/lb-old-seed-8f554b0/backend',
);

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function collectLessonObjects(moduleValue) {
  if (!moduleValue || typeof moduleValue !== 'object') return [];
  if (moduleValue.track === 'textbook' && moduleValue.targetLang && moduleValue.title) {
    return [moduleValue];
  }
  if (Array.isArray(moduleValue)) {
    return moduleValue.filter((item) => item?.track === 'textbook' && item?.targetLang && item?.title);
  }
  return Object.values(moduleValue).filter(
    (item) => item?.track === 'textbook' && item?.targetLang && item?.title,
  );
}

function collectFromFile(filePath) {
  try {
    delete require.cache[require.resolve(filePath)];
    return collectLessonObjects(require(filePath));
  } catch (error) {
    console.warn(`Skipping ${filePath}: ${error.message}`);
    return [];
  }
}

function collectOldClassLessons(rootDir) {
  const textbookRoot = path.join(rootDir, 'textbookLessons');
  const byKey = new Map();

  function addLesson(lesson) {
    const doc = clone(lesson);
    const key = `${doc.targetLang}::${doc.title}`;
    doc.curriculumStatus = 'active';
    doc.curriculumArchivedAt = null;
    doc.curriculumSeededAt = new Date();
    byKey.set(key, doc);
  }

  function visit(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name === 'shared') continue;
        visit(fullPath);
        continue;
      }
      if (!entry.isFile() || !entry.name.endsWith('.js')) continue;
      for (const lesson of collectFromFile(fullPath)) {
        addLesson(lesson);
      }
    }
  }

  visit(textbookRoot);
  return [...byKey.values()];
}

async function main() {
  if (!fs.existsSync(oldBackendRoot)) {
    throw new Error(`Old backend root not found: ${oldBackendRoot}`);
  }

  const lessons = collectOldClassLessons(oldBackendRoot);
  if (!lessons.length) {
    throw new Error(`No old class lessons found under ${oldBackendRoot}`);
  }

  await mongoose.connect(process.env.MONGODB_URI);
  const lessonCollection = mongoose.connection.collection('lessons');

  const byLanguage = new Map();
  const touchedLessonIds = [];
  let upserted = 0;
  let replaced = 0;

  for (const lesson of lessons) {
    if (!byLanguage.has(lesson.targetLang)) byLanguage.set(lesson.targetLang, new Set());
    byLanguage.get(lesson.targetLang).add(lesson.title);

    const result = await lessonCollection.replaceOne(
      { title: lesson.title, targetLang: lesson.targetLang },
      lesson,
      { upsert: true },
    );
    if (result.upsertedCount) upserted += 1;
    if (result.modifiedCount || result.matchedCount) replaced += 1;

    const saved = await lessonCollection.findOne(
      { title: lesson.title, targetLang: lesson.targetLang },
      { projection: { _id: 1 } },
    );
    if (saved?._id) touchedLessonIds.push(saved._id);
  }

  const translationDelete = touchedLessonIds.length
    ? await Translation.deleteMany({ lessonId: { $in: touchedLessonIds } })
    : { deletedCount: 0 };

  let archived = 0;
  for (const [targetLang, titleSet] of byLanguage.entries()) {
    const titles = [...titleSet];
    const archiveResult = await lessonCollection.updateMany(
      {
        track: 'textbook',
        targetLang,
        title: { $nin: titles },
        curriculumStatus: { $ne: 'archived' },
      },
      {
        $set: {
          curriculumStatus: 'archived',
          curriculumArchivedAt: new Date(),
          curriculumArchivedReason: 'rollback-old-content',
        },
      },
    );
    archived += archiveResult.modifiedCount || 0;
  }

  console.log(`Loaded ${lessons.length} old class lessons from ${oldBackendRoot}`);
  console.log(`Replaced/matched ${replaced}; upserted ${upserted}; archived stale ${archived}`);
  console.log(`Cleared ${translationDelete.deletedCount} class translation cache records`);

  for (const targetLang of [...byLanguage.keys()].sort()) {
    const active = await lessonCollection.countDocuments({
      track: 'textbook',
      targetLang,
      curriculumStatus: { $ne: 'archived' },
    });
    console.log(`${targetLang}: ${active} active class lessons`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.disconnect();
  });
