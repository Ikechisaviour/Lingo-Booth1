// Level 2 Unit 9 — 한국의 대중문화 (Korea's popular culture)
// Source: Book 2D Unit 9. Vocab: 기분, 작품 설명, -히.
// Grammar: A/V-거든, A/V-았/었더라면, A/V-(으)ㅁ, A-(으)ㄴ 듯하다 V-는 듯하다.
// Pronunciation: Intonation of '-거든'. Culture: K-Pop.

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
  speaking: 'l2u9-speaking',
  readingSpeaking: 'l2u9-reading-speaking',
  listeningSpeaking: 'l2u9-listening-speaking',
  readingWriting: 'l2u9-reading-writing',
  task: 'l2u9-task',
  vocabulary: 'l2u9-vocabulary',
  grammar: 'l2u9-grammar',
  pronunciation: 'l2u9-pronunciation',
  culture: 'l2u9-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Boasting about your experiences',
    goals: ['Share an experience with K-pop or K-drama proudly.'],
    task: 'Boast about an experience seeing or meeting a celebrity.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Personal profile reading',
    goals: ['Read a celebrity profile.', 'Introduce a celebrity.'],
    task: 'Introduce one celebrity you like in three sentences.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Drama + interviews',
    goals: ['Listen to a drama clip.', 'Conduct a short interview.'],
    task: 'Ask three interview questions about a drama character.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'TV-program guide reading and writing',
    goals: ['Read TV-program intros.', 'Write an intro for a show.'],
    task: 'Write three sentences introducing a TV program.' },
  { id: ACT.task, section: 'Task', title: 'Introducing a work of a celebrity',
    goals: ['Briefly introduce one work (drama, song, film).'],
    task: 'Introduce a Korean drama or song to your family.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Feelings, work explanations, -히 adverb',
    goals: ['Use 기분, 작품, -히 adverb suffix.'],
    task: 'Use a -히 adverb (e.g. 천천히, 조용히, 쉽게).' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Pop-culture-talk patterns',
    goals: ['A/V-거든', 'A/V-았/었더라면', 'A/V-(으)ㅁ (nominalization)', 'A-(으)ㄴ 듯하다 / V-는 듯하다'],
    task: 'Use V-는 듯하다 to make a soft inference about a celebrity.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Intonation of -거든',
    goals: ['Use rising-then-explanatory contour for -거든.'],
    task: 'Read three -거든 sentences with the right intonation.' },
  { id: ACT.culture, section: 'Culture Note', title: 'K-Pop',
    goals: ['Understand the basics of the K-pop industry.'],
    task: 'Recommend a K-pop group to a friend.' },
];

