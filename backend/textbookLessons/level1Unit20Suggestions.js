// Level 1 Unit 20 — Suggestions & plans
// Source: Book 1B·16 (같이 영화 보러 갈까요?)
// Functions: making suggestions, agreeing, planning a movie/cafe outing.

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
  vocabulary: 'l1u20-vocabulary',
  grammar: 'l1u20-grammar',
  speaking: 'l1u20-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Movie & cafe outings',
    goals: ['Name leisure activities.', 'Use 표, 매표소, 약속.'],
    task: 'Make a list of three weekend activities you would suggest.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-(으)러 가다 + V-(으)ㄹ까요? + V-(으)ㄹ래요?',
    goals: [
      'Suggest with V-(으)ㄹ까요? (formal-leaning).',
      'Ask informally with V-(으)ㄹ래요?.',
      'State purpose with V-(으)러 가다.',
    ],
    task: 'Make one suggestion using V-(으)ㄹ까요? and one using V-(으)ㄹ래요?.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Planning to see a movie together',
    goals: ['Pick a movie and a time.', 'Confirm meeting place.'],
    task: 'Roleplay planning a Friday-evening movie with a classmate.',
  },
];

const lesson = {
  title: '레벨 1 · 20과: 같이 영화 보러 갈까요? (Suggestions and Plans)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'making-suggestion', label: 'Making a suggestion', goal: 'Use V-(으)ㄹ까요? to invite someone to do something together.' },
    { id: 'agreeing-counter', label: 'Agreeing or proposing an alternative', goal: 'Respond to a suggestion with 좋아요 or with a counter-proposal.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('영화', 'yeonghwa', 'movie', 'word', '영화를 봐요.', 'I watch a movie.', null, [ACT.vocabulary]),
    createContentItem('영화관', 'yeonghwagwan', 'movie theater', 'word', '영화관에 가요.', 'I go to the movie theater.', null, [ACT.vocabulary]),
    createContentItem('표', 'pyo', 'ticket', 'word', '영화 표 두 장 주세요.', 'Two movie tickets please.', null, [ACT.vocabulary]),
    createContentItem('매표소', 'maepyoso', 'ticket office', 'word', '매표소에서 표를 사요.', 'I buy tickets at the ticket office.', null, [ACT.vocabulary]),
    createContentItem('보러 가다', 'boreo gada', 'to go in order to see', 'word', '영화 보러 가요.', 'I am going to see a movie.', null, [ACT.vocabulary]),
    createContentItem('만나다', 'mannada', 'to meet', 'word', '6시에 만나요.', 'Let us meet at 6.', null, [ACT.vocabulary]),
    createContentItem('기다리다', 'gidarida', 'to wait', 'word', '입구에서 기다릴게요.', 'I will wait at the entrance.', null, [ACT.vocabulary]),
    createContentItem('약속', 'yaksok', 'plan / appointment', 'word', '약속을 정해요.', 'Let us set a plan.', null, [ACT.vocabulary]),
    createContentItem('재미있다', 'jaemiitda', 'to be fun', 'word', '그 영화가 재미있어요.', 'That movie is fun.', null, [ACT.vocabulary]),
    createContentItem('어떤', 'eotteon', 'what kind of / which', 'word', '어떤 영화 좋아해요?', 'What kind of movies do you like?', null, [ACT.vocabulary]),
    createContentItem('한국 영화', 'hanguk yeonghwa', 'Korean movie', 'word', '한국 영화 보러 갈까요?', 'Shall we go see a Korean movie?', null, [ACT.vocabulary]),
    createContentItem('액션', 'aeksyeon', 'action (genre)', 'word', '액션 영화를 좋아해요.', 'I like action movies.', null, [ACT.vocabulary]),
    createContentItem('로맨스', 'romaenseu', 'romance (genre)', 'word', '로맨스 영화 어때요?', 'How about a romance?', null, [ACT.vocabulary]),

    createContentItem(
      '같이 영화 보러 갈까요?', 'gachi yeonghwa boreo galkkayo?',
      'Shall we go see a movie together?', 'sentence',
      '주말에 같이 영화 보러 갈까요? 좋은 영화가 많아요.',
      'Shall we go see a movie together this weekend? There are many good ones.',
      [
        { korean: '같이', english: 'together' },
        { korean: '보러 가다', english: 'go in order to see (V-(으)러 가다)' },
        { korean: '갈까요?', english: 'shall we go? (V-(으)ㄹ까요?)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '내일 카페에 갈래요?', 'naeil kapee gallaeyo?',
      'Wanna go to a cafe tomorrow? (informal)', 'sentence',
      '내일 카페에 갈래요? 새로 생긴 곳이 있어요.',
      'Wanna go to a cafe tomorrow? There is a new place.',
      [
        { korean: '갈래요?', english: 'wanna go? (V-(으)ㄹ래요? more casual)' },
        { korean: '새로 생긴 곳', english: 'a newly-opened place' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '좋아요. 몇 시에 만날까요?', 'joayo. myeot sie mannalkkayo?',
      'Sounds good. What time shall we meet?', 'sentence',
      '좋아요. 몇 시에 만날까요? 영화관 앞에서요.',
      'Sounds good. What time shall we meet? In front of the theater.',
      [
        { korean: '좋아요', english: 'sounds good' },
        { korean: '몇 시에', english: 'at what time' },
        { korean: '만날까요?', english: 'shall we meet?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '영화관 입구에서 만나요.', 'yeonghwagwan ipguesseo mannayo.',
      'Let us meet at the theater entrance.', 'sentence',
      '영화관 입구에서 만나요. 표는 미리 살게요.',
      'Let us meet at the theater entrance. I will buy the tickets in advance.',
      [
        { korean: '입구에서', english: 'at the entrance' },
        { korean: '미리', english: 'in advance' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '영화 약속 잡기', 'yeonghwa yaksok japgi',
      'Setting up a movie plan', 'conversation',
      'A: 사라 씨, 금요일 저녁에 시간 있어요?\nB: 네, 있어요. 왜요?\nA: 같이 영화 보러 갈까요? 새로 나온 한국 영화가 좋대요.\nB: 좋아요. 어떤 영화예요?\nA: 액션이에요. 7시 30분 표가 있어요.\nB: 7시 반이요? 좋아요. 영화관 입구에서 만날까요?\nA: 네. 7시 15분쯤에 봐요.',
      'A: Sarah, are you free Friday evening?\nB: Yes. Why?\nA: Want to see a movie together? They say a new Korean movie is good.\nB: Sure. What movie?\nA: It is action. There are 7:30 tickets.\nB: 7:30? Sounds good. Shall we meet at the theater entrance?\nA: Yes. See you around 7:15.',
      [
        { korean: '~대요', english: 'they say (hearsay)' },
        { korean: '몇 시에 만날까요?', english: 'what time shall we meet?' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
