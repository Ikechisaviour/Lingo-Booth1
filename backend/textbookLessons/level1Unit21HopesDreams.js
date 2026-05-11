// Level 1 Unit 21 — Hopes & dreams
// Source: Book 1A·16 (유명한 수영 선수가 되었으면 좋겠어)
// Functions: career hopes, expressing wishes, planning the future.

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
  vocabulary: 'l1u21-vocabulary',
  grammar: 'l1u21-grammar',
  speaking: 'l1u21-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Jobs and dreams',
    goals: ['Name common jobs.', 'Use 꿈, 미래, 되다.'],
    task: 'Pick three jobs and say one fact about each.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-았/었으면 좋겠다 + V-고 싶다 + N이/가 되다 + N 후에',
    goals: [
      'Express wishes with V-았/었으면 좋겠다.',
      'Express wants with V-고 싶다.',
      'State a future role with N이/가 되다.',
      'Sequence events with N 후에 / V-(으)ㄴ 후에.',
    ],
    task: 'Tell the tutor one wish using -았/었으면 좋겠다.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Sharing your dream',
    goals: ['Describe your dream.', 'Compare with someone else\'s dream.'],
    task: 'Tell the tutor what you want to be after graduating from Kumoh National Institute of Technology.',
  },
];

const lesson = {
  title: '레벨 1 · 21과: 유명한 수영 선수가 되었으면 좋겠어요 (Hopes and Dreams)',
  category: 'career', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'expressing-wish', label: 'Expressing a wish', goal: 'Use V-았/었으면 좋겠다 to share a hope or wish.' },
    { id: 'stating-dream', label: 'Stating a future job', goal: 'Use N이/가 되고 싶다 to say what you want to become.' },
  ],
  relatedPools: ['topic-people', 'topic-society'],
  content: [
    createContentItem('꿈', 'kkum', 'dream / aspiration', 'word', '제 꿈은 의사예요.', 'My dream is to be a doctor.', null, [ACT.vocabulary]),
    createContentItem('미래', 'mirae', 'future', 'word', '미래에 대해 생각해요.', 'I think about the future.', null, [ACT.vocabulary]),
    createContentItem('되다', 'doeda', 'to become', 'word', '의사가 되고 싶어요.', 'I want to become a doctor.', null, [ACT.vocabulary]),
    createContentItem('직업', 'jigeop', 'job / occupation', 'word', '직업을 정해야 해요.', 'I have to decide on a job.', null, [ACT.vocabulary]),
    createContentItem('의사', 'uisa', 'doctor', 'word', '의사가 되고 싶어요.', 'I want to be a doctor.', null, [ACT.vocabulary]),
    createContentItem('변호사', 'byeonhosa', 'lawyer', 'word', '변호사도 멋있어요.', 'Being a lawyer is cool too.', null, [ACT.vocabulary]),
    createContentItem('선생님', 'seonsaengnim', 'teacher', 'word', '한국어 선생님이 되고 싶어요.', 'I want to be a Korean teacher.', null, [ACT.vocabulary]),
    createContentItem('가수', 'gasu', 'singer', 'word', '가수가 꿈이에요.', 'My dream is to be a singer.', null, [ACT.vocabulary]),
    createContentItem('운동선수', 'undongseonsu', 'athlete', 'word', '유명한 운동선수가 되고 싶어요.', 'I want to be a famous athlete.', null, [ACT.vocabulary]),
    createContentItem('수영 선수', 'suyeong seonsu', 'swimmer (athlete)', 'word', '수영 선수가 되었으면 좋겠어요.', 'I wish I could become a swimmer.', null, [ACT.vocabulary]),
    createContentItem('소프트웨어 개발자', 'sopeuteuwe-eo gaebalja', 'software developer', 'word', '소프트웨어 개발자가 되고 싶어요.', 'I want to become a software developer.', null, [ACT.vocabulary]),
    createContentItem('엔지니어', 'enjinieo', 'engineer', 'word', '엔지니어를 꿈꾸고 있어요.', 'I dream of being an engineer.', null, [ACT.vocabulary]),
    createContentItem('유명하다', 'yumyeonghada', 'to be famous', 'word', '유명한 가수예요.', 'They are a famous singer.', null, [ACT.vocabulary]),
    createContentItem('졸업', 'joreop', 'graduation', 'word', '내년에 졸업해요.', 'I graduate next year.', null, [ACT.vocabulary]),

    createContentItem(
      '유명한 수영 선수가 되었으면 좋겠어요.', 'yumyeonghan suyeong seonsuga doeeosseumyeon joketseoyo.',
      'I wish I could become a famous swimmer.', 'sentence',
      '유명한 수영 선수가 되었으면 좋겠어요. 매일 연습해요.',
      'I wish I could become a famous swimmer. I practice every day.',
      [
        { korean: '유명한 수영 선수', english: 'famous swimmer (descriptive -ㄴ)' },
        { korean: '되었으면 좋겠어요', english: 'I wish to become (V-았/었으면 좋겠다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저는 소프트웨어 개발자가 되고 싶어요.', 'jeoneun sopeuteuwe-eo gaebaljaga doego sipeoyo.',
      'I want to become a software developer.', 'sentence',
      '저는 소프트웨어 개발자가 되고 싶어요. 그래서 컴퓨터공학을 전공해요.',
      'I want to become a software developer. That is why I major in Computer Engineering.',
      [
        { korean: '~이/가 되고 싶다', english: 'want to become ~' },
        { korean: '컴퓨터공학을 전공해요', english: 'I major in Computer Engineering' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '졸업한 후에 한국에서 일하고 싶어요.', 'joreophan hue hangugeseo ilhago sipeoyo.',
      'After graduating I want to work in Korea.', 'sentence',
      '졸업한 후에 한국에서 일하고 싶어요. 좋은 회사에 들어가면 좋겠어요.',
      'After graduating I want to work in Korea. I hope I can join a good company.',
      [
        { korean: '졸업한 후에', english: 'after graduating (V-(으)ㄴ 후에)' },
        { korean: '한국에서 일하고 싶어요', english: 'I want to work in Korea' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한국어를 더 잘했으면 좋겠어요.', 'hangugeoreul deo jalhaesseumyeon joketseoyo.',
      'I wish I were better at Korean.', 'sentence',
      '한국어를 더 잘했으면 좋겠어요. 그래서 매일 공부해요.',
      'I wish I were better at Korean. So I study every day.',
      [
        { korean: '더 잘했으면', english: 'if I were better (-았/었으면)' },
        { korean: '좋겠어요', english: 'it would be good' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '꿈에 대해 이야기해요', 'kkume daehae iyagihaeyo',
      'Talking about dreams', 'conversation',
      'A: 사라 씨 꿈이 뭐예요?\nB: 저는 한국어 선생님이 되고 싶어요. 외국 학생들에게 한국어를 가르치고 싶어요.\nA: 멋있네요! 졸업한 후에 한국에서 일할 거예요?\nB: 네, 그러고 싶어요. 민수 씨는요?\nA: 저는 소프트웨어 개발자가 되었으면 좋겠어요. 금오공과대학교에서 컴퓨터공학을 공부하고 있어요.\nB: 그럼 저는 한국어를 가르치고, 민수 씨는 앱을 만들어요. 좋네요!',
      'A: Sarah, what is your dream?\nB: I want to become a Korean teacher. I want to teach Korean to foreign students.\nA: That is cool! Will you work in Korea after graduating?\nB: Yes, I want to. How about you, Minsu?\nA: I wish I could become a software developer. I am studying Computer Engineering at Kumoh National Institute of Technology.\nB: Then I will teach Korean, and you will make apps. That is nice!',
      [
        { korean: '꿈이 뭐예요?', english: 'what is your dream?' },
        { korean: '가르치고 싶어요', english: 'want to teach' },
        { korean: '앱을 만들어요', english: 'make apps' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
