/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');
const frontendRoot = path.resolve(__dirname, '..');

const classListPage = path.join(frontendRoot, 'src', 'pages', 'ClassLessonsPage.js');
const webApi = path.join(frontendRoot, 'src', 'services', 'api.js');
const mobileApi = path.join(repoRoot, 'mobile', 'src', 'services', 'api.ts');
const backendLessonsRoute = path.join(repoRoot, 'backend', 'routes', 'lessons.js');
const zhFoundationSeed = path.join(repoRoot, 'backend', 'textbookLessons', 'zh', 'level1Foundation.js');
const webLocalesRoot = path.join(frontendRoot, 'src', 'locales');
const mobileLocalesRoot = path.join(repoRoot, 'mobile', 'src', 'locales');
const sharedUiRoots = [
  path.join(frontendRoot, 'src', 'pages'),
  path.join(frontendRoot, 'src', 'components'),
  path.join(repoRoot, 'mobile', 'src', 'screens'),
  path.join(repoRoot, 'mobile', 'src', 'navigation'),
];

const issues = [];

function read(file) {
  return fs.readFileSync(file, 'utf8');
}

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', 'build', '.git'].includes(entry.name)) return [];
      return walkFiles(full);
    }
    return /\.(js|jsx|ts|tsx)$/.test(entry.name) ? [full] : [];
  });
}

const classListSource = read(classListPage);
const forbiddenSharedClassCopy = [
  'Korean Basics',
  'Workplace Korean',
  'Hangul confidently',
  'Hangul',
  'Everyday Korean',
];

for (const phrase of forbiddenSharedClassCopy) {
  if (classListSource.includes(phrase)) {
    issues.push(`ClassLessonsPage.js contains target-specific shared catalogue copy: "${phrase}". Use classList.tracks.* plus the active target language.`);
  }
}

const forbiddenSharedUiCopy = [
  ...forbiddenSharedClassCopy,
  'Friendly chat while practicing Korean',
  'Ask in English or Korean',
  'English -> Korean',
  'Korean -> English',
  'Spanish silent',
];

for (const file of sharedUiRoots.flatMap(walkFiles)) {
  const rel = path.relative(repoRoot, file);
  const source = read(file);
  for (const phrase of forbiddenSharedUiCopy) {
    if (source.includes(phrase)) {
      issues.push(`${rel} contains target-specific shared UI copy: "${phrase}". Use active language names or authored lesson content instead.`);
    }
  }
}

if (!/titleKey:\s*'classList\.tracks\./.test(classListSource)) {
  issues.push('ClassLessonsPage.js must build track headings from classList.tracks.* i18n keys.');
}

if (!/languageNameFor\(targetLanguage,\s*t\)/.test(classListSource)) {
  issues.push('ClassLessonsPage.js must localize the active target language name before rendering track copy.');
}

const webApiSource = read(webApi);
if (!/getLanguageParams/.test(webApiSource) || !/getClassLesson:\s*\(classLessonId\)[\s\S]*params:\s*\{\s*targetLang,\s*nativeLang\s*\}/.test(webApiSource)) {
  issues.push('Web classLessonService.getClassLesson must send both targetLang and nativeLang.');
}

if (!/getLanguageParams/.test(webApiSource) || !/getQuiz:\s*\(quizId\)[\s\S]*params:\s*\{\s*targetLang,\s*nativeLang\s*\}/.test(webApiSource)) {
  issues.push('Web quizService.getQuiz must send both targetLang and nativeLang so stale quiz links cannot show the wrong target language.');
}

if (fs.existsSync(mobileApi)) {
  const mobileApiSource = read(mobileApi);
  if (!/currentLanguageParams/.test(mobileApiSource) || !/getClassLesson:\s*\(classLessonId:\s*string\)[\s\S]*params:\s*\{\s*targetLang,\s*nativeLang\s*\}/.test(mobileApiSource)) {
    issues.push('Mobile classLessonService.getClassLesson must send both targetLang and nativeLang.');
  }
  if (!/currentLanguageParams/.test(mobileApiSource) || !/getQuiz:\s*\(quizId:\s*string\)[\s\S]*params:\s*\{\s*targetLang,\s*nativeLang\s*\}/.test(mobileApiSource)) {
    issues.push('Mobile quizService.getQuiz must send both targetLang and nativeLang so stale quiz links cannot show the wrong target language.');
  }
}

const backendSource = read(backendLessonsRoute);
if (!/normalizedRequestedTargetLang/.test(backendSource) || !/notFoundLabel\(req\)\}\s+not found for this language pair/.test(backendSource)) {
  issues.push('Backend lesson detail route must reject quiz/class lesson IDs that do not match the requested targetLang.');
}

