const REVIEW_SOURCE_PATTERNS = {
  level2Review01: [/^level2Unit02/i, /^level2Unit03/i, /^level2Unit04/i],
  level2Review02: [/^level2Unit05/i, /^level2Unit06/i, /^level2Unit07/i],
  level2Review03: [/^level2Unit08/i, /^level2Unit09/i],
};

const resolveReviewOf = (lessonId, lessonIds) => {
  const patterns = REVIEW_SOURCE_PATTERNS[lessonId];
  if (!patterns) return [];
  return patterns
    .map((pattern) => lessonIds.find((candidate) => pattern.test(candidate)))
    .filter(Boolean);
};

const withResolvedReviewLinks = (lessonId, lesson, lessonIds) => {
  if (lesson.lessonType !== 'review') return lesson;
  const reviewOf = resolveReviewOf(lessonId, lessonIds);
  return reviewOf.length
    ? { ...lesson, reviewOf }
    : lesson;
};

module.exports = {
  REVIEW_SOURCE_PATTERNS,
  resolveReviewOf,
  withResolvedReviewLinks,
};
