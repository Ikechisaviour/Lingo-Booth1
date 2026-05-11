// Level 1 Unit 2 — Classroom & everyday objects
// Sources: Book 1A·5 (그건 연필이 아니야) + Book 1B·2 (교실에 시계가 있어요?)
// Functions: identifying objects, locating things, asking has/does-not-have.

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
  orientation: 'l1u2-orientation',
  pronunciation: 'l1u2-pronunciation',
  vocabularyObjects: 'l1u2-vocab-objects',
  vocabularyLocations: 'l1u2-vocab-locations',
  grammarDemonstratives: 'l1u2-grammar-demonstratives',
  grammarExistence: 'l1u2-grammar-existence',
  grammarConnectors: 'l1u2-grammar-connectors',
  reading: 'l1u2-reading',
  listening: 'l1u2-listening',
  writing: 'l1u2-writing',
  culture: 'l1u2-culture',
  task: 'l1u2-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Identify and name common classroom/personal objects in Korean.',
      'Say where an object is (in the bag, on the desk, over there).',
      'Ask whether someone has/does not have an item.',
    ],
    task: 'Imagine your first Korean class — pointing to objects on the desk, asking "what is this?", borrowing a pen from a classmate.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: '발음 — Sound changes in this lesson',
    goals: [
      'Pronounce 있어요 → [이써요] (tensification of ㅆ-받침 + ㅇ → 이써).',
      'Reduce 이것 → 이거, 그것 → 그거, 저것 → 저거 in spoken Korean.',
    ],
    task: 'Say each example out loud.',
  },
  {
    id: ACT.vocabularyObjects,
    section: 'Vocabulary I',
    title: 'Classroom and personal objects',
    goals: ['Name 15+ common classroom/desk/bag items.'],
    task: 'Point to five things around you and name each in Korean.',
  },
  {
    id: ACT.vocabularyLocations,
    section: 'Vocabulary II',
    title: 'Location words (위·아래·안·밖·옆·앞·뒤)',
    goals: ['Use position words to say where something is relative to another object.'],
    task: 'Describe where three objects are in the room.',
  },
  {
    id: ACT.grammarDemonstratives,
    section: 'Grammar I',
    title: '이거 / 그거 / 저거 — this / that (near you) / that (over there)',
    goals: [
      'Pick the correct demonstrative based on distance and who is closer.',
      'Use contractions: 이건/그건/저건 (with topic 은).',
    ],
    task: 'Make three sentences each pointing at something close, near the listener, and far away.',
  },
  {
    id: ACT.grammarExistence,
    section: 'Grammar II',
    title: 'N이/가 있어요 / 없어요 + location N에',
    goals: [
      'Say "there is / there is not" with 있어요 / 없어요.',
      'Add location: N에 N이/가 있어요 ("at N there is N").',
    ],
    task: 'Make three sentences with 있어요/없어요 + a location.',
  },
  {
    id: ACT.grammarConnectors,
    section: 'Grammar III',
    title: 'Connecting nouns: 와/과 · 하고 · (이)랑',
    goals: [
      'Use 와/과 (literary), 하고 (everyday), (이)랑 (casual) to join two nouns.',
      'Pick the right form for vowel- or consonant-ending nouns.',
    ],
    task: 'Connect three pairs of nouns using all three connectors.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '읽고 말하기 — Describe a classroom',
    goals: ['Read a short description of a classroom and answer questions.'],
    task: 'Read the paragraph and answer: 교실에 뭐가 있어요? 시계가 있어요?',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '듣고 말하기 — Borrowing a pen',
    goals: ['Follow a short borrowing dialogue.', 'Reproduce it with your own items.'],
    task: 'Listen / read along, then borrow a different item from the AI tutor.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '읽고 쓰기 — Describe what is on your desk',
    goals: ['Write 3-4 sentences listing what is on your desk and where.'],
    task: 'Write 3-4 sentences using 있어요 / 없어요 and at least one location word.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '문화 산책 — Korean school supplies and 문방구',
    goals: ['Know what a 문방구 (stationery shop) is and what 학용품 includes.'],
    task: 'Describe one item you would buy at a Korean 문방구.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '과제 — Show me what is on your desk',
    goals: ['Combine vocabulary, demonstratives, existence, and connectors in one scene.'],
    task: 'Describe your desk to the AI tutor turn by turn — answer their follow-up questions.',
  },
];

