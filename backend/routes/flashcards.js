const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const UserCardPreference = require('../models/UserCardPreference');
const GuestSession = require('../models/GuestSession');
const { verifyToken, isOwner } = require('../middleware/auth');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { batchTranslateRaw, batchRomanize, batchNativePhonetic, ROMANIZATION_LANGS, NON_LATIN_LANGS } = require('../utils/translationService');

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

// --- Native-script phonetic cache (nativeLang:targetLang -> Map<text, phonetic>) ---
const phoneticCache = new Map();
const PHONETIC_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// --- Romanization cache for non-Korean target languages ---
const romanCache = new Map(); // `${targetLang}:${text}` -> romanization
const ROMAN_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours
let romanCacheTimestamp = Date.now();

/**
 * Generate correct romanization for non-Korean non-Latin target languages.
 * Korean cards already have romanization; Latin-script languages don't need it.
 * For non-Latin targets (zh, ja, ar, hi, etc.), uses batchRomanize via Google Translate.
 */
async function fillTargetRomanization(cards, targetLang) {
  if (targetLang === 'ko') return; // Korean cards already have correct romanization

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
    const text = cards[i].korean || cards[i][targetLang] || '';
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
}

/**
 * For non-Latin native speakers learning a non-Latin target language,
 * replace Latin romanization with native-script phonetic approximation.
 * e.g. Arabic speaker learning Korean: "annyeonghaseyo" → "آن نيونغ ها سي يو"
 * Latin-script native speakers keep standard romanization as-is.
 */
async function applyNativePhonetics(cards, targetLang, nativeLang) {
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
}

/**
 * Fill missing native language fields on cards.
 * If the card already has the translation in DB, it's already on the object.
 * For cards missing the native field, translate NOW before sending the response,
 * then persist translations to DB in the background for future cache hits.
 */
