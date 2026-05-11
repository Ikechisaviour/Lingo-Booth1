/**
 * Offline smoke audit for pronunciation generation/display rules.
 *
 * This does not call external services. It verifies that the local fallback can
 * still produce useful learner-script guides for representative difficult pairs.
 */

const {
  buildPronunciationEntries,
  summarizePronunciationDisplay,
} = require('../utils/pronunciationService');

const cases = [
  { targetLang: 'zh', nativeLang: 'hi', targetText: '你好', seededOfficial: 'nǐ hǎo', expectedLearner: 'नी हाओ' },
  { targetLang: 'zh', nativeLang: 'en', targetText: '你好', seededOfficial: 'nǐ hǎo', expectedLearner: 'nǐ hǎo' },
  { targetLang: 'ko', nativeLang: 'ar', targetText: '안녕하세요', seededOfficial: 'annyeong ha se yo' },
  { targetLang: 'en', nativeLang: 'ko', targetText: 'hello', seededOfficial: '' },
  { targetLang: 'ko', nativeLang: 'en', targetText: '안녕하세요', seededOfficial: 'annyeonghaseyo' },
];

(async () => {
  const issues = [];

  for (const item of cases) {
    const [entry] = await buildPronunciationEntries([{
      targetText: item.targetText,
      normalizedTargetText: item.targetText.toLowerCase(),
      seededOfficial: item.seededOfficial,
    }], item.targetLang, item.nativeLang, { allowExternal: false });

    const guide = summarizePronunciationDisplay(entry, item.targetText);

    if (!entry.officialPronunciation && item.targetLang !== 'en') {
      issues.push({ ...item, issue: 'missing official pronunciation', entry });
    }
    if (!entry.learnerPronunciation) {
      issues.push({ ...item, issue: 'missing learner pronunciation', entry });
    }
    if (item.expectedLearner && entry.learnerPronunciation !== item.expectedLearner) {
      issues.push({ ...item, issue: 'unexpected learner guide', got: entry.learnerPronunciation });
    }
    if (!guide.showLearner && item.targetText !== entry.learnerPronunciation) {
      issues.push({ ...item, issue: 'display guide hidden unexpectedly', guide });
    }
  }

  if (issues.length) {
    console.error(`Found ${issues.length} pronunciation audit issue(s).`);
    issues.forEach(issue => console.error(JSON.stringify(issue)));
    process.exit(1);
  }

  console.log('Pronunciation audit passed.');
})();
