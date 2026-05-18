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

const LEADING_ENGLISH_LABEL = /^[A-Za-z][A-Za-z\s'/-]{0,36}:\s*/;
const TARGET_LAYER_DASH = /\s+(?:—|–|--|-)\s+/;
const ENGLISH_INSTRUCTION_WRAPPER = /^(?:read|say|write|listen to|repeat|swap in|rewrite|use another|replace|order|invite|report|describe|answer|leave|send|explain|introduce|ask|state|make another|share|recommend|discuss|talk about)\s+/i;
const TRAILING_ENGLISH_INSTRUCTION = /\s+(?:aloud|again|carefully|correctly|with|using|then)\b[\s\S]*$/i;
const LEADING_TARGET_META_WORD = /^(?:written|root)\s+/i;

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

function looksLikeEnglishOnlyTargetText(text, targetLang) {
  const targetText = String(text || '').trim();
  return NON_LATIN_TARGET_LANGS.has(targetLang)
    && !!targetText
    && /[A-Za-z]{3,}/.test(targetText)
    && !containsTargetScript(targetText, targetLang)
    && !looksLikeLegitimateLatinTarget(targetText, targetLang);
}

function looksLikeEnglishInstructionScaffold(text, targetLang) {
  const value = String(text || '').trim();
  return NON_LATIN_TARGET_LANGS.has(targetLang)
    && /[A-Za-z]{3,}/.test(value)
    && ENGLISH_INSTRUCTION_WRAPPER.test(value);
}

function stripEnglishParentheticalGlosses(text, targetLang = '') {
  return String(text || '')
    .replace(/\s*\(([^)]*)\)/g, (match, inner) => (
      /[A-Za-z]/.test(inner)
        ? ''
        : match
    ))
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function stripObviousEnglishTargetScaffolding(text, targetLang) {
  let cleaned = stripEnglishParentheticalGlosses(text, targetLang);
  if (!NON_LATIN_TARGET_LANGS.has(targetLang) || !cleaned || !containsTargetScript(cleaned, targetLang)) {
    if (NON_LATIN_TARGET_LANGS.has(targetLang) && cleaned) {
      const dashParts = cleaned.split(TARGET_LAYER_DASH);
      if (dashParts.length > 1) {
        const first = dashParts[0].trim();
        const rest = dashParts.slice(1).join(' - ').trim();
        const englishWordCount = (rest.match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
        if (englishWordCount >= 3) return first;
      }
    }
    return cleaned;
  }

  cleaned = cleaned
    .split(TARGET_LAYER_DASH)
    .map((segment) => segment
      .replace(LEADING_ENGLISH_LABEL, '')
      .replace(LEADING_TARGET_META_WORD, '')
      .trim())
    .filter(Boolean)
    .join(' — ');

  cleaned = cleaned
    .split('\n')
    .map((line) => {
      const parts = line.split(TARGET_LAYER_DASH).map((part) => part.trim()).filter(Boolean);
      if (parts.length <= 1) return line.trim();
      const last = parts[parts.length - 1];
      const englishWordCount = (last.match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
      if (!containsTargetScript(last, targetLang) && englishWordCount >= 2) {
        return parts.slice(0, -1).join(' — ');
      }
      return parts.join(' — ');
    })
    .join('\n');

  const dashParts = cleaned.split(TARGET_LAYER_DASH);
  if (dashParts.length > 1) {
    const first = dashParts[0].trim();
    const rest = dashParts.slice(1).join(' — ').trim();
    const restHasTargetScript = containsTargetScript(rest, targetLang);
    const englishWordCount = (rest.match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
    if (containsTargetScript(first, targetLang) && !restHasTargetScript && englishWordCount >= 3) {
      cleaned = first;
    }
  }

  cleaned = cleaned.replace(
    /^(?:read|say|write|listen to|repeat)\s+["“]?[^"”]*?([\u3131-\u314e\u314f-\u3163\uac00-\ud7a3\u3400-\u9fff\u3040-\u30ff\u0900-\u097f\u0600-\u06ff\u0590-\u05ff\u0400-\u04ff\u0980-\u09ff\u0b80-\u0bff][\s\S]*?)["”]?(?:\s+(?:aloud|again|carefully|with\b)[\s\S]*)?$/i,
    '$1',
  );

  if (ENGLISH_INSTRUCTION_WRAPPER.test(cleaned) && containsTargetScript(cleaned, targetLang)) {
    const chars = Array.from(cleaned);
    const firstTargetIndex = chars.findIndex((char) => containsTargetScript(char, targetLang));
    if (firstTargetIndex >= 0) {
      cleaned = chars.slice(firstTargetIndex).join('').replace(/["”]\s*$/, '').trim();
    }
  }

  if (containsTargetScript(cleaned, targetLang)) {
    cleaned = cleaned.replace(TRAILING_ENGLISH_INSTRUCTION, '').trim();
  }

  return cleaned.replace(/\s{2,}/g, ' ').trim();
}

function normalizeTargetLayerForDisplay(lessonObj, targetLang) {
  if (!Array.isArray(lessonObj?.content) || !NON_LATIN_TARGET_LANGS.has(targetLang)) return;

  const reusableTargetsByPronunciation = new Map();
  lessonObj.content.forEach((item) => {
    const targetText = String(item?.targetText || item?.korean || '').trim();
    const exampleTarget = String(item?.exampleTarget || item?.example || '').trim();
    const key = String(item?.romanization || item?.pronunciation || '').trim().toLowerCase();
    if (!key || !containsTargetScript(targetText, targetLang)) return;
    reusableTargetsByPronunciation.set(key, {
      targetText,
      exampleTarget: containsTargetScript(exampleTarget, targetLang) ? exampleTarget : '',
    });
  });

  lessonObj.content.forEach((item) => {
    const targetText = String(item?.targetText || item?.korean || '').trim();
    const exampleTarget = String(item?.exampleTarget || item?.example || '').trim();
    if (looksLikeEnglishScaffoldTargetText(targetText, targetLang, exampleTarget)) {
      item.targetText = exampleTarget;
      item.korean = exampleTarget;
    }

    const cleanedTarget = stripResidualEnglishTargetScaffolding(
      stripObviousEnglishTargetScaffolding(item.targetText || item.korean, targetLang),
      targetLang,
    );
    if (cleanedTarget) {
      item.targetText = cleanedTarget;
      item.korean = cleanedTarget;
    }

    const cleanedTargetText = String(item.targetText || item.korean || '').trim();
    const cleanedExampleText = String(item.exampleTarget || item.example || '').trim();
    if (looksLikeEnglishScaffoldTargetText(cleanedTargetText, targetLang, cleanedExampleText)) {
      item.targetText = cleanedExampleText;
      item.korean = cleanedExampleText;
    } else if (
      looksLikeEnglishOnlyTargetText(cleanedTargetText, targetLang)
      || looksLikeEnglishInstructionScaffold(cleanedTargetText, targetLang)
    ) {
      const key = String(item?.romanization || item?.pronunciation || '').trim().toLowerCase();
      const reusable = reusableTargetsByPronunciation.get(key);
      if (reusable?.targetText) {
        item.targetText = reusable.targetText;
        item.korean = reusable.targetText;
        if (reusable.exampleTarget) {
          item.exampleTarget = reusable.exampleTarget;
          item.example = reusable.exampleTarget;
        }
      }
    }

    const cleanedExample = stripResidualEnglishTargetScaffolding(
      stripObviousEnglishTargetScaffolding(item.exampleTarget || item.example, targetLang),
      targetLang,
    );
    if (
      looksLikeEnglishScaffoldTargetText(item.exampleTarget || item.example, targetLang, item.targetText || item.korean)
      || looksLikeEnglishInstructionScaffold(item.exampleTarget || item.example, targetLang)
    ) {
      item.exampleTarget = '';
      item.example = '';
    } else if (cleanedExample) {
      item.exampleTarget = cleanedExample;
      item.example = cleanedExample;
    }

    if (Array.isArray(item.breakdown)) {
      item.breakdown.forEach((part) => {
        const cleanedPart = stripResidualEnglishTargetScaffolding(
          stripObviousEnglishTargetScaffolding(part?.target || part?.korean, targetLang),
          targetLang,
        );
        if (!cleanedPart) return;
        part.target = cleanedPart;
        part.korean = cleanedPart;
      });
    }
  });
}

function stripResidualEnglishTargetScaffolding(text, targetLang) {
  let cleaned = String(text || '').trim();
  if (!cleaned || !NON_LATIN_TARGET_LANGS.has(targetLang)) return cleaned;

  cleaned = cleaned
    .split('\n')
    .map((line) => {
      const parts = line.split(TARGET_LAYER_DASH).map((part) => part.trim()).filter(Boolean);
      if (parts.length <= 1) return line.trim();
      const last = parts[parts.length - 1];
      const englishWordCount = (last.match(/[A-Za-z][A-Za-z'-]*/g) || []).length;
      return !containsTargetScript(last, targetLang) && englishWordCount >= 2
        ? parts.slice(0, -1).join(' — ')
        : parts.join(' — ');
    })
    .join('\n');

  if (ENGLISH_INSTRUCTION_WRAPPER.test(cleaned) && containsTargetScript(cleaned, targetLang)) {
    const chars = Array.from(cleaned);
    const firstTargetIndex = chars.findIndex((char) => containsTargetScript(char, targetLang));
    if (firstTargetIndex >= 0) {
      const tail = chars.slice(firstTargetIndex);
      const firstLatinAfterTarget = tail.findIndex((char, index) => index > 0 && /[A-Za-z]/.test(char));
      cleaned = (firstLatinAfterTarget > 0 ? tail.slice(0, firstLatinAfterTarget) : tail).join('').trim();
    }
  }

  if (containsTargetScript(cleaned, targetLang)) {
    cleaned = cleaned.replace(TRAILING_ENGLISH_INSTRUCTION, '').trim();
  }

  return cleaned.replace(/\s{2,}/g, ' ').trim();
}

module.exports = {
  NON_LATIN_TARGET_LANGS,
  TARGET_SCRIPT_PATTERNS,
  containsTargetScript,
  looksLikeEnglishScaffoldTargetText,
  looksLikeEnglishOnlyTargetText,
  looksLikeEnglishInstructionScaffold,
  looksLikeLegitimateLatinTarget,
  stripObviousEnglishTargetScaffolding,
  normalizeTargetLayerForDisplay,
};
