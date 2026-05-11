// Level 2 Track-Adult Unit 8 — 어디가 아프십니까? (Workplace medical)
// Source: Book 2A·8. Functions: workplace medical situations, sick leave, prescriptions.

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
  vocabulary: 'l2au8-vocabulary',
  grammar: 'l2au8-grammar',
  speaking: 'l2au8-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Symptoms, treatment, leave',
    goals: ['Use 두통, 몸살, 치료, 병가, 처방.'],
    task: 'Describe how you feel today and ask if you can rest.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'A-(으)ㄴ 것 같습니다 + V-아/어 보십시오 + N 후에',
    goals: ['Soften with A-(으)ㄴ 것 같다.', 'Suggest with V-아/어 보십시오.', 'Sequence with N 후에 / V-(으)ㄴ 후에.'],
    task: 'Use 같다 to soften a complaint and 보십시오 to give advice.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Asking for sick leave',
    goals: ['Politely request sick leave.', 'Confirm prescription instructions.'],
    task: 'Roleplay calling your supervisor for half-day sick leave.' },
];

const lesson = {
  title: '레벨 2 (직장) · 8과: 어디가 아프십니까? (Workplace Medical)',
  category: 'healthcare', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'requesting-leave', label: 'Requesting sick leave', goal: 'Use 몸이 안 좋다 + 병가 + V-고 싶다 to request leave.' },
    { id: 'softening-complaint', label: 'Softening a complaint', goal: 'Use A-(으)ㄴ 것 같다 to describe a vague symptom politely.' },
  ],
  relatedPools: ['topic-health'],
  content: [
    createContentItem('두통', 'dutong', 'headache', 'word', '두통이 심합니다.', 'I have a bad headache.', null, [ACT.vocabulary]),
    createContentItem('몸살', 'momsal', 'body aches / flu-like symptoms', 'word', '몸살이 났습니다.', 'I have body aches.', null, [ACT.vocabulary]),
    createContentItem('병가', 'byeonga', 'sick leave', 'word', '병가를 신청합니다.', 'I am applying for sick leave.', null, [ACT.vocabulary]),
    createContentItem('처방', 'cheobang', 'prescription', 'word', '의사 처방을 받았습니다.', 'I received a doctor\'s prescription.', null, [ACT.vocabulary]),
    createContentItem('약국', 'yakguk', 'pharmacy', 'word', '약국에서 약을 받았습니다.', 'I got medicine at the pharmacy.', null, [ACT.vocabulary]),
    createContentItem('진료', 'jinryo', 'medical examination', 'word', '진료를 받고 왔습니다.', 'I came back from a medical exam.', null, [ACT.vocabulary]),
    createContentItem('내과', 'naegwa', 'internal medicine clinic', 'word', '내과에 가십시오.', 'Please go to internal medicine.', null, [ACT.vocabulary]),
    createContentItem('정형외과', 'jeonghyeong-oegwa', 'orthopedic clinic', 'word', '정형외과에서 검사 받았습니다.', 'I had an orthopedic check.', null, [ACT.vocabulary]),
    createContentItem('보험증', 'boheomjeung', 'insurance card', 'word', '보험증을 가지고 가십시오.', 'Please bring your insurance card.', null, [ACT.vocabulary]),
    createContentItem('식후', 'sikhu', 'after a meal', 'word', '식후 30분에 드십시오.', 'Take it 30 minutes after a meal.', null, [ACT.vocabulary]),
    createContentItem('회복', 'hoebok', 'recovery', 'word', '빨리 회복하십시오.', 'Get well soon.', null, [ACT.vocabulary]),
    createContentItem('휴식', 'hyusik', 'rest', 'word', '충분한 휴식이 필요합니다.', 'You need sufficient rest.', null, [ACT.vocabulary]),

    createContentItem(
      '몸살이 난 것 같습니다.', 'momsari nan geot gatseumnida.',
      'It seems I have come down with body aches.', 'sentence',
      '어제부터 몸살이 난 것 같습니다. 열도 좀 있습니다.',
      'It seems I have come down with body aches since yesterday. I also have a slight fever.',
      [
        { korean: 'A-(으)ㄴ 것 같다', english: 'it seems ~ (softening)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '내과에 한번 가 보십시오.', 'naegwae hanbeon ga bosipsio.',
      'Try going to internal medicine.', 'sentence',
      '내과에 한번 가 보십시오. 좋은 의사 선생님이 계십니다.',
      'Try going to internal medicine. There is a good doctor.',
      [
        { korean: 'V-아/어 보십시오', english: 'try ~ (formal suggestion)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '식후 30분 후에 드십시오.', 'sikhu samsippun hue deusipsio.',
      'Please take it 30 minutes after a meal.', 'sentence',
      '식후 30분 후에 드십시오. 하루에 세 번입니다.',
      'Please take it 30 minutes after a meal. Three times a day.',
      [
        { korean: 'N 후에', english: 'after N' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '병가 요청', 'byeonga yocheong',
      'Asking for sick leave', 'conversation',
      'A (직원): 과장님, 안녕하십니까. 죄송하지만 오늘 몸이 너무 안 좋아서 병가를 신청하고 싶습니다.\nB (과장): 어디가 아프세요?\nA: 어제부터 두통이 심하고 몸살이 난 것 같습니다.\nB: 그러면 병원에 가 보세요. 진단서가 있으면 더 좋습니다.\nA: 네, 알겠습니다. 진료받고 다시 연락 드리겠습니다.\nB: 푹 쉬시고 빨리 회복하시기 바랍니다.',
      'A (employee): Manager, hello. I am sorry, but I am not feeling well today and would like to apply for sick leave.\nB (manager): What is wrong?\nA: I have had a bad headache since yesterday and seem to have body aches.\nB: Then go see a doctor. A medical certificate would be better.\nA: Yes, understood. I will call again after my exam.\nB: Rest well and I hope you recover quickly.',
      [
        { korean: '진단서', english: 'medical certificate' },
        { korean: '연락 드리다', english: 'to contact (humble)' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
