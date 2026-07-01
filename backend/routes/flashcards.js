const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const UserCardPreference = require('../models/UserCardPreference');
const GuestSession = require('../models/GuestSession');
const { verifyToken, isOwner } = require('../middleware/auth');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { batchTranslateRaw } = require('../utils/translationService');
const { languageField, normalizeFlashcardsForLanguagePair } = require('../utils/languageConcepts');
const { enrichFlashcardsWithPronunciation } = require('../utils/pronunciationService');
const { clampRating, reviewStateForCard, scheduleFlashcardReview } = require('../utils/reviewScheduler');
const { buildDefaultFlashcardSourceForLanguage } = require('../utils/targetAuthoredPracticeContent');
const { sendServerError, sendClientError } = require('../utils/sendError');

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

async function unusedLegacyPronunciationHelpers(cards, targetLang, nativeLang) {
  return cards;
  /*
  if (!ROMANIZATION_LANGS.has(targetLang)) {
    // Latin-script language — no romanization needed
    cards.forEach(c => { c.romanization = ''; });
    return;
  }

  // Expire cache periodically
  if (Date.now() - romanCacheTimestamp > ROMAN_CACHE_TTL) {
    romanCache.clear();
    romanCacheTimestamp = Date.now();
  }

  const uncached = [];
  const uncachedIndices = [];

  for (let i = 0; i < cards.length; i++) {
    const text = targetLang === 'ko'
      ? (cards[i].korean || '')
      : (cards[i][targetLang] || cards[i].korean || '');
    if (!text.trim()) { cards[i].romanization = ''; continue; }
    const key = `${targetLang}:${text}`;
    if (romanCache.has(key)) {
      cards[i].romanization = romanCache.get(key);
    } else {
      uncached.push(text);
      uncachedIndices.push(i);
    }
  }

  if (uncached.length > 0) {
    try {
      const romanizations = await batchRomanize(uncached, targetLang);
      for (let k = 0; k < romanizations.length; k++) {
        const rom = romanizations[k] || '';
        cards[uncachedIndices[k]].romanization = rom;
        romanCache.set(`${targetLang}:${uncached[k]}`, rom);
      }
    } catch (err) {
      console.error('Romanization generation failed:', err.message);
      // Fallback: clear romanization rather than show wrong Korean pronunciation
      uncachedIndices.forEach(i => { cards[i].romanization = ''; });
    }
  }
  */
}

/**
 * For non-Latin native speakers learning a non-Latin target language,
 * replace Latin romanization with native-script phonetic approximation.
 * e.g. Arabic speaker learning Korean: "annyeonghaseyo" → "آن نيونغ ها سي يو"
 * Latin-script native speakers keep standard romanization as-is.
 */
async function applyNativePhonetics(cards, targetLang, nativeLang) {
  return cards;
  /*
  // Only needed when both target and native use non-Latin scripts
  if (!ROMANIZATION_LANGS.has(targetLang) || !NON_LATIN_LANGS.has(nativeLang)) {
    return cards;
  }

  const cacheKey = `${nativeLang}:${targetLang}`;
  let cache = phoneticCache.get(cacheKey);
  if (!cache || Date.now() - cache.timestamp > PHONETIC_CACHE_TTL) {
    cache = { map: new Map(), timestamp: Date.now() };
    phoneticCache.set(cacheKey, cache);
  }

  // Collect romanizations that need conversion (not already cached)
  const romanToConvert = [];
  const indexMap = []; // maps back to card index

  for (let i = 0; i < cards.length; i++) {
    const roman = cards[i].romanization || '';
    if (!roman.trim()) continue;
    if (cache.map.has(roman)) {
      cards[i].romanization = cache.map.get(roman);
    } else {
      romanToConvert.push(roman);
      indexMap.push(i);
    }
  }

  if (romanToConvert.length > 0) {
    try {
      const phonetics = await batchNativePhonetic(romanToConvert, targetLang, nativeLang);
      for (let k = 0; k < phonetics.length; k++) {
        const phonetic = phonetics[k];
        if (phonetic) {
          cache.map.set(romanToConvert[k], phonetic);
          cards[indexMap[k]].romanization = phonetic;
        }
        // If empty, keep original Latin romanization as fallback
      }
    } catch (err) {
      console.error('Native phonetic conversion failed:', err.message);
    }
  }

  return cards;
  */
}

