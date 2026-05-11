// Level 2 Track-Adult Unit 9 — 주말에 무엇을 합니까? (Weekend conversation)
// Source: Book 2A·9. Functions: small talk about weekends, hobbies, leisure.

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
  vocabulary: 'l2au9-vocabulary',
  grammar: 'l2au9-grammar',
  speaking: 'l2au9-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Weekend activities and hobbies',
    goals: ['Use 등산, 낚시, 모임, 취미.'],
    task: 'Pick three weekend activities and describe each briefly.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'V-(으)ㄴ 적이 있다 + V-기로 하다',
    goals: ['Talk about past experience with V-(으)ㄴ 적이 있다.', 'Make plans with V-기로 하다.'],
    task: 'Make two sentences about an experience and one about a plan.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Weekend small talk with coworkers',
    goals: ['Open Monday-morning small talk.', 'Share weekend highlights.'],
    task: 'Roleplay weekend chitchat with a coworker on Monday morning.' },
];

const lesson = {
  title: '레벨 2 (직장) · 9과: 주말에 무엇을 합니까? (Weekend Conversation)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'sharing-weekend', label: 'Sharing weekend plans', goal: 'Use V-기로 하다 to state your weekend plans.' },
    { id: 'recalling-experience', label: 'Recalling an experience', goal: 'Use V-(으)ㄴ 적이 있다 to recall a past experience.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('주말', 'jumal', 'weekend', 'word', '주말이 짧습니다.', 'The weekend is short.', null, [ACT.vocabulary]),
    createContentItem('등산', 'deungsan', 'hiking', 'word', '주말에 등산을 합니다.', 'I hike on weekends.', null, [ACT.vocabulary]),
    createContentItem('낚시', 'naksi', 'fishing', 'word', '낚시를 좋아합니다.', 'I like fishing.', null, [ACT.vocabulary]),
    createContentItem('영화 보기', 'yeonghwa bogi', 'watching movies', 'word', '취미는 영화 보기입니다.', 'My hobby is watching movies.', null, [ACT.vocabulary]),
    createContentItem('모임', 'moim', 'gathering', 'word', '동료 모임이 있습니다.', 'There is a gathering of coworkers.', null, [ACT.vocabulary]),
    createContentItem('약속', 'yaksok', 'plan / appointment', 'word', '주말에 약속이 있습니다.', 'I have plans on the weekend.', null, [ACT.vocabulary]),
    createContentItem('취미', 'chwimi', 'hobby', 'word', '제 취미는 사진 찍기입니다.', 'My hobby is taking photos.', null, [ACT.vocabulary]),
    createContentItem('산책', 'sanchaek', 'a walk / stroll', 'word', '저녁마다 산책을 합니다.', 'I go for a walk every evening.', null, [ACT.vocabulary]),
    createContentItem('운동하다', 'undonghada', 'to exercise', 'word', '아침에 운동합니다.', 'I exercise in the morning.', null, [ACT.vocabulary]),
    createContentItem('맛집', 'matjip', 'tasty restaurant', 'word', '맛집을 찾아갑니다.', 'I seek out tasty restaurants.', null, [ACT.vocabulary]),
    createContentItem('피곤하다', 'pigonhada', 'to be tired', 'word', '주중에는 피곤합니다.', 'I am tired during the weekdays.', null, [ACT.vocabulary]),

    createContentItem(
      '주말에 등산하기로 했습니다.', 'jumare deungsanhagiro haetseumnida.',
      'I decided to go hiking on the weekend.', 'sentence',
      '주말에 등산하기로 했습니다. 동료들과 같이 갑니다.',
      'I decided to go hiking on the weekend. I am going with coworkers.',
      [
        { korean: 'V-기로 하다', english: 'decide to ~' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '한국 음식을 먹은 적이 있습니다.', 'hanguk eumsigeul meogeun jeogi itseumnida.',
      'I have eaten Korean food before.', 'sentence',
      '한국 음식을 먹은 적이 있습니다. 매워서 깜짝 놀랐습니다.',
      'I have eaten Korean food before. I was surprised because it was spicy.',
      [
        { korean: 'V-(으)ㄴ 적이 있다', english: 'have ~ before (experience)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '주말에 무엇을 하실 계획입니까?', 'jumare mueoseul hasil gyehoegimnikka?',
      'What do you plan to do on the weekend?', 'sentence',
      '주말에 무엇을 하실 계획입니까? — 가족과 시간을 보낼 거예요.',
      'What do you plan to do on the weekend? — I will spend time with family.',
      [
        { korean: '~하실 계획입니까?', english: 'what do you plan to do? (formal)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '월요일 아침의 잡담', 'woryoil achimui japdam',
      'Monday-morning small talk', 'conversation',
      'A: 좋은 아침입니다. 주말 잘 보내셨어요?\nB: 네, 잘 보냈습니다. 동료들하고 등산했어요. 사라 씨는요?\nA: 저는 처음으로 한국 영화관에 가 봤어요. 정말 재미있었습니다.\nB: 어떤 영화를 보셨어요?\nA: 액션 영화였어요. 그런데 자막이 없어서 좀 어려웠어요.\nB: 다음에는 한국어 자막이 있는 영화를 보세요. 공부에도 도움이 됩니다.',
      'A: Good morning. Did you have a good weekend?\nB: Yes, it was good. I went hiking with coworkers. How about you, Sarah?\nA: I went to a Korean movie theater for the first time. It was really fun.\nB: What movie did you see?\nA: An action movie. But it was a bit hard because there were no subtitles.\nB: Next time, watch one with Korean subtitles. It helps your studies too.',
      [
        { korean: '좋은 아침입니다', english: 'good morning' },
        { korean: '자막', english: 'subtitles' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