async function fillNativeTranslations(cards, nativeLang) {
  if (nativeLang === 'en') return cards;

  const nativeField = nativeLang === 'ko' ? 'korean' : nativeLang;

  // Collect cards missing the native field
  const missingIndices = [];
  const missingTexts = [];
  for (let i = 0; i < cards.length; i++) {
    if (!cards[i][nativeField] && cards[i].english) {
      missingIndices.push(i);
      missingTexts.push(cards[i].english);
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
        const translated = results[k]?.text;
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

async function getDefaultCards(targetLang = 'ko') {
  const cacheKey = targetLang;
  const cached = defaultCardsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.cards;
  }
  const cards = await Flashcard.find({ isDefault: true, targetLang })
    .sort({ defaultIndex: 1 })
    .lean();
  defaultCardsCache.set(cacheKey, { cards, timestamp: Date.now() });
  return cards;
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
    .map(card => ({ card, sort: -Math.log(rng()) / (MASTERY_WEIGHTS[card.masteryLevel] || 1) }))
    .sort((a, b) => a.sort - b.sort)
    .map(x => x.card);
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
    const defaultCards = await getDefaultCards(targetLang);
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
    console.error('Get categories error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// All cards for a specific category — used by sidebar for individual card selection (no pagination)
router.get('/category-cards', async (req, res) => {
  try {
    const targetLang = req.query.targetLang || 'ko';
    const nativeLang = req.query.nativeLang || 'en';
    const category = (req.query.category || '').toLowerCase();
    if (!category) return res.status(400).json({ message: 'category is required' });

    const defaultCards = await getDefaultCards(targetLang);
    const targetField = targetLang === 'ko' ? 'korean' : targetLang === 'en' ? 'english' : targetLang;
    const nativeField = nativeLang === 'ko' ? 'korean' : nativeLang === 'en' ? 'english' : nativeLang;

    const filtered = defaultCards
      .filter(c => normalizeCategory(c.category)[0].toLowerCase() === category)
      .map(c => ({
        _id: c._id,
        english: c.english || '',
        [targetField]: c[targetField] || c.korean || '',
        [nativeField]: c[nativeField] || '',
      }));

    // Translate missing native fields (same logic as main flashcard routes)
    await fillNativeTranslations(filtered, nativeLang);

    // Strip helper fields before sending
    const cards = filtered.map(c => ({
      _id: c._id.toString(),
      [targetField]: c[targetField] || '',
      [nativeField]: c[nativeField] || c.english || '',
      ...(c._translationPending ? { _translationPending: true } : {}),
    }));

    res.json({ cards });
  } catch (error) {
    console.error('Get category cards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Guest flashcards — returns default vocabulary set (read-only)
router.get('/guest', async (req, res) => {
  // Track guest session (fire-and-forget, non-blocking)
  try {
    const ip = getClientIp(req);
    const nativeLang = req.query.nativeLang || 'en';
    const targetLang = req.query.targetLang || 'ko';
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
    const targetLang = req.query.targetLang || 'ko';
    const nativeLang = req.query.nativeLang || 'en';
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(200, Math.max(1, parseInt(req.query.limit) || 50));
    const { shuffle, seed, categoryFilter } = parseFilterParams(req.query);

    const defaultCards = await getDefaultCards(targetLang);
    const targetFieldName = targetLang === 'ko' ? 'korean' : targetLang === 'en' ? 'english' : targetLang;

    // Prepare guest cards with default mastery
    const allGuestCards = defaultCards.map((card) => {
      const c = { ...card, _id: card._id.toString(), masteryLevel: 3, correctCount: 0, incorrectCount: 0 };
      if (!c[targetFieldName] && c.korean) c[targetFieldName] = c.korean;
      return c;
    });

    // Apply category filter + weighted shuffle
    const processed = applyFilterAndShuffle(allGuestCards, { shuffle, seed, categoryFilter });

    const total = processed.length;
    const start = (page - 1) * limit;
    const pageCards = processed.slice(start, start + limit);

    // Translate missing native language fields (English → native), with DB caching
    await fillNativeTranslations(pageCards, nativeLang);

    // Replace romanization with native-script phonetics for non-Latin native speakers
    await applyNativePhonetics(pageCards, targetLang, nativeLang);

    // Generate correct romanization for non-Korean non-Latin target languages
    await fillTargetRomanization(pageCards, targetLang);

    res.json({ cards: pageCards, total, page, limit, hasMore: start + limit < total, seed });
  } catch (error) {
    console.error('Get guest flashcards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// --- Authenticated routes ---
router.use(verifyToken);

// Get flashcards for user — default deck + user's own cards
router.get('/user/:userId', isOwner('userId'), async (req, res) => {
  try {
    const { userId } = req.params;
    const targetLang = req.query.targetLang || 'ko';
    const nativeLang = req.query.nativeLang || 'en';
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
    const preferences = await UserCardPreference.find({ userId });
    const prefMap = new Map(preferences.map(p => [p.cardId, p.masteryLevel]));

    const targetFieldName = targetLang === 'ko' ? 'korean' : targetLang === 'en' ? 'english' : targetLang;

    const defaultCardsWithPrefs = defaultCards.map(card => {
      const cardIdStr = card._id.toString();
      const c = {
        ...card,
        isDefault: true,
        masteryLevel: prefMap.has(cardIdStr) ? prefMap.get(cardIdStr) : 3,
        correctCount: 0,
        incorrectCount: 0,
      };
      if (!c[targetFieldName] && c.korean) c[targetFieldName] = c.korean;
      return c;
    });

    const allCards = [...defaultCardsWithPrefs, ...normalizedUserCards];

    // Apply category filter + weighted shuffle
    const processed = applyFilterAndShuffle(allCards, { shuffle, seed, categoryFilter });

    const total = processed.length;
    const start = (page - 1) * limit;
    const pageCards = processed.slice(start, start + limit);

    // Translate missing native language fields (English → native), with DB caching
    await fillNativeTranslations(pageCards, nativeLang);

    // Replace romanization with native-script phonetics for non-Latin native speakers
    await applyNativePhonetics(pageCards, targetLang, nativeLang);

    // Generate correct romanization for non-Korean non-Latin target languages.
    // Only applies to default cards; user-created cards keep their own romanization.
    const defaultPageCards = pageCards.filter(c => c.isDefault);
    const userPageCards = pageCards.filter(c => !c.isDefault);
    await fillTargetRomanization(defaultPageCards, targetLang);
    // User-created cards for Latin-script targets: clear Korean romanization
    if (targetLang !== 'ko' && !ROMANIZATION_LANGS.has(targetLang)) {
      userPageCards.forEach(c => { if (!c.romanization || c.romanization === c.korean) c.romanization = ''; });
    }

    res.json({ cards: pageCards, total, page, limit, hasMore: start + limit < total, seed });
  } catch (error) {
    console.error('Get flashcards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Allowed dynamic language field names on Flashcard (all schema fields except system fields)
const LANG_FIELDS = ['korean','english','es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','ms','fil','tr','bn','ta'];

// Create flashcard (uses authenticated user's ID)
router.post('/', async (req, res) => {
  try {
    const { romanization, audioUrl, category, targetLang, nativeLang } = req.body;

    // Accept any recognised language field names from the body
    const langData = {};
    for (const field of LANG_FIELDS) {
      if (req.body[field] !== undefined) langData[field] = req.body[field];
    }

    // Require at least one target and one native field
    if (Object.keys(langData).length < 2) {
      return res.status(400).json({ message: 'Target and native text fields are required' });
    }

    const flashcard = new Flashcard({
      userId: req.userId,
      ...langData,
      romanization,
      audioUrl,
      category: normalizeCategory(category),
      targetLang: targetLang || 'ko',
      nativeLang: nativeLang || 'en',
    });

    await flashcard.save();
    res.status(201).json(flashcard);
  } catch (error) {
    console.error('Create flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update flashcard (mark correct/incorrect) - verify ownership
router.put('/:id', async (req, res) => {
  const { isCorrect } = req.body;

  try {
    const flashcard = await Flashcard.findById(req.params.id).lean();
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    // Default cards — persist masteryLevel in UserCardPreference
    if (flashcard.isDefault) {
      const existing = await UserCardPreference.findOne({
        userId: req.userId,
        cardId: req.params.id,
      });
      const currentLevel = existing ? existing.masteryLevel : 3;
      const newLevel = isCorrect
        ? Math.min(currentLevel + 1, 5)
        : Math.max(currentLevel - 1, 1);

      await UserCardPreference.findOneAndUpdate(
        { userId: req.userId, cardId: req.params.id },
        { masteryLevel: newLevel, updatedAt: new Date() },
        { upsert: true, new: true }
      );

      return res.json({ masteryLevel: newLevel });
    }

    // User-created card — verify ownership and update directly
    if (flashcard.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newLevel = isCorrect
      ? Math.min(flashcard.masteryLevel + 1, 5)
      : Math.max(flashcard.masteryLevel - 1, 1);
    const update = {
      $set: { lastReviewedAt: new Date(), masteryLevel: newLevel },
      $inc: isCorrect ? { correctCount: 1 } : { incorrectCount: 1 },
    };

    const updated = await Flashcard.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Update flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete flashcard - verify ownership
router.delete('/:id', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.id);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }

    // Prevent deletion of default cards
    if (flashcard.isDefault) {
      return res.status(403).json({ message: 'Cannot delete default flashcards' });
    }

    // Verify ownership
    if (flashcard.userId.toString() !== req.userId && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    await Flashcard.findByIdAndDelete(req.params.id);
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    console.error('Delete flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
