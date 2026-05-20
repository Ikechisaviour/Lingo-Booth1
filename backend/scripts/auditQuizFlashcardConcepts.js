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
  normalizeConceptKey,
} = require('../utils/languageConcepts');
const {
  buildDefaultFlashcardSourceForLanguage,
  buildPracticeLessonsForLanguage,
  getTargetTeachingProfile,
} = require('../utils/targetAuthoredPracticeContent');
const {
  findTargetContentIssues,
  seededPronunciationLooksWrong,
} = require('../utils/targetContentQuality');
const { SUPPORTED_LANGUAGES } = require('../config/languages');

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
  const sources = [
    { lang: 'ko', rawCards: require(path.join(ROOT, 'flashcardData.js')) },
    ...files.map(file => ({
      lang: path.basename(file, '.js'),
      rawCards: require(path.join(dir, file)),
    })),
  ];

  for (const { lang, rawCards } of sources) {
    const targetField = languageField(lang);
    const authoredSource = buildDefaultFlashcardSourceForLanguage(lang, rawCards);
    const cards = authoredSource.map((card, index) => ({
      ...card,
      _id: `${lang}:${index}`,
      isDefault: true,
      [targetField]: card[targetField] || card.korean || '',
    }));
    const normalized = normalizeFlashcardsForLanguagePair(cards, lang, 'en');
    const profile = getTargetTeachingProfile(lang);
    const authoredSources = new Set(normalized.map(card => card.usage?.source).filter(Boolean));

    if (profile && !authoredSources.has('target-profile')) {
      issues.push({
        area: 'flashcards',
        type: 'missing-target-profile-cards',
        lang,
      });
    }

      if (profile && lang !== 'ko') {
        const legacyLike = normalized.find(card => !['target-profile', 'target-curriculum'].includes(card.usage?.source));
        if (legacyLike) {
          issues.push({
            area: 'flashcards',
          type: 'non-authored-default-card',
          lang,
          target: legacyLike[targetField],
          gloss: legacyLike.english,
        });
      }
    }

    if (lang === 'en') {
      const missingEnglishTeachingGloss = normalized.find((card) => {
        const targetText = card[targetField] || card.korean || '';
        const gloss = card.conceptGloss || '';
        return !gloss || normalizeConceptKey(gloss) === normalizeConceptKey(targetText);
      });
      if (missingEnglishTeachingGloss) {
        issues.push({
          area: 'flashcards',
          type: 'english-target-missing-teaching-gloss',
          lang,
          target: missingEnglishTeachingGloss[targetField],
          gloss: missingEnglishTeachingGloss.conceptGloss,
        });
      }
    }

    const teachingFocuses = new Set(normalized.map(card => card.usage?.teachingFocus).filter(Boolean));
    if (profile && teachingFocuses.size < Math.min(5, profile.cards.length)) {
      issues.push({
        area: 'flashcards',
        type: 'thin-target-teaching-profile',
        lang,
        focusCount: teachingFocuses.size,
      });
    }

    const seenTargets = new Map();
    normalized.forEach((card, index) => {
      const targetQualityIssues = findTargetContentIssues(card, lang, {
        fields: [
          { name: targetField, value: card[targetField] || card.korean, kind: 'target' },
          { name: 'english', value: card.english, kind: 'canonical-gloss' },
          { name: 'conceptGloss', value: card.conceptGloss, kind: 'canonical-gloss' },
        ],
      });
      targetQualityIssues.forEach((qualityIssue) => {
        issues.push({
          area: 'flashcards',
          type: 'target-content-carryover',
          lang,
          index,
          target: card[targetField],
          gloss: card.english,
          reason: qualityIssue.reason,
          field: qualityIssue.field,
        });
      });

      if (seededPronunciationLooksWrong(card, lang)) {
        issues.push({
          area: 'flashcards',
          type: 'seeded-pronunciation-carryover',
          lang,
          index,
          target: card[targetField],
          pronunciation: card.romanization || card.officialPronunciation || card.pronunciation,
        });
      }

      if (lang !== 'ko' && (hasLeak(card[targetField]) || hasLeak(card.english))) {
        issues.push({
          area: 'flashcards',
          lang,
          index,
          target: card[targetField],
          gloss: card.english,
        });
      }

      const targetKey = normalizeConceptKey(card[targetField]);
      if (!targetKey) return;
      if (seenTargets.has(targetKey)) {
        issues.push({
          area: 'flashcards',
          type: 'duplicate-target',
          lang,
          firstIndex: seenTargets.get(targetKey),
          index,
          target: card[targetField],
          gloss: card.english,
        });
      } else {
        seenTargets.set(targetKey, index);
      }
    });
  }
  return issues;
}

