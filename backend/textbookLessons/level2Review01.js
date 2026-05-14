// Level 2 Track-Thematic — 복습 1 (Review 1)
// Consolidates Units 1-3: 적성과 진로, 건강한 삶, 스포츠의 세계.

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
  orientation: 'l2r1-orientation',
  vocabulary: 'l2r1-vocabulary',
  grammar: 'l2r1-grammar',
  mixedSentences: 'l2r1-mixed',
  speaking: 'l2r1-speaking',
  listening: 'l2r1-listening',
  writing: 'l2r1-writing',
  task: 'l2r1-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What this review covers',
    goals: ['Recall vocabulary across 적성/진로 (Unit 1), 건강한 삶 (Unit 2), 스포츠 (Unit 3).', 'Mix grammar patterns from all three units.', 'Consolidate in extended dialogue.'],
    task: 'Imagine consulting a career counselor about being an athlete — you will need career + health + sports vocabulary.' },
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Career, health, sports words',
    goals: ['Recall and recombine key vocab from Units 1-3.'],
    task: 'Pick 5 words across the units and use each in a fresh sentence.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Cross-unit patterns',
    goals: ['V-다 보면 (Unit 1)', 'V-다가는, 어찌나 A-(으)ㄴ지, ~ㄹ 정도로, ~ 뿐만 아니라 (Unit 2)', 'V-(으)나 마나, V-는 바람에, N(이)라는 N, N에 비해 (Unit 3)'],
    task: 'Pick 4 patterns and write a sentence with each.' },
  { id: ACT.mixedSentences, section: 'Mixed Sentences', title: 'Two-pattern combos',
    goals: ['Combine patterns from different units in single sentences.'],
    task: 'Build 3 multi-pattern sentences.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Career-and-health chat',
    goals: ['Discuss career goals + health concerns + sports in one extended turn.'],
    task: 'Hold a 6-turn cross-topic dialogue.' },
  { id: ACT.listening, section: 'Listening', title: 'Counseling session',
    goals: ['Follow a multi-topic career counseling.'],
    task: 'Identify the advice given.' },
  { id: ACT.writing, section: 'Writing', title: 'Reflection paragraph',
    goals: ['Write a 5-6 sentence paragraph reflecting on your dream career.'],
    task: 'Write your own reflection mixing units 1-3 grammar.' },
  { id: ACT.task, section: 'Task', title: 'Career roleplay',
    goals: ['Combine all 3 units in one continuous scene.'],
    task: 'Roleplay a counseling session about becoming an athlete.' },
];

