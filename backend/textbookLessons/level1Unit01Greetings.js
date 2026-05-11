// Level 1 Unit 1 — Greetings & self-introduction
// Sources: Book 1A·4 (어디에서 왔어요?) + Book 1B·1 (저는 태국 사람이에요)
// Functions: greeting, introducing yourself, asking where someone is from.

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
  vocabulary: 'l1u1-vocabulary',
  grammar: 'l1u1-grammar',
  speaking: 'l1u1-speaking',
  culture: 'l1u1-culture',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Greetings, names, and nationalities',
    goals: ['Learn polite greeting and farewell forms.', 'Learn nationality and occupation words.'],
    task: 'Greet a new classmate and say where you are from.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'N입니다 / N이에요·예요 + topic 은/는',
    goals: [
      'Use formal N입니다 and polite N이에요/예요 to introduce yourself.',
      'Use 은/는 to mark the topic ("As for me, I am ___").',
      'Negate with N이/가 아니에요.',
    ],
    task: 'Introduce yourself to the tutor in two sentences using 은/는 and N이에요/예요.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Meeting someone for the first time',
    goals: ['Hold a short first-meeting dialogue.', 'Ask 어디에서 왔어요? and answer.'],
    task: 'Roleplay introducing yourself to a Korean classmate at Kumoh National Institute of Technology.',
  },
  {
    id: ACT.culture, section: 'Culture Note',
    title: 'Bowing and politeness levels',
    goals: ['Understand when to bow and use formal vs polite speech.'],
    task: 'Decide which form (formal or polite) you would use with a professor vs a classmate.',
  },
];

