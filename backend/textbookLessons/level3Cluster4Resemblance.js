// Level 3 Cluster — Comparison & Resemblance
// Source: TTMIK Workbook Level 3, Lessons 1, 5, 8, 9.

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
  orientation: 'l3c4-orientation',
  patterns: 'l3c4-patterns',
  tooMuch: 'l3c4-too',
  approx: 'l3c4-approx',
  like: 'l3c4-like',
  seem: 'l3c4-seem',
  reading: 'l3c4-reading',
  speaking: 'l3c4-speaking',
  writing: 'l3c4-writing',
  task: 'l3c4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Express "too / about / like / seems" — 4 native-speech essentials.'],
    task: 'Imagine describing a vague memory or guess — you need these patterns.' },
  { id: ACT.patterns, section: 'Patterns Overview', title: 'Four resemblance patterns',
    goals: ['Map each pattern to function.'],
    task: 'Match patterns to meanings.' },
  { id: ACT.tooMuch, section: 'Too / Very', title: '너무 — too / very (excessive)',
    goals: ['Use 너무 + adjective to mean "too".'],
    task: 'Make 3 "too" sentences.' },
  { id: ACT.approx, section: 'About', title: '-쯤 / 정도 / 약 — approximately',
    goals: ['쯤 after number; 정도 after measure; 약 before number.'],
    task: 'Express 3 approximate quantities.' },
  { id: ACT.like, section: 'Like N', title: 'N 같다 — to be like N',
    goals: ['Use N + 같다 for resemblance to a noun.'],
    task: 'Make 3 resemblance sentences.' },
  { id: ACT.seem, section: 'Seems', title: '-(으)ㄴ/는/(으)ㄹ 것 같다 — seems',
    goals: ['Use to soften statements based on inference.'],
    task: 'Soften 3 statements.' },
  { id: ACT.reading, section: 'Reading', title: '읽기 — A vague description',
    goals: ['Read a paragraph with all 4 patterns.'],
    task: 'Identify each.' },
  { id: ACT.speaking, section: 'Speaking', title: '말하기 — Estimating + softening',
    goals: ['Produce vague-but-natural speech.'],
    task: 'Describe a memory with estimates.' },
  { id: ACT.writing, section: 'Writing', title: '쓰기 — A guessing essay',
    goals: ['Write 5-6 sentences with hedges.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: '과제 — Describe a vague memory',
    goals: ['Combine all 4 patterns.'],
    task: 'Tell a story with hedges.' },
];

