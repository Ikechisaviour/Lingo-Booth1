/**
 * Verify that a target-language textbook curriculum in MongoDB matches the
 * current local source files exactly.
 *
 * Usage:
 *   node scripts/verifyTargetCurriculum.js es
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

function lessonHash(doc) {
  if (doc.curriculumSourceHash) return doc.curriculumSourceHash;
  return curriculumSourceHash(comparableLessonShape(Lesson, doc));
}

async function verify() {
  const targetLang = String(process.argv[2] || '').trim().toLowerCase();
  if (!targetLang) {
    console.error('Usage: node scripts/verifyTargetCurriculum.js <targetLang>');
    process.exit(1);
  }

  try {
    const { curriculum, sourceKind, sourcePath } = loadTargetCurriculum(targetLang);
    const sourceEntries = Object.entries(curriculum);
    const sourceByKey = new Map(sourceEntries.map(([curriculumKey, lesson]) => [
      curriculumKey,
      preparedCurriculumLesson(Lesson, curriculumKey, lesson),
    ]));

    await mongoose.connect(process.env.MONGODB_URI);
    const lessons = await Lesson.find({
      targetLang,
      track: CLASS_LESSON_TRACK,
    });
    const activeLessons = lessons.filter((lesson) => lesson.curriculumStatus !== 'archived');
    const lessonByKey = new Map(activeLessons
      .filter((lesson) => lesson.curriculumKey)
      .map((lesson) => [lesson.curriculumKey, lesson]));

    const missing = [];
    const mismatched = [];
    for (const [curriculumKey, prepared] of sourceByKey.entries()) {
      const existing = lessonByKey.get(curriculumKey);
      if (!existing) {
        missing.push(curriculumKey);
      } else if (lessonHash(existing) !== prepared.curriculumSourceHash) {
        mismatched.push(curriculumKey);
      }
    }

    const extraActive = activeLessons
      .filter((lesson) => !lesson.curriculumKey || !sourceByKey.has(lesson.curriculumKey))
      .map((lesson) => lesson.curriculumKey || `[legacy:${lesson.title}]`);

    console.log(`Curriculum verification for ${targetLang}`);
    console.log(`Source shape: ${sourceKind}`);
    console.log(`Source path: ${sourcePath}`);
    console.log(`Source lessons: ${sourceEntries.length}`);
    console.log(`Active DB lessons: ${activeLessons.length}`);
    console.log(`Archived DB lessons: ${lessons.length - activeLessons.length}`);
    console.log(`Missing: ${missing.length ? missing.join(', ') : 'none'}`);
    console.log(`Mismatched: ${mismatched.length ? mismatched.join(', ') : 'none'}`);
    console.log(`Extra active: ${extraActive.length ? extraActive.join(', ') : 'none'}`);

    await mongoose.disconnect();

    if (missing.length || mismatched.length || extraActive.length) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Verify error:', error);
    await mongoose.disconnect().catch(() => {});
    process.exit(1);
  }
}

verify();
