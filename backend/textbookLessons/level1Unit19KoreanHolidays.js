// Level 1 Unit 19 — Korean holidays
// Source: Book 1A·15 (송편을 빚을 거야)
// Functions: talking about Chuseok and Seollal, family customs, food.

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
  vocabulary: 'l1u19-vocabulary',
  grammar: 'l1u19-grammar',
  speaking: 'l1u19-speaking',
  culture: 'l1u19-culture',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Holidays, foods, and customs',
    goals: ['Name 추석, 설날, 한복, 송편, 떡국, 차례.'],
    task: 'Pick a Korean holiday and name three things people do.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-(으)면서 + V-(으)ㄹ 거예요 (intent) + N의 N',
    goals: [
      'Connect simultaneous actions with V-(으)면서.',
      'Use V-(으)ㄹ 거예요 for plans on a special day.',
      'Use N의 N for possessive in family-relation phrases.',
    ],
    task: 'Make two sentences combining what you will eat and what you will do during Chuseok.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Comparing your holidays with Korean ones',
    goals: ['Describe a holiday from your country.', 'Ask about Korean traditions.'],
    task: 'Tell the tutor about a holiday you celebrate and ask one question about Chuseok.',
  },
  {
    id: ACT.culture, section: 'Culture Note',
    title: 'Chuseok (추석) — Korean Thanksgiving',
    goals: ['Understand 추석 traditions: family visits, 차례, 송편, 한복.'],
    task: 'Summarize one Chuseok custom in two sentences.',
  },
];