const lesson = {
  title: 'Level 3 · Comparison & Resemblance (너무 / 쯤·정도·약 / 같다 / 것 같아요)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'softening-statement', label: 'Softening statement', goal: 'Use -(으)ㄴ/는/(으)ㄹ 것 같아요.' },
    { id: 'estimating', label: 'Estimating', goal: 'Use 쯤/정도/약.' },
    { id: 'comparing-likeness', label: 'Comparing likeness', goal: 'Use N 같다.' },
  ],
  relatedPools: ['pos-adverbs-1', 'pos-adjectives-1'],
  content: [
    createContentItem('단원 목표', 'danwon mokpyo', 'By end: express too / about / like / seems naturally.', 'word', '너무 / 쯤·정도·약 / 같다 / ㄴ 것 같다', 'Four patterns.', null, [ACT.orientation]),

    createContentItem('너무', 'neomu', 'too / very', 'word', '너무 매워요.', 'Too spicy.', null, [ACT.patterns]),
    createContentItem('-쯤', '-jjeum', 'about (after num)', 'word', '3시쯤 만나요.', 'Meet around 3.', null, [ACT.patterns]),
    createContentItem('정도', 'jeongdo', 'about / extent', 'word', '한 시간 정도.', 'About an hour.', null, [ACT.patterns]),
    createContentItem('약', 'yak', 'about (before num)', 'word', '약 5만 원.', 'About 50,000.', null, [ACT.patterns]),
    createContentItem('N 같다', 'gatda', 'be like N', 'word', '꿈 같아요.', 'Like a dream.', null, [ACT.patterns]),
    createContentItem('-(으)ㄴ/는 것 같다', 'geot gatda', 'seems', 'word', '비가 오는 것 같아요.', 'Seems to rain.', null, [ACT.patterns]),

    createContentItem('너무 + A — too A', 'excessive', 'Place 너무 before adjective.', 'sentence', '오늘 너무 더워요.', 'Too hot today.',
      [{ korean: '너무 매워요', english: 'too spicy' }, { korean: '너무 비싸요', english: 'too expensive' }], [ACT.tooMuch]),
    createContentItem('너무 vs 정말', 'too vs really', '너무 = "too / excessive" (often negative). 정말 = "really" (neutral).', 'sentence', '너무 매워요 (too spicy, bad) vs 정말 매워요 (really spicy, observation).', 'Nuance.',
      null, [ACT.tooMuch]),

    createContentItem('-쯤 — about (after number)', 'approx', 'Attach -쯤 directly to a number/time.', 'sentence', '학교까지 30분쯤 걸려요.', '~30 min to school.',
      [{ korean: '3시쯤', english: 'around 3' }, { korean: '만 원쯤', english: '~10,000 won' }], [ACT.approx]),
    createContentItem('N 정도 — about (with measure)', 'approx 2', '정도 follows a measure or quantity.', 'sentence', '한 시간 정도 걸려요.', 'Takes about an hour.',
      null, [ACT.approx]),
    createContentItem('약 N — about (before number)', 'approx 3', '약 goes BEFORE the number. More formal.', 'sentence', '약 5만 원이에요.', 'About 50,000 won.',
      null, [ACT.approx]),

    createContentItem('N 같다 — be like N', 'resemblance', 'Express that something resembles N.', 'sentence', '제 동생은 가수 같아요.', 'My sibling is like a singer.',
      [{ korean: '꿈 같아요', english: 'like a dream' }, { korean: '천사 같아요', english: 'like an angel' }], [ACT.like]),
    createContentItem('Difference from 것 같다', 'N 같다 vs 것 같다', 'N 같다 = direct comparison. 것 같다 = inference / seems.', 'sentence', '가수 같아요 (looks like a singer) vs 가수인 것 같아요 (seems to be a singer).', 'Direct vs inferred.',
      null, [ACT.like]),

    createContentItem('A-(으)ㄴ 것 같다 / V-는 것 같다 — seems', 'inference', 'Express inference based on evidence. Forms by part-of-speech + tense.', 'sentence', '저 사람은 한국 사람인 것 같아요.', 'That person seems Korean.',
      [
        { korean: 'A-(으)ㄴ 것 같다', english: 'adjective' },
        { korean: 'V-는 것 같다', english: 'verb present' },
        { korean: 'V-(으)ㄴ 것 같다', english: 'verb past' },
        { korean: 'V-(으)ㄹ 것 같다', english: 'verb future' },
        { korean: 'N인 것 같다', english: 'noun + copula' },
      ],
      [ACT.seem]),
    createContentItem('Stacking with 같다 family', 'levels of certainty', '정말 같아요 (really like) > ~ㄴ 것 같아요 (seems) > ~인 듯해요 (appears).', 'sentence', '한국 사람 같아요 (looks Korean) > 한국 사람인 것 같아요 (seems Korean).', 'Levels.',
      null, [ACT.seem]),

    createContentItem('Vague description', 'reading',
      'Read this estimate-heavy paragraph.',
      'sentence',
      '어제 친구를 만났는데 그 친구가 좀 변한 것 같아요. 키도 약 5cm쯤 큰 것 같고 살도 좀 빠진 것 같아요. 한 1년 정도 못 봤는데 정말 모델 같았어요. 너무 좋아 보여서 부럽기까지 했어요.',
      'Saw a friend yesterday — seems they\'ve changed a bit. Got about 5cm taller and seems thinner. Hadn\'t seen them for about a year — really like a model. Looked so good I was even jealous.',
      [
        { korean: '약 ~쯤', english: 'about' },
        { korean: '정도', english: 'extent' },
        { korean: '모델 같다', english: 'like a model' },
        { korean: '~ ㄴ 것 같다', english: 'seems' },
        { korean: '너무', english: 'too' },
      ],
      [ACT.reading]),

    createContentItem('Estimate speech', 'speaking',
      'Hedge with multiple patterns.',
      'sentence', '점심을 한 시간쯤 걸리는 식당에서 먹었어요. 너무 매웠지만 한국 사람들은 잘 먹는 것 같아요.',
      'I ate at a restaurant about an hour away. Too spicy, but Koreans seem to handle it well.',
      null, [ACT.speaking]),

    createContentItem('Guessing essay', 'writing',
      'Sample paragraph.',
      'sentence',
      '한국에 처음 왔을 때 모든 게 너무 신기했어요. 사람들이 약 2배쯤 빠르게 걷는 것 같았어요. 음식도 처음에는 너무 매운 듯했지만 1년 정도 지난 후에는 익숙해진 것 같아요. 지금은 한국이 마치 고향 같아요.',
      'First in Korea everything seemed too new. People seemed to walk twice as fast. Food seemed too spicy at first but after a year, I seem used to it. Now Korea feels like a hometown.',
      null, [ACT.writing]),

    createContentItem('과제: Vague memory', 'task',
      'Roleplay: Tell the AI tutor a vague memory using all 4 patterns.',
      'conversation',
      'Tutor: 어떤 추억이에요?\nYou: 한 ~ 년쯤 전이었던 것 같아요. ~ 가 정말 ~ 같았어요.\nTutor: 어떤 분위기였어요?\nYou: 너무 ~ ㄴ/는 것 같아서 ~\nTutor: 그래서 어떻게 됐어요?\nYou: 약 ~분 후에 ~ ㄴ 것 같아요.',
      'AI tutor will play the listener.',
      [
        { korean: '너무', english: 'too' },
        { korean: '~ 쯤 / 정도 / 약', english: 'about' },
        { korean: 'N 같다', english: 'like N' },
        { korean: '~ ㄴ 것 같다', english: 'seems' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