const lesson = {
  title: '레벨 2 · 9과: 한국의 대중문화 (K-Pop and Popular Culture)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'interview-asking', label: 'Asking interview questions', goal: 'Ask three interview-style questions about a celebrity or work.' },
    { id: 'interview-answering', label: 'Answering interview questions', goal: 'Answer interview questions using A-(으)ㄴ 듯하다 / V-는 듯하다 to soften.' },
  ],
  relatedPools: ['topic-culture'],
  content: [
    createContentItem('대중문화', 'daejungmunhwa', 'popular culture', 'word', '한국 대중문화가 인기예요.', 'Korean pop culture is popular.', null, [ACT.vocabulary]),
    createContentItem('드라마', 'deurama', 'drama / TV series', 'word', '한국 드라마를 좋아해요.', 'I like Korean dramas.', null, [ACT.vocabulary]),
    createContentItem('가요', 'gayo', 'pop song', 'word', '가요 프로그램이 인기예요.', 'Music programs are popular.', null, [ACT.vocabulary]),
    createContentItem('아이돌', 'aidol', 'idol (K-pop)', 'word', '아이돌 콘서트에 갈 거예요.', 'I will go to an idol concert.', null, [ACT.vocabulary]),
    createContentItem('연예인', 'yeonyein', 'celebrity / entertainer', 'word', '연예인이 되는 게 꿈이에요.', 'Becoming a celebrity is my dream.', null, [ACT.vocabulary]),
    createContentItem('인터뷰', 'inteobyu', 'interview', 'word', '연예인 인터뷰를 봤어요.', 'I watched a celebrity interview.', null, [ACT.vocabulary]),
    createContentItem('작품', 'jakpum', 'work (artistic)', 'word', '이 작품이 정말 좋아요.', 'This work is really good.', null, [ACT.vocabulary]),
    createContentItem('기분', 'gibun', 'feeling / mood', 'word', '오늘 기분이 좋아요.', 'I feel good today.', null, [ACT.vocabulary]),
    createContentItem('감동적', 'gamdongjeok', 'moving / touching', 'word', '감동적인 영화예요.', 'It is a touching movie.', null, [ACT.vocabulary]),
    createContentItem('차분히', 'chabunhi', 'calmly (-히 adverb)', 'word', '차분히 이야기하세요.', 'Speak calmly.', null, [ACT.vocabulary]),
    createContentItem('조용히', 'joyonghi', 'quietly (-히 adverb)', 'word', '조용히 들어 주세요.', 'Please listen quietly.', null, [ACT.vocabulary]),
    createContentItem('K-Pop', 'k-pop', 'K-pop', 'word', 'K-Pop이 세계적으로 인기예요.', 'K-pop is popular worldwide.', null, [ACT.vocabulary, ACT.culture]),

    createContentItem(
      '왜 안 왔냐고요? 비가 와서 못 왔거든요.', 'wae an watnyagoyo? biga waseo mot watgeodeunyo.',
      'Why didn\'t I come? I couldn\'t because it rained, you see.', 'sentence',
      '왜 안 왔냐고요? 비가 와서 못 왔거든요. 죄송해요.',
      'Why didn\'t I come? I couldn\'t because it rained, you see. Sorry.',
      [
        { korean: '~거든(요)', english: 'because, you see (offering reason)' },
      ],
      [ACT.grammar, ACT.pronunciation],
    ),
    createContentItem(
      '그때 갔더라면 만났을 텐데요.', 'geuttae gatdeoramyeon mannasseul tendeyo.',
      'If only I had gone then, I would have met them.', 'sentence',
      '그때 콘서트에 갔더라면 그 가수를 직접 만났을 텐데요.',
      'If only I had gone to the concert then, I would have met that singer.',
      [
        { korean: '~았/었더라면', english: 'if only ~ had / past counterfactual' },
        { korean: '~았/었을 텐데', english: 'would have ~' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한국 음악의 매력은 다양함에 있어요.', 'hanguk eumagui maeryeogeun dayanghame isseoyo.',
      'The appeal of Korean music lies in its variety.', 'sentence',
      '한국 음악의 매력은 다양함에 있어요. 발라드부터 댄스까지 모두 있어요.',
      'The appeal of Korean music lies in its variety. From ballads to dance music.',
      [
        { korean: '~ㅁ', english: 'nominalization (다양함 = variety)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '저 가수는 곧 컴백할 듯해요.', 'jeo gasuneun got keombaekhal deuthaeyo.',
      'That singer seems likely to come back soon.', 'sentence',
      '저 가수는 곧 컴백할 듯해요. SNS에 사진을 자주 올려요.',
      'That singer seems likely to come back soon. They post photos on SNS often.',
      [
        { korean: '~ㄹ 듯하다', english: 'seems likely / appears that' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      'K-Pop 인터뷰', 'k-pop inteobyu',
      'A K-pop interview', 'conversation',
      'A (인터뷰어): 데뷔하기 전에 어떤 기분이었어요?\nB (가수): 너무 떨렸거든요. 잘할 수 있을지 걱정했어요.\nA: 지금은 어때요?\nB: 지금은 차분해진 듯해요. 팬분들 덕분이에요.\nA: 만약 데뷔를 안 했더라면 뭘 했을 것 같아요?\nB: 음... 음악 선생님이 됐을 것 같아요.\nA: 마지막으로 팬분들에게 한 말씀 부탁드려요.\nB: 항상 응원해 주셔서 감사해요. 더 좋은 작품으로 보답할게요.',
      'A (interviewer): How did you feel before debuting?\nB (singer): I was so nervous, you see. I worried I could not do it well.\nA: How is it now?\nB: I seem to have become calmer. Thanks to my fans.\nA: If you hadn\'t debuted, what do you think you would be doing?\nB: Hmm... I think I\'d have become a music teacher.\nA: Lastly, a word for your fans please.\nB: Thank you for always supporting me. I will repay you with better works.',
      [
        { korean: '데뷔하다', english: 'to debut' },
        { korean: '컴백', english: 'comeback' },
        { korean: '한 말씀 부탁드리다', english: 'please give a word (humble request)' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
