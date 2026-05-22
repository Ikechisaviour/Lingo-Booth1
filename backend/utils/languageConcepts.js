const LANGUAGE_FIELDS = ['korean', 'english', 'es', 'fr', 'de', 'zh', 'ja', 'hi', 'ar', 'he', 'pt', 'it', 'nl', 'ru', 'id', 'ms', 'fil', 'tr', 'bn', 'ta', 'th'];
const {
  clearUnsafeSeededPronunciation,
  findTargetContentIssues,
} = require('./targetContentQuality');

const YOU_FORM_OVERRIDES = {
  bn: { informal: 'তুমি', formal: 'আপনি' },
  de: { informal: 'du', formal: 'Sie' },
  es: { informal: 'tú', formal: 'usted' },
  fil: { informal: 'ikaw', formal: 'kayo' },
  fr: { informal: 'tu', formal: 'vous' },
  hi: { informal: 'तुम', formal: 'आप' },
  id: { informal: 'kamu', formal: 'Anda' },
  it: { informal: 'tu', formal: 'Lei' },
  ms: { informal: 'awak', formal: 'anda' },
  nl: { informal: 'jij', formal: 'u' },
  pt: { informal: 'tu', formal: 'você' },
  ru: { informal: 'ты', formal: 'вы' },
  ta: { informal: 'நீ', formal: 'நீங்கள்' },
  tr: { informal: 'sen', formal: 'siz' },
  zh: { informal: '你', formal: '您' },
};

const FIRST_PERSON_REGISTER_LANGS = new Set(['ko']);
const KOREAN_SOURCE_CONTEXT_LANGS = new Set(['ko']);

const REGISTER_NOTES = new Set([
  'formal',
  'informal',
  'casual',
  'less formal',
  'polite',
  'honorific',
]);

const CONTEXT_NOTE_PATTERNS = [
  /to (?:the )?(?:person )?leaving/,
  /when you leave/,
  /someone leaving/,
  /before meal/,
  /after meal/,
  /first meeting/,
  /said when/,
  /sino/,
  /over there/,
  /alternative/,
];

function normalizeLang(code, fallback = 'en') {
  const value = String(code || fallback).trim().toLowerCase();
  const aliases = {
    kr: 'ko',
    kor: 'ko',
    cn: 'zh',
    chn: 'zh',
    jp: 'ja',
    jpn: 'ja',
    iw: 'he',
    in: 'id',
    tl: 'fil',
  };
  if (aliases[value]) return aliases[value];
  if (value.startsWith('zh')) return 'zh';
  if (value.startsWith('pt')) return 'pt';
  const base = value.split(/[-_]/)[0];
  return aliases[base] || base || fallback;
}

function languageField(code) {
  const lang = normalizeLang(code);
  if (lang === 'ko') return 'korean';
  if (lang === 'en') return 'english';
  return lang;
}

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function stripTrailingParenthetical(text) {
  return cleanText(String(text || '')
    .replace(/\s*[\(\uff08][^()\uff08\uff09]*[\)\uff09]\s*$/u, '')
    .replace(/\s*[-–—:]\s*$/u, ''));
}

function normalizeConceptKey(text) {
  return cleanText(text)
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/\s+/g, ' ');
}

function slugifyConcept(text) {
  const asciiSlug = normalizeConceptKey(text)
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 80);
  if (asciiSlug) return asciiSlug;

  const unicodeKey = normalizeConceptKey(text);
  if (!unicodeKey) return 'item';
  return `u_${Buffer.from(unicodeKey, 'utf8').toString('hex').slice(0, 80)}`;
}

function trailingParenthetical(text) {
  const raw = cleanText(text);
  const match = raw.match(/^(.*?)\s*[\(\uff08]([^()\uff08\uff09]+)[\)\uff09]\s*$/u);
  if (!match) return null;
  return {
    base: cleanText(match[1]),
    note: cleanText(match[2]),
    raw,
  };
}

