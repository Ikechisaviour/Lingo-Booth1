/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  looksLikeEnglishScaffoldTargetText,
  looksLikeEnglishInstructionScaffold,
  normalizeTargetLayerForDisplay,
} = require('../utils/targetLayerPolicy');
const Lesson = require('../models/Lesson');
const { loadTargetCurriculum } = require('../utils/loadTargetCurriculum');

const repoRoot = path.resolve(__dirname, '..', '..');
const issues = [];
const generatedCurriculumLangs = [
  'es', 'fr', 'ja', 'de',
  'ms', 'ar', 'he', 'hi', 'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn',
];

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const translationService = read('backend/utils/translationService.js');
if (!translationService.includes('TRANSLATION_POLICY_VERSION')) {
  issues.push('translationService must version lesson overlay policy changes.');
}
if (!translationService.includes('batchTranslatePreservingTargetScript')) {
  issues.push('translationService must preserve target-script snippets while translating learner overlays.');
}
if (!translationService.includes('protectQuotedTargetSegments')) {
  issues.push('translationService must preserve quoted target-language snippets while translating learner overlays.');
}
if (!translationService.includes("const tt = item.nativeText || item.english || '';")) {
  issues.push('translationService must derive nativeText overlays from canonical English explanation fields.');
}
if (/field:\s*'nativeText',\s*fromLang:\s*targetLang/.test(translationService)) {
  issues.push('translationService must not translate nativeText from targetLang.');
}

const aiConversation = read('backend/utils/aiConversation.js');
[
  "const { batchTranslateRaw } = require('./translationService');",
  'await getLocalizedFallbackPhrases(safeNativeLanguage)',
  "String(action.activityTask || '').trim()",
].forEach((token) => {
  if (!aiConversation.includes(token)) {
    issues.push(`aiConversation must preserve localized class-tutor control path token: "${token}".`);
  }
});
if (aiConversation.includes("localized[k] = translated && translated.trim() ? translated : FALLBACK_PHRASE_TEMPLATES[k];")) {
  issues.push('aiConversation must not leak English tutor-control prose when a non-English translation fails.');
}
if (!aiConversation.includes('if (!reply && lessonBrief?.items?.length)')) {
  issues.push('aiConversation must preserve a class-tutor fallback path for free-text class turns.');
}

const lessonsRoute = read('backend/routes/lessons.js');
[
  'normalizeTargetLayerForDisplay(lessonObj, targetLang)',
  'normalizeTargetLayerForDisplay(lessonObj, normalizedTargetLang)',
  'inferCourseOrderingMetadata(lesson)',
  'warmClassLessonPair(targetLang, nativeLang, req.userId)',
  "await localizeLessonForPair(lesson, 'classLesson', normalizedNativeLang)",
  "require('../utils/targetLayerPolicy')",
].forEach((token) => {
  if (!lessonsRoute.includes(token)) {
    issues.push(`lessons route must preserve class integrity/performance token: "${token}".`);
  }
});

for (const lang of generatedCurriculumLangs) {
  const curriculum = require(path.join(repoRoot, 'backend', 'textbookLessons', lang, 'curriculum.js'));
  const lessonKeys = new Set(Object.keys(curriculum));
  Object.entries(curriculum).forEach(([lessonKey, lesson]) => {
    if (lesson.lessonType === 'review') {
      if (!Array.isArray(lesson.reviewOf) || lesson.reviewOf.length === 0) {
        issues.push(`${lang}: review lesson "${lessonKey}" must declare at least one reviewOf lesson key.`);
      } else {
        lesson.reviewOf.forEach((reviewKey) => {
          if (!lessonKeys.has(reviewKey)) {
            issues.push(`${lang}: review lesson "${lessonKey}" references missing lesson key "${reviewKey}".`);
          }
        });
      }
    } else if (Array.isArray(lesson.reviewOf) && lesson.reviewOf.length > 0) {
      issues.push(`${lang}: non-review lesson "${lessonKey}" must not declare reviewOf keys.`);
    }
    (lesson.content || []).forEach((item) => {
      const target = String(item.targetText || '').trim();
      if (/^(foundation|level \d+ unit \d+|level \d+ review \d+|adult unit \d+|level \d+ cluster \d+)\s+goal$/i.test(target)) {
        issues.push(`${lang}: generated lesson "${lesson.title}" still exposes English orientation target "${target}".`);
      }
      if (lang === 'es' && target === 'sound check') {
        issues.push('es: generated curriculum still exposes the English target label "sound check".');
      }
      const exampleTarget = String(item.exampleTarget || '').trim();
      if (looksLikeEnglishScaffoldTargetText(target, lang, exampleTarget)) {
        issues.push(`${lang}: generated lesson "${lesson.title}" exposes English scaffold target "${target}" while a target-script example exists.`);
      }
    });
  });
}

