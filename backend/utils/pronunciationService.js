const Pronunciation = require('../models/Pronunciation');
const { batchNativePhonetic, batchRomanize } = require('./translationService');
const { languageField } = require('./languageConcepts');
const {
  getLanguageMetadata,
  isLatinScript,
  needsPronunciationGuide,
  normalizeLangCode,
} = require('./languageMetadata');

const MEMORY_CACHE_TTL = 24 * 60 * 60 * 1000;
const memoryCache = new Map();

function cleanText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeTextKey(value) {
  return cleanText(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ');
}

function stripMarks(value) {
  return cleanText(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function targetTextFromItem(item = {}, targetLang = 'ko') {
  const targetField = languageField(targetLang);
  return cleanText(
    item.targetText
    || item[targetField]
    || item.korean
    || item.english
    || ''
  );
}

function seededOfficialFromItem(item = {}) {
  return cleanText(
    item.officialPronunciation
    || item.romanization
    || item.pronunciation
    || ''
  );
}

function cacheKey(targetLang, nativeLang, targetText) {
  return `${normalizeLangCode(targetLang)}:${normalizeLangCode(nativeLang)}:${normalizeTextKey(targetText)}`;
}

function getMemory(key) {
  const cached = memoryCache.get(key);
  if (!cached || Date.now() - cached.timestamp > MEMORY_CACHE_TTL) {
    memoryCache.delete(key);
    return null;
  }
  return cached.value;
}

function setMemory(key, value) {
  memoryCache.set(key, { value, timestamp: Date.now() });
}

const COMMON_SYLLABLES = {
  hi: {
    ni: 'नी',
    hao: 'हाओ',
    hello: 'हेलो',
    an: 'आन',
    annyeong: 'अन्योंग',
    nyeong: 'न्योंग',
    ha: 'हा',
    se: 'से',
    yo: 'यो',
    gam: 'गाम',
    sa: 'सा',
    hap: 'हाप',
    ni2: 'नी',
    da: 'दा',
  },
  ar: {
    ni: 'ني',
    hao: 'هاو',
    hello: 'هيلو',
    an: 'آن',
    annyeong: 'أنيونغ',
    nyeong: 'نيونغ',
    ha: 'ها',
    se: 'سي',
    yo: 'يو',
    gam: 'غام',
    sa: 'سا',
    hap: 'هاب',
    da: 'دا',
  },
  he: {
    ni: 'ני',
    hao: 'האו',
    hello: 'הלו',
    an: 'אן',
    annyeong: 'אניונג',
    nyeong: 'ניונג',
    ha: 'הא',
    se: 'סה',
    yo: 'יו',
  },
  ko: {
    ni: '니',
    hao: '하오',
    hello: '헬로',
    an: '안',
    annyeong: '안녕',
    nyeong: '녕',
    ha: '하',
    se: '세',
    yo: '요',
  },
  ru: {
    ni: 'ни',
    hao: 'хао',
    hello: 'хелло',
    an: 'ан',
    annyeong: 'аннён',
    nyeong: 'нён',
    ha: 'ха',
    se: 'се',
    yo: 'йо',
  },
  bn: {
    ni: 'নী',
    hao: 'হাও',
    hello: 'হেলো',
    an: 'আন',
    ha: 'হা',
    se: 'সে',
    yo: 'ইয়ো',
  },
  ta: {
    ni: 'நீ',
    hao: 'ஹாவ்',
    hello: 'ஹலோ',
    an: 'ஆன்',
    ha: 'ஹா',
    se: 'சே',
    yo: 'யோ',
  },
  th: {
    ni: 'นี',
    hao: 'ห่าว',
    hello: 'เฮลโล',
    an: 'อัน',
    ha: 'ฮา',
    se: 'เซ',
    yo: 'โย',
  },
};

function normalizeRomanToken(token) {
  return stripMarks(token)
    .toLowerCase()
    .replace(/[0-9]/g, '')
    .replace(/[^a-z]+/g, '');
}

function localNativeScriptGuide(romanInput, nativeLang) {
  const lang = normalizeLangCode(nativeLang);
  const dictionary = COMMON_SYLLABLES[lang];
  if (!dictionary) return '';

  const tokens = stripMarks(romanInput)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, ' ')
    .split(/[\s-]+/)
    .map(normalizeRomanToken)
    .filter(Boolean);

  if (tokens.length === 0) return '';
  const converted = tokens.map(token => dictionary[token] || '');
  if (converted.some(Boolean)) {
    return converted.map((value, index) => value || tokens[index]).join(' ').trim();
  }
  return '';
}

function pronunciationsDiffer(a, b) {
  const left = normalizeTextKey(a);
  const right = normalizeTextKey(b);
  return !!left && !!right && left !== right;
}

function buildPronunciationGuide(entry, targetText) {
  const official = cleanText(entry.officialPronunciation);
  const learner = cleanText(entry.learnerPronunciation);
  const target = cleanText(targetText);
  const showLearner = !!learner && pronunciationsDiffer(learner, target);
  const showOfficial = !!official
    && pronunciationsDiffer(official, target)
    && (!learner || pronunciationsDiffer(official, learner));

  return {
    learner,
    official,
    confidence: entry.pronunciationConfidence || 'audioFirst',
    showLearner,
    showOfficial,
    note: entry.pronunciationConfidence === 'audioFirst'
      ? 'Listen closely. This spelling is only a guide.'
      : '',
  };
}

function applyPronunciationToItem(item, entry, targetText) {
  const official = cleanText(entry.officialPronunciation);
  const learner = cleanText(entry.learnerPronunciation);

  item.officialPronunciation = official;
  item.learnerPronunciation = learner;
  item.pronunciationConfidence = entry.pronunciationConfidence || 'audioFirst';
  item.officialPronunciationSource = entry.officialPronunciationSource || 'missing';
  item.learnerPronunciationSource = entry.learnerPronunciationSource || 'missing';
  item.pronunciationGuide = buildPronunciationGuide(item, targetText);

  if (official) {
    item.romanization = official;
    item.pronunciation = official;
  }

  return item;
}

async function loadCachedPronunciations(requests, targetLang, nativeLang, useCache) {
  if (!useCache || requests.length === 0) return new Map();

  const cached = new Map();
  const missingKeys = [];
  const requestByKey = new Map();

  for (const request of requests) {
    const key = cacheKey(targetLang, nativeLang, request.targetText);
    const memory = getMemory(key);
    if (memory) {
      cached.set(key, memory);
    } else {
      missingKeys.push(request.normalizedTargetText);
      requestByKey.set(request.normalizedTargetText, key);
    }
  }

  if (missingKeys.length === 0) return cached;

  try {
    const docs = await Pronunciation.find({
      targetLang,
      nativeLang,
      normalizedTargetText: { $in: Array.from(new Set(missingKeys)) },
    }).lean();

    docs.forEach((doc) => {
      const key = requestByKey.get(doc.normalizedTargetText);
      if (!key) return;
      cached.set(key, doc);
      setMemory(key, doc);
    });
  } catch (error) {
    console.error('Pronunciation cache lookup failed:', error.message);
  }

  return cached;
}

async function generateOfficialPronunciations(requests, targetLang, allowExternal) {
  const officialByText = new Map();
  const romanizeTexts = [];
  const romanizeTargets = [];
  const targetIsLatin = isLatinScript(targetLang);

  for (const request of requests) {
    const seeded = cleanText(request.seededOfficial);
    if (seeded) {
      officialByText.set(request.normalizedTargetText, {
        officialPronunciation: seeded,
        officialPronunciationSource: 'seeded',
      });
      continue;
    }

    if (targetIsLatin) {
      officialByText.set(request.normalizedTargetText, {
        officialPronunciation: request.targetText,
        officialPronunciationSource: 'spelling',
      });
      continue;
    }

    if (allowExternal && needsPronunciationGuide(targetLang)) {
      romanizeTexts.push(request.targetText);
      romanizeTargets.push(request.normalizedTargetText);
    } else {
      officialByText.set(request.normalizedTargetText, {
        officialPronunciation: '',
        officialPronunciationSource: 'missing',
      });
    }
  }

  if (romanizeTexts.length > 0) {
    const generated = await batchRomanize(romanizeTexts, targetLang);
    generated.forEach((pronunciation, index) => {
      officialByText.set(romanizeTargets[index], {
        officialPronunciation: cleanText(pronunciation),
        officialPronunciationSource: pronunciation ? 'generated' : 'missing',
      });
    });
  }

  return officialByText;
}

async function generateLearnerPronunciations(entries, nativeLang, targetLang, allowExternal) {
  const nativeIsLatin = isLatinScript(nativeLang);
  const toGenerate = [];
  const toGenerateIndices = [];

  entries.forEach((entry, index) => {
    const romanInput = cleanText(entry.officialPronunciation || (isLatinScript(targetLang) ? entry.targetText : ''));

    if (!romanInput) {
      entry.learnerPronunciation = '';
      entry.learnerPronunciationSource = 'missing';
      entry.pronunciationConfidence = 'audioFirst';
      return;
    }

    if (nativeIsLatin || normalizeLangCode(nativeLang) === normalizeLangCode(targetLang)) {
      entry.learnerPronunciation = romanInput;
      entry.learnerPronunciationSource = 'same-as-official';
      entry.pronunciationConfidence = 'strong';
      return;
    }

    toGenerate.push(romanInput);
    toGenerateIndices.push(index);
  });

  let generated = [];
  if (toGenerate.length > 0 && allowExternal) {
    generated = await batchNativePhonetic(toGenerate, targetLang, nativeLang);
  }

  toGenerateIndices.forEach((entryIndex, index) => {
    const entry = entries[entryIndex];
    const external = cleanText(generated[index]);
    const fallback = localNativeScriptGuide(toGenerate[index], nativeLang);
    const learner = external || fallback || '';

    entry.learnerPronunciation = learner;
    entry.learnerPronunciationSource = external ? 'generated' : (fallback ? 'fallback' : 'missing');
    entry.pronunciationConfidence = learner ? 'approximate' : 'audioFirst';
  });

  return entries;
}

async function persistGenerated(entries, targetLang, nativeLang, useCache) {
  if (!useCache || entries.length === 0) return;

  const operations = entries.map(entry => ({
    updateOne: {
      filter: {
        targetLang,
        nativeLang,
        normalizedTargetText: entry.normalizedTargetText,
      },
      update: {
        $set: {
          targetText: entry.targetText,
          officialPronunciation: entry.officialPronunciation,
          learnerPronunciation: entry.learnerPronunciation,
          pronunciationConfidence: entry.pronunciationConfidence,
          officialPronunciationSource: entry.officialPronunciationSource,
          learnerPronunciationSource: entry.learnerPronunciationSource,
          error: entry.error || '',
        },
        $setOnInsert: {
          targetLang,
          nativeLang,
          normalizedTargetText: entry.normalizedTargetText,
        },
      },
      upsert: true,
    },
  }));

  try {
    await Pronunciation.bulkWrite(operations, { ordered: false });
    entries.forEach((entry) => {
      setMemory(cacheKey(targetLang, nativeLang, entry.targetText), entry);
    });
  } catch (error) {
    console.error('Pronunciation cache persist failed:', error.message);
  }
}

async function buildPronunciationEntries(requests, targetLang, nativeLang, options = {}) {
  const allowExternal = options.allowExternal !== false;
  const officialByText = await generateOfficialPronunciations(requests, targetLang, allowExternal);

  const entries = requests.map((request) => {
    const official = officialByText.get(request.normalizedTargetText) || {};
    return {
      targetLang,
      nativeLang,
      targetText: request.targetText,
      normalizedTargetText: request.normalizedTargetText,
      officialPronunciation: official.officialPronunciation || '',
      officialPronunciationSource: official.officialPronunciationSource || 'missing',
      learnerPronunciation: '',
      learnerPronunciationSource: 'missing',
      pronunciationConfidence: 'audioFirst',
    };
  });

  return generateLearnerPronunciations(entries, nativeLang, targetLang, allowExternal);
}

async function enrichItemsWithPronunciation(items, options = {}) {
  if (!Array.isArray(items) || items.length === 0) return items;

  const targetLang = normalizeLangCode(options.targetLang || 'ko');
  const nativeLang = normalizeLangCode(options.nativeLang || 'en');
  const useCache = options.useCache !== false;
  const distinctRequests = [];
  const requestByNormalizedText = new Map();

  items.forEach((item) => {
    const targetText = targetTextFromItem(item, targetLang);
    if (!targetText) return;

    const normalizedTargetText = normalizeTextKey(targetText);
    if (!requestByNormalizedText.has(normalizedTargetText)) {
      const request = {
        targetText,
        normalizedTargetText,
        seededOfficial: seededOfficialFromItem(item),
      };
      requestByNormalizedText.set(normalizedTargetText, request);
      distinctRequests.push(request);
    } else {
      const request = requestByNormalizedText.get(normalizedTargetText);
      if (!request.seededOfficial) request.seededOfficial = seededOfficialFromItem(item);
    }
  });

  if (distinctRequests.length === 0) return items;

  const cached = await loadCachedPronunciations(distinctRequests, targetLang, nativeLang, useCache);
  const missing = distinctRequests.filter(request => !cached.has(cacheKey(targetLang, nativeLang, request.targetText)));
  const generated = await buildPronunciationEntries(missing, targetLang, nativeLang, options);
  await persistGenerated(generated, targetLang, nativeLang, useCache);

  const entryByText = new Map();
  for (const request of distinctRequests) {
    const key = cacheKey(targetLang, nativeLang, request.targetText);
    const entry = cached.get(key) || generated.find(item => item.normalizedTargetText === request.normalizedTargetText);
    if (entry) entryByText.set(request.normalizedTargetText, entry);
  }

  items.forEach((item) => {
    const targetText = targetTextFromItem(item, targetLang);
    const entry = entryByText.get(normalizeTextKey(targetText));
    if (entry) applyPronunciationToItem(item, entry, targetText);
  });

  return items;
}

async function enrichFlashcardsWithPronunciation(cards, targetLang, nativeLang, options = {}) {
  return enrichItemsWithPronunciation(cards, { ...options, targetLang, nativeLang });
}

async function enrichLessonWithPronunciation(lessonObj, targetLang, nativeLang, options = {}) {
  if (!lessonObj || !Array.isArray(lessonObj.content)) return lessonObj;
  await enrichItemsWithPronunciation(lessonObj.content, { ...options, targetLang, nativeLang });
  return lessonObj;
}

function summarizePronunciationDisplay(item = {}, targetText = '') {
  return buildPronunciationGuide(item, targetText || targetTextFromItem(item));
}

module.exports = {
  buildPronunciationEntries,
  enrichFlashcardsWithPronunciation,
  enrichItemsWithPronunciation,
  enrichLessonWithPronunciation,
  getLanguageMetadata,
  localNativeScriptGuide,
  normalizeTextKey,
  summarizePronunciationDisplay,
};
