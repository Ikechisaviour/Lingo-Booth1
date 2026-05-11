// Level 2 Unit 6 — 공연과 축제 (Performances and festivals)
// Source: Book 2D Unit 6. Vocab: 감상, 평가, -거리.
// Grammar: A/V-기는(요), A/V-든(지), N(이)야말로, 여간 A-(으)ㄴ 것이 아니다.
// Pronunciation: Intonation of '-기는요'. Culture: Korea's Arirang.

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
  speaking: 'l2u6-speaking',
  readingSpeaking: 'l2u6-reading-speaking',
  listeningSpeaking: 'l2u6-listening-speaking',
  readingWriting: 'l2u6-reading-writing',
  task: 'l2u6-task',
  vocabulary: 'l2u6-vocabulary',
  grammar: 'l2u6-grammar',
  pronunciation: 'l2u6-pronunciation',
  culture: 'l2u6-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Recommending participation in a performance',
    goals: ['Recommend a festival or performance to a classmate.'],
    task: 'Recommend one Korean festival to attend.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Festival intros',
    goals: ['Read festival intros.', 'Introduce a festival.'],
    task: 'Introduce a festival from your country.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Festival news + appreciation',
    goals: ['Listen to a news intro about a festival.', 'Discuss your appreciation.'],
    task: 'Talk about a performance you appreciated.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Performance review',
    goals: ['Read a review.', 'Write a short performance review.'],
    task: 'Write three sentences reviewing a performance.' },
  { id: ACT.task, section: 'Task', title: 'Changing lyrics of Arirang',
    goals: ['Modify a famous Arirang verse to your situation.'],
    task: 'Rewrite one line of Arirang about your life at Kumoh National Institute of Technology.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Appreciation, evaluation, -거리',
    goals: ['Use 감상, 평가, and the -거리 suffix (talking points).'],
    task: 'Use -거리 in a sentence (e.g. 볼거리, 먹거리).' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Festival-talk patterns',
    goals: ['A/V-기는(요)', 'A/V-든(지)', 'N(이)야말로', '여간 A-(으)ㄴ 것이 아니다'],
    task: 'Use N(이)야말로 to highlight what is special about a festival.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Intonation of -기는요',
    goals: ['Use a falling-then-rising contour to soften deflection.'],
    task: 'Read three -기는요 sentences with appropriate softening intonation.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Korea\'s Arirang',
    goals: ['Understand 아리랑 as Korea\'s representative folk song.'],
    task: 'Compare Arirang with a folk song from your culture.' },
];