function noteKind(note) {
  const key = normalizeConceptKey(note);
  if (REGISTER_NOTES.has(key)) return 'register';
  if (/formal|informal|casual|polite|honorific/.test(key)) return 'register';
  if (CONTEXT_NOTE_PATTERNS.some(pattern => pattern.test(key))) return 'context';
  return '';
}

function parseParentheticalConcept(raw) {
  const parsed = trailingParenthetical(raw);
  if (!parsed || !parsed.base) return null;
  const kind = noteKind(parsed.note);
  if (!kind) return null;

  const note = normalizeConceptKey(parsed.note);
  const usage = { note: parsed.note };
  let distinction = 'usage-note';
  if (kind === 'register') {
    distinction = 'register';
    usage.register = note;
    if (/less formal|casual|informal/.test(note)) usage.formality = 'informal';
    if (/formal|polite|honorific/.test(note) && !/less formal/.test(note)) usage.formality = 'formal';
  } else if (kind === 'context') {
    distinction = 'context-note';
    usage.context = note;
  }

  return {
    conceptId: `lexeme.${slugifyConcept(parsed.base)}`,
    conceptGloss: parsed.base,
    originalGloss: parsed.raw,
    distinction,
    usage,
  };
}

function parseConceptGloss(gloss) {
  const raw = cleanText(gloss);
  const key = normalizeConceptKey(raw);

  const familyMatch = key.match(/^older (brother|sister) \((male|female) speaker\)$/);
  if (familyMatch) {
    const relation = familyMatch[1];
    const speakerGender = familyMatch[2];
    return {
      conceptId: `family.older_${relation}`,
      conceptGloss: `Older ${relation}`,
      originalGloss: raw,
      distinction: 'family-speaker-gender',
      usage: {
        relation,
        relativeAge: 'older',
        speakerGender,
      },
    };
  }

  const firstPersonMatch = key.match(/^(i\/me|i|me) \((formal|informal)\)$/);
  if (firstPersonMatch) {
    const pronoun = firstPersonMatch[1] === 'i/me' ? 'I/Me' : firstPersonMatch[1].toUpperCase();
    return {
      conceptId: `pronoun.${firstPersonMatch[1].replace('/', '_')}`,
      conceptGloss: pronoun,
      originalGloss: raw,
      distinction: 'first-person-register',
      usage: {
        person: 'first',
        formality: firstPersonMatch[2],
      },
    };
  }

  const youMatch = key.match(/^you \((formal|informal)\)$/);
  if (youMatch) {
    return {
      conceptId: 'pronoun.you',
      conceptGloss: 'You',
      originalGloss: raw,
      distinction: 'second-person-formality',
      usage: {
        person: 'second',
        formality: youMatch[1],
      },
    };
  }

  const informalHiMatch = key.match(/^hi \((informal)\)$/);
  if (informalHiMatch) {
    return {
      conceptId: 'greeting.hi',
      conceptGloss: 'Hi',
      originalGloss: raw,
      distinction: 'greeting-register',
      usage: {
        register: 'informal',
      },
    };
  }

  return parseParentheticalConcept(raw);
}

function displayGlossForTarget(info, targetLang) {
  if (!info) return '';
  const lang = normalizeLang(targetLang);

  if (info.distinction === 'family-speaker-gender') {
    return lang === 'ko' ? info.originalGloss : info.conceptGloss;
  }

  if (info.distinction === 'second-person-formality') {
    return YOU_FORM_OVERRIDES[lang] ? info.originalGloss : info.conceptGloss;
  }

  if (info.distinction === 'greeting-register') {
    return lang === 'ko' ? info.originalGloss : info.conceptGloss;
  }

  if (info.distinction === 'first-person-register') {
    return FIRST_PERSON_REGISTER_LANGS.has(lang) ? info.originalGloss : info.conceptGloss;
  }

  if (info.distinction === 'register' || info.distinction === 'context-note' || info.distinction === 'usage-note') {
    return KOREAN_SOURCE_CONTEXT_LANGS.has(lang) ? info.originalGloss : info.conceptGloss;
  }

  return info.conceptGloss;
}

