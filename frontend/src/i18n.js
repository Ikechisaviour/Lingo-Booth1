import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en/translation.json';
import ko from './locales/ko/translation.json';
import es from './locales/es/translation.json';
import fr from './locales/fr/translation.json';
import de from './locales/de/translation.json';
import zh from './locales/zh/translation.json';
import ja from './locales/ja/translation.json';
import hi from './locales/hi/translation.json';
import ar from './locales/ar/translation.json';
import he from './locales/he/translation.json';
import pt from './locales/pt/translation.json';
import it from './locales/it/translation.json';
import nl from './locales/nl/translation.json';
import ru from './locales/ru/translation.json';
import id from './locales/id/translation.json';
import ms from './locales/ms/translation.json';
import fil from './locales/fil/translation.json';
import tr from './locales/tr/translation.json';
import bn from './locales/bn/translation.json';
import ta from './locales/ta/translation.json';

const resources = {
  en: { translation: en },
  ko: { translation: ko },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  zh: { translation: zh },
  ja: { translation: ja },
  hi: { translation: hi },
  ar: { translation: ar },
  he: { translation: he },
  pt: { translation: pt },
  it: { translation: it },
  nl: { translation: nl },
  ru: { translation: ru },
  id: { translation: id },
  ms: { translation: ms },
  fil: { translation: fil },
  tr: { translation: tr },
  bn: { translation: bn },
  ta: { translation: ta },
};

const detectLanguage = () => {
  const stored = localStorage.getItem('nativeLanguage');
  if (stored && resources[stored]) return stored;
  const browserLang = navigator.language?.split('-')[0];
  if (browserLang && resources[browserLang]) return browserLang;
  return 'en';
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: detectLanguage(),
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
