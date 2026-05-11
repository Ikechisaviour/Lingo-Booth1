// Level 1 Unit 1 — Greetings & self-introduction
// Sources: Book 1A·4 (어디에서 왔어요?) + Book 1B·1 (저는 태국 사람이에요)
// Functions: greeting, introducing yourself, asking where someone is from.
// This lesson is the canonical TEMPLATE for all thematic Level 1 lessons.

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
  orientation: 'l1u1-orientation',
  pronunciation: 'l1u1-pronunciation',
  vocabularyGreetings: 'l1u1-vocab-greetings',
  vocabularyPeople: 'l1u1-vocab-people',
  grammarCopula: 'l1u1-grammar-copula',
  grammarTopic: 'l1u1-grammar-topic',
  grammarNegation: 'l1u1-grammar-negation',
  reading: 'l1u1-reading',
  listening: 'l1u1-listening',
  writing: 'l1u1-writing',
  culture: 'l1u1-culture',
  task: 'l1u1-task',
};

const activities = [
  {
    id: ACT.orientation,
    section: 'Orientation',
    title: 'What you will be able to do',
    goals: [
      'Greet a Korean stranger and say goodbye correctly.',
      'Introduce yourself with your name, country, and one role (student / teacher / worker).',
      'Ask another person where they are from.',
    ],
    task: 'Picture your first day at Kumoh National Institute of Technology — you walk into the classroom and meet five new classmates. By the end of this lesson you will be able to do this entire scene in Korean.',
  },
  {
    id: ACT.pronunciation,
    section: 'Pronunciation',
    title: '발음 — Sound changes in this lesson',
    goals: [
      'Pronounce 안녕하세요 with the soft, almost-disappearing ㅎ.',
      'Apply 비음화 in 입니다 → [임니다] and similar formal endings.',
    ],
    task: 'Say each example out loud and listen for the rule.',
  },
  {
    id: ACT.vocabularyGreetings,
    section: 'Vocabulary I',
    title: 'Greetings, farewells, and first-meeting phrases',
    goals: [
      'Memorize 8 essential phrases for opening and closing an encounter.',
      'Know when to use 안녕히 가세요 vs 안녕히 계세요.',
    ],
    task: 'Practice saying each phrase out loud three times.',
  },
  {
    id: ACT.vocabularyPeople,
    section: 'Vocabulary II',
    title: 'People, roles, and nationalities',
    goals: [
      'Name yourself and others using 저, 제, 씨, 분, 분/사람.',
      'State your role (student / teacher / worker) and nationality.',
    ],
    task: 'List your own role + nationality, then describe one classmate the same way.',
  },
  {
    id: ACT.grammarCopula,
    section: 'Grammar I',
    title: 'N입니다 / N이에요·예요 — "to be" (formal vs polite)',
    goals: [
      'Use formal N입니다 with strangers, in interviews, in public speech.',
      'Use polite N이에요/예요 with classmates, coworkers, and most everyday situations.',
      'Pick 이에요 (after consonant) vs 예요 (after vowel) automatically.',
    ],
    task: 'Make six sentences: three with 입니다, three with 이에요/예요.',
  },
  {
    id: ACT.grammarTopic,
    section: 'Grammar II',
    title: '은/는 (topic) vs 이/가 (subject)',
    goals: [
      'Use 은/는 to introduce yourself or change topic.',
      'Use 이/가 to point out new information or contrast.',
      'Know that "저는" (I am the topic) is the natural way to start a self-introduction.',
    ],
    task: 'Choose between 은/는 and 이/가 in three short prompts.',
  },
  {
    id: ACT.grammarNegation,
    section: 'Grammar III',
    title: 'N이/가 아니에요 — "to not be"',
    goals: [
      'Negate a noun statement: A is not B.',
      'Pair 아니에요 with the SUBJECT particle (이/가), never with 을/를.',
    ],
    task: 'Correct one classmate when they guess your nationality wrong.',
  },
  {
    id: ACT.reading,
    section: 'Reading and Speaking',
    title: '읽고 말하기 — Read a self-introduction',
    goals: [
      'Read a short self-introduction paragraph aloud.',
      'Identify the speaker\'s name, country, and role.',
    ],
    task: 'Read the paragraph below and answer: 이름이 뭐예요? 어디에서 왔어요? 학생이에요?',
  },
  {
    id: ACT.listening,
    section: 'Listening and Speaking',
    title: '듣고 말하기 — A first meeting',
    goals: [
      'Follow a 3-turn first-meeting dialogue.',
      'Reproduce the dialogue with your own information.',
    ],
    task: 'Listen / read along, then redo the dialogue with your own name and country.',
  },
  {
    id: ACT.writing,
    section: 'Writing',
    title: '읽고 쓰기 — Write your own self-introduction',
    goals: [
      'Write 3 sentences: greeting + name + country + role.',
      'Use the topic marker 은/는 at least once.',
    ],
    task: 'Write your own self-introduction in 3 sentences using the model.',
  },
  {
    id: ACT.culture,
    section: 'Culture Note',
    title: '문화 산책 — Bowing, 씨, 님, and first business cards',
    goals: [
      'Know when and how deeply to bow.',
      'Use 씨 vs 님 correctly — and why never to use 씨 with your boss.',
      'Receive a business card with two hands.',
    ],
    task: 'Decide how you would greet (1) a classmate, (2) your professor, (3) a CEO at a job fair.',
  },
  {
    id: ACT.task,
    section: 'Task',
    title: '과제 — First day at Kumoh',
    goals: [
      'Combine everything from this lesson into one continuous scene.',
      'Greet, introduce, ask, answer, and farewell — all in one roleplay.',
    ],
    task: 'Roleplay your first day at Kumoh National Institute of Technology with the AI tutor playing your classmate.',
  },
];