const lesson = {
  title: '레벨 2 · 복습 1 (Review of Units 1-3)',
  category: 'career',
  difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review-mixed-functions', label: 'Mixed functional expressions', goal: 'Combine seeking advice + degree expressions + match-result reporting.' },
    { id: 'cross-unit-comparison', label: 'Cross-unit comparison', goal: 'Use N에 비해 + A-(으)ㄴ 반면에 / V-(으)나 마나 in one consultation.' },
  ],
  relatedPools: ['topic-people', 'topic-school', 'topic-society', 'topic-health'],
  content: [
    createContentItem('복습 목표', 'bokseup mokpyo', 'By end: confidently mix vocab + grammar from Units 1-3 in extended dialogue.', 'word', 'Units 1+2+3 combined', 'Recombination training.', null, [ACT.orientation]),
    createContentItem('상황 설정', 'sanghwang seoljeong', 'A Kumoh classmate confides they want to be a professional athlete but their parents are worried about their health. You give cross-topic advice.', 'word', 'Friend: 운동선수가 되고 싶은데 ~ 부모님이 ~ — You: ~ 다 보면 ~ㄹ 거예요.', 'Friend wants to be athlete; you advise.', null, [ACT.orientation]),

    createContentItem('적성', 'jeokseong', 'aptitude (U1)', 'word', '적성에 맞는 일을 찾아요.', 'I look for fitting work.', null, [ACT.vocabulary]),
    createContentItem('진로', 'jinro', 'career path (U1)', 'word', '진로 상담을 받았어요.', 'I had career counseling.', null, [ACT.vocabulary]),
    createContentItem('능력', 'neungnyeok', 'ability (U1)', 'word', '제 능력을 키워요.', 'I develop my ability.', null, [ACT.vocabulary]),
    createContentItem('증상', 'jeungsang', 'symptom (U2)', 'word', '증상이 심해져요.', 'Symptoms get worse.', null, [ACT.vocabulary]),
    createContentItem('과로', 'gwaro', 'overwork (U2)', 'word', '과로하면 안 좋아요.', 'Overwork is bad.', null, [ACT.vocabulary]),
    createContentItem('처방', 'cheobang', 'prescription (U2)', 'word', '의사가 처방했어요.', 'Doctor prescribed.', null, [ACT.vocabulary]),
    createContentItem('승부', 'seungbu', 'outcome (U3)', 'word', '승부가 결정됐어요.', 'Outcome decided.', null, [ACT.vocabulary]),
    createContentItem('연습', 'yeonseup', 'practice (U3)', 'word', '매일 연습해요.', 'I practice daily.', null, [ACT.vocabulary]),
    createContentItem('응원', 'eungwon', 'cheering (U3)', 'word', '응원해 주세요.', 'Cheer me on.', null, [ACT.vocabulary]),
    createContentItem('한의원', 'hanuiwon', 'oriental clinic (U2)', 'word', '한의원에 가요.', 'I go to the clinic.', null, [ACT.vocabulary]),
    createContentItem('경기장', 'gyeonggijang', 'stadium (U3)', 'word', '경기장에 갔어요.', 'I went to the stadium.', null, [ACT.vocabulary]),

    createContentItem('V-다 보면 (U1)', 'over time', 'If you keep doing V, eventually X happens.', 'sentence', '매일 연습하다 보면 잘하게 돼요.', 'If you keep practicing daily, you become good.', null, [ACT.grammar]),
    createContentItem('V-다가는 (U2)', 'warning', 'If you keep V, bad thing happens.', 'sentence', '과로하다가는 쓰러질 거예요.', 'If you keep overworking, you will collapse.', null, [ACT.grammar]),
    createContentItem('어찌나 A-(으)ㄴ지 (U2)', 'degree', 'So X that ~.', 'sentence', '어찌나 힘든지 못 일어나요.', 'So tired they cannot stand.', null, [ACT.grammar]),
    createContentItem('V-(으)나 마나 (U3)', 'pointless', 'Whether or not V.', 'sentence', '연습하나 마나 1등은 못해요.', 'Whether or not you practice, you cannot win 1st.', null, [ACT.grammar]),
    createContentItem('V-는 바람에 (U3)', 'cause', 'Because of (unintended).', 'sentence', '비가 오는 바람에 못 갔어요.', 'Because of rain, I could not go.', null, [ACT.grammar]),
    createContentItem('N에 비해 (U3)', 'comparison', 'Compared to N.', 'sentence', '작년에 비해 올해가 더 좋아요.', 'Compared to last year, this year is better.', null, [ACT.grammar]),

    createContentItem(
      'Multi-pattern combo 1', 'U1 + U2',
      '~ 다 보면 + ~ 다가는: keep doing X, but if you push too hard ~.',
      'sentence', '매일 연습하다 보면 실력이 늘 거예요. 그래도 무리하다가는 다칠 수 있어요.',
      'If you keep practicing daily your skill will grow. But if you push too hard you may get hurt.',
      [{ korean: '~다 보면', english: 'over time (U1)' }, { korean: '~다가는', english: 'warning (U2)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 2', 'U2 + U3',
      '~ 어찌나 ~ ㄴ지 + ~ 바람에: how much + cause.',
      'sentence', '비가 오는 바람에 경기가 어찌나 미뤄지는지 짜증이 나요.',
      'Because of the rain, the match got pushed back so much I am annoyed.',
      [{ korean: '~는 바람에', english: 'because of (U3)' }, { korean: '어찌나 ~는지', english: 'so much that (U2)' }], [ACT.mixedSentences]),
    createContentItem(
      'Multi-pattern combo 3', 'U1 + U3',
      '~ 반면 + ~ 다가는: while X, if Y too late ~.',
      'sentence', '적성에 맞는 일을 찾는 게 중요한 반면 너무 늦게 결정하다가는 기회를 놓쳐요.',
      'While finding work that fits your aptitude is important, deciding too late means missing the chance.',
      [{ korean: '~는 반면', english: 'while (U4)' }, { korean: '~다가는', english: 'warning (U2)' }], [ACT.mixedSentences]),

    createContentItem('Career-and-health speaking model', 'cross-topic',
      'Combine career hopes + health concerns + sports practice in 1 extended turn.',
      'sentence', '저는 운동선수가 되고 싶어요. 그런데 매일 연습하다 보면 어찌나 어깨가 아픈지 잠을 못 자요. 무리하다가는 더 다칠 거예요. 그래서 한의원에 가야 할 것 같아요.',
      'I want to be an athlete. But if I keep practicing daily, my shoulder hurts so much I cannot sleep. If I push too hard I will get hurt more. So I think I should visit an oriental clinic.',
      null, [ACT.speaking]),

    createContentItem('Counseling session', 'listening',
      'A career counselor helps a Kumoh student.',
      'conversation',
      'A (학생): 운동선수가 되고 싶어요. 그런데 부모님이 걱정하세요.\nB (상담사): 적성에 맞으면 좋은 선택이에요. 어떤 운동이에요?\nA: 축구요. 매일 4시간씩 연습해요.\nB: 좋아요. 하지만 그렇게 무리하다가는 다칠 수도 있어요.\nA: 어찌나 힘든지 어제도 일찍 잤어요.\nB: 다른 선수들에 비해 어때요?\nA: 아직 부족해요. 그래도 연습하다 보면 늘 거예요.\nB: 맞아요. 다만 건강 관리도 신경 쓰세요.',
      'A: I want to be an athlete. My parents worry. B: If it fits your aptitude, good. What sport? A: Soccer. 4 hours daily. B: Good. But pushing too hard, you may get hurt. A: So tough I slept early yesterday. B: Compared to other players? A: Still lacking. But over time I will improve. B: Yes. Just mind your health too.',
      [
        { korean: '~ 다 보면', english: 'U1' },
        { korean: '~ 다가는', english: 'U2' },
        { korean: '~에 비해', english: 'U3' },
      ],
      [ACT.listening]),

    createContentItem('Reflection paragraph', 'writing',
      'Sample paragraph mixing all three units\' grammar.',
      'sentence',
      '저는 운동선수가 되는 것이 적성에 맞는다고 생각해요. 매일 연습하다 보면 실력이 늘 거예요. 그런데 어찌나 힘든지 가끔 아파요. 무리하다가는 다칠 게 뻔해요. 그래서 다른 선수들에 비해서 천천히 가지만 건강은 지키려고 해요. 응원해 주세요.',
      'I think being an athlete fits my aptitude. If I keep practicing daily my skill will grow. But it is so tough I sometimes get sick. Pushing too hard will surely cause injury. So compared to others I go slowly but maintain my health. Please cheer me on.',
      null, [ACT.writing]),

    createContentItem('과제: Career counseling', 'task',
      'Roleplay: Counsel a Kumoh student who wants to be an athlete. Cross-mix vocab + grammar from Units 1-3.',
      'conversation',
      'Student: ~ 되고 싶어요. (career hope)\nYou: 적성에 맞아요? (U1 word)\nStudent: 네, 그런데 어찌나 ~ ㄴ지 ~. (U2 degree)\nYou: ~ 다가는 ~ㄹ 거예요. (U2 warning)\nStudent: 다른 선수들에 비해 ~. (U3 comparison)\nYou: 연습하다 보면 ~. (U1 over time)',
      'AI tutor will play the student.',
      [
        { korean: '~ 다 보면', english: 'U1' },
        { korean: '~ 다가는', english: 'U2' },
        { korean: '어찌나 ~ ㄴ지', english: 'U2' },
        { korean: '~에 비해', english: 'U3' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
