// Level 2 Unit 4 — 남자와 여자 (Men and women)
// Source: Book 2D Unit 4.
// Grammar: A/V-기는커녕, A/V-(으)ㄹ 게 뻔하다, A-(으)ㄴ 반면(에), A/V-(으)ㄹ 수밖에 없다.
// Pronunciation: Intonation of '-(으)ㄹ 게 뻔하다'. Culture: gender roles at work.

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
  orientation: 'l2u4-orientation',
  vocabulary: 'l2u4-vocabulary',
  pronunciation: 'l2u4-pronunciation',
  grammar: 'l2u4-grammar',
  speaking: 'l2u4-speaking',
  readingSpeaking: 'l2u4-reading-speaking',
  listeningSpeaking: 'l2u4-listening-speaking',
  readingWriting: 'l2u4-reading-writing',
  culture: 'l2u4-culture',
  task: 'l2u4-task',
};

const activities = [
  { id: ACT.orientation, section: 'Orientation', title: 'What you will be able to do',
    goals: ['Voice frustrations and predict outcomes confidently.', 'Use 4 advanced patterns: ~기는커녕, ~ㄹ 게 뻔하다, ~ 반면에, ~ㄹ 수밖에 없다.', 'Discuss changing gender norms in Korea.'],
    task: 'Imagine debating with a Korean friend about gender stereotypes — you need to disagree, predict, and contrast.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Attitudes, complaints, abilities',
    goals: ['Use 태도·불만·능력·차이·성별.', 'Form adjectives with -스럽다.'],
    task: 'Pick three -스럽다 adjectives and use each.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Intonation of ~ㄹ 게 뻔하다',
    goals: ['Stress 뻔하다 with rising emphasis for prediction.'],
    task: 'Read three ~ㄹ 게 뻔하다 sentences with proper stress.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Argument and exception patterns',
    goals: ['A/V-기는커녕 — far from V', 'A/V-(으)ㄹ 게 뻔하다 — surely will', 'A-(으)ㄴ 반면(에) — while (contrast)', 'A/V-(으)ㄹ 수밖에 없다 — cannot but'],
    task: 'Use each pattern once.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Complaining',
    goals: ['Voice a complaint with grammar.'],
    task: 'Complain about a small frustration using ~기는커녕.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Comparing men and women',
    goals: ['Read comparisons.', 'Talk about them.'],
    task: 'Read and respond with your opinion.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Behaviors and clashing opinions',
    goals: ['Listen to a complaint.', 'Argue your view.'],
    task: 'Defend an opinion about behavior.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Opinion piece on an experiment',
    goals: ['Read an opinion piece.', 'Write an analysis.'],
    task: 'Write three sentences analyzing a study.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Changing gender roles in Korean workplaces',
    goals: ['Understand 유리천장 (glass ceiling), 워라밸 (work-life balance).'],
    task: 'Discuss one stereotype your country is moving past.' },
  { id: ACT.task, section: 'Task', title: 'Debate gender differences',
    goals: ['Argue both sides using 4 patterns.'],
    task: 'Take one side of a friendly debate.' },
];