const lesson = {
  title: '레벨 1 · 1과: 안녕하세요 (Greetings and Self-Introduction)',
  category: 'greetings',
  difficulty: 'beginner',
  targetLang: 'ko',
  nativeLang: 'en',
  track: 'textbook',
  lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'greeting-someone', label: 'Greeting someone', goal: 'Open and close a brief encounter politely (안녕하세요 / 안녕히 가세요).' },
    { id: 'introducing-yourself', label: 'Introducing yourself', goal: 'Give your name, nationality, and one fact about yourself in two short sentences.' },
    { id: 'asking-where-from', label: 'Asking where someone is from', goal: 'Ask 어디에서 왔어요? and respond appropriately.' },
    { id: 'correcting-assumption', label: 'Correcting an assumption', goal: 'Use N이/가 아니에요 to politely correct a wrong guess about you.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    // ────────────────────────────────────────────────────────────────────
    // Activity 1 — Orientation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Lesson goal', 'self-introduction',
      'By the end of this lesson, you can greet a Korean stranger, say your name, state where you are from, ask the same of them, and farewell — all politely.',
      'word',
      'Functional language: greet · introduce · ask origin · negate · farewell',
      'These five micro-skills form the foundation of every social encounter in Korea.',
      null,
      [ACT.orientation],
    ),
    createContentItem(
      'Real-world scenario', 'first day at Kumoh',
      'Imagine: it is your first day at 금오공과대학교 (Kumoh National Institute of Technology). A Korean classmate sits next to you and turns to you.',
      'word',
      'Classmate: 안녕하세요. 저는 김민수예요. 어디에서 왔어요?',
      'Classmate: Hello. I am Kim Minsu. Where are you from?',
      [
        { korean: '안녕하세요', english: 'Hello (polite)' },
        { korean: '저는 김민수예요', english: 'I am Kim Minsu' },
        { korean: '어디에서 왔어요?', english: 'Where are you from?' },
      ],
      [ACT.orientation],
    ),
    createContentItem(
      'Two politeness levels', 'formal vs polite',
      'Korean has formal (-ㅂ니다/입니다) and polite (-요/이에요) styles. Formal is for strangers, interviews, presentations. Polite is for daily life with classmates and coworkers. THIS LESSON teaches both — pick by situation.',
      'word',
      '학생입니다. (formal) vs 학생이에요. (polite)',
      'Both mean "I am a student." — same words, different style.',
      null,
      [ACT.orientation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 2 — Pronunciation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '안녕하세요', '[안녕하세요] (soft ㅎ)',
      'Pronunciation: in fast speech the ㅎ in 하 nearly disappears, sounding like [안녕아세요].',
      'word',
      '안녕하세요 → spoken [안녕아세요]',
      'Hello — the ㅎ between vowels softens.',
      [
        { korean: '안 [an]', english: '받침 ㄴ stays clear' },
        { korean: '녕 [nyeong]', english: '받침 ㅇ = [ng]' },
        { korean: '하 [ha] → soft [a]', english: 'ㅎ weakens between vowels' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '입니다 → [임니다]', 'imnida',
      '비음화 (nasalization): the ㅂ받침 turns into ㅁ before the ㄴ of 니다.',
      'word',
      '학생입니다 → [학생임니다]',
      'I am a student — formal ending always pronounced [-임니다], not [-입니다].',
      [
        { korean: '입 [입]', english: 'spelled with ㅂ받침' },
        { korean: '니다 [니다]', english: 'starts with ㄴ' },
        { korean: '[임니다]', english: 'ㅂ + ㄴ → ㅁ + ㄴ' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '반갑습니다 → [반갑씀니다]', 'bangapseumnida',
      'Double rule: 경음화 turns the second ㅅ tense → [씀], and the ㅂ받침 nasalizes to [ㅁ] before ㄴ.',
      'word',
      '만나서 반갑습니다 → [만나서 반갑씀니다]',
      'Nice to meet you — formal greeting.',
      [
        { korean: '반갑 [반갑]', english: 'second syllable ends in ㅂ' },
        { korean: '습 → [씀]', english: 'ㅂ받침 → 비음화 → [ㅁ]; ㅅ → 경음화 → [ㅆ]' },
        { korean: '니다 [니다]', english: 'unchanged' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '한국어 → [한구거]', 'hangugeo',
      '연음 (liaison): the ㄱ받침 of 국 jumps to the ㅇ of 어.',
      'word',
      '한국어 공부해요 → [한구거 공부해요]',
      'I study Korean.',
      [
        { korean: '한 [한]', english: 'no change' },
        { korean: '국 + 어 → [구거]', english: 'ㄱ받침 jumps to next syllable' },
      ],
      [ACT.pronunciation],
    ),
    createContentItem(
      '안녕히 가세요', '[안녕이 가세요]',
      'ㅎ-deletion: the ㅎ in 히 disappears between vowels.',
      'word',
      '안녕히 가세요 → spoken [안녕이 가세요]',
      'Goodbye (to the person leaving).',
      null,
      [ACT.pronunciation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 3 — Vocabulary I: Greetings & farewells
    // ────────────────────────────────────────────────────────────────────
    createContentItem('안녕하세요', 'annyeonghaseyo', 'Hello (polite)', 'word', '안녕하세요. 만나서 반갑습니다.', 'Hello. Nice to meet you.', null, [ACT.vocabularyGreetings]),
    createContentItem('안녕하십니까', 'annyeonghasimnikka', 'Hello (formal — TV, interviews, presentations)', 'word', '안녕하십니까. 김민수입니다.', 'Hello. I am Kim Minsu.', null, [ACT.vocabularyGreetings]),
    createContentItem('안녕히 가세요', 'annyeonghi gaseyo', 'Goodbye (to the person LEAVING)', 'word', '안녕히 가세요. 내일 봐요.', 'Goodbye. See you tomorrow.', null, [ACT.vocabularyGreetings]),
    createContentItem('안녕히 계세요', 'annyeonghi gyeseyo', 'Goodbye (when YOU are the one leaving)', 'word', '저 갈게요. 안녕히 계세요.', 'I am leaving. Goodbye.', null, [ACT.vocabularyGreetings]),
    createContentItem('만나서 반갑습니다', 'mannaseo bangapseumnida', 'Nice to meet you (formal)', 'word', '만나서 반갑습니다. 잘 부탁드립니다.', 'Nice to meet you. I look forward to working with you.', null, [ACT.vocabularyGreetings]),
    createContentItem('만나서 반가워요', 'mannaseo bangawoyo', 'Nice to meet you (polite)', 'word', '만나서 반가워요. 친하게 지내요.', 'Nice to meet you. Let us be friends.', null, [ACT.vocabularyGreetings]),
    createContentItem('처음 뵙겠습니다', 'cheoeum boepgetseumnida', 'How do you do (very formal first meeting)', 'word', '처음 뵙겠습니다. 김민수입니다.', 'How do you do. I am Kim Minsu.', null, [ACT.vocabularyGreetings]),
    createContentItem('잘 부탁드립니다', 'jal butakdeurimnida', 'I look forward to working/learning with you', 'word', '앞으로 잘 부탁드립니다.', 'I look forward to working with you from now on.', null, [ACT.vocabularyGreetings]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 4 — Vocabulary II: People, roles, nationalities
    // ────────────────────────────────────────────────────────────────────
    createContentItem('저', 'jeo', 'I (humble — use with strangers/seniors)', 'word', '저는 사라예요.', 'I am Sarah.', null, [ACT.vocabularyPeople]),
    createContentItem('제', 'je', 'my (humble — short for 저의)', 'word', '제 이름은 사라예요.', 'My name is Sarah.', null, [ACT.vocabularyPeople]),
    createContentItem('이름', 'ireum', 'name', 'word', '이름이 뭐예요?', 'What is your name?', null, [ACT.vocabularyPeople]),
    createContentItem('성함', 'seongham', 'name (honorific — for older people)', 'word', '성함이 어떻게 되세요?', 'May I ask your name?', null, [ACT.vocabularyPeople]),
    createContentItem('씨', 'ssi', 'Mr/Ms (use with peers and below — NEVER with your boss)', 'word', '사라 씨, 안녕하세요.', 'Hi, Sarah.', null, [ACT.vocabularyPeople]),
    createContentItem('님', 'nim', 'honorific suffix (for seniors, customers, professors)', 'word', '교수님, 안녕하세요.', 'Hello, Professor.', null, [ACT.vocabularyPeople]),
    createContentItem('분', 'bun', 'person (honorific — instead of 사람)', 'word', '저분은 선생님이세요.', 'That person is a teacher.', null, [ACT.vocabularyPeople]),
    createContentItem('학생', 'haksaeng', 'student', 'word', '저는 학생이에요.', 'I am a student.', null, [ACT.vocabularyPeople]),
    createContentItem('선생님', 'seonsaengnim', 'teacher (honorific)', 'word', '저는 영어 선생님이에요.', 'I am an English teacher.', null, [ACT.vocabularyPeople]),
    createContentItem('교수님', 'gyosunim', 'professor (honorific)', 'word', '저희 교수님은 한국 분이세요.', 'My professor is Korean.', null, [ACT.vocabularyPeople]),
    createContentItem('회사원', 'hoesawon', 'company employee / office worker', 'word', '저는 회사원이에요.', 'I am an office worker.', null, [ACT.vocabularyPeople]),
    createContentItem('의사', 'uisa', 'doctor', 'word', '저희 어머니는 의사예요.', 'My mother is a doctor.', null, [ACT.vocabularyPeople]),
    createContentItem('한국 사람', 'hanguk saram', 'Korean person', 'word', '저는 한국 사람이에요.', 'I am Korean.', null, [ACT.vocabularyPeople]),
    createContentItem('외국 사람', 'oeguk saram', 'foreigner / non-Korean', 'word', '저는 외국 사람이에요.', 'I am a foreigner.', null, [ACT.vocabularyPeople]),
    createContentItem('미국 사람', 'miguk saram', 'American', 'word', '제 친구는 미국 사람이에요.', 'My friend is American.', null, [ACT.vocabularyPeople]),
    createContentItem('영국 사람', 'yeongguk saram', 'British', 'word', '그분은 영국 사람이에요.', 'That person is British.', null, [ACT.vocabularyPeople]),
    createContentItem('중국 사람', 'jungguk saram', 'Chinese', 'word', '왕 씨는 중국 사람이에요.', 'Wang is Chinese.', null, [ACT.vocabularyPeople]),
    createContentItem('일본 사람', 'ilbon saram', 'Japanese', 'word', '다나카 씨는 일본 사람이에요.', 'Tanaka is Japanese.', null, [ACT.vocabularyPeople]),
    createContentItem('베트남 사람', 'beteunam saram', 'Vietnamese', 'word', '제 룸메이트는 베트남 사람이에요.', 'My roommate is Vietnamese.', null, [ACT.vocabularyPeople]),
    createContentItem('필리핀 사람', 'pillipin saram', 'Filipino', 'word', '제 친구는 필리핀 사람이에요.', 'My friend is Filipino.', null, [ACT.vocabularyPeople]),
    createContentItem('나이지리아 사람', 'naijiria saram', 'Nigerian', 'word', '저는 나이지리아 사람이에요.', 'I am Nigerian.', null, [ACT.vocabularyPeople]),

    // ────────────────────────────────────────────────────────────────────
    // Activity 5 — Grammar I: N입니다 / N이에요·예요 (copula)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'N입니다 (formal)', 'imnida',
      'Formal copula. Use in interviews, news, presentations, with strangers significantly older.',
      'sentence',
      '안녕하십니까. 저는 김민수입니다.',
      'Hello. I am Kim Minsu.',
      [
        { korean: '저는', english: 'I + topic 은' },
        { korean: '김민수', english: 'Kim Minsu' },
        { korean: '입니다', english: 'am/is/are (formal)' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'N이에요 (polite, after consonant)', '-ieyo',
      'Polite copula after a noun ending in a CONSONANT.',
      'sentence',
      '저는 학생이에요.',
      'I am a student.',
      [
        { korean: '학생', english: 'ends in consonant ㅇ' },
        { korean: '이에요', english: 'use the form WITH 이' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'N예요 (polite, after vowel)', '-yeyo',
      'Polite copula after a noun ending in a VOWEL.',
      'sentence',
      '제 이름은 사라예요.',
      'My name is Sarah.',
      [
        { korean: '사라', english: 'ends in vowel ㅏ' },
        { korean: '예요', english: 'use the form WITHOUT 이' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'Question intonation', 'rising tone',
      'For a yes/no question, keep the SAME ending and raise your voice at the end.',
      'sentence',
      '학생이에요? — 네, 학생이에요.',
      'Are you a student? — Yes, I am a student.',
      [
        { korean: '학생이에요?', english: 'Are you a student? (rising tone)' },
        { korean: '학생이에요.', english: 'I am a student. (falling tone)' },
      ],
      [ACT.grammarCopula],
    ),
    createContentItem(
      'Pick the right form',
      'cheat sheet',
      'Consonant noun → 이에요. Vowel noun → 예요. Formal context → 입니다 for both.',
      'sentence',
      '학생 (consonant) → 학생이에요 · 학생입니다 / 친구 (vowel) → 친구예요 · 친구입니다',
      'Same noun, two politeness levels.',
      [
        { korean: '학생이에요 / 학생입니다', english: 'student — consonant noun' },
        { korean: '친구예요 / 친구입니다', english: 'friend — vowel noun' },
        { korean: '의사예요 / 의사입니다', english: 'doctor — vowel noun' },
      ],
      [ACT.grammarCopula],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 6 — Grammar II: Topic 은/는 vs Subject 이/가
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '은/는 — topic marker', 'eun / neun',
      '은 after consonant, 는 after vowel. Marks "as for X..." — what the sentence is about. The natural starter for a self-introduction.',
      'sentence',
      '저는 사라예요. 사라는 미국 사람이에요.',
      'I (topic) am Sarah. Sarah (topic) is American.',
      [
        { korean: '저 + 는 → 저는', english: '저 ends in vowel → 는' },
        { korean: '사라 + 는 → 사라는', english: '사라 ends in vowel → 는' },
        { korean: '이름 + 은 → 이름은', english: '이름 ends in consonant → 은' },
      ],
      [ACT.grammarTopic],
    ),
    createContentItem(
      '이/가 — subject marker', 'i / ga',
      '이 after consonant, 가 after vowel. Marks the doer of an action. Often used when introducing NEW information.',
      'sentence',
      '이름이 뭐예요? — 제 이름이 사라예요.',
      'What is your name? — My name is Sarah.',
      [
        { korean: '이름 + 이 → 이름이', english: '이름 ends in consonant → 이' },
        { korean: '친구 + 가 → 친구가', english: '친구 ends in vowel → 가' },
      ],
      [ACT.grammarTopic],
    ),
    createContentItem(
      'When to use each',
      'topic vs subject',
      'Rule of thumb: introduce yourself with 저는 (topic). Ask a question word with 이/가. Switch back to 은/는 when you change topic.',
      'sentence',
      '저는 사라예요. 이름이 뭐예요? — 제 이름은 김민수예요.',
      'I am Sarah. What is your name? — My name is Kim Minsu.',
      [
        { korean: '저는 (topic)', english: 'introducing me' },
        { korean: '이름이 (subject)', english: 'the question word focuses on "name"' },
        { korean: '제 이름은 (topic)', english: 'now we are talking about HIS name' },
      ],
      [ACT.grammarTopic],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 7 — Grammar III: N이/가 아니에요 (negation)
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'N이/가 아니에요', 'i / ga anieyo',
      'To say "A is not B," use the SUBJECT particle 이/가 before 아니에요. Never use 을/를 here.',
      'sentence',
      '저는 한국 사람이 아니에요.',
      'I am not Korean.',
      [
        { korean: '저는', english: 'I (topic)' },
        { korean: '한국 사람이', english: '한국 사람 + 이 (subject)' },
        { korean: '아니에요', english: 'am/is/are not (polite)' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Correcting an assumption',
      'common pattern',
      'The most common use: someone guesses wrong, and you correct them politely.',
      'sentence',
      '일본 사람이에요? — 아니요, 일본 사람이 아니에요. 한국 사람이에요.',
      'Are you Japanese? — No, I am not Japanese. I am Korean.',
      [
        { korean: '아니요', english: 'no' },
        { korean: '~이/가 아니에요', english: 'is not ~' },
      ],
      [ACT.grammarNegation],
    ),
    createContentItem(
      'Formal negation: N이/가 아닙니다',
      'i / ga animnida',
      'The formal version. Used in interviews, official corrections, news.',
      'sentence',
      '저는 학생이 아닙니다. 회사원입니다.',
      'I am not a student. I am an office worker.',
      [
        { korean: '학생이', english: 'student + 이' },
        { korean: '아닙니다', english: 'am/is/are not (formal)' },
      ],
      [ACT.grammarNegation],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 8 — Reading & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Self-introduction paragraph',
      'reading practice',
      'Read this paragraph aloud. Then answer: What is the name? Where from? What role?',
      'sentence',
      '안녕하세요. 저는 사라예요. 미국 사람이에요. 금오공과대학교 학생이에요. 컴퓨터공학과예요. 만나서 반갑습니다.',
      'Hello. I am Sarah. I am American. I am a student at Kumoh National Institute of Technology. I am in the Computer Engineering department. Nice to meet you.',
      [
        { korean: '저는 사라예요', english: 'name → Sarah' },
        { korean: '미국 사람이에요', english: 'country → USA' },
        { korean: '금오공과대학교 학생이에요', english: 'role → student at Kumoh' },
        { korean: '컴퓨터공학과예요', english: 'major → Computer Engineering' },
      ],
      [ACT.reading],
    ),
    createContentItem(
      'Comprehension questions',
      'answer in Korean',
      'Answer each question in one short sentence based on the paragraph above.',
      'sentence',
      'Q1: 이름이 뭐예요? · Q2: 어디에서 왔어요? · Q3: 학생이에요? · Q4: 무슨 학과예요?',
      'Q1: What is your name? Q2: Where are you from? Q3: Are you a student? Q4: What is your department?',
      [
        { korean: 'A1: 사라예요.', english: 'I am Sarah.' },
        { korean: 'A2: 미국에서 왔어요.', english: 'I am from the USA.' },
        { korean: 'A3: 네, 학생이에요.', english: 'Yes, I am a student.' },
        { korean: 'A4: 컴퓨터공학과예요.', english: 'Computer Engineering.' },
      ],
      [ACT.reading],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 9 — Listening & Speaking
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'First-meeting dialogue (polite)',
      'classmate to classmate',
      'Two classmates meet at Kumoh on the first day. Read along, then redo with your own name and country.',
      'conversation',
      'A: 안녕하세요. 처음 뵙겠습니다.\nB: 안녕하세요.\nA: 저는 김민수예요. 한국 사람이에요.\nB: 저는 사라예요. 미국에서 왔어요.\nA: 만나서 반가워요. 사라 씨도 학생이에요?\nB: 네, 저도 학생이에요. 컴퓨터공학과예요.\nA: 와, 저도 컴퓨터공학과예요!',
      'A: Hello. How do you do.\nB: Hello.\nA: I am Kim Minsu. I am Korean.\nB: I am Sarah. I am from the USA.\nA: Nice to meet you. Are you a student too, Sarah?\nB: Yes, I am also a student. Computer Engineering.\nA: Wow, I am also Computer Engineering!',
      [
        { korean: '처음 뵙겠습니다', english: 'how do you do (first meeting)' },
        { korean: '~씨도 ~이에요?', english: 'are you also ~?' },
        { korean: '저도', english: 'me too' },
      ],
      [ACT.listening],
    ),
    createContentItem(
      'First-meeting dialogue (formal)',
      'student to professor',
      'A student meets their professor for the first time. Notice the use of -ㅂ니다, 교수님, and 잘 부탁드립니다.',
      'conversation',
      'A (학생): 안녕하십니까, 교수님. 처음 뵙겠습니다.\nB (교수님): 네, 안녕하세요.\nA: 저는 사라입니다. 미국에서 왔습니다. 앞으로 잘 부탁드립니다.\nB: 반갑습니다, 사라 씨. 열심히 공부합시다.\nA: 네, 감사합니다.',
      'A (student): Hello, Professor. How do you do.\nB (professor): Yes, hello.\nA: I am Sarah. I came from the USA. I look forward to working with you.\nB: Nice to meet you, Sarah. Let us study hard.\nA: Yes, thank you.',
      [
        { korean: '교수님', english: 'Professor (honorific)' },
        { korean: '잘 부탁드립니다', english: 'I will rely on your guidance' },
        { korean: '~합시다', english: 'let us ~' },
      ],
      [ACT.listening],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 10 — Writing
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Model self-introduction',
      'writing template',
      'Use this template to write your own self-introduction in 3-5 sentences. Fill in YOUR name, YOUR country, YOUR role/major.',
      'sentence',
      '안녕하세요. 저는 [이름]이에요/예요. [국적] 사람이에요. [역할]이에요/예요. 만나서 반갑습니다.',
      'Hello. I am [name]. I am [nationality]. I am a [role]. Nice to meet you.',
      [
        { korean: '[이름]', english: 'your name' },
        { korean: '[국적] 사람', english: 'your nationality + 사람' },
        { korean: '[역할]', english: 'your role (student / teacher / worker)' },
      ],
      [ACT.writing],
    ),
    createContentItem(
      'Writing prompt',
      'your turn',
      'Write your own 3-5 sentence self-introduction in Korean. Include name, country, role, and one extra fact.',
      'sentence',
      'Example: 안녕하세요. 저는 김지수예요. 한국 사람이에요. 금오공과대학교 학생이에요. 영어를 좋아해요. 만나서 반가워요.',
      'Example: Hello. I am Kim Jisu. I am Korean. I am a student at Kumoh. I like English. Nice to meet you.',
      null,
      [ACT.writing],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 11 — Culture Note
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      'Bowing (인사)',
      'how to bow',
      'In Korea, you greet people with a small bow from the waist. The depth depends on age/status: classmate ≈ 15°, professor ≈ 30°, executive ≈ 45°.',
      'sentence',
      '한국에서는 처음 만날 때 가볍게 인사를 하면서 고개를 숙여요. 나이가 많은 분께는 더 깊이 숙여요.',
      'In Korea, when you meet someone for the first time, you greet them while lightly bowing. With older people you bow more deeply.',
      [
        { korean: '가볍게 인사', english: 'a light greeting' },
        { korean: '고개를 숙여요', english: 'lower your head / bow' },
        { korean: '나이가 많은 분', english: 'an older person (honorific)' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      '씨 vs 님',
      'Mr/Ms vs sir/madam',
      '씨 (after the full name or first name) is for peers and below. 님 (after a title) is for seniors. NEVER call your professor "민수 씨" — they are 교수님.',
      'sentence',
      '사라 씨 (peer) / 교수님 (senior) / 사장님 (CEO/boss)',
      'Different titles for different status levels.',
      [
        { korean: '사라 씨', english: '"Sarah" — to a peer' },
        { korean: '교수님', english: '"Professor" — to a senior' },
        { korean: '사장님', english: '"President/CEO" — to your boss' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Receiving a business card (명함)',
      'two hands',
      'Always receive a business card with TWO hands. Read it briefly before putting it away. Never write on it in front of the person.',
      'sentence',
      '명함을 받을 때는 두 손으로 받아요.',
      'When you receive a business card, take it with two hands.',
      [
        { korean: '명함', english: 'business card' },
        { korean: '두 손으로', english: 'with two hands' },
        { korean: '받아요', english: 'receive' },
      ],
      [ACT.culture],
    ),
    createContentItem(
      'Age (나이) and 존댓말',
      'why age matters',
      'In Korea, age determines the politeness level. Korean speakers often ask each other\'s age early so they know which form (formal/polite/casual) to use.',
      'sentence',
      '나이가 어떻게 되세요? — 스물한 살이에요.',
      'How old are you? — I am 21.',
      null,
      [ACT.culture],
    ),

    // ────────────────────────────────────────────────────────────────────
    // Activity 12 — Task / Consolidation
    // ────────────────────────────────────────────────────────────────────
    createContentItem(
      '과제: First day at Kumoh',
      'consolidation task',
      'Roleplay: You walk into your first class at 금오공과대학교. A Korean classmate sits next to you. Use every skill from this lesson — greet, introduce yourself, ask, answer, farewell.',
      'conversation',
      '[Classroom, 금오공과대학교]\nClassmate: 안녕하세요. 처음 뵙겠습니다.\nYou: [greet + introduce yourself]\nClassmate: 어디에서 왔어요?\nYou: [say your country]\nClassmate: 학생이에요?\nYou: [confirm + add your major]\nClassmate: 만나서 반가워요.\nYou: [farewell]',
      'Use everything you learned. The AI tutor will play the classmate and prompt you turn by turn.',
      [
        { korean: 'greet', english: '안녕하세요.' },
        { korean: 'introduce', english: '저는 [name]이에요/예요.' },
        { korean: 'origin', english: '[country]에서 왔어요.' },
        { korean: 'role', english: '학생이에요. [major]이에요/예요.' },
        { korean: 'farewell', english: '만나서 반가워요. 또 봐요.' },
      ],
      [ACT.task],
    ),
    createContentItem(
      'Stretch goal: correct an assumption',
      'use 아니에요',
      'In the same scene, your classmate guesses wrong about your country or major. Correct them politely using N이/가 아니에요.',
      'conversation',
      'Classmate: 일본에서 왔어요?\nYou: 아니요, 일본 사람이 아니에요. 미국에서 왔어요.\nClassmate: 아, 죄송해요. 미국 어디에서 왔어요?',
      'Classmate: Are you from Japan?\nYou: No, I am not Japanese. I am from the USA.\nClassmate: Oh, sorry. Where in the USA?',
      [
        { korean: '아니요, ~이/가 아니에요', english: 'No, I am not ~' },
      ],
      [ACT.task],
    ),
  ],
};

module.exports = lesson;
