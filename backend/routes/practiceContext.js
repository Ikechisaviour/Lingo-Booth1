const express = require('express');
const PracticeContext = require('../models/PracticeContext');
const { optionalAuth } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const {
  analyzePracticeContext,
  buildPracticeRecommendations,
} = require('../utils/practiceContextAnalysis');

const router = express.Router();

function deviceId(req) {
  return String(req.header('X-Lingo-Device-Id') || '').trim().slice(0, 120);
}

function ownerFilter(req) {
  if (req.userId) return { userId: req.userId };
  const id = deviceId(req);
  return id ? { deviceId: id, userId: null } : { _id: null };
}

function cleanItem(item = {}, maxText = 180) {
  return {
    text: String(item.text || '').replace(/\s+/g, ' ').trim().slice(0, maxText),
    language: String(item.language || '').slice(0, 20),
    note: String(item.note || '').replace(/\s+/g, ' ').trim().slice(0, 240),
    context: String(item.context || '').replace(/\s+/g, ' ').trim().slice(0, 160),
  };
}

function cleanItems(items = [], max = 20) {
  return (Array.isArray(items) ? items : [])
    .map((item) => cleanItem(item))
    .filter((item) => item.text)
    .slice(0, max);
}

function cleanStringList(items = [], max = 12) {
  return (Array.isArray(items) ? items : [])
    .map((item) => String(item || '').replace(/\s+/g, ' ').trim().slice(0, 120))
    .filter(Boolean)
    .slice(0, max);
}

function requirePracticeContextAccess(req, res, next) {
  const entitlements = getAiEntitlements(req.user);
  if (entitlements.canUsePracticeContext) {
    return next();
  }

  return res.status(403).json({
    message: 'Real-life context practice is available on Pro and Ultra.',
    entitlements,
  });
}

router.use(optionalAuth);
router.use(requirePracticeContextAccess);

router.post('/analyze', async (req, res) => {
  try {
    const transcript = String(req.body?.transcript || '').trim();
    if (!transcript) {
      return res.status(400).json({ message: 'Transcript is required.' });
    }
    if (transcript.length > 6000) {
      return res.status(400).json({ message: 'Transcript is too long for one context session.' });
    }

    const analysis = analyzePracticeContext({
      transcript,
      nativeLanguage: req.body?.nativeLanguage || req.user?.nativeLanguage || 'en',
      targetLanguage: req.body?.targetLanguage || req.user?.targetLanguage || 'ko',
    });

    res.json({
      ...analysis,
      privacy: {
        rawAudioStored: false,
        transcriptStored: false,
        approvalRequiredToSave: true,
      },
    });
  } catch (error) {
    console.error('Analyze practice context error:', error);
    res.status(500).json({ message: 'Could not analyze this context session.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const filter = ownerFilter(req);
    const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 50);
    const targetLanguage = req.query.targetLanguage || req.query.targetLang || '';
    if (targetLanguage) filter.targetLanguage = String(targetLanguage).slice(0, 20);

    const contexts = await PracticeContext.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    res.json(contexts);
  } catch (error) {
    console.error('Get practice context error:', error);
    res.status(500).json({ message: 'Could not load saved context.' });
  }
});

router.get('/recommendations', async (req, res) => {
  try {
    const filter = ownerFilter(req);
    const targetLanguage = req.query.targetLanguage || req.query.targetLang || req.user?.targetLanguage || '';
    if (targetLanguage) filter.targetLanguage = String(targetLanguage).slice(0, 20);

    const contexts = await PracticeContext.find(filter)
      .sort({ createdAt: -1 })
      .limit(25)
      .lean();

    res.json(buildPracticeRecommendations(contexts));
  } catch (error) {
    console.error('Get practice context recommendations error:', error);
    res.status(500).json({ message: 'Could not load practice recommendations.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = deviceId(req);
    if (!req.userId && !id) {
      return res.status(400).json({ message: 'A device id is required to save context.' });
    }

    const topics = cleanItems(req.body?.topics);
    const vocabulary = cleanItems(req.body?.vocabulary);
    const phrases = cleanItems(req.body?.phrases);
    const environmentTags = cleanStringList(req.body?.environmentTags);
    if (!topics.length && !vocabulary.length && !phrases.length && !environmentTags.length) {
      return res.status(400).json({ message: 'Select at least one useful item before saving.' });
    }

    const context = await PracticeContext.create({
      userId: req.userId || null,
      deviceId: id,
      source: ['web', 'mobile'].includes(req.body?.source) ? req.body.source : 'unknown',
      nativeLanguage: String(req.body?.nativeLanguage || req.user?.nativeLanguage || 'en').slice(0, 20),
      targetLanguage: String(req.body?.targetLanguage || req.user?.targetLanguage || 'ko').slice(0, 20),
      summary: String(req.body?.summary || '').replace(/\s+/g, ' ').trim().slice(0, 800),
      environmentTags,
      topics,
      vocabulary,
      phrases,
      goals: cleanStringList(req.body?.goals, 8),
      transcriptWordCount: Math.max(0, Math.min(Number(req.body?.transcriptWordCount) || 0, 5000)),
    });

    res.status(201).json(context);
  } catch (error) {
    console.error('Save practice context error:', error);
    res.status(500).json({ message: 'Could not save context.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PracticeContext.findOneAndDelete({
      _id: req.params.id,
      ...ownerFilter(req),
    });
    if (!deleted) {
      return res.status(404).json({ message: 'Saved context not found.' });
    }
    res.json({ message: 'Saved context deleted.' });
  } catch (error) {
    console.error('Delete practice context error:', error);
    res.status(500).json({ message: 'Could not delete saved context.' });
  }
});

module.exports = router;
