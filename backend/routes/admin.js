const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Flashcard = require('../models/Flashcard');
const Progress = require('../models/Progress');
const GuestSession = require('../models/GuestSession');
const ErrorReport = require('../models/ErrorReport');
const ContactMessage = require('../models/ContactMessage');
const Pronunciation = require('../models/Pronunciation');
const { verifyToken, isAdmin } = require('../middleware/auth');
const { getAiEntitlements } = require('../utils/subscription');
const { recordServerError } = require('../utils/errorReporting');
const { normalizeTextKey } = require('../utils/pronunciationService');

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

function withEffectiveSubscription(user) {
  const userObj = typeof user.toObject === 'function' ? user.toObject() : { ...user };
  const aiEntitlements = getAiEntitlements(userObj);
  return {
    ...userObj,
    subscriptionTier: aiEntitlements.subscriptionTier,
    aiEntitlements,
  };
}

function safeConversationHistory(history = []) {
  if (!Array.isArray(history)) return [];
  return history
    .slice(-8)
    .filter(turn => turn && ['user', 'assistant'].includes(turn.role) && typeof turn.content === 'string')
    .map(turn => ({
      role: turn.role,
      content: turn.content.slice(0, 800),
    }));
}

const SCRIPT_LANGUAGE_PATTERNS = [
  { language: 'ko', pattern: /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/g },
  { language: 'ja', pattern: /[\u3040-\u30ff]/g },
  { language: 'zh', pattern: /[\u3400-\u9fff]/g },
  { language: 'ar', pattern: /[\u0600-\u06ff]/g },
  { language: 'he', pattern: /[\u0590-\u05ff]/g },
  { language: 'hi', pattern: /[\u0900-\u097f]/g },
  { language: 'bn', pattern: /[\u0980-\u09ff]/g },
  { language: 'ta', pattern: /[\u0b80-\u0bff]/g },
  { language: 'ru', pattern: /[\u0400-\u04ff]/g },
];