if (!/lesson\.targetLang\s*!==\s*targetLanguage/.test(backendSource)) {
  issues.push('Backend class-lesson progress route must reject progress writes for the wrong target language.');
}

if (
  !/originalExampleNativeTexts/.test(backendSource)
  || !/originalBreakdownNativeTexts/.test(backendSource)
  || !/cleanTargetExamplesForNativeDisplay\(lessonObj,\s*targetLang,\s*normalizedNativeLang/.test(backendSource)
  || !/batchTranslateRaw\([^,\n]+,\s*['"`]en['"`],\s*normalizedNativeLang\)/.test(backendSource)
  || !/results\[k\]\?\.failed/.test(backendSource)
) {
  issues.push('Backend class-lesson detail route must normalize nativeLang, translate native examples/breakdowns, reject failed translation fallbacks, and clean English meanings out of target examples for non-English learners.');
}

if (fs.existsSync(zhFoundationSeed)) {
  const zhFoundationSource = read(zhFoundationSeed);
  const forbiddenSeedFragments = [
    'mā 妈 (mother)',
    'má 麻 (hemp)',
    'mǎ 马 (horse)',
    'mà 骂 (scold)',
    'mā 妈 vs',
    '汉字 hànzì (Chinese characters)',
    "target: 'Pinyin'",
    "target: 'Hanzi (汉字)'",
  ];
  forbiddenSeedFragments.forEach((fragment) => {
    if (zhFoundationSource.includes(fragment)) {
      issues.push(`Chinese class seed embeds English meaning inside target example: "${fragment}". Put meanings in native/exampleNative fields instead.`);
    }
  });
}

const forbiddenLocaleValues = new Set([
  'Spoken replies on',
  'Spoken replies off',
  'Speak {{lang}}',
  '{{lang}} silent',
  '{{lang}} mic',
  'your native language',
  'Play {{label}} line',
  'The tutor could not reply this time. Please try again.',
  'Ready',
  'Tutor replied.',
  'Tutor had trouble replying.',
]);

const forbiddenKoreanClassLessonValues = new Map(Object.entries({
  breakdown: '고장',
  teachThis: '이것을 가르쳐라',
  practice: '관행',
  speak: '말하다',
  send: '보내다',
  replay: '다시 하다',
  tutorKicker: '가정 교사',
  targetMic: '대상 마이크',
  nativeMic: '네이티브 마이크',
  complete: '완벽한',
  unitSequence: '단위 순서',
}));

function auditClassLessonLocale(root, label) {
  if (!fs.existsSync(root)) return;
  fs.readdirSync(root, { withFileTypes: true }).forEach((entry) => {
    if (!entry.isDirectory() || entry.name === 'en') return;
    const file = path.join(root, entry.name, 'translation.json');
    if (!fs.existsSync(file)) return;
    const locale = JSON.parse(read(file));
    const classLesson = locale.classLesson || {};
    if (entry.name === 'ko') {
      for (const [key, badValue] of forbiddenKoreanClassLessonValues) {
        const value = key.split('.').reduce((acc, part) => acc?.[part], classLesson);
        if (value === badValue) {
          issues.push(`${label} ko classLesson.${key} has an unnatural or incorrect Korean label: "${badValue}".`);
        }
      }
    }
    [
      'spokenRepliesOn',
      'spokenRepliesOff',
      'speakLanguage',
      'languageSilent',
      'languageMic',
      'nativeLanguageFallback',
      'playLanguageLine',
      'tutorCouldNotReply',
      'status.ready',
      'status.tutorReplied',
      'status.tutorTrouble',
      'section.vocabulary',
      'section.grammar',
      'section.dialogue',
      'itemXOfY',
      'itemXOfYInActivity',
    ].forEach((key) => {
      const value = key.split('.').reduce((acc, part) => acc?.[part], classLesson);
      if (forbiddenLocaleValues.has(value)) {
        issues.push(`${label} ${entry.name} classLesson.${key} is still English: "${value}".`);
      }
      if (typeof value === 'string' && /\?\?/.test(value)) {
        issues.push(`${label} ${entry.name} classLesson.${key} contains mojibake question marks: "${value}".`);
      }
    });
  });
}

auditClassLessonLocale(webLocalesRoot, 'Web');
auditClassLessonLocale(mobileLocalesRoot, 'Mobile');

if (issues.length > 0) {
  console.error('Class language policy audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Class language policy audit passed.');
