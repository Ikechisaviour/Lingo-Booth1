// Level 3 Cluster — Tense & Sequence
// Source: TTMIK Workbook Level 3, Lessons 6, 10, 19.
// Patterns: -(으)ㄹ 거예요 vs -(으)ㄹ게요, -기 전에, 다음에 / 후에 / 뒤에.

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
  pattern: 'l3c2-pattern',
  examples: 'l3c2-examples',
  practice: 'l3c2-practice',
};

const activities = [
  { id: ACT.pattern, section: 'Pattern', title: 'Tense and sequence patterns',
    goals: ['Distinguish prediction (-ㄹ 거예요) from commitment (-ㄹ게요).', 'Sequence with -기 전에 / 다음에 / 후에.'],
    task: 'Pair each pattern with the right English equivalent.' },
  { id: ACT.examples, section: 'Examples', title: 'Examples in context',
    goals: ['See each pattern in a natural sentence.'],
    task: 'Read each example sentence aloud.' },
  { id: ACT.practice, section: 'Practice', title: 'Producing your own sentences',
    goals: ['Use each pattern to describe your own day.'],
    task: 'Make four sentences using each tense / sequence pattern.' },
];

const lesson = {
  title: 'Level 3 · Tense & Sequence (-ㄹ 거예요 vs -ㄹ게요 / -기 전에 / -다음에)',
  category: 'daily-life', difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'choosing-future', label: 'Choosing the right future form', goal: 'Decide between -(으)ㄹ 거예요 (prediction) and -(으)ㄹ게요 (commitment) for a given situation.' },
  ],
  relatedPools: ['pos-verbs-1'],
  content: [
    createContentItem('-(으)ㄹ 거예요', '-(eu)l geoyeyo', 'will / probably will (prediction or plan)', 'word', '내일은 비가 올 거예요.', 'It will probably rain tomorrow.', null, [ACT.pattern]),
    createContentItem('-(으)ㄹ게요', '-(eu)lgeyo', 'I will (commitment to listener)', 'word', '제가 도와드릴게요.', 'I will help you.', null, [ACT.pattern]),
    createContentItem('-기 전에', '-gi jeone', 'before -ing', 'word', '먹기 전에 손을 씻어요.', 'I wash my hands before eating.', null, [ACT.pattern]),
    createContentItem('다음에', 'daeume', 'next time / next', 'word', '다음에 만나요.', 'See you next time.', null, [ACT.pattern]),
    createContentItem('-(으)ㄴ 후에', '-(eu)n hue', 'after -ing', 'word', '운동한 후에 샤워해요.', 'After exercising I shower.', null, [ACT.pattern]),
    createContentItem('-(으)ㄴ 뒤에', '-(eu)n dwie', 'after -ing (alt)', 'word', '식사한 뒤에 산책해요.', 'After a meal I take a walk.', null, [ACT.pattern]),

    createContentItem(
      '저는 내년에 한국에 갈 거예요.', 'jeoneun naenyeone hanguge gal geoyeyo.',
      'I will probably go to Korea next year.', 'sentence',
      '저는 내년에 한국에 갈 거예요. 비행기표를 알아보고 있어요.',
      'I will probably go to Korea next year. I am looking up airfares.',
      [{ korean: '-(으)ㄹ 거예요', english: 'probably will / plan to' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '걱정하지 마세요. 제가 할게요.', 'geokjeonghaji maseyo. jega halgeyo.',
      'Do not worry. I will do it.', 'sentence',
      '걱정하지 마세요. 제가 할게요. 5분만 주세요.',
      'Do not worry. I will do it. Just give me 5 minutes.',
      [{ korean: '-(으)ㄹ게요', english: 'I will (committing to listener)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '자기 전에 책을 읽어요.', 'jagi jeone chaegeul ilgeoyo.',
      'I read a book before sleeping.', 'sentence',
      '자기 전에 책을 30분 정도 읽어요. 잠이 잘 와요.',
      'I read a book for about 30 minutes before sleeping. It helps me fall asleep.',
      [{ korean: '-기 전에', english: 'before -ing' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '저녁을 먹은 후에 산책해요.', 'jeonyeogeul meogeun hue sanchaekhaeyo.',
      'After dinner I take a walk.', 'sentence',
      '저녁을 먹은 후에 산책해요. 그러면 소화가 잘 돼요.',
      'After dinner I take a walk. Then digestion goes well.',
      [{ korean: '-(으)ㄴ 후에', english: 'after -ing' }],
      [ACT.examples, ACT.practice],
    ),
  ],
};

module.exports = lesson;
