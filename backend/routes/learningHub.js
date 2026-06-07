const express = require('express');
const PlacementTestUsage = require('../models/PlacementTestUsage');
const StudyItem = require('../models/StudyItem');
const LanguagePairProfile = require('../models/LanguagePairProfile');
const { verifyToken } = require('../middleware/auth');
const {
  getEffectiveSubscriptionTier,
  getPlacementTestLimit,
  getTestingEntitlements,
} = require('../utils/subscription');
const {
  buildLearningHubOverview,
  compact,
  reviewEase,
  reviewIntervalDays,
  searchLearningItems,
} = require('../utils/learningHub');
const { recordLearningEvent } = require('../utils/xpRewards');

const router = express.Router();
router.use(verifyToken);

function monthKey(date = new Date()) {
  return date.toISOString().slice(0, 7);
}

function languagePair(req) {
  return {
    targetLanguage: compact(req.query.targetLang || req.body.targetLanguage, 20),
    nativeLanguage: compact(req.query.nativeLang || req.body.nativeLanguage, 20),
  };
}

function validatePair(req, res) {
  const pair = languagePair(req);
  if (!pair.targetLanguage || !pair.nativeLanguage) {
    res.status(400).json({ message: 'targetLang/nativeLang are required' });
    return null;
  }
  return pair;
}

async function findPairProfile(userId, pair) {
  const exact = await LanguagePairProfile.findOne({
    userId,
    ...pair,
  }).lean();
  if (exact) return exact;

  const inherited = await LanguagePairProfile.findOne({
    userId,
    targetLanguage: pair.targetLanguage,
    completedAt: { $ne: null },
  }).sort({ updatedAt: -1 }).lean();

  if (!inherited) return null;
  return {
    ...inherited,
    _id: null,
    nativeLanguage: pair.nativeLanguage,
    inherited: true,
    inheritedFromNativeLanguage: inherited.nativeLanguage,
  };
}

async function recordLearningAnalytics(userId, payload) {
  try {
    await recordLearningEvent(userId, payload);
  } catch (error) {
    console.warn('Learning analytics event skipped:', error.message);
  }
}

