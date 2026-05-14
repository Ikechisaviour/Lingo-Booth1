// Level 3 Cluster — Tense & Sequence
// Source: TTMIK Workbook Level 3, Lessons 6, 10, 19.

const createContentItem = (
  korean, romanization, english, type = 'word',
  example = '', exampleEnglish = '', breakdown = null, activityIds = [],
) => ({
  type, activityIds,
  targetText: korean, romanization, nativeText: english, pronunciation: romanization,
  exampleTarget: example || korean, exampleNative: exampleEnglish || english,
  korean, english, example: example || korean, exampleEnglish: exampleEnglish || english,
  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.korean, native: b.english, korean: b.korean, english: b.english })) } : {}),
});

const ACT = {
  orientation: 'l3c2-orientation',
  patterns: 'l3c2-patterns',
  future: 'l3c2-future',
  commit: 'l3c2-commit',
  before: 'l3c2-before',
  after: 'l3c2-after',
  comparison: 'l3c2-comparison',
  reading: 'l3c2-reading',
  speaking: 'l3c2-speaking',
  writing: 'l3c2-writing',
  task: 'l3c2-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Distinguish prediction (-ㄹ 거예요) from commitment (-ㄹ게요).', 'Use 4 sequencing patterns: 기 전에, 다음에, 후에, 뒤에.'],
    task: 'Imagine planning a trip — you must use prediction, commitment, and sequence.' },
  { id: ACT.patterns, section: 'Patterns Overview', title: 'Six tense/sequence patterns',
    goals: ['Match each pattern to its English meaning.'],
    task: 'Pair the patterns.' },
  { id: ACT.future, section: 'Future Prediction', title: '-(으)ㄹ 거예요 — will / probably will',
    goals: ['Use for predictions or impersonal plans.'],
    task: 'Make 3 prediction sentences.' },
  { id: ACT.commit, section: 'Commitment', title: '-(으)ㄹ게요 — I will (commit to listener)',
    goals: ['First-person commitment, listener-oriented.'],
    task: 'Make 3 commitment sentences.' },
  { id: ACT.before, section: 'Before', title: '-기 전에 — before V-ing',
    goals: ['Attach -기 전에 to verb stem.'],
    task: 'Sequence 3 actions before another.' },
  { id: ACT.after, section: 'After', title: '-(으)ㄴ 후에 / 뒤에 / 다음에 — after V-ing',
    goals: ['Three near-synonyms for "after V-ing".'],
    task: 'Use all three.' },
  { id: ACT.comparison, section: 'Comparison', title: '-(으)ㄹ 거예요 vs -(으)ㄹ게요',
    goals: ['Pick the right future form for context.'],
    task: 'Disambiguate 5 examples.' },
  { id: ACT.reading, section: 'Reading', title: '읽기 — A weekly plan',
    goals: ['Read a 5-sentence weekly plan with all 6 patterns.'],
    task: 'Identify each pattern.' },
  { id: ACT.speaking, section: 'Speaking', title: '말하기 — Future + sequence',
    goals: ['Describe your week using prediction + sequence.'],
    task: 'Tell a 5-step plan.' },
  { id: ACT.writing, section: 'Writing', title: '쓰기 — Weekly plan',
    goals: ['Write a 5-6 sentence weekly plan.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: '과제 — Plan a trip',
    goals: ['Combine all 6 patterns in one continuous scene.'],
    task: 'Plan a 3-day trip to 제주도.' },
];

