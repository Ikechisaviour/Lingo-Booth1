// Level 2 Unit 2 — 건강한 삶 (Healthy life)
// Source: Book 2D Unit 2. Vocabulary: 증상, 과- prefix.
// Grammar: 어찌나/얼마나 A-(으)ㄴ지/V-는지, A/V-(으)ㄹ 정도로/정도이다, V-다가는, A/V-(으)ㄹ 뿐만 아니라.
// Pronunciation: 경음화 '손가락'. Culture: Oriental medicine clinic.

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
  speaking: 'l2u2-speaking',
  readingSpeaking: 'l2u2-reading-speaking',
  listeningSpeaking: 'l2u2-listening-speaking',
  readingWriting: 'l2u2-reading-writing',
  task: 'l2u2-task',
  vocabulary: 'l2u2-vocabulary',
  grammar: 'l2u2-grammar',
  pronunciation: 'l2u2-pronunciation',
  culture: 'l2u2-culture',
};

const activities = [
  {
    id: ACT.speaking, section: 'Speaking', title: 'Explaining symptoms',
    goals: ['Describe how a symptom feels using degree expressions.'],
    task: 'Describe one symptom you have had using A/V-(으)ㄹ 정도로.',
  },
  {
    id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Reading warnings + talking about warnings',
    goals: ['Read a health-warning notice.', 'Pass the warning to someone.'],
    task: 'Summarize a health warning in your own words.',
  },
  {
    id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Calling 119 + symptom dialogues',
    goals: ['Call 119 and report a symptom.', 'Discuss symptoms with a doctor.'],
    task: 'Roleplay calling 119 for a sick roommate.',
  },
  {
    id: ACT.readingWriting, section: 'Reading and Writing', title: 'Treatment methods + folk remedies',
    goals: ['Read articles about treatments.', 'Write a brief intro to a folk remedy.'],
    task: 'Write three sentences introducing a remedy from your country.',
  },
  {
    id: ACT.task, section: 'Task', title: 'Correct symptoms game',
    goals: ['Match symptom descriptions to causes.'],
    task: 'Play a guessing game: tutor describes a symptom and you guess the illness.',
  },
  {
    id: ACT.vocabulary, section: 'Vocabulary', title: 'Symptoms and the 과- prefix',
    goals: ['Name common symptoms.', 'Use the 과- prefix (excessive ~).'],
    task: 'List five symptom words.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression', title: 'Degree, habit, and exception patterns',
    goals: [
      '어찌나/얼마나 A-(으)ㄴ지 / V-는지',
      'A/V-(으)ㄹ 정도로, A/V-(으)ㄹ 정도이다',
      'V-다가는',
      'A/V-(으)ㄹ 뿐만 아니라',
    ],
    task: 'Use one of the four patterns in a sentence about your sleep or diet.',
  },
  {
    id: ACT.pronunciation, section: 'Pronunciation', title: '경음화 \'손가락\'',
    goals: ['Recognize tense pronunciation in compound nouns.'],
    task: 'Read 손가락, 발가락, 손등 with tense initial-syllables.',
  },
  {
    id: ACT.culture, section: 'Culture Note', title: 'Oriental medicine clinic (한의원)',
    goals: ['Understand the role of 한의원 in Korea.'],
    task: 'Compare 한의원 with clinics in your country.',
  },
];

