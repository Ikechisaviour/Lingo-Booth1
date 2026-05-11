/**
 * Audits quiz and flashcard seed data after runtime concept normalization.
 *
 * This does not require MongoDB. It checks that known Korean/English-specific
 * leakage patterns are removed from normalized non-Korean target content.
 *
 * Usage: node scripts/auditQuizFlashcardConcepts.js
 */

const fs = require('fs');
const path = require('path');
const {
  normalizeFlashcardsForLanguagePair,
  normalizeLessonForLanguagePair,
  languageField,
} = require('../utils/languageConcepts');

const ROOT = path.join(__dirname, '..');
const KNOWN_LEAK_PATTERNS = [
  /\bOlder (?:brother|sister) \((?:male|female) speaker\)/i,
  /\bI\/Me \((?:formal|informal)\)/i,
  /\bHi \(informal\)/i,
  /\bGoodbye \((?:when you leave|to leaving person|to person leaving)\)/i,
];

function hasLeak(text) {
  return KNOWN_LEAK_PATTERNS.some(pattern => pattern.test(String(text || '')));
}

function auditFlashcards() {
  const issues = [];
  const dir = path.join(ROOT, 'flashcardData');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(file => file.endsWith('.js')) : [];

  for (const file of files) {
    const lang = path.basename(file, '.js');
    const targetField = languageField(lang);
    const cards = require(path.join(dir, file)).map((card, index) => ({
      ...card,
      _id: `${lang}:${index}`,
      isDefault: true,
      [targetField]: card[targetField] || card.korean || '',
    }));
    const normalized = normalizeFlashcardsForLanguagePair(cards, lang, 'en');
    normalized.forEach((card, index) => {
      if (hasLeak(card[targetField]) || hasLeak(card.english)) {
        issues.push({
          area: 'flashcards',
          lang,
          index,
          target: card[targetField],
          gloss: card.english,
        });
      }
    });
  }
  return issues;
}

function auditLessons() {
  const issues = [];
  const dir = path.join(ROOT, 'lessonData');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(file => file.endsWith('.js')) : [];

  for (const file of files) {
    const lang = path.basename(file, '.js');
    const modulePath = path.join(dir, file);
    const lessons = Object.values(require(modulePath)).filter(Boolean);
    lessons.forEach((lesson, lessonIndex) => {
      const normalized = normalizeLessonForLanguagePair(
        JSON.parse(JSON.stringify(lesson)),
        lesson.targetLang || lang,
        'en',
      );
      (normalized.content || []).forEach((item, itemIndex) => {
        if (hasLeak(item.targetText) || hasLeak(item.nativeText)) {
          issues.push({
            area: 'quiz',
            lang,
            lessonIndex,
            itemIndex,
            target: item.targetText,
            gloss: item.nativeText,
          });
        }
      });
    });
  }
  return issues;
}

const issues = [...auditFlashcards(), ...auditLessons()];
if (issues.length > 0) {
  console.error(`Found ${issues.length} normalized quiz/flashcard concept issue(s).`);
  issues.slice(0, 25).forEach(issue => console.error(JSON.stringify(issue)));
  process.exit(1);
}

console.log('Quiz and flashcard concept audit passed.');