const nonLatinCurricula = [
  { lang: 'ko', root: path.join(repoRoot, 'backend', 'textbookLessons') },
  { lang: 'zh', root: path.join(repoRoot, 'backend', 'textbookLessons', 'zh') },
  { lang: 'ja', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ja') },
  { lang: 'ar', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ar') },
  { lang: 'he', root: path.join(repoRoot, 'backend', 'textbookLessons', 'he') },
  { lang: 'hi', root: path.join(repoRoot, 'backend', 'textbookLessons', 'hi') },
  { lang: 'bn', root: path.join(repoRoot, 'backend', 'textbookLessons', 'bn') },
  { lang: 'ta', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ta') },
];

const allCurricula = [
  { lang: 'en', root: path.join(repoRoot, 'backend', 'textbookLessons', 'en') },
  { lang: 'ko', root: path.join(repoRoot, 'backend', 'textbookLessons') },
  { lang: 'zh', root: path.join(repoRoot, 'backend', 'textbookLessons', 'zh') },
  { lang: 'ja', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ja') },
  { lang: 'de', root: path.join(repoRoot, 'backend', 'textbookLessons', 'de') },
  { lang: 'es', root: path.join(repoRoot, 'backend', 'textbookLessons', 'es') },
  { lang: 'fr', root: path.join(repoRoot, 'backend', 'textbookLessons', 'fr') },
  { lang: 'ms', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ms') },
  { lang: 'ar', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ar') },
  { lang: 'he', root: path.join(repoRoot, 'backend', 'textbookLessons', 'he') },
  { lang: 'hi', root: path.join(repoRoot, 'backend', 'textbookLessons', 'hi') },
  { lang: 'it', root: path.join(repoRoot, 'backend', 'textbookLessons', 'it') },
  { lang: 'fil', root: path.join(repoRoot, 'backend', 'textbookLessons', 'fil') },
  { lang: 'id', root: path.join(repoRoot, 'backend', 'textbookLessons', 'id') },
  { lang: 'pt', root: path.join(repoRoot, 'backend', 'textbookLessons', 'pt') },
  { lang: 'ru', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ru') },
  { lang: 'tr', root: path.join(repoRoot, 'backend', 'textbookLessons', 'tr') },
  { lang: 'nl', root: path.join(repoRoot, 'backend', 'textbookLessons', 'nl') },
  { lang: 'ta', root: path.join(repoRoot, 'backend', 'textbookLessons', 'ta') },
  { lang: 'bn', root: path.join(repoRoot, 'backend', 'textbookLessons', 'bn') },
];

const supportedCurriculumLangs = [
  'ko', 'zh', 'en', 'ja', 'es', 'fr', 'de', 'ar', 'he', 'hi',
  'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn', 'ms',
];

for (const { lang, root } of nonLatinCurricula) {
  if (!fs.existsSync(root)) continue;
  const files = fs.readdirSync(root).filter((file) => /^level.*\.js$/.test(file));
  for (const file of files) {
    const lesson = require(path.join(root, file));
    const served = JSON.parse(JSON.stringify(lesson));
    normalizeTargetLayerForDisplay(served, lang);
    (served.content || []).forEach((item) => {
      const target = String(item.targetText || '').trim();
      const exampleTarget = String(item.exampleTarget || '').trim();
      if (looksLikeEnglishScaffoldTargetText(target, lang, exampleTarget)) {
        issues.push(`${lang}: served learner payload for "${lesson.title}" still exposes English scaffold target "${target}".`);
      }
      if (looksLikeEnglishInstructionScaffold(target, lang)) {
        issues.push(`${lang}: served learner payload for "${lesson.title}" still exposes an English instruction wrapper in targetText "${target}".`);
      }
      if (/\([^)]*[A-Za-z]{3,}[^)]*\)/.test(exampleTarget)) {
        issues.push(`${lang}: served learner payload for "${lesson.title}" still exposes an English parenthetical gloss in exampleTarget "${exampleTarget}".`);
      }
      if (/^(?:read|say|write|listen to|repeat)\s+/i.test(exampleTarget)) {
        issues.push(`${lang}: served learner payload for "${lesson.title}" still exposes an English instruction wrapper in exampleTarget "${exampleTarget}".`);
      }
      if (/\s+(?:—|–|--|-)\s+[A-Za-z][A-Za-z\s'"-]{12,}$/.test(exampleTarget)) {
        issues.push(`${lang}: served learner payload for "${lesson.title}" still exposes an English explanatory suffix in exampleTarget "${exampleTarget}".`);
      }
    });
  }
}

for (const { lang, root } of allCurricula) {
  if (!fs.existsSync(root)) continue;
  const files = fs.readdirSync(root).filter((file) => /^level.*\.js$/.test(file));
  for (const file of files) {
    const lesson = require(path.join(root, file));
    const activityIds = new Set((lesson.activities || []).map((activity) => activity.id));
    (lesson.content || []).forEach((item) => {
      (item.activityIds || []).forEach((activityId) => {
        if (!activityId || !activityIds.has(activityId)) {
          issues.push(`${lang}: "${lesson.title}" contains invalid activity id "${activityId}" in target "${item.targetText}".`);
        }
      });
    });
  }
}

for (const lang of supportedCurriculumLangs) {
  const { curriculum } = loadTargetCurriculum(lang);
  Object.entries(curriculum).forEach(([lessonKey, lesson]) => {
    const doc = new Lesson({ ...lesson, curriculumKey: lessonKey });
    const error = doc.validateSync();
    if (error) {
      const details = Object.values(error.errors)
        .map((validationError) => `${validationError.path}="${validationError.value}"`)
        .join(', ');
      issues.push(`${lang}: lesson "${lessonKey}" fails Lesson schema validation: ${details}.`);
    }
  });
}

if (issues.length) {
  console.error('Class lesson integrity audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Class lesson integrity audit passed.');
