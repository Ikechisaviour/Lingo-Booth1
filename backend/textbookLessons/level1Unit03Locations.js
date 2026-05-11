// Level 1 Unit 3 — Locations & directions
// Sources: Book 1A·6 (약국이 어디에 있어요?) + Book 1B·3 (화장실이 어디에 있어요?)
// Functions: asking where a place is, describing relative position.

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
  vocabulary: 'l1u3-vocabulary',
  grammar: 'l1u3-grammar',
  speaking: 'l1u3-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Places and position words',
    goals: ['Name common buildings and locations.', 'Use position words: 위·아래·옆·앞·뒤·안·밖.'],
    task: 'Describe where two objects in your room are.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'N이/가 어디에 있어요? + N에 / N 위·아래·옆에',
    goals: [
      'Ask 어디에 있어요? to find a place or thing.',
      'Use N에 있어요 to say where something is.',
      'Stack a position word: N 위/아래/옆/앞/뒤에 있어요.',
    ],
    task: 'Answer 어디에 있어요? for three different places on campus.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Asking for directions on campus',
    goals: ['Ask for the bathroom, library, cafeteria.', 'Give simple directions using position words.'],
    task: 'Help a new exchange student find the library at Kumoh National Institute of Technology.',
  },
];

const lesson = {
  title: '레벨 1 · 3과: 화장실이 어디에 있어요? (Locations and Directions)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-where-place-is', label: 'Asking where a place is', goal: 'Use 어디에 있어요? to ask the location of a place or thing.' },
    { id: 'describing-position', label: 'Describing where something is', goal: 'Combine N + position word + 에 있어요 to describe relative location.' },
  ],
  relatedPools: ['topic-school'],
  content: [
    // Vocabulary
    createContentItem('위', 'wi', 'top / above', 'word', '책상 위에 책이 있어요.', 'There is a book on the desk.', null, [ACT.vocabulary]),
    createContentItem('아래', 'arae', 'bottom / under', 'word', '의자 아래에 가방이 있어요.', 'My bag is under the chair.', null, [ACT.vocabulary]),
    createContentItem('옆', 'yeop', 'next to / beside', 'word', '도서관 옆에 카페가 있어요.', 'There is a cafe next to the library.', null, [ACT.vocabulary]),
    createContentItem('앞', 'ap', 'front', 'word', '학교 앞에 버스 정류장이 있어요.', 'There is a bus stop in front of the school.', null, [ACT.vocabulary]),
    createContentItem('뒤', 'dwi', 'back / behind', 'word', '집 뒤에 산이 있어요.', 'There is a mountain behind my house.', null, [ACT.vocabulary]),
    createContentItem('안', 'an', 'inside', 'word', '가방 안에 책이 있어요.', 'My book is in my bag.', null, [ACT.vocabulary]),
    createContentItem('밖', 'bak', 'outside', 'word', '교실 밖에 친구가 있어요.', 'My friend is outside the classroom.', null, [ACT.vocabulary]),
    createContentItem('화장실', 'hwajangsil', 'bathroom / restroom', 'word', '화장실이 어디에 있어요?', 'Where is the bathroom?', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('도서관', 'doseogwan', 'library', 'word', '도서관에서 공부해요.', 'I study at the library.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('식당', 'sikdang', 'cafeteria / restaurant', 'word', '학교 식당에서 점심을 먹어요.', 'I eat lunch at the school cafeteria.', null, [ACT.vocabulary]),
    createContentItem('교실', 'gyosil', 'classroom', 'word', '교실에 학생들이 있어요.', 'There are students in the classroom.', null, [ACT.vocabulary]),
    createContentItem('약국', 'yakguk', 'pharmacy', 'word', '약국은 병원 옆에 있어요.', 'The pharmacy is next to the hospital.', null, [ACT.vocabulary]),
    createContentItem('은행', 'eunhaeng', 'bank', 'word', '은행은 1층에 있어요.', 'The bank is on the first floor.', null, [ACT.vocabulary]),
    createContentItem('편의점', 'pyeonuijeom', 'convenience store', 'word', '편의점은 24시간 열어요.', 'Convenience stores are open 24 hours.', null, [ACT.vocabulary]),

    // Grammar
    createContentItem(
      '화장실이 어디에 있어요?', 'hwajangsiri eodie isseoyo?', 'Where is the bathroom?', 'sentence',
      '실례합니다. 화장실이 어디에 있어요?', 'Excuse me. Where is the bathroom?',
      [
        { korean: '화장실이', english: 'bathroom + subject 이' },
        { korean: '어디에', english: 'where (location)' },
        { korean: '있어요', english: 'exists / is' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '도서관은 학생회관 옆에 있어요.', 'doseogwaneun haksaenghoegwan yeope isseoyo.', 'The library is next to the student center.', 'sentence',
      '도서관은 학생회관 옆에 있어요. 카페도 같이 있어요.', 'The library is next to the student center. There is a cafe too.',
      [
        { korean: '도서관은', english: 'library (topic)' },
        { korean: '학생회관 옆에', english: 'next to the student center' },
        { korean: '있어요', english: 'is located' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '책이 책상 위에 있어요.', 'chaegi chaeksang wie isseoyo.', 'The book is on top of the desk.', 'sentence',
      '책이 책상 위에 있어요. 가방은 의자 아래에 있어요.', 'The book is on the desk. The bag is under the chair.',
      [
        { korean: '책이', english: 'book + subject' },
        { korean: '책상 위에', english: 'on top of the desk' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '편의점은 학교 앞에 있어요.', 'pyeonuijeomeun hakgyo ape isseoyo.', 'The convenience store is in front of the school.', 'sentence',
      '편의점은 학교 앞에 있어요. 24시간 열어요.', 'The convenience store is in front of the school. It is open 24 hours.',
      [
        { korean: '학교 앞에', english: 'in front of the school' },
      ],
      [ACT.grammar],
    ),

    // Speaking conversations
    createContentItem(
      '실례합니다, 화장실이 어디에 있어요?', 'sillyehamnida, hwajangsiri eodie isseoyo?',
      'Excuse me, where is the bathroom?', 'conversation',
      'A: 실례합니다, 화장실이 어디에 있어요?\nB: 화장실은 저기 카페 옆에 있어요.\nA: 카페 안에 있어요?\nB: 아니요, 카페 옆에요. 오른쪽으로 가세요.\nA: 감사합니다.',
      'A: Excuse me, where is the bathroom?\nB: The bathroom is over there next to the cafe.\nA: Is it inside the cafe?\nB: No, next to the cafe. Go right.\nA: Thank you.',
      [
        { korean: '실례합니다', english: 'excuse me (to get attention)' },
        { korean: '저기', english: 'over there' },
        { korean: '오른쪽으로', english: 'to the right' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '도서관에 어떻게 가요?', 'doseogwane eotteoke gayo?',
      'How do I get to the library?', 'conversation',
      'A: 도서관에 어떻게 가요?\nB: 여기에서 똑바로 가세요. 학생회관이 보여요.\nA: 네.\nB: 학생회관 옆에 도서관이 있어요.\nA: 학생회관 옆이요? 알겠어요. 감사합니다.',
      'A: How do I get to the library?\nB: Go straight from here. You will see the student center.\nA: Okay.\nB: The library is next to the student center.\nA: Next to the student center? Got it. Thank you.',
      [
        { korean: '똑바로 가세요', english: 'go straight' },
        { korean: '~이/가 보여요', english: 'you will see ~' },
        { korean: '알겠어요', english: 'got it / understood' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
