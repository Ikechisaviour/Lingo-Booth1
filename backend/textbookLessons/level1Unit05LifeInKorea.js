// Level 1 Unit 5 — Life in Korea & first impressions
// Source: Book 1B·5 (한국 생활이 어때요?)
// Functions: sharing opinions about life in Korea, asking 어때요?

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
  vocabulary: 'l1u5-vocabulary',
  grammar: 'l1u5-grammar',
  speaking: 'l1u5-speaking',
  culture: 'l1u5-culture',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Adjectives for opinions',
    goals: ['Learn descriptive adjectives for places, food, and people.'],
    task: 'Pick three adjectives and use each one in a short sentence about Korea.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'N이/가 어때요? + adjective -아/어요 + 좋아하다',
    goals: [
      'Ask 어때요? to invite an opinion.',
      'Conjugate adjectives in polite -아/어요.',
      'Use 좋아하다 to say what you like.',
    ],
    task: 'Answer 한국 생활이 어때요? in three sentences.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Sharing first impressions of Korea',
    goals: ['Trade opinions about Korean food, weather, and people.'],
    task: 'Tell the tutor one thing you like and one thing that is hard about life in Korea.',
  },
  {
    id: ACT.culture, section: 'Culture Note',
    title: 'Polite vs formal speech (-요 vs -ㅂ/습니다)',
    goals: ['Recognize when -요 (polite) vs -ㅂ/습니다 (formal) is appropriate.'],
    task: 'Identify which form fits a job interview and which fits a chat with a classmate.',
  },
];

