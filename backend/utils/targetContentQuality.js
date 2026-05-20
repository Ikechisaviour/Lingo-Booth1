const { normalizeLangCode, isLatinScript } = require('./languageMetadata');

const KOREAN_SCRIPT = /[\u1100-\u11ff\u3130-\u318f\uac00-\ud7af]/u;

const SCRIPT_RULES = [
  {
    name: 'Korean script',
    pattern: KOREAN_SCRIPT,
    allowed: new Set(['ko']),
  },
  {
    name: 'Japanese kana',
    pattern: /[\u3040-\u30ff\u31f0-\u31ff]/u,
    allowed: new Set(['ja']),
  },
  {
    name: 'Han characters',
    pattern: /[\u3400-\u9fff\uf900-\ufaff]/u,
    allowed: new Set(['zh', 'ja']),
  },
  {
    name: 'Arabic script',
    pattern: /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff]/u,
    allowed: new Set(['ar']),
  },
  {
    name: 'Hebrew script',
    pattern: /[\u0590-\u05ff]/u,
    allowed: new Set(['he']),
  },
  {
    name: 'Devanagari script',
    pattern: /[\u0900-\u097f]/u,
    allowed: new Set(['hi']),
  },
  {
    name: 'Bengali script',
    pattern: /[\u0980-\u09ff]/u,
    allowed: new Set(['bn']),
  },
  {
    name: 'Tamil script',
    pattern: /[\u0b80-\u0bff]/u,
    allowed: new Set(['ta']),
  },
];

const KOREAN_CONTEXT_PATTERN = /\b(?:korea|korean|seoul|gangnam|myeongdong|gyeongbokgung|chuseok|hangul|hangeul|hanbok|won|kimchi|gimchi|bulgogi|bibimbap|gimbap|tteokbokki|soju|mins[ou])\b/i;
const KOREAN_CONTEXT_SCRIPT_PATTERN = /(?:\ud55c\uad6d|\ud55c\uae00|\uae40\uce58|\ubd88\uace0\uae30|\ube44\ube54\ubc25|\uae40\ubc25|\ub5a1\ubcf6\uc774|\uc18c\uc8fc|\ucd94\uc11d|\uc11c\uc6b8|\uba85\ub3d9|\uacbd\ubcf5\uad81|\uc6d0)/u;

const KOREAN_ROMANIZATION_PATTERN = /\b(?:annyeong|gamsa|gomap|joesong|mian|sillye|gwaenchan|cheonman|mannaseo|bangap|jinae|oraen|achim|jumuseyo|chukha|hwanyeong|meok|getseumnida|geonbae|danyeo|josim|juseyo|haeyo|isseoyo|eopseoyo|hangu|hanguk|gimchi|bulgogi|bibimbap|gimbap|tteokbokki|soju|gyeong|myeong|seoul|gangnam|imnida|seyo|jeoneun|ireumeun|saram|haksaeng|seonsaeng|hoesawon|eotteo|joahae|mwo|eonje|eodie|jigeum|ne|aniyo)\b/i;

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function categoryValues(category) {
  if (Array.isArray(category)) return category.map(cleanText).filter(Boolean);
  const value = cleanText(category);
  return value ? [value] : [];
}

function hasExplicitBorrowingMetadata(item = {}) {
  const usage = item.usage && typeof item.usage === 'object' && !Array.isArray(item.usage)
    ? item.usage
    : {};
  const categories = categoryValues(item.category).map(value => value.toLowerCase());
  return usage.loanword === true
    || usage.borrowed === true
    || usage.borrowedFrom
    || usage.originLanguage
    || categories.includes('loanword')
    || categories.includes('borrowed')
    || categories.includes('borrowed-word');
}

function containsForeignScript(text, targetLang) {
  const lang = normalizeLangCode(targetLang);
  const value = cleanText(text);
  if (!value) return null;

  return SCRIPT_RULES.find((rule) => rule.pattern.test(value) && !rule.allowed.has(lang)) || null;
}

function containsKoreanContextCarryover(text, targetLang) {
  const lang = normalizeLangCode(targetLang);
  if (lang === 'ko') return false;
  const value = cleanText(text);
  return !!value && (KOREAN_CONTEXT_PATTERN.test(value) || KOREAN_CONTEXT_SCRIPT_PATTERN.test(value));
}

function findTargetContentIssues(item = {}, targetLang, options = {}) {
  const lang = normalizeLangCode(targetLang);
  if (!lang || lang === 'ko') return [];
  if (hasExplicitBorrowingMetadata(item)) return [];

  const fields = options.fields || [];
  const issues = [];

  fields.forEach(({ name, value, kind = 'target' }) => {
    const text = cleanText(value);
    if (!text) return;

    const foreignScript = containsForeignScript(text, lang);
    if (foreignScript) {
      issues.push({
        field: name,
        kind,
        reason: `${foreignScript.name} appears in ${lang} target content`,
        value: text,
      });
    }

    if (containsKoreanContextCarryover(text, lang)) {
      issues.push({
        field: name,
        kind,
        reason: `Korean-specific carryover appears in ${lang} target content`,
        value: text,
      });
    }
  });

  return issues;
}

function isTargetContentAllowed(item = {}, targetLang, fields = []) {
  return findTargetContentIssues(item, targetLang, { fields }).length === 0;
}

function seededPronunciationLooksWrong(item = {}, targetLang) {
  const lang = normalizeLangCode(targetLang);
  if (lang === 'ko') return false;
  const usage = item.usage && typeof item.usage === 'object' && !Array.isArray(item.usage)
    ? item.usage
    : {};
  if (usage.pronunciationSource === 'target-authored' || item.officialPronunciationSource === 'target-authored') {
    return false;
  }

  const values = [
    item.romanization,
    item.officialPronunciation,
    item.pronunciation,
  ].map(cleanText).filter(Boolean);

  if (values.length === 0) return false;
  if (lang !== 'ko' && values.some(value => KOREAN_ROMANIZATION_PATTERN.test(value))) return true;

  if (isLatinScript(lang)) {
    const targetText = cleanText(item[lang] || item.targetText || item.korean);
    return values.some(value => targetText && value && value.toLowerCase() !== targetText.toLowerCase());
  }

  return true;
}

function clearUnsafeSeededPronunciation(item = {}, targetLang) {
  if (!seededPronunciationLooksWrong(item, targetLang)) return item;
  item.romanization = '';
  item.officialPronunciation = '';
  item.pronunciation = '';
  item.officialPronunciationSource = 'cleared-source-carryover';
  return item;
}

module.exports = {
  clearUnsafeSeededPronunciation,
  containsKoreanContextCarryover,
  findTargetContentIssues,
  hasExplicitBorrowingMetadata,
  isTargetContentAllowed,
  seededPronunciationLooksWrong,
};
