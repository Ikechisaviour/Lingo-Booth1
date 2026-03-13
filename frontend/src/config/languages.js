const LANGUAGES = {
  en:  { name: 'English',    nativeName: 'English',          flag: '🇬🇧', ttsLocale: 'en-US',  hello: 'Hello',       showRomanization: false },
  ko:  { name: 'Korean',     nativeName: '한국어',            flag: '🇰🇷', ttsLocale: 'ko-KR',  hello: '안녕하세요',   showRomanization: true  },
  es:  { name: 'Spanish',    nativeName: 'Español',          flag: '🇪🇸', ttsLocale: 'es-ES',  hello: 'Hola',        showRomanization: false },
  fr:  { name: 'French',     nativeName: 'Français',         flag: '🇫🇷', ttsLocale: 'fr-FR',  hello: 'Bonjour',     showRomanization: false },
  de:  { name: 'German',     nativeName: 'Deutsch',          flag: '🇩🇪', ttsLocale: 'de-DE',  hello: 'Hallo',       showRomanization: false },
  zh:  { name: 'Chinese',    nativeName: '中文',              flag: '🇨🇳', ttsLocale: 'zh-CN',  hello: '你好',         showRomanization: true  },
  ja:  { name: 'Japanese',   nativeName: '日本語',            flag: '🇯🇵', ttsLocale: 'ja-JP',  hello: 'こんにちは',   showRomanization: true  },
  hi:  { name: 'Hindi',      nativeName: 'हिन्दी',            flag: '🇮🇳', ttsLocale: 'hi-IN',  hello: 'नमस्ते',      showRomanization: true  },
  ar:  { name: 'Arabic',     nativeName: 'العربية',          flag: '🇸🇦', ttsLocale: 'ar-SA',  hello: 'مرحبا',       showRomanization: true  },
  he:  { name: 'Hebrew',     nativeName: 'עברית',            flag: '🇮🇱', ttsLocale: 'he-IL',  hello: 'שלום',        showRomanization: true  },
  pt:  { name: 'Portuguese', nativeName: 'Português',        flag: '🇧🇷', ttsLocale: 'pt-BR',  hello: 'Olá',         showRomanization: false },
  it:  { name: 'Italian',    nativeName: 'Italiano',         flag: '🇮🇹', ttsLocale: 'it-IT',  hello: 'Ciao',        showRomanization: false },
  nl:  { name: 'Dutch',      nativeName: 'Nederlands',       flag: '🇳🇱', ttsLocale: 'nl-NL',  hello: 'Hallo',       showRomanization: false },
  ru:  { name: 'Russian',    nativeName: 'Русский',          flag: '🇷🇺', ttsLocale: 'ru-RU',  hello: 'Привет',      showRomanization: true  },
  id:  { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', ttsLocale: 'id-ID',  hello: 'Halo',        showRomanization: false },
  ms:  { name: 'Malay',      nativeName: 'Bahasa Melayu',    flag: '🇲🇾', ttsLocale: 'ms-MY',  hello: 'Halo',        showRomanization: false },
  fil: { name: 'Filipino',   nativeName: 'Filipino',         flag: '🇵🇭', ttsLocale: 'fil-PH', hello: 'Kamusta',     showRomanization: false },
  tr:  { name: 'Turkish',    nativeName: 'Türkçe',           flag: '🇹🇷', ttsLocale: 'tr-TR',  hello: 'Merhaba',     showRomanization: false },
  bn:  { name: 'Bengali',    nativeName: 'বাংলা',            flag: '🇧🇩', ttsLocale: 'bn-BD',  hello: 'হ্যালো',      showRomanization: true  },
  ta:  { name: 'Tamil',      nativeName: 'தமிழ்',            flag: '🇱🇰', ttsLocale: 'ta-IN',  hello: 'வணக்கம்',     showRomanization: true  },
};

// ── Language code getters ────────────────────────────────────────────────────
export const getTargetLangCode = () => localStorage.getItem('targetLanguage') || 'ko';
export const getNativeLangCode = () => localStorage.getItem('nativeLanguage') || 'en';

// ── Display helpers ──────────────────────────────────────────────────────────
export const getTargetLangName = () => LANGUAGES[getTargetLangCode()]?.name || getTargetLangCode();
export const getNativeLangName = () => LANGUAGES[getNativeLangCode()]?.name || getNativeLangCode();

export const getTargetTtsLocale = () => LANGUAGES[getTargetLangCode()]?.ttsLocale || getTargetLangCode();
export const getNativeTtsLocale = () => LANGUAGES[getNativeLangCode()]?.ttsLocale || getNativeLangCode();

export const getTargetFlag = () => LANGUAGES[getTargetLangCode()]?.flag || '🌍';
export const getNativeFlag = () => LANGUAGES[getNativeLangCode()]?.flag || '🌍';

export const getTargetHello = () => LANGUAGES[getTargetLangCode()]?.hello || '';

// ── Romanization ─────────────────────────────────────────────────────────────
// Returns true if the target language uses a non-Latin script and benefits
// from a pronunciation guide (romanization / transliteration).
export const targetLangHasRomanization = () =>
  LANGUAGES[getTargetLangCode()]?.showRomanization === true;

// ── Field mapping ─────────────────────────────────────────────────────────────
// The data schema stores the two core text fields as 'korean' and 'english'
// for legacy reasons. Any other language code maps to its own code as field name.
export const getLangField = (code) => {
  if (code === 'ko') return 'korean';
  if (code === 'en') return 'english';
  return code;
};

export const getTargetField = () => getLangField(getTargetLangCode());
export const getNativeField  = () => getLangField(getNativeLangCode());

export default LANGUAGES;
