/**
 * Curriculum v2 API.
 *
 * Endpoints:
 *   GET  /api/curriculum/v2/lessons               list all lessons
 *   GET  /api/curriculum/v2/lessons/:id           fetch one
 *   GET  /api/curriculum/v2/plan                  build a session plan for the user
 *   POST /api/curriculum/v2/lessons/:id/complete  mark a lesson completed
 *   GET  /api/curriculum/v2/progress              fetch the user's v2 progress
 *   POST /api/curriculum/v2/srs/review            record a learner's rating
 *
 * Access control:
 *   All endpoints require auth (verifyToken). The feature flag is enforced
 *   on the frontend via the curriculumV2 entitlement; the backend additionally
 *   gates writes behind the same entitlement to prevent stray clients from
 *   polluting progress for users not in the pilot.
 */

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

const { verifyToken } = require('../middleware/auth');
const { planSession } = require('../curriculum/planner');
const { CONCEPTS, CONCEPT_INDEX } = require('../curriculum/schema/concepts');
const { LESSON_TYPES } = require('../curriculum/schema/lessonTypes');
const { evaluateProduction, evaluatePronunciation, isAiAvailable } = require('../curriculum/ai');
const CurriculumV2Progress = require('../models/CurriculumV2Progress');
const CurriculumV2Event = require('../models/CurriculumV2Event');
const LanguagePairProfile = require('../models/LanguagePairProfile');
const srs = require('../utils/curriculumV2Srs');
const { getContextBoosts } = require('../utils/contextToConcepts');

const SRS_CONCEPT_KINDS = ['vocab', 'pattern', 'contrast', 'story'];
const SRS_SKILLS = ['recognition', 'production', 'listening', 'pronunciation'];
const EVENT_OUTCOMES = ['correct', 'incorrect', 'partial', 'skipped'];
const EVENT_LESSON_TYPES = [
  'PatternLesson',
  'ClozeLesson',
  'StoryLesson',
  'ContrastNote',
  'VocabDeck',
  'PronunciationTask',
  'MinimalPairTask',
];

/**
 * Resolve filler concept IDs to their full concept records (id, target, native, gloss).
 * Concepts the registry doesn't recognize fall through as bare ids so the UI can
 * render a graceful placeholder.
 */
function hydrateFillers(conceptIds, targetLang = 'ko') {
  if (!Array.isArray(conceptIds)) return [];
  return conceptIds.map((id) => {
    const c = CONCEPT_INDEX[id];
    if (!c) return { id, target: null, native: null, gloss: null };
    const target = (c.targets && c.targets[targetLang]) || c.target || null;
    return { id, target, native: c.native || c.gloss || null, gloss: c.gloss || null };
  });
}

/**
 * Attach hydrated filler concepts to a lesson without mutating the source.
 * Both VocabDeck and PatternLesson drills need filler hydration so the UI
 * can show the actual target text.
 */
function hydrateLesson(lesson, targetLang) {
  if (!lesson) return lesson;
  if (lesson.lessonType === LESSON_TYPES.VOCAB) {
    return { ...lesson, fillers: hydrateFillers(lesson.fillerConceptIds, targetLang) };
  }
  if (lesson.lessonType === LESSON_TYPES.PATTERN) {
    return {
      ...lesson,
      drills: (lesson.drills || []).map((d) => ({
        ...d,
        fillers: hydrateFillers(d.fillerConceptIds, targetLang),
      })),
    };
  }
  return lesson;
}

const LESSONS_DIR = path.join(__dirname, '..', 'curriculum', 'lessons');

let CACHED_LESSONS = null;

function loadLessons() {
  if (CACHED_LESSONS) return CACHED_LESSONS;
  if (!fs.existsSync(LESSONS_DIR)) {
    CACHED_LESSONS = [];
    return CACHED_LESSONS;
  }
  const out = [];
  for (const entry of fs.readdirSync(LESSONS_DIR, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) continue;
    const mod = require(path.join(LESSONS_DIR, entry.name));
    const items = Array.isArray(mod) ? mod : [mod];
    for (const it of items) out.push(it);
  }
  CACHED_LESSONS = out;
  return CACHED_LESSONS;
}

