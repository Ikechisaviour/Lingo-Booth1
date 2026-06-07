/**
 * Curriculum v2 session planner.
 *
 * Pure function: takes a set of candidate lessons and a learner state, returns
 * an ordered sequence of lesson IDs that:
 *
 *   1. Front-loads SRS reviews when due (reviewShareFraction of session).
 *   2. Respects prerequisites (a lesson never appears before something it
 *      depends on, given what the learner has already completed).
 *   3. Fits within a target session duration (estimatedMinutes summed).
 *   4. Skips concepts whose every skill has reached mastery threshold.
 *   5. Interleaves lesson types — does NOT cluster three of the same type
 *      in a row when alternatives are available.
 *   6. Front-loads context: when both are available for the same concept,
 *      ContrastNote precedes PatternLesson, PatternLesson precedes Cloze,
 *      Story comes after at least one production-style lesson.
 *
 * The planner is intentionally pure and side-effect-free so it can be
 * unit-tested without a database. The caller is responsible for loading
 * lessons + learner state (including SRS-derived due-review queue and the
 * set of mastered concepts) and persisting the returned sequence.
 */

const { LESSON_TYPES } = require('./schema/lessonTypes');

const DEFAULT_TARGET_MINUTES = 30;
const DEFAULT_REVIEW_SHARE = 0.30;

// Difficulty bands a learner at a given currentLevel is allowed to see in
// new-content selection. Already-completed lessons may still surface as
// reviews regardless of difficulty — review picks bypass this filter.
const LEVEL_ALLOWS_DIFFICULTY = {
  beginner:     new Set(['beginner']),
  intermediate: new Set(['beginner', 'intermediate']),
  advanced:     new Set(['beginner', 'intermediate', 'advanced']),
};

function isAllowedAtLevel(lessonDifficulty, learnerLevel) {
  if (!learnerLevel) return true; // unknown learner level → don't filter
  const allowed = LEVEL_ALLOWS_DIFFICULTY[learnerLevel];
  if (!allowed) return true;
  return allowed.has(lessonDifficulty);
}

/**
 * Per-type ordering preference within a concept. Lower = earlier.
 * Ties broken by stable order over lessons array.
 */
const TYPE_PRIORITY = {
  [LESSON_TYPES.CONTRAST]: 0,
  [LESSON_TYPES.PATTERN]: 1,
  [LESSON_TYPES.CLOZE]: 2,
  [LESSON_TYPES.PRONUNCIATION]: 3,
  [LESSON_TYPES.MINIMAL_PAIR]: 4,
  [LESSON_TYPES.STORY]: 5,
  [LESSON_TYPES.VOCAB]: 6,
};

/**
 * Maps an SRS skill back to the lesson types that can exercise it.
 * Used to pick a review lesson for a due (concept, skill) pair.
 */
const SKILL_TO_LESSON_TYPES = {
  recognition:   [LESSON_TYPES.CLOZE, LESSON_TYPES.VOCAB],
  production:    [LESSON_TYPES.PATTERN],
  listening:     [LESSON_TYPES.MINIMAL_PAIR, LESSON_TYPES.STORY],
  pronunciation: [LESSON_TYPES.PRONUNCIATION],
};

/**
 * Pick review lessons from the candidate pool to cover the most-overdue
 * (concept, skill) pairs. Caller passes dueReviews already sorted by
 * dueAt ascending. We dedupe by conceptId so a single concept doesn't
 * stack the same session three times for different skills.
 */
function selectReviewLessons(candidates, dueReviews, budgetMinutes) {
  if (!dueReviews || dueReviews.length === 0 || budgetMinutes <= 0) return [];

  const candidatesByConcept = new Map();
  for (const c of candidates) {
    if (!candidatesByConcept.has(c.conceptId)) candidatesByConcept.set(c.conceptId, []);
    candidatesByConcept.get(c.conceptId).push(c);
  }

  const seenConcepts = new Set();
  const selected = [];
  let usedMinutes = 0;

  for (const due of dueReviews) {
    if (seenConcepts.has(due.conceptId)) continue;
    const conceptLessons = candidatesByConcept.get(due.conceptId);
    if (!conceptLessons) continue;
    const allowedTypes = SKILL_TO_LESSON_TYPES[due.skill] || [];
    const match = conceptLessons.find((l) => allowedTypes.includes(l.lessonType));
    if (!match) continue;
    if (usedMinutes + match.estimatedMinutes > budgetMinutes && selected.length > 0) break;
    selected.push(match);
    usedMinutes += match.estimatedMinutes;
    seenConcepts.add(due.conceptId);
  }
  return selected;
}

