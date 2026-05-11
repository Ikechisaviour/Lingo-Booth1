const {
  buildPronunciationEntries,
  localNativeScriptGuide,
  summarizePronunciationDisplay,
} = require('../utils/pronunciationService');

describe('pronunciation service', () => {
  test('builds Hindi-script learner guide for Chinese pinyin', async () => {
    const [entry] = await buildPronunciationEntries([{
      targetText: '你好',
      normalizedTargetText: '你好',
      seededOfficial: 'nǐ hǎo',
    }], 'zh', 'hi', { allowExternal: false });

    expect(entry.officialPronunciation).toBe('nǐ hǎo');
    expect(entry.learnerPronunciation).toBe('नी हाओ');
    expect(entry.pronunciationConfidence).toBe('approximate');
    expect(entry.officialPronunciationSource).toBe('seeded');
    expect(entry.learnerPronunciationSource).toBe('fallback');
  });

  test('keeps pinyin as the visible learner guide for English native speakers', async () => {
    const [entry] = await buildPronunciationEntries([{
      targetText: '你好',
      normalizedTargetText: '你好',
      seededOfficial: 'nǐ hǎo',
    }], 'zh', 'en', { allowExternal: false });

    const guide = summarizePronunciationDisplay(entry, '你好');

    expect(entry.learnerPronunciation).toBe('nǐ hǎo');
    expect(entry.pronunciationConfidence).toBe('strong');
    expect(guide.showLearner).toBe(true);
    expect(guide.showOfficial).toBe(false);
  });

  test('separates Korean official pronunciation from Arabic learner guide', async () => {
    const [entry] = await buildPronunciationEntries([{
      targetText: '안녕하세요',
      normalizedTargetText: '안녕하세요',
      seededOfficial: 'annyeong ha se yo',
    }], 'ko', 'ar', { allowExternal: false });

    expect(entry.officialPronunciation).toBe('annyeong ha se yo');
    expect(entry.learnerPronunciation).toBe('أنيونغ ها سي يو');
    expect(entry.pronunciationConfidence).toBe('approximate');
  });

  test('can create native-script guidance for Latin targets', async () => {
    const [entry] = await buildPronunciationEntries([{
      targetText: 'hello',
      normalizedTargetText: 'hello',
      seededOfficial: '',
    }], 'en', 'ko', { allowExternal: false });

    expect(entry.officialPronunciation).toBe('hello');
    expect(entry.learnerPronunciation).toBe('헬로');
    expect(entry.officialPronunciationSource).toBe('spelling');
  });

  test('local fallback covers representative pinyin tokens', () => {
    expect(localNativeScriptGuide('nǐ hǎo', 'hi')).toBe('नी हाओ');
    expect(localNativeScriptGuide('nǐ hǎo', 'ar')).toBe('ني هاو');
  });
});