const { userPrefersV2, isV2AvailableForTarget } = require('../curriculum/v2Availability');

function isV2Enabled(req) {
  if (req.user?.role === 'admin') return true;
  if (req.user?.featureFlags?.curriculumV2) return true;
  // Learner opted in for their current target language via the version-picker
  // modal or settings toggle.
  const target = req.user?.targetLanguage;
  if (target && isV2AvailableForTarget(target) && userPrefersV2(req.user, target)) {
    return true;
  }
  return Boolean(process.env.CURRICULUM_V2_OPEN_PILOT);
}

router.get('/lessons', verifyToken, (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });
  const targetLang = req.query.targetLang || 'ko';
  res.json({ lessons: loadLessons().map((l) => hydrateLesson(l, targetLang)) });
});

router.get('/lessons/:id', verifyToken, (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });
  const lesson = loadLessons().find((l) => l.id === req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found.' });
  const targetLang = req.query.targetLang || lesson.targetLang || 'ko';
  res.json({ lesson: hydrateLesson(lesson, targetLang) });
});

router.get('/plan', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });
  const progress = await CurriculumV2Progress.findOne({ userId: req.userId }) || {
    completedLessonIds: [],
    completedConceptIds: [],
  };
  const targetMinutes = Number(req.query.targetMinutes) || 30;
  const targetLang = req.query.targetLang || 'ko';
  const focusConceptIds = req.query.focusConceptIds
    ? String(req.query.focusConceptIds).split(',').filter(Boolean)
    : undefined;

  // Query SRS-derived inputs, learner level, and context boosts in
  // parallel. All paths fall back to safe defaults if the read fails,
  // so the planner stays usable for new users (no SRS rows), users who
  // never set a level, and users with no saved practice context.
  const [dueReviews, masteredConceptIds, profile, contextBoostMap] = await Promise.all([
    srs.getDueQueue({ userId: req.userId, targetLang }).catch((err) => {
      console.warn('SRS getDueQueue failed; planner falls back to no reviews:', err.message || err);
      return [];
    }),
    srs.getMasteredConceptIds({ userId: req.userId, targetLang }).catch((err) => {
      console.warn('SRS getMasteredConceptIds failed; planner ignores mastery filter:', err.message || err);
      return [];
    }),
    LanguagePairProfile.findOne({ userId: req.userId, targetLanguage: targetLang })
      .lean()
      .catch((err) => {
        console.warn('LanguagePairProfile lookup failed; planner ignores level filter:', err.message || err);
        return null;
      }),
    getContextBoosts({ userId: req.userId, targetLang }).catch((err) => {
      console.warn('Context-boost lookup failed; planner falls back to no boosts:', err.message || err);
      return new Map();
    }),
  ]);
  const boostedConceptIds = [...contextBoostMap.keys()];

  // Normalize the stored level string into one the planner understands.
  // Empty / 'new' / 'unsure' all map to no-filter (treat as unknown).
  const rawLevel = profile?.currentLevel || '';
  const learnerLevel = ['beginner', 'intermediate', 'advanced'].includes(rawLevel) ? rawLevel : null;

  const result = planSession(
    loadLessons(),
    {
      completedConceptIds: progress.completedConceptIds,
      completedLessonIds: progress.completedLessonIds,
      dueReviews,
      masteredConceptIds,
      boostedConceptIds,
    },
    { targetMinutes, targetLang, focusConceptIds, learnerLevel },
  );

  // Hydrate sequence IDs to full lesson objects for the frontend in one round-trip,
  // and resolve VocabDeck filler concept IDs to their target/native text.
  const lessonsById = new Map(loadLessons().map((l) => [l.id, l]));
  const hydrated = result.sequence
    .map((id) => lessonsById.get(id))
    .filter(Boolean)
    .map((l) => hydrateLesson(l, targetLang));

  res.json({
    sequence: hydrated,
    totalMinutes: result.totalMinutes,
    skipped: result.skipped,
    reviewsSelected: result.reviewsSelected,
    boostsApplied: result.boostsApplied,
    learnerLevel,
  });
});

