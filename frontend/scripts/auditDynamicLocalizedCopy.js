/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');

const repoRoot = path.resolve(__dirname, '..', '..');

const checks = [
  {
    file: path.join(repoRoot, 'frontend', 'src', 'pages', 'HomePage.js'),
    required: ['questTaskLabel', 'home.quests.', 'home.weekdays.'],
    forbidden: [
      /<[^>]*>\s*\{quest\.task\}\s*<\/[^>]+>/,
      /gamification\.quests\.map[\s\S]{0,300}\{quest\.task\}/,
      /weekdayKeys\s*=\s*\[[\s\S]*['"`]M['"`]/,
    ],
  },
  {
    file: path.join(repoRoot, 'mobile', 'src', 'screens', 'home', 'HomeScreen.tsx'),
    required: ['questTaskLabel', 'home.quests.', 'home.weekdays.'],
    forbidden: [
      /<Text[^>]*>\s*\{quest\.task\}\s*<\/Text>/,
      /gamification\.quests\.map[\s\S]{0,300}\{quest\.task\}/,
      /weekdayKeys\s*=\s*\[[\s\S]*['"`]M['"`]/,
    ],
  },
  {
    file: path.join(repoRoot, 'frontend', 'src', 'pages', 'WritingPracticePage.js'),
    required: ['looksLikeRawEnglishForNative', 'writing.sources.', 'writing.modes.', 'writing.status.'],
    forbidden: [
      /<[^>]*>\s*\{modeConfig\.label\}\s*<\/[^>]+>/,
      /<[^>]*>\s*\{item\.label\}\s*<\/[^>]+>/,
      /setStatus\(['"`]Ready['"`]\)/,
    ],
  },
  {
    file: path.join(repoRoot, 'mobile', 'src', 'screens', 'writing', 'WritingPracticeScreen.tsx'),
    required: ['looksLikeRawEnglishForNative', 'writing.sources.', 'writing.modes.', 'writing.status.'],
    forbidden: [
      /<Text[^>]*>\s*\{item\.label\}\s*<\/Text>/,
      /setStatus\(['"`]Ready['"`]\)/,
    ],
  },
  {
    file: path.join(repoRoot, 'frontend', 'src', 'pages', 'ProfilePage.js'),
    required: ['getNativeLangCode()', 'getTargetLangCode()', 'languages.${code}'],
    forbidden: [
      /localStorage\.getItem\(['"`]nativeLanguage['"`]\).*<select/s,
      /<option[^>]*>\s*\{lang\.name\}\s*<\/option>/,
    ],
  },
  {
    file: path.join(repoRoot, 'mobile', 'src', 'screens', 'profile', 'ProfileScreen.tsx'),
    required: ['languageLabel', 'languages.${normalized}'],
    forbidden: [
      /<Text[^>]*>\s*\{lang\.name\}\s*<\/Text>/,
      /\blabel:\s*LANGUAGES\[[^\]]+\]\?\.name/,
    ],
  },
  {
    file: path.join(repoRoot, 'frontend', 'src', 'pages', 'ClassLessonsPage.js'),
    required: ['localizedLessonTitle', 'trackCopyFor', 'classList.tracks.', 'nativeScaffoldText'],
    forbidden: [
      /Korean Basics/,
      /Hangul/,
      /Workplace Korean/,
      /Level 1 - Foundation/,
    ],
  },
  {
    file: path.join(repoRoot, 'frontend', 'src', 'pages', 'ClassLessonPage.js'),
    required: ['classLesson.setupReady', 'nativeScaffoldText', 'defaultActivityPlan'],
    forbidden: [
      /const CLASS_SETUP_TEXT/,
      /LEGACY_CLASS_SETUP_TEXT/,
      /DEFAULT_ACTIVITY_PLAN/,
    ],
  },
  {
    file: path.join(repoRoot, 'mobile', 'src', 'navigation', 'MainTabs.tsx'),
    required: ['localizedLessonTitle', 'looksLikeRawEnglishForNative', 'nativeScaffoldText', 'classLesson.setupReady'],
    forbidden: [
      /Korean Basics/,
      /Hangul/,
      /Workplace Korean/,
      /Level 1 - Foundation/,
      /const CLASS_SETUP_TEXT/,
      /LEGACY_CLASS_SETUP_TEXT/,
      /GENERIC_ACTIVITY_PLAN/,
      /DEFAULT_ACTIVITY_PLAN/,
    ],
  },
  {
    file: path.join(repoRoot, 'frontend', 'src', 'pages', 'ConversationPage.js'),
    required: ['CONVERSATION_COPY', 'scenarioCopyFor', 'supportLabelFor', 'normalizeLanguageCode(localStorage.getItem'],
    forbidden: [
      /\{scenario\.title\}/,
      /\{scenario\.goal\}/,
      /\{scenario\.starters\}/,
      /\{scenario\.followUps\}/,
      /\{item\.title\}<\/option>/,
      /SUPPORT_LEVELS\.map\(\(item\)[\s\S]{0,120}\{item\.label\}/,
    ],
  },
  {
    file: path.join(repoRoot, 'mobile', 'src', 'screens', 'ai', 'ConversationScreen.tsx'),
    required: ['scenarioCopyMap', 'scenarioCopyFor', 'supportLabelFor', 'normalizeLanguageCode', 'conversation.status.'],
    forbidden: [
      /\{scenario\.title\}/,
      /\{scenario\.goal\}/,
      /\{scenario\.shortLabel\}/,
      /\{scenario\.starters\}/,
      /\{scenario\.followUps\}/,
      /title=\{item\.title\}/,
      /supportLevels\.map\(\(\{\s*value,\s*label\s*\}\)[\s\S]{0,80}label/,
    ],
  },
  {
    file: path.join(repoRoot, 'backend', 'routes', 'lessons.js'),
    required: ['normalizedNativeLang', 'results[k]?.failed', 'lang: normalizedNativeLang'],
    forbidden: [
      /batchTranslateRaw\([^,\n]+,\s*['"`]en['"`],\s*nativeLang\)/,
      /translationNativeLang\s*=\s*contentKind === ['"`]classLesson['"`]\s*\?\s*\(nativeLang/,
      /^\s*cleanTargetExamplesForNativeDisplay\(lessonObj,\s*targetLang,\s*nativeLang/m,
      /^\s*enrichLessonWithPronunciation\(lessonObj,\s*targetLang,\s*nativeLang/m,
    ],
  },
  {
    file: path.join(repoRoot, 'backend', 'routes', 'flashcards.js'),
    required: ['results[k]?.failed'],
    forbidden: [
      /const translated = results\[k\]\?\.text/,
    ],
  },
  {
    file: path.join(repoRoot, 'backend', 'utils', 'translationService.js'),
    required: ['failed: true', 'titleResults[0]?.failed', 'nativeResults[k]?.failed'],
    forbidden: [
      /return texts\.map\(t => \(\{ text: t, pronunciation: '' \}\)\)/,
      /const translated = nativeResults\[k\]\?\.text \|\| targetTexts\[k\]/,
    ],
  },
];

const issues = [];

for (const check of checks) {
  if (!fs.existsSync(check.file)) {
    issues.push(`${path.relative(repoRoot, check.file)} is missing.`);
    continue;
  }
  const source = fs.readFileSync(check.file, 'utf8');
  for (const token of check.required) {
    if (!source.includes(token)) {
      issues.push(`${path.relative(repoRoot, check.file)} must use localized dynamic copy helper "${token}".`);
    }
  }
  for (const pattern of check.forbidden) {
    if (pattern.test(source)) {
      issues.push(`${path.relative(repoRoot, check.file)} renders raw scenario/support constants instead of localized copy: ${pattern}`);
    }
  }
}

if (issues.length > 0) {
  console.error('Dynamic localized copy audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Dynamic localized copy audit passed.');
