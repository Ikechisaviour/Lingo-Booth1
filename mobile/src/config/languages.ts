export interface Language {
  name: string;
  nativeName: string;
  flag: string;
  ttsLocale: string;
  hello: string;
  showRomanization: boolean;
}

const LANGUAGES: Record<string, Language> = {
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

export const RTL_LANGUAGES = ['ar', 'he'];

export const getLangName = (code: string): string => LANGUAGES[code]?.name || code;
export const getLangNativeName = (code: string): string => LANGUAGES[code]?.nativeName || code;
export const getLangFlag = (code: string): string => LANGUAGES[code]?.flag || '🌍';
export const getLangTtsLocale = (code: string): string => LANGUAGES[code]?.ttsLocale || code;
export const getLangHello = (code: string): string => LANGUAGES[code]?.hello || '';
export const isRTL = (code: string): boolean => RTL_LANGUAGES.includes(code);
export const langHasRomanization = (code: string): boolean =>
  LANGUAGES[code]?.showRomanization === true;

// Map language code to the field name on a flashcard/card object
export const getLangField = (code: string): string => {
  if (code === 'ko') return 'korean';
  if (code === 'en') return 'english';
  return code;
};

export default LANGUAGES;
