// Level 1 Unit 15 — Phone & taking messages
// Source: Book 1A·13 (말씀 좀 전해 주세요)
// Functions: making/receiving calls, leaving messages, polite request forms.

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
  vocabulary: 'l1u15-vocabulary',
  grammar: 'l1u15-grammar',
  speaking: 'l1u15-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Phone vocabulary and politeness',
    goals: ['Phone-related verbs and nouns.', 'Use 여보세요 to open a call.'],
    task: 'Open and close a phone call politely in Korean.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-아/어 주세요 + N에게/한테 + 누구',
    goals: [
      'Make polite requests with V-아/어 주세요.',
      'Mark the recipient with 에게 (formal) or 한테 (casual).',
      'Ask 누구 (who).',
    ],
    task: 'Ask someone to leave a message for a friend.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Calling and leaving a message',
    goals: ['Open a call.', 'Ask for someone.', 'Leave a clear message.'],
    task: 'Roleplay calling Kumoh National Institute of Technology to ask for a professor.',
  },
];

const lesson = {
  title: '레벨 1 · 15과: 말씀 좀 전해 주세요 (Phone Calls and Messages)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'opening-call', label: 'Opening a call', goal: 'Use 여보세요 + 누구를 찾으세요? to open a phone call.' },
    { id: 'leaving-message', label: 'Leaving a message', goal: 'Use V-아/어 주세요 + 에게/한테 + 전하다 to ask the listener to pass on a message.' },
  ],
  relatedPools: ['topic-people'],
  content: [
    createContentItem('전화', 'jeonhwa', 'phone / phone call', 'word', '전화 받으세요.', 'Please answer the phone.', null, [ACT.vocabulary]),
    createContentItem('전화하다', 'jeonhwahada', 'to call', 'word', '엄마한테 전화해요.', 'I am calling Mom.', null, [ACT.vocabulary]),
    createContentItem('전화 받다', 'jeonhwa batda', 'to receive a call', 'word', '지금 전화 받기 어려워요.', 'It is hard to take the call now.', null, [ACT.vocabulary]),
    createContentItem('여보세요', 'yeoboseyo', 'hello (on the phone)', 'word', '여보세요? 누구세요?', 'Hello? Who is this?', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('통화', 'tonghwa', 'phone conversation', 'word', '지금 통화 가능해요?', 'Can you talk now?', null, [ACT.vocabulary]),
    createContentItem('메시지', 'mesiji', 'message', 'word', '메시지를 남길게요.', 'I will leave a message.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('남기다', 'namgida', 'to leave (a message)', 'word', '메시지를 남겨 주세요.', 'Please leave a message.', null, [ACT.vocabulary]),
    createContentItem('전하다', 'jeonhada', 'to convey / pass on', 'word', '말씀 좀 전해 주세요.', 'Please pass on the message.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('말씀', 'malsseum', 'speech / words (honorific)', 'word', '말씀 좀 전해 주세요.', 'Please pass on the message.', null, [ACT.vocabulary]),
    createContentItem('잠시만요', 'jamsimanyo', 'just a moment', 'word', '잠시만요. 바꿔 드릴게요.', 'One moment. I will transfer you.', null, [ACT.vocabulary]),
    createContentItem('바꾸다', 'bakkuda', 'to change / transfer (a call)', 'word', '바꿔 드릴게요.', 'I will transfer you.', null, [ACT.vocabulary]),
    createContentItem('자리에 없다', 'jarie eopda', 'to be away from one\'s seat', 'word', '지금 자리에 안 계세요.', 'They are not at their seat right now.', null, [ACT.vocabulary]),
    createContentItem('번호', 'beonho', 'number', 'word', '전화번호가 어떻게 되세요?', 'May I have your phone number?', null, [ACT.vocabulary]),

    createContentItem(
      '여보세요? 김 선생님 계세요?', 'yeoboseyo? gim seonsaengnim gyeseyo?',
      'Hello? Is Professor Kim there?', 'sentence',
      '여보세요? 거기 학생회관이지요? 김 선생님 계세요?',
      'Hello? Is that the student center? Is Professor Kim there?',
      [
        { korean: '여보세요?', english: 'hello? (phone)' },
        { korean: '계세요?', english: 'is (he/she) there? (honorific 있다)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '말씀 좀 전해 주세요.', 'malsseum jom jeonhae juseyo.',
      'Please pass on a message.', 'sentence',
      '말씀 좀 전해 주세요. 사라가 전화했다고요.',
      'Please pass on a message. (Tell them) Sarah called.',
      [
        { korean: '말씀', english: 'words (honorific)' },
        { korean: '전해 주세요', english: 'please pass on (V-아/어 주세요)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '나중에 다시 전화 드릴게요.', 'najunge dasi jeonhwa deurilgeyo.',
      'I will call again later.', 'sentence',
      '지금 통화하기 어려워요. 나중에 다시 전화 드릴게요.',
      'It is hard to talk now. I will call again later.',
      [
        { korean: '나중에', english: 'later' },
        { korean: '다시', english: 'again' },
        { korean: '전화 드릴게요', english: 'I will call (humble form)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '전화로 약속하기', 'jeonhwaro yaksokhagi',
      'Setting up plans by phone', 'conversation',
      'A: 여보세요? 사라 씨 핸드폰이지요?\nB: 네, 사라예요. 누구세요?\nA: 저 김민수예요. 내일 시간 있어요?\nB: 내일 오후에는 시간이 있어요. 무슨 일이에요?\nA: 같이 점심 먹을까 해서요. 도서관 앞에서 12시 어때요?\nB: 좋아요. 내일 봐요.',
      'A: Hello? Is this Sarah\'s phone?\nB: Yes, this is Sarah. Who is calling?\nA: It is Minsu. Do you have time tomorrow?\nB: I have time tomorrow afternoon. What is it about?\nA: I was thinking we could have lunch. How about 12 in front of the library?\nB: Sure. See you tomorrow.',
      [
        { korean: '~씨 핸드폰이지요?', english: 'is this ~\'s phone?' },
        { korean: '누구세요?', english: 'who is this?' },
        { korean: '같이 점심 먹을까 해서요', english: 'I was thinking we could have lunch' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '메시지를 남길게요', 'mesijireul namgilgeyo',
      'Leaving a message at an office', 'conversation',
      'A: 여보세요? 컴퓨터공학과 사무실이지요?\nB: 네, 그렇습니다. 어떻게 도와드릴까요?\nA: 김민수 교수님 계세요?\nB: 죄송하지만 지금 자리에 안 계세요.\nA: 그럼 메시지를 남길게요. 사라가 전화했다고 말씀 좀 전해 주세요.\nB: 네, 알겠습니다. 전해 드리겠습니다.',
      'A: Hello? Is this the Computer Engineering department office?\nB: Yes, that\'s right. How may I help you?\nA: Is Professor Kim Minsu in?\nB: Sorry, he is not at his desk right now.\nA: Then I will leave a message. Please pass on that Sarah called.\nB: Yes, I understand. I will pass it on.',
      [
        { korean: '컴퓨터공학과 사무실', english: 'Computer Engineering department office' },
        { korean: '어떻게 도와드릴까요?', english: 'how may I help you?' },
        { korean: '전해 드리겠습니다', english: 'I will pass it on (humble future)' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