const lesson = {
  title: '레벨 1 · 19과: 송편을 빚을 거예요 (Korean Holidays)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-holiday-plans', label: 'Describing holiday plans', goal: 'Use V-(으)ㄹ 거예요 + 명절 vocabulary to share plans.' },
    { id: 'comparing-cultures', label: 'Comparing your culture with Korean traditions', goal: 'Compare one tradition from your country with a Korean holiday custom.' },
  ],
  relatedPools: ['topic-culture'],
  content: [
    createContentItem('명절', 'myeongjeol', 'traditional holiday', 'word', '한국에는 큰 명절이 두 개 있어요.', 'Korea has two big holidays.', null, [ACT.vocabulary]),
    createContentItem('추석', 'chuseok', 'Chuseok (Korean harvest festival)', 'word', '추석은 음력 8월 15일이에요.', 'Chuseok is the 15th day of the 8th lunar month.', null, [ACT.vocabulary]),
    createContentItem('설날', 'seollal', 'Lunar New Year', 'word', '설날에는 떡국을 먹어요.', 'On Seollal, people eat tteokguk.', null, [ACT.vocabulary]),
    createContentItem('송편', 'songpyeon', 'songpyeon (Chuseok rice cake)', 'word', '송편은 추석 음식이에요.', 'Songpyeon is a Chuseok food.', null, [ACT.vocabulary]),
    createContentItem('떡국', 'tteokguk', 'rice-cake soup (eaten on Seollal)', 'word', '설날에 떡국을 먹어요.', 'On Seollal, people eat tteokguk.', null, [ACT.vocabulary]),
    createContentItem('한복', 'hanbok', 'hanbok (traditional Korean clothing)', 'word', '명절에 한복을 입어요.', 'On holidays, people wear hanbok.', null, [ACT.vocabulary]),
    createContentItem('차례', 'charye', 'ancestral memorial rite', 'word', '아침에 차례를 지내요.', 'In the morning we hold the memorial rite.', null, [ACT.vocabulary]),
    createContentItem('성묘', 'seongmyo', 'visiting ancestors\' graves', 'word', '추석에 성묘를 가요.', 'We visit graves on Chuseok.', null, [ACT.vocabulary]),
    createContentItem('세배', 'sebae', 'New Year\'s bow (to elders)', 'word', '설날에 세배를 해요.', 'On Seollal, we do sebae.', null, [ACT.vocabulary]),
    createContentItem('가족', 'gajok', 'family', 'word', '명절에 가족이 모여요.', 'Family gathers on holidays.', null, [ACT.vocabulary]),
    createContentItem('친척', 'chincheok', 'relatives', 'word', '친척들이 모여요.', 'The relatives gather.', null, [ACT.vocabulary]),
    createContentItem('빚다', 'bitda', 'to shape / mold (rice cakes, dumplings)', 'word', '송편을 빚어요.', 'I shape songpyeon.', null, [ACT.vocabulary]),
    createContentItem('모이다', 'moida', 'to gather', 'word', '가족이 다 모여요.', 'The whole family gathers.', null, [ACT.vocabulary]),
    createContentItem('인사', 'insa', 'greeting', 'word', '인사를 드려요.', 'I give a greeting (to elders).', null, [ACT.vocabulary]),

    createContentItem(
      '추석에 송편을 빚을 거예요.', 'chuseoge songpyeoneul bijeul geoyeyo.',
      'I will make songpyeon for Chuseok.', 'sentence',
      '추석에 송편을 빚을 거예요. 가족과 같이요.',
      'I will make songpyeon for Chuseok. With my family.',
      [
        { korean: '추석에', english: 'on Chuseok' },
        { korean: '빚을 거예요', english: 'will shape (V-(으)ㄹ 거예요)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '음악을 들으면서 송편을 빚어요.', 'eumageul deureumyeonseo songpyeoneul bijeoyo.',
      'I shape songpyeon while listening to music.', 'sentence',
      '음악을 들으면서 송편을 빚어요. 시간이 빨리 가요.',
      'I shape songpyeon while listening to music. Time goes quickly.',
      [
        { korean: '들으면서', english: 'while listening (V-(으)면서)' },
        { korean: '시간이 빨리 가요', english: 'time passes quickly' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '할머니의 집에 가요.', 'halmeoniui jibe gayo.',
      'I go to grandmother\'s house.', 'sentence',
      '추석에 할머니의 집에 가요. 친척이 다 모여요.',
      'On Chuseok I go to grandmother\'s house. All the relatives gather.',
      [
        { korean: '할머니의 집', english: 'grandmother\'s house (의 = possessive)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '설날에 떡국을 먹으면 한 살 더 먹어요.', 'seollare tteokgugeul meogeumyeon han sal deo meogeoyo.',
      'On Seollal, when you eat tteokguk, you become one year older.', 'sentence',
      '설날에 떡국을 먹으면 한 살 더 먹어요. 한국의 재미있는 표현이에요.',
      'On Seollal, when you eat tteokguk, you become one year older. It is a fun Korean expression.',
      [
        { korean: '~으면', english: 'when / if' },
        { korean: '한 살 더 먹어요', english: 'become one year older' },
      ],
      [ACT.grammar, ACT.culture],
    ),

    createContentItem(
      '추석 계획', 'chuseok gyehoek',
      'Chuseok plans', 'conversation',
      'A: 추석에 뭐 할 거예요?\nB: 가족과 할머니 댁에 갈 거예요. 차례를 지내고 송편을 빚을 거예요.\nA: 한복도 입어요?\nB: 네, 어릴 때부터 입어요. 사라 씨는 추석을 알아요?\nA: 조금 알아요. 그런데 송편은 안 먹어 봤어요.\nB: 그러면 우리 집에 와요. 같이 빚어 봐요.\nA: 정말요? 좋아요!',
      'A: What will you do on Chuseok?\nB: I will go to grandmother\'s house with my family. We will hold the memorial rite and make songpyeon.\nA: Do you wear hanbok too?\nB: Yes, I have worn it since I was little. Sarah, do you know about Chuseok?\nA: A little. But I have never eaten songpyeon.\nB: Then come to my house. Let us shape some together.\nA: Really? Sounds great!',
      [
        { korean: '할머니 댁', english: 'grandmother\'s house (honorific)' },
        { korean: '어릴 때부터', english: 'since I was little' },
        { korean: '안 먹어 봤어요', english: 'I have never tried eating it' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
