// Level 1 Unit 4 — Daily routines
// Sources: Book 1A·7 (난 책을 읽어) + Book 1B·4 (주말에는 보통 집에서 쉬어요)
// Functions: describing what you do daily, talking about routine.

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
  vocabulary: 'l1u4-vocabulary',
  grammar: 'l1u4-grammar',
  speaking: 'l1u4-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Daily action verbs',
    goals: ['Learn 15 common daily-action verbs.'],
    task: 'List your top three daily activities in Korean.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'Polite -아/어요 + object 을/를 + time/place 에',
    goals: [
      'Conjugate polite present -아/어요 forms.',
      'Mark objects with 을/를.',
      'Use 에 for both time and location.',
      'Negate with 안 + verb.',
    ],
    task: 'Make four sentences describing your morning, using -아/어요.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'Talking about your day',
    goals: ['Describe your daily schedule.', 'Ask what someone usually does.'],
    task: 'Tell the tutor what you usually do on weekdays vs weekends.',
  },
];

const lesson = {
  title: '레벨 1 · 4과: 주말에는 보통 집에서 쉬어요 (Daily Routines)',
  category: 'daily-life', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'describing-daily-activities', label: 'Describing daily activities', goal: 'Use -아/어요 to describe what you do at different times of day.' },
    { id: 'asking-what-do-daily', label: 'Asking what someone does', goal: 'Use 뭐 해요? / 무엇을 해요? to ask what someone is doing or usually does.' },
  ],
  relatedPools: ['topic-people', 'topic-school'],
  content: [
    // Vocabulary
    createContentItem('일어나다', 'ireonada', 'to get up / wake up', 'word', '저는 7시에 일어나요.', 'I wake up at 7.', null, [ACT.vocabulary]),
    createContentItem('자다', 'jada', 'to sleep', 'word', '보통 11시에 자요.', 'I usually sleep at 11.', null, [ACT.vocabulary]),
    createContentItem('먹다', 'meokda', 'to eat', 'word', '아침을 먹어요.', 'I eat breakfast.', null, [ACT.vocabulary]),
    createContentItem('마시다', 'masida', 'to drink', 'word', '커피를 마셔요.', 'I drink coffee.', null, [ACT.vocabulary]),
    createContentItem('가다', 'gada', 'to go', 'word', '학교에 가요.', 'I go to school.', null, [ACT.vocabulary]),
    createContentItem('오다', 'oda', 'to come', 'word', '친구가 집에 와요.', 'My friend comes to my house.', null, [ACT.vocabulary]),
    createContentItem('공부하다', 'gongbuhada', 'to study', 'word', '한국어를 공부해요.', 'I study Korean.', null, [ACT.vocabulary]),
    createContentItem('일하다', 'ilhada', 'to work', 'word', '카페에서 일해요.', 'I work at a cafe.', null, [ACT.vocabulary]),
    createContentItem('쉬다', 'swida', 'to rest', 'word', '주말에 집에서 쉬어요.', 'I rest at home on weekends.', null, [ACT.vocabulary]),
    createContentItem('운동하다', 'undonghada', 'to exercise', 'word', '저녁에 운동해요.', 'I exercise in the evening.', null, [ACT.vocabulary]),
    createContentItem('보다', 'boda', 'to see / watch', 'word', '영화를 봐요.', 'I watch a movie.', null, [ACT.vocabulary]),
    createContentItem('듣다', 'deutda', 'to listen', 'word', '음악을 들어요.', 'I listen to music.', null, [ACT.vocabulary]),
    createContentItem('만나다', 'mannada', 'to meet', 'word', '친구를 만나요.', 'I meet a friend.', null, [ACT.vocabulary]),
    createContentItem('읽다', 'ikda', 'to read', 'word', '책을 읽어요.', 'I read a book.', null, [ACT.vocabulary]),
    createContentItem('쓰다', 'sseuda', 'to write / use', 'word', '한국어로 일기를 써요.', 'I write a diary in Korean.', null, [ACT.vocabulary]),

    // Grammar
    createContentItem(
      '저는 한국어를 공부해요.', 'jeoneun hangugeoreul gongbuhaeyo.', 'I study Korean.', 'sentence',
      '저는 매일 한국어를 공부해요.', 'I study Korean every day.',
      [
        { korean: '저는', english: 'I (topic)' },
        { korean: '한국어를', english: 'Korean + object 를' },
        { korean: '공부해요', english: 'study (polite present)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '아침에 빵을 먹어요.', 'achime ppangeul meogeoyo.', 'I eat bread in the morning.', 'sentence',
      '아침에 빵을 먹어요. 우유도 마셔요.', 'I eat bread in the morning. I also drink milk.',
      [
        { korean: '아침에', english: 'in the morning (time + 에)' },
        { korean: '빵을', english: 'bread + object 을' },
        { korean: '먹어요', english: 'eat (polite)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '학교에서 친구를 만나요.', 'hakgyoeseo chingureul mannayo.', 'I meet a friend at school.', 'sentence',
      '오늘 학교에서 친구를 만나요. 같이 공부해요.', 'Today I meet a friend at school. We study together.',
      [
        { korean: '학교에서', english: 'at school (location of action + 에서)' },
        { korean: '친구를', english: 'friend + object' },
        { korean: '만나요', english: 'meet (polite)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '주말에는 안 일해요.', 'jumarenneun an ilhaeyo.', 'I do not work on weekends.', 'sentence',
      '주말에는 안 일해요. 집에서 쉬어요.', 'I do not work on weekends. I rest at home.',
      [
        { korean: '주말에는', english: 'on weekends (time + 에 + topic 는 = contrast)' },
        { korean: '안 일해요', english: 'do not work (안 negation)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '저녁에 운동을 해요.', 'jeonyeoge undongeul haeyo.', 'I exercise in the evening.', 'sentence',
      '저녁에 운동을 해요. 매일 30분쯤 해요.', 'I exercise in the evening. I do about 30 minutes daily.',
      [
        { korean: '저녁에', english: 'in the evening' },
        { korean: '운동을 해요', english: 'do exercise (separable form)' },
      ],
      [ACT.grammar],
    ),

    // Speaking conversations
    createContentItem(
      '주말에 보통 뭐 해요?', 'jumare botong mwo haeyo?',
      'What do you usually do on weekends?', 'conversation',
      'A: 주말에 보통 뭐 해요?\nB: 보통 집에서 쉬어요. 책도 읽어요.\nA: 운동도 해요?\nB: 가끔 해요. 토요일 아침에 공원에서 달려요.\nA: 좋네요.',
      'A: What do you usually do on weekends?\nB: I usually rest at home. I also read books.\nA: Do you exercise too?\nB: Sometimes. On Saturday mornings I run in the park.\nA: That is nice.',
      [
        { korean: '주말에 보통', english: 'usually on weekends' },
        { korean: '집에서 쉬어요', english: 'rest at home' },
        { korean: '가끔', english: 'sometimes' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '오늘 뭐 해요?', 'oneul mwo haeyo?',
      'What are you doing today?', 'conversation',
      'A: 오늘 뭐 해요?\nB: 오전에 학교에 가요. 한국어 수업이 있어요.\nA: 오후에는요?\nB: 오후에는 친구를 만나요. 같이 영화를 봐요.\nA: 재미있겠네요.',
      'A: What are you doing today?\nB: In the morning I go to school. I have a Korean class.\nA: And in the afternoon?\nB: In the afternoon I meet a friend. We watch a movie together.\nA: Sounds fun.',
      [
        { korean: '오전에 / 오후에', english: 'in the morning / afternoon' },
        { korean: '수업이 있어요', english: 'have a class' },
        { korean: '재미있겠네요', english: 'sounds fun' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
