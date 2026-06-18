const { planSession } = require('../planner');
const { LESSON_TYPES } = require('../schema/lessonTypes');

function mockLesson(id, conceptId, lessonType, opts = {}) {
  return {
    id,
    conceptId,
    lessonType,
    targetLang: opts.targetLang || 'ko',
    nativeLang: 'en',
    difficulty: 'beginner',
    prerequisites: opts.prerequisites || [],
    estimatedMinutes: opts.estimatedMinutes || 5,
  };
}

describe('planSession', () => {
  test('returns empty sequence when no lessons available', () => {
    const result = planSession([], { completedConceptIds: [], completedLessonIds: [] });
    expect(result.sequence).toEqual([]);
    expect(result.totalMinutes).toBe(0);
  });

  test('excludes lessons in wrong target language', () => {
    const lessons = [
      mockLesson('a', 'c1', LESSON_TYPES.PATTERN, { targetLang: 'ja' }),
    ];
    const result = planSession(lessons, { completedConceptIds: [], completedLessonIds: [] });
    expect(result.sequence).toEqual([]);
    expect(result.skipped[0].reason).toBe('wrong-target-lang');
  });

  test('excludes lessons already completed', () => {
    const lessons = [
      mockLesson('a', 'c1', LESSON_TYPES.PATTERN),
    ];
    const result = planSession(lessons, { completedConceptIds: [], completedLessonIds: ['a'] });
    expect(result.sequence).toEqual([]);
    expect(result.skipped[0].reason).toBe('already-completed');
  });

  test('respects prerequisites', () => {
    const lessons = [
      mockLesson('a', 'c1', LESSON_TYPES.PATTERN, { prerequisites: ['c0'] }),
      mockLesson('b', 'c2', LESSON_TYPES.PATTERN),
    ];
    const result = planSession(lessons, { completedConceptIds: [], completedLessonIds: [] });
    expect(result.sequence).toEqual(['b']);
    expect(result.skipped.some((s) => s.id === 'a' && s.reason.startsWith('prereqs-unmet'))).toBe(true);
  });

  test('orders lessons within a concept by TYPE_PRIORITY', () => {
    const lessons = [
      mockLesson('vocab', 'c1', LESSON_TYPES.VOCAB),
      mockLesson('story', 'c1', LESSON_TYPES.STORY),
      mockLesson('cloze', 'c1', LESSON_TYPES.CLOZE),
      mockLesson('contrast', 'c1', LESSON_TYPES.CONTRAST),
      mockLesson('pattern', 'c1', LESSON_TYPES.PATTERN),
    ];
    const result = planSession(lessons, { completedConceptIds: [], completedLessonIds: [] }, { targetMinutes: 60 });
    expect(result.sequence).toEqual(['contrast', 'pattern', 'cloze', 'story', 'vocab']);
  });

  test('respects target duration with ≤ 20% overshoot', () => {
    const lessons = [
      mockLesson('a', 'c1', LESSON_TYPES.PATTERN, { estimatedMinutes: 8 }),
      mockLesson('b', 'c1', LESSON_TYPES.CLOZE,   { estimatedMinutes: 8 }),
      mockLesson('c', 'c1', LESSON_TYPES.STORY,   { estimatedMinutes: 8 }),
      mockLesson('d', 'c1', LESSON_TYPES.VOCAB,   { estimatedMinutes: 8 }),
    ];
    const result = planSession(lessons, { completedConceptIds: [], completedLessonIds: [] }, { targetMinutes: 20 });
    expect(result.totalMinutes).toBeLessThanOrEqual(24); // 20 + 20%
    expect(result.totalMinutes).toBeGreaterThan(0);
  });

  test('interleaves across concepts when multiple are present', () => {
    const lessons = [
      mockLesson('c1-pattern', 'c1', LESSON_TYPES.PATTERN),
      mockLesson('c1-cloze',   'c1', LESSON_TYPES.CLOZE),
      mockLesson('c2-pattern', 'c2', LESSON_TYPES.PATTERN),
      mockLesson('c2-cloze',   'c2', LESSON_TYPES.CLOZE),
    ];
    const result = planSession(
      lessons,
      { completedConceptIds: [], completedLessonIds: [] },
      { targetMinutes: 30, focusConceptIds: ['c1', 'c2'] },
    );
    // Round-robin: c1-pattern, c2-pattern, c1-cloze, c2-cloze
    expect(result.sequence[0]).toBe('c1-pattern');
    expect(result.sequence[1]).toBe('c2-pattern');
  });

  test('honors focusConceptIds when provided', () => {
    const lessons = [
      mockLesson('a', 'c1', LESSON_TYPES.PATTERN),
      mockLesson('b', 'c2', LESSON_TYPES.PATTERN),
      mockLesson('c', 'c3', LESSON_TYPES.PATTERN),
    ];
    const result = planSession(
      lessons,
      { completedConceptIds: [], completedLessonIds: [] },
      { focusConceptIds: ['c2'] },
    );
    expect(result.sequence).toEqual(['b']);
  });

  test('integrates with real "have you ever" slice', () => {
    const realLessons = require('../lessons/pattern.experience.have_you_ever');
    const result = planSession(
      realLessons,
      { completedConceptIds: [], completedLessonIds: [] },
      { targetMinutes: 30 },
    );
    expect(result.sequence.length).toBeGreaterThanOrEqual(5);
    // Contrast must come before pattern
    const idxContrast = result.sequence.findIndex((id) => id.startsWith('contrast.'));
    const idxPattern = result.sequence.findIndex((id) => id.startsWith('pattern.'));
    expect(idxContrast).toBeLessThan(idxPattern);
    // Pattern must come before cloze
    const idxCloze = result.sequence.findIndex((id) => id.startsWith('cloze.'));
    expect(idxPattern).toBeLessThan(idxCloze);
  });

  describe('SRS review-first selection', () => {
    test('surfaces a review for a due concept the learner already completed', () => {
      const lessons = [
        mockLesson('cloze-c1', 'c1', LESSON_TYPES.CLOZE,   { estimatedMinutes: 4 }),
        mockLesson('pattern-c1', 'c1', LESSON_TYPES.PATTERN, { estimatedMinutes: 8 }),
        mockLesson('pattern-c2', 'c2', LESSON_TYPES.PATTERN, { estimatedMinutes: 8 }),
      ];
      const result = planSession(lessons, {
        completedConceptIds: ['c1'],
        completedLessonIds: ['cloze-c1', 'pattern-c1'],
        dueReviews: [{ conceptId: 'c1', skill: 'recognition', dueAt: new Date() }],
      }, { targetMinutes: 30 });
      expect(result.sequence[0]).toBe('cloze-c1');
      expect(result.reviewsSelected).toBe(1);
    });

    test('respects review budget and falls back to new content for the rest', () => {
      const lessons = [
        mockLesson('cloze-c1', 'c1', LESSON_TYPES.CLOZE,    { estimatedMinutes: 4 }),
        mockLesson('pattern-c2', 'c2', LESSON_TYPES.PATTERN, { estimatedMinutes: 10 }),
      ];
      const result = planSession(lessons, {
        completedConceptIds: ['c1'],
        completedLessonIds: ['cloze-c1'],
        dueReviews: [{ conceptId: 'c1', skill: 'recognition', dueAt: new Date() }],
      }, { targetMinutes: 30, reviewShareFraction: 0.30 });
      // 30% of 30 min = 9 min review budget; the 4-min cloze fits
      expect(result.sequence).toContain('cloze-c1');
      expect(result.sequence).toContain('pattern-c2');
      expect(result.reviewsSelected).toBe(1);
    });

    test('dedupes review by conceptId — picks one skill per concept', () => {
      const lessons = [
        mockLesson('cloze-c1', 'c1', LESSON_TYPES.CLOZE,    { estimatedMinutes: 4 }),
        mockLesson('pattern-c1', 'c1', LESSON_TYPES.PATTERN, { estimatedMinutes: 8 }),
        mockLesson('cloze-c2', 'c2', LESSON_TYPES.CLOZE,    { estimatedMinutes: 4 }),
      ];
      const result = planSession(lessons, {
        completedConceptIds: ['c1', 'c2'],
        completedLessonIds: ['cloze-c1', 'pattern-c1', 'cloze-c2'],
        dueReviews: [
          { conceptId: 'c1', skill: 'recognition', dueAt: new Date(2026, 0, 1) },
          { conceptId: 'c1', skill: 'production',  dueAt: new Date(2026, 0, 2) },
          { conceptId: 'c2', skill: 'recognition', dueAt: new Date(2026, 0, 3) },
        ],
      }, { targetMinutes: 30 });
      // c1 should appear at most once (most-overdue skill wins);
      // c2 also surfaces as a review
      const c1Reviews = result.sequence.filter((id) => id === 'cloze-c1' || id === 'pattern-c1');
      expect(c1Reviews.length).toBe(1);
      expect(result.sequence).toContain('cloze-c2');
    });

    test('skips mastered concepts in new-content selection', () => {
      const lessons = [
        mockLesson('a', 'c1', LESSON_TYPES.PATTERN),
        mockLesson('b', 'c2', LESSON_TYPES.PATTERN),
      ];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
        masteredConceptIds: ['c1'],
      }, { targetMinutes: 30 });
      expect(result.sequence).toEqual(['b']);
      expect(result.skipped.some((s) => s.id === 'a' && s.reason === 'concept-mastered')).toBe(true);
    });

    test('returns reviewsSelected=0 and boostsApplied=[] when no due reviews', () => {
      const lessons = [mockLesson('a', 'c1', LESSON_TYPES.PATTERN)];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
      }, { targetMinutes: 30 });
      expect(result.reviewsSelected).toBe(0);
      expect(result.boostsApplied).toEqual([]);
    });

    test('beginner learner cannot see advanced new content', () => {
      const lessons = [
        { ...mockLesson('a', 'c1', LESSON_TYPES.PATTERN), difficulty: 'beginner' },
        { ...mockLesson('b', 'c2', LESSON_TYPES.PATTERN), difficulty: 'advanced' },
      ];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
      }, { targetMinutes: 30, learnerLevel: 'beginner' });
      expect(result.sequence).toContain('a');
      expect(result.sequence).not.toContain('b');
      expect(result.skipped.some((s) => s.id === 'b' && s.reason.startsWith('above-level'))).toBe(true);
    });

    test('advanced learner sees every difficulty as new content', () => {
      const lessons = [
        { ...mockLesson('a', 'c1', LESSON_TYPES.PATTERN), difficulty: 'beginner' },
        { ...mockLesson('b', 'c2', LESSON_TYPES.PATTERN), difficulty: 'intermediate' },
        { ...mockLesson('c', 'c3', LESSON_TYPES.PATTERN), difficulty: 'advanced' },
      ];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
      }, { targetMinutes: 60, learnerLevel: 'advanced', focusConceptIds: ['c1', 'c2', 'c3'] });
      expect(result.sequence).toEqual(expect.arrayContaining(['a', 'b', 'c']));
    });

    test('level filter does not block review picks (reviews bypass the filter)', () => {
      const lessons = [
        { ...mockLesson('a', 'c1', LESSON_TYPES.CLOZE,   { estimatedMinutes: 4 }), difficulty: 'advanced' },
        { ...mockLesson('b', 'c2', LESSON_TYPES.PATTERN, { estimatedMinutes: 8 }), difficulty: 'beginner' },
      ];
      const result = planSession(lessons, {
        completedConceptIds: ['c1'],
        completedLessonIds: ['a'],
        dueReviews: [{ conceptId: 'c1', skill: 'recognition', dueAt: new Date() }],
      }, { targetMinutes: 30, learnerLevel: 'beginner' });
      expect(result.sequence).toContain('a'); // review surfaces despite advanced difficulty
      expect(result.reviewsSelected).toBe(1);
    });

    test('boostedConceptIds promote a boosted concept into focus', () => {
      const lessons = [
        mockLesson('a', 'c1', LESSON_TYPES.PATTERN),
        mockLesson('b', 'c2', LESSON_TYPES.PATTERN),
        mockLesson('c', 'c3', LESSON_TYPES.PATTERN),
      ];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
        boostedConceptIds: ['c3'],
      }, { targetMinutes: 30 });
      expect(result.sequence).toContain('c');
      expect(result.boostsApplied).toContain('c3');
    });

    test('explicit focusConceptIds wins over boost', () => {
      const lessons = [
        mockLesson('a', 'c1', LESSON_TYPES.PATTERN),
        mockLesson('b', 'c2', LESSON_TYPES.PATTERN),
      ];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
        boostedConceptIds: ['c2'],
      }, { targetMinutes: 30, focusConceptIds: ['c1'] });
      expect(result.sequence).toEqual(['a']);
      // c2 wasn't included → no boost applied
      expect(result.boostsApplied).toEqual([]);
    });

    test('boost does not override level or mastery filters', () => {
      const lessons = [
        { ...mockLesson('a', 'c1', LESSON_TYPES.PATTERN), difficulty: 'beginner' },
        { ...mockLesson('b', 'c2', LESSON_TYPES.PATTERN), difficulty: 'advanced' },
      ];
      const result = planSession(lessons, {
        completedConceptIds: [],
        completedLessonIds: [],
        boostedConceptIds: ['c2'],
      }, { targetMinutes: 30, learnerLevel: 'beginner' });
      expect(result.sequence).not.toContain('b');
      expect(result.sequence).toContain('a');
      expect(result.boostsApplied).toEqual([]); // boost filtered out by level
    });

    test('matches skill to the right lesson type', () => {
      const lessons = [
        mockLesson('cloze-c1',   'c1', LESSON_TYPES.CLOZE,         { estimatedMinutes: 4 }),
        mockLesson('pattern-c1', 'c1', LESSON_TYPES.PATTERN,       { estimatedMinutes: 8 }),
        mockLesson('pron-c1',    'c1', LESSON_TYPES.PRONUNCIATION, { estimatedMinutes: 5 }),
        mockLesson('mp-c1',      'c1', LESSON_TYPES.MINIMAL_PAIR,  { estimatedMinutes: 4 }),
      ];
      const productionDue = planSession(lessons, {
        completedConceptIds: ['c1'],
        completedLessonIds: ['cloze-c1', 'pattern-c1', 'pron-c1', 'mp-c1'],
        dueReviews: [{ conceptId: 'c1', skill: 'production', dueAt: new Date() }],
      }, { targetMinutes: 30 });
      expect(productionDue.sequence[0]).toBe('pattern-c1');

      const pronunciationDue = planSession(lessons, {
        completedConceptIds: ['c1'],
        completedLessonIds: ['cloze-c1', 'pattern-c1', 'pron-c1', 'mp-c1'],
        dueReviews: [{ conceptId: 'c1', skill: 'pronunciation', dueAt: new Date() }],
      }, { targetMinutes: 30 });
      expect(pronunciationDue.sequence[0]).toBe('pron-c1');
    });
  });
});
