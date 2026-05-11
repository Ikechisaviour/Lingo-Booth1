// Level 2 Unit 8 — 흥미로운 세상 (Intriguing world)
// Source: Book 2D Unit 8. Vocab: 문화, 특징, -별.
// Grammar: V-아다(가)/어다(가), A-다는 N V-ㄴ/는다는 N, N을/를 비롯해서[비롯한], A/V-(으)며.
// Pronunciation: Aspiration '비롯해서'. Culture: 제주도의 정낭 (Jeju pole-fence gates).

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
  speaking: 'l2u8-speaking',
  readingSpeaking: 'l2u8-reading-speaking',
  listeningSpeaking: 'l2u8-listening-speaking',
  readingWriting: 'l2u8-reading-writing',
  task: 'l2u8-task',
  vocabulary: 'l2u8-vocabulary',
  grammar: 'l2u8-grammar',
  pronunciation: 'l2u8-pronunciation',
  culture: 'l2u8-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Explaining market info',
    goals: ['Explain a marketplace finding.'],
    task: 'Explain one fact about a market in your country.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Game explanations',
    goals: ['Read game explanations.'],
    task: 'Explain a game from your hometown.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Korean dialect presentation',
    goals: ['Listen to a presentation about Korean dialects.', 'Ask follow-up questions.'],
    task: 'Ask one question after listening.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Minority culture writing',
    goals: ['Read about minority cultures.', 'Write an explanation.'],
    task: 'Write three sentences about a minority culture you know.' },
  { id: ACT.task, section: 'Task', title: 'Writing presentations',
    goals: ['Write a brief presentation outline.'],
    task: 'Outline a presentation about an interesting feature of your country.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Culture, characteristics, -별',
    goals: ['Use 문화, 특징, and -별 (per/by suffix).'],
    task: 'Use 나라별 / 지역별 / 도시별 in three sentences.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Description and inclusion patterns',
    goals: ['V-아다(가)/어다(가)', 'A-다는 N / V-ㄴ다는 N', 'N을/를 비롯해서', 'A/V-(으)며'],
    task: 'Use N을/를 비롯해서 to introduce one cultural feature.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Aspiration "비롯해서"',
    goals: ['Pronounce 비롯 → [비로타] before 해서 (aspiration).'],
    task: 'Read 비롯해서, 비롯하여 with proper aspiration.' },
  { id: ACT.culture, section: 'Culture Note', title: '제주도의 정낭 — Jeju pole-fence gates',
    goals: ['Understand 정낭 as a traditional Jeju door system.'],
    task: 'Compare 정낭 with traditional doors from your culture.' },
];