const lesson = {
  title: '레벨 1 · 1과: 안녕하세요 (Greetings and Self-Introduction)',
  category: 'greetings', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (안녕하세요 / 안녕히 가세요).' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences.' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask 어디에서 왔어요? and respond appropriately.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // Vocabulary
    createContentItem('안녕하세요', 'annyeonghaseyo', 'Hello (polite)', 'word', '안녕하세요. 만나서 반갑습니다.', 'Hello. Nice to meet you.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('안녕히 가세요', 'annyeonghi gaseyo', 'Goodbye (to the person leaving)', 'word', '안녕히 가세요. 내일 봐요.', 'Goodbye. See you tomorrow.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('안녕히 계세요', 'annyeonghi gyeseyo', 'Goodbye (when you are the one leaving)', 'word', '저 갈게요. 안녕히 계세요.', 'I am leaving. Goodbye.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('만나서 반갑습니다', 'mannaseo bangapseumnida', 'Nice to meet you (formal)', 'word', '만나서 반갑습니다. 잘 부탁드립니다.', 'Nice to meet you. I look forward to working with you.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('처음 뵙겠습니다', 'cheoeum boepgetseumnida', 'How do you do (first meeting, formal)', 'word', '처음 뵙겠습니다. 김민수입니다.', 'How do you do. I am Kim Minsu.', null, [ACT.vocabulary]),
    createContentItem('이름', 'ireum', 'name', 'word', '이름이 뭐예요?', 'What is your name?', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('학생', 'haksaeng', 'student', 'word', '저는 학생이에요.', 'I am a student.', null, [ACT.vocabulary, ACT.grammar]),
    createContentItem('선생님', 'seonsaengnim', 'teacher (honorific)', 'word', '저분은 선생님이세요.', 'That person is a teacher.', null, [ACT.vocabulary]),
    createContentItem('한국 사람', 'hanguk saram', 'Korean person', 'word', '저는 한국 사람이에요.', 'I am Korean.', null, [ACT.vocabulary, ACT.grammar]),
    createContentItem('외국 사람', 'oeguk saram', 'foreigner / non-Korean', 'word', '저는 외국 사람이에요.', 'I am a foreigner.', null, [ACT.vocabulary]),
    createContentItem('미국 사람', 'miguk saram', 'American', 'word', '제 친구는 미국 사람이에요.', 'My friend is American.', null, [ACT.vocabulary]),
    createContentItem('영국 사람', 'yeongguk saram', 'British', 'word', '그분은 영국 사람이에요.', 'That person is British.', null, [ACT.vocabulary]),
    createContentItem('중국 사람', 'jungguk saram', 'Chinese', 'word', '왕 씨는 중국 사람이에요.', 'Wang is Chinese.', null, [ACT.vocabulary]),
    createContentItem('일본 사람', 'ilbon saram', 'Japanese', 'word', '다나카 씨는 일본 사람이에요.', 'Tanaka is Japanese.', null, [ACT.vocabulary]),
    createContentItem('필리핀 사람', 'pillipin saram', 'Filipino', 'word', '제 친구는 필리핀 사람이에요.', 'My friend is Filipino.', null, [ACT.vocabulary]),

    // Grammar
    createContentItem(
      '저는 학생입니다.', 'jeoneun haksaengimnida.', 'I am a student. (formal)', 'sentence',
      '안녕하십니까? 저는 학생입니다.', 'Hello. I am a student.',
      [
        { korean: '저는', english: 'I (humble) + topic 은' },
        { korean: '학생', english: 'student' },
        { korean: '입니다', english: 'am/is/are (formal)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '저는 학생이에요.', 'jeoneun haksaengieyo.', 'I am a student. (polite)', 'sentence',
      '안녕하세요. 저는 학생이에요.', 'Hello. I am a student.',
      [
        { korean: '저는', english: 'I + topic 은' },
        { korean: '학생', english: 'student' },
        { korean: '이에요', english: 'am/is/are (polite, after consonant)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '제 이름은 김민수예요.', 'je ireumeun gimminsuyeyo.', 'My name is Kim Minsu.', 'sentence',
      '제 이름은 김민수예요. 만나서 반갑습니다.', 'My name is Kim Minsu. Nice to meet you.',
      [
        { korean: '제 이름은', english: 'my name (topic)' },
        { korean: '김민수', english: 'Kim Minsu (proper noun, ends in vowel)' },
        { korean: '예요', english: 'is (polite, after vowel)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저는 한국 사람이 아니에요.', 'jeoneun hanguk sarami anieyo.', 'I am not Korean.', 'sentence',
      '저는 한국 사람이 아니에요. 미국 사람이에요.', 'I am not Korean. I am American.',
      [
        { korean: '저는', english: 'I (topic)' },
        { korean: '한국 사람이', english: 'Korean person + subject 이' },
        { korean: '아니에요', english: 'am/is not (polite negation)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '어디에서 왔어요?', 'eodieseo wasseoyo?', 'Where are you from?', 'sentence',
      '어디에서 왔어요? — 저는 미국에서 왔어요.', 'Where are you from? — I am from the US.',
      [
        { korean: '어디에서', english: 'from where' },
        { korean: '왔어요', english: 'came (past polite)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    // Speaking conversation
    createContentItem(
      '안녕하세요. 처음 뵙겠습니다.', 'annyeonghaseyo. cheoeum boepgetseumnida.',
      'Hello. How do you do.', 'conversation',
      'A: 안녕하세요. 처음 뵙겠습니다. 저는 김민수예요.\nB: 안녕하세요. 저는 사라예요. 만나서 반갑습니다.\nA: 사라 씨는 어디에서 왔어요?\nB: 저는 미국에서 왔어요. 김민수 씨는요?\nA: 저는 한국 사람이에요. 금오공과대학교 학생이에요.',
      'A: Hello. How do you do. I am Kim Minsu.\nB: Hello. I am Sarah. Nice to meet you.\nA: Where are you from, Sarah?\nB: I am from the US. And you, Minsu?\nA: I am Korean. I am a student at Kumoh National Institute of Technology.',
      [
        { korean: '처음 뵙겠습니다', english: 'how do you do (first meeting)' },
        { korean: '어디에서 왔어요?', english: 'where are you from?' },
        { korean: '~씨는요?', english: 'and you, Mr/Ms ~?' },
        { korean: '금오공과대학교', english: 'Kumoh National Institute of Technology' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '학생이에요?', 'haksaengieyo?', 'Are you a student?', 'conversation',
      'A: 학생이에요?\nB: 네, 저는 학생이에요. 금오공과대학교에 다녀요.\nA: 무슨 학과예요?\nB: 컴퓨터공학과예요.\nA: 와, 멋있네요. 저는 영어 선생님이에요.',
      'A: Are you a student?\nB: Yes, I am a student. I attend Kumoh National Institute of Technology.\nA: What is your department?\nB: Computer Engineering.\nA: Wow, that is cool. I am an English teacher.',
      [
        { korean: '네 / 아니요', english: 'yes / no' },
        { korean: '~에 다녀요', english: 'I attend ~' },
        { korean: '무슨 학과', english: 'what department' },
      ],
      [ACT.speaking],
    ),

    // Culture
    createContentItem(
      '한국에서는 처음 만날 때 가볍게 인사를 하면서 고개를 숙여요.',
      'hangugeseoneun cheoeum mannal ttae gabyeopge insareul hamyeonseo gogaereul sukyeoyo.',
      'In Korea, when you meet someone for the first time, you greet them while lightly bowing your head.',
      'sentence',
      '한국에서는 처음 만날 때 가볍게 인사를 하면서 고개를 숙여요. 나이가 많은 분께는 더 깊이 숙여요.',
      'In Korea, when you meet someone for the first time, you greet them while bowing lightly. With older people you bow more deeply.',
      [
        { korean: '처음 만날 때', english: 'when you meet for the first time' },
        { korean: '고개를 숙여요', english: 'bow your head' },
        { korean: '나이가 많은 분', english: 'an older person (honorific)' },
      ],
      [ACT.culture],
    ),
  ],
};

module.exports = lesson;