router.post('/lessons/:id/complete', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });
  const lesson = loadLessons().find((l) => l.id === req.params.id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found.' });

  const progress = await CurriculumV2Progress.findOneAndUpdate(
    { userId: req.userId },
    {
      $addToSet: {
        completedLessonIds: lesson.id,
        completedConceptIds: lesson.conceptId,
      },
      $set: { lastSessionAt: new Date() },
    },
    { upsert: true, new: true },
  );

  res.json({ progress });
});

/**
 * POST /api/curriculum/v2/feedback
 * Body: { lessonId, drillIndex, fillerConceptId, learnerText }
 *
 * Looks up the pattern lesson + drill + filler concept, then asks the LLM to
 * grade the learner's production attempt. Returns { correct, feedback, ideal }.
 * If AI is not configured, returns { aiEnabled: false } so the UI can fall back.
 */
router.post('/feedback', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });

  const { lessonId, drillIndex, fillerConceptId, learnerText } = req.body || {};
  if (!lessonId || typeof drillIndex !== 'number' || !fillerConceptId || !learnerText) {
    return res.status(400).json({ message: 'lessonId, drillIndex, fillerConceptId, learnerText required.' });
  }

  const lesson = loadLessons().find((l) => l.id === lessonId);
  if (!lesson || lesson.lessonType !== LESSON_TYPES.PATTERN) {
    return res.status(404).json({ message: 'Pattern lesson not found.' });
  }
  const drill = (lesson.drills || [])[drillIndex];
  if (!drill) return res.status(404).json({ message: 'Drill not found at that index.' });
  if (!drill.fillerConceptIds.includes(fillerConceptId)) {
    return res.status(400).json({ message: 'Filler concept is not part of this drill.' });
  }

  const fillerConcept = CONCEPT_INDEX[fillerConceptId];
  const filler = fillerConcept
    ? { target: fillerConcept.target || null, native: fillerConcept.native || fillerConcept.gloss || null }
    : { target: null, native: fillerConceptId };

  if (!isAiAvailable()) {
    return res.json({ aiEnabled: false, evaluation: null });
  }

  try {
    const evaluation = await evaluateProduction({
      patternTarget: lesson.patternTarget,
      patternGloss: lesson.patternGloss,
      promptTemplate: drill.promptTemplate,
      filler,
      learnerText: String(learnerText).slice(0, 500),
    });
    if (!evaluation) {
      return res.json({ aiEnabled: true, evaluation: null, message: 'AI returned an unparseable response.' });
    }
    res.json({ aiEnabled: true, evaluation });
  } catch (err) {
    console.error('Curriculum v2 feedback failed:', err.message || err);
    res.status(502).json({ aiEnabled: true, evaluation: null, message: 'AI provider unavailable.' });
  }
});

/**
 * POST /api/curriculum/v2/pronunciation-check
 * Body: { target, transcript }
 *
 * Compares an ASR transcript to a target Korean phrase. Returns
 * { accuracy: 'high'|'partial'|'low', feedback }.
 */
router.post('/pronunciation-check', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });

  const { target, transcript } = req.body || {};
  if (!target) return res.status(400).json({ message: 'target required.' });

  if (!isAiAvailable()) {
    return res.json({ aiEnabled: false, evaluation: null });
  }

  try {
    const evaluation = await evaluatePronunciation({
      target: String(target).slice(0, 200),
      transcript: String(transcript || '').slice(0, 200),
    });
    if (!evaluation) {
      return res.json({ aiEnabled: true, evaluation: null, message: 'AI returned an unparseable response.' });
    }
    res.json({ aiEnabled: true, evaluation });
  } catch (err) {
    console.error('Curriculum v2 pronunciation-check failed:', err.message || err);
    res.status(502).json({ aiEnabled: true, evaluation: null, message: 'AI provider unavailable.' });
  }
});