function targetTextForConcept(targetText, targetLang, info) {
  const text = cleanText(targetText);
  if (!info) return text;
  const lang = normalizeLang(targetLang);

  if (info.distinction === 'second-person-formality') {
    const override = YOU_FORM_OVERRIDES[lang]?.[info.usage.formality];
    if (override) return override;
    return stripTrailingParenthetical(text);
  }

  if (info.distinction === 'family-speaker-gender' && lang === 'ko') {
    return text;
  }

  if (info.distinction === 'greeting-register' && lang === 'ko') {
    return text;
  }

  if (info.distinction === 'first-person-register' && FIRST_PERSON_REGISTER_LANGS.has(lang)) {
    return text;
  }

  if (
    (info.distinction === 'register' || info.distinction === 'context-note' || info.distinction === 'usage-note')
    && KOREAN_SOURCE_CONTEXT_LANGS.has(lang)
  ) {
    return text;
  }

  return stripTrailingParenthetical(text);
}

function applyConceptToLearningItem(item, targetLang, options = {}) {
  if (!item) return item;
  const targetField = options.targetField || 'targetText';
  const nativeField = options.nativeField || 'nativeText';
  const sourceGloss = item.conceptGloss || item[nativeField] || item.english || item.nativeText || '';
  const info = parseConceptGloss(sourceGloss);

  if (!info) {
    if (sourceGloss && !item.conceptGloss) item.conceptGloss = cleanText(sourceGloss);
    return item;
  }

  const displayGloss = displayGlossForTarget(info, targetLang);
  item.conceptId = item.conceptId || info.conceptId;
  item.conceptGloss = displayGloss;
  item.usage = {
    ...(item.usage && typeof item.usage === 'object' ? item.usage : {}),
    ...info.usage,
    distinction: info.distinction,
  };
  item[nativeField] = displayGloss;
  if ('english' in item) item.english = displayGloss;
  if (item[targetField]) item[targetField] = targetTextForConcept(item[targetField], targetLang, info);
  return item;
}

function normalizeLessonForLanguagePair(lessonObj, targetLang, nativeLang, options = {}) {
  if (!lessonObj || !Array.isArray(lessonObj.content)) return lessonObj;
  const shouldDedupe = options.dedupe !== false;
  const normalizedContent = [];

  for (const rawItem of lessonObj.content) {
    const item = applyConceptToLearningItem(rawItem, targetLang, {
      targetField: 'targetText',
      nativeField: 'nativeText',
    });

    normalizedContent.push(item);
  }

  lessonObj.content = shouldDedupe
    ? mergeLearningItemsByTarget(normalizedContent, 'targetText', 'nativeText', {
      includeType: true,
      targetLang,
    })
    : normalizedContent;
  lessonObj.content = filterLearningItemsForTarget(lessonObj.content, targetLang, 'lesson');
  return lessonObj;
}

function normalizeFlashcardsForLanguagePair(cards, targetLang, nativeLang) {
  if (!Array.isArray(cards)) return cards;
  const targetField = languageField(targetLang);
  const nativeField = languageField(nativeLang);
  const normalized = [];

  for (const sourceCard of cards) {
    const card = sourceCard;
    clearUnsafeSeededPronunciation(card, targetLang);
    const currentTarget = card[targetField] || card.korean || card.english || '';
    const beforeGloss = card.conceptGloss || card.english || '';
    applyConceptToLearningItem(card, targetLang, {
      targetField,
      nativeField: 'english',
    });

    const targetText = targetTextForConcept(card[targetField] || currentTarget, targetLang, parseConceptGloss(beforeGloss));
    card[targetField] = targetText;
    if (targetField !== 'korean' && card.korean === currentTarget) {
      card.korean = nativeField === 'korean' ? '' : targetText;
    }

    if (card.isDefault && nativeField !== 'english' && nativeField !== targetField && parseConceptGloss(beforeGloss)) {
      card[nativeField] = '';
    }

    normalized.push(card);
  }

  const merged = mergeLearningItemsByTarget(normalized, targetField, 'english', {
    includeType: false,
    targetLang,
  });
  return filterLearningItemsForTarget(merged, targetLang, 'flashcard');
}

