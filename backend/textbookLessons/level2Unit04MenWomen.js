// Level 2 Unit 4 — 남자와 여자 (Men and women)
// Source: Book 2D Unit 4. Vocab: 태도와 불만, 능력, -스럽다.
// Grammar: A/V-기는커녕 N은/는커녕, A/V-(으)ㄹ 게 뻔하다, A-(으)ㄴ 반면(에) V-는 반면(에), A/V-(으)ㄹ 수밖에 없다.
// Pronunciation: Intonation of '-(으)ㄹ 게 뻔하다'. Culture: Job of men and women.

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
  speaking: 'l2u4-speaking',
  readingSpeaking: 'l2u4-reading-speaking',
  listeningSpeaking: 'l2u4-listening-speaking',
  readingWriting: 'l2u4-reading-writing',
  task: 'l2u4-task',
  vocabulary: 'l2u4-vocabulary',
  grammar: 'l2u4-grammar',
  pronunciation: 'l2u4-pronunciation',
  culture: 'l2u4-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Complaining about friends',
    goals: ['Voice a complaint with grammar from this unit.'],
    task: 'Complain about a small frustration using -기는커녕.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Comparing men and women',
    goals: ['Read comparisons.', 'Talk about comparisons.'],
    task: 'Read a short comparison and respond with your opinion.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Behaviors and clashing opinions',
    goals: ['Listen to a complaint about behavior.', 'Argue your view.'],
    task: 'Defend an opinion about a friend\'s behavior.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Opinion piece on an experiment',
    goals: ['Read an opinion piece.', 'Write an analysis based on results.'],
    task: 'Write three sentences analyzing a small experiment.' },
  { id: ACT.task, section: 'Task', title: 'Debate gender differences',
    goals: ['Argue both sides of a question.'],
    task: 'Take one side of a friendly debate about study habits.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Attitudes, complaints, abilities',
    goals: ['Use 태도, 불만, 능력 + -스럽다 adjective formation.'],
    task: 'Pick three -스럽다 adjectives and use each one.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Argument and exception patterns',
    goals: ['A/V-기는커녕', 'A/V-(으)ㄹ 게 뻔하다', 'A-(으)ㄴ 반면(에)', 'A/V-(으)ㄹ 수밖에 없다'],
    task: 'Use A/V-(으)ㄹ 게 뻔하다 to predict a friend\'s reaction.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Intonation of -(으)ㄹ 게 뻔하다',
    goals: ['Stress the prediction with rising intonation on 뻔하다.'],
    task: 'Read three -(으)ㄹ 게 뻔하다 sentences with proper stress.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Job of men and women',
    goals: ['Understand changing gender norms in Korean workplaces.'],
    task: 'Discuss one workplace stereotype your country is moving past.' },
];

