// Level 3 Cluster — Modality & Possibility
// Source: TTMIK Workbook Level 3, Lessons 4, 17, 18, 20, 22.
// Patterns: -(으)ㄹ까요?, 위해(서), -밖에 + 부정형, -아/어/여도, -(으)ㄹ 수도 있어요.

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
  pattern: 'l3c3-pattern',
  examples: 'l3c3-examples',
  practice: 'l3c3-practice',
};

const activities = [
  { id: ACT.pattern, section: 'Pattern', title: 'Modality and possibility patterns',
    goals: ['Express suggesting, purpose, only, even-if, possibility.'],
    task: 'Match each pattern to a learner-friendly English meaning.' },
  { id: ACT.examples, section: 'Examples', title: 'Examples in context',
    goals: ['See each pattern in a natural sentence.'],
    task: 'Read examples aloud and notice the modal nuance.' },
  { id: ACT.practice, section: 'Practice', title: 'Producing your own sentences',
    goals: ['Use each pattern to express a real thought.'],
    task: 'Make five sentences, one per pattern.' },
];

const lesson = {
  title: 'Level 3 · Modality & Possibility (-ㄹ까요? / 위해 / -밖에 / -아·어·여도 / -ㄹ 수도 있어요)',
  category: 'daily-life', difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'expressing-modality', label: 'Expressing modality', goal: 'Pick the right modal pattern for "shall we / for / only / even if / might".' },
  ],
  relatedPools: ['pos-adverbs-1'],
  content: [
    createContentItem('-(으)ㄹ까요?', '-(eu)lkkayo?', 'shall we ~ ? (suggestion or wondering)', 'word', '같이 갈까요?', 'Shall we go together?', null, [ACT.pattern]),
    createContentItem('위해(서)', 'wihae(seo)', 'for the sake of / in order to', 'word', '건강을 위해서 운동해요.', 'I exercise for my health.', null, [ACT.pattern]),
    createContentItem('-밖에 + 부정', '-bakke + negation', 'nothing but / only', 'word', '천 원밖에 없어요.', 'I only have a thousand won.', null, [ACT.pattern]),
    createContentItem('-아/어/여도', '-aedo / -eodo / -yeodo', 'even if / even though', 'word', '비가 와도 갈 거예요.', 'Even if it rains, I will go.', null, [ACT.pattern]),
    createContentItem('-(으)ㄹ 수도 있어요', '-(eu)l sudo isseoyo', 'might / it is possible that ~', 'word', '늦을 수도 있어요.', 'I might be late.', null, [ACT.pattern]),

    createContentItem(
      '점심에 같이 먹을까요?', 'jeomsime gachi meogeulkkayo?',
      'Shall we eat together at lunch?', 'sentence',
      '점심에 같이 먹을까요? 좋은 식당이 있어요.',
      'Shall we eat together at lunch? There is a good restaurant.',
      [{ korean: '-(으)ㄹ까요?', english: 'shall we ~ ?' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '시험에 합격하기 위해서 매일 공부해요.', 'siheome hapgyeokhagi wihaeseo maeil gongbuhaeyo.',
      'I study every day in order to pass the exam.', 'sentence',
      '시험에 합격하기 위해서 매일 공부해요. 3시간 정도요.',
      'I study every day in order to pass the exam. About 3 hours.',
      [{ korean: 'V-기 위해서', english: 'in order to V' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '저는 한국어밖에 못해요.', 'jeoneun hangugeobakke mothaeyo.',
      'I can only speak Korean.', 'sentence',
      '저는 영어는 못 하고 한국어밖에 못해요.',
      'I cannot speak English; I only speak Korean.',
      [{ korean: '-밖에 + 부정', english: 'only ~ (literally: nothing but)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '비가 와도 운동을 해요.', 'biga wado undongeul haeyo.',
      'Even if it rains, I exercise.', 'sentence',
      '비가 와도 운동을 해요. 우산 쓰고 걸어요.',
      'Even if it rains, I exercise. I walk with an umbrella.',
      [{ korean: '-아/어/여도', english: 'even if / even though' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '오늘은 야근할 수도 있어요.', 'oneureun yageunhal sudo isseoyo.',
      'I might have to work overtime today.', 'sentence',
      '오늘은 야근할 수도 있어요. 미리 알려 드릴게요.',
      'I might have to work overtime today. I will let you know in advance.',
      [{ korean: '-(으)ㄹ 수도 있어요', english: 'might / it is possible' }],
      [ACT.examples, ACT.practice],
    ),
  ],
};

module.exports = lesson;
