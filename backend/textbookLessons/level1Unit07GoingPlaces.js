// Level 1 Unit 7 — Going places (now & later)
// Sources: Book 1A·8 (지금 어디에 가?) + Book 1B·10 (가족과 놀이공원에 갈 거예요)
// Functions: stating destination, expressing purpose, talking about future plans.

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
  vocabulary: 'l1u7-vocabulary',
  grammar: 'l1u7-grammar',
  speaking: 'l1u7-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Destinations and purposes',
    goals: ['Name common destinations.', 'Pair a destination with a purpose verb.'],
    task: 'Pick three places you go regularly and say the purpose for each.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-(으)러 가다 + N에 가다 + V-(으)ㄹ 거예요',
    goals: [
      'Use V-(으)러 가다 to express going somewhere in order to do something.',
      'Distinguish 에 (destination) from 에서 (location of action).',
      'Use V-(으)ㄹ 거예요 for plans and intentions.',
    ],
    task: 'Make three sentences about your weekend plans using V-(으)ㄹ 거예요.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Asking and stating where someone is going',
    goals: ['Ask 어디에 가요? and answer.', 'Say what you will do next weekend.'],
    task: 'Roleplay running into a classmate on campus and explaining where you are headed.',
  },
];

const lesson = {
  title: '레벨 1 · 7과: 가족과 놀이공원에 갈 거예요 (Going Places)',
  category: 'travel', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-where-going', label: 'Asking where someone is going', goal: 'Use 어디에 가요? to ask about a destination, and respond.' },
    { id: 'stating-future-plan', label: 'Stating a future plan', goal: 'Use V-(으)ㄹ 거예요 to share a near-future plan.' },
    { id: 'expressing-purpose', label: 'Expressing purpose', goal: 'Use V-(으)러 가다 to say why you are going somewhere.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    createContentItem('가다', 'gada', 'to go', 'word', '학교에 가요.', 'I go to school.', null, [ACT.vocabulary]),
    createContentItem('오다', 'oda', 'to come', 'word', '친구가 한국에 와요.', 'My friend comes to Korea.', null, [ACT.vocabulary]),
    createContentItem('놀이공원', 'noligongwon', 'amusement park', 'word', '주말에 놀이공원에 갈 거예요.', 'I will go to the amusement park this weekend.', null, [ACT.vocabulary]),
    createContentItem('공원', 'gongwon', 'park', 'word', '공원에서 산책해요.', 'I take walks in the park.', null, [ACT.vocabulary]),
    createContentItem('백화점', 'baekhwajeom', 'department store', 'word', '백화점에 옷을 사러 가요.', 'I go to the department store to buy clothes.', null, [ACT.vocabulary]),
    createContentItem('영화관', 'yeonghwagwan', 'movie theater', 'word', '영화관에서 영화를 봐요.', 'I watch movies at the theater.', null, [ACT.vocabulary]),
    createContentItem('카페', 'kape', 'cafe', 'word', '친구하고 카페에 가요.', 'I go to a cafe with my friend.', null, [ACT.vocabulary]),
    createContentItem('서점', 'seojeom', 'bookstore', 'word', '서점에서 책을 사요.', 'I buy books at the bookstore.', null, [ACT.vocabulary]),
    createContentItem('병원', 'byeongwon', 'hospital / clinic', 'word', '병원에 가요.', 'I am going to the hospital.', null, [ACT.vocabulary]),
    createContentItem('시장', 'sijang', 'market', 'word', '시장에서 과일을 사요.', 'I buy fruit at the market.', null, [ACT.vocabulary]),
    createContentItem('가족', 'gajok', 'family', 'word', '가족과 같이 가요.', 'I am going with my family.', null, [ACT.vocabulary]),
    createContentItem('친구', 'chingu', 'friend', 'word', '친구하고 만나요.', 'I am meeting a friend.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 도서관에 책을 읽으러 가요.', 'jeoneun doseogwane chaegeul ilgeureo gayo.',
      'I am going to the library to read a book.', 'sentence',
      '저는 도서관에 책을 읽으러 가요. 거기에서 두 시간 동안 공부해요.',
      'I am going to the library to read a book. I study there for two hours.',
      [
        { korean: '도서관에', english: 'to the library (destination)' },
        { korean: '책을 읽으러', english: 'in order to read a book (V-(으)러)' },
        { korean: '가요', english: 'go (polite)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '주말에 가족과 놀이공원에 갈 거예요.', 'jumare gajokgwa noligongwone gal geoyeyo.',
      'This weekend I will go to the amusement park with my family.', 'sentence',
      '주말에 가족과 놀이공원에 갈 거예요. 동생도 같이 가요.',
      'This weekend I will go to the amusement park with my family. My sibling is coming too.',
      [
        { korean: '가족과', english: 'with family' },
        { korean: '놀이공원에', english: 'to the amusement park' },
        { korean: '갈 거예요', english: 'will go (V-(으)ㄹ 거예요 future)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '학교에서 한국어를 공부해요.', 'hakgyoeseo hangugeoreul gongbuhaeyo.',
      'I study Korean at school.', 'sentence',
      '학교에서 한국어를 공부해요. 도서관에서도 공부해요.',
      'I study Korean at school. I also study at the library.',
      [
        { korean: '학교에서', english: 'at school (location of action, 에서)' },
        { korean: '한국어를', english: 'Korean + object' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '내일은 무엇을 할 거예요?', 'naeireun mueoseul hal geoyeyo?',
      'What will you do tomorrow?', 'sentence',
      '내일은 무엇을 할 거예요? — 친구를 만날 거예요.',
      'What will you do tomorrow? — I will meet a friend.',
      [
        { korean: '내일은', english: 'tomorrow (topic)' },
        { korean: '무엇을 할 거예요?', english: 'what will you do?' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '어디에 가요?', 'eodie gayo?',
      'Where are you going?', 'conversation',
      'A: 지금 어디에 가요?\nB: 카페에 커피를 마시러 가요. 같이 갈래요?\nA: 좋아요. 저도 커피 마시고 싶어요.\nB: 그럼 학교 앞 카페로 가요.',
      'A: Where are you going right now?\nB: I am going to a cafe to drink coffee. Do you want to come?\nA: Sure. I want to drink coffee too.\nB: Then let us go to the cafe in front of the school.',
      [
        { korean: '커피를 마시러', english: 'in order to drink coffee' },
        { korean: '같이 갈래요?', english: 'shall we go together?' },
        { korean: '~으로 가요', english: 'let us go to ~' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '주말에 뭐 할 거예요?', 'jumare mwo hal geoyeyo?',
      'What will you do on the weekend?', 'conversation',
      'A: 주말에 뭐 할 거예요?\nB: 가족과 놀이공원에 갈 거예요. 사라 씨는요?\nA: 저는 친구하고 영화를 볼 거예요.\nB: 무슨 영화요?\nA: 한국 영화요. 재미있을 것 같아요.',
      'A: What will you do on the weekend?\nB: I will go to the amusement park with my family. How about you, Sarah?\nA: I will watch a movie with a friend.\nB: What movie?\nA: A Korean movie. I think it will be fun.',
      [
        { korean: '주말에 뭐 할 거예요?', english: 'what will you do on the weekend?' },
        { korean: '무슨 영화요?', english: 'what movie?' },
        { korean: '재미있을 것 같아요', english: 'I think it will be fun' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
