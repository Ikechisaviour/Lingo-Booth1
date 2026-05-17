import LANGUAGES from '../config/languages';
import { normalizeLanguageCode } from './languagePairPolicy';

const PROVIDER_WORDS = /\b(Microsoft|Online|Natural)\b/gi;
const NATURAL_PARENS = /\(\s*Natural\s*\)/gi;
const LOCALE_PREFIX = /^[a-z]{2,3}[-_][A-Za-z]{2,4}[-_]/;

export function voiceId(voice = {}) {
  return voice.name || voice.ShortName || voice.Name || String(voice || '');
}

function rawVoiceName(voice = {}) {
  return voice.displayName
    || voice.FriendlyName
    || voice.DisplayName
    || voice.ShortName
    || voice.Name
    || voice.name
    || '';
}

export function voiceLocale(voice = {}) {
  return voice.lang || voice.Locale || voice.locale || '';
}

function voiceGenderKey(voice = {}) {
  const value = String(voice.gender || voice.Gender || '').trim().toLowerCase();
  if (value.startsWith('female')) return 'female';
  if (value.startsWith('male')) return 'male';
  return '';
}

function languageCodeForVoice(voice = {}, fallbackCode = '') {
  const locale = voiceLocale(voice);
  const fromLocale = normalizeLanguageCode(String(locale).split(/[-_]/)[0]);
  return normalizeLanguageCode(fallbackCode) || fromLocale || '';
}

function regionCodeForLocale(locale = '') {
  const parts = String(locale || '').replace(/_/g, '-').split('-').filter(Boolean);
  for (const part of parts.slice(1)) {
    const candidate = part.toUpperCase();
    if (/^[A-Z]{2}$/.test(candidate) || /^\d{3}$/.test(candidate)) return candidate;
  }
  return '';
}

function regionFallbackFromName(value = '') {
  const matches = [...String(value || '').matchAll(/\(([^)]+)\)/g)]
    .map((match) => match[1].trim())
    .filter((text) => text && !/^natural$/i.test(text));
  return matches[matches.length - 1] || '';
}

function localizedRegionName(locale = '', rawName = '', uiLanguage = '') {
  const regionCode = regionCodeForLocale(locale);
  if (regionCode && typeof Intl !== 'undefined' && Intl.DisplayNames) {
    try {
      const displayNames = new Intl.DisplayNames(
        [uiLanguage, normalizeLanguageCode(uiLanguage), 'en'].filter(Boolean),
        { type: 'region' }
      );
      return displayNames.of(regionCode) || regionCode;
    } catch (_) {
      return regionCode;
    }
  }
  return regionFallbackFromName(rawName);
}

function cleanProviderVoiceName(value = '', locale = '') {
  const original = String(value || '').trim();
  const base = original || voiceNameFromLocaleName(locale);
  return base
    .replace(NATURAL_PARENS, '')
    .replace(PROVIDER_WORDS, '')
    .replace(/\s+-\s+.*$/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(LOCALE_PREFIX, '')
    .replace(/\bNeural\b/gi, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\s+/g, ' ')
    .trim();
}

function voiceNameFromLocaleName(value = '') {
  return String(value || '')
    .replace(LOCALE_PREFIX, '')
    .replace(/\bNeural\b/gi, '')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
}

function genderLabelFor(genderKey, t) {
  if (!genderKey) return '';
  const fallback = genderKey === 'female' ? 'female' : 'male';
  return t(`voicePicker.gender.${genderKey}`, fallback);
}

function localizedLanguageName(code, t) {
  const normalized = normalizeLanguageCode(code);
  const language = LANGUAGES[normalized];
  if (!language) return normalized || code || '';
  return t(`languages.${normalized}`, language.name);
}

export function formatVoiceDisplay(voice = {}, options = {}) {
  const {
    languageCode = '',
    number = 1,
    t = (key, fallbackOrOptions) => (
      typeof fallbackOrOptions === 'string'
        ? fallbackOrOptions
        : fallbackOrOptions?.defaultValue || key
    ),
    uiLanguage = 'en',
  } = options;

  const locale = voiceLocale(voice);
  const rawName = rawVoiceName(voice);
  const resolvedLanguageCode = languageCodeForVoice(voice, languageCode);
  const language = localizedLanguageName(resolvedLanguageCode, t);
  const genderKey = voiceGenderKey(voice);
  const gender = genderLabelFor(genderKey, t);
  const regionName = localizedRegionName(locale, rawName, uiLanguage);
  const region = regionName
    ? t('voicePicker.voiceRegionSuffix', { region: regionName, defaultValue: ' · {{region}}' })
    : '';
  const primary = gender
    ? t('voicePicker.friendlyVoiceLabelGendered', {
      language,
      gender,
      number,
      region,
      defaultValue: '{{language}} {{gender}} voice {{number}}{{region}}',
    })
    : t('voicePicker.friendlyVoiceLabelNeutral', {
      language,
      number,
      region,
      defaultValue: '{{language}} voice {{number}}{{region}}',
    });
  const cleanName = cleanProviderVoiceName(rawName, voiceId(voice));
  const secondary = [cleanName, locale].filter(Boolean).join(' · ');

  return {
    primary,
    secondary,
    cleanName,
    locale,
    language,
    gender,
    region: regionName,
  };
}

export function formatVoiceOptions(voices = [], options = {}) {
  const counters = {};
  return (voices || []).map((voice) => {
    const code = languageCodeForVoice(voice, options.languageCode);
    const genderKey = voiceGenderKey(voice) || 'neutral';
    const key = `${code || 'voice'}:${genderKey}`;
    counters[key] = (counters[key] || 0) + 1;
    return {
      voice,
      name: voiceId(voice),
      display: formatVoiceDisplay(voice, {
        ...options,
        number: counters[key],
      }),
    };
  });
}
