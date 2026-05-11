// Level 1 Unit 18 — Health & body
// Source: Book 1B·15 (머리가 아파요)
// Functions: describing pain, talking to a doctor, taking medicine.

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
  vocabulary: 'l1u18-vocabulary',
  grammar: 'l1u18-grammar',
  speaking: 'l1u18-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Body parts and symptom words',
    goals: ['Name body parts.', 'Describe basic symptoms.'],
    task: 'Say where it hurts in three different sentences.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'N이/가 아파요 + V-지 마세요 + V-아/어도 되다',
    goals: [
      'State pain with N이/가 아프다.',
      'Give a prohibition with V-지 마세요.',
      'Ask permission with V-아/어도 돼요?',
    ],
    task: 'Tell the tutor where it hurts and ask if you may do something.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Visiting a clinic',
    goals: ['Describe symptoms.', 'Understand prescription instructions.'],
    task: 'Roleplay visiting a clinic near Kumoh National Institute of Technology with a cold.',
  },
];

const lesson = {
  title: '레벨 1 · 18과: 머리가 아파요 (Health and Body)',
  category: 'healthcare', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-symptoms', label: 'Describing symptoms', goal: 'Use N이/가 아파요 + symptom words to describe how you feel.' },
    { id: 'asking-permission', label: 'Asking permission at a clinic', goal: 'Use V-아/어도 돼요? to ask whether you may eat, drink, or exercise.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('머리', 'meori', 'head / hair', 'word', '머리가 아파요.', 'My head hurts.', null, [ACT.vocabulary]),
    createContentItem('배', 'bae', 'stomach / belly', 'word', '배가 아파요.', 'My stomach hurts.', null, [ACT.vocabulary]),
    createContentItem('다리', 'dari', 'leg', 'word', '다리가 아파요.', 'My leg hurts.', null, [ACT.vocabulary]),
    createContentItem('팔', 'pal', 'arm', 'word', '팔이 아파요.', 'My arm hurts.', null, [ACT.vocabulary]),
    createContentItem('목', 'mok', 'neck / throat', 'word', '목이 아파요.', 'My throat hurts.', null, [ACT.vocabulary]),
    createContentItem('어깨', 'eokkae', 'shoulder', 'word', '어깨가 아파요.', 'My shoulder hurts.', null, [ACT.vocabulary]),
    createContentItem('등', 'deung', 'back', 'word', '등이 아파요.', 'My back hurts.', null, [ACT.vocabulary]),
    createContentItem('아프다', 'apeuda', 'to be in pain / to hurt', 'word', '많이 아파요.', 'It hurts a lot.', null, [ACT.vocabulary]),
    createContentItem('약', 'yak', 'medicine', 'word', '약을 먹어요.', 'I take medicine.', null, [ACT.vocabulary]),
    createContentItem('병원', 'byeongwon', 'hospital / clinic', 'word', '병원에 가야 해요.', 'I have to go to the hospital.', null, [ACT.vocabulary]),
    createContentItem('의사', 'uisa', 'doctor', 'word', '의사 선생님이세요.', 'You are the doctor.', null, [ACT.vocabulary]),
    createContentItem('감기', 'gamgi', 'cold (illness)', 'word', '감기에 걸렸어요.', 'I caught a cold.', null, [ACT.vocabulary]),
    createContentItem('열', 'yeol', 'fever', 'word', '열이 나요.', 'I have a fever.', null, [ACT.vocabulary]),
    createContentItem('기침', 'gichim', 'cough', 'word', '기침이 심해요.', 'My cough is severe.', null, [ACT.vocabulary]),
    createContentItem('콧물', 'konmul', 'runny nose', 'word', '콧물이 나요.', 'I have a runny nose.', null, [ACT.vocabulary]),

    createContentItem(
      '머리가 너무 아파요.', 'meoriga neomu apayo.',
      'My head hurts a lot.', 'sentence',
      '머리가 너무 아파요. 약을 먹고 싶어요.',
      'My head hurts a lot. I want to take medicine.',
      [
        { korean: '머리가', english: 'head + subject' },
        { korean: '너무 아파요', english: 'hurts a lot (아프다 → 아파요)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '오늘은 운동하지 마세요.', 'oneureun undonghaji maseyo.',
      'Do not exercise today.', 'sentence',
      '오늘은 운동하지 마세요. 푹 쉬세요.',
      'Do not exercise today. Get plenty of rest.',
      [
        { korean: '운동하지 마세요', english: 'do not exercise (V-지 마세요)' },
        { korean: '푹 쉬세요', english: 'rest well' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '커피를 마셔도 돼요?', 'keopireul masyeodo dwaeyo?',
      'May I drink coffee?', 'sentence',
      '커피를 마셔도 돼요? — 오늘은 마시지 마세요.',
      'May I drink coffee? — Do not drink today.',
      [
        { korean: '커피를', english: 'coffee + object' },
        { korean: '마셔도 돼요?', english: 'may I drink? (V-아/어도 되다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '감기에 걸려서 병원에 가요.', 'gamgie geollyeoseo byeongwone gayo.',
      'I caught a cold so I am going to the clinic.', 'sentence',
      '감기에 걸려서 병원에 가요. 약을 받을 거예요.',
      'I caught a cold so I am going to the clinic. I will get medicine.',
      [
        { korean: '감기에 걸리다', english: 'to catch a cold' },
        { korean: '~서', english: 'so / because' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '병원에서', 'byeongwoneseo',
      'At the clinic', 'conversation',
      'A (의사): 어디가 아파요?\nB (환자): 머리가 아프고 열도 나요. 기침도 심해요.\nA: 언제부터 아팠어요?\nB: 그저께부터요. 감기 같아요.\nA: 네, 감기예요. 3일 동안 약을 드시고 푹 쉬세요. 운동은 하지 마세요.\nB: 커피는 마셔도 돼요?\nA: 따뜻한 차가 더 좋아요.\nB: 알겠습니다. 감사합니다.',
      'A (doctor): Where does it hurt?\nB (patient): My head hurts and I have a fever. My cough is also severe.\nA: When did it start?\nB: From the day before yesterday. It feels like a cold.\nA: Yes, it is a cold. Take medicine for three days and rest. Do not exercise.\nB: May I drink coffee?\nA: Warm tea is better.\nB: I understand. Thank you.',
      [
        { korean: '어디가 아파요?', english: 'where does it hurt?' },
        { korean: '언제부터', english: 'from when / since when' },
        { korean: '~ 동안', english: 'for (a duration)' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