const lesson = {
  title: '레벨 1 · 2과: 교실에 시계가 있어요? (Classroom and Everyday Objects)',
  category: 'daily-life',
  difficulty: 'beginner',
  targetLang: 'ko',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-what-this-is', label: 'Asking what something is', goal: 'Use 이거/그거/저거 + 뭐예요? to ask and respond.' },
    { id: 'asking-if-someone-has', label: 'Asking if someone has something', goal: 'Use ~이/가 있어요/없어요? to ask whether someone has an item.' },
    { id: 'locating-object', label: 'Saying where an object is', goal: 'Use 위·아래·안·밖·옆·앞·뒤 + N에 to locate an item.' },
  ],
  relatedPools: ['topic-school'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Lesson goal', 'classroom & objects',
      'By the end of this lesson, you can name 15+ classroom objects, point at things and say "this/that," locate items using position words, and borrow things from a classmate.',
      'word',
      'Functions: identify · locate · ask has/has-not · connect nouns',
      'These skills cover most of "everyday object" conversation in Korean.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Real-world scenario', 'first class at Kumoh',
      'It is your first Korean class. The teacher writes new vocabulary on the board. The student next to you asks for help.',
      'word',
      'Classmate: 볼펜 있어요? — You: 네, 여기 있어요.',
      'Classmate: Do you have a pen? — You: Yes, here it is.',
      null,
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '있어요 → [이써요]', 'isseoyo',
      '경음화 + 연음: the ㅆ-받침 of 있 jumps to the ㅇ of 어, making [이써요].',
      'word',
      '책이 있어요. → [채기 이써요]',
      'I have a book.',
      [
        { korean: '있 + 어요', english: 'ㅆ받침 jumps to 어 → 써' },
        { korean: '책이', english: '연음: ㄱ받침 jumps to 이 → 기' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '없어요 → [업써요]', 'eopseoyo',
      'The ㅄ-cluster reduces to [ㅂ], then the ㅅ becomes tense after it: [업써요].',
      'word',
      '시계가 없어요. → [시계가 업써요]',
      'There is no clock.',
      [
        { korean: '없', english: 'ㅄ받침 → [ㅂ] + 경음화' },
        { korean: '어요 → [써요]', english: 'second letter ㅅ becomes tense ㅆ' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '이거 / 그거 / 저거', 'contractions',
      'In speech, 이것/그것/저것 (this/that/that over there) almost always contract to 이거/그거/저거.',
      'word',
      '이것 → 이거 · 이것은 → 이건 · 이것이 → 이게',
      'Three contracted forms.',
      [
        { korean: '이거', english: 'this (object only)' },
        { korean: '이건', english: 'this + topic 은' },
        { korean: '이게', english: 'this + subject 이' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '책상 → [책쌍]', 'chaeksang',
      '경음화: the ㄱ-받침 of 책 makes the following ㅅ tense.',
      'word',
      '책상 위에 있어요. → [책쌍 위에 이써요]',
      'It is on the desk.',
      null,
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Objects
    // ────────────────────────────────────────────────────────────────────
    createContentItem('책', 'chaek', 'book', 'word', '책이 책상 위에 있어요.', 'The book is on the desk.', null, [ACT.vocabularyObjects]),
    createContentItem('공책', 'gongchaek', 'notebook', 'word', '공책에 이름을 써요.', 'I write my name in the notebook.', null, [ACT.vocabularyObjects]),
    createContentItem('연필', 'yeonpil', 'pencil', 'word', '연필 좀 빌려주세요.', 'Please lend me a pencil.', null, [ACT.vocabularyObjects]),
    createContentItem('볼펜', 'bolpen', 'ballpoint pen', 'word', '볼펜 있어요?', 'Do you have a ballpoint pen?', null, [ACT.vocabularyObjects]),
    createContentItem('지우개', 'jiugae', 'eraser', 'word', '지우개로 지우세요.', 'Erase it with an eraser.', null, [ACT.vocabularyObjects]),
    createContentItem('자', 'ja', 'ruler', 'word', '자로 줄을 그어요.', 'Draw a line with a ruler.', null, [ACT.vocabularyObjects]),
    createContentItem('의자', 'uija', 'chair', 'word', '의자에 앉으세요.', 'Please sit on the chair.', null, [ACT.vocabularyObjects]),
    createContentItem('책상', 'chaeksang', 'desk', 'word', '책이 책상 위에 있어요.', 'The book is on the desk.', null, [ACT.vocabularyObjects]),
    createContentItem('칠판', 'chilpan', 'blackboard / chalkboard', 'word', '선생님이 칠판에 써요.', 'The teacher writes on the board.', null, [ACT.vocabularyObjects]),
    createContentItem('가방', 'gabang', 'bag', 'word', '제 가방은 검은색이에요.', 'My bag is black.', null, [ACT.vocabularyObjects]),
    createContentItem('시계', 'sigye', 'clock / watch', 'word', '교실에 시계가 있어요.', 'There is a clock in the classroom.', null, [ACT.vocabularyObjects]),
    createContentItem('컴퓨터', 'keompyuteo', 'computer', 'word', '컴퓨터로 공부해요.', 'I study on the computer.', null, [ACT.vocabularyObjects]),
    createContentItem('노트북', 'noteubuk', 'laptop', 'word', '제 노트북은 새 거예요.', 'My laptop is new.', null, [ACT.vocabularyObjects]),
    createContentItem('핸드폰', 'haendeupon', 'mobile phone', 'word', '핸드폰이 어디에 있어요?', 'Where is the phone?', null, [ACT.vocabularyObjects]),
    createContentItem('안경', 'angyeong', 'glasses', 'word', '저는 안경을 써요.', 'I wear glasses.', null, [ACT.vocabularyObjects]),
    createContentItem('지갑', 'jigap', 'wallet', 'word', '지갑이 가방 안에 있어요.', 'My wallet is in my bag.', null, [ACT.vocabularyObjects]),
    createContentItem('우산', 'usan', 'umbrella', 'word', '우산이 의자 옆에 있어요.', 'The umbrella is next to the chair.', null, [ACT.vocabularyObjects]),
    createContentItem('교실', 'gyosil', 'classroom', 'word', '우리 교실은 3층에 있어요.', 'Our classroom is on the 3rd floor.', null, [ACT.vocabularyObjects]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: Location words
    // ────────────────────────────────────────────────────────────────────
    createContentItem('위', 'wi', 'top / on top of', 'word', '책상 위에 책이 있어요.', 'A book is on top of the desk.', null, [ACT.vocabularyLocations]),
    createContentItem('아래', 'arae', 'under / below', 'word', '의자 아래에 가방이 있어요.', 'A bag is under the chair.', null, [ACT.vocabularyLocations]),
    createContentItem('밑', 'mit', 'underneath (synonym of 아래)', 'word', '책상 밑에 가방이 있어요.', 'A bag is under the desk.', null, [ACT.vocabularyLocations]),
    createContentItem('안', 'an', 'inside', 'word', '가방 안에 책이 있어요.', 'A book is inside the bag.', null, [ACT.vocabularyLocations]),
    createContentItem('밖', 'bak', 'outside', 'word', '교실 밖에 학생들이 있어요.', 'Students are outside the classroom.', null, [ACT.vocabularyLocations]),
    createContentItem('옆', 'yeop', 'next to / beside', 'word', '제 옆에 친구가 있어요.', 'A friend is beside me.', null, [ACT.vocabularyLocations]),
    createContentItem('앞', 'ap', 'in front of', 'word', '교실 앞에 칠판이 있어요.', 'The blackboard is at the front of the classroom.', null, [ACT.vocabularyLocations]),
    createContentItem('뒤', 'dwi', 'behind / at the back', 'word', '제 뒤에 친구가 앉아요.', 'A friend sits behind me.', null, [ACT.vocabularyLocations]),
    createContentItem('사이', 'sai', 'between', 'word', '책상 사이에 가방이 있어요.', 'The bag is between the desks.', null, [ACT.vocabularyLocations]),
    createContentItem('여기 / 거기 / 저기', 'yeogi / geogi / jeogi', 'here / there (near you) / over there', 'word', '여기에 책이 있어요.', 'There is a book here.', null, [ACT.vocabularyLocations]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: 이거/그거/저거
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '이거 — this (near speaker)', 'igeo',
      'Use when the object is close to YOU.',
      'sentence',
      '이거 뭐예요? — 이거 책이에요.',
      'What is this? — This is a book.',
      [
        { korean: '이거', english: 'contraction of 이것 (this thing)' },
        { korean: '이건', english: '이것 + 은 (topic)' },
        { korean: '이게', english: '이것 + 이 (subject)' },
      ],
      [ACT.grammarDemonstratives],
    ),
    createContentItem(
      '그거 — that (near listener)', 'geugeo',
      'Use when the object is close to the PERSON you are talking to.',
      'sentence',
      '그거 뭐예요? — 그거 제 핸드폰이에요.',
      'What is that? — That is my phone.',
      [
        { korean: '그거', english: 'that (near you, listener)' },
        { korean: '그건', english: '그것 + 은' },
        { korean: '그게', english: '그것 + 이' },
      ],
      [ACT.grammarDemonstratives],
    ),
    createContentItem(
      '저거 — that over there (far from both)', 'jeogeo',
      'Use when the object is FAR from both you and the listener.',
      'sentence',
      '저거 컴퓨터예요? — 네, 저거 컴퓨터예요.',
      'Is that over there a computer? — Yes, that is a computer.',
      [
        { korean: '저거', english: 'that (over there, far)' },
        { korean: '저건', english: '저것 + 은' },
        { korean: '저게', english: '저것 + 이' },
      ],
      [ACT.grammarDemonstratives],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: 있어요/없어요 + locations
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'N이/가 있어요 — there is N', 'isseoyo',
      'Existence sentence with the subject marker 이/가.',
      'sentence',
      '교실에 시계가 있어요.',
      'There is a clock in the classroom.',
      [
        { korean: '교실에', english: 'in the classroom (location with 에)' },
        { korean: '시계가', english: 'clock + subject 가' },
        { korean: '있어요', english: 'exists / there is' },
      ],
      [ACT.grammarExistence],
    ),
    createContentItem(
      'N이/가 없어요 — there is no N', 'eopseoyo',
      'Negative existence — same pattern, just swap 있어요 for 없어요.',
      'sentence',
      '가방 안에 핸드폰이 없어요.',
      'There is no phone in my bag.',
      [
        { korean: '가방 안에', english: 'inside the bag' },
        { korean: '핸드폰이', english: 'phone + subject' },
        { korean: '없어요', english: 'does not exist' },
      ],
      [ACT.grammarExistence],
    ),
    createContentItem(
      'Location pattern: A 의 B 에 C 이/가 있어요',
      'where C is at',
      'Stack the location words to be precise: "On the desk in the classroom, there is a book."',
      'sentence',
      '교실 책상 위에 책이 있어요.',
      'On the desk in the classroom, there is a book.',
      [
        { korean: '교실', english: 'classroom (broad location)' },
        { korean: '책상 위', english: 'on the desk (specific location)' },
        { korean: '책이 있어요', english: 'there is a book' },
      ],
      [ACT.grammarExistence],
    ),
    createContentItem(
      'Asking with N이/가 있어요?',
      'do you have',
      'Tag a rising tone for a question: "Do you have ~?"',
      'sentence',
      '볼펜 있어요? — 네, 있어요. / 아니요, 없어요.',
      'Do you have a pen? — Yes / No.',
      [
        { korean: '볼펜 있어요?', english: 'Do you have a pen? (subject 이/가 often dropped in casual speech)' },
      ],
      [ACT.grammarExistence],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: connectors
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '와 / 과 — "and" (literary)', 'wa / gwa',
      '과 after consonant, 와 after vowel. Used in writing, formal speech.',
      'sentence',
      '책과 공책이 있어요.',
      'There is a book and a notebook.',
      [
        { korean: '책 + 과', english: '책 ends in consonant → 과' },
        { korean: '공책', english: 'second noun' },
      ],
      [ACT.grammarConnectors],
    ),
    createContentItem(
      '하고 — "and" (everyday)', 'hago',
      'The most common spoken form. Works with any noun, no consonant/vowel rule.',
      'sentence',
      '책하고 공책이 있어요.',
      'There is a book and a notebook.',
      [
        { korean: '하고', english: 'and (everyday)' },
      ],
      [ACT.grammarConnectors],
    ),
    createContentItem(
      '(이)랑 — "and" (casual)', '(i)rang',
      '이랑 after consonant, 랑 after vowel. Use with friends; never in formal writing.',
      'sentence',
      '책이랑 공책이 있어요.',
      'There is a book and a notebook.',
      [
        { korean: '책 + 이랑', english: '책 ends in consonant → 이랑' },
        { korean: '친구 + 랑', english: '친구 ends in vowel → 랑' },
      ],
      [ACT.grammarConnectors],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Describing a classroom',
      'reading practice',
      'Read aloud, then answer the questions below.',
      'sentence',
      '여기는 우리 교실이에요. 교실 앞에 큰 칠판이 있어요. 칠판 위에 시계가 있어요. 책상 옆에 가방이 있어요. 가방 안에 책하고 공책이 있어요. 그런데 지우개가 없어요.',
      'This is our classroom. There is a big blackboard at the front of the classroom. There is a clock on top of the blackboard. There is a bag next to the desk. In the bag there is a book and a notebook. But there is no eraser.',
      [
        { korean: '교실 앞에 칠판', english: 'blackboard at the front of the classroom' },
        { korean: '칠판 위에 시계', english: 'clock on top of the blackboard' },
        { korean: '가방 안에 책하고 공책', english: 'book and notebook inside the bag' },
        { korean: '지우개가 없어요', english: 'no eraser' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Comprehension questions',
      'answer in Korean',
      'Answer based on the paragraph.',
      'sentence',
      'Q1: 교실 앞에 뭐가 있어요? · Q2: 가방 안에 뭐가 있어요? · Q3: 지우개가 있어요?',
      'Q1: What is at the front of the classroom? Q2: What is in the bag? Q3: Is there an eraser?',
      [
        { korean: 'A1: 칠판이 있어요.', english: 'There is a blackboard.' },
        { korean: 'A2: 책하고 공책이 있어요.', english: 'There is a book and a notebook.' },
        { korean: 'A3: 아니요, 지우개가 없어요.', english: 'No, there is no eraser.' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Borrowing a pen',
      'classmate dialogue',
      'Two classmates need supplies. Listen / read along, then redo with different items.',
      'conversation',
      'A: 사라 씨, 볼펜 있어요?\nB: 네, 가방 안에 있어요. 여기요.\nA: 고마워요. 그런데 지우개도 있어요?\nB: 미안해요, 지우개는 없어요. 연필이랑 자만 있어요.\nA: 괜찮아요. 그럼 연필 좀 빌려주세요.\nB: 네, 여기 있어요.',
      'A: Sarah, do you have a pen?\nB: Yes, it is in my bag. Here you go.\nA: Thanks. Do you also have an eraser?\nB: Sorry, no eraser. I only have a pencil and a ruler.\nA: That is okay. Then please lend me the pencil.\nB: Yes, here.',
      [
        { korean: '~ 있어요?', english: 'do you have ~?' },
        { korean: '여기요', english: 'here you go' },
        { korean: '~도', english: 'also' },
        { korean: '~만', english: 'only' },
        { korean: '빌려주세요', english: 'please lend me' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'What is this?',
      'pointing dialogue',
      'A asks about three objects on B\'s desk. Listen / read, then describe your own desk.',
      'conversation',
      'A: 이거 뭐예요?\nB: 그건 제 한국어 책이에요.\nA: 그럼 저거는요?\nB: 저건 노트북이에요. 새 거예요.\nA: 와, 멋있네요. 책상 옆에 가방은 누구 거예요?\nB: 그것도 제 거예요.',
      'A: What is this?\nB: That is my Korean textbook.\nA: Then what about that over there?\nB: That is a laptop. It is new.\nA: Wow, cool. Whose bag is next to the desk?\nB: That is also mine.',
      [
        { korean: '이거 / 그거 / 저거', english: 'this / that / that over there' },
        { korean: '새 거', english: 'a new one' },
        { korean: '제 거 / 누구 거', english: 'mine / whose' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Model: describing your desk',
      'writing template',
      'Follow this model to describe your own desk in 3-5 sentences.',
      'sentence',
      '제 책상 위에 한국어 책하고 공책이 있어요. 책상 옆에 가방이 있어요. 가방 안에 핸드폰하고 지갑이 있어요. 그런데 우산은 없어요.',
      'On my desk there is a Korean book and a notebook. Next to my desk is my bag. In the bag there is a phone and a wallet. But there is no umbrella.',
      null,
      [ACT.writing],
    ),
    createContentItem(
      'Writing prompt',
      'your turn',
      'Write 3-5 sentences describing your real desk right now. Use at least two location words and one connector (와/하고/(이)랑).',
      'sentence',
      'Hint: 책상 위에 ___이/가 있어요. 가방 안에 ___하고 ___이/가 있어요.',
      'Hint: On the desk there is ___. In the bag there is ___ and ___.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '문방구 — the Korean stationery shop',
      'munbanggu',
      'A 문방구 is a small shop near every Korean school selling school supplies and snacks. Generations of Korean students bought their first 연필 and 지우개 there.',
      'sentence',
      '학교 앞에 문방구가 있어요. 거기에서 학용품을 사요.',
      'There is a stationery shop in front of the school. We buy school supplies there.',
      [
        { korean: '문방구', english: 'stationery shop' },
        { korean: '학용품', english: 'school supplies' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '학용품 (school supplies)',
      'set vocabulary',
      'Korean students bundle these together as 학용품. Typical bag contents: 필통 (pencil case) + 연필 / 볼펜 + 지우개 + 자 + 가위 (scissors) + 풀 (glue).',
      'sentence',
      '필통 안에 연필하고 볼펜하고 지우개가 있어요.',
      'In the pencil case there is a pencil, a ballpoint pen, and an eraser.',
      [
        { korean: '필통', english: 'pencil case' },
        { korean: '가위', english: 'scissors' },
        { korean: '풀', english: 'glue' },
      ],
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '과제: Show me your desk',
      'task scenario',
      'Roleplay: You are video-calling a Korean friend. They ask "이거 뭐예요?" while pointing at things on your desk. Use vocabulary, demonstratives, locations, and connectors.',
      'conversation',
      'Friend: 책상 위에 뭐가 있어요?\nYou: [list items + use connector]\nFriend: 이거는 뭐예요? (points)\nYou: [identify + locate]\nFriend: 핸드폰은 어디에 있어요?\nYou: [say where with 위/안/옆/etc.]',
      'AI tutor will play the friend and prompt you with follow-ups.',
      [
        { korean: '책상 위에 ___이/가 있어요.', english: 'on the desk there is ___' },
        { korean: '___ 안에 ___이/가 있어요.', english: 'inside ___ there is ___' },
        { korean: '___은 ___ 옆에 있어요.', english: '___ is next to ___' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