const lesson = {
  title: '레벨 2 · 4과: 남자와 여자 (Men and Women)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'predicting-negative', label: 'Predicting a negative outcome', goal: 'Use A/V-(으)ㄹ 게 뻔하다 to predict an unwelcome result.' },
    { id: 'expressing-dissatisfaction', label: 'Expressing dissatisfaction', goal: 'Use A/V-기는커녕 to dismiss an expectation and state the real situation.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    createContentItem('태도', 'taedo', 'attitude', 'word', '태도가 좋아요.', 'Their attitude is good.', null, [ACT.vocabulary]),
    createContentItem('불만', 'bulman', 'complaint / dissatisfaction', 'word', '불만이 많아요.', 'I have many complaints.', null, [ACT.vocabulary]),
    createContentItem('남자', 'namja', 'man', 'word', '남자 친구 있어요?', 'Do you have a boyfriend?', null, [ACT.vocabulary]),
    createContentItem('여자', 'yeoja', 'woman', 'word', '여자 친구가 있어요.', 'I have a girlfriend.', null, [ACT.vocabulary]),
    createContentItem('성별', 'seongbyeol', 'gender', 'word', '성별에 관계없이 일해요.', 'We work regardless of gender.', null, [ACT.vocabulary]),
    createContentItem('차이', 'chai', 'difference', 'word', '큰 차이가 없어요.', 'There is no big difference.', null, [ACT.vocabulary]),
    createContentItem('자랑스럽다', 'jarangseureopda', 'to be proud (-스럽다 adj)', 'word', '딸이 자랑스러워요.', 'I am proud of my daughter.', null, [ACT.vocabulary]),
    createContentItem('걱정스럽다', 'geokjeongseureopda', 'to be worrying', 'word', '시험이 걱정스러워요.', 'I am worried about the exam.', null, [ACT.vocabulary]),
    createContentItem('부담스럽다', 'budamseureopda', 'to be burdensome', 'word', '그 부탁은 부담스러워요.', 'That request is burdensome.', null, [ACT.vocabulary]),
    createContentItem('당당하다', 'dangdanghada', 'to be confident / poised', 'word', '당당한 태도예요.', 'It is a confident attitude.', null, [ACT.vocabulary]),
    createContentItem('적극적', 'jeokgeukjeok', 'proactive', 'word', '적극적으로 참여해요.', 'I participate proactively.', null, [ACT.vocabulary]),
    createContentItem('소극적', 'sogeukjeok', 'passive', 'word', '저는 소극적인 편이에요.', 'I tend to be passive.', null, [ACT.vocabulary]),

    createContentItem(
      '도와주기는커녕 방해만 했어요.', 'dowajugineun-keonyeong banghaeman haesseoyo.',
      'Far from helping, they only got in the way.', 'sentence',
      '도와주기는커녕 방해만 했어요. 정말 답답해요.',
      'Far from helping, they only got in the way. It is really frustrating.',
      [
        { korean: '~기는커녕', english: 'far from ~ (dismissing one option)' },
        { korean: '방해만 했어요', english: 'only got in the way' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '오늘도 늦을 게 뻔해요.', 'oneuldo neujeul ge ppeonhaeyo.',
      'They are sure to be late today too.', 'sentence',
      '오늘도 늦을 게 뻔해요. 매번 그래요.',
      'They are sure to be late today too. Every time.',
      [
        { korean: '~ㄹ 게 뻔해요', english: 'is sure to ~ (prediction)' },
        { korean: '매번', english: 'every time' },
      ],
      [ACT.grammar, ACT.pronunciation],
    ),
    createContentItem(
      '남자는 운동을 잘하는 반면에 여자는 꼼꼼해요.', 'namjaneun undongeul jalhaneun banmyeone yeojaneun kkomkkomhaeyo.',
      'While men are good at sports, women are meticulous.', 'sentence',
      '이 통계에 따르면 남자는 운동을 잘하는 반면에 여자는 꼼꼼해요. 하지만 사람마다 달라요.',
      'According to this statistic, men are good at sports while women are meticulous. But it varies by person.',
      [
        { korean: '~는 반면(에)', english: 'while ~ (contrast)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '시험이 어려워서 떨어질 수밖에 없어요.', 'siheomi eoryeowoseo tteoreojil subakke eopseoyo.',
      'The exam is so hard that I am bound to fail.', 'sentence',
      '시험이 어려워서 떨어질 수밖에 없어요. 다시 공부해야 해요.',
      'The exam is so hard that I am bound to fail. I need to study again.',
      [
        { korean: '~ㄹ 수밖에 없어요', english: 'cannot but ~ / be bound to ~' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '친구에 대한 불만', 'chinguedaehan bulman',
      'Complaining about a friend', 'conversation',
      'A: 사라야, 무슨 일 있어? 표정이 안 좋아.\nB: 응, 민수 때문에. 도와준다고 했는데 도와주기는커녕 약속도 안 지켜.\nA: 또? 이번에도 늦었지?\nB: 늦을 게 뻔했어. 매번 그래.\nA: 다음번에는 같이 안 하는 게 좋을 것 같아.\nB: 그래야겠어. 답답해서 같이 일을 못 하겠어.',
      'A: Sarah, what is wrong? You do not look good.\nB: Yeah, because of Minsu. He said he\'d help, but far from helping, he doesn\'t even keep promises.\nA: Again? Was he late this time too?\nB: He was sure to be late. Every time.\nA: Maybe better not to work with him next time.\nB: I think so. I cannot work with him because it is so frustrating.',
      [
        { korean: '표정이 안 좋아', english: 'you do not look good (face/expression)' },
        { korean: '약속을 지키다', english: 'to keep a promise' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
