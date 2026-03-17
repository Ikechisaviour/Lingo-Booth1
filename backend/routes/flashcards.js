const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const UserCardPreference = require('../models/UserCardPreference');
const GuestSession = require('../models/GuestSession');
const { verifyToken, isOwner } = require('../middleware/auth');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { batchTranslateRaw, batchNativePhonetic, ROMANIZATION_LANGS, NON_LATIN_LANGS } = require('../utils/translationService');

// Normalize category: handles old string format and new array format
const normalizeCategory = (cat) => {
  if (Array.isArray(cat)) return cat.length > 0 ? cat : ['uncategorized'];
  if (typeof cat === 'string' && cat.trim()) return [cat.trim()];
  return ['uncategorized'];
};

// --- Native-script phonetic cache (nativeLang:targetLang -> Map<text, phonetic>) ---
const phoneticCache = new Map();
const PHONETIC_CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

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
 * For cards missing the native field, use English as immediate fallback,
 * then kick off background translation that persists to DB for next load.
 */
function fillNativeTranslations(cards, nativeLang) {
  if (nativeLang === 'en') return cards;

  const nativeField = nativeLang === 'ko' ? 'korean' : nativeLang;

  // Collect cards missing the native field
  const missingTexts = [];
  const missingCardIds = [];
  for (const card of cards) {
    if (!card[nativeField] && card.english) {
      // Immediate fallback: show English so the card isn't blank
      card[nativeField] = card.english;
      // Track for background translation (only real DB cards)
      if (card._id && typeof card._id !== 'string') {
        missingTexts.push(card.english);
        missingCardIds.push(card._id);
      }
    }
  }

  // Fire-and-forget: translate in background and save to DB for next load
  if (missingTexts.length > 0) {
    translateAndPersist(missingTexts, missingCardIds, nativeField, nativeLang);
  }

  return cards;
}

// Background translation — runs after response is sent
async function translateAndPersist(texts, cardIds, nativeField, nativeLang) {
  try {
    const CHUNK = 50;
    for (let start = 0; start < texts.length; start += CHUNK) {
      const chunk = texts.slice(start, start + CHUNK);
      const chunkIds = cardIds.slice(start, start + CHUNK);
      const results = await batchTranslateRaw(chunk, 'en', nativeLang);

      const bulkOps = [];
      for (let k = 0; k < results.length; k++) {
        const translated = results[k]?.text || '';
        if (translated) {
          bulkOps.push({
            updateOne: {
              filter: { _id: chunkIds[k] },
              update: { $set: { [nativeField]: translated } },
            },
          });
        }
      }
      if (bulkOps.length > 0) {
        await Flashcard.bulkWrite(bulkOps);
      }
    }
    // Clear the in-memory cache so next request picks up translated cards
    defaultCardsCache.clear();
    console.log(`Background: translated ${texts.length} cards to ${nativeLang}`);
  } catch (err) {
    console.error('Background translation failed:', err.message);
  }
}

// --- In-memory cache for default cards per targetLang+nativeLang ---
const defaultCardsCache = new Map(); // `${targetLang}:${nativeLang}` -> { cards, timestamp }
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

async function getDefaultCards(targetLang = 'ko', nativeLang = 'en') {
  const cacheKey = `${targetLang}:${nativeLang}`;
  const cached = defaultCardsCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.cards;
  }
  const cards = await Flashcard.find({ isDefault: true, targetLang, nativeLang })
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
    ? cards.filter(c => categoryFilter.has(normalizeCategory(c.category)[0]))
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

    const defaultCards = await getDefaultCards(targetLang, nativeLang);
    const targetFieldName = targetLang === 'ko' ? 'korean' : targetLang === 'en' ? 'english' : targetLang;

    // Prepare guest cards with default mastery
    const allGuestCards = defaultCards.map((card, i) => {
      const c = { ...card, _id: `guest-${i}`, masteryLevel: 3, correctCount: 0, incorrectCount: 0 };
      if (!c[targetFieldName] && c.korean) c[targetFieldName] = c.korean;
      return c;
    });

    // Apply category filter + weighted shuffle
    const processed = applyFilterAndShuffle(allGuestCards, { shuffle, seed, categoryFilter });

    const total = processed.length;
    const start = (page - 1) * limit;
    const pageCards = processed.slice(start, start + limit);

    // Translate missing native language fields (English → native), with DB caching
    fillNativeTranslations(pageCards, nativeLang);

    // Replace romanization with native-script phonetics for non-Latin native speakers
    await applyNativePhonetics(pageCards, targetLang, nativeLang);

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

    // Default cards from DB (cached, filtered by targetLang + nativeLang)
    const defaultCards = await getDefaultCards(targetLang, nativeLang);

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
    fillNativeTranslations(pageCards, nativeLang);

    // Replace romanization with native-script phonetics for non-Latin native speakers
    await applyNativePhonetics(pageCards, targetLang, nativeLang);

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
