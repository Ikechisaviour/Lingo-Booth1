// Level 2 Track-Adult Unit 7 — 안전모를 벗지 마십시오 (Workplace safety, prohibitions)
// Source: Book 2A·7. Functions: safety rules, prohibitions, accident reporting.

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
  vocabulary: 'l2au7-vocabulary',
  grammar: 'l2au7-grammar',
  speaking: 'l2au7-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Safety gear and hazards',
    goals: ['Name protective equipment.', 'Use 위험, 사고, 응급.'],
    task: 'List five safety items in a factory.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'V-지 마십시오 + V-아/어야 합니다 + V-(으)면 안 됩니다',
    goals: ['Forbid with V-지 마십시오.', 'Require with V-아/어야 합니다.', 'Prohibit with V-(으)면 안 됩니다.'],
    task: 'Write three workplace rules using each of the three patterns.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Reporting an accident',
    goals: ['Report a small accident.', 'Ask for first aid.'],
    task: 'Roleplay reporting a minor injury to your supervisor.' },
];

const lesson = {
  title: '레벨 2 (직장) · 7과: 안전모를 벗지 마십시오 (Workplace Safety)',
  category: 'business', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'stating-rule', label: 'Stating a workplace rule', goal: 'Use V-지 마십시오 / V-아/어야 합니다 to convey a rule.' },
    { id: 'reporting-accident', label: 'Reporting an accident', goal: 'Report what happened, where, and to whom in 2-3 short sentences.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('안전모', 'anjeonmo', 'safety helmet / hard hat', 'word', '안전모를 꼭 쓰십시오.', 'Be sure to wear the helmet.', null, [ACT.vocabulary]),
    createContentItem('안전화', 'anjeonhwa', 'safety shoes', 'word', '안전화를 신어야 합니다.', 'You must wear safety shoes.', null, [ACT.vocabulary]),
    createContentItem('보호 장갑', 'boho janggap', 'protective gloves', 'word', '보호 장갑을 끼십시오.', 'Please wear protective gloves.', null, [ACT.vocabulary]),
    createContentItem('보호 안경', 'boho angyeong', 'safety goggles', 'word', '용접할 때 보호 안경을 끼십시오.', 'Wear goggles when welding.', null, [ACT.vocabulary]),
    createContentItem('위험', 'wiheom', 'danger', 'word', '여기는 위험합니다.', 'It is dangerous here.', null, [ACT.vocabulary]),
    createContentItem('사고', 'sago', 'accident', 'word', '사고가 났습니다.', 'There was an accident.', null, [ACT.vocabulary]),
    createContentItem('응급', 'eunggeup', 'emergency', 'word', '응급 상황입니다.', 'It is an emergency.', null, [ACT.vocabulary]),
    createContentItem('응급실', 'eunggeupsil', 'emergency room', 'word', '응급실로 가십시오.', 'Go to the emergency room.', null, [ACT.vocabulary]),
    createContentItem('다치다', 'dachida', 'to get injured', 'word', '손을 다쳤습니다.', 'I hurt my hand.', null, [ACT.vocabulary]),
    createContentItem('조심하다', 'josimhada', 'to be careful', 'word', '조심하십시오.', 'Please be careful.', null, [ACT.vocabulary]),
    createContentItem('금연', 'geumyeon', 'no smoking', 'word', '여기는 금연 구역입니다.', 'This is a non-smoking area.', null, [ACT.vocabulary]),
    createContentItem('비상구', 'bisanggu', 'emergency exit', 'word', '비상구를 막지 마십시오.', 'Do not block the emergency exit.', null, [ACT.vocabulary]),

    createContentItem(
      '안전모를 벗지 마십시오.', 'anjeonmoreul beotji masipsio.',
      'Do not take off your safety helmet.', 'sentence',
      '작업 중에는 안전모를 벗지 마십시오. 위험합니다.',
      'Do not take off your safety helmet during work. It is dangerous.',
      [
        { korean: 'V-지 마십시오', english: 'do not ~ (formal prohibition)' },
        { korean: '작업 중', english: 'during work' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '항상 보호 장갑을 끼셔야 합니다.', 'hangsang boho janggabeul kkisyeoya hamnida.',
      'You must always wear protective gloves.', 'sentence',
      '항상 보호 장갑을 끼셔야 합니다. 손을 다칠 수 있습니다.',
      'You must always wear protective gloves. You could hurt your hand.',
      [
        { korean: 'V-아/어야 합니다', english: 'must ~ (formal requirement)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '비상구 앞에 짐을 두면 안 됩니다.', 'bisanggu ape jimeul dumyeon an doemnida.',
      'You may not place items in front of the emergency exit.', 'sentence',
      '비상구 앞에 짐을 두면 안 됩니다. 응급 상황 때 위험합니다.',
      'You may not place items in front of the emergency exit. It is dangerous in an emergency.',
      [
        { korean: 'V-(으)면 안 됩니다', english: 'must not ~' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '사고 신고', 'sago singo',
      'Reporting an accident', 'conversation',
      'A (직원): 과장님, 죄송합니다. 작업 중에 손을 좀 다쳤습니다.\nB (과장): 어떻게 다쳤어요? 많이 아픕니까?\nA: 기계에 손가락이 끼었습니다. 피가 좀 납니다.\nB: 빨리 응급실로 가야 합니다. 제가 같이 갈게요.\nA: 감사합니다. 보호 장갑을 끼고 있었는데도 다쳤습니다.\nB: 사고는 누구한테나 일어날 수 있어요. 일단 치료를 받고 보고서를 쓰지요.',
      'A (worker): Manager, I am sorry. I cut my hand a little while working.\nB (manager): How did you get hurt? Does it hurt a lot?\nA: My finger got caught in the machine. There is some bleeding.\nB: We have to get to the emergency room quickly. I will go with you.\nA: Thank you. I was wearing protective gloves but still got hurt.\nB: Accidents can happen to anyone. Let us get treatment first and write a report after.',
      [
        { korean: '기계에 끼이다', english: 'to get caught in a machine' },
        { korean: '피가 나다', english: 'to bleed' },
        { korean: '보고서', english: 'report' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
