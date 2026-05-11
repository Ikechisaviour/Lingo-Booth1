// Level 1 Unit 11 — Scheduling & invitations
// Source: Book 1A·11 (토요일에 같이 공부할 수 있어?)
// Functions: telling time, suggesting plans, accepting/declining invitations.

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
  vocabulary: 'l1u11-vocabulary',
  grammar: 'l1u11-grammar',
  speaking: 'l1u11-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Time, days, and meeting words',
    goals: ['Tell time using native (hour) + Sino (minutes).', 'Use 약속, 같이, 시간 in context.'],
    task: 'Say what time you usually meet your friends.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-(으)ㄹ 수 있어요? + V-(으)ㄹ까요? + 같이',
    goals: [
      'Ask V-(으)ㄹ 수 있어요? to ask if someone can do something.',
      'Suggest with V-(으)ㄹ까요?.',
      'Use 같이 to say "together".',
    ],
    task: 'Invite the tutor to study together on Saturday and propose a time.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Setting up a study meeting',
    goals: ['Suggest a time and place.', 'Confirm or politely decline.'],
    task: 'Roleplay arranging a study session at the Kumoh National Institute of Technology library.',
  },
];

const lesson = {
  title: '레벨 1 · 11과: 토요일에 같이 공부할 수 있어요? (Scheduling and Invitations)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'making-invitation', label: 'Making an invitation', goal: 'Use V-(으)ㄹ까요? + 같이 to suggest doing something together.' },
    { id: 'asking-availability', label: 'Asking about availability', goal: 'Use 시간 있어요? / V-(으)ㄹ 수 있어요? to check whether someone is free.' },
    { id: 'accepting-declining', label: 'Accepting or declining politely', goal: 'Respond yes/no to an invitation, with a brief reason if declining.' },
  ],
  relatedPools: ['topic-school', 'topic-people'],
  content: [
    createContentItem('시간', 'sigan', 'time', 'word', '시간이 있어요?', 'Do you have time?', null, [ACT.vocabulary]),
    createContentItem('약속', 'yaksok', 'appointment / plan', 'word', '오늘 저녁에 약속이 있어요.', 'I have plans tonight.', null, [ACT.vocabulary]),
    createContentItem('같이', 'gachi', 'together', 'word', '같이 점심 먹을까요?', 'Shall we have lunch together?', null, [ACT.vocabulary]),
    createContentItem('만나다', 'mannada', 'to meet', 'word', '몇 시에 만날까요?', 'What time shall we meet?', null, [ACT.vocabulary]),
    createContentItem('시', 'si', 'o\'clock (hour, native number)', 'word', '오후 3시', '3 p.m.', null, [ACT.vocabulary]),
    createContentItem('분', 'bun', 'minute (Sino-Korean number)', 'word', '5시 30분', '5:30', null, [ACT.vocabulary]),
    createContentItem('오전', 'ojeon', 'morning / a.m.', 'word', '오전 10시', '10 a.m.', null, [ACT.vocabulary]),
    createContentItem('오후', 'ohu', 'afternoon / p.m.', 'word', '오후 2시', '2 p.m.', null, [ACT.vocabulary]),
    createContentItem('아침', 'achim', 'morning', 'word', '아침에 만나요.', 'Let us meet in the morning.', null, [ACT.vocabulary]),
    createContentItem('점심', 'jeomsim', 'lunch / midday', 'word', '점심에 시간 있어요?', 'Are you free at lunch?', null, [ACT.vocabulary]),
    createContentItem('저녁', 'jeonyeok', 'evening / dinner', 'word', '저녁에 같이 먹어요.', 'Let us eat together in the evening.', null, [ACT.vocabulary]),
    createContentItem('주중', 'jujung', 'weekday', 'word', '주중에는 바빠요.', 'I am busy on weekdays.', null, [ACT.vocabulary]),
    createContentItem('주말', 'jumal', 'weekend', 'word', '주말에 시간 있어요?', 'Are you free on the weekend?', null, [ACT.vocabulary]),
    createContentItem('바쁘다', 'bappeuda', 'to be busy', 'word', '오늘 좀 바빠요.', 'I am a bit busy today.', null, [ACT.vocabulary]),
    createContentItem('시간이 있다 / 없다', 'sigani itda / eopda', 'to have / not have time', 'word', '내일은 시간이 없어요.', 'I do not have time tomorrow.', null, [ACT.vocabulary]),

    createContentItem(
      '토요일에 같이 공부할 수 있어요?', 'toyoire gachi gongbuhal su isseoyo?',
      'Can we study together on Saturday?', 'sentence',
      '토요일에 같이 공부할 수 있어요? 도서관에서 만나요.',
      'Can we study together on Saturday? Let us meet at the library.',
      [
        { korean: '토요일에', english: 'on Saturday' },
        { korean: '같이 공부할 수 있어요?', english: 'can you study together? (V-(으)ㄹ 수 있다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '내일 점심에 만날까요?', 'naeil jeomsime mannalkkayo?',
      'Shall we meet tomorrow at lunch?', 'sentence',
      '내일 점심에 만날까요? 학교 식당이 어때요?',
      'Shall we meet tomorrow at lunch? How about the school cafeteria?',
      [
        { korean: '내일 점심에', english: 'tomorrow at lunch' },
        { korean: '만날까요?', english: 'shall we meet? (V-(으)ㄹ까요? suggesting)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '오늘 저녁에 시간이 있어요?', 'oneul jeonyeoge sigani isseoyo?',
      'Do you have time tonight?', 'sentence',
      '오늘 저녁에 시간이 있어요? 같이 영화 봐요.',
      'Do you have time tonight? Let us watch a movie together.',
      [
        { korean: '오늘 저녁에', english: 'this evening' },
        { korean: '시간이 있어요?', english: 'do you have time?' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '미안해요, 그날은 약속이 있어요.', 'mianhaeyo, geunareun yaksogi isseoyo.',
      'Sorry, I have plans that day.', 'sentence',
      '미안해요, 그날은 약속이 있어요. 다음 주에 어때요?',
      'Sorry, I have plans that day. How about next week?',
      [
        { korean: '미안해요', english: 'sorry' },
        { korean: '그날은', english: 'that day (topic, contrast)' },
        { korean: '약속이 있어요', english: 'I have plans' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '같이 공부할까요?', 'gachi gongbuhalkkayo?',
      'Shall we study together?', 'conversation',
      'A: 사라 씨, 토요일에 같이 공부할 수 있어요?\nB: 토요일이요? 토요일은 시간 있어요. 몇 시에요?\nA: 오후 2시 어때요? 도서관에서요.\nB: 좋아요. 도서관 입구에서 만나요.\nA: 네, 그럼 토요일 2시에 봐요.',
      'A: Sarah, can we study together on Saturday?\nB: Saturday? I am free Saturday. What time?\nA: How about 2 p.m.? At the library.\nB: Sounds good. Let us meet at the library entrance.\nA: Okay, see you Saturday at 2.',
      [
        { korean: '몇 시에요?', english: 'what time?' },
        { korean: '입구에서 만나요', english: 'let us meet at the entrance' },
        { korean: '~에 봐요', english: 'see you at ~' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '약속이 있어서요', 'yaksogi isseoseoyo',
      'Politely declining an invitation', 'conversation',
      'A: 오늘 저녁에 영화 보러 갈래요?\nB: 미안해요, 오늘은 약속이 있어요.\nA: 아, 알겠어요. 그럼 내일은 어때요?\nB: 내일은 괜찮아요. 몇 시예요?\nA: 7시요.\nB: 좋아요. 그럼 내일 봐요.',
      'A: Want to go watch a movie tonight?\nB: Sorry, I have plans today.\nA: Oh, I see. How about tomorrow?\nB: Tomorrow is fine. What time?\nA: 7 p.m.\nB: Sounds good. See you tomorrow.',
      [
        { korean: '~ 갈래요?', english: 'want to go ~?' },
        { korean: '괜찮아요', english: 'is okay / fine' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
