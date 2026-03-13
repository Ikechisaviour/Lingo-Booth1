export interface Language {
  name: string;
  nativeName: string;
  flag: string;
  ttsLocale: string;
  hello: string;
  showRomanization: boolean;
  latinScript: boolean;
}

const LANGUAGES: Record<string, Language> = {
  en:  { name: 'English',    nativeName: 'English',          flag: '🇬🇧', ttsLocale: 'en-US',  hello: 'Hello',       showRomanization: false, latinScript: true  },
  ko:  { name: 'Korean',     nativeName: '한국어',            flag: '🇰🇷', ttsLocale: 'ko-KR',  hello: '안녕하세요',   showRomanization: true,  latinScript: false },
  es:  { name: 'Spanish',    nativeName: 'Español',          flag: '🇪🇸', ttsLocale: 'es-ES',  hello: 'Hola',        showRomanization: false, latinScript: true  },
  fr:  { name: 'French',     nativeName: 'Français',         flag: '🇫🇷', ttsLocale: 'fr-FR',  hello: 'Bonjour',     showRomanization: false, latinScript: true  },
  de:  { name: 'German',     nativeName: 'Deutsch',          flag: '🇩🇪', ttsLocale: 'de-DE',  hello: 'Hallo',       showRomanization: false, latinScript: true  },
  zh:  { name: 'Chinese',    nativeName: '中文',              flag: '🇨🇳', ttsLocale: 'zh-CN',  hello: '你好',         showRomanization: true,  latinScript: false },
  ja:  { name: 'Japanese',   nativeName: '日本語',            flag: '🇯🇵', ttsLocale: 'ja-JP',  hello: 'こんにちは',   showRomanization: true,  latinScript: false },
  hi:  { name: 'Hindi',      nativeName: 'हिन्दी',            flag: '🇮🇳', ttsLocale: 'hi-IN',  hello: 'नमस्ते',      showRomanization: true,  latinScript: false },
  ar:  { name: 'Arabic',     nativeName: 'العربية',          flag: '🇸🇦', ttsLocale: 'ar-SA',  hello: 'مرحبا',       showRomanization: true,  latinScript: false },
  he:  { name: 'Hebrew',     nativeName: 'עברית',            flag: '🇮🇱', ttsLocale: 'he-IL',  hello: 'שלום',        showRomanization: true,  latinScript: false },
  pt:  { name: 'Portuguese', nativeName: 'Português',        flag: '🇧🇷', ttsLocale: 'pt-BR',  hello: 'Olá',         showRomanization: false, latinScript: true  },
  it:  { name: 'Italian',    nativeName: 'Italiano',         flag: '🇮🇹', ttsLocale: 'it-IT',  hello: 'Ciao',        showRomanization: false, latinScript: true  },
  nl:  { name: 'Dutch',      nativeName: 'Nederlands',       flag: '🇳🇱', ttsLocale: 'nl-NL',  hello: 'Hallo',       showRomanization: false, latinScript: true  },
  ru:  { name: 'Russian',    nativeName: 'Русский',          flag: '🇷🇺', ttsLocale: 'ru-RU',  hello: 'Привет',      showRomanization: true,  latinScript: false },
  id:  { name: 'Indonesian', nativeName: 'Bahasa Indonesia', flag: '🇮🇩', ttsLocale: 'id-ID',  hello: 'Halo',        showRomanization: false, latinScript: true  },
  ms:  { name: 'Malay',      nativeName: 'Bahasa Melayu',    flag: '🇲🇾', ttsLocale: 'ms-MY',  hello: 'Halo',        showRomanization: false, latinScript: true  },
  fil: { name: 'Filipino',   nativeName: 'Filipino',         flag: '🇵🇭', ttsLocale: 'fil-PH', hello: 'Kamusta',     showRomanization: false, latinScript: true  },
  tr:  { name: 'Turkish',    nativeName: 'Türkçe',           flag: '🇹🇷', ttsLocale: 'tr-TR',  hello: 'Merhaba',     showRomanization: false, latinScript: true  },
  bn:  { name: 'Bengali',    nativeName: 'বাংলা',            flag: '🇧🇩', ttsLocale: 'bn-BD',  hello: 'হ্যালো',      showRomanization: true,  latinScript: false },
  ta:  { name: 'Tamil',      nativeName: 'தமிழ்',            flag: '🇱🇰', ttsLocale: 'ta-IN',  hello: 'வணக்கம்',     showRomanization: true,  latinScript: false },
};

export const RTL_LANGUAGES = ['ar', 'he'];

export const getLangName = (code: string): string => LANGUAGES[code]?.name || code;
export const getLangNativeName = (code: string): string => LANGUAGES[code]?.nativeName || code;
export const getLangFlag = (code: string): string => LANGUAGES[code]?.flag || '🌍';
export const getLangTtsLocale = (code: string): string => LANGUAGES[code]?.ttsLocale || code;
export const getLangHello = (code: string): string => LANGUAGES[code]?.hello || '';
export const isRTL = (code: string): boolean => RTL_LANGUAGES.includes(code);
// Returns true if the target language uses a non-Latin script.
// The backend adapts the content: Latin-script native speakers get romanization,
// non-Latin native speakers get native-script phonetic approximations.
export const langHasRomanization = (targetCode: string): boolean =>
  LANGUAGES[targetCode]?.showRomanization === true;

// Map language code to the field name on a flashcard/card object
export const getLangField = (code: string): string => {
  if (code === 'ko') return 'korean';
  if (code === 'en') return 'english';
  return code;
};

export default LANGUAGES;