/**
 * Fill missing native language fields on cards.
 * If the card already has the translation in DB, it's already on the object.
 * For cards missing the native field, translate NOW before sending the response,
 * then persist translations to DB in the background for future cache hits.
 */
function normalizeLangCode(code) {
  const value = String(code || '').trim().toLowerCase();
  const aliases = { kr: 'ko', cn: 'zh', jp: 'ja', iw: 'he', in: 'id', tl: 'fil' };
  if (aliases[value]) return aliases[value];
  const base = value.split(/[-_]/)[0];
  return aliases[base] || base || value;
}

function nativeTranslationSource(card, targetLang) {
  const target = normalizeLangCode(targetLang);
  const conceptGloss = String(card?.conceptGloss || '').trim();
  const english = String(card?.english || '').trim();
  if (conceptGloss && (target === 'en' || card?.usage?.targetAuthored)) {
    return conceptGloss;
  }
  return conceptGloss || english;
}

async function fillNativeTranslations(cards, nativeLang, targetLang = '') {
  if (nativeLang === 'en') return cards;

  const nativeField = nativeLang === 'ko' ? 'korean' : nativeLang;

  // Collect cards missing the native field
  const missingIndices = [];
  const missingTexts = [];
  for (let i = 0; i < cards.length; i++) {
    const sourceText = nativeTranslationSource(cards[i], targetLang);
    if (!cards[i][nativeField] && sourceText) {
      missingIndices.push(i);
      missingTexts.push(sourceText);
    }
  }
  if (missingIndices.length === 0) return cards;

  // Translate NOW — before the response is sent
  try {
    const CHUNK = 50;
    for (let start = 0; start < missingTexts.length; start += CHUNK) {
      const chunk = missingTexts.slice(start, start + CHUNK);
      const results = await batchTranslateRaw(chunk, 'en', nativeLang);
      for (let k = 0; k < results.length; k++) {
        const translated = results[k]?.failed ? '' : results[k]?.text;
        const cardIdx = missingIndices[start + k];
        if (translated) {
          cards[cardIdx][nativeField] = translated;
        } else {
          // Individual card translation returned empty — mark as pending
          cards[cardIdx]._translationPending = true;
        }
      }
    }
  } catch (err) {
    // Translation API failed — mark untranslated cards as pending (frontend shows loading)
    for (const idx of missingIndices) {
      if (!cards[idx][nativeField]) cards[idx]._translationPending = true;
    }
    console.error('Native translation failed:', err.message);
  }

  // Background: persist translations to DB so future requests are fast from cache
  const dbUpdates = [];
  for (const idx of missingIndices) {
    const card = cards[idx];
    if (card._id && card[nativeField] && card[nativeField] !== card.english) {
      dbUpdates.push({ id: card._id, text: card[nativeField] });
    }
  }
  if (dbUpdates.length > 0) {
    persistNativeTranslations(dbUpdates, nativeField).catch(() => {});
  }

  return cards;
}

// Background DB persistence — runs after response is sent
async function persistNativeTranslations(updates, nativeField) {
  try {
    const bulkOps = updates.map(({ id, text }) => ({
      updateOne: {
        filter: { _id: id },
        update: { $set: { [nativeField]: text } },
      },
    }));
    if (bulkOps.length > 0) {
      await Flashcard.bulkWrite(bulkOps);
      defaultCardsCache.clear();
      console.log(`Persisted ${bulkOps.length} native translations (${nativeField})`);
    }
  } catch (err) {
    console.error('Persist native translations failed:', err.message);
  }
}

