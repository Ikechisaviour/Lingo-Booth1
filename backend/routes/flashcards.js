const express = require('express');
const router = express.Router();
const Flashcard = require('../models/Flashcard');
const UserCardPreference = require('../models/UserCardPreference');
const GuestSession = require('../models/GuestSession');
const { verifyToken, isOwner } = require('../middleware/auth');
const { getClientIp, getGeoInfo } = require('../utils/geo');
const { batchNativePhonetic, ROMANIZATION_LANGS, NON_LATIN_LANGS } = require('../utils/translationService');

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

// --- Public routes (no auth required) ---

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
    const defaultCards = await getDefaultCards(targetLang, nativeLang);
    const guestCards = defaultCards.map((card, i) => ({
      ...card,
      _id: `guest-${i}`,
      masteryLevel: 3,
      correctCount: 0,
      incorrectCount: 0,
    }));

    // Replace romanization with native-script phonetics for non-Latin native speakers
    await applyNativePhonetics(guestCards, targetLang, nativeLang);

    res.json(guestCards);
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

    const defaultCardsWithPrefs = defaultCards.map(card => {
      const cardIdStr = card._id.toString();
      return {
        ...card,
        isDefault: true,
        masteryLevel: prefMap.has(cardIdStr) ? prefMap.get(cardIdStr) : 3,
        correctCount: 0,
        incorrectCount: 0,
      };
    });

    const allCards = [...defaultCardsWithPrefs, ...normalizedUserCards];

    // Replace romanization with native-script phonetics for non-Latin native speakers
    await applyNativePhonetics(allCards, targetLang, nativeLang);

    res.json(allCards);
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
