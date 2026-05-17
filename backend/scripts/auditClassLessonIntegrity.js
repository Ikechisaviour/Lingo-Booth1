/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  looksLikeEnglishScaffoldTargetText,
  normalizeTargetLayerForDisplay,
} = require('../utils/targetLayerPolicy');

const repoRoot = path.resolve(__dirname, '..', '..');
const issues = [];
const generatedCurriculumLangs = ['es', 'fr', 'ja', 'de'];

function read(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), 'utf8');
}

const translationService = read('backend/utils/translationService.js');
if (!translationService.includes('TRANSLATION_POLICY_VERSION')) {
  issues.push('translationService must version lesson overlay policy changes.');
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

const lessonsRoute = read('backend/routes/lessons.js');
[
  'normalizeTargetLayerForDisplay(lessonObj, targetLang)',
  'normalizeTargetLayerForDisplay(lessonObj, normalizedTargetLang)',
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
  Object.values(curriculum).forEach((lesson) => {
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
    });
  }
}

if (issues.length) {
  console.error('Class lesson integrity audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Class lesson integrity audit passed.');