// --- In-memory cache for default cards per targetLang ---
// Default cards contain translations for ALL native languages as fields on each
// document, so we only filter by targetLang (not nativeLang).
const defaultCardsCache = new Map(); // `${targetLang}` -> { cards, timestamp }
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

function flashcardTargetKey(card, targetLang) {
  const field = languageField(targetLang);
  return String(card?.[field] || card?.korean || '').trim().toLowerCase();
}

function overlayGeneratedDefaultMetadata(cards, targetLang) {
  const generated = buildDefaultFlashcardSourceForLanguage(targetLang, cards.map(card => ({ ...card })));
  if (!generated.length) return cards;
  const generatedByTarget = new Map(generated.map(card => [flashcardTargetKey(card, targetLang), card]));
  const metadataFields = [
    'conceptId',
    'senseId',
    'conceptGloss',
    'learningLevel',
    'firstIntroducedLevel',
    'activeLevels',
    'levelTrack',
    'supportLevel',
    'skillStrands',
    'lessonRole',
    'coreRequired',
    'certificateEligible',
    'branchType',
    'lessonWeight',
    'checkpointType',
    'repairFocus',
    'longActivityTypes',
    'objective',
    'sourceClassLessonKey',
    'sourceClassLessonKeys',
    'levelUses',
    'quizOptionMode',
    'writingMode',
    'usage',
  ];

  return cards.map((card) => {
    const source = generatedByTarget.get(flashcardTargetKey(card, targetLang));
    if (!source) return card;
    const next = { ...source, ...card };
    metadataFields.forEach((field) => {
      const value = card[field];
      const isMissingArray = Array.isArray(value) && value.length === 0;
      const isMissingObject = value && typeof value === 'object' && !Array.isArray(value) && Object.keys(value).length === 0;
      if (value == null || value === '' || isMissingArray || isMissingObject) {
        next[field] = source[field];
      }
    });
    return next;
  });
}

async function getDefaultCards(targetLang = 'ko') {
  const cacheKey = targetLang;
  const cached = defaultCardsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.cards;
  }
  const cards = await Flashcard.find({ isDefault: true, targetLang })
    .sort({ defaultIndex: 1 })
    .lean();
  const normalizedCards = overlayGeneratedDefaultMetadata(cards, targetLang);
  defaultCardsCache.set(cacheKey, { cards: normalizedCards, timestamp: Date.now() });
  return normalizedCards;
}

// --- Seeded PRNG and weighted shuffle ---
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xFFFFFFFF;
    return (s >>> 0) / 0xFFFFFFFF;
  };
}

const MASTERY_WEIGHTS = { 1: 3.0, 2: 2.0, 3: 1.5, 4: 1.0, 5: 0.3 };

function weightedShuffle(cards, seed) {
  const rng = seededRandom(seed);
  return cards
    .map((card) => {
      const reviewState = card.reviewState || reviewStateForCard(card);
      const dueWeight = reviewState.due ? 1.8 : 0.35;
      const weight = (MASTERY_WEIGHTS[card.masteryLevel] || 1) * dueWeight;
      return { card, sort: -Math.log(rng()) / weight };
    })
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.card);
}

function slugForConcept(text) {
  const value = String(text || '').trim().toLowerCase();
  const ascii = value
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 72);
  if (ascii) return ascii;
  return value ? `u_${Buffer.from(value, 'utf8').toString('hex').slice(0, 72)}` : 'item';
}

function applyReviewState(card) {
  const next = { ...card };
  next.masteryLevel = clampRating(next.masteryLevel, 3);
  next.reviewState = reviewStateForCard(next);
  return next;
}

