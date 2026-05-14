import {
  SUPPORTED_LANGUAGE_CODES,
  defaultTargetForNative,
  isRtlLanguage,
  normalizeLanguageCode,
} from './languagePairPolicy';

const SUPPORTED_PUBLIC_LANGUAGES = SUPPORTED_LANGUAGE_CODES;
const SUPPORTED_LANGUAGE_SET = new Set(SUPPORTED_PUBLIC_LANGUAGES);

export function normalizePublicLanguage(value) {
  return normalizeLanguageCode(value);
}

export function isSupportedPublicLanguage(value) {
  return SUPPORTED_LANGUAGE_SET.has(normalizePublicLanguage(value));
}

function safeLocalStorageGet(key) {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function safeLocalStorageSet(key, value) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore storage failures in private or restricted browser contexts.
  }
}

function browserLanguage() {
  if (typeof navigator === 'undefined') return '';
  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const locale of languages) {
    const code = normalizePublicLanguage(locale);
    if (SUPPORTED_LANGUAGE_SET.has(code)) return code;
  }
  return '';
}

export function getPreferredPublicLanguage() {
  const landingLanguage = normalizePublicLanguage(safeLocalStorageGet('landingLanguage'));
  if (SUPPORTED_LANGUAGE_SET.has(landingLanguage)) return landingLanguage;

  const nativeLanguage = normalizePublicLanguage(safeLocalStorageGet('nativeLanguage'));
  if (SUPPORTED_LANGUAGE_SET.has(nativeLanguage)) return nativeLanguage;

  return browserLanguage() || 'en';
}

export function getInitialI18nLanguage() {
  const nativeLanguage = normalizePublicLanguage(safeLocalStorageGet('nativeLanguage'));
  const hasAppSession = !!safeLocalStorageGet('token') || safeLocalStorageGet('guestMode') === 'true';
  if (hasAppSession && SUPPORTED_LANGUAGE_SET.has(nativeLanguage)) return nativeLanguage;
  return getPreferredPublicLanguage();
}

export function setLandingLanguagePreference(language) {
  const code = normalizePublicLanguage(language);
  if (!SUPPORTED_LANGUAGE_SET.has(code)) return '';
  safeLocalStorageSet('landingLanguage', code);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('publicLanguageChanged', { detail: { language: code } }));
  }
  return code;
}

export function googleLocaleForPublicLanguage(language) {
  const code = normalizePublicLanguage(language) || 'en';
  if (code === 'zh') return 'zh-CN';
  return code;
}

export function targetLanguageForPublicNative(nativeLanguage) {
  return defaultTargetForNative(nativeLanguage);
}

export function getPublicLanguagePair() {
  const nativeLanguage = getPreferredPublicLanguage();
  return {
    nativeLanguage,
    targetLanguage: targetLanguageForPublicNative(nativeLanguage),
  };
}

export function applyPublicLanguage(i18n) {
  const language = getPreferredPublicLanguage();
  if (i18n?.language !== language) {
    i18n?.changeLanguage(language);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = language;
    document.documentElement.dir = isRtlLanguage(language) ? 'rtl' : 'ltr';
  }
  return language;
}

export { SUPPORTED_PUBLIC_LANGUAGES };
