// Level 1 Unit 6 — Dates & calendar
// Source: Book 1B·6 (제 생일은 6월 11일이에요)
// Functions: dates, days of the week, asking about birthdays.

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
  vocabulary: 'l1u6-vocabulary',
  grammar: 'l1u6-grammar',
  speaking: 'l1u6-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Days, months, and time markers',
    goals: ['Learn the seven days of the week.', 'Learn 오늘/어제/내일 and month names.'],
    task: 'Say today\'s day and date in Korean.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'Sino-Korean numbers + 월/일 + 의 (possessive)',
    goals: [
      'Read dates with Sino-Korean numbers + 월 (month) + 일 (day).',
      'Use 의 to mark possession (e.g. 친구의 생일).',
      'Ask 언제 (when).',
    ],
    task: 'Write three dates: today, your birthday, and the start of the semester.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Talking about birthdays and plans',
    goals: ['Ask and answer 생일이 언제예요?'],
    task: 'Tell the tutor your birthday and one important date in your life.',
  },
];

const lesson = {
  title: '레벨 1 · 6과: 제 생일은 6월 11일이에요 (Dates and Calendar)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-when-date', label: 'Asking when something happens', goal: 'Use 언제예요? to ask for the date or day of an event.' },
    { id: 'stating-birthday', label: 'Stating a birthday', goal: 'Give a date in N월 N일 format and use it to talk about your birthday.' },
  ],
  relatedPools: [],
  content: [
    // Vocabulary — days
    createContentItem('월요일', 'woryoil', 'Monday', 'word', '월요일에 학교에 가요.', 'I go to school on Monday.', null, [ACT.vocabulary]),
    createContentItem('화요일', 'hwayoil', 'Tuesday', 'word', '화요일에 한국어 수업이 있어요.', 'I have Korean class on Tuesday.', null, [ACT.vocabulary]),
    createContentItem('수요일', 'suyoil', 'Wednesday', 'word', '수요일에 친구를 만나요.', 'I meet a friend on Wednesday.', null, [ACT.vocabulary]),
    createContentItem('목요일', 'mogyoil', 'Thursday', 'word', '목요일에 일해요.', 'I work on Thursday.', null, [ACT.vocabulary]),
    createContentItem('금요일', 'geumyoil', 'Friday', 'word', '금요일이 좋아요.', 'I like Fridays.', null, [ACT.vocabulary]),
    createContentItem('토요일', 'toyoil', 'Saturday', 'word', '토요일에 쉬어요.', 'I rest on Saturday.', null, [ACT.vocabulary]),
    createContentItem('일요일', 'iryoil', 'Sunday', 'word', '일요일에 가족과 같이 있어요.', 'On Sunday I am with my family.', null, [ACT.vocabulary]),
    // Vocabulary — relative time
    createContentItem('오늘', 'oneul', 'today', 'word', '오늘은 월요일이에요.', 'Today is Monday.', null, [ACT.vocabulary]),
    createContentItem('어제', 'eoje', 'yesterday', 'word', '어제는 일요일이었어요.', 'Yesterday was Sunday.', null, [ACT.vocabulary]),
    createContentItem('내일', 'naeil', 'tomorrow', 'word', '내일은 화요일이에요.', 'Tomorrow is Tuesday.', null, [ACT.vocabulary]),
    createContentItem('주말', 'jumal', 'weekend', 'word', '주말이 좋아요.', 'I like weekends.', null, [ACT.vocabulary]),
    createContentItem('생일', 'saengil', 'birthday', 'word', '제 생일은 6월이에요.', 'My birthday is in June.', null, [ACT.vocabulary, ACT.speaking]),
    // Vocabulary — months/year terms
    createContentItem('월', 'wol', 'month (counter)', 'word', '6월은 더워요.', 'June is hot.', null, [ACT.vocabulary]),
    createContentItem('일', 'il', 'day (counter)', 'word', '오늘은 11일이에요.', 'Today is the 11th.', null, [ACT.vocabulary]),
    createContentItem('년', 'nyeon', 'year', 'word', '2026년이에요.', 'It is 2026.', null, [ACT.vocabulary]),

    // Grammar
    createContentItem(
      '제 생일은 6월 11일이에요.', 'je saengireun yuwol sibirilieyo.', 'My birthday is June 11th.', 'sentence',
      '제 생일은 6월 11일이에요. 친구들이 같이 축하해 줘요.', 'My birthday is June 11th. My friends celebrate it with me.',
      [
        { korean: '제 생일은', english: 'my birthday (topic)' },
        { korean: '6월 11일', english: 'June 11 (Sino-Korean numbers + 월·일)' },
        { korean: '이에요', english: 'is (polite, after consonant)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '오늘은 며칠이에요?', 'oneureun myeochirieyo?', 'What is today\'s date?', 'sentence',
      '오늘은 며칠이에요? — 11월 9일이에요.', 'What is today\'s date? — It is November 9th.',
      [
        { korean: '오늘은', english: 'today (topic)' },
        { korean: '며칠', english: 'what date' },
        { korean: '이에요?', english: 'is it?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '시험이 언제예요?', 'siheomi eonjeyeyo?', 'When is the exam?', 'sentence',
      '시험이 언제예요? — 다음 주 금요일이에요.', 'When is the exam? — Next Friday.',
      [
        { korean: '시험이', english: 'exam + subject' },
        { korean: '언제예요?', english: 'when is it?' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '친구의 생일은 5월이에요.', 'chinguui saengireun owolieyo.', 'My friend\'s birthday is in May.', 'sentence',
      '친구의 생일은 5월이에요. 같이 케이크를 먹을 거예요.', 'My friend\'s birthday is in May. We will eat cake together.',
      [
        { korean: '친구의', english: 'friend\'s (의 = possessive)' },
        { korean: '5월', english: 'May' },
      ],
      [ACT.grammar],
    ),

    // Speaking
    createContentItem(
      '생일이 언제예요?', 'saengiri eonjeyeyo?',
      'When is your birthday?', 'conversation',
      'A: 생일이 언제예요?\nB: 제 생일은 6월 11일이에요. 사라 씨는요?\nA: 저는 12월 3일이에요.\nB: 와, 겨울 생일이네요!\nA: 네, 그래서 케이크를 항상 따뜻하게 데워서 먹어요.\nB: 재밌네요.',
      'A: When is your birthday?\nB: My birthday is June 11th. How about you, Sarah?\nA: Mine is December 3rd.\nB: Wow, a winter birthday!\nA: Yes, so I always warm up the cake before eating it.\nB: That is funny.',
      [
        { korean: '생일이 언제예요?', english: 'when is your birthday?' },
        { korean: '겨울 생일', english: 'winter birthday' },
        { korean: '항상', english: 'always' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '오늘은 무슨 요일이에요?', 'oneureun museun yoirieyo?',
      'What day of the week is today?', 'conversation',
      'A: 오늘은 무슨 요일이에요?\nB: 화요일이에요. 왜요?\nA: 한국어 수업이 언제인지 잊어버렸어요.\nB: 한국어 수업은 수요일이에요. 내일이에요.\nA: 아, 그렇군요. 고마워요.',
      'A: What day of the week is today?\nB: It is Tuesday. Why?\nA: I forgot when my Korean class is.\nB: Your Korean class is on Wednesday. It is tomorrow.\nA: Oh, I see. Thanks.',
      [
        { korean: '무슨 요일', english: 'what day of the week' },
        { korean: '잊어버리다', english: 'to forget' },
        { korean: '아, 그렇군요', english: 'oh, I see' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
