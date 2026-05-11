// Level 2 Track-Adult Unit 10 — 잘 지켜야 합니다 (Rules and obligations)
// Source: Book 2A·10. Functions: workplace and dormitory rules, social etiquette.

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
  vocabulary: 'l2au10-vocabulary',
  grammar: 'l2au10-grammar',
  speaking: 'l2au10-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Rules, regulations, etiquette',
    goals: ['Use 규칙, 예절, 매너, 벌금.'],
    task: 'List three rules of your workplace.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'V-아/어야 합니다 + V-(으)면 안 됩니다 + V-도록 하다',
    goals: ['Layered obligation grammar from simple to formal.'],
    task: 'State three workplace rules using each pattern.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Explaining a rule to a new coworker',
    goals: ['Explain a rule clearly.', 'Confirm the new coworker understood.'],
    task: 'Roleplay introducing the dorm rules to a new arrival.' },
];

const lesson = {
  title: '레벨 2 (직장) · 10과: 잘 지켜야 합니다 (Rules and Obligations)',
  category: 'business', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'explaining-rule', label: 'Explaining a rule', goal: 'Use V-아/어야 합니다 to state a workplace or dorm rule clearly.' },
    { id: 'confirming-understood', label: 'Confirming the listener understood', goal: 'Ask 이해하셨습니까? and respond appropriately.' },
  ],
  relatedPools: ['topic-society'],
  content: [
    createContentItem('규칙', 'gyuchik', 'rule', 'word', '회사 규칙을 잘 지키십시오.', 'Please follow company rules well.', null, [ACT.vocabulary]),
    createContentItem('예절', 'yejeol', 'etiquette / manners', 'word', '한국의 예절을 배웠습니다.', 'I learned Korean etiquette.', null, [ACT.vocabulary]),
    createContentItem('매너', 'maeneo', 'manners (loanword)', 'word', '매너 모드로 해 주십시오.', 'Please switch to silent mode.', null, [ACT.vocabulary]),
    createContentItem('벌금', 'beolgeum', 'fine / penalty', 'word', '벌금을 내야 합니다.', 'You have to pay a fine.', null, [ACT.vocabulary]),
    createContentItem('금지', 'geumji', 'prohibition', 'word', '여기는 흡연 금지입니다.', 'Smoking is prohibited here.', null, [ACT.vocabulary]),
    createContentItem('지각', 'jigak', 'tardiness', 'word', '지각하면 안 됩니다.', 'You must not be late.', null, [ACT.vocabulary]),
    createContentItem('출근부', 'chulgeunbu', 'attendance log', 'word', '출근부에 사인하십시오.', 'Sign the attendance log.', null, [ACT.vocabulary]),
    createContentItem('보고', 'bogo', 'report', 'word', '상황을 보고하십시오.', 'Please report the situation.', null, [ACT.vocabulary]),
    createContentItem('지키다', 'jikida', 'to keep / observe (a rule)', 'word', '약속을 지킵시다.', 'Let us keep our word.', null, [ACT.vocabulary]),
    createContentItem('어기다', 'eogida', 'to break (a rule)', 'word', '규칙을 어기지 마십시오.', 'Do not break the rules.', null, [ACT.vocabulary]),
    createContentItem('재활용', 'jaehwaryong', 'recycling', 'word', '재활용을 잘 합시다.', 'Let us recycle properly.', null, [ACT.vocabulary]),
    createContentItem('분리수거', 'bullisugeo', 'separate-waste collection', 'word', '분리수거 규칙이 엄격합니다.', 'Separate-waste collection rules are strict.', null, [ACT.vocabulary]),

    createContentItem(
      '회사 규칙을 잘 지켜야 합니다.', 'hoesa gyuchigeul jal jikyeoya hamnida.',
      'You must follow company rules well.', 'sentence',
      '회사 규칙을 잘 지켜야 합니다. 출근부에 사인도 잊지 마십시오.',
      'You must follow company rules well. Do not forget to sign the attendance log either.',
      [
        { korean: 'V-아/어야 합니다', english: 'must ~ (formal obligation)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '회사에서 휴대폰을 쓰면 안 됩니다.', 'hoesaeseo hyudaeponeul sseumyeon an doemnida.',
      'You may not use mobile phones at the company.', 'sentence',
      '근무 중에는 휴대폰을 쓰면 안 됩니다. 점심 시간에는 사용할 수 있습니다.',
      'You may not use mobile phones during work. You can use them at lunch.',
      [
        { korean: 'V-(으)면 안 됩니다', english: 'must not ~' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '재활용을 잘 하도록 하십시오.', 'jaehwaryongeul jal hadorok hasipsio.',
      'Please make sure to recycle properly.', 'sentence',
      '재활용을 잘 하도록 하십시오. 종이와 플라스틱을 분리하십시오.',
      'Please make sure to recycle properly. Separate paper and plastic.',
      [
        { korean: 'V-도록 하다', english: 'to make sure to ~ (formal directive)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '신입 동료에게 규칙 설명', 'sinip dongnyoege gyuchik seolmyeong',
      'Explaining rules to a new coworker', 'conversation',
      'A: 사라 씨, 환영합니다. 회사 규칙을 좀 알려 드릴게요.\nB: 네, 부탁드립니다.\nA: 첫째, 매일 8시까지 출근부에 사인하셔야 합니다. 지각하면 안 됩니다.\nB: 네, 알겠습니다.\nA: 둘째, 근무 중에는 휴대폰을 사용하면 안 됩니다.\nB: 점심 시간에는 괜찮습니까?\nA: 네, 점심 시간과 휴식 시간에는 사용하셔도 됩니다. 또 분리수거를 잘 하도록 하세요.\nB: 이해했습니다. 잘 지키겠습니다.',
      'A: Sarah, welcome. Let me tell you the company rules.\nB: Yes, please.\nA: First, you must sign the attendance log by 8 every day. Do not be late.\nB: Yes, understood.\nA: Second, you may not use your phone during work.\nB: Is lunch break okay?\nA: Yes, you may use it during lunch and breaks. Also, make sure to recycle properly.\nB: I understand. I will follow them well.',
      [
        { korean: '환영합니다', english: 'welcome' },
        { korean: '이해했습니다', english: 'I understood' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