router.get('/progress', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });
  const progress = await CurriculumV2Progress.findOne({ userId: req.userId });
  res.json({
    progress: progress || { completedLessonIds: [], completedConceptIds: [], lastSessionAt: null },
    concepts: CONCEPTS,
  });
});

/**
 * POST /api/curriculum/v2/events
 * Body: { conceptId, lessonId?, lessonType, outcome, hintUsed?, latencyMs?,
 *         sessionId?, contextSignal?, targetLang? }
 *
 * Fire-and-forget event log entry. Lesson pages POST one per rateable
 * interaction. Validation is permissive — we'd rather record a slightly
 * malformed event than lose the signal.
 */
router.post('/events', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });

  const {
    conceptId,
    lessonId = '',
    lessonType,
    outcome,
    hintUsed = false,
    latencyMs = null,
    sessionId = '',
    contextSignal = null,
  } = req.body || {};
  const targetLang = req.body?.targetLang || 'ko';

  if (!conceptId || typeof conceptId !== 'string') {
    return res.status(400).json({ message: 'conceptId required.' });
  }
  if (!EVENT_LESSON_TYPES.includes(lessonType)) {
    return res.status(400).json({ message: `lessonType must be one of ${EVENT_LESSON_TYPES.join(', ')}.` });
  }
  if (!EVENT_OUTCOMES.includes(outcome)) {
    return res.status(400).json({ message: `outcome must be one of ${EVENT_OUTCOMES.join(', ')}.` });
  }

  try {
    const safeContextSignal = contextSignal && typeof contextSignal === 'object'
      ? {
          source: String(contextSignal.source || '').slice(0, 40),
          contextId: contextSignal.contextId || null,
          signalType: ['vocab', 'phrase', 'topic'].includes(contextSignal.signalType)
            ? contextSignal.signalType : '',
        }
      : { source: '', contextId: null, signalType: '' };

    const event = await CurriculumV2Event.create({
      userId: req.userId,
      targetLang,
      sessionId: String(sessionId).slice(0, 80),
      conceptId,
      lessonId: String(lessonId).slice(0, 120),
      lessonType,
      outcome,
      hintUsed: Boolean(hintUsed),
      latencyMs: typeof latencyMs === 'number' && latencyMs >= 0 ? latencyMs : null,
      contextSignal: safeContextSignal,
    });
    res.json({ id: event._id });
  } catch (err) {
    console.error('Curriculum v2 event recording failed:', err.message || err);
    // Still 200 — events are fire-and-forget for the client. We log
    // server-side so monitoring catches systematic failures.
    res.json({ id: null });
  }
});

/**
 * POST /api/curriculum/v2/srs/review
 * Body: { conceptId, conceptKind, skill, outcome, targetLang? }
 *
 * Records a learner's 4-button rating (again|hard|good|easy) for a
 * specific (concept, skill) pair. Upserts the CurriculumV2SRS row and
 * advances stability/difficulty/dueAt per the FSRS-lite scheduler.
 */
router.post('/srs/review', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return res.status(403).json({ message: 'Curriculum v2 not enabled for this user.' });

  const { conceptId, conceptKind, skill, outcome } = req.body || {};
  const targetLang = req.body?.targetLang || 'ko';

  if (!conceptId || typeof conceptId !== 'string') {
    return res.status(400).json({ message: 'conceptId required.' });
  }
  if (!SRS_CONCEPT_KINDS.includes(conceptKind)) {
    return res.status(400).json({ message: `conceptKind must be one of ${SRS_CONCEPT_KINDS.join(', ')}.` });
  }
  if (!SRS_SKILLS.includes(skill)) {
    return res.status(400).json({ message: `skill must be one of ${SRS_SKILLS.join(', ')}.` });
  }
  if (!srs.OUTCOMES.includes(outcome)) {
    return res.status(400).json({ message: `outcome must be one of ${srs.OUTCOMES.join(', ')}.` });
  }

  try {
    const state = await srs.reviewItem({
      userId: req.userId,
      targetLang,
      conceptId,
      conceptKind,
      skill,
      outcome,
    });
    res.json({ state });
  } catch (err) {
    console.error('Curriculum v2 SRS review failed:', err.message || err);
    res.status(500).json({ message: 'Could not record review.' });
  }
});

