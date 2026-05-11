// Level 2 Unit 7 — 옳고 그름 (Right and wrong)
// Source: Book 2D Unit 7. Vocab: 의견, 행동, -질.
// Grammar: A/V-더라도, A-다고 보다 V-ㄴ/는다고 보다, V-(으)ㄴ 채(로), A-(으)ㄴ지 A-(으)ㄴ지 V-는지 V-는지.
// Pronunciation: Liquidization '논란'. Culture: 신문고 (petition drum).

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
  speaking: 'l2u7-speaking',
  readingSpeaking: 'l2u7-reading-speaking',
  listeningSpeaking: 'l2u7-listening-speaking',
  readingWriting: 'l2u7-reading-writing',
  task: 'l2u7-task',
  vocabulary: 'l2u7-vocabulary',
  grammar: 'l2u7-grammar',
  pronunciation: 'l2u7-pronunciation',
  culture: 'l2u7-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Asserting opinions on dramas',
    goals: ['State your view on a drama scene with reasons.'],
    task: 'Assert one strong opinion about a Korean drama.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Public-place behavior blog',
    goals: ['Read a blog about public-place behavior.', 'Take a position.'],
    task: 'Read a blog post and state your view.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Apartment noise + supporting examples',
    goals: ['Listen to apartment-noise complaints.', 'Argue with supporting examples.'],
    task: 'Defend a noise-related opinion using examples.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Movie-theater proposal',
    goals: ['Read a movie-theater proposal.', 'Write a proposal.'],
    task: 'Write three sentences proposing a public-place rule.' },
  { id: ACT.task, section: 'Task', title: 'Speaking on a fixed topic',
    goals: ['Speak on a given topic for one minute.'],
    task: 'Give a one-minute opinion on whether food should be allowed in public buses.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Opinions, actions, and -질 suffix',
    goals: ['Use 의견, 행동, and the negative -질 suffix.'],
    task: 'Use a -질 word in a complaint.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Argument patterns',
    goals: ['A/V-더라도', 'A/V-다고 보다', 'V-(으)ㄴ 채(로)', 'A-(으)ㄴ지 ~ V-는지 (alternatives)'],
    task: 'Use V-(으)ㄴ 채(로) to describe ongoing inappropriate behavior.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Liquidization 논란',
    goals: ['Pronounce ㄴ + ㄹ as [ㄹㄹ] (논란 → [놀란]).'],
    task: 'Read 논란, 신라, 권력 with proper liquidization.' },
  { id: ACT.culture, section: 'Culture Note', title: '신문고 — petition drum',
    goals: ['Understand the historical 신문고 system.'],
    task: 'Compare 신문고 with how citizens raise complaints today.' },
];

