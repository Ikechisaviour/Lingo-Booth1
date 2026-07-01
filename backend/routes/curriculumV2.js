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
const { curriculumV2RateLimit } = require('../middleware/curriculumV2RateLimit');
const { planSession } = require('../curriculum/planner');
const { CONCEPTS, CONCEPT_INDEX } = require('../curriculum/schema/concepts');
const { LESSON_TYPES } = require('../curriculum/schema/lessonTypes');
const { evaluateProduction, evaluatePronunciation, isAiAvailable } = require('../curriculum/ai');
const whisper = require('../curriculum/whisper');

// AI-bucket caps. Tighter on `feedback` (more expensive prompt) than on
// pronunciation. Environment variables override either dimension when ops
// needs to tune live without a deploy.
const FEEDBACK_LIMITS = {
  name: 'feedback',
  perMinute: Number(process.env.CURRICULUM_V2_FEEDBACK_PER_MINUTE) || 12,
  perDay: Number(process.env.CURRICULUM_V2_FEEDBACK_PER_DAY) || 120,
};
const PRONUNCIATION_LIMITS = {
  name: 'pronunciation',
  perMinute: Number(process.env.CURRICULUM_V2_PRONUNCIATION_PER_MINUTE) || 20,
  perDay: Number(process.env.CURRICULUM_V2_PRONUNCIATION_PER_DAY) || 200,
};
const CurriculumV2Progress = require('../models/CurriculumV2Progress');
const CurriculumV2Event = require('../models/CurriculumV2Event');
const LanguagePairProfile = require('../models/LanguagePairProfile');
const srs = require('../utils/curriculumV2Srs');
const { getContextBoosts } = require('../utils/contextToConcepts');
const { sendServerError, sendClientError } = require('../utils/sendError');

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
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
  const targetLang = req.query.targetLang || 'ko';
  res.json({ lessons: loadLessons().map((l) => hydrateLesson(l, targetLang)) });
});

router.get('/lessons/:id', verifyToken, (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
  const lesson = loadLessons().find((l) => l.id === req.params.id);
  if (!lesson) return sendClientError(res, 404, 'CURRICULUM_V2_LESSON_NOT_FOUND', 'Lesson not found.');
  const targetLang = req.query.targetLang || lesson.targetLang || 'ko';
  res.json({ lesson: hydrateLesson(lesson, targetLang) });
});