/**
 * @param {Object[]} lessons              All available v2 lessons.
 * @param {Object}   learnerState
 * @param {string[]} learnerState.completedConceptIds  Concepts already done.
 * @param {string[]} learnerState.completedLessonIds   Lesson IDs already done.
 * @param {Object[]} [learnerState.dueReviews]         SRS-derived due queue,
 *                                                    sorted by dueAt asc. Each
 *                                                    item: { conceptId, skill,
 *                                                    dueAt, conceptKind }.
 * @param {string[]} [learnerState.masteredConceptIds] Concepts to skip when
 *                                                    selecting new content.
 * @param {Object}   [options]
 * @param {number}   [options.targetMinutes=30]
 * @param {string}   [options.targetLang='ko']
 * @param {string[]} [options.focusConceptIds]  Concepts to prioritize for new
 *                                              content; if omitted, planner
 *                                              picks the first unmet concept.
 * @param {number}   [options.reviewShareFraction=0.30]  Fraction of session
 *                                              minutes reserved for SRS reviews.
 * @returns {{
 *   sequence: string[],
 *   totalMinutes: number,
 *   skipped: Array<{id:string, reason:string}>,
 *   reviewsSelected: number,
 *   boostsApplied: string[],
 * }}
 */
function planSession(lessons, learnerState, options = {}) {
  const {
    targetMinutes = DEFAULT_TARGET_MINUTES,
    targetLang = 'ko',
    focusConceptIds,
    reviewShareFraction = DEFAULT_REVIEW_SHARE,
    learnerLevel = null,
  } = options;

  const completedConcepts = new Set(learnerState.completedConceptIds || []);
  const completedLessons = new Set(learnerState.completedLessonIds || []);
  const masteredConcepts = new Set(learnerState.masteredConceptIds || []);
  const boostedConcepts = new Set(learnerState.boostedConceptIds || []);
  const dueReviews = learnerState.dueReviews || [];
  const skipped = [];

  // Step 1a: filter to target-lang + prereqs satisfied (this pool is used
  // for review selection — reviews intentionally revisit already-completed
  // lessons, so we don't exclude completedLessons here).
  const inLanguage = lessons.filter((l) => {
    if (l.targetLang !== targetLang) {
      skipped.push({ id: l.id, reason: 'wrong-target-lang' });
      return false;
    }
    const unmet = (l.prerequisites || []).filter((p) => !completedConcepts.has(p));
    if (unmet.length > 0) {
      skipped.push({ id: l.id, reason: `prereqs-unmet: ${unmet.join(',')}` });
      return false;
    }
    return true;
  });

  // Step 1b: choose review lessons from due SRS rows.
  const reviewBudget = targetMinutes * reviewShareFraction;
  const reviewLessons = selectReviewLessons(inLanguage, dueReviews, reviewBudget);
  const reviewIds = new Set(reviewLessons.map((l) => l.id));
  const reviewMinutes = reviewLessons.reduce((s, l) => s + l.estimatedMinutes, 0);

  // Step 1c: new-content pool — exclude completed, exclude what's already
  // in the review batch, exclude mastered concepts, exclude above level.
  const newCandidates = inLanguage.filter((l) => {
    if (completedLessons.has(l.id)) {
      // Only emit a 'already-completed' skip note if the lesson isn't being
      // surfaced as a review either, so the log stays honest.
      if (!reviewIds.has(l.id)) skipped.push({ id: l.id, reason: 'already-completed' });
      return false;
    }
    if (reviewIds.has(l.id)) return false;
    if (masteredConcepts.has(l.conceptId)) {
      skipped.push({ id: l.id, reason: 'concept-mastered' });
      return false;
    }
    if (!isAllowedAtLevel(l.difficulty, learnerLevel)) {
      skipped.push({ id: l.id, reason: `above-level: ${l.difficulty} > ${learnerLevel}` });
      return false;
    }
    return true;
  });

  const remainingMinutes = Math.max(0, targetMinutes - reviewMinutes);

  // Step 2: choose which concepts to focus on for the new-content portion.
  // Order of preference:
  //   a. explicit focusConceptIds (caller override),
  //   b. boosted concepts (from item 22's PracticeContext → concept
  //      matcher) that exist in the new-content pool,
  //   c. fallback to the first two unmet concepts in deterministic order.
  let focus;
  if (focusConceptIds && focusConceptIds.length > 0) {
    focus = new Set(focusConceptIds);
  } else {
    focus = new Set();
    if (boostedConcepts.size > 0) {
      for (const c of newCandidates) {
        if (boostedConcepts.has(c.conceptId) && !focus.has(c.conceptId)) {
          focus.add(c.conceptId);
          if (focus.size >= 2) break;
        }
      }
    }
    if (focus.size === 0) {
      for (const c of newCandidates) {
        focus.add(c.conceptId);
        if (focus.size >= 2) break;
      }
    }
  }

  const focused = newCandidates.filter((l) => focus.has(l.conceptId));
  const boostsApplied = [...focus].filter((id) => boostedConcepts.has(id));

  // Step 3: sort each concept's lessons by TYPE_PRIORITY, preserving input
  // order to keep determinism on ties.
  const byConcept = new Map();
  for (const l of focused) {
    if (!byConcept.has(l.conceptId)) byConcept.set(l.conceptId, []);
    byConcept.get(l.conceptId).push(l);
  }
  for (const arr of byConcept.values()) {
    arr.sort((a, b) => {
      const pa = TYPE_PRIORITY[a.lessonType] ?? 99;
      const pb = TYPE_PRIORITY[b.lessonType] ?? 99;
      return pa - pb;
    });
  }

  // Step 4: interleave across concepts, fit to remaining duration.
  const queues = [...byConcept.values()];
  const newSequenceIds = [];
  let newMinutes = 0;
  let progressed = true;
  while (progressed && newMinutes < remainingMinutes) {
    progressed = false;
    for (const q of queues) {
      if (q.length === 0) continue;
      const next = q[0];
      const projected = newMinutes + next.estimatedMinutes;
      // Allow ≤ 20% overshoot of the new-content allocation to avoid
      // leaving the session noticeably short of target.
      if (projected > remainingMinutes * 1.2 && newSequenceIds.length > 0) continue;
      q.shift();
      newSequenceIds.push(next.id);
      newMinutes = projected;
      progressed = true;
    }
  }

  // Step 5: assemble final sequence — reviews first, then new content.
  const sequence = [...reviewLessons.map((l) => l.id), ...newSequenceIds];
  const totalMinutes = reviewMinutes + newMinutes;

  // Step 6: enforce interleaving guarantee — never 3-in-a-row of same type
  // when an alternative exists later in the sequence.
  const lessonsById = new Map(
    [...reviewLessons, ...focused].map((l) => [l.id, l]),
  );
  for (let i = 2; i < sequence.length; i++) {
    const a = lessonsById.get(sequence[i - 2]).lessonType;
    const b = lessonsById.get(sequence[i - 1]).lessonType;
    const c = lessonsById.get(sequence[i]).lessonType;
    if (a === b && b === c) {
      for (let j = i + 1; j < sequence.length; j++) {
        if (lessonsById.get(sequence[j]).lessonType !== c) {
          [sequence[i], sequence[j]] = [sequence[j], sequence[i]];
          break;
        }
      }
    }
  }

  return {
    sequence,
    totalMinutes,
    skipped,
    reviewsSelected: reviewLessons.length,
    boostsApplied,
  };
}

module.exports = {
  planSession,
  selectReviewLessons,
  isAllowedAtLevel,
  LEVEL_ALLOWS_DIFFICULTY,
  TYPE_PRIORITY,
  SKILL_TO_LESSON_TYPES,
};
