// Level 2 Track-Adult Unit 4 — 버스를 어디서 탑니까? (Commuting)
// Source: Book 2A·4. Functions: asking about commuter routes, transit cards, terminals.

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
  vocabulary: 'l2au4-vocabulary',
  grammar: 'l2au4-grammar',
  speaking: 'l2au4-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Commute and transit',
    goals: ['Use 정류장, 환승, 교통카드, 출구.'],
    task: 'Describe your commute in two sentences.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'N(으)로 means + 어디서 + N에서 V-습니다',
    goals: ['Use N(으)로 to mark transport.', 'Ask 어디서 + V.'],
    task: 'Ask a coworker how they commute.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Asking the way to the bus stop',
    goals: ['Ask for and follow simple route directions.'],
    task: 'Roleplay asking a coworker how to take a bus to Gumi station.' },
];

const lesson = {
  title: '레벨 2 (직장) · 4과: 버스를 어디서 탑니까? (Commuting)',
  category: 'travel', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'asking-route', label: 'Asking about a route', goal: 'Use 어디서 + 타다/내리다 to ask where to board or get off.' },
    { id: 'stating-commute', label: 'Stating your commute', goal: 'Use N(으)로 + 출근하다 to state how you commute.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('버스 정류장', 'beoseu jeongnyujang', 'bus stop', 'word', '버스 정류장이 어디입니까?', 'Where is the bus stop?', null, [ACT.vocabulary]),
    createContentItem('지하철역', 'jihacheolyeok', 'subway station', 'word', '지하철역까지 멀지 않습니다.', 'The subway station is not far.', null, [ACT.vocabulary]),
    createContentItem('환승', 'hwanseung', 'transfer', 'word', '환승해야 합니다.', 'I need to transfer.', null, [ACT.vocabulary]),
    createContentItem('교통카드', 'gyotongkadeu', 'transit card', 'word', '교통카드를 충전해야 합니다.', 'I need to recharge my transit card.', null, [ACT.vocabulary]),
    createContentItem('충전하다', 'chungjeonhada', 'to recharge / top up', 'word', '편의점에서 충전합니다.', 'I recharge it at a convenience store.', null, [ACT.vocabulary]),
    createContentItem('출구', 'chulgu', 'exit', 'word', '2번 출구로 나오세요.', 'Come out at exit 2.', null, [ACT.vocabulary]),
    createContentItem('회사 셔틀', 'hoesa syeoteul', 'company shuttle bus', 'word', '회사 셔틀을 탑니다.', 'I take the company shuttle.', null, [ACT.vocabulary]),
    createContentItem('통근', 'tonggeun', 'commute', 'word', '통근 시간이 1시간입니다.', 'My commute is 1 hour.', null, [ACT.vocabulary]),
    createContentItem('걸어서', 'georeoseo', 'on foot', 'word', '회사까지 걸어서 갑니다.', 'I walk to work.', null, [ACT.vocabulary]),
    createContentItem('자동차', 'jadongcha', 'automobile', 'word', '자동차로 출근합니다.', 'I commute by car.', null, [ACT.vocabulary]),

    createContentItem(
      '회사까지 버스로 출근합니다.', 'hoesakkaji beoseuro chulgeunhamnida.',
      'I commute to the company by bus.', 'sentence',
      '회사까지 버스로 출근합니다. 약 30분 걸립니다.',
      'I commute to the company by bus. It takes about 30 minutes.',
      [
        { korean: '~까지', english: 'all the way to ~' },
        { korean: '버스로', english: 'by bus' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '여기서 몇 번 버스를 탑니까?', 'yeogiseo myeot beon beoseureul tamnikka?',
      'Which number bus do I take from here?', 'sentence',
      '여기서 몇 번 버스를 탑니까? — 100번 버스를 타십시오.',
      'Which number bus do I take from here? — Take bus 100.',
      [
        { korean: '여기서', english: 'from here (contraction of 여기에서)' },
        { korean: '~번 버스', english: 'bus number ~' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '구미역에서 환승해야 합니다.', 'gumiyeogeseo hwanseunghaeya hamnida.',
      'You have to transfer at Gumi Station.', 'sentence',
      '구미역에서 환승해야 합니다. 그 다음에는 두 정거장 가십시오.',
      'You have to transfer at Gumi Station. Then go two stops.',
      [
        { korean: '~에서 환승하다', english: 'transfer at ~' },
        { korean: '~해야 합니다', english: 'must / have to ~' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '버스 노선 묻기', 'beoseu noseon mutgi',
      'Asking about a bus route', 'conversation',
      'A: 실례합니다. 구미역에 가려면 어디서 버스를 탑니까?\nB: 저기 보이는 정류장에서 100번 버스를 타십시오.\nA: 환승해야 합니까?\nB: 아니요, 한 번에 갑니다. 약 20분 걸립니다.\nA: 교통카드를 사용할 수 있습니까?\nB: 네, 카드를 찍으면 됩니다. 안 가지고 계시면 운전기사한테 현금으로 내십시오.\nA: 감사합니다.',
      'A: Excuse me. To get to Gumi Station, where do I take the bus?\nB: Take bus 100 at the stop you see over there.\nA: Do I have to transfer?\nB: No, it goes there directly. About 20 minutes.\nA: Can I use a transit card?\nB: Yes, just tap the card. If you do not have one, pay the driver in cash.\nA: Thank you.',
      [
        { korean: '~으려면', english: 'in order to ~' },
        { korean: '한 번에 가다', english: 'go directly / in one trip' },
        { korean: '카드를 찍다', english: 'to tap the card' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