function preferencePayload(card, userId, scheduled, nativeLang = '') {
  return {
    userId,
    cardId: card._id.toString(),
    targetLang: card.targetLang,
    nativeLang,
    conceptId: card.conceptId || '',
    senseId: card.senseId || '',
    firstIntroducedLevel: card.firstIntroducedLevel || card.learningLevel,
    activeLevels: card.activeLevels || (card.learningLevel ? [card.learningLevel] : []),
    levelUses: card.levelUses || {},
    lessonRole: card.lessonRole || card.usage?.lessonRole || '',
    branchType: card.branchType || card.usage?.branchType || '',
    lessonWeight: card.lessonWeight || card.usage?.lessonWeight,
    checkpointType: card.checkpointType || card.usage?.checkpointType || '',
    repairFocus: card.repairFocus || card.usage?.repairFocus || [],
    longActivityTypes: card.longActivityTypes || card.usage?.longActivityTypes || [],
    masteryLevel: scheduled.masteryLevel,
    reviewCount: scheduled.reviewCount,
    ease: scheduled.ease,
    lastReviewedAt: scheduled.lastReviewedAt,
    nextReviewAt: scheduled.nextReviewAt,
    lastReviewResult: scheduled.lastReviewResult,
    updatedAt: new Date(),
  };
}

// --- Helper: parse shuffle/seed/categories from query ---
function parseFilterParams(query) {
  const shuffle = query.shuffle !== 'false'; // default true
  const seed = parseInt(query.seed) || Math.floor(Math.random() * 2147483647);
  const categoryFilter = query.categories
    ? new Set(query.categories.split(',').map(c => c.trim().toLowerCase()))
    : null;
  return { shuffle, seed, categoryFilter };
}

function applyFilterAndShuffle(cards, { shuffle, seed, categoryFilter }) {
  let filtered = categoryFilter
    ? cards.filter(c => categoryFilter.has(normalizeCategory(c.category)[0].toLowerCase()))
    : cards;
  if (shuffle) {
    filtered = weightedShuffle(filtered, seed);
  }
  return filtered;
}

// --- Public routes (no auth required) ---

// Category metadata — lightweight list of categories + counts
router.get('/categories', async (req, res) => {
  try {
    const targetLang = req.query.targetLang || 'ko';
    const nativeLang = req.query.nativeLang || 'en';
    const defaultCards = normalizeFlashcardsForLanguagePair(
      (await getDefaultCards(targetLang)).map(card => ({ ...card })),
      targetLang,
      nativeLang,
    );
    const categoryMap = {};
    for (const card of defaultCards) {
      const primary = normalizeCategory(card.category)[0];
      categoryMap[primary] = (categoryMap[primary] || 0) + 1;
    }
    const categories = Object.entries(categoryMap)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
    res.json({ categories, total: defaultCards.length });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_GET_CATEGORIES_FAILED');
  }
});

// All cards for a specific category — used by sidebar for individual card selection (no pagination)
router.get('/category-cards', async (req, res) => {
  try {
    const targetLang = req.query.targetLang || 'ko';
    const nativeLang = req.query.nativeLang || 'en';
    const category = (req.query.category || '').toLowerCase();
    if (!category) return sendClientError(res, 400, 'FLASHCARDS_CATEGORY_CARDS_CATEGORY_REQUIRED', 'category is required');

    const defaultCards = normalizeFlashcardsForLanguagePair(
      (await getDefaultCards(targetLang)).map(card => ({ ...card })),
      targetLang,
      nativeLang,
    );
    const targetField = languageField(targetLang);
    const nativeField = languageField(nativeLang);

    const filtered = defaultCards
      .filter(c => normalizeCategory(c.category)[0].toLowerCase() === category)
      .map(c => ({
        _id: c._id,
        english: c.english || '',
        [targetField]: c[targetField] || c.korean || '',
        [nativeField]: c[nativeField] || '',
      }));

    // Translate missing native fields (same logic as main flashcard routes)
    await fillNativeTranslations(filtered, nativeLang, targetLang);
    await enrichFlashcardsWithPronunciation(filtered, targetLang, nativeLang);

    // Strip helper fields before sending
    const cards = filtered.map(c => ({
      _id: c._id.toString(),
      [targetField]: c[targetField] || '',
      [nativeField]: c[nativeField] || c.english || '',
      officialPronunciation: c.officialPronunciation || '',
      learnerPronunciation: c.learnerPronunciation || '',
      pronunciationConfidence: c.pronunciationConfidence || 'audioFirst',
      pronunciationGuide: c.pronunciationGuide || null,
      ...(c._translationPending ? { _translationPending: true } : {}),
    }));

    res.json({ cards });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_CATEGORY_CARDS_FAILED');
  }
});