// ─── Hangul onboarding ──────────────────────────────────────────────────
// Korean-only flow that sits outside the regular planner. Runs once before
// A1 patterns are unlocked, but always reachable later as a refresher.
const Hangul = require('../curriculum/hangul');
const User = require('../models/User');

router.get('/hangul/groups', verifyToken, (req, res) => {
  res.json({ groups: Hangul.GROUPS });
});

router.get('/hangul/progress', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('hangulProgress');
    const progress = user?.hangulProgress || { completedGroups: [], onboardingCompletedAt: null, lastVisitedAt: null };
    res.json({
      completedGroups: progress.completedGroups || [],
      onboardingCompletedAt: progress.onboardingCompletedAt || null,
      lastVisitedAt: progress.lastVisitedAt || null,
      allGroupIds: Hangul.GROUP_IDS,
      onboardingComplete: Hangul.isOnboardingComplete(progress),
    });
  } catch (err) {
    console.error('Hangul progress fetch failed:', err.message || err);
    res.status(500).json({ message: 'Could not load Hangul progress.' });
  }
});

// Mark Hangul onboarding skipped without walking the lessons. Stamps
// onboardingCompletedAt but leaves completedGroups untouched so the learner
// can still return and complete individual groups any time.
router.post('/hangul/skip', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    user.hangulProgress = user.hangulProgress || { completedGroups: [], onboardingCompletedAt: null, lastVisitedAt: null };
    if (!user.hangulProgress.onboardingCompletedAt) {
      user.hangulProgress.onboardingCompletedAt = new Date();
    }
    user.hangulProgress.lastVisitedAt = new Date();
    await user.save();
    res.json({
      completedGroups: user.hangulProgress.completedGroups || [],
      onboardingCompletedAt: user.hangulProgress.onboardingCompletedAt,
      onboardingComplete: true,
      skipped: true,
    });
  } catch (err) {
    console.error('Hangul skip failed:', err.message || err);
    res.status(500).json({ message: 'Could not skip onboarding.' });
  }
});

router.post('/hangul/groups/:groupId/complete', verifyToken, async (req, res) => {
  const groupId = String(req.params.groupId || '');
  if (!Hangul.getGroup(groupId)) {
    return res.status(404).json({ message: 'Unknown Hangul group.' });
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'User not found.' });
    user.hangulProgress = user.hangulProgress || { completedGroups: [], onboardingCompletedAt: null, lastVisitedAt: null };
    const completed = new Set(user.hangulProgress.completedGroups || []);
    completed.add(groupId);
    user.hangulProgress.completedGroups = Array.from(completed);
    user.hangulProgress.lastVisitedAt = new Date();
    if (!user.hangulProgress.onboardingCompletedAt && Hangul.isOnboardingComplete(user.hangulProgress)) {
      user.hangulProgress.onboardingCompletedAt = new Date();
    }
    await user.save();
    res.json({
      completedGroups: user.hangulProgress.completedGroups,
      onboardingCompletedAt: user.hangulProgress.onboardingCompletedAt,
      onboardingComplete: Hangul.isOnboardingComplete(user.hangulProgress),
    });
  } catch (err) {
    console.error('Hangul group complete failed:', err.message || err);
    res.status(500).json({ message: 'Could not save progress.' });
  }
});

module.exports = router;