const lesson = {
  title: '레벨 2 · 7과: 옳고 그름 (Right and Wrong)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'presenting-opinions', label: 'Presenting opinions', goal: 'Use A-다고 보다 / V-ㄴ/는다고 보다 to present a considered opinion.' },
    { id: 'explaining-with-examples', label: 'Explaining with examples', goal: 'Support an opinion with one specific example.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('의견', 'uigyeon', 'opinion', 'word', '제 의견을 말할게요.', 'I will share my opinion.', null, [ACT.vocabulary]),
    createContentItem('행동', 'haengdong', 'action / behavior', 'word', '행동이 너무 무례해요.', 'The behavior is too rude.', null, [ACT.vocabulary]),
    createContentItem('논란', 'nollan', 'controversy (note [놀란] pronunciation)', 'word', '큰 논란이 있어요.', 'There is a big controversy.', null, [ACT.vocabulary, ACT.pronunciation]),
    createContentItem('소음', 'soeum', 'noise', 'word', '아파트 소음이 심해요.', 'The apartment noise is severe.', null, [ACT.vocabulary]),
    createContentItem('규칙', 'gyuchik', 'rule', 'word', '규칙을 지켜야 해요.', 'You should follow the rules.', null, [ACT.vocabulary]),
    createContentItem('예의', 'yeui', 'manners / etiquette', 'word', '예의를 지키세요.', 'Please mind your manners.', null, [ACT.vocabulary]),
    createContentItem('비매너', 'bimaeneo', 'rudeness / bad manners', 'word', '비매너 행동이 많아요.', 'There is a lot of rude behavior.', null, [ACT.vocabulary]),
    createContentItem('새치기', 'saechigi', 'cutting in line (-기 noun)', 'word', '새치기는 안 돼요.', 'Cutting in line is not allowed.', null, [ACT.vocabulary]),
    createContentItem('욕질', 'yokjil', 'cursing (note -질 suffix = bad behavior noun)', 'word', '공공장소에서 욕질하지 마세요.', 'Do not curse in public places.', null, [ACT.vocabulary]),
    createContentItem('손가락질', 'sonkkarakjil', 'finger-pointing (-질 suffix)', 'word', '손가락질은 무례해요.', 'Pointing fingers is rude.', null, [ACT.vocabulary]),
    createContentItem('찬성하다', 'chanseonghada', 'to agree / approve', 'word', '저는 그 의견에 찬성해요.', 'I agree with that opinion.', null, [ACT.vocabulary]),
    createContentItem('반대하다', 'bandaehada', 'to oppose', 'word', '저는 반대해요.', 'I am against it.', null, [ACT.vocabulary]),

    createContentItem(
      '늦더라도 꼭 와야 해요.', 'neutdeorado kkok waya haeyo.',
      'Even if you are late, you must come.', 'sentence',
      '늦더라도 꼭 와야 해요. 중요한 회의예요.',
      'Even if you are late, you must come. It is an important meeting.',
      [
        { korean: '~더라도', english: 'even if ~' },
        { korean: '꼭', english: 'definitely / for sure' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저는 그 행동이 무례하다고 봐요.', 'jeoneun geu haengdongi muryehadago bwayo.',
      'I see that behavior as rude.', 'sentence',
      '저는 그 행동이 무례하다고 봐요. 다시는 그러지 마세요.',
      'I see that behavior as rude. Do not do that again.',
      [
        { korean: '~다고 보다', english: 'to view as ~' },
      ],
      [ACT.grammar, ACT.readingSpeaking],
    ),
    createContentItem(
      '신발을 신은 채로 들어왔어요.', 'sinbareul sineun chaero deureowasseoyo.',
      'They walked in still wearing shoes.', 'sentence',
      '신발을 신은 채로 들어왔어요. 한국에서는 안 돼요.',
      'They walked in still wearing shoes. That is not allowed in Korea.',
      [
        { korean: '~ㄴ/은 채(로)', english: 'in the state of having ~' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '이게 옳은지 그른지 잘 모르겠어요.', 'ige oreunji geureunji jal moreugesseoyo.',
      'I do not know whether this is right or wrong.', 'sentence',
      '이게 옳은지 그른지 잘 모르겠어요. 더 생각해 봐야겠어요.',
      'I do not know whether this is right or wrong. I need to think more.',
      [
        { korean: 'A-(으)ㄴ지 A-(으)ㄴ지', english: 'whether ~ or ~ (uncertainty between alternatives)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '아파트 소음 토론', 'apateu soeum toron',
      'Apartment noise discussion', 'conversation',
      'A: 윗집 소음이 너무 심해요. 어떻게 해야 할까요?\nB: 저도 그 행동이 너무하다고 봐요. 한번 직접 이야기해 보세요.\nA: 늦더라도 가서 정중하게 말해 볼게요. 그런데 어떻게 시작해야 할지 모르겠어요.\nB: 인사를 하고 자기소개를 한 채로 시작해요. 차분하게요.\nA: 좋은 조언이에요. 화내지 않고 차분히 이야기해 볼게요.',
      'A: The noise from upstairs is severe. What should I do?\nB: I also think the behavior is too much. Try talking to them directly.\nA: Even if late, I will go and speak politely. But I am not sure how to start.\nB: Start by greeting and introducing yourself, calmly.\nA: Good advice. I will talk without getting angry, calmly.',
      [
        { korean: '정중하게', english: 'politely' },
        { korean: '차분하게', english: 'calmly' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