router.get('/plan', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
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
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
  const lesson = loadLessons().find((l) => l.id === req.params.id);
  if (!lesson) return sendClientError(res, 404, 'CURRICULUM_V2_COMPLETE_LESSON_NOT_FOUND', 'Lesson not found.');

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
router.post('/feedback', verifyToken, curriculumV2RateLimit(FEEDBACK_LIMITS), async (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');

  const { lessonId, drillIndex, fillerConceptId, learnerText } = req.body || {};
  if (!lessonId || typeof drillIndex !== 'number' || !fillerConceptId || !learnerText) {
    return sendClientError(res, 400, 'CURRICULUM_V2_FEEDBACK_MISSING_FIELDS', 'lessonId, drillIndex, fillerConceptId, learnerText required.');
  }

  const lesson = loadLessons().find((l) => l.id === lessonId);
  if (!lesson || lesson.lessonType !== LESSON_TYPES.PATTERN) {
    return sendClientError(res, 404, 'CURRICULUM_V2_FEEDBACK_PATTERN_LESSON_NOT_FOUND', 'Pattern lesson not found.');
  }
  const drill = (lesson.drills || [])[drillIndex];
  if (!drill) return sendClientError(res, 404, 'CURRICULUM_V2_FEEDBACK_DRILL_NOT_FOUND', 'Drill not found at that index.');
  if (!drill.fillerConceptIds.includes(fillerConceptId)) {
    return sendClientError(res, 400, 'CURRICULUM_V2_FEEDBACK_FILLER_NOT_IN_DRILL', 'Filler concept is not part of this drill.');
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
router.post('/pronunciation-check', verifyToken, curriculumV2RateLimit(PRONUNCIATION_LIMITS), async (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');

  const { target, transcript } = req.body || {};
  if (!target) return sendClientError(res, 400, 'CURRICULUM_V2_PRONUNCIATION_TARGET_REQUIRED', 'target required.');

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

/**
 * GET /api/curriculum/v2/catalog
 *
 * Returns every available concept grouped by function, with per-concept
 * lesson IDs and completion data joined from CurriculumV2Progress. This is
 * the data source for the lesson catalog UI. Concepts are sorted within each
 * function group by CEFR ascending, then by the planner's pedagogical order
 * (prereqs respected — anything required by another concept comes first).
 */
router.get('/catalog', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');

  const targetLang = req.query.targetLang || 'ko';
  const lessons = loadLessons();
  const lessonsByConcept = new Map();
  for (const lesson of lessons) {
    if (!lesson?.conceptId) continue;
    const list = lessonsByConcept.get(lesson.conceptId) || [];
    list.push(lesson);
    lessonsByConcept.set(lesson.conceptId, list);
  }

  // Pedagogical lesson-type order — used both for the in-concept walkthrough
  // and for sorting lessons in the catalog response.
  const TYPE_ORDER = ['ContrastNote', 'PatternLesson', 'ClozeLesson', 'StoryLesson', 'VocabDeck', 'PronunciationTask', 'MinimalPairTask'];
  const typeRank = (t) => {
    const i = TYPE_ORDER.indexOf(t);
    return i === -1 ? TYPE_ORDER.length : i;
  };

  const progress = await CurriculumV2Progress.findOne({ userId: req.userId });
  const completedLessonIds = new Set((progress?.completedLessonIds || []).map(String));
  const completedConceptIds = new Set((progress?.completedConceptIds || []).map(String));

  // Build concept entries — only patterns are surfaced in the catalog
  // (lexemes are slot fillers, surfaced via VocabDeck lessons).
  const conceptCards = [];
  for (const concept of CONCEPTS) {
    if (concept.kind !== 'pattern') continue;
    const conceptLessons = (lessonsByConcept.get(concept.id) || [])
      .filter((l) => l.targetLang === targetLang)
      .sort((a, b) => typeRank(a.lessonType) - typeRank(b.lessonType));
    if (!conceptLessons.length) continue;
    const lessonsCompleted = conceptLessons.filter((l) => completedLessonIds.has(String(l.id))).length;
    conceptCards.push({
      id: concept.id,
      gloss: concept.gloss,
      function: concept.function || null,
      cefr: concept.cefr || null,
      topik: concept.topik || null,
      prerequisites: concept.prerequisites || [],
      requiresConjugation: concept.requiresConjugation || [],
      lessons: conceptLessons.map((l) => ({
        id: l.id,
        lessonType: l.lessonType,
        estimatedMinutes: l.estimatedMinutes || 5,
        completed: completedLessonIds.has(String(l.id)),
      })),
      progress: {
        lessonsCompleted,
        lessonsTotal: conceptLessons.length,
        allComplete: completedConceptIds.has(String(concept.id))
          || (lessonsCompleted === conceptLessons.length && conceptLessons.length > 0),
        notStarted: lessonsCompleted === 0,
      },
    });
  }

  // Topological order respecting prereqs (Kahn). Concepts whose prereqs
  // aren't in the registry still slot in by their CEFR rank.
  const cefrRank = { A1: 0, A2: 1, B1: 2, B2: 3, C1: 4, C2: 5 };
  const conceptById = new Map(conceptCards.map((c) => [c.id, c]));
  const indegree = new Map(conceptCards.map((c) => [c.id, 0]));
  for (const c of conceptCards) {
    for (const p of c.prerequisites) {
      if (conceptById.has(p)) {
        indegree.set(c.id, (indegree.get(c.id) || 0) + 1);
      }
    }
  }
  const queue = conceptCards
    .filter((c) => (indegree.get(c.id) || 0) === 0)
    .sort((a, b) => (cefrRank[a.cefr] ?? 99) - (cefrRank[b.cefr] ?? 99));
  const plannerOrderIndex = new Map();
  let cursor = 0;
  while (queue.length) {
    const next = queue.shift();
    plannerOrderIndex.set(next.id, cursor++);
    for (const c of conceptCards) {
      if (c.prerequisites.includes(next.id)) {
        const remaining = (indegree.get(c.id) || 1) - 1;
        indegree.set(c.id, remaining);
        if (remaining === 0) {
          // Re-sort the queue so CEFR-ascending order is preserved as
          // nodes become eligible.
          queue.push(c);
          queue.sort((a, b) => (cefrRank[a.cefr] ?? 99) - (cefrRank[b.cefr] ?? 99));
        }
      }
    }
  }

  // Group by function, sort within each by CEFR-asc → planner index.
  const groups = new Map();
  for (const c of conceptCards) {
    const key = c.function || 'other';
    const list = groups.get(key) || [];
    list.push(c);
    groups.set(key, list);
  }
  for (const list of groups.values()) {
    list.sort((a, b) => {
      const cefrDiff = (cefrRank[a.cefr] ?? 99) - (cefrRank[b.cefr] ?? 99);
      if (cefrDiff !== 0) return cefrDiff;
      return (plannerOrderIndex.get(a.id) ?? Infinity) - (plannerOrderIndex.get(b.id) ?? Infinity);
    });
  }

  // Order the function groups themselves. We just preserve the order they
  // first appeared in CONCEPTS so author-controlled grouping wins; lower
  // CEFR functions naturally float to the top because their first concept
  // is registered earliest.
  const groupOrder = [];
  for (const c of conceptCards) {
    const key = c.function || 'other';
    if (!groupOrder.includes(key)) groupOrder.push(key);
  }

  res.json({
    targetLang,
    groups: groupOrder.map((key) => ({
      function: key,
      concepts: groups.get(key),
    })),
    totalConcepts: conceptCards.length,
    totalCompleted: conceptCards.filter((c) => c.progress.allComplete).length,
  });
});

/**
 * GET /api/curriculum/v2/concepts/:conceptId/lessons
 *
 * Returns the lessons for a single concept in pedagogical order. Used by the
 * SessionShell's single-concept walkthrough mode (?concept=… query param)
 * when a learner picks a specific concept from the catalog.
 */
router.get('/concepts/:conceptId/lessons', verifyToken, (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
  const conceptId = String(req.params.conceptId || '');
  const targetLang = req.query.targetLang || 'ko';
  const TYPE_ORDER = ['ContrastNote', 'PatternLesson', 'ClozeLesson', 'StoryLesson', 'VocabDeck', 'PronunciationTask', 'MinimalPairTask'];
  const typeRank = (t) => {
    const i = TYPE_ORDER.indexOf(t);
    return i === -1 ? TYPE_ORDER.length : i;
  };
  const matching = loadLessons()
    .filter((l) => l.conceptId === conceptId && l.targetLang === targetLang)
    .map((l) => hydrateLesson(l, targetLang))
    .sort((a, b) => typeRank(a.lessonType) - typeRank(b.lessonType));
  if (!matching.length) return sendClientError(res, 404, 'CURRICULUM_V2_CONCEPT_LESSONS_NOT_FOUND', 'No lessons found for that concept.');
  res.json({ conceptId, targetLang, sequence: matching });
});

router.get('/progress', verifyToken, async (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
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
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');

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
    return sendClientError(res, 400, 'CURRICULUM_V2_EVENT_CONCEPT_ID_REQUIRED', 'conceptId required.');
  }
  if (!EVENT_LESSON_TYPES.includes(lessonType)) {
    return sendClientError(res, 400, 'CURRICULUM_V2_EVENT_INVALID_LESSON_TYPE', `lessonType must be one of ${EVENT_LESSON_TYPES.join(', ')}.`);
  }
  if (!EVENT_OUTCOMES.includes(outcome)) {
    return sendClientError(res, 400, 'CURRICULUM_V2_EVENT_INVALID_OUTCOME', `outcome must be one of ${EVENT_OUTCOMES.join(', ')}.`);
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
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');

  const { conceptId, conceptKind, skill, outcome } = req.body || {};
  const targetLang = req.body?.targetLang || 'ko';

  if (!conceptId || typeof conceptId !== 'string') {
    return sendClientError(res, 400, 'CURRICULUM_V2_SRS_CONCEPT_ID_REQUIRED', 'conceptId required.');
  }
  if (!SRS_CONCEPT_KINDS.includes(conceptKind)) {
    return sendClientError(res, 400, 'CURRICULUM_V2_SRS_INVALID_CONCEPT_KIND', `conceptKind must be one of ${SRS_CONCEPT_KINDS.join(', ')}.`);
  }
  if (!SRS_SKILLS.includes(skill)) {
    return sendClientError(res, 400, 'CURRICULUM_V2_SRS_INVALID_SKILL', `skill must be one of ${SRS_SKILLS.join(', ')}.`);
  }
  if (!srs.OUTCOMES.includes(outcome)) {
    return sendClientError(res, 400, 'CURRICULUM_V2_SRS_INVALID_OUTCOME', `outcome must be one of ${srs.OUTCOMES.join(', ')}.`);
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
    return sendServerError(req, res, err, 'CURRICULUM_V2_SRS_REVIEW_FAILED', {
      clientMessage: 'Could not record review.',
      metadata: { conceptId, conceptKind, skill },
    });
  }
});

// ─── ASR (Whisper) — server-side speech transcription ──────────────────
// Replaces the browser-only webkitSpeechRecognition path. Accepts a base64
// audio payload (lets us reuse the JSON body parser; large enough for short
// pronunciation samples). Pronunciation-grading rate-limit is applied here
// too — transcription is also AI spend.

router.get('/asr/status', verifyToken, (req, res) => {
  if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
  res.json(whisper.getAsrConfig());
});

router.post(
  '/asr/transcribe',
  verifyToken,
  curriculumV2RateLimit(PRONUNCIATION_LIMITS),
  express.json({ limit: '5mb' }),
  async (req, res) => {
    if (!isV2Enabled(req)) return sendClientError(res, 403, 'CURRICULUM_V2_NOT_ENABLED', 'Curriculum v2 not enabled for this user.');
    if (!whisper.isAsrAvailable()) {
      return res.status(503).json({
        message: 'Server-side ASR is not configured. Falling back to browser speech recognition.',
        code: 'ASR_NOT_CONFIGURED',
        ...whisper.getAsrConfig(),
      });
    }
    const { audioBase64, mimeType = 'audio/webm', language = 'ko', prompt = '' } = req.body || {};
    if (!audioBase64 || typeof audioBase64 !== 'string') {
      return sendClientError(res, 400, 'CURRICULUM_V2_ASR_AUDIO_REQUIRED', 'audioBase64 required.');
    }
    let audioBuffer;
    try {
      audioBuffer = Buffer.from(audioBase64, 'base64');
    } catch (_) {
      return sendClientError(res, 400, 'CURRICULUM_V2_ASR_AUDIO_DECODE_FAILED', 'audioBase64 could not be decoded.');
    }
    if (audioBuffer.length === 0 || audioBuffer.length > 4 * 1024 * 1024) {
      return sendClientError(res, 400, 'CURRICULUM_V2_ASR_AUDIO_SIZE_INVALID', 'Audio payload must be > 0 and <= 4 MB.');
    }
    try {
      const result = await whisper.transcribe({
        audioBuffer,
        mimeType,
        language,
        // `prompt` is the expected target phrase — Whisper uses it to bias
        // recognition toward what the learner is supposed to be saying.
        targetPhrase: typeof prompt === 'string' ? prompt : '',
      });
      res.json(result);
    } catch (err) {
      console.error('Whisper transcription failed:', err.message || err);
      res.status(502).json({ message: 'Transcription failed.', code: err.code || 'ASR_ERROR' });
    }
  },
);

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
    return sendServerError(req, res, err, 'CURRICULUM_V2_HANGUL_PROGRESS_FETCH_FAILED', {
      clientMessage: 'Could not load Hangul progress.',
    });
  }
});

// Mark Hangul onboarding skipped without walking the lessons. Stamps
// onboardingCompletedAt but leaves completedGroups untouched so the learner
// can still return and complete individual groups any time.
router.post('/hangul/skip', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return sendClientError(res, 404, 'CURRICULUM_V2_HANGUL_SKIP_USER_NOT_FOUND', 'User not found.');
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
    return sendServerError(req, res, err, 'CURRICULUM_V2_HANGUL_SKIP_FAILED', {
      clientMessage: 'Could not skip onboarding.',
    });
  }
});

router.post('/hangul/groups/:groupId/complete', verifyToken, async (req, res) => {
  const groupId = String(req.params.groupId || '');
  if (!Hangul.getGroup(groupId)) {
    return sendClientError(res, 404, 'CURRICULUM_V2_HANGUL_GROUP_UNKNOWN', 'Unknown Hangul group.');
  }
  try {
    const user = await User.findById(req.userId);
    if (!user) return sendClientError(res, 404, 'CURRICULUM_V2_HANGUL_COMPLETE_USER_NOT_FOUND', 'User not found.');
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
    return sendServerError(req, res, err, 'CURRICULUM_V2_HANGUL_GROUP_COMPLETE_FAILED', {
      clientMessage: 'Could not save progress.',
      metadata: { groupId },
    });
  }
});

module.exports = router;
