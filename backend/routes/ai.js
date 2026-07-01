const express = require('express');
const router = express.Router();
const ConversationMemory = require('../models/ConversationMemory');
const PracticeContext = require('../models/PracticeContext');
const Lesson = require('../models/Lesson');
const { optionalAuth } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const {
  buildQuotaExceededMessage,
  estimateConversationTurnTokens,
  getDailyTokenUsage,
  recordTokenUsage,
  resolveAiIdentity,
} = require('../utils/tokenUsage');
const { sendServerError, sendClientError } = require('../utils/sendError');
const {
  buildClassLessonFallbackResult,
  buildLanguagePairRedirect,
  buildLessonBrief,
  callAIConversation,
  detectOutOfPairLanguage,
  safeConversationHistory,
  sanitizeMemory,
  sanitizeSummary,
} = require('../utils/aiConversation');
const { compactPracticeContextBrief } = require('../utils/practiceContextAnalysis');
const { enrichLessonWithPronunciation } = require('../utils/pronunciationService');

const DEFAULT_SESSION_ID = 'default-conversation';

function normalizeSessionId(sessionId) {
  return String(sessionId || DEFAULT_SESSION_ID)
    .trim()
    .replace(/[^a-zA-Z0-9:_-]/g, '-')
    .slice(0, 120) || DEFAULT_SESSION_ID;
}

function buildTurns(history, transcript, reply) {
  const turns = safeConversationHistory(history);
  turns.push({ role: 'user', content: String(transcript || '').slice(0, 800) });
  if (reply && String(reply).trim()) {
    turns.push({ role: 'assistant', content: String(reply).slice(0, 800) });
  }
  return turns.slice(-12);
}

async function getPracticeContextBrief(req, targetLanguage) {
  const entitlements = getAiEntitlements(req.user);
  if (!entitlements.canUsePracticeContext) return '';

  const deviceId = String(req.header('X-Lingo-Device-Id') || '').trim();
  const ownerQuery = req.userId
    ? { userId: req.userId }
    : (deviceId ? { deviceId, userId: null } : null);
  if (!ownerQuery) return '';

  const contexts = await PracticeContext.find({
    ...ownerQuery,
    targetLanguage: String(targetLanguage || req.user?.targetLanguage || 'ko').slice(0, 20),
  })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  return compactPracticeContextBrief(contexts);
}

async function getEntitlementsWithUsage(req) {
  const baseEntitlements = getAiEntitlements(req.user);
  const identity = resolveAiIdentity(req);
  const tokenUsage = await getDailyTokenUsage(identity, baseEntitlements.subscriptionTier);
  return {
    identity,
    tokenUsage,
    entitlements: getAiEntitlements(req.user, tokenUsage),
  };
}

router.use(optionalAuth);

router.get('/entitlements', async (req, res) => {
  try {
    const { entitlements } = await getEntitlementsWithUsage(req);
    res.json(entitlements);
  } catch (error) {
    return sendServerError(req, res, error, 'AI_ENTITLEMENTS_FAILED', {
      clientMessage: 'Could not load conversation access settings.',
    });
  }
});

