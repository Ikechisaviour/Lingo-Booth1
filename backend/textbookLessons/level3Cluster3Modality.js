// Level 3 Cluster — Modality & Possibility
// Source: TTMIK Workbook Level 3, Lessons 4, 17, 18, 20, 22.

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
  orientation: 'l3c3-orientation',
  patterns: 'l3c3-patterns',
  suggest: 'l3c3-suggest',
  purpose: 'l3c3-purpose',
  only: 'l3c3-only',
  evenIf: 'l3c3-even-if',
  might: 'l3c3-might',
  reading: 'l3c3-reading',
  speaking: 'l3c3-speaking',
  writing: 'l3c3-writing',
  task: 'l3c3-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Express modality: suggest / purpose / only / even-if / might.', 'Use 5 advanced patterns naturally.'],
    task: 'Imagine a job interview — you must hedge, suggest, and qualify.' },
  { id: ACT.patterns, section: 'Patterns Overview', title: 'Five modality patterns',
    goals: ['Map each pattern to its function.'],
    task: 'Match each to English meaning.' },
  { id: ACT.suggest, section: 'Suggest', title: '-(으)ㄹ까요? — shall we?',
    goals: ['Suggest action or wonder aloud.'],
    task: 'Make 3 suggestions.' },
  { id: ACT.purpose, section: 'Purpose', title: 'N을/를 위해서 / V-기 위해서 — in order to',
    goals: ['Express purpose with noun + 위해서 or verb-stem + 기 위해서.'],
    task: 'State 3 purposes.' },
  { id: ACT.only, section: 'Only', title: '-밖에 + negation — nothing but',
    goals: ['Express "only" with negative-form verb.'],
    task: 'Use 밖에 in 3 contexts.' },
  { id: ACT.evenIf, section: 'Even if', title: '-아/어도 — even if / even though',
    goals: ['Acknowledge condition + state contrary action.'],
    task: 'Make 3 even-if sentences.' },
  { id: ACT.might, section: 'Might', title: '-(으)ㄹ 수도 있어요 — it might',
    goals: ['Express uncertain possibility.'],
    task: 'Hedge 3 statements.' },
  { id: ACT.reading, section: 'Reading', title: '읽기 — A modal paragraph',
    goals: ['Read a paragraph with all 5 patterns.'],
    task: 'Identify each pattern.' },
  { id: ACT.speaking, section: 'Speaking', title: '말하기 — Modal speech',
    goals: ['Produce flowing modal speech.'],
    task: 'Tell a 5-step hypothetical.' },
  { id: ACT.writing, section: 'Writing', title: '쓰기 — Hypothetical plan',
    goals: ['Write 5-6 sentences with hypotheticals.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: '과제 — Job-interview hedging',
    goals: ['Combine 5 patterns in interview answers.'],
    task: 'Mock interview with modality.' },
];