const lesson = {
  title: '레벨 1 · 5과: 한국 생활이 어때요? (Life in Korea)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'sharing-opinion', label: 'Sharing opinions', goal: 'Use adjective -아/어요 to share a short opinion.' },
    { id: 'asking-how-is', label: 'Asking how something is', goal: 'Use N이/가 어때요? to invite an opinion from someone.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // Vocabulary
    createContentItem('한국 생활', 'hanguk saenghwal', 'life in Korea', 'word', '한국 생활이 재미있어요.', 'Life in Korea is fun.', null, [ACT.vocabulary]),
    createContentItem('음식', 'eumsik', 'food', 'word', '한국 음식이 맛있어요.', 'Korean food is delicious.', null, [ACT.vocabulary]),
    createContentItem('날씨', 'nalssi', 'weather', 'word', '오늘 날씨가 좋아요.', 'The weather is nice today.', null, [ACT.vocabulary]),
    createContentItem('사람들', 'saramdeul', 'people', 'word', '한국 사람들이 친절해요.', 'Korean people are kind.', null, [ACT.vocabulary]),
    createContentItem('재미있다', 'jaemiitda', 'to be fun / interesting', 'word', '한국어 공부가 재미있어요.', 'Studying Korean is fun.', null, [ACT.vocabulary]),
    createContentItem('재미없다', 'jaemieopda', 'to be boring', 'word', '그 영화는 재미없어요.', 'That movie is boring.', null, [ACT.vocabulary]),
    createContentItem('맛있다', 'masitda', 'to be delicious', 'word', '김치찌개가 맛있어요.', 'Kimchi stew is delicious.', null, [ACT.vocabulary]),
    createContentItem('맛없다', 'maseopda', 'to taste bad', 'word', '이 음식은 좀 맛없어요.', 'This food does not taste good.', null, [ACT.vocabulary]),
    createContentItem('맵다', 'maepda', 'to be spicy', 'word', '한국 음식은 좀 매워요.', 'Korean food is a bit spicy.', null, [ACT.vocabulary]),
    createContentItem('어렵다', 'eoryeopda', 'to be difficult', 'word', '한국어 문법이 좀 어려워요.', 'Korean grammar is a bit difficult.', null, [ACT.vocabulary]),
    createContentItem('쉽다', 'swipda', 'to be easy', 'word', '이 문제는 쉬워요.', 'This problem is easy.', null, [ACT.vocabulary]),
    createContentItem('친절하다', 'chinjeolhada', 'to be kind', 'word', '교수님이 친절하세요.', 'The professor is kind.', null, [ACT.vocabulary]),
    createContentItem('바쁘다', 'bappeuda', 'to be busy', 'word', '요즘 너무 바빠요.', 'I am very busy these days.', null, [ACT.vocabulary]),

    // Grammar
    createContentItem(
      '한국 생활이 어때요?', 'hanguk saenghwari eottaeyo?', 'How is life in Korea?', 'sentence',
      '한국 생활이 어때요? — 정말 재미있어요.', 'How is life in Korea? — It is really fun.',
      [
        { korean: '한국 생활이', english: 'life in Korea + subject' },
        { korean: '어때요?', english: 'how is it? (polite, asks an opinion)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '한국 음식은 맛있어요.', 'hanguk eumsigeun masisseoyo.', 'Korean food is delicious.', 'sentence',
      '한국 음식은 맛있어요. 그런데 좀 매워요.', 'Korean food is delicious. But it is a bit spicy.',
      [
        { korean: '한국 음식은', english: 'Korean food (topic)' },
        { korean: '맛있어요', english: 'is delicious (adjective + 어요)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '저는 김치찌개를 좋아해요.', 'jeoneun gimchijjigaereul joahaeyo.', 'I like kimchi stew.', 'sentence',
      '저는 김치찌개를 좋아해요. 매일 먹고 싶어요.', 'I like kimchi stew. I want to eat it every day.',
      [
        { korean: '저는', english: 'I (topic)' },
        { korean: '김치찌개를', english: 'kimchi stew + object' },
        { korean: '좋아해요', english: 'like (verb form, takes object)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한국어 공부가 어렵습니다.', 'hangugeo gongbuga eoryeopseumnida.', 'Studying Korean is difficult. (formal)', 'sentence',
      '한국어 공부가 어렵습니다. 그런데 재미있습니다.', 'Studying Korean is difficult. But it is fun.',
      [
        { korean: '한국어 공부가', english: 'studying Korean (subject)' },
        { korean: '어렵습니다', english: 'is difficult (formal -ㅂ/습니다)' },
      ],
      [ACT.grammar, ACT.culture],
    ),

    // Speaking
    createContentItem(
      '한국 생활이 어때요?', 'hanguk saenghwari eottaeyo?',
      'How is life in Korea? (longer dialogue)', 'conversation',
      'A: 한국 생활이 어때요?\nB: 정말 재미있어요. 사람들도 친절해요.\nA: 음식은요?\nB: 음식은 맛있어요. 그런데 좀 매워요.\nA: 한국어 공부도 해요?\nB: 네. 좀 어려워요. 그래도 재미있어요.',
      'A: How is life in Korea?\nB: It is really fun. People are also kind.\nA: How about the food?\nB: The food is delicious. But it is a bit spicy.\nA: Are you studying Korean too?\nB: Yes. It is a bit difficult. But it is still fun.',
      [
        { korean: '~은요?', english: 'and ~? (asking the same about a new topic)' },
        { korean: '그런데', english: 'but / however' },
        { korean: '그래도', english: 'still / even so' },
      ],
      [ACT.speaking],
    ),

    // Culture
    createContentItem(
      '한국에서는 처음 만난 사람에게 -ㅂ/습니다 형식을 자주 써요.',
      'hangugeseoneun cheoeum mannan saramege -mnida hyeongsigeul jaju sseoyo.',
      'In Korea, people often use -ㅂ/습니다 forms with someone they have just met.', 'sentence',
      '한국에서는 처음 만난 사람에게 -ㅂ/습니다 형식을 자주 써요. 친해지면 -아/어요로 바꿔요.',
      'In Korea, people often use -ㅂ/습니다 forms with someone they have just met. Once you become close, you switch to -아/어요.',
      [
        { korean: '처음 만난 사람', english: 'someone you have just met' },
        { korean: '~ 형식을 써요', english: 'use ~ form' },
        { korean: '친해지면', english: 'once you become close' },
      ],
      [ACT.culture],
    ),
  ],
};

module.exports = lesson;