function targetQualityFields(item, targetLang, kind) {
  const targetField = kind === 'flashcard' ? languageField(targetLang) : 'targetText';
  const fields = [
    { name: targetField, value: item?.[targetField] || item?.targetText || item?.korean, kind: 'target' },
    { name: 'exampleTarget', value: item?.exampleTarget || item?.example, kind: 'target-example' },
  ];

  if (kind === 'flashcard') {
    fields.push(
      { name: 'english', value: item?.english, kind: 'canonical-gloss' },
      { name: 'conceptGloss', value: item?.conceptGloss, kind: 'canonical-gloss' },
    );
  } else {
    fields.push(
      { name: 'nativeText', value: item?.nativeText, kind: 'canonical-gloss' },
      { name: 'conceptGloss', value: item?.conceptGloss, kind: 'canonical-gloss' },
    );
    if (Array.isArray(item?.breakdown)) {
      item.breakdown.forEach((part, index) => {
        fields.push({ name: `breakdown[${index}].target`, value: part?.target || part?.korean, kind: 'target-breakdown' });
        fields.push({ name: `breakdown[${index}].native`, value: part?.native || part?.english, kind: 'canonical-gloss' });
      });
    }
  }

  return fields;
}

function filterLearningItemsForTarget(items, targetLang, kind = 'lesson') {
  if (!Array.isArray(items)) return items;
  return items.filter((item) => {
    if (kind === 'flashcard' && item && item.isDefault === false) return true;
    const fields = targetQualityFields(item, targetLang, kind);
    return findTargetContentIssues(item, targetLang, { fields }).length === 0;
  });
}

function normalizeCategoryForKey(category) {
  if (Array.isArray(category)) return category.map(cleanText).filter(Boolean).join(',');
  return cleanText(category || 'uncategorized');
}

function categoryList(category) {
  if (Array.isArray(category)) return category.map(cleanText).filter(Boolean);
  const value = cleanText(category);
  return value ? [value] : [];
}

function uniqueByNormalized(values) {
  const seen = new Set();
  const result = [];
  values.forEach((value) => {
    const text = cleanText(value);
    if (!text) return;
    const key = normalizeConceptKey(text);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(text);
  });
  return result;
}

function mergeCategories(first, second) {
  const merged = uniqueByNormalized([
    ...categoryList(first),
    ...categoryList(second),
  ]);
  return merged.length ? merged : ['uncategorized'];
}

function cleanUsageSnapshot(usage) {
  if (!usage || typeof usage !== 'object' || Array.isArray(usage)) return {};
  const { meanings, multiMeaning, mergedCount, ...rest } = usage;
  return rest;
}

function meaningForItem(item, meaningField) {
  const text = cleanText(item?.conceptGloss || item?.[meaningField] || item?.english || item?.nativeText || '');
  if (!text) return null;
  return {
    text,
    conceptId: cleanText(item?.conceptId || ''),
    usage: cleanUsageSnapshot(item?.usage),
  };
}

function mergeMeaningLists(first = [], second = []) {
  const seen = new Set();
  const result = [];
  [...first, ...second].forEach((meaning) => {
    if (!meaning?.text) return;
    const key = normalizeConceptKey(meaning.text);
    if (seen.has(key)) return;
    seen.add(key);
    result.push(meaning);
  });
  return result;
}