const lesson = {
  title: '레벨 2 · 6과: 공연과 축제 (Performances and Festivals)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'introducing', label: 'Introducing', goal: 'Use N(이)야말로 to introduce a festival or performance as the must-see option.' },
    { id: 'rating-assessing', label: 'Rating or assessing', goal: 'Use 여간 A-(으)ㄴ 것이 아니다 to express that something is exceptional.' },
  ],
  relatedPools: ['topic-culture'],
  content: [
    createContentItem('공연', 'gongyeon', 'performance', 'word', '공연을 보러 가요.', 'I am going to see a performance.', null, [ACT.vocabulary]),
    createContentItem('축제', 'chukje', 'festival', 'word', '대학 축제가 5월에 있어요.', 'The university festival is in May.', null, [ACT.vocabulary]),
    createContentItem('관객', 'gwangaek', 'audience', 'word', '관객이 많아요.', 'There are many in the audience.', null, [ACT.vocabulary]),
    createContentItem('무대', 'mudae', 'stage', 'word', '무대가 멋있어요.', 'The stage is impressive.', null, [ACT.vocabulary]),
    createContentItem('가수', 'gasu', 'singer', 'word', '유명한 가수가 와요.', 'A famous singer is coming.', null, [ACT.vocabulary]),
    createContentItem('밴드', 'baendeu', 'band', 'word', '밴드 공연을 봤어요.', 'I saw a band performance.', null, [ACT.vocabulary]),
    createContentItem('감상', 'gamsang', 'appreciation / impression', 'word', '공연 감상을 써요.', 'I write my impressions of a performance.', null, [ACT.vocabulary]),
    createContentItem('평가', 'pyeongga', 'evaluation', 'word', '평가가 좋아요.', 'The evaluation is good.', null, [ACT.vocabulary]),
    createContentItem('볼거리', 'bolgeori', 'sights / things to see (-거리)', 'word', '볼거리가 많아요.', 'There are many things to see.', null, [ACT.vocabulary]),
    createContentItem('먹거리', 'meokgeori', 'food (things to eat, -거리)', 'word', '축제에 먹거리가 가득해요.', 'The festival is full of food.', null, [ACT.vocabulary]),
    createContentItem('아리랑', 'arirang', 'Arirang (Korean folk song)', 'word', '아리랑은 한국의 대표 민요예요.', 'Arirang is a representative Korean folk song.', null, [ACT.vocabulary, ACT.culture]),
    createContentItem('전통', 'jeontong', 'tradition / traditional', 'word', '전통 공연이 멋있어요.', 'Traditional performances are impressive.', null, [ACT.vocabulary]),

    createContentItem(
      '제가 잘하기는요. 아직 부족해요.', 'jega jalhagineunyo. ajik bujokhaeyo.',
      'Me, do well? Hardly. I still have a lot to improve.', 'sentence',
      '제가 잘하기는요. 아직 부족해요. 더 연습해야 해요.',
      'Me, do well? Hardly. I still have a lot to improve. I need to practice more.',
      [
        { korean: '~기는요', english: 'deflecting a compliment ("hardly")' },
      ],
      [ACT.grammar, ACT.pronunciation],
    ),
    createContentItem(
      '뭘 먹든지 다 맛있어요.', 'mwol meokdeunji da masisseoyo.',
      'Whatever you eat, it is all delicious.', 'sentence',
      '이 축제는 뭘 먹든지 다 맛있어요. 추천해요.',
      'At this festival, whatever you eat is all delicious. I recommend it.',
      [
        { korean: '~든지', english: 'whatever / whichever' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '아리랑이야말로 한국의 대표 민요예요.', 'aranigi-yamallo hangugui daepyo minyoyeyo.',
      'Arirang is the truly representative Korean folk song.', 'sentence',
      '아리랑이야말로 한국의 대표 민요예요. 외국인들도 쉽게 따라 불러요.',
      'Arirang is the truly representative Korean folk song. Even foreigners can sing along.',
      [
        { korean: 'N(이)야말로', english: 'truly / certainly N (highlighting)' },
      ],
      [ACT.grammar, ACT.culture],
    ),
    createContentItem(
      '여간 멋있는 공연이 아니었어요.', 'yeogan meositneun gongyeoni anieosseoyo.',
      'It was an extraordinary performance.', 'sentence',
      '여간 멋있는 공연이 아니었어요. 다음에도 또 보고 싶어요.',
      'It was an extraordinary performance. I want to see it again next time.',
      [
        { korean: '여간 ~ 아니다', english: 'extraordinary / exceptional (literally: not just)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '대학 축제 추천', 'daehak chukje chucheon',
      'Recommending a university festival', 'conversation',
      'A: 사라야, 다음 주에 우리 학교 대학 축제 있어. 같이 갈래?\nB: 좋아! 뭐가 있어?\nA: 가수 공연도 있고 먹거리도 가득하고 볼거리도 많아.\nB: 표는 비싸?\nA: 비싸기는요. 학생은 무료야.\nB: 와, 그러면 꼭 가야지. 아리랑이야말로 들어 보고 싶어.\nA: 그럼 5시에 정문 앞에서 봐.',
      'A: Sarah, our university festival is next week. Wanna come?\nB: Yes! What is there?\nA: There is a singer\'s performance, food, and lots to see.\nB: Are tickets expensive?\nA: Expensive? Hardly. Free for students.\nB: Wow, then I will definitely go. I really want to hear Arirang.\nA: Then see you at 5 in front of the main gate.',
      [
        { korean: '꼭 가야지', english: 'I should definitely go' },
        { korean: '정문 앞', english: 'in front of the main gate' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
