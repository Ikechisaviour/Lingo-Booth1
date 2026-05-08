const express = require('express');
const router = express.Router();
const ConversationMemory = require('../models/ConversationMemory');
const { optionalAuth } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const {
  buildQuotaExceededMessage,
  estimateConversationTurnTokens,
  getDailyTokenUsage,
  recordTokenUsage,
  resolveAiIdentity,
} = require('../utils/tokenUsage');
const {
  buildLanguagePairRedirect,
  callAIConversation,
  detectOutOfPairLanguage,
  safeConversationHistory,
  sanitizeMemory,
  sanitizeSummary,
} = require('../utils/aiConversation');

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
    console.error('AI entitlements error:', error.message || error);
    res.status(500).json({ message: 'Could not load AI access settings.' });
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
    } = req.body || {};

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    if (transcript.length > 1200) {
      return res.status(400).json({ message: 'Transcript too long for conversation' });
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

    if (entitlements.canSyncAIMemory && req.userId) {
      memoryDoc = await ConversationMemory.findOne({ userId: req.userId, sessionId });
      if (memoryDoc) {
        summary = sanitizeSummary(memoryDoc.summary);
        memory = sanitizeMemory(memoryDoc.memory);
        effectiveHistory = safeConversationHistory(memoryDoc.lastTurns);
      }
    }

    const outOfPair = detectOutOfPairLanguage({
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

    const result = await callAIConversation({
      scenario,
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
    });

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
    console.error('AI conversation error:', error.message || error);
    res.status(500).json({
      message: 'Conversation partner is temporarily unavailable. Please try again.',
    });
  }
});

module.exports = router;
