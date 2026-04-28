const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User');
const Lesson = require('../models/Lesson');
const Flashcard = require('../models/Flashcard');
const Progress = require('../models/Progress');
const GuestSession = require('../models/GuestSession');
const { verifyToken, isAdmin } = require('../middleware/auth');

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';

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

function detectDominantLanguage(text, targetLanguage = 'ko', nativeLanguage = 'en') {
  const value = String(text || '');
  const hangulCount = (value.match(/[ㄱ-ㅎㅏ-ㅣ가-힣]/g) || []).length;
  const latinCount = (value.match(/[A-Za-z]/g) || []).length;
  return latinCount > hangulCount * 1.5 ? nativeLanguage : targetLanguage;
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

async function callOpenAIConversation({ scenario, targetLanguage, nativeLanguage, inputLanguage, transcript, history, difficulty }) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return {
      aiEnabled: false,
      reply: 'AI conversation is not configured yet. Add OPENAI_API_KEY on the backend to enable live roleplay.',
      expectedLanguage: targetLanguage || 'ko',
      coachingTip: 'Backend fallback is active, so this is not a model-generated reply.',
    };
  }

  const model = process.env.OPENAI_CONVERSATION_MODEL || process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const learnerLanguage = inputLanguage || detectDominantLanguage(transcript, targetLanguage || 'ko', nativeLanguage || 'en');
  const learnerUsedNativeLanguage = learnerLanguage === (nativeLanguage || 'en');
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
        difficulty: difficulty || 'friendly beginner',
        learnerLanguage,
        learnerUsedNativeLanguage,
        requestedPhrase,
        latestLearnerTranscript: transcript,
        instruction: [
          'Continue naturally as a conversation partner.',
          'Stay in the scenario and make the next practical turn in that scene.',
          'If the learner asks a question, changes topic, requests an explanation, or asks to adjust difficulty, handle that request directly before continuing.',
          learnerUsedNativeLanguage
            ? 'The learner used their native language. Reply in two parts: first a direct native-language answer, then a short target-language continuation. Put both parts in reply, and also provide speechParts with matching language codes.'
            : 'The learner used the target language. Continue mostly in the target language, with light native-language support only if useful.',
          'For an explanation request in the native language, explain the exact requested word or phrase mostly in the native language, then include a short target-language example or continuation.',
          requestedPhrase ? `The exact requested phrase is: ${requestedPhrase}. Explain this phrase, not any other phrase.` : '',
          'Do not correct every sentence. Keep coaching light and only include it when it helps.',
          'Never use drill language such as "repeat after me" or "say it again" unless the learner explicitly asks for pronunciation practice.',
        ].join(' '),
      }),
    },
  ];

  const response = await fetch(OPENAI_API_URL, {
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
    throw new Error(`OpenAI request failed (${response.status}): ${detail.slice(0, 300)}`);
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
  const parsedLanguage = String(parsed.expectedLanguage || '').slice(0, 20);
  const expectedLanguage = fallbackLanguage !== parsedLanguage
    ? fallbackLanguage
    : (parsedLanguage || fallbackLanguage);
  const speechParts = Array.isArray(parsed.speechParts)
    ? parsed.speechParts
      .filter(part => part && typeof part.text === 'string')
      .slice(0, 3)
      .map(part => ({
        language: String(part.language || detectDominantLanguage(part.text, targetLanguage || 'ko', nativeLanguage || 'en')).slice(0, 20),
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

    const result = await callOpenAIConversation({
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
    return res.status(500).json({ message: 'AI conversation failed', detail: error.message });
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

// Get comprehensive dashboard statistics
router.get('/stats', async (req, res) => {
  try {
    // Basic counts
    const [totalUsers, totalLessons, totalFlashcards, totalProgress, totalGuestSessions] = await Promise.all([
      User.countDocuments(),
      Lesson.countDocuments(),
      Flashcard.countDocuments({ isDefault: { $ne: true } }),
      Progress.countDocuments(),
      GuestSession.countDocuments(),
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

// Admin-only AI speaking demo conversation turn.
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
    res.json(users);
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
      user,
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
      { role },
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
    const existingLangs = await Flashcard.distinct('targetLang', { isDefault: true });

    const langDataMap = {};
    const langCodes = ['es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','ms','fil','tr','bn','ta'];
    for (const lang of langCodes) {
      if (existingLangs.includes(lang)) continue;
      try {
        langDataMap[lang] = require(`../flashcardData/${lang}`);
      } catch (e) {
        // Data file not yet created for this language — skip
      }
    }

    let inserted = 0;
    for (const [lang, cards] of Object.entries(langDataMap)) {
      const docs = cards.map((card, i) => ({
        ...card,
        isDefault: true,
        defaultIndex: i,
        targetLang: lang,
        nativeLang: 'en',
        masteryLevel: 3,
        // Store target text in language-specific field so frontend getLangField() finds it
        [lang]: card.korean,
      }));
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
    });
  } catch (error) {
    console.error('Admin seed-flashcards error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
