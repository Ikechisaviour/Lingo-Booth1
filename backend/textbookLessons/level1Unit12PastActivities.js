// Level 1 Unit 12 — Past activities
// Source: Book 1B·9 (주말에 친구하고 등산했어요)
// Functions: describing what you did, talking about who you did it with.

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
  vocabulary: 'l1u12-vocabulary',
  grammar: 'l1u12-grammar',
  speaking: 'l1u12-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Activity verbs and companion words',
    goals: ['Learn weekend-activity verbs.', 'Use 하고 / 와/과 / 랑 to mean "with someone".'],
    task: 'List three activities you did last weekend with people.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-았/었어요 (past polite) + N하고 + 어디에서',
    goals: [
      'Conjugate V-았/었어요 (polite past).',
      'Use 하고 (casual) to connect a person with a verb.',
      'Use 어디에서 to ask where the action happened.',
    ],
    task: 'Tell three things you did yesterday with whom and where.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Talking about your weekend',
    goals: ['Ask 주말에 뭐 했어요?', 'Answer with 2-3 past-tense sentences.'],
    task: 'Tell the tutor about your last weekend in three sentences.',
  },
];

const lesson = {
  title: '레벨 1 · 12과: 주말에 친구하고 등산했어요 (Past Activities)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-what-did', label: 'Asking what someone did', goal: 'Use 뭐 했어요? to ask about a past activity.' },
    { id: 'describing-past-activity', label: 'Describing a past activity', goal: 'Combine when + with whom + where + V-았/었어요 in one sentence.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('등산', 'deungsan', 'hiking / mountain climbing', 'word', '주말에 등산을 했어요.', 'I went hiking on the weekend.', null, [ACT.vocabulary]),
    createContentItem('산책', 'sanchaek', 'a walk / stroll', 'word', '저녁에 산책을 했어요.', 'I took a walk in the evening.', null, [ACT.vocabulary]),
    createContentItem('운동', 'undong', 'exercise / sports', 'word', '아침에 운동을 했어요.', 'I exercised in the morning.', null, [ACT.vocabulary]),
    createContentItem('영화', 'yeonghwa', 'movie', 'word', '영화를 봤어요.', 'I watched a movie.', null, [ACT.vocabulary]),
    createContentItem('여행', 'yeohaeng', 'trip / travel', 'word', '부산으로 여행을 갔어요.', 'I traveled to Busan.', null, [ACT.vocabulary]),
    createContentItem('요리하다', 'yorihada', 'to cook', 'word', '집에서 요리했어요.', 'I cooked at home.', null, [ACT.vocabulary]),
    createContentItem('청소하다', 'cheongsohada', 'to clean', 'word', '방을 청소했어요.', 'I cleaned my room.', null, [ACT.vocabulary]),
    createContentItem('쉬다', 'swida', 'to rest', 'word', '집에서 쉬었어요.', 'I rested at home.', null, [ACT.vocabulary]),
    createContentItem('어제', 'eoje', 'yesterday', 'word', '어제 친구를 만났어요.', 'I met a friend yesterday.', null, [ACT.vocabulary]),
    createContentItem('지난주', 'jinanju', 'last week', 'word', '지난주에 시험을 봤어요.', 'I took an exam last week.', null, [ACT.vocabulary]),
    createContentItem('지난주말', 'jinanjumal', 'last weekend', 'word', '지난주말에 등산을 갔어요.', 'I went hiking last weekend.', null, [ACT.vocabulary]),
    createContentItem('하고', 'hago', 'with (casual, attached to a person/thing)', 'word', '친구하고 같이 갔어요.', 'I went with my friend.', null, [ACT.vocabulary]),
    createContentItem('와/과', 'wa/gwa', 'with (formal-leaning, 와 after vowel, 과 after consonant)', 'word', '동생과 같이 가요.', 'I am going with my sibling.', null, [ACT.vocabulary]),

    createContentItem(
      '주말에 친구하고 등산했어요.', 'jumare chinguhago deungsanhaesseoyo.',
      'I went hiking with a friend on the weekend.', 'sentence',
      '주말에 친구하고 등산했어요. 사진도 많이 찍었어요.',
      'I went hiking with a friend on the weekend. I took a lot of photos too.',
      [
        { korean: '주말에', english: 'on the weekend' },
        { korean: '친구하고', english: 'with a friend (casual 하고)' },
        { korean: '등산했어요', english: 'went hiking (V-았/었어요 past)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '어제 도서관에서 공부했어요.', 'eoje doseogwaneseo gongbuhaesseoyo.',
      'I studied at the library yesterday.', 'sentence',
      '어제 도서관에서 공부했어요. 6시간이나 했어요.',
      'I studied at the library yesterday. I did it for as long as 6 hours.',
      [
        { korean: '어제', english: 'yesterday' },
        { korean: '도서관에서', english: 'at the library' },
        { korean: '공부했어요', english: 'studied' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '저녁에 가족과 같이 밥을 먹었어요.', 'jeonyeoge gajokgwa gachi babeul meogeosseoyo.',
      'I ate dinner with my family in the evening.', 'sentence',
      '저녁에 가족과 같이 밥을 먹었어요. 어머니가 김치찌개를 만드셨어요.',
      'I ate dinner with my family in the evening. My mother made kimchi stew.',
      [
        { korean: '가족과 같이', english: 'with my family together' },
        { korean: '밥을 먹었어요', english: 'ate (meal)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '주말에 뭐 했어요?', 'jumare mwo haesseoyo?',
      'What did you do on the weekend?', 'sentence',
      '주말에 뭐 했어요? — 친구하고 영화를 봤어요.',
      'What did you do on the weekend? — I watched a movie with a friend.',
      [
        { korean: '주말에', english: 'on the weekend' },
        { korean: '뭐 했어요?', english: 'what did you do? (past polite)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '지난주말에 뭐 했어요?', 'jinanjumare mwo haesseoyo?',
      'What did you do last weekend?', 'conversation',
      'A: 지난주말에 뭐 했어요?\nB: 친구하고 등산했어요. 사라 씨는요?\nA: 저는 집에서 쉬었어요. 그리고 한국 영화를 봤어요.\nB: 무슨 영화요?\nA: "기생충"이요. 정말 재미있었어요.\nB: 저도 그 영화 좋아해요.',
      'A: What did you do last weekend?\nB: I went hiking with a friend. How about you, Sarah?\nA: I rested at home. And I watched a Korean movie.\nB: What movie?\nA: "Parasite". It was really good.\nB: I love that movie too.',
      [
        { korean: '~씨는요?', english: 'how about you, Mr/Ms ~?' },
        { korean: '재미있었어요', english: 'was fun (past)' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '여행 이야기', 'yeohaeng iyagi',
      'Talking about a trip', 'conversation',
      'A: 지난달에 여행을 갔어요.\nB: 어디로 갔어요?\nA: 제주도에 갔어요. 가족과 같이요.\nB: 어땠어요?\nA: 정말 좋았어요. 바다도 예쁘고 음식도 맛있었어요.\nB: 저도 가고 싶어요.',
      'A: I traveled last month.\nB: Where did you go?\nA: I went to Jeju Island. With my family.\nB: How was it?\nA: It was really nice. The sea was pretty and the food was delicious.\nB: I want to go too.',
      [
        { korean: '어디로 갔어요?', english: 'where did you go?' },
        { korean: '어땠어요?', english: 'how was it?' },
        { korean: '~고 싶어요', english: 'I want to ~' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
