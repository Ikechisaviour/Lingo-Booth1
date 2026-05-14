export const supportedLanguageCodes = [
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

const aliases: Record<string, string> = {
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

export function normalizeLanguageCode(value?: string | null) {
  const raw = String(value || '').trim();
  if (!raw) return '';
  const lower = raw.toLowerCase();
  if (aliases[lower]) return aliases[lower];
  if (lower.startsWith('zh')) return 'zh';
  if (lower.startsWith('pt')) return 'pt';
  const base = lower.split(/[-_]/)[0];
  return aliases[base] || base;
}

export function languageUsesLatinScript(language?: string | null) {
  return ['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'id', 'ms', 'fil', 'tr'].includes(normalizeLanguageCode(language));
}

export function looksLikeRawEnglishForNative(text: unknown, nativeLanguage?: string | null) {
  const value = String(text || '').trim();
  if (!value || languageUsesLatinScript(nativeLanguage)) return false;
  const latinWords = value.match(/[A-Za-z]{3,}/g) || [];
  if (latinWords.length === 0) return false;
  const nativeScriptChars = value.match(/[\uAC00-\uD7AF\u3400-\u9FFF\u3040-\u30FF\u0600-\u06FF\u0900-\u097F\u0590-\u05FF\u0400-\u04FF\u0980-\u09FF\u0B80-\u0BFF]/g) || [];
  return nativeScriptChars.length === 0 && latinWords.join('').length >= 8;
}
