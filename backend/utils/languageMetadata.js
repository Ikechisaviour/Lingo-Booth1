const LANGUAGE_METADATA = {
  en: { name: 'English', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  ko: { name: 'Korean', script: 'Hang', latinScript: false, officialPronunciationSystem: 'revised-romanization', needsPronunciationGuide: true },
  es: { name: 'Spanish', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  fr: { name: 'French', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  de: { name: 'German', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  zh: { name: 'Chinese', script: 'Hans', latinScript: false, officialPronunciationSystem: 'pinyin', needsPronunciationGuide: true },
  ja: { name: 'Japanese', script: 'Jpan', latinScript: false, officialPronunciationSystem: 'romaji', needsPronunciationGuide: true },
  hi: { name: 'Hindi', script: 'Deva', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true },
  ar: { name: 'Arabic', script: 'Arab', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true, rtl: true },
  he: { name: 'Hebrew', script: 'Hebr', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true, rtl: true },
  pt: { name: 'Portuguese', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  it: { name: 'Italian', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  nl: { name: 'Dutch', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  ru: { name: 'Russian', script: 'Cyrl', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true },
  id: { name: 'Indonesian', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  ms: { name: 'Malay', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  fil: { name: 'Filipino', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  tr: { name: 'Turkish', script: 'Latn', latinScript: true, officialPronunciationSystem: 'spelling', needsPronunciationGuide: false },
  bn: { name: 'Bengali', script: 'Beng', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true },
  ta: { name: 'Tamil', script: 'Taml', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true },
  th: { name: 'Thai', script: 'Thai', latinScript: false, officialPronunciationSystem: 'transliteration', needsPronunciationGuide: true },
};

function normalizeLangCode(code, fallback = 'en') {
  return String(code || fallback).trim().toLowerCase().split('-')[0] || fallback;
}

function getLanguageMetadata(code) {
  const lang = normalizeLangCode(code);
  return LANGUAGE_METADATA[lang] || {
    name: lang,
    script: 'Unknown',
    latinScript: false,
    officialPronunciationSystem: 'transliteration',
    needsPronunciationGuide: true,
  };
}

function isLatinScript(code) {
  return getLanguageMetadata(code).latinScript === true;
}

function needsPronunciationGuide(code) {
  return getLanguageMetadata(code).needsPronunciationGuide === true;
}

module.exports = {
  LANGUAGE_METADATA,
  getLanguageMetadata,
  isLatinScript,
  needsPronunciationGuide,
  normalizeLangCode,
};
