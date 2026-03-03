const LANGUAGES = {
  en: { name: 'English',    nativeName: 'English',    flag: '🇬🇧', ttsLocale: 'en-US', hello: 'Hello' },
  ko: { name: 'Korean',     nativeName: '한국어',     flag: '🇰🇷', ttsLocale: 'ko-KR', hello: '안녕하세요' },
  es: { name: 'Spanish',    nativeName: 'Español',    flag: '🇪🇸', ttsLocale: 'es-ES', hello: 'Hola' },
  fr: { name: 'French',     nativeName: 'Français',   flag: '🇫🇷', ttsLocale: 'fr-FR', hello: 'Bonjour' },
  de: { name: 'German',     nativeName: 'Deutsch',    flag: '🇩🇪', ttsLocale: 'de-DE', hello: 'Hallo' },
  zh: { name: 'Chinese',    nativeName: '中文',        flag: '🇨🇳', ttsLocale: 'zh-CN', hello: '你好' },
  ja: { name: 'Japanese',   nativeName: '日本語',      flag: '🇯🇵', ttsLocale: 'ja-JP', hello: 'こんにちは' },
  hi: { name: 'Hindi',      nativeName: 'हिन्दी',      flag: '🇮🇳', ttsLocale: 'hi-IN', hello: 'नमस्ते' },
  ar: { name: 'Arabic',     nativeName: 'العربية',    flag: '🇸🇦', ttsLocale: 'ar-SA', hello: 'مرحبا' },
  he: { name: 'Hebrew',     nativeName: 'עברית',      flag: '🇮🇱', ttsLocale: 'he-IL', hello: 'שלום' },
  pt: { name: 'Portuguese', nativeName: 'Português',  flag: '🇧🇷', ttsLocale: 'pt-BR', hello: 'Olá' },
  it: { name: 'Italian',    nativeName: 'Italiano',   flag: '🇮🇹', ttsLocale: 'it-IT', hello: 'Ciao' },
  nl: { name: 'Dutch',      nativeName: 'Nederlands', flag: '🇳🇱', ttsLocale: 'nl-NL', hello: 'Hallo' },
  ru: { name: 'Russian',    nativeName: 'Русский',    flag: '🇷🇺', ttsLocale: 'ru-RU', hello: 'Привет' },
  id: { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', ttsLocale: 'id-ID', hello: 'Halo' },
  ms: { name: 'Malay',      nativeName: 'Bahasa Melayu',    flag: '🇲🇾', ttsLocale: 'ms-MY', hello: 'Halo' },
  fil:{ name: 'Filipino',   nativeName: 'Filipino',   flag: '🇵🇭', ttsLocale: 'fil-PH', hello: 'Kamusta' },
  tr: { name: 'Turkish',    nativeName: 'Türkçe',     flag: '🇹🇷', ttsLocale: 'tr-TR', hello: 'Merhaba' },
  bn: { name: 'Bengali',    nativeName: 'বাংলা',       flag: '🇧🇩', ttsLocale: 'bn-BD', hello: 'হ্যালো' },
  ta: { name: 'Tamil',      nativeName: 'தமிழ்',       flag: '🇱🇰', ttsLocale: 'ta-IN', hello: 'வணக்கம்' },
};

export const getTargetLangCode = () => localStorage.getItem('targetLanguage') || 'ko';
export const getNativeLangCode = () => localStorage.getItem('nativeLanguage') || 'en';

export const getTargetLangName = () => {
  const code = getTargetLangCode();
  return LANGUAGES[code]?.name || 'Korean';
};

export const getNativeLangName = () => {
  const code = getNativeLangCode();
  return LANGUAGES[code]?.name || 'English';
};

export const getTargetTtsLocale = () => {
  const code = getTargetLangCode();
  return LANGUAGES[code]?.ttsLocale || 'ko-KR';
};

export const getTargetFlag = () => {
  const code = getTargetLangCode();
  return LANGUAGES[code]?.flag || '🇰🇷';
};

export const getNativeFlag = () => {
  const code = getNativeLangCode();
  return LANGUAGES[code]?.flag || '🇬🇧';
};

export const getTargetHello = () => {
  const code = getTargetLangCode();
  return LANGUAGES[code]?.hello || '안녕하세요';
};

export default LANGUAGES;
