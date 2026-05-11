// Level 1 Unit 10 — Weather & preferences
// Source: Book 1A·10 (여름은 더워서 안 좋아해요)
// Functions: describing weather, expressing preference and reason.

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
  vocabulary: 'l1u10-vocabulary',
  grammar: 'l1u10-grammar',
  speaking: 'l1u10-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Weather words and the four seasons',
    goals: ['Name the four seasons and common weather conditions.'],
    task: 'Describe today\'s weather in two short sentences.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V/A-아/어서 (cause) + 좋아하다/싫어하다',
    goals: [
      'Connect cause and effect with V/A-아/어서 ("because").',
      'Express like and dislike with 좋아하다 / 싫어하다.',
      'Ask 어떤 + N 좋아해요? to invite a preference.',
    ],
    task: 'Say which season you like best and one reason why, using -아/어서.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Trading season preferences',
    goals: ['Compare seasons.', 'Give a reason for liking or disliking a season.'],
    task: 'Tell the tutor your favorite season in Korea and why.',
  },
];

const lesson = {
  title: '레벨 1 · 10과: 여름은 더워서 안 좋아해요 (Weather and Preferences)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-weather', label: 'Describing the weather', goal: 'Use weather adjectives + -아/어요 to describe a day.' },
    { id: 'sharing-preference', label: 'Sharing a preference with a reason', goal: 'Use -아/어서 + 좋아하다/싫어하다 to give a reasoned preference.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('봄', 'bom', 'spring', 'word', '봄에 꽃이 피어요.', 'Flowers bloom in spring.', null, [ACT.vocabulary]),
    createContentItem('여름', 'yeoreum', 'summer', 'word', '여름은 더워요.', 'Summer is hot.', null, [ACT.vocabulary]),
    createContentItem('가을', 'gaeul', 'autumn / fall', 'word', '가을에 단풍이 들어요.', 'Leaves turn color in autumn.', null, [ACT.vocabulary]),
    createContentItem('겨울', 'gyeoul', 'winter', 'word', '겨울은 추워요.', 'Winter is cold.', null, [ACT.vocabulary]),
    createContentItem('덥다', 'deopda', 'to be hot', 'word', '오늘 너무 더워요.', 'It is very hot today.', null, [ACT.vocabulary]),
    createContentItem('춥다', 'chupda', 'to be cold', 'word', '겨울에는 정말 춥습니다.', 'It is really cold in winter.', null, [ACT.vocabulary]),
    createContentItem('따뜻하다', 'ttatteuthada', 'to be warm', 'word', '봄은 따뜻해요.', 'Spring is warm.', null, [ACT.vocabulary]),
    createContentItem('시원하다', 'siwonhada', 'to be cool / refreshing', 'word', '가을은 시원해요.', 'Autumn is cool.', null, [ACT.vocabulary]),
    createContentItem('비', 'bi', 'rain', 'word', '비가 와요.', 'It is raining.', null, [ACT.vocabulary]),
    createContentItem('눈', 'nun', 'snow / eye', 'word', '겨울에 눈이 와요.', 'It snows in winter.', null, [ACT.vocabulary]),
    createContentItem('바람', 'baram', 'wind', 'word', '오늘 바람이 많이 불어요.', 'It is very windy today.', null, [ACT.vocabulary]),
    createContentItem('맑다', 'makda', 'to be sunny / clear', 'word', '하늘이 맑아요.', 'The sky is clear.', null, [ACT.vocabulary]),
    createContentItem('흐리다', 'heurida', 'to be cloudy', 'word', '오늘은 흐려요.', 'It is cloudy today.', null, [ACT.vocabulary]),
    createContentItem('좋아하다', 'joahada', 'to like', 'word', '저는 봄을 좋아해요.', 'I like spring.', null, [ACT.vocabulary]),
    createContentItem('싫어하다', 'sireohada', 'to dislike', 'word', '여름을 싫어해요.', 'I dislike summer.', null, [ACT.vocabulary]),

    createContentItem(
      '여름은 더워서 안 좋아해요.', 'yeoreumeun deowoseo an joahaeyo.',
      'I do not like summer because it is hot.', 'sentence',
      '여름은 더워서 안 좋아해요. 가을이 제일 좋아요.',
      'I do not like summer because it is hot. I like autumn the best.',
      [
        { korean: '여름은', english: 'summer (topic)' },
        { korean: '더워서', english: 'because it is hot (V/A-아/어서)' },
        { korean: '안 좋아해요', english: 'do not like' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '봄이 따뜻해서 좋아요.', 'bomi ttatteuthaeseo joayo.',
      'I like spring because it is warm.', 'sentence',
      '봄이 따뜻해서 좋아요. 꽃도 예뻐요.',
      'I like spring because it is warm. The flowers are pretty too.',
      [
        { korean: '봄이', english: 'spring (subject)' },
        { korean: '따뜻해서', english: 'because it is warm' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '오늘 비가 와서 집에 있어요.', 'oneul biga waseo jibe isseoyo.',
      'It is raining today, so I am staying home.', 'sentence',
      '오늘 비가 와서 집에 있어요. 영화를 봐요.',
      'It is raining today, so I am staying home. I am watching a movie.',
      [
        { korean: '비가 와서', english: 'because it is raining' },
        { korean: '집에 있어요', english: 'I am at home' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '어떤 계절을 좋아해요?', 'eotteon gyejeoreul joahaeyo?',
      'Which season do you like?', 'sentence',
      '어떤 계절을 좋아해요? — 저는 가을을 좋아해요.',
      'Which season do you like? — I like autumn.',
      [
        { korean: '어떤 계절', english: 'which season' },
        { korean: '좋아해요?', english: 'do you like?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '한국의 사계절', 'hangugui sagyejeol',
      'Talking about seasons in Korea', 'conversation',
      'A: 한국의 사계절 중에 어떤 계절을 좋아해요?\nB: 저는 가을을 제일 좋아해요. 시원하고 단풍도 예뻐요.\nA: 여름은요?\nB: 여름은 너무 더워서 별로예요. 사라 씨는요?\nA: 저는 겨울이 좋아요. 눈을 좋아해서요.\nB: 아, 외국에서는 눈이 자주 와요?\nA: 네. 겨울이 정말 길어요.',
      'A: Among Korea\'s four seasons, which do you like?\nB: I like autumn the best. It is cool and the autumn leaves are pretty.\nA: How about summer?\nB: Summer is too hot, so it is not great. How about you, Sarah?\nA: I like winter. Because I like snow.\nB: Oh, does it snow often in your country?\nA: Yes. Winter is really long.',
      [
        { korean: '사계절', english: 'four seasons' },
        { korean: '제일 좋아해요', english: 'I like the most' },
        { korean: '별로예요', english: 'is not great' },
        { korean: '눈을 좋아해서요', english: 'because I like snow' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