router.get('/overview', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;
    const pairProfile = await findPairProfile(req.userId, pair);
    const overview = await buildLearningHubOverview(
      req.userId,
      pair.targetLanguage,
      pair.nativeLanguage,
      pairProfile,
    );
    res.json({ ...overview, pairProfile });
  } catch (error) {
    console.error('Learning hub overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/saved-items', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;
    const items = await StudyItem.find({
      userId: req.userId,
      ...pair,
    }).sort({ updatedAt: -1 }).lean();
    res.json(items);
  } catch (error) {
    console.error('List saved items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/saved-items', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;
    const targetText = compact(req.body.targetText, 600);
    if (!targetText) return res.status(400).json({ message: 'targetText is required' });

    const payload = {
      userId: req.userId,
      ...pair,
      itemType: compact(req.body.itemType, 40) || 'phrase',
      targetText,
      nativeText: compact(req.body.nativeText, 600),
      romanization: compact(req.body.romanization, 240),
      sourceType: compact(req.body.sourceType, 40) || 'manual',
      sourceRef: compact(req.body.sourceRef, 160),
      sourceLabel: compact(req.body.sourceLabel, 180),
      reason: compact(req.body.reason, 240),
      tags: Array.isArray(req.body.tags)
        ? req.body.tags.map((tag) => compact(tag, 40)).filter(Boolean).slice(0, 12)
        : [],
      metadata: req.body.metadata && typeof req.body.metadata === 'object' ? req.body.metadata : {},
    };

    const item = await StudyItem.findOneAndUpdate(
      {
        userId: req.userId,
        targetLanguage: pair.targetLanguage,
        nativeLanguage: pair.nativeLanguage,
        targetText,
        itemType: payload.itemType,
      },
      {
        $set: payload,
        $setOnInsert: {
          nextReviewAt: new Date(),
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    await recordLearningAnalytics(req.userId, {
      eventType: 'saved_item_created',
      itemId: String(item._id),
      itemType: item.itemType,
      sourceType: item.sourceType,
      sourceRef: item.sourceRef,
      sourceLabel: item.sourceLabel,
      targetText: item.targetText,
      nativeText: item.nativeText,
      targetLanguage: item.targetLanguage,
      nativeLanguage: item.nativeLanguage,
    });
    res.status(201).json(item);
  } catch (error) {
    console.error('Save study item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/saved-items/:itemId/review', async (req, res) => {
  try {
    const result = ['again', 'hard', 'good', 'easy'].includes(req.body.result) ? req.body.result : 'good';
    const item = await StudyItem.findOne({ _id: req.params.itemId, userId: req.userId });
    if (!item) return res.status(404).json({ message: 'Study item not found' });
    item.reviewCount += 1;
    item.lastReviewedAt = new Date();
    item.ease = reviewEase(item.ease || 2.5, result);
    item.nextReviewAt = new Date(Date.now() + reviewIntervalDays(item.reviewCount, result) * 24 * 60 * 60 * 1000);
    await item.save();
    await recordLearningAnalytics(req.userId, {
      eventType: 'saved_item_reviewed',
      itemId: String(item._id),
      itemType: item.itemType,
      sourceType: item.sourceType,
      result,
      reviewCount: item.reviewCount,
      targetText: item.targetText,
      nativeText: item.nativeText,
      targetLanguage: item.targetLanguage,
      nativeLanguage: item.nativeLanguage,
    });
    res.json(item);
  } catch (error) {
    console.error('Review study item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/saved-items/:itemId', async (req, res) => {
  try {
    const item = await StudyItem.findOneAndDelete({ _id: req.params.itemId, userId: req.userId });
    if (!item) return res.status(404).json({ message: 'Study item not found' });
    res.json({ message: 'Study item deleted' });
  } catch (error) {
    console.error('Delete study item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;
    const result = await searchLearningItems(req.userId, pair.targetLanguage, pair.nativeLanguage, req.query.q);
    res.json(result);
  } catch (error) {
    console.error('Learning search error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/pair-profile', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;
    const profile = await findPairProfile(req.userId, pair);
    res.json(profile || null);
  } catch (error) {
    console.error('Get pair profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/placement-checks/start', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;

    const tier = getEffectiveSubscriptionTier(req.user);
    const placementLimit = getPlacementTestLimit(tier);
    const periodKey = placementLimit.period === 'lifetime' ? 'lifetime' : monthKey();
    const used = await PlacementTestUsage.countDocuments({
      userId: req.userId,
      period: placementLimit.period,
      periodKey,
    });

    const entitlement = {
      ...getTestingEntitlements(tier).placementTests,
      used,
      remaining: Math.max(0, placementLimit.limit - used),
      periodKey,
    };

    if (used >= placementLimit.limit) {
      return res.status(429).json({
        code: 'PLACEMENT_TEST_LIMIT_REACHED',
        message: 'Placement check limit reached',
        entitlement,
      });
    }

    await PlacementTestUsage.create({
      userId: req.userId,
      ...pair,
      tier,
      period: placementLimit.period,
      periodKey,
    });

    res.status(201).json({
      entitlement: {
        ...entitlement,
        used: used + 1,
        remaining: Math.max(0, placementLimit.limit - used - 1),
      },
    });
  } catch (error) {
    console.error('Start placement check error:', error);
    res.status(500).json({ message: 'Could not start placement check' });
  }
});

router.put('/pair-profile', async (req, res) => {
  try {
    const pair = validatePair(req, res);
    if (!pair) return;
    const payload = {
      currentLevel: compact(req.body.currentLevel, 40),
      primaryGoal: compact(req.body.primaryGoal, 40),
      pace: compact(req.body.pace, 40),
      completedAt: req.body.completedAt ? new Date(req.body.completedAt) : null,
    };
    const profile = await LanguagePairProfile.findOneAndUpdate(
      { userId: req.userId, ...pair },
      { $set: payload },
      { upsert: true, new: true, setDefaultsOnInsert: true },
    );
    res.json(profile);
  } catch (error) {
    console.error('Save pair profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
