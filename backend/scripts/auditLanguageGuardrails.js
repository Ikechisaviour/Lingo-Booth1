/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const files = {
  agents: path.join(repoRoot, 'AGENTS.md'),
  docs: path.join(repoRoot, 'docs', 'IMPLEMENTATION_GUARDRAILS.md'),
  lessonsRoute: path.join(repoRoot, 'backend', 'routes', 'lessons.js'),
  flashcardsRoute: path.join(repoRoot, 'backend', 'routes', 'flashcards.js'),
  translationService: path.join(repoRoot, 'backend', 'utils', 'translationService.js'),
  backendPackage: path.join(repoRoot, 'backend', 'package.json'),
  webPolicy: path.join(repoRoot, 'frontend', 'src', 'utils', 'languagePairPolicy.js'),
  mobilePolicy: path.join(repoRoot, 'mobile', 'src', 'utils', 'languagePairPolicy.ts'),
};

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

const issues = [];

for (const [name, file] of Object.entries(files)) {
  if (!fs.existsSync(file)) {
    issues.push(`${name}: missing required guardrail file ${path.relative(repoRoot, file)}`);
  }
}

if (fs.existsSync(files.agents)) {
  const source = read(files.agents);
  [
    'Non-Bypassable Localization And Parity Gate',
    'all supported languages',
    'both web and mobile',
    'npm run audit:all',
  ].forEach((token) => {
    if (!source.includes(token)) {
      issues.push(`AGENTS.md must include the non-bypassable localization/parity rule token: "${token}".`);
    }
  });
}

if (fs.existsSync(files.docs)) {
  const source = read(files.docs);
  [
    'Non-Bypassable Gate',
    'all supported locales',
    'web and mobile',
    'audit:all',
  ].forEach((token) => {
    if (!source.includes(token)) {
      issues.push(`IMPLEMENTATION_GUARDRAILS.md must include the enforced gate token: "${token}".`);
    }
  });
}

if (fs.existsSync(files.lessonsRoute)) {
  const source = read(files.lessonsRoute);
  const required = [
    'normalizedNativeLang',
    'normalizeLang(nativeLang',
    'results[k]?.failed',
    'lang: normalizedNativeLang',
    'cleanTargetExamplesForNativeDisplay(lessonObj, targetLang, normalizedNativeLang)',
    'enrichLessonWithPronunciation(lessonObj, targetLang, normalizedNativeLang)',
  ];
  required.forEach((token) => {
    if (!source.includes(token)) {
      issues.push(`backend/routes/lessons.js must preserve localization guardrail token: "${token}".`);
    }
  });

  const forbidden = [
    {
      pattern: /batchTranslateRaw\([^,\n]+,\s*['"`]en['"`],\s*nativeLang\)/,
      message: 'Do not translate class/native fallbacks with raw nativeLang; use normalizedNativeLang.',
    },
    {
      pattern: /^\s*cleanTargetExamplesForNativeDisplay\(lessonObj,\s*targetLang,\s*nativeLang/m,
      message: 'Do not clean class examples using raw nativeLang; use normalizedNativeLang.',
    },
    {
      pattern: /^\s*enrichLessonWithPronunciation\(lessonObj,\s*targetLang,\s*nativeLang/m,
      message: 'Do not enrich pronunciations using raw nativeLang; use normalizedNativeLang.',
    },
    {
      pattern: /Translation\.updateOne\(\s*\{\s*lessonId:\s*uncached\[i\]\._id,\s*lang:\s*nativeLang\s*\}/,
      message: 'Do not cache translations under raw nativeLang aliases.',
    },
  ];
  forbidden.forEach(({ pattern, message }) => {
    if (pattern.test(source)) issues.push(`backend/routes/lessons.js: ${message}`);
  });
}

if (fs.existsSync(files.translationService)) {
  const source = read(files.translationService);
  const required = [
    'failed: false',
    'failed: true',
    'titleResults[0]?.failed',
    'nativeResults[k]?.failed',
  ];
  required.forEach((token) => {
    if (!source.includes(token)) {
      issues.push(`backend/utils/translationService.js must preserve failed-translation guardrail token: "${token}".`);
    }
  });

  const forbidden = [
    /return texts\.map\(t => \(\{ text: t, pronunciation: '' \}\)\)/,
    /const translated = nativeResults\[k\]\?\.text \|\| targetTexts\[k\]/,
  ];
  forbidden.forEach((pattern) => {
    if (pattern.test(source)) {
      issues.push('backend/utils/translationService.js must not return/cache raw English as a non-English fallback.');
    }
  });
}

if (fs.existsSync(files.flashcardsRoute)) {
  const source = read(files.flashcardsRoute);
  if (!source.includes('results[k]?.failed')) {
    issues.push('backend/routes/flashcards.js must check failed translation results before rendering native flashcard text.');
  }
}

if (fs.existsSync(files.backendPackage)) {
  const source = read(files.backendPackage);
  if (!source.includes('auditQuizFlashcardConcepts.js')) {
    issues.push('backend/package.json audit:language-guardrails must run auditQuizFlashcardConcepts.js so quiz/flashcard target contamination cannot bypass npm run audit:all.');
  }
}

for (const [name, file] of [['web language policy', files.webPolicy], ['mobile language policy', files.mobilePolicy]]) {
  if (!fs.existsSync(file)) continue;
  const source = read(file);
  ['kr', 'cn', 'jp', 'normalizeLanguageCode', 'looksLikeRawEnglishForNative'].forEach((token) => {
    if (!source.includes(token)) {
      issues.push(`${name} must keep alias normalization and raw-English detection token: "${token}".`);
    }
  });
}

if (issues.length > 0) {
  console.error('Backend language guardrail audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Backend language guardrail audit passed.');
