// Level 1 Unit 2 — Classroom & everyday objects
// Sources: Book 1A·5 (그건 연필이 아니야) + Book 1B·2 (교실에 시계가 있어요?)
// Functions: identifying objects, asking what something is, has/does not have.

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
  vocabulary: 'l1u2-vocabulary',
  grammar: 'l1u2-grammar',
  speaking: 'l1u2-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Classroom and everyday objects',
    goals: ['Name common classroom and personal items.'],
    task: 'Point to three things around you and name them in Korean.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: '이거/그거/저거 + 있어요/없어요 + 와/과·하고',
    goals: [
      'Use 이거 (this), 그거 (that near you), 저거 (that over there).',
      'Use 있어요 / 없어요 to say something exists / does not exist.',
      'Connect nouns with 와/과 (formal) and 하고 (casual).',
    ],
    task: 'Make three sentences with 이거/그거/저거 and 있어요/없어요.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Asking what something is and what someone has',
    goals: ['Ask 이거 뭐예요? and respond.', 'Ask if someone has something.'],
    task: 'Roleplay a classmate asking you what objects are on your desk.',
  },
];

const lesson = {
  title: '레벨 1 · 2과: 교실에 시계가 있어요? (Classroom and Everyday Objects)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-what-this-is', label: 'Asking what something is', goal: 'Use 이거/그거/저거 + 뭐예요? to ask what an object is, and respond.' },
    { id: 'asking-if-someone-has', label: 'Asking if someone has something', goal: 'Use ~이/가 있어요/없어요? to ask whether someone has an item.' },
  ],
  relatedPools: ['topic-school'],
  content: [
    // Vocabulary
    createContentItem('책', 'chaek', 'book', 'word', '책이 책상 위에 있어요.', 'The book is on the desk.', null, [ACT.vocabulary]),
    createContentItem('공책', 'gongchaek', 'notebook', 'word', '공책에 이름을 써요.', 'I write my name in the notebook.', null, [ACT.vocabulary]),
    createContentItem('연필', 'yeonpil', 'pencil', 'word', '연필 좀 빌려주세요.', 'Please lend me a pencil.', null, [ACT.vocabulary]),
    createContentItem('볼펜', 'bolpen', 'ballpoint pen', 'word', '볼펜 있어요?', 'Do you have a ballpoint pen?', null, [ACT.vocabulary]),
    createContentItem('의자', 'uija', 'chair', 'word', '의자에 앉으세요.', 'Please sit on the chair.', null, [ACT.vocabulary]),
    createContentItem('책상', 'chaeksang', 'desk', 'word', '책이 책상 위에 있어요.', 'The book is on the desk.', null, [ACT.vocabulary]),
    createContentItem('가방', 'gabang', 'bag', 'word', '제 가방은 검은색이에요.', 'My bag is black.', null, [ACT.vocabulary]),
    createContentItem('시계', 'sigye', 'clock / watch', 'word', '교실에 시계가 있어요.', 'There is a clock in the classroom.', null, [ACT.vocabulary]),
    createContentItem('컴퓨터', 'keompyuteo', 'computer', 'word', '컴퓨터로 공부해요.', 'I study on the computer.', null, [ACT.vocabulary]),
    createContentItem('핸드폰', 'haendeupon', 'mobile phone', 'word', '핸드폰이 어디에 있어요?', 'Where is the phone?', null, [ACT.vocabulary]),
    createContentItem('안경', 'angyeong', 'glasses', 'word', '저는 안경을 써요.', 'I wear glasses.', null, [ACT.vocabulary]),
    createContentItem('지갑', 'jigap', 'wallet', 'word', '지갑이 가방 안에 있어요.', 'My wallet is in my bag.', null, [ACT.vocabulary]),

    // Grammar
    createContentItem(
      '이거 뭐예요?', 'igeo mwoyeyo?', 'What is this?', 'sentence',
      '이거 뭐예요? — 그건 책이에요.', 'What is this? — That is a book.',
      [
        { korean: '이거', english: 'this (thing near speaker)' },
        { korean: '뭐예요', english: 'what is it (polite)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저거는 컴퓨터예요.', 'jeogeoneun keompyuteoyeyo.', 'That over there is a computer.', 'sentence',
      '저거는 컴퓨터예요. 새 거예요.', 'That over there is a computer. It is new.',
      [
        { korean: '저거', english: 'that (over there)' },
        { korean: '~는', english: 'topic marker' },
        { korean: '컴퓨터예요', english: 'is a computer' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '교실에 시계가 있어요.', 'gyosire sigyega isseoyo.', 'There is a clock in the classroom.', 'sentence',
      '교실에 시계가 있어요. 책상도 있어요.', 'There is a clock in the classroom. There are also desks.',
      [
        { korean: '교실에', english: 'in the classroom (location)' },
        { korean: '시계가', english: 'clock + subject 가' },
        { korean: '있어요', english: 'exists / there is' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '가방 안에 핸드폰이 없어요.', 'gabang ane haendeuponi eopseoyo.', 'There is no phone in my bag.', 'sentence',
      '가방 안에 핸드폰이 없어요. 지갑만 있어요.', 'There is no phone in my bag. Only my wallet is there.',
      [
        { korean: '가방 안에', english: 'inside the bag' },
        { korean: '핸드폰이', english: 'phone + subject' },
        { korean: '없어요', english: 'does not exist' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '책하고 공책이 있어요.', 'chaekhago gongchaegi isseoyo.', 'I have a book and a notebook.', 'sentence',
      '제 가방에 책하고 공책이 있어요.', 'In my bag I have a book and a notebook.',
      [
        { korean: '책하고 공책', english: 'a book and a notebook (하고 connects nouns, casual)' },
        { korean: '있어요', english: 'has / there is' },
      ],
      [ACT.grammar],
    ),

    // Speaking conversation
    createContentItem(
      '이거 뭐예요?', 'igeo mwoyeyo?',
      'What is this? (asking about an object)', 'conversation',
      'A: 이거 뭐예요?\nB: 그건 한국어 책이에요.\nA: 저거도 한국어 책이에요?\nB: 아니요, 저건 공책이에요.\nA: 한국어 공책 좋네요.',
      'A: What is this?\nB: That is a Korean textbook.\nA: Is that one over there also a Korean textbook?\nB: No, that one is a notebook.\nA: Korean notebooks are nice.',
      [
        { korean: '이거 / 그거 / 저거', english: 'this / that (near you) / that (over there)' },
        { korean: '한국어 책', english: 'Korean book' },
        { korean: '아니요', english: 'no' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '볼펜 있어요?', 'bolpen isseoyo?',
      'Do you have a pen?', 'conversation',
      'A: 볼펜 있어요?\nB: 네, 있어요. 여기요.\nA: 고마워요. 그런데 지우개도 있어요?\nB: 미안해요, 지우개는 없어요.\nA: 괜찮아요. 고마워요.',
      'A: Do you have a pen?\nB: Yes, here you go.\nA: Thanks. By the way, do you also have an eraser?\nB: Sorry, I do not have an eraser.\nA: That is okay. Thanks.',
      [
        { korean: '~ 있어요?', english: 'do you have ~?' },
        { korean: '여기요', english: 'here you go' },
        { korean: '~도', english: 'also (additive)' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
