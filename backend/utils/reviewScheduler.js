const DEFAULT_EASE = 2.5;

const LEVEL_INTERVAL_DAYS = {
  1: 0.25,
  2: 1,
  3: 3,
  4: 7,
  5: 21,
};

function clampRating(value, fallback = 3) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(5, Math.max(1, Math.round(number)));
}

function datePlusDays(days, from = new Date()) {
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000);
}

function reviewStateForCard(card = {}, now = new Date()) {
  const nextReviewAt = card.nextReviewAt ? new Date(card.nextReviewAt) : null;
  const due = !nextReviewAt || Number.isNaN(nextReviewAt.getTime()) || nextReviewAt <= now;
  const msUntilReview = due ? 0 : nextReviewAt.getTime() - now.getTime();
  return {
    due,
    nextReviewAt: nextReviewAt ? nextReviewAt.toISOString() : null,
    hoursUntilReview: Math.max(0, Math.ceil(msUntilReview / (60 * 60 * 1000))),
  };
}

function scheduleFlashcardReview({
  currentRating = 3,
  requestedRating,
  isCorrect,
  reviewCount = 0,
  ease = DEFAULT_EASE,
  now = new Date(),
} = {}) {
  const hadManualRating = requestedRating !== undefined && requestedRating !== null;
  const previous = clampRating(currentRating, 3);
  const nextRating = hadManualRating
    ? clampRating(requestedRating, previous)
    : isCorrect
      ? clampRating(previous + 1, previous)
      : clampRating(previous - 1, previous);

  const result = hadManualRating
    ? 'manual'
    : isCorrect
      ? 'correct'
      : 'incorrect';

  const nextReviewCount = Math.max(0, Number(reviewCount) || 0) + 1;
  const nextEase = Math.max(
    1.3,
    Math.min(3.2, (Number(ease) || DEFAULT_EASE) + (result === 'incorrect' ? -0.2 : result === 'correct' ? 0.08 : 0))
  );
  const baseDays = LEVEL_INTERVAL_DAYS[nextRating] || LEVEL_INTERVAL_DAYS[3];
  const easeFactor = Math.max(0.65, Math.min(1.35, nextEase / DEFAULT_EASE));
  const nextReviewAt = datePlusDays(baseDays * easeFactor, now);

  return {
    masteryLevel: nextRating,
    reviewCount: nextReviewCount,
    ease: Number(nextEase.toFixed(2)),
    lastReviewedAt: now,
    nextReviewAt,
    lastReviewResult: result,
    correctIncrement: result === 'correct' ? 1 : 0,
    incorrectIncrement: result === 'incorrect' ? 1 : 0,
    reviewState: reviewStateForCard({ nextReviewAt }, now),
  };
}

module.exports = {
  clampRating,
  reviewStateForCard,
  scheduleFlashcardReview,
};
