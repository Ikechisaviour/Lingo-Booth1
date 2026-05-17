const NON_LATIN_TARGET_LANGS = new Set([
  'ko', 'zh', 'ja', 'hi', 'ar', 'he', 'ru', 'bn', 'ta',
  'th', 'ka', 'am', 'my', 'km', 'lo', 'si', 'ne', 'ur',
  'fa', 'ps', 'yi', 'gu', 'kn', 'ml', 'te', 'pa', 'uk', 'bg', 'el',
]);

const TARGET_SCRIPT_PATTERNS = {
  ko: /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/,
  zh: /[\u3400-\u9fff]/,
  ja: /[\u3040-\u30ff\u3400-\u9fff]/,
  hi: /[\u0900-\u097f]/,
  ar: /[\u0600-\u06ff]/,
  he: /[\u0590-\u05ff]/,
  ru: /[\u0400-\u04ff]/,
  bn: /[\u0980-\u09ff]/,
  ta: /[\u0b80-\u0bff]/,
};

const LEGITIMATE_LATIN_TARGET_PATTERNS = {
  // Chinese foundation lessons legitimately teach Pinyin initials/finals such
  // as "iao" or "an / ang". These are target content, not English leaks.
  zh: /^[a-zü]+(?:\s*\/\s*[a-zü]+)*$/i,
};

const SINGLE_WORD_SCAFFOLD_LABELS = new Set([
  'choosing',
  'comparison',
  'comprehension',
]);

function containsTargetScript(text, targetLang) {
  const pattern = TARGET_SCRIPT_PATTERNS[targetLang];
  return !!pattern && pattern.test(String(text || ''));
}

function looksLikeLegitimateLatinTarget(text, targetLang) {
  const pattern = LEGITIMATE_LATIN_TARGET_PATTERNS[targetLang];
  return !!pattern && pattern.test(String(text || '').trim());
}

function looksLikeEnglishScaffoldTargetText(text, targetLang, exampleTarget = '') {
  const targetText = String(text || '').trim();
  if (!NON_LATIN_TARGET_LANGS.has(targetLang) || !targetText) return false;
  if (!/[A-Za-z]{3,}/.test(targetText)) return false;
  if (containsTargetScript(targetText, targetLang)) return false;
  if (!containsTargetScript(exampleTarget, targetLang)) return false;
  if (looksLikeLegitimateLatinTarget(targetText, targetLang)) return false;

  const latinWords = targetText.match(/[A-Za-z][A-Za-z'-]*/g) || [];
  if (latinWords.length >= 2) return true;
  return SINGLE_WORD_SCAFFOLD_LABELS.has(targetText.toLowerCase());
}

function normalizeTargetLayerForDisplay(lessonObj, targetLang) {
  if (!Array.isArray(lessonObj?.content) || !NON_LATIN_TARGET_LANGS.has(targetLang)) return;

  lessonObj.content.forEach((item) => {
    const targetText = String(item?.targetText || item?.korean || '').trim();
    const exampleTarget = String(item?.exampleTarget || item?.example || '').trim();
    if (looksLikeEnglishScaffoldTargetText(targetText, targetLang, exampleTarget)) {
      item.targetText = exampleTarget;
      item.korean = exampleTarget;
    }
  });
}

module.exports = {
  NON_LATIN_TARGET_LANGS,
  TARGET_SCRIPT_PATTERNS,
  containsTargetScript,
  looksLikeEnglishScaffoldTargetText,
  looksLikeLegitimateLatinTarget,
  normalizeTargetLayerForDisplay,
};
