// Level 1 Unit 14 — Ability (can / can't)
// Source: Book 1B·12 (김치를 만들 수 있어요)
// Functions: stating ability, asking what someone can do, levels of skill.

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
  vocabulary: 'l1u14-vocabulary',
  grammar: 'l1u14-grammar',
  speaking: 'l1u14-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Ability adverbs and skill verbs',
    goals: ['Use 잘, 좀, 못 to grade ability.', 'Learn 12 verbs commonly paired with ability.'],
    task: 'Say one thing you do well and one you cannot do.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-(으)ㄹ 수 있다/없다 + 못 V + 잘 / 잘 못',
    goals: [
      'Affirm and negate ability with V-(으)ㄹ 수 있어요 / 없어요.',
      'Use 못 + V to say "cannot" (different from 안).',
      'Grade with 잘 (well) / 잘 못 (not well).',
    ],
    task: 'Make four sentences showing what you can do well, can do somewhat, and cannot do.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Talking about skills and trying new things',
    goals: ['Ask 한국어 잘 해요?', 'Share what you can cook, play, or speak.'],
    task: 'Tell the tutor three skills you have and one you want to learn at Kumoh National Institute of Technology.',
  },
];

const lesson = {
  title: '레벨 1 · 14과: 김치를 만들 수 있어요 (Ability)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-can-you', label: 'Asking if someone can do something', goal: 'Use V-(으)ㄹ 수 있어요? to ask about ability.' },
    { id: 'stating-skill', label: 'Stating a skill or limitation', goal: 'Combine 잘/좀/못 + verb to grade your level.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('잘', 'jal', 'well', 'word', '한국어를 잘해요.', 'I speak Korean well.', null, [ACT.vocabulary]),
    createContentItem('좀', 'jom', 'a little', 'word', '한국어를 좀 해요.', 'I speak Korean a little.', null, [ACT.vocabulary]),
    createContentItem('못', 'mot', 'cannot (placed before verb)', 'word', '저는 운전 못해요.', 'I cannot drive.', null, [ACT.vocabulary]),
    createContentItem('잘 못', 'jal mot', 'not well', 'word', '한국어를 잘 못해요.', 'I do not speak Korean well.', null, [ACT.vocabulary]),
    createContentItem('만들다', 'mandeulda', 'to make', 'word', '김치를 만들 수 있어요.', 'I can make kimchi.', null, [ACT.vocabulary]),
    createContentItem('운전하다', 'unjeonhada', 'to drive', 'word', '저는 운전을 못해요.', 'I cannot drive.', null, [ACT.vocabulary]),
    createContentItem('수영하다', 'suyeonghada', 'to swim', 'word', '수영을 잘해요.', 'I swim well.', null, [ACT.vocabulary]),
    createContentItem('치다', 'chida', 'to play (instrument like piano/guitar)', 'word', '피아노를 칠 수 있어요.', 'I can play the piano.', null, [ACT.vocabulary]),
    createContentItem('타다', 'tada', 'to ride (bike/skate)', 'word', '자전거를 탈 수 있어요.', 'I can ride a bike.', null, [ACT.vocabulary]),
    createContentItem('말하다', 'malhada', 'to speak', 'word', '영어로 말할 수 있어요.', 'I can speak English.', null, [ACT.vocabulary]),
    createContentItem('읽다', 'ikda', 'to read', 'word', '한국어를 좀 읽을 수 있어요.', 'I can read Korean a little.', null, [ACT.vocabulary]),
    createContentItem('쓰다', 'sseuda', 'to write', 'word', '한국어로 이메일을 쓸 수 있어요.', 'I can write emails in Korean.', null, [ACT.vocabulary]),
    createContentItem('피아노', 'piano', 'piano', 'word', '피아노를 좀 쳐요.', 'I play piano a bit.', null, [ACT.vocabulary]),
    createContentItem('기타', 'gita', 'guitar', 'word', '기타를 잘 못 쳐요.', 'I do not play guitar well.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 김치를 만들 수 있어요.', 'jeoneun gimchireul mandeul su isseoyo.',
      'I can make kimchi.', 'sentence',
      '저는 김치를 만들 수 있어요. 어머니가 가르쳐 주셨어요.',
      'I can make kimchi. My mother taught me.',
      [
        { korean: '김치를', english: 'kimchi + object' },
        { korean: '만들 수 있어요', english: 'can make (V-(으)ㄹ 수 있다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '저는 운전을 못해요.', 'jeoneun unjeoneul mothaeyo.',
      'I cannot drive.', 'sentence',
      '저는 운전을 못해요. 그래서 지하철을 타요.',
      'I cannot drive. So I take the subway.',
      [
        { korean: '운전을', english: 'driving + object' },
        { korean: '못해요', english: 'cannot do (못 + 하다)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한국어를 좀 할 수 있어요.', 'hangugeoreul jom hal su isseoyo.',
      'I can speak Korean a little.', 'sentence',
      '한국어를 좀 할 수 있어요. 아직 잘 못해요.',
      'I can speak Korean a little. I still do not do it well.',
      [
        { korean: '좀', english: 'a little (softens)' },
        { korean: '할 수 있어요', english: 'can do' },
        { korean: '아직 잘 못해요', english: 'still cannot do well' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '피아노를 칠 수 있어요?', 'pianoreul chil su isseoyo?',
      'Can you play the piano?', 'sentence',
      '피아노를 칠 수 있어요? — 네, 좀 쳐요.',
      'Can you play the piano? — Yes, I play a bit.',
      [
        { korean: '피아노를 칠 수 있어요?', english: 'can you play the piano?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '한국어 잘 해요?', 'hangugeo jal haeyo?',
      'Do you speak Korean well?', 'conversation',
      'A: 사라 씨, 한국어 잘 해요?\nB: 아니요, 잘 못해요. 좀 할 수 있어요.\nA: 한국에 온 지 얼마나 됐어요?\nB: 6개월 됐어요. 매일 공부해요.\nA: 멋있네요. 김치도 만들 수 있어요?\nB: 아니요, 김치는 아직 못 만들어요. 배우고 싶어요.',
      'A: Sarah, do you speak Korean well?\nB: No, I do not. I can speak a little.\nA: How long have you been in Korea?\nB: 6 months. I study every day.\nA: That is great. Can you make kimchi?\nB: No, I cannot make kimchi yet. I want to learn.',
      [
        { korean: '한국에 온 지 얼마나', english: 'how long have you been in Korea' },
        { korean: '매일 공부해요', english: 'I study every day' },
        { korean: '아직 못 ~', english: 'still cannot ~' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '취미와 능력', 'chwimiwa neungnyeok',
      'Hobbies and abilities', 'conversation',
      'A: 취미가 뭐예요?\nB: 저는 음악을 좋아해요. 기타를 좀 칠 수 있어요. 사라 씨는요?\nA: 저는 운동을 좋아해요. 수영을 잘해요.\nB: 와, 멋있네요. 저는 수영 못해요.\nA: 같이 배워요. 학교 수영장 있어요.',
      'A: What is your hobby?\nB: I like music. I can play guitar a bit. How about you, Sarah?\nA: I like sports. I swim well.\nB: Wow, cool. I cannot swim.\nA: Let us learn together. There is a pool at school.',
      [
        { korean: '취미가 뭐예요?', english: 'what is your hobby?' },
        { korean: '같이 배워요', english: 'let us learn together' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
