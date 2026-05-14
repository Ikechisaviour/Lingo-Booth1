export const SUPPORTED_LANGUAGE_CODES = [
  'en',
  'ko',
  'es',
  'fr',
  'de',
  'zh',
  'ja',
  'hi',
  'ar',
  'he',
  'pt',
  'it',
  'nl',
  'ru',
  'id',
  'ms',
  'fil',
  'tr',
  'bn',
  'ta',
];

const SUPPORTED_LANGUAGE_SET = new Set(SUPPORTED_LANGUAGE_CODES);

const LANGUAGE_ALIASES = {
  kr: 'ko',
  kor: 'ko',
  cn: 'zh',
  chn: 'zh',
  jp: 'ja',
  jpn: 'ja',
  iw: 'he',
  in: 'id',
  tl: 'fil',
};

export const LANGUAGE_PAIR_TEST_CASES = [
  { nativeLanguage: 'en', targetLanguage: 'ko', reason: 'English user learning Korean default' },
  { nativeLanguage: 'ko', targetLanguage: 'en', reason: 'Non-English user learning English default' },
  { nativeLanguage: 'es', targetLanguage: 'it', reason: 'Neither language is English or Korean' },
  { nativeLanguage: 'hi', targetLanguage: 'zh', reason: 'Learner-script pronunciation and non-Latin target' },
  { nativeLanguage: 'ar', targetLanguage: 'en', reason: 'RTL native language with English target' },
];

export function normalizeLanguageCode(value) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const lower = raw.toLowerCase();
  if (LANGUAGE_ALIASES[lower]) return LANGUAGE_ALIASES[lower];
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('pt')) return 'pt';
  const base = lower.split(/[-_]/)[0];
  return LANGUAGE_ALIASES[base] || base;
}

export function isSupportedLanguage(value) {
  return SUPPORTED_LANGUAGE_SET.has(normalizeLanguageCode(value));
}

export function defaultTargetForNative(nativeLanguage) {
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  return native === 'en' ? 'ko' : 'en';
}

export function normalizeLanguagePair(pair = {}) {
  return {
    nativeLanguage: normalizeLanguageCode(pair.nativeLanguage),
    targetLanguage: normalizeLanguageCode(pair.targetLanguage),
  };
}

export function isValidLanguagePair(pair = {}) {
  const { nativeLanguage, targetLanguage } = normalizeLanguagePair(pair);
  return (
    SUPPORTED_LANGUAGE_SET.has(nativeLanguage)
    && SUPPORTED_LANGUAGE_SET.has(targetLanguage)
    && nativeLanguage !== targetLanguage
  );
}

export function languagePairKey(pair = {}) {
  const { nativeLanguage, targetLanguage } = normalizeLanguagePair(pair);
  return `${nativeLanguage || 'unknown'}-${targetLanguage || 'unknown'}`;
}

export function didLanguagePairChange(previousPair = {}, nextPair = {}) {
  return languagePairKey(previousPair) !== languagePairKey(nextPair);
}

export function shouldClearPracticeHistory(previousPair = {}, nextPair = {}) {
  return didLanguagePairChange(previousPair, nextPair);
}

export function responseLanguageOrder(pair = {}, requestedOrder = null) {
  const { nativeLanguage, targetLanguage } = normalizeLanguagePair(pair);
  if (Array.isArray(requestedOrder) && requestedOrder.length > 0) {
    return requestedOrder.map(normalizeLanguageCode).filter(Boolean);
  }
  return [targetLanguage, nativeLanguage].filter(Boolean);
}

export function isRtlLanguage(language) {
  return ['ar', 'he'].includes(normalizeLanguageCode(language));
}

export function strokeGuideFamilyForLanguage(language) {
  const code = normalizeLanguageCode(language);
  if (code === 'ko') return 'hangul';
  if (['zh', 'ja'].includes(code)) return 'cjk';
  return 'general';
}

export function languageUsesLatinScript(language) {
  return ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'id', 'ms', 'fil', 'tr'].includes(normalizeLanguageCode(language));
}

export function looksLikeRawEnglishForNative(text, nativeLanguage) {
  const value = String(text || '').trim();
  if (!value || languageUsesLatinScript(nativeLanguage)) return false;
  const latinWords = value.match(/[A-Za-z]{3,}/g) || [];
  if (latinWords.length === 0) return false;
  const nativeScriptChars = value.match(/[\uAC00-\uD7AF\u3400-\u9FFF\u3040-\u30FF\u0600-\u06FF\u0900-\u097F\u0590-\u05FF\u0400-\u04FF\u0980-\u09FF\u0B80-\u0BFF]/g) || [];
  return nativeScriptChars.length === 0 && latinWords.join('').length >= 8;
}