function mergeLearningItemsByTarget(items, targetField, meaningField, options = {}) {
  const includeType = options.includeType !== false;
  const targetLang = normalizeLang(options.targetLang || '');
  const byTarget = new Map();
  const merged = [];

  for (const item of items) {
    const targetText = cleanText(item?.[targetField] || item?.targetText || item?.korean || '');
    if (!targetText) {
      merged.push(item);
      continue;
    }

    const key = [
      targetLang,
      includeType ? cleanText(item.type || '') : '',
      normalizeConceptKey(targetText),
    ].join('|');

    if (!byTarget.has(key)) {
      const baseMeaning = meaningForItem(item, meaningField);
      item.usage = {
        ...(item.usage && typeof item.usage === 'object' ? item.usage : {}),
        ...(baseMeaning ? { meanings: [baseMeaning] } : {}),
        mergedCount: 1,
      };
      byTarget.set(key, item);
      merged.push(item);
      continue;
    }

    const existing = byTarget.get(key);
    const existingMeanings = Array.isArray(existing.usage?.meanings)
      ? existing.usage.meanings
      : [meaningForItem(existing, meaningField)].filter(Boolean);
    const incomingMeaning = meaningForItem(item, meaningField);
    const nextMeanings = mergeMeaningLists(existingMeanings, incomingMeaning ? [incomingMeaning] : []);
    const meaningTexts = uniqueByNormalized(nextMeanings.map(meaning => meaning.text));
    const displayMeaning = meaningTexts.join(' / ');

    if (displayMeaning) {
      existing[meaningField] = displayMeaning;
      existing.conceptGloss = displayMeaning;
      if (meaningField === 'english' || 'english' in existing) {
        existing.english = displayMeaning;
      }
      if (meaningField === 'nativeText' || 'nativeText' in existing) {
        existing.nativeText = displayMeaning;
      }
    }

    if ('category' in existing || 'category' in item) {
      existing.category = mergeCategories(existing.category, item.category);
    }
    existing.usage = {
      ...(existing.usage && typeof existing.usage === 'object' ? existing.usage : {}),
      meanings: nextMeanings,
      multiMeaning: nextMeanings.length > 1,
      mergedCount: (existing.usage?.mergedCount || 1) + 1,
    };

    const activeLevels = uniqueByNormalized([
      ...(Array.isArray(existing.activeLevels) ? existing.activeLevels.map(String) : []),
      ...(Array.isArray(item.activeLevels) ? item.activeLevels.map(String) : []),
      existing.learningLevel,
      item.learningLevel,
    ]).map(Number).filter(level => [1, 2, 3, 4].includes(level)).sort((a, b) => a - b);
    if (activeLevels.length) {
      existing.activeLevels = activeLevels;
      existing.firstIntroducedLevel = Math.min(
        Number(existing.firstIntroducedLevel || activeLevels[0]),
        Number(item.firstIntroducedLevel || activeLevels[0])
      );
    }
    existing.sourceClassLessonKeys = uniqueByNormalized([
      ...(Array.isArray(existing.sourceClassLessonKeys) ? existing.sourceClassLessonKeys : []),
      ...(Array.isArray(item.sourceClassLessonKeys) ? item.sourceClassLessonKeys : []),
      existing.sourceClassLessonKey,
      item.sourceClassLessonKey,
    ]);
    existing.levelUses = {
      ...(existing.levelUses && typeof existing.levelUses === 'object' && !Array.isArray(existing.levelUses) ? existing.levelUses : {}),
      ...(item.levelUses && typeof item.levelUses === 'object' && !Array.isArray(item.levelUses) ? item.levelUses : {}),
    };
    existing.lessonRole = existing.lessonRole || item.lessonRole || item.usage?.lessonRole || '';
    existing.branchType = existing.branchType || item.branchType || item.usage?.branchType || '';
    existing.lessonWeight = Math.min(
      3,
      Math.max(Number(existing.lessonWeight || 0), Number(item.lessonWeight || item.usage?.lessonWeight || 0))
    ) || existing.lessonWeight || item.lessonWeight;
    existing.checkpointType = existing.checkpointType || item.checkpointType || item.usage?.checkpointType || '';
    existing.repairFocus = uniqueByNormalized([
      ...(Array.isArray(existing.repairFocus) ? existing.repairFocus : []),
      ...(Array.isArray(item.repairFocus) ? item.repairFocus : []),
      ...(Array.isArray(item.usage?.repairFocus) ? item.usage.repairFocus : []),
    ]);
    existing.longActivityTypes = uniqueByNormalized([
      ...(Array.isArray(existing.longActivityTypes) ? existing.longActivityTypes : []),
      ...(Array.isArray(item.longActivityTypes) ? item.longActivityTypes : []),
      ...(Array.isArray(item.usage?.longActivityTypes) ? item.usage.longActivityTypes : []),
    ]);

    const conceptIds = uniqueByNormalized(nextMeanings.map(meaning => meaning.conceptId).filter(Boolean));
    if (conceptIds.length > 1 || !existing.conceptId) {
      existing.conceptId = `lexeme.${slugifyConcept(targetText)}`;
    }
    if (!existing.senseId) {
      existing.senseId = `${existing.conceptId || `lexeme.${slugifyConcept(targetText)}`}.sense.${slugifyConcept(displayMeaning || targetText)}`;
    }
  }

  return merged.map((item) => {
    if (item.usage && typeof item.usage === 'object' && !Array.isArray(item.usage)) {
      const meanings = Array.isArray(item.usage.meanings) ? item.usage.meanings : [];
      const { meanings: _meanings, multiMeaning: _multiMeaning, mergedCount: _mergedCount, ...rest } = item.usage;
      item.usage = meanings.length > 1
        ? { ...rest, meanings, multiMeaning: true }
        : rest;
    }
    return item;
  });
}