const lesson = {
  title: '레벨 2 · 8과: 흥미로운 세상 (Intriguing World)',
  category: 'travel', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-questions', label: 'Asking questions', goal: 'Ask follow-up questions about a presentation.' },
    { id: 'replying', label: 'Replying to questions', goal: 'Use A-다는 N / V-ㄴ/는다는 N to formulate a thoughtful answer.' },
  ],
  relatedPools: ['topic-culture'],
  content: [
    createContentItem('문화', 'munhwa', 'culture', 'word', '한국 문화는 다양해요.', 'Korean culture is diverse.', null, [ACT.vocabulary]),
    createContentItem('특징', 'teukjing', 'characteristic', 'word', '특징을 설명할게요.', 'I will explain the characteristics.', null, [ACT.vocabulary]),
    createContentItem('지역', 'jiyeok', 'region', 'word', '지역마다 사투리가 달라요.', 'Each region has a different dialect.', null, [ACT.vocabulary]),
    createContentItem('사투리', 'saturi', 'dialect', 'word', '경상도 사투리는 강해요.', 'The Gyeongsang dialect is strong.', null, [ACT.vocabulary]),
    createContentItem('전통', 'jeontong', 'tradition', 'word', '전통이 잘 보존돼 있어요.', 'The tradition is well preserved.', null, [ACT.vocabulary]),
    createContentItem('소수 민족', 'sosu minjok', 'minority group', 'word', '소수 민족 문화도 중요해요.', 'Minority-group culture is also important.', null, [ACT.vocabulary]),
    createContentItem('나라별', 'narabyeol', 'by country (-별 suffix)', 'word', '나라별 인사가 달라요.', 'Greetings differ by country.', null, [ACT.vocabulary]),
    createContentItem('지역별', 'jiyeokbyeol', 'by region', 'word', '지역별 음식이 다양해요.', 'Foods differ by region.', null, [ACT.vocabulary]),
    createContentItem('도시별', 'dosibyeol', 'by city', 'word', '도시별 인구가 달라요.', 'Populations differ by city.', null, [ACT.vocabulary]),
    createContentItem('정낭', 'jeongnang', 'Jeju pole-fence gate (cultural item)', 'word', '정낭은 제주도의 문이에요.', 'Jeongnang is a Jeju-style gate.', null, [ACT.vocabulary, ACT.culture]),
    createContentItem('전통 시장', 'jeontong sijang', 'traditional market', 'word', '전통 시장이 활기차요.', 'The traditional market is lively.', null, [ACT.vocabulary]),

    createContentItem(
      '시장에서 사 가지고 와서 만들었어요.', 'sijangeseo sa gajigo waseo mandeureosseoyo.',
      'I bought it at the market, brought it back, and made it.', 'sentence',
      '시장에서 재료를 사 가지고 와서 김치찌개를 만들었어요.',
      'I bought ingredients at the market, brought them back, and made kimchi stew.',
      [
        { korean: '~아/어다(가)', english: 'do something elsewhere then come back to do another thing' },
        { korean: '사 가지고 와서', english: 'bought and brought back' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '한국에서는 명절을 중요시한다는 특징이 있어요.', 'hangugeseoneun myeongjeoreul jungyosihandaneun teukjingi isseoyo.',
      'A characteristic of Korea is that holidays are valued.', 'sentence',
      '한국에서는 명절을 중요시한다는 특징이 있어요. 가족이 함께 모여요.',
      'A characteristic of Korea is that holidays are valued. Families gather together.',
      [
        { korean: 'V-ㄴ/는다는 N', english: 'the N that ~ (description as a noun)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한복을 비롯해서 한국 전통 옷이 많아요.', 'hanbogeul birothaeso hanguk jeontong osi manayo.',
      'Including hanbok, there are many traditional Korean clothes.', 'sentence',
      '한복을 비롯해서 한국 전통 옷이 많아요. 명절에 입어요.',
      'Including hanbok, there are many traditional Korean clothes. People wear them on holidays.',
      [
        { korean: 'N을/를 비롯해서', english: 'including N (as the leading example)' },
      ],
      [ACT.grammar, ACT.pronunciation],
    ),
    createContentItem(
      '제주도는 바람이 많이 불며 따뜻해요.', 'jejudoneun barami mani bulmyeo ttatteuthaeyo.',
      'Jeju Island has lots of wind and is warm.', 'sentence',
      '제주도는 바람이 많이 불며 따뜻해요. 그래서 농사가 잘 돼요.',
      'Jeju Island has lots of wind and is warm. So farming goes well.',
      [
        { korean: 'A/V-(으)며', english: 'and (formal-leaning connector)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '정낭의 비밀', 'jeongnangui bimil',
      'The secret of Jeju\'s jeongnang', 'conversation',
      'A: 제주도에 처음 왔는데 이 정낭이 뭐예요?\nB: 제주도 전통 문이에요. 막대기 세 개로 만든다는 특징이 있어요.\nA: 막대기를 어떻게 사용해요?\nB: 막대기가 다 올라가 있으면 집에 사람이 없다는 뜻이에요. 두 개면 곧 돌아온다는 뜻이고요.\nA: 정말 흥미롭네요. 다른 지역에는 없어요?\nB: 한복을 비롯해서 다른 전통 문화도 있지만 이건 제주도만의 특징이에요.',
      'A: I am visiting Jeju for the first time — what is this jeongnang?\nB: It is a traditional Jeju gate. Its feature is that it is made of three poles.\nA: How do you use the poles?\nB: When all the poles are up, it means no one is home. Two means they will return soon.\nA: Really interesting. Is it not in other regions?\nB: There are other traditions including hanbok, but this is unique to Jeju.',
      [
        { korean: '막대기', english: 'pole / stick' },
        { korean: '곧', english: 'soon' },
        { korean: '제주도만의', english: 'unique to Jeju (only Jeju\'s)' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
