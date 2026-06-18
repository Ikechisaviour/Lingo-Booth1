const {
  TARGET_RETENTION,
  SEED_STABILITY,
  retrievability,
  dueOffsetDays,
  nextStateFromReview,
  nextStateFromContextReinforce,
  getMastery,
} = require('../utils/curriculumV2Srs');

const NOW = new Date('2026-06-02T10:00:00Z');
const DAY_MS = 86_400_000;
function daysLater(ms, days) {
  return new Date(ms + days * DAY_MS);
}

function baseState(overrides = {}) {
  return {
    stability: 0,
    difficulty: 5,
    reviewCount: 0,
    lapses: 0,
    reinforcedByContextAt: [],
    ...overrides,
  };
}

describe('curriculumV2Srs — pure math', () => {
  describe('retrievability', () => {
    it('returns 1 when zero time has elapsed', () => {
      expect(retrievability(2.5, 0)).toBeCloseTo(1, 6);
    });

    it('returns TARGET_RETENTION when elapsed equals stability', () => {
      expect(retrievability(2.5, 2.5)).toBeCloseTo(TARGET_RETENTION, 6);
      expect(retrievability(10, 10)).toBeCloseTo(TARGET_RETENTION, 6);
    });

    it('returns 0 for non-positive stability', () => {
      expect(retrievability(0, 5)).toBe(0);
      expect(retrievability(-1, 5)).toBe(0);
    });

    it('decays monotonically', () => {
      const a = retrievability(5, 1);
      const b = retrievability(5, 3);
      const c = retrievability(5, 10);
      expect(a).toBeGreaterThan(b);
      expect(b).toBeGreaterThan(c);
    });
  });

  describe('dueOffsetDays', () => {
    it('returns stability when stability > floor', () => {
      expect(dueOffsetDays(5)).toBe(5);
      expect(dueOffsetDays(0.5)).toBe(0.5);
    });

    it('floors at ~1 hour for tiny stability', () => {
      expect(dueOffsetDays(0)).toBeCloseTo(0.04, 5);
      expect(dueOffsetDays(0.01)).toBeCloseTo(0.04, 5);
    });
  });

  describe('nextStateFromReview — first review', () => {
    it('seeds stability from outcome', () => {
      for (const outcome of ['again', 'hard', 'good', 'easy']) {
        const next = nextStateFromReview(baseState(), outcome, NOW);
        expect(next.stability).toBe(SEED_STABILITY[outcome]);
      }
    });

    it('records the review and sets dueAt forward', () => {
      const next = nextStateFromReview(baseState(), 'good', NOW);
      expect(next.reviewCount).toBe(1);
      expect(next.lastReviewedAt).toEqual(NOW);
      expect(next.lastResult).toBe('good');
      expect(next.dueAt.getTime()).toBeGreaterThan(NOW.getTime());
    });

    it('counts a first-review "again" as a lapse', () => {
      const next = nextStateFromReview(baseState(), 'again', NOW);
      expect(next.lapses).toBe(1);
    });

    it('"easy" schedules further out than "good" which schedules further out than "hard"', () => {
      const easy = nextStateFromReview(baseState(), 'easy', NOW);
      const good = nextStateFromReview(baseState(), 'good', NOW);
      const hard = nextStateFromReview(baseState(), 'hard', NOW);
      expect(easy.dueAt.getTime()).toBeGreaterThan(good.dueAt.getTime());
      expect(good.dueAt.getTime()).toBeGreaterThan(hard.dueAt.getTime());
    });
  });

  describe('nextStateFromReview — subsequent reviews', () => {
    it('"again" collapses stability and increments lapses', () => {
      const before = baseState({
        stability: 14,
        difficulty: 4,
        reviewCount: 5,
        lapses: 0,
        lastReviewedAt: NOW,
      });
      const next = nextStateFromReview(before, 'again', daysLater(NOW.getTime(), 14));
      expect(next.stability).toBeLessThan(before.stability);
      expect(next.lapses).toBe(1);
      expect(next.reviewCount).toBe(6);
    });

    it('"good" grows stability when reviewed on time', () => {
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
      });
      const next = nextStateFromReview(before, 'good', daysLater(NOW.getTime(), 5));
      expect(next.stability).toBeGreaterThan(before.stability);
    });

    it('"good" grows stability MORE when R was low at review time', () => {
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
      });
      const onTime = nextStateFromReview(before, 'good', daysLater(NOW.getTime(), 5));
      const overdue = nextStateFromReview(before, 'good', daysLater(NOW.getTime(), 30));
      expect(overdue.stability).toBeGreaterThan(onTime.stability);
    });

    it('"easy" grows stability more than "good", which grows more than "hard"', () => {
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
      });
      const later = daysLater(NOW.getTime(), 5);
      const easy = nextStateFromReview(before, 'easy', later);
      const good = nextStateFromReview(before, 'good', later);
      const hard = nextStateFromReview(before, 'hard', later);
      expect(easy.stability).toBeGreaterThan(good.stability);
      expect(good.stability).toBeGreaterThan(hard.stability);
    });

    it('difficulty drifts toward harder on "again", easier on "easy"', () => {
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
      });
      const later = daysLater(NOW.getTime(), 5);
      const again = nextStateFromReview(before, 'again', later);
      const easy = nextStateFromReview(before, 'easy', later);
      expect(again.difficulty).toBeGreaterThan(before.difficulty);
      expect(easy.difficulty).toBeLessThan(before.difficulty);
    });

    it('difficulty stays clamped to [0, 10]', () => {
      const high = baseState({
        stability: 5,
        difficulty: 9.5,
        reviewCount: 5,
        lastReviewedAt: NOW,
      });
      const low = baseState({
        stability: 5,
        difficulty: 0.3,
        reviewCount: 5,
        lastReviewedAt: NOW,
      });
      const later = daysLater(NOW.getTime(), 5);
      expect(nextStateFromReview(high, 'again', later).difficulty).toBeLessThanOrEqual(10);
      expect(nextStateFromReview(low, 'easy', later).difficulty).toBeGreaterThanOrEqual(0);
    });
  });

  describe('nextStateFromReview — error handling', () => {
    it('throws on unknown outcome', () => {
      expect(() => nextStateFromReview(baseState(), 'maybe', NOW)).toThrow(/Unknown SRS outcome/);
    });
  });

  describe('nextStateFromContextReinforce', () => {
    it('returns null for never-reviewed items', () => {
      const result = nextStateFromContextReinforce(baseState(), NOW);
      expect(result).toBeNull();
    });

    it('grows stability and appends timestamp for reviewed items', () => {
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
        reinforcedByContextAt: [],
      });
      const later = daysLater(NOW.getTime(), 3);
      const next = nextStateFromContextReinforce(before, later);
      expect(next.stability).toBeGreaterThan(before.stability);
      expect(next.reinforcedByContextAt).toHaveLength(1);
      expect(next.reinforcedByContextAt[0]).toEqual(later);
    });

    it('applies less than a full "good" review would', () => {
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
      });
      const later = daysLater(NOW.getTime(), 5);
      const fromGood = nextStateFromReview(before, 'good', later);
      const fromContext = nextStateFromContextReinforce(before, later);
      expect(fromContext.stability).toBeLessThan(fromGood.stability);
    });

    it('preserves existing reinforcement history', () => {
      const earlier = daysLater(NOW.getTime(), -2);
      const before = baseState({
        stability: 5,
        difficulty: 5,
        reviewCount: 2,
        lastReviewedAt: NOW,
        reinforcedByContextAt: [earlier],
      });
      const next = nextStateFromContextReinforce(before, daysLater(NOW.getTime(), 1));
      expect(next.reinforcedByContextAt).toHaveLength(2);
      expect(next.reinforcedByContextAt[0]).toEqual(earlier);
    });
  });

  describe('getMastery', () => {
    it('returns 0 for never-reviewed items', () => {
      expect(getMastery(baseState())).toBe(0);
      expect(getMastery(null)).toBe(0);
    });

    it('rises with stability', () => {
      const low = getMastery({ stability: 3, difficulty: 5, reviewCount: 2 });
      const mid = getMastery({ stability: 15, difficulty: 5, reviewCount: 4 });
      const high = getMastery({ stability: 50, difficulty: 5, reviewCount: 8 });
      expect(mid).toBeGreaterThan(low);
      expect(high).toBeGreaterThan(mid);
    });

    it('falls with difficulty at equal stability', () => {
      const easy = getMastery({ stability: 20, difficulty: 2, reviewCount: 4 });
      const hard = getMastery({ stability: 20, difficulty: 9, reviewCount: 4 });
      expect(easy).toBeGreaterThan(hard);
    });

    it('stays in [0, 1]', () => {
      const huge = getMastery({ stability: 999, difficulty: 0, reviewCount: 100 });
      const tiny = getMastery({ stability: 0.01, difficulty: 10, reviewCount: 1 });
      expect(huge).toBeLessThanOrEqual(1);
      expect(tiny).toBeGreaterThanOrEqual(0);
    });
  });
});
