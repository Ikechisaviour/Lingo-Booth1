// Level 1 Unit 13 — Transportation
// Source: Book 1B·11 (터미널에 어떻게 가요?)
// Functions: asking how to get somewhere, naming transport, taking the bus/subway.

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
  vocabulary: 'l1u13-vocabulary',
  grammar: 'l1u13-grammar',
  speaking: 'l1u13-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Transport modes and stops',
    goals: ['Name common transport: 버스, 지하철, 택시, 기차, 비행기.', 'Use 정류장 / 역 / 공항.'],
    task: 'Say how you usually go to school and one alternative.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: '어떻게 가요? + N(으)로 + N에서 N까지 + 갈아타다',
    goals: [
      'Ask 어떻게 가요? (how do you get there).',
      'Use N(으)로 to mark means: 버스로, 지하철로.',
      'Use 에서 ~ 까지 to mark from-to.',
      'Use 갈아타다 to express transferring lines.',
    ],
    task: 'Explain how to get from Kumoh National Institute of Technology to Seoul Station.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Asking for directions to a destination',
    goals: ['Ask how to get to a terminal.', 'Understand simple route directions.'],
    task: 'Roleplay asking a passerby how to get to the bus terminal.',
  },
];

const lesson = {
  title: '레벨 1 · 13과: 터미널에 어떻게 가요? (Transportation)',
  category: 'travel', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-how-to-get', label: 'Asking how to get somewhere', goal: 'Use ~에 어떻게 가요? to ask the route to a place.' },
    { id: 'stating-means', label: 'Stating means of transport', goal: 'Use N(으)로 to say which transport you take.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('버스', 'beoseu', 'bus', 'word', '버스로 학교에 가요.', 'I go to school by bus.', null, [ACT.vocabulary]),
    createContentItem('지하철', 'jihacheol', 'subway', 'word', '지하철이 빠르고 편해요.', 'The subway is fast and convenient.', null, [ACT.vocabulary]),
    createContentItem('택시', 'taeksi', 'taxi', 'word', '택시를 타요.', 'I take a taxi.', null, [ACT.vocabulary]),
    createContentItem('기차', 'gicha', 'train', 'word', '기차로 부산에 가요.', 'I go to Busan by train.', null, [ACT.vocabulary]),
    createContentItem('KTX', 'KTX', 'KTX (high-speed train)', 'word', 'KTX는 정말 빨라요.', 'The KTX is really fast.', null, [ACT.vocabulary]),
    createContentItem('비행기', 'bihaenggi', 'airplane', 'word', '비행기로 한국에 왔어요.', 'I came to Korea by plane.', null, [ACT.vocabulary]),
    createContentItem('자전거', 'jajeongeo', 'bicycle', 'word', '자전거를 타요.', 'I ride a bike.', null, [ACT.vocabulary]),
    createContentItem('걸어서', 'georeoseo', 'on foot / by walking', 'word', '학교에 걸어서 가요.', 'I walk to school.', null, [ACT.vocabulary]),
    createContentItem('정류장', 'jeongnyujang', 'bus stop', 'word', '버스 정류장이 어디에 있어요?', 'Where is the bus stop?', null, [ACT.vocabulary]),
    createContentItem('역', 'yeok', 'station', 'word', '서울역에서 만나요.', 'Let us meet at Seoul Station.', null, [ACT.vocabulary]),
    createContentItem('공항', 'gonghang', 'airport', 'word', '공항까지 1시간 걸려요.', 'It takes an hour to the airport.', null, [ACT.vocabulary]),
    createContentItem('터미널', 'teomineol', 'terminal', 'word', '버스 터미널이 가까워요.', 'The bus terminal is close.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('타다', 'tada', 'to ride / take (transport)', 'word', '지하철을 타요.', 'I take the subway.', null, [ACT.vocabulary]),
    createContentItem('내리다', 'naerida', 'to get off', 'word', '다음 역에서 내려요.', 'I get off at the next station.', null, [ACT.vocabulary]),
    createContentItem('갈아타다', 'garatada', 'to transfer', 'word', '서울역에서 갈아타세요.', 'Please transfer at Seoul Station.', null, [ACT.vocabulary]),
    createContentItem('걸리다', 'geollida', 'to take (time)', 'word', '한 시간 걸려요.', 'It takes an hour.', null, [ACT.vocabulary]),

    createContentItem(
      '터미널에 어떻게 가요?', 'teomineore eotteoke gayo?',
      'How do I get to the terminal?', 'sentence',
      '터미널에 어떻게 가요? — 버스로 가세요.',
      'How do I get to the terminal? — Take the bus.',
      [
        { korean: '터미널에', english: 'to the terminal' },
        { korean: '어떻게 가요?', english: 'how do you go?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저는 학교에 지하철로 가요.', 'jeoneun hakgyoe jihacheollo gayo.',
      'I go to school by subway.', 'sentence',
      '저는 학교에 지하철로 가요. 30분 걸려요.',
      'I go to school by subway. It takes 30 minutes.',
      [
        { korean: '지하철로', english: 'by subway (N(으)로 means)' },
        { korean: '걸려요', english: 'takes (time)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '여기에서 서울역까지 얼마나 걸려요?', 'yeogieseo seoulyeokkkaji eolmana geollyeoyo?',
      'How long does it take from here to Seoul Station?', 'sentence',
      '여기에서 서울역까지 얼마나 걸려요? — 약 한 시간 걸려요.',
      'How long does it take from here to Seoul Station? — About an hour.',
      [
        { korean: '여기에서 ~까지', english: 'from here to ~' },
        { korean: '얼마나 걸려요?', english: 'how long does it take?' },
        { korean: '약 한 시간', english: 'about an hour' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '서울역에서 갈아타세요.', 'seoulyeogeseo garataseyo.',
      'Please transfer at Seoul Station.', 'sentence',
      '서울역에서 4호선으로 갈아타세요. 그리고 두 정거장 가세요.',
      'Please transfer to Line 4 at Seoul Station. Then go two stops.',
      [
        { korean: '서울역에서', english: 'at Seoul Station' },
        { korean: '갈아타세요', english: 'please transfer' },
        { korean: '두 정거장', english: 'two stops' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '버스 터미널이 어디예요?', 'beoseu teomineori eodiyeyo?',
      'Where is the bus terminal?', 'conversation',
      'A: 실례합니다. 버스 터미널에 어떻게 가요?\nB: 여기에서 100번 버스를 타세요.\nA: 어디에서 내려요?\nB: 터미널 앞 정류장에서 내리세요. 약 20분 걸려요.\nA: 감사합니다.',
      'A: Excuse me. How do I get to the bus terminal?\nB: Take bus number 100 from here.\nA: Where do I get off?\nB: Get off at the stop in front of the terminal. About 20 minutes.\nA: Thank you.',
      [
        { korean: '~번 버스', english: 'bus number ~' },
        { korean: '~에서 내리세요', english: 'please get off at ~' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