router.post('/conversation', async (req, res) => {
  try {
    const {
      identity,
      tokenUsage,
      entitlements,
    } = await getEntitlementsWithUsage(req);

    const {
      scenario,
      targetLanguage,
      nativeLanguage,
      inputLanguage,
      transcript,
      history,
      difficulty,
      customRoleplay,
      classLessonId,
      lessonId,
      activityId,
      classAction,
    } = req.body || {};

    let lessonBrief = null;
    const sourceLessonId = classLessonId || lessonId;
    if (sourceLessonId && /^[a-fA-F0-9]{24}$/.test(String(sourceLessonId))) {
      const lessonDoc = await Lesson.findById(sourceLessonId).lean();
      if (lessonDoc) {
        await enrichLessonWithPronunciation(
          lessonDoc,
          lessonDoc.targetLang || targetLanguage || 'ko',
          nativeLanguage || lessonDoc.nativeLang || 'en',
          { allowExternal: false },
        );
        lessonBrief = buildLessonBrief(lessonDoc, activityId || '');
      }
    }

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return sendClientError(res, 400, 'AI_TRANSCRIPT_REQUIRED', 'Transcript is required');
    }

    if (transcript.length > 1200) {
      return sendClientError(res, 400, 'AI_TRANSCRIPT_TOO_LONG', 'Transcript too long for conversation');
    }

    const estimatedRequestTokens = estimateConversationTurnTokens(req.body);
    if (
      tokenUsage.quotaExceeded
      || tokenUsage.remainingTokens <= 0
      || estimatedRequestTokens >= tokenUsage.remainingTokens
    ) {
      const message = buildQuotaExceededMessage(tokenUsage, entitlements.subscriptionTier);
      const limitedEntitlements = getAiEntitlements(req.user, {
        ...tokenUsage,
        quotaExceeded: true,
        remainingTokens: Math.max(0, tokenUsage.remainingTokens),
      });
      return res.status(429).json({
        message,
        quotaExceeded: true,
        resetAt: tokenUsage.resetAt,
        retryAt: tokenUsage.resetAt,
        tokenUsage: limitedEntitlements.tokenUsage,
        entitlements: limitedEntitlements,
      });
    }

    const sessionId = normalizeSessionId(req.body?.sessionId);
    let memoryDoc = null;
    let summary = sanitizeSummary(req.body?.summary);
    let memory = sanitizeMemory(req.body?.memory);
    let effectiveHistory = safeConversationHistory(history);
    const practiceContextBrief = await getPracticeContextBrief(req, targetLanguage);

    if (entitlements.canSyncAIMemory && req.userId) {
      memoryDoc = await ConversationMemory.findOne({ userId: req.userId, sessionId });
      if (memoryDoc) {
        summary = sanitizeSummary(memoryDoc.summary);
        memory = sanitizeMemory(memoryDoc.memory);
        effectiveHistory = safeConversationHistory(memoryDoc.lastTurns);
      }
    }

    const isClassLessonAction = !!classAction
      || transcript.trim().startsWith('CLASS_LESSON_ACTION');
    const isClassLessonTurn = !!lessonBrief;
    const outOfPair = isClassLessonAction
      ? null
      : detectOutOfPairLanguage({
        transcript: transcript.trim(),
        targetLanguage,
        nativeLanguage,
      });

    if (outOfPair) {
      const redirect = buildLanguagePairRedirect(outOfPair);
      const updatedTurns = buildTurns(effectiveHistory, transcript.trim(), redirect.reply);

      if (entitlements.canSyncAIMemory && req.userId) {
        await ConversationMemory.findOneAndUpdate(
          { userId: req.userId, sessionId },
          {
            $set: {
              scenario: String(scenario || '').slice(0, 500),
              targetLanguage: String(targetLanguage || 'ko').slice(0, 20),
              nativeLanguage: String(nativeLanguage || 'en').slice(0, 20),
              inputLanguage: String(inputLanguage || '').slice(0, 20),
              difficulty: String(difficulty || 'casual beginner').slice(0, 80),
              summary,
              memory,
              lastTurns: updatedTurns,
            },
          },
          { upsert: true, new: true },
        );
      }

      return res.json({
        ...redirect,
        summary,
        memory,
        history: updatedTurns,
        sessionId,
        tokenUsage: entitlements.tokenUsage,
        entitlements,
      });
    }

    let result;
    try {
      result = await callAIConversation({
        scenario: [scenario, practiceContextBrief].filter(Boolean).join('\n\n'),
        targetLanguage,
        nativeLanguage,
        inputLanguage,
        transcript: transcript.trim(),
        history: effectiveHistory,
        difficulty,
        summary,
        memory,
        productContext: 'Lingo Booth',
        maxCompletionTokens: tokenUsage.remainingTokens - estimatedRequestTokens,
        customRoleplay,
        lessonBrief,
        classAction,
      });
    } catch (providerError) {
      if (!isClassLessonAction && !isClassLessonTurn) throw providerError;

      const fallbackResult = await buildClassLessonFallbackResult({
        transcript: transcript.trim(),
        targetLanguage,
        nativeLanguage,
        summary,
        memory,
        lessonBrief,
        classAction,
      });

      if (!fallbackResult) throw providerError;
      console.warn('Class lesson provider fallback used:', providerError.message || providerError);
      result = fallbackResult;
    }

    const updatedSummary = sanitizeSummary(result.summary || summary);
    const updatedMemory = sanitizeMemory(result.memory || memory);
    const updatedTurns = buildTurns(effectiveHistory, transcript.trim(), result.reply);

    if (entitlements.canSyncAIMemory && req.userId) {
      await ConversationMemory.findOneAndUpdate(
        { userId: req.userId, sessionId },
        {
          $set: {
            scenario: String(scenario || '').slice(0, 500),
            targetLanguage: String(targetLanguage || 'ko').slice(0, 20),
            nativeLanguage: String(nativeLanguage || 'en').slice(0, 20),
            inputLanguage: String(inputLanguage || '').slice(0, 20),
            difficulty: String(difficulty || 'casual beginner').slice(0, 80),
            summary: updatedSummary,
            memory: updatedMemory,
            lastTurns: updatedTurns,
          },
        },
        { upsert: true, new: true },
      );
    }

    const updatedTokenUsage = result.aiEnabled === false
      ? tokenUsage
      : await recordTokenUsage(identity, entitlements.subscriptionTier, result.usage);
    const updatedEntitlements = getAiEntitlements(req.user, updatedTokenUsage);
    const { model: _model, ...safeResult } = result;

    res.json({
      ...safeResult,
      summary: updatedSummary,
      memory: updatedMemory,
      history: updatedTurns,
      sessionId,
      tokenUsage: updatedEntitlements.tokenUsage,
      entitlements: updatedEntitlements,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'AI_CONVERSATION_FAILED', {
      clientMessage: 'Conversation partner is temporarily unavailable. Please try again.',
      logMessage: error.message || 'Conversation partner route failed',
      route: '/api/ai/conversation',
      metadata: {
        scenario: req.body?.scenario,
        sessionId: req.body?.sessionId,
        conversationMode: req.body?.conversationMode,
        action: req.body?.action,
      },
    });
  }
});

module.exports = router;