function auditLessons() {
  const issues = [];
  const dir = path.join(ROOT, 'lessonData');
  const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(file => file.endsWith('.js')) : [];

  for (const lang of SUPPORTED_LANGUAGES) {
    const file = `${lang}.js`;
    const modulePath = path.join(dir, file);
    const lessons = buildPracticeLessonsForLanguage(lang);
    const fallbackLessons = fs.existsSync(modulePath) ? Object.values(require(modulePath)).filter(Boolean) : [];
    const sourceLessons = lessons.length ? lessons : fallbackLessons;

    if (getTargetTeachingProfile(lang) && !lessons.length) {
      issues.push({
        area: 'quiz',
        type: 'missing-target-authored-practice-lessons',
        lang,
      });
    }

    const sourceNames = new Set(
      sourceLessons
        .flatMap(lesson => (lesson.content || []).map(item => item.usage?.source))
        .filter(Boolean),
    );
    if (lessons.length && !sourceNames.has('target-curriculum')) {
      issues.push({
        area: 'quiz',
        type: 'practice-lessons-not-curriculum-derived',
        lang,
      });
    }

    const moduleLang = path.basename(file, '.js');
    sourceLessons.forEach((lesson, lessonIndex) => {
      const normalized = normalizeLessonForLanguagePair(
        JSON.parse(JSON.stringify(lesson)),
        lesson.targetLang || moduleLang,
        'en',
      );
      const seenTargets = new Map();
      (normalized.content || []).forEach((item, itemIndex) => {
        const targetQualityIssues = findTargetContentIssues(item, lang, {
          fields: [
            { name: 'targetText', value: item.targetText, kind: 'target' },
            { name: 'exampleTarget', value: item.exampleTarget || item.example, kind: 'target-example' },
            { name: 'nativeText', value: item.nativeText, kind: 'canonical-gloss' },
            { name: 'conceptGloss', value: item.conceptGloss, kind: 'canonical-gloss' },
            ...((item.breakdown || []).flatMap((part, index) => ([
              { name: `breakdown[${index}].target`, value: part.target || part.korean, kind: 'target-breakdown' },
              { name: `breakdown[${index}].native`, value: part.native || part.english, kind: 'canonical-gloss' },
            ]))),
          ],
        });
        targetQualityIssues.forEach((qualityIssue) => {
          issues.push({
            area: 'quiz',
            type: 'target-content-carryover',
            lang: moduleLang,
            lessonIndex,
            itemIndex,
            target: item.targetText,
            gloss: item.nativeText,
            reason: qualityIssue.reason,
            field: qualityIssue.field,
          });
        });

        if (moduleLang !== 'ko' && (hasLeak(item.targetText) || hasLeak(item.nativeText))) {
          issues.push({
            area: 'quiz',
            lang: moduleLang,
            lessonIndex,
            itemIndex,
            target: item.targetText,
            gloss: item.nativeText,
          });
        }

        const targetKey = `${item.type || ''}|${normalizeConceptKey(item.targetText)}`;
        if (!normalizeConceptKey(item.targetText)) return;
        if (seenTargets.has(targetKey)) {
          issues.push({
              area: 'quiz',
              type: 'duplicate-target',
              lang: moduleLang,
              lessonIndex,
            firstItemIndex: seenTargets.get(targetKey),
            itemIndex,
            target: item.targetText,
            gloss: item.nativeText,
          });
        } else {
          seenTargets.set(targetKey, itemIndex);
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