const lesson = {
  title: 'Level 3 · Modality & Possibility (-ㄹ까요? / 위해 / -밖에 / -아/어도 / -ㄹ 수도)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'expressing-modality', label: 'Expressing modality', goal: 'Pick right modal for shall/for/only/even if/might.' },
    { id: 'hedging', label: 'Hedging an answer', goal: 'Use -(으)ㄹ 수도 있어요 to soften.' },
    { id: 'stating-purpose', label: 'Stating purpose', goal: 'Use V-기 위해서.' },
  ],
  relatedPools: ['pos-adverbs-1'],
  content: [
    createContentItem('단원 목표', 'danwon mokpyo', 'By end: use 5 advanced modal patterns in interview-quality speech.', 'word', '~ㄹ까요? / 위해 / 밖에 / ~아/어도 / ~ㄹ 수도', 'Five patterns.', null, [ACT.orientation]),

    createContentItem('-(으)ㄹ까요?', '-(eu)lkkayo', 'shall we?', 'word', '같이 갈까요?', 'Shall we go?', null, [ACT.patterns]),
    createContentItem('N을/를 위해서', 'wihaeseo', 'for the sake of', 'word', '건강을 위해서.', 'For health.', null, [ACT.patterns]),
    createContentItem('-밖에 + 부정', 'bakke', 'only (lit. nothing but)', 'word', '천 원밖에 없어요.', 'Only 1,000 won.', null, [ACT.patterns]),
    createContentItem('-아/어도', '-ado/eodo', 'even if', 'word', '비가 와도.', 'Even if it rains.', null, [ACT.patterns]),
    createContentItem('-(으)ㄹ 수도 있어요', '-(eu)l sudo isseoyo', 'might', 'word', '늦을 수도 있어요.', 'Might be late.', null, [ACT.patterns]),

    createContentItem('-(으)ㄹ까요? — shall we?', 'suggest', 'Suggest action or wonder.', 'sentence', '점심에 같이 먹을까요?', 'Shall we eat together at lunch?',
      [{ korean: '먹 + 을까요?', english: 'shall we eat?' }, { korean: '갈까요?', english: 'shall we go?' }, { korean: 'wondering', english: '비가 올까요? (will it rain?)' }], [ACT.suggest]),
    createContentItem('Three uses', 'multifunctional', '1) Suggest. 2) Wonder. 3) Offer help.', 'sentence', '제가 도와드릴까요? (offer help)', 'Shall I help?',
      null, [ACT.suggest]),

    createContentItem('V-기 위해서 / N을/를 위해서 — for/to', 'purpose', 'Express purpose. V + 기 위해서 for verbs; N + 을/를 위해서 for nouns.', 'sentence', '시험에 합격하기 위해서 매일 공부해요.', 'I study daily to pass the exam.',
      [
        { korean: '~기 위해서', english: 'to V' },
        { korean: 'N을/를 위해서', english: 'for the sake of N' },
        { korean: 'casual: ~려고', english: 'in order to (shorter)' },
      ],
      [ACT.purpose]),

    createContentItem('N + 밖에 + negation', 'only (negative-form)', 'Pair 밖에 with negative verb. Means "only / nothing but".', 'sentence', '저는 한국어밖에 못해요.', 'I can only speak Korean.',
      [{ korean: '밖에 + 못해요', english: 'only ~ can' }, { korean: '밖에 + 없어요', english: 'only ~ have' }, { korean: '천 원밖에 없어요', english: 'only 1000 won' }], [ACT.only]),
    createContentItem('Compare with N만', '만 vs 밖에', 'N만 = "only N" (positive). N밖에 + neg = "only N" (with negative nuance).', 'sentence', '한국어만 해요 = 한국어밖에 못해요.', 'Both mean "only Korean" — different tone.',
      null, [ACT.only]),

    createContentItem('V/A-아/어도 — even if / though', 'concession', 'Acknowledge condition + state contrary action.', 'sentence', '비가 와도 운동을 해요.', 'Even if it rains, I exercise.',
      [{ korean: '오 + 아도 → 와도', english: 'even if rains' }, { korean: '먹 + 어도', english: 'even if eat' }], [ACT.evenIf]),
    createContentItem('vs -지만', '아도 vs 지만', '아/어도 = hypothetical "even if". 지만 = factual "but".', 'sentence', '비가 와도 갈 거예요 (hypothetical) vs 비가 오지만 갑니다 (factual).', 'Different feel.',
      null, [ACT.evenIf]),

    createContentItem('V-(으)ㄹ 수도 있어요 — might', 'possibility', 'Express uncertain possibility.', 'sentence', '오늘은 야근할 수도 있어요.', 'Might work overtime today.',
      [{ korean: 'V-(으)ㄹ 수도 있다', english: 'might' }, { korean: 'vs ~ㄹ 거예요', english: 'less certain' }, { korean: 'past: V-았/었을 수도 있다', english: 'might have' }], [ACT.might]),
    createContentItem('Three certainty levels', 'spectrum', '확실해요 (sure) > ~ㄹ 거예요 (likely) > ~ㄹ 수도 있어요 (might).', 'sentence', '갈 거예요 (will go) vs 갈 수도 있어요 (might go).', 'Levels of certainty.',
      null, [ACT.might]),

    createContentItem('A modal paragraph', 'reading',
      'Read this hypothetical.',
      'sentence',
      '내일 회의가 있는데 같이 가실까요? 회의에 늦으면 안 되니까 일찍 출발하기 위해서 8시에 만나요. 비가 와도 회의는 진행될 거예요. 그런데 길이 막힐 수도 있으니까 지하철로 갑시다. 저는 시간이 30분밖에 없어서 빨리 도착해야 해요.',
      'There is a meeting tomorrow — shall we go together? We cannot be late so let us meet at 8 to leave early. Even if it rains, the meeting will go on. But traffic might be bad, so let us take the subway. I only have 30 minutes so I need to arrive quickly.',
      [
        { korean: '~ ㄹ까요?', english: 'shall we?' },
        { korean: '위해서', english: 'in order to' },
        { korean: '~아/어도', english: 'even if' },
        { korean: '~ㄹ 수도', english: 'might' },
        { korean: '~밖에', english: 'only' },
      ],
      [ACT.reading]),

    createContentItem('Speaking — hypothetical', 'speaking',
      'Use all 5 modal patterns.',
      'sentence', '내일 시험이 있는데 만나서 같이 공부할까요? 시험을 잘 보기 위해서 미리 준비해야 해요. 1시간밖에 없어도 도움이 될 수도 있어요.',
      'Tomorrow exam — shall we study together? To do well, we should prepare. Even if only an hour, might help.',
      null, [ACT.speaking]),

    createContentItem('Hypothetical plan', 'writing',
      'Sample paragraph.',
      'sentence',
      '내일 여행 갈까요? 좋은 추억을 만들기 위해서 일찍 출발해요. 시간이 많지 않아도 즐거울 거예요. 비가 올 수도 있지만 우산 가져가면 돼요. 우리 돈도 많지 않아요. 그래서 점심은 김밥밖에 못 사 먹어요. 그래도 괜찮아요.',
      'Shall we travel tomorrow? Leave early to make good memories. Even with little time, will be fun. Might rain but bring umbrella. We do not have much money — can only afford gimbap for lunch. Still OK.',
      null, [ACT.writing]),

    createContentItem('과제: Interview hedging', 'task',
      'Roleplay: Mock job interview using all 5 modal patterns.',
      'conversation',
      'Tutor: 야근 가능하세요?\nYou: ~ ㄹ 수도 있어요. 가족을 위해서 ~\nTutor: 한국어 실력은요?\nYou: 아직 한국어밖에 잘 못해도 ~\nTutor: 다른 회사도 지원하셨어요?\nYou: ~ ㄹ까요? 했지만 ~ㄹ 수도 ~\nTutor: 마지막 한 말씀.\nYou: 회사를 위해서 ~',
      'AI tutor will play interviewer.',
      [
        { korean: '~ ㄹ까요?', english: 'shall we?' },
        { korean: '~ 위해서', english: 'in order to' },
        { korean: '~ 밖에 + neg', english: 'only' },
        { korean: '~ 아/어도', english: 'even if' },
        { korean: '~ ㄹ 수도', english: 'might' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
