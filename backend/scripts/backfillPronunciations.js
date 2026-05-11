/**
 * Builds pronunciation cache entries for existing Atlas/local data.
 *
 * Runtime requests also generate pronunciations on demand, so this script is
 * mainly for warming common pairs before users open the app.
 *
 * Usage:
 *   NATIVE_LANGS=en,hi,ar TARGET_LANGS=zh,ko npm run seed:pronunciations
 */

const mongoose = require('mongoose');
const Flashcard = require('../models/Flashcard');
const Lesson = require('../models/Lesson');
const { languageField } = require('../utils/languageConcepts');
const {
  enrichFlashcardsWithPronunciation,
  enrichLessonWithPronunciation,
} = require('../utils/pronunciationService');
require('dotenv').config();

const DEFAULT_TARGETS = ['ko', 'zh', 'ja', 'hi', 'ar', 'he', 'ru', 'bn', 'ta', 'th'];
const DEFAULT_NATIVES = ['en'];

function listFromEnv(name, fallback) {
  const raw = String(process.env[name] || '').trim();
  if (!raw) return fallback;
  return raw.split(',').map(item => item.trim().toLowerCase()).filter(Boolean);
}

async function warmFlashcards(targetLang, nativeLang, limit) {
  const targetField = languageField(targetLang);
  const query = { isDefault: true, targetLang };
  const cursor = Flashcard.find(query).sort({ defaultIndex: 1 }).limit(limit || 0).lean().cursor();
  let batch = [];
  let count = 0;

  for await (const card of cursor) {
    const item = { ...card };
    if (!item[targetField] && item.korean) item[targetField] = item.korean;
    batch.push(item);
    if (batch.length >= 50) {
      await enrichFlashcardsWithPronunciation(batch, targetLang, nativeLang);
      count += batch.length;
      batch = [];
    }
  }

  if (batch.length) {
    await enrichFlashcardsWithPronunciation(batch, targetLang, nativeLang);
    count += batch.length;
  }

  return count;
}

async function warmLessons(targetLang, nativeLang, limit) {
  const cursor = Lesson.find({ targetLang }).sort({ createdAt: 1 }).limit(limit || 0).lean().cursor();
  let count = 0;

  for await (const lesson of cursor) {
    await enrichLessonWithPronunciation(lesson, targetLang, nativeLang);
    count += Array.isArray(lesson.content) ? lesson.content.length : 0;
  }

  return count;
}

async function run() {
  const targetLangs = listFromEnv('TARGET_LANGS', DEFAULT_TARGETS);
  const nativeLangs = listFromEnv('NATIVE_LANGS', DEFAULT_NATIVES);
  const flashcardLimit = Math.max(0, Number(process.env.FLASHCARD_LIMIT || 0));
  const lessonLimit = Math.max(0, Number(process.env.LESSON_LIMIT || 0));

  await mongoose.connect(process.env.MONGODB_URI);
  console.log('Connected to MongoDB');

  for (const targetLang of targetLangs) {
    for (const nativeLang of nativeLangs) {
      const flashcards = await warmFlashcards(targetLang, nativeLang, flashcardLimit);
      const lessonItems = await warmLessons(targetLang, nativeLang, lessonLimit);
      console.log(`${targetLang}->${nativeLang}: warmed ${flashcards} flashcards and ${lessonItems} lesson items`);
    }
  }

  await mongoose.disconnect();
  console.log('Pronunciation backfill complete');
}

run().catch(async (error) => {
  console.error('Pronunciation backfill failed:', error);
  try { await mongoose.disconnect(); } catch (_) {}
  process.exit(1);
});
