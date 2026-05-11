// Level 2 Track-Thematic — 복습 1 (Review 1)
// Consolidates Units 1-3: 적성과 진로, 건강한 삶, 스포츠의 세계.
// Pulls vocabulary and grammar from those units; introduces no new patterns.
// AI tutor uses lessonType: 'review' to recombine prior content.

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
  vocabulary: 'l2r1-vocabulary',
  grammar: 'l2r1-grammar',
  speaking: 'l2r1-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary Review',
    title: 'Career, health, and sports words',
    goals: ['Recall key vocabulary from Units 1-3.', 'Use each word in a fresh sentence.'],
    task: 'Pick five words across the three units and use each in your own sentence.',
  },
  {
    id: ACT.grammar, section: 'Grammar Review',
    title: 'Mixed grammar from Units 1-3',
    goals: [
      'Mix patterns from Unit 1 (V-다 보면, V-는 대로) with Unit 2 (V-다가는, A/V-(으)ㄹ 정도로) and Unit 3 (V-(으)나 마나, V-는 바람에).',
    ],
    task: 'Write four sentences combining one pattern from each unit, plus a free choice.',
  },
  {
    id: ACT.speaking, section: 'Speaking Review',
    title: 'Cross-unit roleplay',
    goals: ['Hold a longer dialogue mixing all three themes.'],
    task: 'Roleplay a counseling session about choosing a career as an athlete.',
  },
];

const lesson = {
  title: '레벨 2 · 복습 1 (Review of Units 1-3)',
  category: 'career', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review-mixed-functions', label: 'Mixed functional expressions', goal: 'Use seeking/giving advice + degree expressions + match-result reporting in one short conversation.' },
  ],
  // After units 1-3, the learner has been exposed to all three pools.
  relatedPools: ['topic-people', 'topic-school', 'topic-society', 'topic-health'],
  content: [
    // Mixed-vocab review (one item per source unit, alphabetically interleaved)
    createContentItem('적성', 'jeokseong', 'aptitude (Unit 1)', 'word', '적성에 맞는 일을 찾아요.', 'I look for work that fits my aptitude.', null, [ACT.vocabulary]),
    createContentItem('증상', 'jeungsang', 'symptom (Unit 2)', 'word', '증상이 점점 심해져요.', 'The symptoms are getting worse.', null, [ACT.vocabulary]),
    createContentItem('승부', 'seungbu', 'win-or-lose (Unit 3)', 'word', '승부가 결정됐어요.', 'The outcome has been decided.', null, [ACT.vocabulary]),
    createContentItem('진로', 'jinro', 'career path (Unit 1)', 'word', '진로 상담을 받았어요.', 'I had career counseling.', null, [ACT.vocabulary]),
    createContentItem('과로', 'gwaro', 'overwork (Unit 2)', 'word', '과로하면 건강이 나빠져요.', 'If you overwork, your health worsens.', null, [ACT.vocabulary]),
    createContentItem('연습', 'yeonseup', 'practice (Unit 3)', 'word', '매일 연습해야 해요.', 'I have to practice daily.', null, [ACT.vocabulary]),
    createContentItem('능력', 'neungnyeok', 'ability (Unit 1)', 'word', '제 능력을 키우고 있어요.', 'I am developing my ability.', null, [ACT.vocabulary]),
    createContentItem('처방', 'cheobang', 'prescription (Unit 2)', 'word', '의사가 처방을 해 주셨어요.', 'The doctor gave a prescription.', null, [ACT.vocabulary]),
    createContentItem('응원', 'eungwon', 'support / cheering (Unit 3)', 'word', '응원해 주세요.', 'Please cheer for me.', null, [ACT.vocabulary]),

    // Mixed-grammar sentences
    createContentItem(
      '매일 연습하다 보면 잘하게 될 거예요.', 'maeil yeonseuphada bomyeon jalhage doel geoyeyo.',
      'If you keep practicing daily, you will get good. (Unit 1: V-다 보면, Unit 3: 연습)', 'sentence',
      '매일 연습하다 보면 잘하게 될 거예요. 그래도 무리하다가는 다칠 수 있어요.',
      'If you keep practicing daily you will get good. But if you overdo it you may get hurt.',
      [
        { korean: '~다 보면', english: 'if you keep ~ (Unit 1)' },
        { korean: '~다가는', english: 'if you keep doing ~ (warning, Unit 2)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '비가 오는 바람에 경기가 어찌나 미뤄지는지 짜증이 나요.', 'biga oneun barame gyeonggiga eojjina miryeojineunji jjajeungi nayo.',
      'The match keeps getting pushed back so much because of the rain that I am annoyed. (Unit 3: -는 바람에 + Unit 2: 어찌나 ~ㄴ지)', 'sentence',
      '비가 오는 바람에 경기가 어찌나 미뤄지는지 짜증이 나요. 빨리 끝났으면 좋겠어요.',
      'The match keeps getting pushed back so much because of the rain that I am annoyed. I wish it would just end.',
      [
        { korean: '~는 바람에', english: 'because of ~ (unintended cause, Unit 3)' },
        { korean: '어찌나 ~는지', english: 'so much that ~ (degree, Unit 2)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '본인의 적성에 맞는 일을 찾는 것이 중요한 반면 너무 늦게 결정하다가는 기회를 놓쳐요.', 'bonine jeokseonge mat-neun ireul chat-neun geosi junghahan banmyeon neomu neutge gyeoljeonghadaganeun gihoereul nochyeoyo.',
      'While finding work that fits your aptitude is important, deciding too late may cost you the opportunity.', 'sentence',
      '본인의 적성에 맞는 일을 찾는 것이 중요한 반면 너무 늦게 결정하다가는 기회를 놓쳐요. 그래서 진로 상담은 빨리 받는 게 좋아요.',
      'Finding aptitude-fitting work is important, but if you decide too late you may miss the chance. So getting career counseling early is good.',
      [
        { korean: '~는 반면', english: 'while ~ (contrast)' },
        { korean: '~다가는', english: 'if you keep ~ (warning)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '복습 대화', 'bokseup daehwa',
      'Cross-unit review dialogue', 'conversation',
      'A: 너 요즘 운동선수가 되고 싶다고 했지?\nB: 응. 그런데 어찌나 연습이 힘든지 어제부터 어깨가 아파.\nA: 너무 무리하다가는 다칠 거야. 좀 쉬다 보면 다시 좋아질 거야.\nB: 알아. 그래도 1등을 하고 싶은 마음이 큰 반면에 몸은 안 따라줘.\nA: 그러면 한의원에 한번 가 봐. 적성에 맞는 일이라도 건강이 먼저야.\nB: 좋은 조언 고마워. 내일 가 볼게.',
      'A: You said you wanted to be an athlete recently, right?\nB: Yes. But practice has been so tough that my shoulder has been hurting since yesterday.\nA: If you push yourself too hard you will get hurt. If you rest a while you will get better.\nB: I know. But while I really want to win 1st place, my body cannot keep up.\nA: Then try going to an oriental medicine clinic. Even if it is your aptitude, health comes first.\nB: Thanks for the good advice. I will go tomorrow.',
      [
        { korean: '몸이 안 따라준다', english: 'my body cannot keep up' },
        { korean: '건강이 먼저', english: 'health comes first' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