// Guest flashcards — returns default vocabulary set (read-only)
router.get('/guest', async (req, res) => {
  // Track guest session (fire-and-forget, non-blocking)
  try {
    const ip = getClientIp(req);
    const nativeLang = req.query.nativeLang || '';
    const targetLang = req.query.targetLang || '';
    const geo = getGeoInfo(ip);
    const ua = (req.headers['user-agent'] || '').substring(0, 500);
    const referrer = (req.headers['referer'] || req.headers['referrer'] || '').substring(0, 500);
    const uaLower = ua.toLowerCase();
    const deviceType = /mobile|android|iphone|ipod/.test(uaLower)
      ? 'mobile'
      : /tablet|ipad/.test(uaLower)
        ? 'tablet'
        : 'desktop';
    const today = new Date(); today.setHours(0, 0, 0, 0);
    GuestSession.findOneAndUpdate(
      { ip, firstSeen: { $gte: today } },
      {
        $set: {
          lastSeen: new Date(),
          country: geo.country,
          countryCode: geo.countryCode,
          city: geo.city,
          nativeLanguage: nativeLang,
          targetLanguage: targetLang,
          userAgent: ua,
          deviceType,
          ...(referrer && { referrer }),
        },
        $inc: { pageViews: 1 },
      },
      { upsert: true, setDefaultsOnInsert: true }
    ).catch(() => {});
  } catch (_) {}

  try {
    const targetLang = req.query.targetLang;
    const nativeLang = req.query.nativeLang;
    if (!targetLang || !nativeLang) {
      return sendClientError(res, 400, 'FLASHCARDS_GUEST_MISSING_LANGS', 'nativeLang and targetLang query parameters are required');
    }
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit) || 50));
    const { shuffle, seed, categoryFilter } = parseFilterParams(req.query);

    const defaultCards = await getDefaultCards(targetLang);
    const targetFieldName = languageField(targetLang);

    // Prepare guest cards with default mastery
    const allGuestCards = defaultCards.map((card) => {
      const c = { ...card, _id: card._id.toString(), masteryLevel: 3, correctCount: 0, incorrectCount: 0 };
      if (!c[targetFieldName] && c.korean) c[targetFieldName] = c.korean;
      return applyReviewState(c);
    });
    const normalizedGuestCards = normalizeFlashcardsForLanguagePair(allGuestCards, targetLang, nativeLang);

    // Apply category filter + weighted shuffle
    const processed = applyFilterAndShuffle(normalizedGuestCards, { shuffle, seed, categoryFilter });

    const total = processed.length;
    const start = (page - 1) * limit;
    const pageCards = processed.slice(start, start + limit);

    // Translate missing native language fields (English → native), with DB caching
    await fillNativeTranslations(pageCards, nativeLang, targetLang);
    await enrichFlashcardsWithPronunciation(pageCards, targetLang, nativeLang);

    res.json({ cards: pageCards, total, page, limit, hasMore: start + limit < total, seed });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_GUEST_FAILED');
  }
});

// --- Authenticated routes ---
router.use(verifyToken);

// Card IDs the user has added to their Focus deck for the current language pair.
// Lets the client mark Focus state on any card, even ones not currently loaded.
router.get('/focus-ids', async (req, res) => {
  try {
    const query = { userId: req.userId, focus: true };
    if (req.query.targetLang) query.targetLang = req.query.targetLang;
    if (req.query.nativeLang) query.nativeLang = req.query.nativeLang;
    const prefs = await UserCardPreference.find(query).select('cardId').lean();
    res.json({ ids: prefs.map(p => p.cardId) });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_FOCUS_IDS_FAILED');
  }
});

