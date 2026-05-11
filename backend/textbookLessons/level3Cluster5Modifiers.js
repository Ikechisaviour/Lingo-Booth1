// Level 3 Cluster — Noun-modifying verbs/adjectives
// Source: TTMIK Workbook Level 3, Lessons 13, 14.
// Patterns: adjectives + -(으)ㄴ + 명사, action verbs + -는 + 명사.

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
  pattern: 'l3c5-pattern',
  examples: 'l3c5-examples',
  practice: 'l3c5-practice',
};

const activities = [
  { id: ACT.pattern, section: 'Pattern', title: 'Making noun-modifiers',
    goals: ['Adjective stem + -(으)ㄴ + N (descriptive).', 'Action verb stem + -는 + N (current action).'],
    task: 'Convert three adjectives and three verbs into modifying forms.' },
  { id: ACT.examples, section: 'Examples', title: 'Examples in context',
    goals: ['See descriptive and action modifiers in real sentences.'],
    task: 'Identify which type each modifier is.' },
  { id: ACT.practice, section: 'Practice', title: 'Producing your own',
    goals: ['Describe three things using these modifiers.'],
    task: 'Describe a person, a place, and an action using -(으)ㄴ + N or -는 + N.' },
];

const lesson = {
  title: 'Level 3 · Modifiers (-(으)ㄴ + N for adjectives, -는 + N for verbs)',
  category: 'daily-life', difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'building-modifiers', label: 'Building noun modifiers', goal: 'Convert a verb or adjective into the right modifying form.' },
  ],
  relatedPools: ['pos-adjectives-1', 'pos-verbs-1'],
  content: [
    createContentItem('A-(으)ㄴ + N', 'A-(eu)n + N', 'a [adjective] N (descriptive modifier)', 'word', '예쁜 꽃', 'a pretty flower', null, [ACT.pattern]),
    createContentItem('V-는 + N', 'V-neun + N', 'a [V-ing] N (currently happening)', 'word', '공부하는 학생', 'a student who is studying', null, [ACT.pattern]),
    createContentItem('V-(으)ㄴ + N', 'V-(eu)n + N', 'a [V-ed] N (past action / done thing)', 'word', '먹은 음식', 'food that I ate', null, [ACT.pattern]),
    createContentItem('V-(으)ㄹ + N', 'V-(eu)l + N', 'a N to be V-ed (future / yet to be)', 'word', '읽을 책', 'a book to read', null, [ACT.pattern]),

    createContentItem(
      '재미있는 영화를 봤어요.', 'jaemiitneun yeonghwareul bwasseoyo.',
      'I watched an interesting movie.', 'sentence',
      '어제 재미있는 영화를 봤어요. 정말 추천해요.',
      'I watched an interesting movie yesterday. I really recommend it.',
      [{ korean: '재미있는', english: 'interesting (V-는 because 있다 is treated as a verb)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '예쁜 옷을 샀어요.', 'yeppeun oseul sasseoyo.',
      'I bought a pretty dress.', 'sentence',
      '주말에 예쁜 옷을 샀어요. 다음 주에 입을 거예요.',
      'I bought a pretty dress on the weekend. I will wear it next week.',
      [{ korean: '예쁜', english: 'pretty (descriptive A-(으)ㄴ + N)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '한국어를 가르치는 선생님이 친절해요.', 'hangugeoreul gareuchineun seonsaengnimi chinjeolhaeyo.',
      'The teacher who teaches Korean is kind.', 'sentence',
      '한국어를 가르치는 선생님이 친절해요. 수업이 재미있어요.',
      'The teacher who teaches Korean is kind. The class is fun.',
      [{ korean: '가르치는', english: 'who teaches (V-는 + N)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '어제 만난 친구는 외국인이에요.', 'eoje mannan chinguneun oeguginieyo.',
      'The friend I met yesterday is a foreigner.', 'sentence',
      '어제 만난 친구는 외국인이에요. 한국어를 정말 잘해요.',
      'The friend I met yesterday is a foreigner. They speak Korean really well.',
      [{ korean: '만난', english: 'whom I met (V-(으)ㄴ + N, past)' }],
      [ACT.examples, ACT.practice],
    ),
  ],
};

module.exports = lesson;