const lesson = {
  title: 'Level 3 · Tense & Sequence (-ㄹ 거예요 vs -ㄹ게요 / -기 전에 / -다음에)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'choosing-future', label: 'Choosing future form', goal: 'Pick -(으)ㄹ 거예요 vs -(으)ㄹ게요 by context.' },
    { id: 'sequencing-actions', label: 'Sequencing actions', goal: 'Use 기 전에 / 후에 / 뒤에 / 다음에.' },
    { id: 'committing-action', label: 'Committing to action', goal: 'Use -(으)ㄹ게요 to promise.' },
  ],
  relatedPools: ['pos-verbs-1'],
  content: [
    createContentItem('단원 목표', 'danwon mokpyo', 'By end: distinguish prediction vs commitment + sequence actions natively.', 'word', '~ㄹ 거예요 / ~ㄹ게요 / ~기 전에 / ~ㄴ 후에', 'Six patterns.', null, [ACT.orientation]),

    createContentItem('-(으)ㄹ 거예요', '-(eu)l geoyeyo', 'will / probably will', 'word', '내일은 비가 올 거예요.', 'Will probably rain tomorrow.', null, [ACT.patterns]),
    createContentItem('-(으)ㄹ게요', '-(eu)lgeyo', 'I will (commit)', 'word', '제가 도와드릴게요.', 'I will help you.', null, [ACT.patterns]),
    createContentItem('-기 전에', '-gi jeone', 'before -ing', 'word', '먹기 전에 손을 씻어요.', 'Wash hands before eating.', null, [ACT.patterns]),
    createContentItem('다음에', 'daeume', 'next time', 'word', '다음에 만나요.', 'See you next time.', null, [ACT.patterns]),
    createContentItem('-(으)ㄴ 후에', '-(eu)n hue', 'after -ing', 'word', '운동한 후에 샤워해요.', 'After exercise I shower.', null, [ACT.patterns]),
    createContentItem('-(으)ㄴ 뒤에', '-(eu)n dwie', 'after -ing (alt)', 'word', '식사한 뒤에 산책해요.', 'After meal I walk.', null, [ACT.patterns]),

    createContentItem('-(으)ㄹ 거예요 — prediction', 'future', 'Use for predictions or impersonal plans. Often paired with 아마 (probably).', 'sentence', '저는 내년에 한국에 갈 거예요.', 'I will probably go to Korea next year.',
      [{ korean: 'V + ㄹ 거예요', english: 'vowel-ending stem' }, { korean: 'V + 을 거예요', english: 'consonant-ending stem' }, { korean: '아마 ~ ㄹ 거예요', english: 'probably will' }], [ACT.future]),
    createContentItem('Past prediction', '~ㅆ을 거예요', 'For past predictions ("must have"): -았/었을 거예요.', 'sentence', '아마 도착했을 거예요.', 'Must have arrived.',
      null, [ACT.future]),

    createContentItem('-(으)ㄹ게요 — commitment', 'speaker promise', 'First-person ONLY. Promise to the listener.', 'sentence', '걱정하지 마세요. 제가 할게요.', 'Do not worry. I will do it.',
      [{ korean: '제가 + V + ㄹ게요', english: 'I promise to V' }, { korean: 'difference', english: 'directly to listener' }], [ACT.commit]),
    createContentItem('Common contexts', 'service / volunteer', 'Used when offering help, volunteering, promising arrival.', 'sentence', '곧 갈게요. · 도와줄게요. · 다시 전화 드릴게요.', 'On my way. Will help. Will call back.',
      null, [ACT.commit]),

    createContentItem('V-기 전에 — before V-ing', 'before', 'Attach -기 전에 to verb stem (no irregular changes).', 'sentence', '자기 전에 책을 읽어요.', 'I read before sleeping.',
      [{ korean: '먹 + 기 전에', english: 'before eating' }, { korean: '가 + 기 전에', english: 'before going' }], [ACT.before]),
    createContentItem('N 전에', 'with noun', 'For nouns, use N 전에 directly.', 'sentence', '수업 전에 / 시험 전에', 'Before class / before exam.',
      null, [ACT.before]),

    createContentItem('V-(으)ㄴ 후에 — after V-ing', 'after (formal)', 'Most formal "after" — common in writing.', 'sentence', '저녁을 먹은 후에 산책해요.', 'After dinner I walk.',
      [{ korean: '먹 + 은 후에', english: 'after eating' }, { korean: '가 + ㄴ 후에 → 간 후에', english: 'after going' }], [ACT.after]),
    createContentItem('V-(으)ㄴ 뒤에 — after V-ing', 'after (casual)', 'Same as 후에, slightly more casual.', 'sentence', '운동한 뒤에 샤워해요.', 'After exercise I shower.',
      null, [ACT.after]),
    createContentItem('V-(으)ㄴ 다음에 — after V-ing', 'after (sequence)', 'Same meaning, emphasizes step-after-step.', 'sentence', '수업이 끝난 다음에 카페에 가요.', 'After class ends, I go to cafe.',
      null, [ACT.after]),

    createContentItem('Future cheat sheet', 'comparison',
      'Prediction = ~ㄹ 거예요. Commitment = ~ㄹ게요. Sequence = 기 전에 / ㄴ 후에.',
      'sentence',
      '비가 올 거예요 (prediction) · 제가 갈게요 (commitment) · 가기 전에 (before) · 간 후에 (after)',
      'Distinguish carefully.',
      null, [ACT.comparison]),

    createContentItem('A weekly plan', 'reading',
      'Read this plan.',
      'sentence',
      '월요일에는 운동하기 전에 일찍 일어날 거예요. 화요일은 회의 후에 친구와 점심을 먹을 거예요. 수요일에 한국어 수업이 끝난 다음에 카페에 갈게요. 금요일에 가족과 영화를 볼 거예요. 영화 끝난 뒤에 저녁도 같이 먹을게요.',
      'Mon: wake early before exercise. Tue: lunch with friend after meeting. Wed: cafe after Korean class. Fri: movie with family. Dinner together after movie.',
      [
        { korean: '~기 전에', english: 'before' },
        { korean: '~ㄹ 거예요', english: 'plan' },
        { korean: '~ㄴ 후에', english: 'after' },
        { korean: '~ㄹ게요', english: 'commit' },
      ],
      [ACT.reading]),

    createContentItem('Speaking — 5 steps', 'speaking',
      'Tell a 5-step plan with sequence + prediction.',
      'sentence', '내일 일어난 후에 운동할 거예요. 그 다음에 아침을 먹기 전에 샤워할게요. 9시에 학교에 갈 거예요. 수업 끝난 뒤에 친구를 만날 거예요.',
      'Tomorrow after waking, will exercise. Then shower before breakfast. Will go to school at 9. After class, will meet friend.',
      null, [ACT.speaking]),

    createContentItem('Weekly plan paragraph', 'writing',
      'Sample paragraph.',
      'sentence',
      '이번 주에는 한국어 시험을 잘 볼 거예요. 시험 보기 전에 매일 단어를 외울게요. 시험 끝난 후에 친구하고 영화를 볼 거예요. 영화 본 다음에 카페에서 커피를 마실 거예요. 주말에는 가족과 시간을 보낼게요.',
      'This week I will do well on the Korean exam. Will memorize words daily before exam. Will see movie with friend after exam. After movie, cafe. Weekend with family.',
      null, [ACT.writing]),

    createContentItem('과제: Plan a Jeju trip', 'task',
      'Roleplay: Plan a 3-day Jeju trip with the AI tutor.',
      'conversation',
      'Tutor: 제주도 어떻게 갈 거예요?\nYou: ~ ㄹ 거예요. 가기 전에 ~\nTutor: 도착 후에는 뭘 할 거예요?\nYou: 도착한 후에 ~. 그 다음에 ~\nTutor: 마지막 날은?\nYou: 마지막 날에 ~ ㄹ게요. 돌아오기 전에 선물도 살 거예요.',
      'AI tutor will plan with you.',
      [
        { korean: '~ ㄹ 거예요', english: 'will' },
        { korean: '~ ㄹ게요', english: 'commit' },
        { korean: '~ 기 전에', english: 'before' },
        { korean: '~ ㄴ 후에', english: 'after' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