function prepareDefaultFlashcardForSeed(card, targetLang, index) {
  const targetField = languageField(targetLang);
  const doc = {
    korean: card.korean,
    english: card.english,
    romanization: card.romanization || '',
    officialPronunciation: card.officialPronunciation || card.romanization || '',
    learnerPronunciation: card.learnerPronunciation || '',
    pronunciationConfidence: card.pronunciationConfidence || undefined,
    officialPronunciationSource: card.officialPronunciationSource || '',
    learnerPronunciationSource: card.learnerPronunciationSource || '',
    conceptId: card.conceptId || '',
    senseId: card.senseId || '',
    conceptGloss: card.conceptGloss || card.english || '',
    learningLevel: card.learningLevel,
    firstIntroducedLevel: card.firstIntroducedLevel,
    activeLevels: card.activeLevels || (card.learningLevel ? [card.learningLevel] : []),
    levelTrack: card.levelTrack || '',
    supportLevel: card.supportLevel || '',
    skillStrands: card.skillStrands || [],
    lessonRole: card.lessonRole || '',
    coreRequired: card.coreRequired === true,
    certificateEligible: card.certificateEligible === true,
    branchType: card.branchType || '',
    lessonWeight: card.lessonWeight,
    checkpointType: card.checkpointType || '',
    repairFocus: card.repairFocus || [],
    longActivityTypes: card.longActivityTypes || [],
    objective: card.objective || '',
    sourceClassLessonKey: card.sourceClassLessonKey || '',
    sourceClassLessonKeys: card.sourceClassLessonKeys || (card.sourceClassLessonKey ? [card.sourceClassLessonKey] : []),
    levelUses: card.levelUses || {},
    usage: card.usage && typeof card.usage === 'object' && !Array.isArray(card.usage)
      ? { ...card.usage }
      : {},
    category: Array.isArray(card.category) ? card.category : [card.category || 'uncategorized'],
    isDefault: true,
    defaultIndex: index,
    targetLang,
    nativeLang: 'en',
    masteryLevel: 3,
    correctCount: 0,
    incorrectCount: 0,
  };

  doc[targetField] = targetField === 'korean' ? card.korean : (card[targetField] || card.korean);
  normalizeFlashcardsForLanguagePair([doc], targetLang, 'en');
  return doc;
}

function prepareDefaultFlashcardsForSeed(cards, targetLang, startIndex = 0) {
  const docs = (cards || []).map((card, index) => prepareDefaultFlashcardForSeed(card, card.targetLang || targetLang, startIndex + index));
  const normalized = normalizeFlashcardsForLanguagePair(docs, targetLang, 'en');
  normalized.forEach((doc, index) => {
    doc.defaultIndex = startIndex + index;
  });
  return normalized;
}

module.exports = {
  LANGUAGE_FIELDS,
  languageField,
  normalizeConceptKey,
  parseConceptGloss,
  normalizeLessonForLanguagePair,
  normalizeFlashcardsForLanguagePair,
  prepareDefaultFlashcardForSeed,
  prepareDefaultFlashcardsForSeed,
};
