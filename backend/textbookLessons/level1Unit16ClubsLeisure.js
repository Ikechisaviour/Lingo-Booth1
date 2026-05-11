// Level 1 Unit 16 — Clubs & leisure
// Source: Book 1A·14 (재미있고 좋은 동아리가 많아)
// Functions: introducing a club, talking about hobbies, joining activities.

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
  vocabulary: 'l1u16-vocabulary',
  grammar: 'l1u16-grammar',
  speaking: 'l1u16-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Clubs, hobbies, and activities',
    goals: ['Name club types and leisure activities.', 'Use 동아리, 가입하다, 활동.'],
    task: 'Pick three clubs you would like to join and say why.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V/A-고 (and) + V/A-지만 (but) + V-지 못하다',
    goals: [
      'Connect two clauses with V/A-고 (and).',
      'Contrast clauses with V/A-지만 (but).',
      'Negate ability with V-지 못하다 (cannot).',
    ],
    task: 'Describe a club using both -고 and -지만 in one sentence.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Joining a club',
    goals: ['Ask about clubs.', 'Introduce a club to a friend.'],
    task: 'Tell the tutor about a club at Kumoh National Institute of Technology you would join.',
  },
];

const lesson = {
  title: '레벨 1 · 16과: 재미있고 좋은 동아리가 많아요 (Clubs and Leisure)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'introducing-club', label: 'Introducing a club', goal: 'Use V/A-고 to combine two positive descriptions of a club.' },
    { id: 'sharing-hobby', label: 'Sharing a hobby', goal: 'State your hobby and one thing you do well or cannot do.' },
  ],
  relatedPools: ['topic-school', 'topic-people'],
  content: [
    createContentItem('동아리', 'dongari', 'club (school club)', 'word', '동아리에 가입했어요.', 'I joined a club.', null, [ACT.vocabulary]),
    createContentItem('가입하다', 'gaiphada', 'to join / sign up', 'word', '음악 동아리에 가입할 거예요.', 'I will join the music club.', null, [ACT.vocabulary]),
    createContentItem('활동', 'hwaldong', 'activity', 'word', '활동이 많아요.', 'There are many activities.', null, [ACT.vocabulary]),
    createContentItem('회원', 'hoewon', 'member', 'word', '회원이 30명이에요.', 'There are 30 members.', null, [ACT.vocabulary]),
    createContentItem('모임', 'moim', 'gathering / meeting', 'word', '매주 토요일에 모임이 있어요.', 'There is a meeting every Saturday.', null, [ACT.vocabulary]),
    createContentItem('취미', 'chwimi', 'hobby', 'word', '취미가 뭐예요?', 'What is your hobby?', null, [ACT.vocabulary]),
    createContentItem('음악', 'eumak', 'music', 'word', '음악 동아리가 인기 많아요.', 'The music club is popular.', null, [ACT.vocabulary]),
    createContentItem('춤', 'chum', 'dance', 'word', '춤 동아리도 있어요.', 'There is also a dance club.', null, [ACT.vocabulary]),
    createContentItem('그림', 'geurim', 'drawing / picture', 'word', '그림을 그려요.', 'I draw pictures.', null, [ACT.vocabulary]),
    createContentItem('운동', 'undong', 'exercise / sports', 'word', '운동 동아리가 재미있어요.', 'Sports clubs are fun.', null, [ACT.vocabulary]),
    createContentItem('봉사', 'bongsa', 'volunteering', 'word', '봉사 활동도 해요.', 'We also do volunteer work.', null, [ACT.vocabulary]),
    createContentItem('축구', 'chukgu', 'soccer', 'word', '축구 동아리에 가입했어요.', 'I joined the soccer club.', null, [ACT.vocabulary]),
    createContentItem('농구', 'nonggu', 'basketball', 'word', '농구를 좋아해요.', 'I like basketball.', null, [ACT.vocabulary]),
    createContentItem('인기 있다', 'ingi itda', 'to be popular', 'word', '이 동아리는 인기 있어요.', 'This club is popular.', null, [ACT.vocabulary]),

    createContentItem(
      '음악 동아리는 재미있고 좋아요.', 'eumak dongarineun jaemiitgo joayo.',
      'The music club is fun and good.', 'sentence',
      '음악 동아리는 재미있고 좋아요. 매주 모임이 있어요.',
      'The music club is fun and good. There is a meeting every week.',
      [
        { korean: '재미있고', english: 'is fun and (V/A-고 connecting)' },
        { korean: '좋아요', english: 'is good' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '운동을 좋아하지만 잘 못해요.', 'undongeul joahajiman jal mothaeyo.',
      'I like exercise but I am not good at it.', 'sentence',
      '운동을 좋아하지만 잘 못해요. 그래도 운동 동아리에 가입하고 싶어요.',
      'I like exercise but I am not good at it. Still, I want to join a sports club.',
      [
        { korean: '좋아하지만', english: 'like but (V-지만 contrast)' },
        { korean: '잘 못해요', english: 'do not do well' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '저는 그림을 잘 그리지 못해요.', 'jeoneun geurimeul jal geuriji mothaeyo.',
      'I cannot draw well.', 'sentence',
      '저는 그림을 잘 그리지 못해요. 그래서 그림 동아리는 안 가요.',
      'I cannot draw well. So I do not join the drawing club.',
      [
        { korean: '그리지 못해요', english: 'cannot draw (V-지 못하다)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '재미있고 좋은 동아리가 많아요.', 'jaemiitgo joeun dongariga manayo.',
      'There are many fun and good clubs.', 'sentence',
      '금오공과대학교에는 재미있고 좋은 동아리가 많아요.',
      'There are many fun and good clubs at Kumoh National Institute of Technology.',
      [
        { korean: '재미있고 좋은', english: 'fun and good (V/A-고 + descriptive -은/는)' },
        { korean: '동아리가 많아요', english: 'there are many clubs' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '동아리 추천해 주세요', 'dongari chucheonhae juseyo',
      'Recommend a club', 'conversation',
      'A: 동아리에 가입하고 싶어요. 추천해 주세요.\nB: 어떤 활동을 좋아해요?\nA: 음악을 좋아해요. 그런데 노래는 잘 못해요.\nB: 그러면 합창 동아리는 어때요? 재미있고 친구도 많이 사귈 수 있어요.\nA: 좋네요. 모임이 언제예요?\nB: 매주 수요일 저녁 7시예요.\nA: 그럼 다음 주에 가 볼게요. 고마워요.',
      'A: I want to join a club. Please recommend one.\nB: What kind of activities do you like?\nA: I like music. But I am not good at singing.\nB: Then how about the choir club? It is fun and you can make many friends.\nA: That is nice. When is the meeting?\nB: Every Wednesday at 7 p.m.\nA: Then I will try going next week. Thanks.',
      [
        { korean: '추천해 주세요', english: 'please recommend' },
        { korean: '합창 동아리', english: 'choir club' },
        { korean: '친구를 사귀다', english: 'to make friends' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