// Get flashcards for user — default deck + user's own cards
router.get('/user/:userId', isOwner('userId'), async (req, res) => {
  try {
    const { userId } = req.params;
    const targetLang = req.query.targetLang;
    const nativeLang = req.query.nativeLang;
    if (!targetLang || !nativeLang) {
      return sendClientError(res, 400, 'FLASHCARDS_USER_MISSING_LANGS', 'nativeLang and targetLang query parameters are required');
    }
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit) || 50));
    const { shuffle, seed, categoryFilter } = parseFilterParams(req.query);

    // Default cards from DB (cached, filtered by targetLang)
    const defaultCards = await getDefaultCards(targetLang);

    // User's own private flashcards (filtered by targetLang + nativeLang)
    const userFlashcards = await Flashcard.find({ userId, targetLang, nativeLang }).lean();
    const normalizedUserCards = userFlashcards.map(fc => ({
      ...fc,
      category: normalizeCategory(fc.category),
    }));

    // Merge persisted masteryLevel preferences into default cards
    const preferences = await UserCardPreference.find({ userId }).lean();
    const prefMap = new Map(preferences.map(p => [p.cardId, p]));

    const targetFieldName = languageField(targetLang);

    const defaultCardsWithPrefs = defaultCards.map(card => {
      const cardIdStr = card._id.toString();
      const pref = prefMap.get(cardIdStr);
      const c = {
        ...card,
        isDefault: true,
        focus: pref ? !!pref.focus : false,
        masteryLevel: pref ? pref.masteryLevel : 3,
        correctCount: pref ? pref.correctCount || 0 : 0,
        incorrectCount: pref ? pref.incorrectCount || 0 : 0,
        reviewCount: pref ? pref.reviewCount || 0 : 0,
        ease: pref ? pref.ease : 2.5,
        lastReviewedAt: pref ? pref.lastReviewedAt : undefined,
        nextReviewAt: pref ? pref.nextReviewAt : undefined,
        lastReviewResult: pref ? pref.lastReviewResult : undefined,
      };
      if (!c[targetFieldName] && c.korean) c[targetFieldName] = c.korean;
      return applyReviewState(c);
    });
    const normalizedDefaultCards = normalizeFlashcardsForLanguagePair(defaultCardsWithPrefs, targetLang, nativeLang);

    const userCardsWithState = normalizedUserCards.map((c) => {
      const pref = prefMap.get(String(c._id));
      return applyReviewState({ ...c, focus: pref ? !!pref.focus : false });
    });
    const allCards = [...normalizedDefaultCards, ...userCardsWithState];

    // Scope: 'mine' = user-created cards only, 'focus' = Focus-deck cards only,
    // anything else = the full deck. Focus/My Cards are per language pair because
    // allCards is already filtered to this targetLang/nativeLang.
    const scope = String(req.query.scope || 'all').toLowerCase();
    const scopedCards = scope === 'mine'
      ? allCards.filter(c => !c.isDefault)
      : scope === 'focus'
        ? allCards.filter(c => c.focus === true)
        : allCards;

    // Apply category filter + weighted shuffle
    const processed = applyFilterAndShuffle(scopedCards, { shuffle, seed, categoryFilter });

    const total = processed.length;
    const start = (page - 1) * limit;
    const pageCards = processed.slice(start, start + limit);

    // Translate missing native language fields (English → native), with DB caching
    await fillNativeTranslations(pageCards, nativeLang, targetLang);
    await enrichFlashcardsWithPronunciation(pageCards, targetLang, nativeLang);

    res.json({ cards: pageCards, total, page, limit, hasMore: start + limit < total, seed });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_USER_LIST_FAILED', { metadata: { userId: req.params.userId } });
  }
});

// Allowed dynamic language field names on Flashcard (all schema fields except system fields)
const LANG_FIELDS = ['korean','english','es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','ms','fil','tr','bn','ta','th'];

