// Level 3 Cluster 1 — Connectors
// Source: TTMIK Workbook Level 3, Lessons 2, 7, 12, 15, 21.
// Patterns: -고, -아/어/여서, 그래도, 그러면/그럼, -는/은/ㄴ데.

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
  orientation: 'l3c1-orientation',
  patternsOverview: 'l3c1-patterns',
  go: 'l3c1-go',
  aseo: 'l3c1-aseo',
  geuraedo: 'l3c1-geuraedo',
  geureomyeon: 'l3c1-geureomyeon',
  neunde: 'l3c1-neunde',
  comparison: 'l3c1-comparison',
  reading: 'l3c1-reading',
  speaking: 'l3c1-speaking',
  writing: 'l3c1-writing',
  task: 'l3c1-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Use 5 essential Korean connectors fluently.', 'Pick the right connector for "and", "so", "but", "then", "well-but".', 'Speak with natural-flowing complex sentences.'],
    task: 'Imagine debating with a Korean friend — your sentences will need to chain ideas naturally.' },
  { id: ACT.patternsOverview, section: 'Patterns', title: 'Five connectors overview',
    goals: ['Recognize the 5 connectors by function.'],
    task: 'Match each connector to its English meaning.' },
  { id: ACT.go, section: 'Connector 1', title: '-고 — and (parallel/sequence)',
    goals: ['Use V-고 / A-고 to chain equal clauses.', 'Tense only on the last verb.'],
    task: 'Make 3 -고 sentences.' },
  { id: ACT.aseo, section: 'Connector 2', title: '-아/어/여서 — so / because',
    goals: ['Express cause + effect.', 'NEVER pair with imperative/suggestion in 2nd clause.'],
    task: 'Make 3 cause-effect sentences.' },
  { id: ACT.geuraedo, section: 'Connector 3', title: '그래도 — but still / nevertheless',
    goals: ['Concede a point and continue with a contrary action.'],
    task: 'Use 그래도 in 3 sentences.' },
  { id: ACT.geureomyeon, section: 'Connector 4', title: '그러면 / 그럼 — in that case',
    goals: ['Use 그럼 (casual) and 그러면 (formal) to draw conclusion.'],
    task: 'Use both forms.' },
  { id: ACT.neunde, section: 'Connector 5', title: '-는데 / -(으)ㄴ데 — well / but (background)',
    goals: ['Offer background, contrast, or set up a follow-up question.', 'Use V-는데, A-(으)ㄴ데.'],
    task: 'Make 3 background-setting sentences.' },
  { id: ACT.comparison, section: 'Comparison', title: 'When to use which',
    goals: ['Pick the right connector for each context.'],
    task: 'Disambiguate 5 examples.' },
  { id: ACT.reading, section: 'Reading', title: '읽기 — A paragraph with all 5 connectors',
    goals: ['Read a paragraph and identify each connector.'],
    task: 'Label each connector.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Speaking with connectors',
    goals: ['Produce flowing speech using all 5 connectors.'],
    task: 'Tell a 4-step story.' },
  { id: ACT.writing, section: 'Writing', title: 'Writing — Multi-clause paragraph',
    goals: ['Write a 5-6 sentence paragraph using all 5 connectors.'],
    task: 'Write your own.' },
  { id: ACT.task, section: 'Task', title: '과제 — Chained debate',
    goals: ['Combine all 5 connectors in extended speech.'],
    task: 'Debate a topic with the AI tutor.' },
];

