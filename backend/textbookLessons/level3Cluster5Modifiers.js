// Level 3 Cluster — Noun-modifying verbs/adjectives
// Source: TTMIK Workbook Level 3, Lessons 13, 14.

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
  orientation: 'l3c5-orientation',
  patterns: 'l3c5-patterns',
  adjModifier: 'l3c5-adj-mod',
  verbPresent: 'l3c5-verb-present',
  verbPast: 'l3c5-verb-past',
  verbFuture: 'l3c5-verb-future',
  irregulars: 'l3c5-irregulars',
  reading: 'l3c5-reading',
  speaking: 'l3c5-speaking',
  writing: 'l3c5-writing',
  task: 'l3c5-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Build noun modifiers: adjective + N, verb (past/present/future) + N.', 'Speak in complex descriptive sentences.'],
    task: 'Imagine describing a friend in detail — you need all 4 modifier forms.' },
  { id: ACT.patterns, section: 'Patterns Overview', title: '4 modifier patterns',
    goals: ['Recognize 4 modifier forms by part-of-speech and tense.'],
    task: 'Match each to function.' },
  { id: ACT.adjModifier, section: 'Adjective', title: 'A-(으)ㄴ + N — descriptive',
    goals: ['Use adjective modifiers.', 'Handle ㅂ-irregular: 어렵 → 어려운.'],
    task: 'Make 3 adjective + N phrases.' },
  { id: ACT.verbPresent, section: 'Verb Present', title: 'V-는 + N — currently V-ing',
    goals: ['Use action verb + 는 + N for ongoing action.'],
    task: 'Make 3 present-action modifiers.' },
  { id: ACT.verbPast, section: 'Verb Past', title: 'V-(으)ㄴ + N — past action',
    goals: ['Use action verb + (으)ㄴ + N for completed action.'],
    task: 'Make 3 past-action modifiers.' },
  { id: ACT.verbFuture, section: 'Verb Future', title: 'V-(으)ㄹ + N — future / purpose',
    goals: ['Use action verb + (으)ㄹ + N for "to V" / future.'],
    task: 'Make 3 future-modifier phrases.' },
  { id: ACT.irregulars, section: 'Irregulars', title: 'Special: 있다/없다 use V-는',
    goals: ['Know 있다/없다 use V-는 form (not A-ㄴ).', 'Know ㅂ-irregulars: 어렵 → 어려운.'],
    task: 'Spot 3 irregulars.' },
  { id: ACT.reading, section: 'Reading', title: '읽기 — Descriptive paragraph',
    goals: ['Read a paragraph rich with modifiers.'],
    task: 'Label each modifier type.' },
  { id: ACT.speaking, section: 'Speaking', title: '말하기 — Describe a person',
    goals: ['Use all 4 modifier types in describing someone.'],
    task: 'Describe a person.' },
  { id: ACT.writing, section: 'Writing', title: '쓰기 — Character profile',
    goals: ['Write a 5-6 sentence character description.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: '과제 — Describe a friend',
    goals: ['Combine all 4 modifier types.'],
    task: 'Describe a friend in detail.' },
];