const LATIN_LANGUAGE_CODES = new Set(['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'id', 'ms', 'fil', 'tr']);

function normalizeLanguageCode(language) {
  const value = String(language || '').trim().toLowerCase();
  if (!value || value === 'auto') return '';
  const aliases = {
    kr: 'ko',
    kor: 'ko',
    cn: 'zh',
    chn: 'zh',
    jp: 'ja',
    jpn: 'ja',
    iw: 'he',
    in: 'id',
    tl: 'fil',
  };
  if (aliases[value]) return aliases[value];
  if (value.startsWith('zh')) return 'zh';
  if (value.startsWith('pt')) return 'pt';
  const base = value.split(/[-_]/)[0];
  return aliases[base] || base;
}

function detectScriptLanguage(text) {
  const value = String(text || '');
  let winner = { language: '', count: 0 };

  for (const entry of SCRIPT_LANGUAGE_PATTERNS) {
    const count = (value.match(entry.pattern) || []).length;
    if (count > winner.count) {
      winner = { language: entry.language, count };
    }
  }

  return winner.count > 0 ? winner.language : '';
}

function detectDominantLanguage(text, targetLanguage = 'ko', nativeLanguage = 'en', selectedInputLanguage = '') {
  const value = String(text || '');
  const target = normalizeLanguageCode(targetLanguage) || 'ko';
  const native = normalizeLanguageCode(nativeLanguage) || 'en';
  const selected = normalizeLanguageCode(selectedInputLanguage);
  const scriptLanguage = detectScriptLanguage(value);

  if (scriptLanguage) return scriptLanguage;

  const latinCount = (value.match(/[A-Za-z]/g) || []).length;
  if (latinCount > 0) {
    if (LATIN_LANGUAGE_CODES.has(selected)) return selected;
    if (LATIN_LANGUAGE_CODES.has(native)) return native;
    if (LATIN_LANGUAGE_CODES.has(target)) return target;
    return native;
  }

  return selected || target || native;
}

function extractRequestedPhrase(text = '') {
  const value = String(text || '').trim();
  const quoted = value.match(/["'“‘]([^"'”’]+)["'”’]/);
  if (quoted?.[1]) return quoted[1].trim().slice(0, 120);

  const meaningMatch = value.match(/(?:what does|what is|explain|meaning of)\s+(.+?)\s+(?:mean|means|in english|in korean|\?)/i);
  if (meaningMatch?.[1]) return meaningMatch[1].trim().slice(0, 120);

  const targetScriptMatch = value.match(/[ㄱ-ㅎㅏ-ㅣ가-힣][ㄱ-ㅎㅏ-ㅣ가-힣\s]*/);
  return targetScriptMatch?.[0]?.trim().slice(0, 120) || '';
}

async function callDeepSeekConversation({ scenario, targetLanguage, nativeLanguage, inputLanguage, transcript, history, difficulty }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return {
      aiEnabled: false,
      reply: 'I could not respond this time. Please try again.',
      expectedLanguage: targetLanguage || 'ko',
      coachingTip: 'Practice partner is temporarily unavailable.',
    };
  }

  const model = process.env.DEEPSEEK_CONVERSATION_MODEL || process.env.DEEPSEEK_MODEL || 'deepseek-v4-flash';
  const selectedInputLanguage = normalizeLanguageCode(inputLanguage);
  const detectedScriptLanguage = detectScriptLanguage(transcript);
  const learnerLanguage = detectDominantLanguage(transcript, targetLanguage || 'ko', nativeLanguage || 'en', inputLanguage);
  const learnerUsedNativeLanguage = learnerLanguage === normalizeLanguageCode(nativeLanguage || 'en');
  const learnerUsedTargetLanguage = learnerLanguage === normalizeLanguageCode(targetLanguage || 'ko');
  const requestedPhrase = extractRequestedPhrase(transcript);
  const systemPrompt = [
    'You are the admin-only speaking demo engine for Lingo Booth.',
    'Run a live language-learning roleplay, not a fixed database exercise.',
    'Act like a flexible conversation partner or friend, not a pronunciation drill coach.',
    'Stay inside the named scenario and choose the obvious scene role, such as barista, taxi driver, clerk, hotel staff, or new acquaintance.',
    'Do not say "repeat after me", do not ask the learner to repeat a phrase, and do not loop the same prompt.',
    'Do not provide Korean for the learner to copy unless they explicitly ask for a phrase suggestion.',
    'Each reply must advance the discussion with one natural, short response or question.',
    'If the learner orders coffee, respond like cafe staff; if the learner gives a destination, respond like a taxi driver.',
    'The learner may interrupt, change topic, ask for easier or harder language, or ask about words and phrases from inside or outside the discussion.',
    'If the learner uses their native language, first answer in the native language, then add a brief target-language continuation or natural version.',
    'For native-language turns, do not reply only in the target language.',
    'For native-language turns, return speechParts with one native-language part and one target-language part.',
    'If latestLearnerTranscript contains the target-language script, treat it as target-language learner speech even when the microphone selector was wrong.',
    'If the learner speaks Korean Hangul and targetLanguage is ko, respond to the Korean meaning naturally; do not pretend the learner asked an English meta-question.',
    'If the learner asks what a word or phrase means, explain the exact word or phrase they asked about; do not substitute a different word.',
    'If requestedPhrase is provided, your explanation must be about requestedPhrase exactly.',
    'When explaining words or phrases in the native language, set expectedLanguage to the native language unless speechParts are provided.',
    'If the learner switches topic, follow the new topic naturally.',
    'If the learner asks for difficulty changes, adapt immediately.',
    'Keep replies short enough to be spoken aloud safely in hands-free mode.',
    'Prefer the target language, but include brief coaching in the native language when useful.',
    'Never ask the learner to look at the screen while driving or moving.',
    'Return strict JSON with keys: reply, coachingTip, expectedLanguage, nextSuggestedIntent, speechParts.',
    'Use short language codes such as ko, en, es, fr, de, ja, zh, hi, ar, he, pt, it, nl, ru, id, ms, fil, tr, bn, or ta for expectedLanguage and speechParts[].language.',
  ].join(' ');

  const messages = [
    { role: 'system', content: systemPrompt },
    ...safeConversationHistory(history),
    {
      role: 'user',
      content: JSON.stringify({
        scenario: scenario || 'Casual conversation practice',
        targetLanguage: targetLanguage || 'ko',
        nativeLanguage: nativeLanguage || 'en',
        inputLanguage: inputLanguage || '',
        selectedInputLanguage,
        detectedScriptLanguage,
        difficulty: difficulty || 'friendly beginner',
        learnerLanguage,
        learnerUsedNativeLanguage,
        learnerUsedTargetLanguage,
        requestedPhrase,
        latestLearnerTranscript: transcript,
        instruction: [
          'Continue naturally as a conversation partner.',
          'Stay in the scenario and make the next practical turn in that scene.',
          'If the learner asks a question, changes topic, requests an explanation, or asks to adjust difficulty, handle that request directly before continuing.',
          learnerUsedNativeLanguage
            ? 'The learner used their native language. Reply in two parts: first a direct native-language answer, then a short target-language continuation. Put both parts in reply, and also provide speechParts with matching language codes.'
            : 'The learner used the target language or another non-native language. Continue mostly in the target language, with light native-language support only if useful.',
          learnerUsedTargetLanguage
            ? 'The learner used the target language. Respond to what they actually said and continue the roleplay naturally; do not switch into a translation lesson unless they ask for one.'
            : '',
          'For an explanation request in the native language, explain the exact requested word or phrase mostly in the native language, then include a short target-language example or continuation.',
          requestedPhrase ? `The exact requested phrase is: ${requestedPhrase}. Explain this phrase, not any other phrase.` : '',
          'Do not correct every sentence. Keep coaching light and only include it when it helps.',
          'Never use drill language such as "repeat after me" or "say it again" unless the learner explicitly asks for pronunciation practice.',
        ].join(' '),
      }),
    },
  ];

  const response = await fetch(DEEPSEEK_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`DeepSeek request failed (${response.status}): ${detail.slice(0, 300)}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content || '{}';
  let parsed;
  try {
    parsed = JSON.parse(content);
  } catch (_) {
    parsed = { reply: content };
  }

  const reply = String(parsed.reply || '').slice(0, 800);
  const fallbackLanguage = detectDominantLanguage(reply, targetLanguage || 'ko', nativeLanguage || 'en');
  const parsedLanguage = normalizeLanguageCode(String(parsed.expectedLanguage || '').slice(0, 20));
  const expectedLanguage = parsedLanguage || fallbackLanguage;
  const speechParts = Array.isArray(parsed.speechParts)
    ? parsed.speechParts
      .filter(part => part && typeof part.text === 'string')
      .slice(0, 3)
      .map(part => ({
        language: normalizeLanguageCode(part.language) || detectDominantLanguage(part.text, targetLanguage || 'ko', nativeLanguage || 'en'),
        text: part.text.slice(0, 500),
      }))
    : [];

  return {
    aiEnabled: true,
    reply,
    coachingTip: String(parsed.coachingTip || '').slice(0, 400),
    expectedLanguage,
    nextSuggestedIntent: String(parsed.nextSuggestedIntent || '').slice(0, 200),
    speechParts,
    model,
  };
}

function isLocalDemoRequest(req) {
  if (process.env.NODE_ENV === 'production') return false;
  if (process.env.ENABLE_LOCAL_DEMO_BYPASS === 'false') return false;

  const host = (req.hostname || req.headers.host || '').split(':')[0];
  const remoteAddress = req.ip || req.socket?.remoteAddress || '';
  const localHosts = new Set(['localhost', '127.0.0.1', '::1']);
  const localRemotes = new Set(['127.0.0.1', '::1', '::ffff:127.0.0.1']);

  return localHosts.has(host) || localRemotes.has(remoteAddress);
}

async function handleSpeakingDemoConversation(req, res) {
  try {
    const { scenario, targetLanguage, nativeLanguage, inputLanguage, transcript, history, difficulty } = req.body || {};

    if (!transcript || typeof transcript !== 'string' || transcript.trim().length === 0) {
      return res.status(400).json({ message: 'Transcript is required' });
    }

    if (transcript.length > 1200) {
      return res.status(400).json({ message: 'Transcript too long for demo conversation' });
    }

    const result = await callDeepSeekConversation({
      scenario,
      targetLanguage,
      nativeLanguage,
      inputLanguage,
      transcript: transcript.trim(),
      history,
      difficulty,
    });

    return res.json(result);
  } catch (error) {
    console.error('Admin speaking demo conversation error:', error.message || error);
    await recordServerError(req, {
      error,
      message: error.message || 'Admin speaking demo conversation failed',
      route: req.originalUrl || '/api/admin/speaking-demo/conversation',
      metadata: {
        scenario: req.body?.scenario,
        targetLanguage: req.body?.targetLanguage,
        nativeLanguage: req.body?.nativeLanguage,
      },
    });
    return res.status(500).json({ message: 'Conversation partner is temporarily unavailable. Please try again.' });
  }
}

// Temporary local-only demo bypass. Remove this route when the demo no longer needs no-login access.
router.post('/local-demo/speaking-demo/conversation', async (req, res) => {
  if (!isLocalDemoRequest(req)) {
    return res.status(404).json({ message: 'Not found' });
  }
  return handleSpeakingDemoConversation(req, res);
});

// Apply auth middleware to all routes below this line.
router.use(verifyToken);
router.use(isAdmin);

router.get('/pronunciation-audit', async (req, res) => {
  try {
    const targetLang = String(req.query.targetLang || 'ko').trim().toLowerCase();
    const nativeLang = String(req.query.nativeLang || 'en').trim().toLowerCase();
    const limit = Math.min(100, Math.max(1, Number(req.query.limit) || 25));
    const targetField = targetLang === 'ko' ? 'korean' : (targetLang === 'en' ? 'english' : targetLang);

    const defaultCards = await Flashcard.find({ isDefault: true, targetLang })
      .select(`${targetField} korean english romanization officialPronunciation learnerPronunciation pronunciationConfidence`)
      .limit(limit)
      .lean();

    const normalizedTargets = defaultCards
      .map(card => normalizeTextKey(card[targetField] || card.korean || card.english || ''))
      .filter(Boolean);

    const cached = await Pronunciation.find({
      targetLang,
      nativeLang,
      normalizedTargetText: { $in: normalizedTargets },
    }).lean();
    const cachedMap = new Map(cached.map(item => [item.normalizedTargetText, item]));

    const missing = [];
    const weak = [];

    defaultCards.forEach((card) => {
      const targetText = String(card[targetField] || card.korean || card.english || '').trim();
      const normalized = normalizeTextKey(targetText);
      const pronunciation = cachedMap.get(normalized);
      if (!pronunciation) {
        missing.push({ id: card._id, targetText });
      } else if (pronunciation.pronunciationConfidence === 'audioFirst') {
        weak.push({
          id: card._id,
          targetText,
          officialPronunciation: pronunciation.officialPronunciation || '',
          learnerPronunciation: pronunciation.learnerPronunciation || '',
          confidence: pronunciation.pronunciationConfidence,
        });
      }
    });

    res.json({
      targetLang,
      nativeLang,
      sampled: defaultCards.length,
      cached: cached.length,
      missing,
      weak,
    });
  } catch (error) {
    console.error('Admin pronunciation audit error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get comprehensive dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Basic counts
    const [totalUsers, totalLessons, totalFlashcards, totalProgress, totalGuestSessions, totalErrorReports, openErrorReports, totalContactMessages, openContactMessages] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Flashcard.countDocuments({ isDefault: { $ne: true } }),
      Progress.countDocuments(),
      GuestSession.countDocuments(),
      ErrorReport.countDocuments(),
      ErrorReport.countDocuments({ acknowledged: false }),
      ContactMessage.countDocuments(),
      ContactMessage.countDocuments({ acknowledged: false }),
    ]);

    // User status counts
    const [activeUsers, suspendedUsers, adminCount, challengeModeUsers, relaxedModeUsers] = await Promise.all([
      User.countDocuments({ status: 'active' }),
      User.countDocuments({ status: 'suspended' }),
      User.countDocuments({ role: 'admin' }),
      User.countDocuments({ xpDecayEnabled: true }),
      User.countDocuments({ xpDecayEnabled: { $ne: true } }),
    ]);

    // Time-based stats
    const now = new Date();
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const lastMonth = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const [newUsersLastWeek, newUsersLastMonth, activeUsersToday, activeUsersThisWeek] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: lastWeek } }),
      User.countDocuments({ createdAt: { $gte: lastMonth } }),
      User.countDocuments({ lastActive: { $gte: last24Hours } }),
      User.countDocuments({ lastActive: { $gte: lastWeek } }),
    ]);

    // Use aggregation for time/login stats instead of loading all users
    const [timeStats] = await User.aggregate([
      { $match: { totalTimeSpent: { $gt: 0 } } },
      { $group: { _id: null, totalTime: { $sum: '$totalTimeSpent' }, count: { $sum: 1 } } },
    ]);
    const avgTimeSpent = timeStats ? Math.round(timeStats.totalTime / timeStats.count) : 0;

    const [loginStats] = await User.aggregate([
      { $group: { _id: null, totalLogins: { $sum: '$loginCount' } } },
    ]);
    const totalLogins = loginStats ? loginStats.totalLogins : 0;

    // Rate limit stats
    const [rateLimitStats] = await User.aggregate([
      { $match: { rateLimitHits: { $gt: 0 } } },
      {
        $group: {
          _id: null,
          totalRateLimitHits: { $sum: '$rateLimitHits' },
          usersRateLimited: { $sum: 1 },
        },
      },
    ]);
    const totalRateLimitHits = rateLimitStats ? rateLimitStats.totalRateLimitHits : 0;
    const usersRateLimited = rateLimitStats ? rateLimitStats.usersRateLimited : 0;

    // User growth data (last 7 days)
    const growthDays = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date(now);
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setHours(23, 59, 59, 999);
      growthDays.push({
        date: dayStart.toISOString().split('T')[0],
        dayStart,
        dayEnd,
        count: 0,
      });
    }
    const growthStart = growthDays[0].dayStart;
    const growthEnd = growthDays[growthDays.length - 1].dayEnd;
    const userGrowthCounts = await User.aggregate([
      { $match: { createdAt: { $gte: growthStart, $lte: growthEnd } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 },
        },
      },
    ]);
    const growthCountMap = new Map(userGrowthCounts.map(day => [day._id, day.count]));
    const userGrowth = growthDays.map(({ date }) => ({
      date,
      count: growthCountMap.get(date) || 0,
    }));

    // Recent activity (last 10 users who were active)
    const recentActiveUsers = await User.find({ lastActive: { $exists: true } })
      .select('username email lastActive totalTimeSpent xpDecayEnabled lastActivityType')
      .sort({ lastActive: -1 })
      .limit(10);

    res.json({
      overview: {
        totalUsers,
        activeUsers,
        suspendedUsers,
        adminCount,
        totalLessons,
        totalFlashcards,
        totalProgress,
        totalLogins,
        totalRateLimitHits,
        usersRateLimited,
        challengeModeUsers,
        relaxedModeUsers,
        totalGuestSessions,
        totalErrorReports,
        openErrorReports,
        totalContactMessages,
        openContactMessages,
      },
      activity: {
        activeUsersToday,
        activeUsersThisWeek,
        avgTimeSpent, // in minutes
        newUsersLastWeek,
        newUsersLastMonth,
      },
      userGrowth,
      recentActiveUsers,
    });
  } catch (error) {
    console.error('Admin stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get client-side failure reports for admins.
router.get('/error-reports', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100);
    const status = String(req.query.status || 'open').toLowerCase();
    const severity = String(req.query.severity || '').toLowerCase();
    const source = String(req.query.source || '').toLowerCase();

    const filter = {};
    if (status === 'open') filter.acknowledged = false;
    if (status === 'acknowledged') filter.acknowledged = true;
    if (['info', 'warning', 'error', 'critical'].includes(severity)) filter.severity = severity;
    if (['web', 'mobile', 'admin-web', 'backend', 'unknown'].includes(source)) filter.source = source;

    const skip = (page - 1) * limit;
    const [reports, total, openCount, criticalOpenCount] = await Promise.all([
      ErrorReport.find(filter)
        .populate('userId', 'username email role subscriptionTier')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ErrorReport.countDocuments(filter),
      ErrorReport.countDocuments({ acknowledged: false }),
      ErrorReport.countDocuments({ acknowledged: false, severity: 'critical' }),
    ]);

    res.json({
      reports,
      total,
      page,
      totalPages: Math.max(Math.ceil(total / limit), 1),
      openCount,
      criticalOpenCount,
    });
  } catch (error) {
    console.error('Admin error reports fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Acknowledge a failure after an admin has reviewed it.
router.put('/error-reports/:reportId/acknowledge', async (req, res) => {
  try {
    const report = await ErrorReport.findByIdAndUpdate(
      req.params.reportId,
      {
        acknowledged: true,
        acknowledgedAt: new Date(),
        acknowledgedBy: req.userId,
      },
      { new: true }
    );

    if (!report) {
      return res.status(404).json({ message: 'Error report not found' });
    }

    res.json({ message: 'Failure acknowledged', report });
  } catch (error) {
    console.error('Admin error report acknowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear the open failure queue without deleting the historical reports.
router.put('/error-reports/clear-open', async (req, res) => {
  try {
    const acknowledgedAt = new Date();
    const result = await ErrorReport.updateMany(
      { acknowledged: false },
      {
        $set: {
          acknowledged: true,
          acknowledgedAt,
          acknowledgedBy: req.userId,
        },
      }
    );

    res.json({
      message: 'Open failures cleared',
      acknowledgedCount: result.modifiedCount || 0,
    });
  } catch (error) {
    console.error('Admin error reports clear error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user-submitted contact messages for admins.
router.get('/contact-messages', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 50, 1), 100);
    const status = String(req.query.status || 'open').toLowerCase();
    const senderType = String(req.query.senderType || 'all').toLowerCase();

    const statusFilter = {};
    if (status === 'open') statusFilter.acknowledged = false;
    if (status === 'acknowledged') statusFilter.acknowledged = true;

    const withSenderFilter = (baseFilter, type) => {
      const nextFilter = { ...baseFilter };
      if (type === 'guest') {
        nextFilter['session.isGuest'] = true;
      } else if (type === 'registered') {
        nextFilter.$or = [
          { 'session.isGuest': false },
          { userId: { $exists: true, $ne: null } },
        ];
      }
      return nextFilter;
    };

    const filter = withSenderFilter(statusFilter, senderType);

    const skip = (page - 1) * limit;
    const [messages, total, openCount, registeredCount, guestCount] = await Promise.all([
      ContactMessage.find(filter)
        .populate('userId', 'username email role subscriptionTier')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ContactMessage.countDocuments(filter),
      ContactMessage.countDocuments({ acknowledged: false }),
      ContactMessage.countDocuments(withSenderFilter(statusFilter, 'registered')),
      ContactMessage.countDocuments(withSenderFilter(statusFilter, 'guest')),
    ]);

    res.json({
      messages,
      total,
      page,
      totalPages: Math.max(Math.ceil(total / limit), 1),
      openCount,
      registeredCount,
      guestCount,
      senderType,
    });
  } catch (error) {
    console.error('Admin contact messages fetch error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Mark a contact message as read after an admin has reviewed it.
router.put('/contact-messages/:messageId/acknowledge', async (req, res) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.messageId,
      {
        acknowledged: true,
        acknowledgedAt: new Date(),
        acknowledgedBy: req.userId,
      },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Contact message not found' });
    }

    res.json({ message: 'Contact message marked as read', contactMessage: message });
  } catch (error) {
    console.error('Admin contact message acknowledge error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Clear the open contact message queue without deleting historical messages.
router.put('/contact-messages/clear-open', async (req, res) => {
  try {
    const acknowledgedAt = new Date();
    const result = await ContactMessage.updateMany(
      { acknowledged: false },
      {
        $set: {
          acknowledged: true,
          acknowledgedAt,
          acknowledgedBy: req.userId,
        },
      }
    );

    res.json({
      message: 'Open contact messages cleared',
      acknowledgedCount: result.modifiedCount || 0,
    });
  } catch (error) {
    console.error('Admin contact messages clear error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin-only speaking demo conversation turn.
// This is intentionally kept under /api/admin so it cannot be reached by learners.
router.post('/speaking-demo/conversation', async (req, res) => {
  return handleSpeakingDemoConversation(req, res);
});

// Get all users with detailed info
router.get('/users', async (req, res) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 });
    res.json(users.map(withEffectiveSubscription));
  } catch (error) {
    console.error('Admin get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single user details (enhanced)
router.get('/users/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const [progressCount, flashcardCount, progressBreakdown, recentProgress] = await Promise.all([
      Progress.countDocuments({ userId: req.params.userId }),
      Flashcard.countDocuments({ userId: req.params.userId }),
      Progress.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(req.params.userId) } },
        { $group: { _id: '$masteryStatus', count: { $sum: 1 } } },
      ]),
      Progress.find({ userId: req.params.userId })
        .sort({ timestamp: -1 })
        .limit(5)
        .select('category skillType score masteryStatus timestamp'),
    ]);

    const breakdown = {};
    progressBreakdown.forEach(p => { breakdown[p._id || 'unknown'] = p.count; });

    res.json({
      user: withEffectiveSubscription(user),
      stats: {
        progressCount,
        flashcardCount,
        progressBreakdown: breakdown,
        recentProgress,
      },
    });
  } catch (error) {
    console.error('Admin get user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Suspend a user
router.put('/users/:userId/suspend', async (req, res) => {
  try {
    const { reason } = req.body;

    // Sanitize reason (strip HTML tags)
    const sanitizedReason = reason
      ? String(reason).replace(/<[^>]*>/g, '').substring(0, 500)
      : 'Suspended by administrator';

    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent suspending self
    if (user._id.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot suspend your own account' });
    }

    // Prevent suspending other admins
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot suspend an admin account' });
    }

    user.status = 'suspended';
    user.suspendedAt = new Date();
    user.suspendReason = sanitizedReason;
    await user.save();

    res.json({
      message: `User ${user.username} has been suspended`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
        suspendedAt: user.suspendedAt,
        suspendReason: user.suspendReason,
      }
    });
  } catch (error) {
    console.error('Admin suspend user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Unsuspend a user
router.put('/users/:userId/unsuspend', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.status = 'active';
    user.suspendedAt = null;
    user.suspendReason = null;
    await user.save();

    res.json({
      message: `User ${user.username} has been reactivated`,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        status: user.status,
      }
    });
  } catch (error) {
    console.error('Admin unsuspend user error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update user role
router.put('/users/:userId/role', async (req, res) => {
  try {
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    // Prevent demoting self
    if (req.params.userId === req.userId && role !== 'admin') {
      return res.status(400).json({ message: 'Cannot demote your own account' });
    }

    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { role, subscriptionTier: role === 'admin' ? 'pro' : 'plus' },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `User ${user.username} role updated to ${role}`,
      user
    });
  } catch (error) {
    console.error('Admin update role error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Reset a user's rate limit counter
router.put('/users/:userId/reset-rate-limit', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: { rateLimitHits: 0, lastRateLimited: null } },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: `Rate limit counter reset for ${user.username}`,
      user,
    });
  } catch (error) {
    console.error('Admin reset rate limit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user (with transaction for data consistency)
router.delete('/users/:userId', async (req, res) => {
  let session;
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Prevent deleting self
    if (user._id.toString() === req.userId) {
      return res.status(400).json({ message: 'Cannot delete your own account from admin panel' });
    }

    // Prevent deleting other admins
    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot delete an admin account' });
    }

    session = await mongoose.startSession();
    await session.withTransaction(async () => {
      await Progress.deleteMany({ userId: req.params.userId }, { session });
      await Flashcard.deleteMany({ userId: req.params.userId }, { session });
      await User.findByIdAndDelete(req.params.userId, { session });
    });

    res.json({ message: `User ${user.username} and all associated data deleted successfully` });
  } catch (error) {
    console.error('Admin delete user error:', error);
    res.status(500).json({ message: 'Server error' });
  } finally {
    if (session) session.endSession();
  }
});

// Get all user-created flashcards (admin only)
router.get('/flashcards', async (req, res) => {
  try {
    const flashcards = await Flashcard.find({ userId: { $exists: true } })
      .populate('userId', 'username email')
      .sort({ createdAt: -1 });
    res.json(flashcards);
  } catch (error) {
    console.error('Admin get flashcards error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a user-created flashcard (admin only)
router.delete('/flashcards/:flashcardId', async (req, res) => {
  try {
    const flashcard = await Flashcard.findById(req.params.flashcardId);
    if (!flashcard) {
      return res.status(404).json({ message: 'Flashcard not found' });
    }
    await Flashcard.findByIdAndDelete(req.params.flashcardId);
    res.json({ message: 'Flashcard deleted' });
  } catch (error) {
    console.error('Admin delete flashcard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get guest sessions (paginated) with comprehensive engagement stats
router.get('/guests', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = 50;
    const skip = (page - 1) * limit;

    const now = new Date();
    const today = new Date(now); today.setHours(0, 0, 0, 0);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const [
      sessions, total, todayCount, weekCount,
      uniqueCountries, topLanguagePairs,
      engagementStats, deviceStats, conversions,
    ] = await Promise.all([
      GuestSession.find().sort({ lastSeen: -1 }).skip(skip).limit(limit),
      GuestSession.countDocuments(),
      GuestSession.countDocuments({ lastSeen: { $gte: today } }),
      GuestSession.countDocuments({ lastSeen: { $gte: lastWeek } }),
      GuestSession.distinct('country'),
      GuestSession.aggregate([
        { $group: { _id: { native: '$nativeLanguage', target: '$targetLanguage' }, count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 5 },
      ]),
      // Engagement averages / totals across all sessions
      GuestSession.aggregate([
        {
          $group: {
            _id: null,
            avgTimeSpent:    { $avg: '$timeSpent' },
            avgCardsStudied: { $avg: '$cardsStudied' },
            totalCardsStudied:  { $sum: '$cardsStudied' },
            totalAudioPlays:    { $sum: '$audioPlays' },
            totalLessonsViewed: { $sum: '$lessonsViewed' },
            engagedSessions: {
              $sum: { $cond: [{ $gt: ['$cardsStudied', 0] }, 1, 0] },
            },
          },
        },
      ]),
      // Device breakdown
      GuestSession.aggregate([
        { $group: { _id: '$deviceType', count: { $sum: 1 } } },
        { $sort: { count: -1 } },
      ]),
      // Conversions (sessions where the guest signed up)
      GuestSession.countDocuments({ convertedToUser: true }),
    ]);

    const eng = engagementStats[0] || {};

    res.json({
      sessions,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      stats: {
        todayCount,
        weekCount,
        uniqueCountries: uniqueCountries.filter(c => c && c !== 'Unknown').length,
        topLanguagePairs,
        // Engagement
        avgTimeSpent:       eng.avgTimeSpent    ? Math.round(eng.avgTimeSpent)        : 0, // seconds
        avgCardsStudied:    eng.avgCardsStudied ? Math.round(eng.avgCardsStudied * 10) / 10 : 0,
        totalCardsStudied:  eng.totalCardsStudied  || 0,
        totalAudioPlays:    eng.totalAudioPlays    || 0,
        totalLessonsViewed: eng.totalLessonsViewed || 0,
        engagedSessions:    eng.engagedSessions    || 0, // sessions where ≥1 card was studied
        // Conversion
        conversions,
        conversionRate: total > 0 ? Math.round((conversions / total) * 100) : 0,
        // Device
        deviceBreakdown: deviceStats,
      },
    });
  } catch (error) {
    console.error('Admin guests error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Migrate existing lessons (add targetLang) + seed multi-language lessons
router.post('/seed-lessons', async (req, res) => {
  try {
    // Step 1: Migrate existing lessons — add targetLang: 'ko' where missing
    const existing = await Lesson.find({ targetLang: { $exists: false } });
    let migrated = 0;
    for (const lesson of existing) {
      await Lesson.updateOne({ _id: lesson._id }, { $set: { targetLang: 'ko', nativeLang: 'en' } });
      migrated++;
    }

    // Also backfill generic content fields from legacy fields
    const allLessons = await Lesson.find({}).lean();
    let contentMigrated = 0;
    for (const lesson of allLessons) {
      let needsUpdate = false;
      const contentUpdates = [];
      for (const item of lesson.content) {
        const patch = {};
        if (item.korean && !item.targetText) { patch.targetText = item.korean; needsUpdate = true; }
        if (item.english && !item.nativeText) { patch.nativeText = item.english; needsUpdate = true; }
        if (item.example && !item.exampleTarget) { patch.exampleTarget = item.example; needsUpdate = true; }
        if (item.exampleEnglish && !item.exampleNative) { patch.exampleNative = item.exampleEnglish; needsUpdate = true; }
        if (item.breakdown && item.breakdown.length > 0) {
          patch.breakdown = item.breakdown.map(b => {
            const bp = { ...b };
            if (b.korean && !b.target) { bp.target = b.korean; needsUpdate = true; }
            if (b.english && !b.native) { bp.native = b.english; needsUpdate = true; }
            return bp;
          });
        }
        contentUpdates.push({ ...item, ...patch });
      }
      if (needsUpdate) {
        await Lesson.updateOne({ _id: lesson._id }, { $set: { content: contentUpdates } });
        contentMigrated++;
      }
    }

    // Step 2: Seed new multi-language lessons (skip languages already in DB)
    const existingLangs = await Lesson.distinct('targetLang');
    const langDataMap = {
      en: require('../lessonData/en'),
      es: require('../lessonData/es'),
      fr: require('../lessonData/fr'),
      de: require('../lessonData/de'),
      zh: require('../lessonData/zh'),
      ja: require('../lessonData/ja'),
      hi: require('../lessonData/hi'),
      ar: require('../lessonData/ar'),
      he: require('../lessonData/he'),
      pt: require('../lessonData/pt'),
      it: require('../lessonData/it'),
      nl: require('../lessonData/nl'),
      ru: require('../lessonData/ru'),
      id: require('../lessonData/id'),
      ms: require('../lessonData/ms'),
      fil: require('../lessonData/fil'),
      tr: require('../lessonData/tr'),
      bn: require('../lessonData/bn'),
      ta: require('../lessonData/ta'),
    };

    const newLessons = [];
    for (const [lang, data] of Object.entries(langDataMap)) {
      if (existingLangs.includes(lang)) continue; // skip if already seeded
      // Collect all exported lesson objects (supports beginner + intermediate/advanced/sentences)
      const allLessons = Object.values(data).filter(Boolean);
      newLessons.push(...allLessons);
    }

    let inserted = 0;
    if (newLessons.length > 0) {
      const result = await Lesson.insertMany(newLessons);
      inserted = result.length;
    }

    res.json({
      message: 'Lesson migration and seeding complete',
      migrated,
      contentMigrated,
      inserted,
      existingLangs,
    });
  } catch (error) {
    console.error('Admin seed-lessons error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Seed multi-language default flashcards (skip languages already in DB)
router.post('/seed-flashcards', async (req, res) => {
  try {
    const Flashcard = require('../models/Flashcard');
    const { prepareDefaultFlashcardsForSeed } = require('../utils/languageConcepts');
    const existingLangs = await Flashcard.distinct('targetLang', { isDefault: true });

    const langDataMap = {};
    const langCodes = ['en','es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','ms','fil','tr','bn','ta'];
    for (const lang of langCodes) {
      if (existingLangs.includes(lang)) continue;
      try {
        langDataMap[lang] = require(`../flashcardData/${lang}`);
      } catch (e) {
        // Data file not yet created for this language — skip
      }
    }

    let inserted = 0;
    const normalizedCounts = {};
    for (const [lang, cards] of Object.entries(langDataMap)) {
      const docs = prepareDefaultFlashcardsForSeed(cards, lang, 0);
      normalizedCounts[lang] = { source: cards.length, inserted: docs.length };
      if (docs.length > 0) {
        const result = await Flashcard.insertMany(docs);
        inserted += result.length;
      }
    }

    res.json({
      message: 'Flashcard seeding complete',
      inserted,
      existingLangs,
      newLangs: Object.keys(langDataMap),
      normalizedCounts,
    });
  } catch (error) {
    console.error('Admin seed-flashcards error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