// Create flashcard (uses authenticated user's ID)
router.post('/', async (req, res) => {
  try {
    const {
      romanization,
      officialPronunciation,
      learnerPronunciation,
      pronunciationConfidence,
      audioUrl,
      category,
      targetLang,
      nativeLang,
    } = req.body;

    if (!targetLang || !nativeLang) {
      return sendClientError(res, 400, 'FLASHCARDS_CREATE_MISSING_LANGS', 'targetLang and nativeLang are required');
    }

    // Accept any recognised language field names from the body
    const langData = {};
    for (const field of LANG_FIELDS) {
      if (req.body[field] !== undefined) langData[field] = req.body[field];
    }

    // Require at least one target and one native field
    if (Object.keys(langData).length < 2) {
      return sendClientError(res, 400, 'FLASHCARDS_CREATE_MISSING_TEXT_FIELDS', 'Target and native text fields are required');
    }
    const targetField = languageField(targetLang);
    const nativeField = languageField(nativeLang);
    const targetText = langData[targetField] || langData.korean || '';
    const nativeText = langData[nativeField] || langData.english || '';
    const normalizedTargetLang = normalizeLangCode(targetLang);
    const conceptId = req.body.conceptId || `user.${normalizedTargetLang}.${slugForConcept(targetText)}`;
    const senseId = req.body.senseId || `${conceptId}.sense.${slugForConcept(nativeText || targetText)}`;

    const flashcard = new Flashcard({
      userId: req.userId,
      ...langData,
      conceptId,
      senseId,
      conceptGloss: req.body.conceptGloss || nativeText,
      learningLevel: req.body.learningLevel,
      firstIntroducedLevel: req.body.firstIntroducedLevel || req.body.learningLevel,
      activeLevels: req.body.activeLevels || (req.body.learningLevel ? [req.body.learningLevel] : []),
      levelUses: req.body.levelUses || {},
      romanization,
      officialPronunciation,
      learnerPronunciation,
      pronunciationConfidence,
      audioUrl,
      category: normalizeCategory(category),
      targetLang,
      nativeLang,
    });

    await flashcard.save();

    // Optionally drop the new card straight into the user's Focus deck.
    let focus = false;
    if (req.body.focus) {
      await UserCardPreference.findOneAndUpdate(
        { userId: req.userId, cardId: String(flashcard._id) },
        {
          $set: {
            focus: true,
            targetLang,
            nativeLang,
            conceptId,
            senseId,
            updatedAt: new Date(),
          },
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
      );
      focus = true;
    }

    res.status(201).json({ ...flashcard.toObject(), focus });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_CREATE_FAILED');
  }
});

// Toggle whether a card is in the user's per-language-pair "Focus" deck.
// Works for both default (shared) and user-created cards; the flag lives in
// UserCardPreference keyed by { userId, cardId } so it never leaks across users
// or language pairs.
router.put('/:id/focus', async (req, res) => {
  try {
    const value = req.body.value !== false; // default true
    const flashcard = await Flashcard.findById(req.params.id).lean();
    if (!flashcard) {
      return sendClientError(res, 404, 'FLASHCARDS_FOCUS_NOT_FOUND', 'Flashcard not found');
    }
    // User-created cards may only be flagged by their owner.
    if (!flashcard.isDefault && flashcard.userId && flashcard.userId.toString() !== req.userId) {
      return sendClientError(res, 403, 'FLASHCARDS_FOCUS_NOT_AUTHORIZED', 'Not authorized');
    }
    const pref = await UserCardPreference.findOneAndUpdate(
      { userId: req.userId, cardId: req.params.id },
      {
        $set: {
          focus: value,
          targetLang: req.body.targetLang || flashcard.targetLang || '',
          nativeLang: req.body.nativeLang || flashcard.nativeLang || '',
          conceptId: flashcard.conceptId,
          senseId: flashcard.senseId,
          updatedAt: new Date(),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    ).lean();
    return res.json({ cardId: req.params.id, focus: !!pref.focus });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_FOCUS_TOGGLE_FAILED', { metadata: { cardId: req.params.id } });
  }
});

// Update flashcard (mark correct/incorrect) - verify ownership
router.put('/:id', async (req, res) => {
  const { isCorrect, masteryLevel, nativeLang } = req.body;

  try {
    if (typeof isCorrect !== 'boolean' && masteryLevel === undefined) {
      return sendClientError(res, 400, 'FLASHCARDS_UPDATE_MISSING_FIELDS', 'isCorrect or masteryLevel is required');
    }
    const flashcard = await Flashcard.findById(req.params.id).lean();
    if (!flashcard) {
      return sendClientError(res, 404, 'FLASHCARDS_UPDATE_NOT_FOUND', 'Flashcard not found');
    }

    // Default cards — persist masteryLevel in UserCardPreference
    if (flashcard.isDefault) {
      const existing = await UserCardPreference.findOne({
        userId: req.userId,
        cardId: req.params.id,
      }).lean();
      const scheduled = scheduleFlashcardReview({
        currentRating: existing ? existing.masteryLevel : 3,
        requestedRating: masteryLevel,
        isCorrect,
        reviewCount: existing ? existing.reviewCount : 0,
        ease: existing ? existing.ease : 2.5,
      });
      const update = {
        $set: preferencePayload(flashcard, req.userId, scheduled, nativeLang || flashcard.nativeLang || ''),
        $inc: {
          correctCount: scheduled.correctIncrement,
          incorrectCount: scheduled.incorrectIncrement,
        },
      };

      const updatedPref = await UserCardPreference.findOneAndUpdate(
        { userId: req.userId, cardId: req.params.id },
        update,
        { upsert: true, new: true, setDefaultsOnInsert: true }
      ).lean();

      return res.json(applyReviewState({
        ...flashcard,
        masteryLevel: updatedPref.masteryLevel,
        correctCount: updatedPref.correctCount || 0,
        incorrectCount: updatedPref.incorrectCount || 0,
        reviewCount: updatedPref.reviewCount || 0,
        ease: updatedPref.ease,
        lastReviewedAt: updatedPref.lastReviewedAt,
        nextReviewAt: updatedPref.nextReviewAt,
        lastReviewResult: updatedPref.lastReviewResult,
      }));
    }

    // User-created card — verify ownership and update directly
    if (flashcard.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return sendClientError(res, 403, 'FLASHCARDS_UPDATE_ACCESS_DENIED', 'Access denied');
    }

    const scheduled = scheduleFlashcardReview({
      currentRating: flashcard.masteryLevel,
      requestedRating: masteryLevel,
      isCorrect,
      reviewCount: flashcard.reviewCount || 0,
      ease: flashcard.ease || 2.5,
    });
    const update = {
      $set: {
        lastReviewedAt: scheduled.lastReviewedAt,
        nextReviewAt: scheduled.nextReviewAt,
        lastReviewResult: scheduled.lastReviewResult,
        masteryLevel: scheduled.masteryLevel,
        reviewCount: scheduled.reviewCount,
        ease: scheduled.ease,
      },
      $inc: {
        correctCount: scheduled.correctIncrement,
        incorrectCount: scheduled.incorrectIncrement,
      },
    };

    const updated = await Flashcard.findByIdAndUpdate(req.params.id, update, { new: true }).lean();
    res.json(applyReviewState(updated));
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_UPDATE_FAILED', { metadata: { cardId: req.params.id } });
  }
});

// Delete flashcard - verify ownership
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return sendClientError(res, 404, 'FLASHCARDS_DELETE_NOT_FOUND', 'Flashcard not found');
    }

    // Prevent deletion of default cards
    if (flashcard.isDefault) {
      return sendClientError(res, 403, 'FLASHCARDS_DELETE_DEFAULT_FORBIDDEN', 'Cannot delete default flashcards');
    }

    // Verify ownership
    if (flashcard.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return sendClientError(res, 403, 'FLASHCARDS_DELETE_ACCESS_DENIED', 'Access denied');
    }

    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    return sendServerError(req, res, error, 'FLASHCARDS_DELETE_FAILED', { metadata: { cardId: req.params.id } });
  }
});

module.exports = router;
