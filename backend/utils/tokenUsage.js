const crypto = require('crypto');
const TokenUsage = require('../models/TokenUsage');
const { getDailyAiTokenLimit } = require('./subscription');

const DEVICE_ID_HEADER = 'x-lingo-device-id';

function hashValue(value) {
  return crypto
    .createHash('sha256')
    .update(String(value || ''))
    .digest('hex');
}

function sanitizeDeviceId(value) {
  return String(value || '')
    .trim()
    .replace(/[^a-zA-Z0-9:_-]/g, '')
    .slice(0, 160);
}

function getDateKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

function getResetAt(date = new Date()) {
  return new Date(Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate() + 1,
    0,
    0,
    0,
    0,
  ));
}

function clampTokenCount(value) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.ceil(parsed);
}

function estimateTextTokens(value) {
  const text = typeof value === 'string' ? value : JSON.stringify(value || '');
  const trimmed = String(text || '').trim();
  if (!trimmed) return 0;
  const wordLike = (trimmed.match(/[\p{L}\p{N}_]+/gu) || []).length;
  const charEstimate = Math.ceil(trimmed.length / 4);
  return Math.max(charEstimate, wordLike);
}

function estimateConversationTurnTokens(payload = {}) {
  const history = Array.isArray(payload.history) ? payload.history.slice(-12) : [];
  const memory = payload.memory && typeof payload.memory === 'object' ? payload.memory : {};

  return 650
    + estimateTextTokens(payload.scenario)
    + estimateTextTokens(payload.transcript)
    + estimateTextTokens(payload.difficulty)
    + estimateTextTokens(payload.summary)
    + estimateTextTokens(memory)
    + history.reduce((sum, turn) => sum + estimateTextTokens(turn?.content), 0);
}

function resolveAiIdentity(req) {
  if (req.userId) {
    return {
      identityKey: `user:${req.userId}`,
      identityType: 'user',
      userId: req.userId,
      anonymousIdHash: null,
    };
  }

  const deviceId = sanitizeDeviceId(req.get(DEVICE_ID_HEADER) || req.body?.deviceId);
  if (deviceId) {
    const anonymousIdHash = hashValue(deviceId);
    return {
      identityKey: `device:${anonymousIdHash}`,
      identityType: 'device',
      userId: null,
      anonymousIdHash,
    };
  }

  const fingerprint = hashValue([
    req.ip || req.socket?.remoteAddress || '',
    req.get('user-agent') || '',
    req.get('accept-language') || '',
  ].join('|'));

  return {
    identityKey: `fingerprint:${fingerprint}`,
    identityType: 'fingerprint',
    userId: null,
    anonymousIdHash: fingerprint,
  };
}

function formatUsage(doc, tier, now = new Date()) {
  const dailyLimit = getDailyAiTokenLimit(tier);
  const usedTokens = clampTokenCount(doc?.usedTokens);
  const remainingTokens = Math.max(0, dailyLimit - usedTokens);
  const resetAt = getResetAt(now);

  return {
    usedTokens,
    dailyLimit,
    remainingTokens,
    quotaExceeded: remainingTokens <= 0,
    resetAt: resetAt.toISOString(),
    resetInMs: Math.max(0, resetAt.getTime() - now.getTime()),
    dateKey: getDateKey(now),
  };
}

async function getDailyTokenUsage(identity, tier, now = new Date()) {
  const dailyLimit = getDailyAiTokenLimit(tier);
  const dateKey = getDateKey(now);

  const doc = await TokenUsage.findOneAndUpdate(
    { identityKey: identity.identityKey, dateKey },
    {
      $setOnInsert: {
        identityKey: identity.identityKey,
        identityType: identity.identityType,
        userId: identity.userId || null,
        anonymousIdHash: identity.anonymousIdHash || null,
        dateKey,
        usedTokens: 0,
        promptTokens: 0,
        completionTokens: 0,
        requestCount: 0,
      },
      $set: {
        tier,
        dailyLimit,
      },
    },
    { upsert: true, new: true },
  );

  return formatUsage(doc, tier, now);
}

async function recordTokenUsage(identity, tier, usage = {}, now = new Date()) {
  const promptTokens = clampTokenCount(usage.promptTokens ?? usage.prompt_tokens);
  const completionTokens = clampTokenCount(usage.completionTokens ?? usage.completion_tokens);
  const totalTokens = clampTokenCount(
    usage.totalTokens
      ?? usage.total_tokens
      ?? (promptTokens + completionTokens),
  );

  if (totalTokens <= 0) {
    return getDailyTokenUsage(identity, tier, now);
  }

  const dailyLimit = getDailyAiTokenLimit(tier);
  const dateKey = getDateKey(now);

  const doc = await TokenUsage.findOneAndUpdate(
    { identityKey: identity.identityKey, dateKey },
    {
      $setOnInsert: {
        identityKey: identity.identityKey,
        identityType: identity.identityType,
        userId: identity.userId || null,
        anonymousIdHash: identity.anonymousIdHash || null,
        dateKey,
      },
      $set: {
        tier,
        dailyLimit,
        lastRequestAt: now,
      },
      $inc: {
        usedTokens: totalTokens,
        promptTokens,
        completionTokens,
        requestCount: 1,
      },
    },
    { upsert: true, new: true },
  );

  return formatUsage(doc, tier, now);
}

function buildQuotaExceededMessage(usage) {
  const resetAt = usage?.resetAt ? new Date(usage.resetAt) : getResetAt();
  return `Daily AI limit reached. You can continue using AI after ${resetAt.toLocaleString('en-US', { timeZone: 'UTC', hour12: false })} UTC.`;
}

module.exports = {
  buildQuotaExceededMessage,
  estimateConversationTurnTokens,
  estimateTextTokens,
  getDailyTokenUsage,
  recordTokenUsage,
  resolveAiIdentity,
};