const lesson = {
  title: '레벨 2 · 4과: 남자와 여자 (Men and Women)',
  category: 'daily-life',
  difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'predicting-negative', label: 'Predicting outcome', goal: 'Use A/V-(으)ㄹ 게 뻔하다.' },
    { id: 'expressing-dissatisfaction', label: 'Expressing dissatisfaction', goal: 'Use A/V-기는커녕.' },
    { id: 'contrasting', label: 'Contrasting two groups', goal: 'Use A-(으)ㄴ 반면(에).' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    createContentItem('학습 목표', 'hakseup mokpyo', 'By end: voice complaints, predict outcomes, contrast two groups, debate.', 'word', 'Functions: complain · predict · contrast · debate', 'Argument toolkit.', null, [ACT.orientation]),
    createContentItem('오늘의 상황', 'oneurui sanghwang', 'You complain to your friend that your group-project partner has not helped at all. You need to express frustration AND predict more issues.', 'word', 'You: 도와주기는커녕 매번 늦어요. 다음번에도 늦을 게 뻔해요.', 'You: Far from helping, he is late every time. He will surely be late next time too.', null, [ACT.orientation]),

    createContentItem('태도', 'taedo', 'attitude', 'word', '태도가 좋아요.', 'Good attitude.', null, [ACT.vocabulary]),
    createContentItem('불만', 'bulman', 'complaint', 'word', '불만이 많아요.', 'Many complaints.', null, [ACT.vocabulary]),
    createContentItem('능력', 'neungryeok', 'ability', 'word', '능력이 뛰어나요.', 'Outstanding ability.', null, [ACT.vocabulary]),
    createContentItem('차이', 'chai', 'difference', 'word', '큰 차이가 없어요.', 'No big difference.', null, [ACT.vocabulary]),
    createContentItem('성별', 'seongbyeol', 'gender', 'word', '성별에 관계없이.', 'Regardless of gender.', null, [ACT.vocabulary]),
    createContentItem('남자', 'namja', 'man', 'word', '남자 친구 있어요?', 'Boyfriend?', null, [ACT.vocabulary]),
    createContentItem('여자', 'yeoja', 'woman', 'word', '여자 친구 있어요.', 'I have a girlfriend.', null, [ACT.vocabulary]),
    createContentItem('자랑스럽다', 'jarangseureopda', 'proud (-스럽다)', 'word', '딸이 자랑스러워요.', 'Proud of my daughter.', null, [ACT.vocabulary]),
    createContentItem('걱정스럽다', 'geokjeongseureopda', 'worrying', 'word', '시험이 걱정스러워요.', 'Worried about the exam.', null, [ACT.vocabulary]),
    createContentItem('부담스럽다', 'budamseureopda', 'burdensome', 'word', '그 부탁은 부담스러워요.', 'Burdensome request.', null, [ACT.vocabulary]),
    createContentItem('자연스럽다', 'jayeonseureopda', 'natural', 'word', '자연스러운 행동이에요.', 'Natural behavior.', null, [ACT.vocabulary]),
    createContentItem('당당하다', 'dangdanghada', 'confident / poised', 'word', '당당한 태도예요.', 'Confident attitude.', null, [ACT.vocabulary]),
    createContentItem('적극적', 'jeokgeukjeok', 'proactive', 'word', '적극적으로 참여해요.', 'I participate proactively.', null, [ACT.vocabulary]),
    createContentItem('소극적', 'sogeukjeok', 'passive', 'word', '저는 소극적인 편이에요.', 'I am rather passive.', null, [ACT.vocabulary]),
    createContentItem('꼼꼼하다', 'kkomkkomhada', 'meticulous', 'word', '꼼꼼한 사람이에요.', 'A meticulous person.', null, [ACT.vocabulary]),
    createContentItem('답답하다', 'dapdaphada', 'frustrating', 'word', '답답해서 못 참겠어요.', 'So frustrating I cannot bear it.', null, [ACT.vocabulary]),
    createContentItem('약속을 지키다', 'yaksogeul jikida', 'to keep a promise', 'word', '약속을 잘 지켜요.', 'He keeps promises well.', null, [ACT.vocabulary]),
    createContentItem('방해하다', 'banghaehada', 'to hinder / get in the way', 'word', '공부를 방해해요.', 'It interrupts my study.', null, [ACT.vocabulary]),

    createContentItem('-(으)ㄹ 게 뻔하다 stress', 'intonation', 'Rising emphasis on 뻔: makes the prediction confident.', 'sentence', '오늘도 늦을 게 뻔해요. — emphasize 뻔', 'Surely late again today.',
      null, [ACT.pronunciation]),
    createContentItem('기는커녕 → [기는커녕]', 'fluent flow', 'Pronounce smoothly — practice the 5-syllable rhythm.', 'word', '도와주기는커녕 ~', 'Far from helping ~.', null, [ACT.pronunciation]),
    createContentItem('반면(에) → [반며네]', 'banmyeone', '연음: ㄴ받침 of 면 jumps to 에.', 'word', '남자는 ~ 반면에 여자는 ~. → [반며네]', 'While men ~, women ~.', null, [ACT.pronunciation]),
    createContentItem('수밖에 → [수바께]', 'subakke', '경음화: ㄱ받침 + ㅇ → tense ㄲ + jumped vowel.', 'word', '~할 수밖에 없어요. → [수바께 업써요]', 'Cannot but ~.', null, [ACT.pronunciation]),

    createContentItem('A/V-기는커녕 — far from V-ing', 'kineunkeonyeong', 'Dismiss one option, state the opposite. Strong frustration.', 'sentence', '도와주기는커녕 방해만 했어요.', 'Far from helping, they only got in the way.',
      [
        { korean: 'V-기는커녕', english: 'far from V-ing' },
        { korean: 'N은/는커녕', english: 'far from N (with nouns)' },
      ],
      [ACT.grammar]),
    createContentItem('A/V-(으)ㄹ 게 뻔하다 — surely will', 'prediction', 'Express confident prediction (often negative).', 'sentence', '오늘도 늦을 게 뻔해요.', 'They are sure to be late today too.',
      [
        { korean: 'V-(으)ㄹ 게 뻔하다', english: 'verb future' },
        { korean: 'A-(으)ㄹ 게 뻔하다', english: 'adjective form too' },
      ],
      [ACT.grammar]),
    createContentItem('A-(으)ㄴ 반면(에) — while', 'banmyeon', 'Contrast two groups or things. With verbs use V-는 반면(에).', 'sentence', '남자는 운동을 잘하는 반면에 여자는 꼼꼼해요.', 'Men are good at sports while women are meticulous.',
      [
        { korean: 'A-(으)ㄴ 반면(에)', english: 'adjective' },
        { korean: 'V-는 반면(에)', english: 'verb' },
      ],
      [ACT.grammar]),
    createContentItem('A/V-(으)ㄹ 수밖에 없다 — cannot but', 'inevitable', 'Express an inevitable outcome.', 'sentence', '시험이 어려워서 떨어질 수밖에 없어요.', 'The exam is hard, so I am bound to fail.',
      [
        { korean: '~ ㄹ 수밖에', english: 'no choice but to ~' },
        { korean: '없어요 / 없다', english: 'have no ~ (default)' },
      ],
      [ACT.grammar]),

    createContentItem('Voicing a complaint', 'speaking model',
      'Use ~기는커녕 in a real complaint.',
      'sentence', '민수는 도와주기는커녕 매번 약속도 안 지켜요.',
      'Minsu, far from helping, does not keep promises either.',
      null, [ACT.speaking]),

    createContentItem('Comparing men and women', 'reading',
      'Read this short article excerpt.',
      'sentence',
      '한 연구에 따르면 남자는 공간 능력이 뛰어난 반면에 여자는 언어 능력이 뛰어나요. 하지만 사람마다 다르고, 사회 환경에 따라 능력이 달라질 수밖에 없어요. 성별만으로 능력을 판단할 게 뻔히 아니에요.',
      'According to one study, men have outstanding spatial ability while women have outstanding language ability. But it varies by individual, and abilities are bound to differ by social environment. Surely we cannot judge ability by gender alone.',
      [
        { korean: '~는 반면에', english: 'while' },
        { korean: '~ㄹ 수밖에', english: 'bound to' },
        { korean: '~ㄹ 게 뻔하다', english: 'surely' },
      ],
      [ACT.readingSpeaking]),

    createContentItem('Complaining about a friend', 'listening',
      'Two friends commiserate.',
      'conversation',
      'A: 사라야, 무슨 일 있어? 표정이 안 좋아.\nB: 응, 민수 때문에. 도와준다고 했는데 도와주기는커녕 약속도 안 지켜.\nA: 또? 이번에도 늦었지?\nB: 늦을 게 뻔했어. 매번 그래.\nA: 다음번에는 같이 안 하는 게 좋을 것 같아.\nB: 그래야겠어. 답답해서 같이 일을 못 하겠어.',
      'A: Sarah, what is wrong? B: Because of Minsu. Said he\'d help, but far from helping, doesn\'t even keep promises. A: Again? Late this time? B: He was sure to be late. Every time. A: Better not work with him. B: I think so. Cannot work with him.',
      [
        { korean: '~기는커녕', english: 'far from' },
        { korean: '~ㄹ 게 뻔했어', english: 'was sure to' },
        { korean: '같이 일을 못 하겠어', english: 'I cannot work with him' },
      ],
      [ACT.listeningSpeaking]),

    createContentItem('Experiment analysis', 'reading + writing',
      'A short opinion piece on a workplace experiment.',
      'sentence',
      '한 회사에서 남녀 직원을 비교했어요. 결과는 의외였어요. 남자가 더 활동적인 반면에 세부적인 일에는 여자가 더 강했어요. 그러나 둘 다 협업할 수밖에 없는 환경에서는 능력 차이가 거의 없었어요. 성별보다 환경이 더 중요할 게 뻔해요.',
      'A company compared male and female employees. The results were unexpected. Men were more active while women were stronger at detail work. But in collaborative environments, ability differences were minimal. Environment is surely more important than gender.',
      null, [ACT.readingWriting]),

    createContentItem('Changing gender roles', 'culture',
      'Korea has rapidly shifted: 워라밸 (work-life balance) is now a top concern, 유리천장 (glass ceiling) is openly discussed. Many big firms now publish female-leader ratios. But traditional roles (cooking, childcare) still fall heavier on women. The conversation is active and evolving.',
      'sentence', '한국 직장에서는 성별 역할이 빠르게 변하고 있어요.',
      'Gender roles in Korean workplaces are changing rapidly.',
      [
        { korean: '워라밸', english: 'work-life balance' },
        { korean: '유리천장', english: 'glass ceiling' },
        { korean: '맞벌이', english: 'dual-income couple' },
        { korean: '경력단절', english: 'career break' },
      ],
      [ACT.culture]),

    createContentItem('과제: Debate', 'task',
      'Roleplay: Friendly debate on whether men or women are better at one task. Use ~기는커녕, ~ㄹ 게 뻔하다, ~ 반면에, ~ㄹ 수밖에 없다.',
      'conversation',
      'Friend: 남자가 운동을 더 잘해요.\nYou: [counter with ~ 반면에 or ~ㄹ 수밖에]\nFriend: 그래도 ~\nYou: [strong claim with ~ㄹ 게 뻔해요 or ~기는커녕]\nFriend: 흠... 동의해요.',
      'AI tutor will play the friend.',
      [
        { korean: '~기는커녕', english: 'far from' },
        { korean: '~ㄹ 게 뻔해요', english: 'surely will' },
        { korean: '~ 반면에', english: 'while' },
        { korean: '~ㄹ 수밖에', english: 'cannot but' },
      ],
      [ACT.task]),
  ],
};

module.exports = lesson;