const lesson = {
  title: 'Level 3 · Connectors (-고 / -아·어·여서 / 그래도 / 그러면 / -는데)',
  category: 'daily-life',
  difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'using-connector', label: 'Using a connector', goal: 'Pick the right connector for "and / so / but / then / well, but..." in context.' },
    { id: 'soft-contrast', label: 'Soft contrast with -는데', goal: 'Use -는데 to soften and set up a follow-up.' },
    { id: 'cause-effect', label: 'Cause-effect with -아/어서', goal: 'Express cause-effect, avoiding imperative in second clause.' },
  ],
  relatedPools: ['pos-verbs-1', 'pos-adjectives-1'],
  content: [
    createContentItem('단원 목표', 'danwon mokpyo', 'By end: produce native-flowing speech with the 5 essential Korean connectors.', 'word', '~고 / ~아서 / 그래도 / 그러면 / ~는데', 'Five connectors.', null, [ACT.orientation]),

    createContentItem('-고', '-go', 'and (parallel)', 'word', '저는 한국어 공부하고 운동도 해요.', 'I study Korean and exercise.', null, [ACT.patternsOverview]),
    createContentItem('-아/어서', '-aseo/eoseo', 'so / because', 'word', '비가 와서 집에 있어요.', 'Raining so I am home.', null, [ACT.patternsOverview]),
    createContentItem('그래도', 'geuraedo', 'but still', 'word', '피곤해요. 그래도 가야 해요.', 'Tired. But still must go.', null, [ACT.patternsOverview]),
    createContentItem('그러면 / 그럼', 'geureomyeon / geureom', 'in that case / then', 'word', '바쁘세요? 그럼 다음에 봐요.', 'Busy? Then later.', null, [ACT.patternsOverview]),
    createContentItem('-는데', '-neunde / -eunde', 'well / but / background', 'word', '비가 오는데 우산이 없어요.', 'Raining but no umbrella.', null, [ACT.patternsOverview]),

    createContentItem('V/A-고 — parallel', 'go', 'Connect two same-tense clauses. Often "and".', 'sentence', '운동을 좋아하고 매일 30분 해요.', 'I like exercise and do 30 min daily.',
      [{ korean: '좋아하 + 고', english: 'and like' }, { korean: '먹 + 고', english: 'and eat' }], [ACT.go]),
    createContentItem('Past with -고', 'past chain', 'Only LAST verb shows tense.', 'sentence', '청소하고 쉬었어요.', 'I cleaned and rested.',
      null, [ACT.go]),

    createContentItem('V/A-아/어서 — cause', 'aseo', 'Express cause-effect. Tense ONLY on second verb.', 'sentence', '늦게 자서 피곤해요.', 'I went to bed late so I am tired.',
      [{ korean: '늦게 자 + 서', english: 'because slept late' }, { korean: '비가 와 + 서', english: 'because it rained' }], [ACT.aseo]),
    createContentItem('Critical rule', 'no imperative', 'NEVER use -아/어서 with imperative/suggestion in the 2nd clause. Use -(으)니까 instead.', 'sentence', '늦었어서 가지 마세요. (WRONG) · 늦었으니까 가지 마세요. (OK)', 'Critical distinction.',
      null, [ACT.aseo]),
    createContentItem('Sequence meaning', 'do A then B', '-아/어서 also expresses sequence when no clear cause.', 'sentence', '집에 가서 자요.', 'I go home and sleep.',
      null, [ACT.aseo]),

    createContentItem('그래도 — but still', 'concession', 'Concede a point and state a contrary action.', 'sentence', '한국어가 어려워요. 그래도 재미있어요.', 'Korean is hard. But still it is fun.',
      [{ korean: '~. 그래도 ~', english: 'standalone sentence-starter' }], [ACT.geuraedo]),
    createContentItem('vs -지만', 'similar function', '그래도 = "even so" between sentences. -지만 = "but" within one sentence.', 'sentence', '어려워요. 그래도 좋아요. = 어렵지만 좋아요.', 'Similar meaning, different syntax.',
      null, [ACT.geuraedo]),

    createContentItem('그러면 / 그럼 — in that case', 'conclusion', 'Draw a conclusion from previous turn. 그럼 = casual, 그러면 = neutral.', 'sentence', '시간이 없어요? 그럼 내일 만나요.', 'No time? Then let us meet tomorrow.',
      [{ korean: '그러면', english: 'neutral' }, { korean: '그럼', english: 'casual shortened' }], [ACT.geureomyeon]),

    createContentItem('V-는데 / A-(으)ㄴ데 — background', 'neunde', 'Offer background, soft contrast, or set up a follow-up.', 'sentence', '한국어 공부하는데 어려운 부분이 있어요.', 'I am studying Korean, and there are hard parts.',
      [{ korean: 'V-는데', english: 'verb' }, { korean: 'A-(으)ㄴ데', english: 'adjective' }, { korean: 'N인데', english: 'noun + 이다' }], [ACT.neunde]),
    createContentItem('Three uses', 'multifunctional', '1) Background ("X is true, also..."). 2) Soft contrast ("X but..."). 3) Setup for question ("X — could you...").', 'sentence', '비가 오는데 같이 갈래요? (setup)', 'Three uses of -는데.',
      [{ korean: 'background', english: 'X is true, also Y' }, { korean: 'contrast', english: 'X but Y' }, { korean: 'setup', english: 'X — could you?' }], [ACT.neunde]),

    createContentItem('Choosing', 'cheat sheet',
      'Parallel = -고. Cause = -아/어서. Even so = 그래도. Conclusion = 그러면. Background/soft contrast = -는데.',
      'sentence',
      '비가 오고 바람도 분다 (parallel) · 비가 와서 못 갔어요 (cause) · 비가 와요. 그래도 갔어요 (even so) · 비가 와요? 그럼 가지 마요 (conclusion) · 비가 오는데 우산 있어요? (background)',
      'One scenario, five connectors.',
      null, [ACT.comparison]),

    createContentItem('A paragraph with all 5', 'reading',
      'Read aloud and label each connector.',
      'sentence',
      '저는 한국어 공부를 좋아하고 매일 1시간씩 해요. 그런데 어제는 너무 피곤해서 공부를 못 했어요. 그래도 한국 드라마를 한 편 봤어요. 드라마에는 어려운 표현이 많은데 자막이 있어서 도움이 됐어요. 시험이 다음 주인데 더 열심히 해야겠어요. 그럼 오늘은 일찍 자고 내일 일찍 일어나서 공부해야겠어요.',
      'I like Korean study and do 1 hour daily. But yesterday I was too tired so I could not study. Still, I watched a Korean drama. Dramas have hard expressions but subtitles helped. Exam is next week, so I should try harder. So today I will sleep early and tomorrow wake up early to study.',
      [
        { korean: '~고', english: 'and' },
        { korean: '~ 아/어서', english: 'so/because' },
        { korean: '그래도', english: 'even so' },
        { korean: '~ 는데', english: 'background' },
        { korean: '그럼', english: 'so' },
      ],
      [ACT.reading]),

    createContentItem('Speaking flow', 'connect 4 actions',
      'String 4 actions with connectors.',
      'sentence', '아침에 일어나서 운동하고 학교 가는데 비가 와서 우산 가져갔어요. 그래도 좀 늦었어요.',
      'Woke up, exercised, went to school but it rained so I took umbrella. Still got a bit late.',
      null, [ACT.speaking]),

    createContentItem('Writing model', 'paragraph',
      'Use all 5 connectors.',
      'sentence',
      '주말에 친구하고 등산했어요. 산에서 사진을 많이 찍었는데 카메라 배터리가 다 됐어요. 그래서 일찍 내려와야 했어요. 그래도 정말 좋은 시간이었어요. 다음 주말에는 더 일찍 출발하기로 했어요. 그럼 시간이 더 많아질 거예요.',
      'I hiked with a friend on the weekend. Took many photos but camera battery died. So we had to come down early. Still a great time. Next weekend we decided to leave earlier. Then we will have more time.',
      null, [ACT.writing]),

    createContentItem('과제: Chained debate', 'task',
      'Roleplay: Debate "Korean food is too spicy" with the AI tutor. Use all 5 connectors.',
      'conversation',
      'Tutor: 한국 음식이 너무 매워요.\nYou: ~고 ~. 그래도 ~. (concede + counter)\nTutor: 그렇지만 ~ 아/어서 ~\nYou: 맵긴 한데 ~ (~는데 background)\nTutor: 그럼 ~?\nYou: ~ 면 좋을 거예요.',
      'AI tutor will play the opposing side.',
      [
        { korean: '~ 고', english: 'and' },
        { korean: '~ 아/어서', english: 'so/because' },
        { korean: '그래도', english: 'even so' },
        { korean: '~ 는데', english: 'background' },
        { korean: '그러면 / 그럼', english: 'then' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
