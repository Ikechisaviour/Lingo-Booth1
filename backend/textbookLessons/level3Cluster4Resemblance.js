// Level 3 Cluster — Comparison & Resemblance
// Source: TTMIK Workbook Level 3, Lessons 1, 5, 8, 9.
// Patterns: 너무, -쯤/정도/약, 같다, -(으)ㄴ/는/(으)ㄹ 것 같아요.

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
  pattern: 'l3c4-pattern',
  examples: 'l3c4-examples',
  practice: 'l3c4-practice',
};

const activities = [
  { id: ACT.pattern, section: 'Pattern', title: 'Comparison and resemblance',
    goals: ['Use "too / about / like / seem".'],
    task: 'Match each pattern to its meaning.' },
  { id: ACT.examples, section: 'Examples', title: 'Examples in context',
    goals: ['See each pattern in a natural sentence.'],
    task: 'Read each example aloud.' },
  { id: ACT.practice, section: 'Practice', title: 'Producing your own sentences',
    goals: ['Make four sentences using these patterns.'],
    task: 'Describe four things in your room using "too", "about", "like", and "seem".' },
];

const lesson = {
  title: 'Level 3 · Comparison & Resemblance (너무 / -쯤·정도·약 / 같다 / -것 같아요)',
  category: 'daily-life', difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'softening-statement', label: 'Softening a statement', goal: 'Use -(으)ㄴ/는/(으)ㄹ 것 같아요 to soften a guess or opinion.' },
  ],
  relatedPools: ['pos-adverbs-1', 'pos-adjectives-1'],
  content: [
    createContentItem('너무', 'neomu', 'too / very (excessive)', 'word', '너무 매워요.', 'It is too spicy.', null, [ACT.pattern]),
    createContentItem('-쯤', '-jjeum', 'about / approximately (after a number)', 'word', '3시쯤 만나요.', 'Let us meet around 3.', null, [ACT.pattern]),
    createContentItem('정도', 'jeongdo', 'about / extent', 'word', '한 시간 정도 걸려요.', 'It takes about an hour.', null, [ACT.pattern]),
    createContentItem('약', 'yak', 'about / approximately (before a number)', 'word', '약 5만 원이에요.', 'It is about 50,000 won.', null, [ACT.pattern]),
    createContentItem('N 같다', 'N gatda', 'to be like N (with a noun)', 'word', '꿈 같아요.', 'It is like a dream.', null, [ACT.pattern]),
    createContentItem('-(으)ㄴ/는 것 같아요', '-(eu)n / neun geot gatayo', 'seems / looks like (with verbs/adjs)', 'word', '비가 오는 것 같아요.', 'It seems to be raining.', null, [ACT.pattern]),

    createContentItem(
      '오늘 너무 더워요.', 'oneul neomu deowoyo.',
      'It is too hot today.', 'sentence',
      '오늘 너무 더워요. 에어컨을 켜야겠어요.',
      'It is too hot today. I should turn on the AC.',
      [{ korean: '너무', english: 'too / excessive' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '학교까지 30분쯤 걸려요.', 'hakgyokkaji samsippunjjeum geollyeoyo.',
      'It takes about 30 minutes to school.', 'sentence',
      '학교까지 30분쯤 걸려요. 버스로요.',
      'It takes about 30 minutes to school. By bus.',
      [{ korean: '-쯤', english: 'about / approximately' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '제 동생은 가수 같아요.', 'je dongsaengeun gasu gatayo.',
      'My younger sibling is like a singer.', 'sentence',
      '제 동생은 가수 같아요. 노래를 정말 잘해요.',
      'My younger sibling is like a singer. They really sing well.',
      [{ korean: 'N 같다', english: 'to be like N' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '저 사람은 한국 사람인 것 같아요.', 'jeo sarameun hanguk saramin geot gatayo.',
      'That person seems to be Korean.', 'sentence',
      '저 사람은 한국 사람인 것 같아요. 발음이 정말 자연스러워요.',
      'That person seems to be Korean. Their pronunciation is really natural.',
      [{ korean: '-(으)ㄴ 것 같다', english: 'seems / looks like' }],
      [ACT.examples, ACT.practice],
    ),
  ],
};

module.exports = lesson;