const lesson = {
  title: 'Level 3 · Modifiers (-(으)ㄴ + N for adjectives, -는 + N for verbs)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'building-modifiers', label: 'Building modifiers', goal: 'Convert verb/adjective into right modifying form.' },
    { id: 'tense-modifier', label: 'Tense-modifier choice', goal: 'Pick (으)ㄴ vs 는 vs (으)ㄹ by tense.' },
    { id: 'irregular-modifier', label: 'Irregular modifier', goal: 'Handle ㅂ-irregular and 있다 patterns.' },
  ],
  relatedPools: ['pos-adjectives-1', 'pos-verbs-1'],
  content: [
    createContentItem('Cluster goal', 'modifiers', 'By end: use all 4 modifier forms (adj-ㄴ, V-는, V-ㄴ, V-ㄹ) for rich descriptions.', 'word', 'A-(으)ㄴ + N / V-는 + N / V-(으)ㄴ + N / V-(으)ㄹ + N', 'Four forms.', null, [ACT.orientation]),

    createContentItem('A-(으)ㄴ + N', 'adj modifier', 'a [adj] N', 'word', '예쁜 꽃', 'pretty flower.', null, [ACT.patterns]),
    createContentItem('V-는 + N', 'V-ing modifier', 'a [V-ing] N (now)', 'word', '공부하는 학생', 'studying student.', null, [ACT.patterns]),
    createContentItem('V-(으)ㄴ + N', 'past V modifier', 'a [V-ed] N', 'word', '먹은 음식', 'food I ate.', null, [ACT.patterns]),
    createContentItem('V-(으)ㄹ + N', 'future V modifier', 'a [V-to-be] N', 'word', '읽을 책', 'book to read.', null, [ACT.patterns]),

    createContentItem('A-(으)ㄴ + N — adjective modifier', 'adj', 'Attach -ㄴ (vowel) or -은 (consonant) to adjective stem.', 'sentence', '예쁜 옷을 샀어요.', 'I bought a pretty outfit.',
      [
        { korean: '예쁘 + ㄴ', english: 'pretty (vowel) → 예쁜' },
        { korean: '좋 + 은', english: 'good (consonant) → 좋은' },
        { korean: '어렵 + 운', english: 'hard (ㅂ-irreg) → 어려운' },
      ],
      [ACT.adjModifier]),

    createContentItem('V-는 + N — currently V-ing', 'present action', 'Attach -는 to verb stem.', 'sentence', '한국어를 가르치는 선생님이 친절해요.', 'The teacher who teaches Korean is kind.',
      [
        { korean: '가르치 + 는', english: 'teaching' },
        { korean: '먹 + 는', english: 'eating' },
        { korean: '공부하 + 는', english: 'studying' },
      ],
      [ACT.verbPresent]),

    createContentItem('V-(으)ㄴ + N — past action', 'past', 'Attach -ㄴ (vowel) or -은 (consonant) to verb stem for past.', 'sentence', '어제 만난 친구는 외국인이에요.', 'The friend I met yesterday is a foreigner.',
      [
        { korean: '만나 + ㄴ', english: 'met (vowel)' },
        { korean: '먹 + 은', english: 'ate (consonant)' },
        { korean: '가 + ㄴ', english: 'went' },
      ],
      [ACT.verbPast]),

    createContentItem('V-(으)ㄹ + N — future/purpose', 'future', 'Attach -ㄹ (vowel) or -을 (consonant) for "N to V".', 'sentence', '읽을 책이 많아요.', 'I have many books to read.',
      [
        { korean: '읽 + 을', english: 'to read' },
        { korean: '먹 + 을', english: 'to eat' },
        { korean: '갈 + ㄹ → 갈', english: 'to go' },
      ],
      [ACT.verbFuture]),

    createContentItem('있다/없다 — use V-는', 'irregular 1', '있다 and 없다 behave like verbs — use V-는, not A-(으)ㄴ.', 'sentence', '재미있는 영화 (NOT 재미있은)', 'fun movie.',
      [{ korean: '재미있 + 는', english: '재미있는' }, { korean: '맛있 + 는', english: '맛있는' }, { korean: '없 + 는', english: '없는' }], [ACT.irregulars]),
    createContentItem('ㅂ-irregular adjectives', 'irregular 2', 'ㅂ-irreg adjectives drop ㅂ + add 운.', 'sentence', '어려운 시험 · 매운 음식 · 추운 날씨', 'hard exam · spicy food · cold weather.',
      [{ korean: '어렵 → 어려운', english: 'hard' }, { korean: '맵 → 매운', english: 'spicy' }, { korean: '쉽 → 쉬운', english: 'easy' }], [ACT.irregulars]),

    createContentItem('Descriptive paragraph', 'reading',
      'Read this person-description.',
      'sentence',
      '어제 만난 친구는 한국어를 가르치는 선생님이에요. 그분이 입은 옷이 너무 예뻤어요. 그분은 항상 새로 나온 책을 읽는 분이에요. 다음에 같이 읽을 책을 추천해 줬어요. 재미있는 사람이에요.',
      'The friend I met yesterday is a teacher who teaches Korean. The clothes she wore were so pretty. She always reads newly released books. She recommended a book for us to read next. She is an interesting person.',
      [
        { korean: '만난', english: '(V-ㄴ past)' },
        { korean: '가르치는', english: '(V-는 present)' },
        { korean: '입은', english: '(V-ㄴ past)' },
        { korean: '예쁜', english: '(A-ㄴ)' },
        { korean: '새로 나온', english: '(V-ㄴ past)' },
        { korean: '읽는', english: '(V-는 present)' },
        { korean: '읽을', english: '(V-ㄹ future)' },
        { korean: '재미있는', english: '(있다 → V-는)' },
      ],
      [ACT.reading]),

    createContentItem('Describe a person', 'speaking',
      'Use 4 modifier forms.',
      'sentence', '제 친구는 한국어를 잘하는 사람이에요. 작년에 만난 친구인데 매일 운동하는 모습이 멋있어요. 다음에 같이 갈 카페가 있어요.',
      'My friend is someone who is good at Korean. We met last year. The way they exercise daily is cool. There is a cafe we will go to.',
      null, [ACT.speaking]),

    createContentItem('Character profile', 'writing',
      'Sample paragraph.',
      'sentence',
      '제가 좋아하는 한국 배우는 김민수예요. 작년에 본 드라마에서 처음 봤어요. 그분이 연기하는 모습이 정말 자연스러웠어요. 그분이 출연한 영화도 모두 봤어요. 다음 작품도 꼭 볼 거예요. 친절한 사람으로 보여요.',
      'My favorite Korean actor is Kim Minsu. First saw him in a drama last year. His acting was natural. I have watched all his films. I will definitely watch his next work. He seems like a kind person.',
      null, [ACT.writing]),

    createContentItem('과제: Describe a friend', 'task',
      'Roleplay: Describe your closest friend using all 4 modifier types.',
      'conversation',
      'Tutor: 가장 친한 친구에 대해 말씀해 주세요.\nYou: 제 친구는 ~ 는 사람이에요. (V-는)\n3년 전에 만난 친구예요. (V-ㄴ)\nTutor: 어떤 분이세요?\nYou: 예쁜 / 친절한 / 재미있는 분이에요. (A-ㄴ)\nTutor: 같이 뭐 하세요?\nYou: 다음에 같이 갈 카페가 있어요. (V-ㄹ)',
      'AI tutor will ask follow-ups.',
      [
        { korean: 'A-(으)ㄴ N', english: 'adj' },
        { korean: 'V-는 N', english: 'present' },
        { korean: 'V-(으)ㄴ N', english: 'past' },
        { korean: 'V-(으)ㄹ N', english: 'future' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