const lesson = {
  title: '레벨 2 · 2과: 건강한 삶 (Healthy Life)',
  category: 'healthcare', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'expressing-degree', label: 'Expressing degree or amount', goal: 'Use 어찌나/얼마나 A-(으)ㄴ지 to convey how strong a feeling or symptom is.' },
    { id: 'expressing-habit', label: 'Expressing habitual circumstances', goal: 'Use V-다가는 to describe a habit that leads to a bad outcome.' },
  ],
  relatedPools: ['topic-health'],
  content: [
    createContentItem('증상', 'jeungsang', 'symptom', 'word', '어떤 증상이 있어요?', 'What symptoms do you have?', null, [ACT.vocabulary]),
    createContentItem('두통', 'dutong', 'headache', 'word', '두통이 심해요.', 'I have a bad headache.', null, [ACT.vocabulary]),
    createContentItem('복통', 'boktong', 'stomachache', 'word', '복통이 있어요.', 'I have a stomachache.', null, [ACT.vocabulary]),
    createContentItem('어지럽다', 'eojireopda', 'to be dizzy', 'word', '아침에 일어나면 어지러워요.', 'I get dizzy when I wake up.', null, [ACT.vocabulary]),
    createContentItem('피로', 'piro', 'fatigue', 'word', '피로가 쌓였어요.', 'Fatigue has built up.', null, [ACT.vocabulary]),
    createContentItem('과로', 'gwaro', 'overwork (과- prefix = excessive)', 'word', '과로 때문에 아파요.', 'I am sick because of overwork.', null, [ACT.vocabulary]),
    createContentItem('과식', 'gwasik', 'overeating', 'word', '과식하면 배가 아파요.', 'If you overeat, your stomach hurts.', null, [ACT.vocabulary]),
    createContentItem('과음', 'gwaeum', 'drinking too much', 'word', '과음은 건강에 안 좋아요.', 'Drinking too much is bad for your health.', null, [ACT.vocabulary]),
    createContentItem('처방', 'cheobang', 'prescription', 'word', '의사가 처방을 해 줬어요.', 'The doctor wrote a prescription.', null, [ACT.vocabulary]),
    createContentItem('치료', 'chiryo', 'treatment', 'word', '치료를 받고 있어요.', 'I am receiving treatment.', null, [ACT.vocabulary]),
    createContentItem('건강', 'geongang', 'health', 'word', '건강이 제일 중요해요.', 'Health is most important.', null, [ACT.vocabulary]),
    createContentItem('한의원', 'hanuiwon', 'oriental medicine clinic', 'word', '한의원에서 침을 맞아요.', 'I get acupuncture at the oriental medicine clinic.', null, [ACT.vocabulary, ACT.culture]),
    createContentItem('침', 'chim', 'acupuncture needle', 'word', '침 치료를 받았어요.', 'I had acupuncture treatment.', null, [ACT.vocabulary]),
    createContentItem('손가락', 'sonkkarak', 'finger (note tense [ㄲ] pronunciation)', 'word', '손가락이 아파요.', 'My finger hurts.', null, [ACT.vocabulary, ACT.pronunciation]),
    createContentItem('발가락', 'balkkarak', 'toe (tense [ㄲ])', 'word', '발가락을 다쳤어요.', 'I hurt my toe.', null, [ACT.vocabulary, ACT.pronunciation]),

    createContentItem(
      '어찌나 머리가 아픈지 잠을 못 잤어요.', 'eojjina meoriga apeunji jameul mot jasseoyo.',
      'My head hurt so much that I could not sleep.', 'sentence',
      '어찌나 머리가 아픈지 잠을 못 잤어요. 약을 먹고 자야겠어요.',
      'My head hurt so much that I could not sleep. I should take medicine and sleep.',
      [
        { korean: '어찌나 ~ 아픈지', english: 'so painful that ~ (degree)' },
        { korean: '잠을 못 잤어요', english: 'could not sleep' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '눈물이 날 정도로 매워요.', 'nunmuri nal jeongdoro maewoyo.',
      'It is so spicy that tears come.', 'sentence',
      '이 떡볶이가 눈물이 날 정도로 매워요.',
      'This tteokbokki is so spicy that it makes my eyes water.',
      [
        { korean: '~ㄹ 정도로', english: 'to the extent that ~' },
        { korean: '눈물이 나다', english: 'tears come / eyes water' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '계속 과로하다가는 쓰러질 거예요.', 'gyesok gwarohadaganeun sseureojil geoyeyo.',
      'If you keep overworking, you will collapse.', 'sentence',
      '계속 과로하다가는 쓰러질 거예요. 좀 쉬세요.',
      'If you keep overworking, you will collapse. Get some rest.',
      [
        { korean: '~다가는', english: 'if you keep ~ (warning of consequence)' },
        { korean: '쓰러지다', english: 'to collapse' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '머리가 아플 뿐만 아니라 열도 나요.', 'meoriga apeul ppunman anira yeoldo nayo.',
      'Not only does my head hurt, but I also have a fever.', 'sentence',
      '머리가 아플 뿐만 아니라 열도 나요. 감기 같아요.',
      'Not only does my head hurt, but I also have a fever. It feels like a cold.',
      [
        { korean: '~ㄹ 뿐만 아니라', english: 'not only ~ but also' },
        { korean: '열이 나요', english: 'I have a fever' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '119에 전화하기', '119e jeonhwahagi',
      'Calling 119 (emergency)', 'conversation',
      'A (119): 119입니다. 어디세요?\nB: 금오공과대학교 기숙사예요. 친구가 갑자기 쓰러졌어요.\nA: 의식이 있어요?\nB: 의식은 있는데 어찌나 어지러워하는지 일어나지 못해요.\nA: 알겠습니다. 구급차가 5분 안에 도착해요. 학생 옆에 있어 주세요.\nB: 네, 감사합니다.',
      'A (119): This is 119. Where are you?\nB: Kumoh National Institute of Technology dormitory. My friend suddenly collapsed.\nA: Are they conscious?\nB: They are conscious but so dizzy they cannot stand.\nA: Understood. An ambulance will arrive within 5 minutes. Please stay with the student.\nB: Yes, thank you.',
      [
        { korean: '의식이 있어요?', english: 'are they conscious?' },
        { korean: '구급차', english: 'ambulance' },
        { korean: '5분 안에', english: 'within 5 minutes' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
    createContentItem(
      '한의원 소개', 'hanuiwon sogae',
      'About the oriental medicine clinic', 'sentence',
      '한국에는 한의원이 많아요. 서양 의학과 달리 침과 한약을 사용해요. 어깨나 허리가 아플 때 많이 가요. 침 치료는 좀 무서워 보일 뿐만 아니라 처음에는 따끔할 수도 있어요.',
      'There are many oriental medicine clinics in Korea. Unlike Western medicine, they use acupuncture and herbal medicine. People often go when their shoulders or back hurt. Acupuncture treatment may not only look a bit scary but also feel sharp at first.',
      [
        { korean: '서양 의학과 달리', english: 'unlike Western medicine' },
        { korean: '침과 한약', english: 'acupuncture and herbal medicine' },
        { korean: '따끔하다', english: 'to feel a sharp prick' },
      ],
      [ACT.culture, ACT.readingSpeaking],
    ),
  ],
};

module.exports = lesson;
