const fs = require('fs');
const path = require('path');

const policyFile = path.resolve(__dirname, '..', 'src', 'utils', 'languagePairPolicy.js');
const content = fs.readFileSync(policyFile, 'utf8');

const requiredPairs = [
  "nativeLanguage: 'en', targetLanguage: 'ko'",
  "nativeLanguage: 'ko', targetLanguage: 'en'",
  "nativeLanguage: 'es', targetLanguage: 'it'",
  "nativeLanguage: 'hi', targetLanguage: 'zh'",
  "nativeLanguage: 'ar', targetLanguage: 'en'",
];

const requiredExports = [
  'SUPPORTED_LANGUAGE_CODES',
  'LANGUAGE_PAIR_TEST_CASES',
  'defaultTargetForNative',
  'isValidLanguagePair',
  'shouldClearPracticeHistory',
  'responseLanguageOrder',
  'isRtlLanguage',
];

const issues = [];

for (const pair of requiredPairs) {
  if (!content.includes(pair)) {
    issues.push(`Missing required language-pair test case: ${pair}`);
  }
}

for (const exportName of requiredExports) {
  if (!new RegExp(`export\\s+(?:const|function)\\s+${exportName}\\b`).test(content)) {
    issues.push(`Missing required language-pair policy export: ${exportName}`);
  }
}

if (!/return\s+\[targetLanguage,\s*nativeLanguage\]/.test(content)) {
  issues.push('Default responseLanguageOrder must return target language before native language.');
}

if (issues.length > 0) {
  console.error('Language-pair policy audit failed:');
  issues.forEach((issue) => console.error(`- ${issue}`));
  process.exit(1);
}

console.log('Language-pair policy audit passed.');
