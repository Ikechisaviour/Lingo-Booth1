const express = require('express');
const PracticeContext = require('../models/PracticeContext');
const { optionalAuth } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const {
  analyzePracticeContext,
  buildPracticeRecommendations,
} = require('../utils/practiceContextAnalysis');
const { matchSingleContext } = require('../utils/contextToConcepts');
const srs = require('../utils/curriculumV2Srs');
const { sendServerError, sendClientError } = require('../utils/sendError');

// Fires after a PracticeContext save succeeds. Matches the saved
// vocabulary to v2 concept IDs and nudges any existing SRS rows for
// those concepts (treats real-life encounter as a partial review).
// Failures here MUST NOT block the save — log and move on.
async function reinforceSrsFromContext(context) {
  if (!context || !context.userId) return; // anonymous saves don't have SRS state
  try {
    const matched = matchSingleContext(context, context.targetLanguage);
    if (matched.size === 0) return;
    await Promise.allSettled([...matched.keys()].map((conceptId) =>
      srs.reinforceFromContext({
        userId: context.userId,
        conceptId,
        skill: 'recognition',
      })
    ));
  } catch (err) {
    console.warn('Context-to-SRS reinforcement failed (non-fatal):', err.message || err);
  }
}

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
    message: 'Real-life context practice is available on Pro and Premium.',
    code: 'PRACTICE_CONTEXT_ACCESS_FORBIDDEN',
    entitlements,
  });
}

router.use(optionalAuth);
router.use(requirePracticeContextAccess);

router.post('/analyze', async (req, res) => {
  try {
    const transcript = String(req.body?.transcript || '').trim();
    if (!transcript) {
      return sendClientError(res, 400, 'PRACTICE_CONTEXT_TRANSCRIPT_REQUIRED', 'Transcript is required.');
    }
    if (transcript.length > 6000) {
      return sendClientError(res, 400, 'PRACTICE_CONTEXT_TRANSCRIPT_TOO_LONG', 'Transcript is too long for one context session.');
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
    return sendServerError(req, res, error, 'PRACTICE_CONTEXT_ANALYZE_FAILED', {
      clientMessage: 'Could not analyze this context session.',
    });
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
    return sendServerError(req, res, error, 'PRACTICE_CONTEXT_LIST_FAILED', {
      clientMessage: 'Could not load saved context.',
    });
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
    return sendServerError(req, res, error, 'PRACTICE_CONTEXT_RECOMMENDATIONS_FAILED', {
      clientMessage: 'Could not load practice recommendations.',
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const id = deviceId(req);
    if (!req.userId && !id) {
      return sendClientError(res, 400, 'PRACTICE_CONTEXT_DEVICE_ID_REQUIRED', 'A device id is required to save context.');
    }

    const topics = cleanItems(req.body?.topics);
    const vocabulary = cleanItems(req.body?.vocabulary);
    const phrases = cleanItems(req.body?.phrases);
    const environmentTags = cleanStringList(req.body?.environmentTags);
    if (!topics.length && !vocabulary.length && !phrases.length && !environmentTags.length) {
      return sendClientError(res, 400, 'PRACTICE_CONTEXT_NO_ITEMS_TO_SAVE', 'Select at least one useful item before saving.');
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

    // Fire-and-forget reinforcement — never block the save on this.
    reinforceSrsFromContext(context);

    res.status(201).json(context);
  } catch (error) {
    return sendServerError(req, res, error, 'PRACTICE_CONTEXT_SAVE_FAILED', {
      clientMessage: 'Could not save context.',
    });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await PracticeContext.findOneAndDelete({
      _id: req.params.id,
      ...ownerFilter(req),
    });
    if (!deleted) {
      return sendClientError(res, 404, 'PRACTICE_CONTEXT_NOT_FOUND', 'Saved context not found.');
    }
    res.json({ message: 'Saved context deleted.' });
  } catch (error) {
    return sendServerError(req, res, error, 'PRACTICE_CONTEXT_DELETE_FAILED', {
      clientMessage: 'Could not delete saved context.',
    });
  }
});

module.exports = router;
