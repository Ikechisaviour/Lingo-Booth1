// Level 2 Unit 5 — 속담과 관용어 (Proverbs and idioms)
// Source: Book 2D Unit 5. Vocab: 속담, 관용어.
// Grammar: A/V-고 해서, A-다더니 V-ㄴ다더니, A/V-기 마련이다, V-다 보니(까).
// Pronunciation: Final ㄹㄱ/ㄹㅁ. Culture: Main characters of proverbs.

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
  speaking: 'l2u5-speaking',
  readingSpeaking: 'l2u5-reading-speaking',
  listeningSpeaking: 'l2u5-listening-speaking',
  readingWriting: 'l2u5-reading-writing',
  task: 'l2u5-task',
  vocabulary: 'l2u5-vocabulary',
  grammar: 'l2u5-grammar',
  pronunciation: 'l2u5-pronunciation',
  culture: 'l2u5-culture',
};

const activities = [
  { id: ACT.speaking, section: 'Speaking', title: 'Explaining upsetting events',
    goals: ['Explain what happened with multiple reasons.'],
    task: 'Tell a small frustration using A/V-고 해서.' },
  { id: ACT.readingSpeaking, section: 'Reading and Speaking', title: 'Personality descriptions + describing someone',
    goals: ['Read a personality profile.', 'Describe a friend\'s personality.'],
    task: 'Describe a classmate\'s personality in 3 sentences.' },
  { id: ACT.listeningSpeaking, section: 'Listening and Speaking', title: 'Radio letter + consoling with proverbs',
    goals: ['Listen to a radio letter.', 'Console using a proverb.'],
    task: 'Console a friend with one Korean proverb.' },
  { id: ACT.readingWriting, section: 'Reading and Writing', title: 'Articles quoting proverbs',
    goals: ['Read articles that quote proverbs.', 'Write your own piece quoting one.'],
    task: 'Write three sentences citing a proverb.' },
  { id: ACT.task, section: 'Task', title: 'Pantomime game',
    goals: ['Mime a proverb so others can guess.'],
    task: 'Pick three proverbs and describe them without using their words.' },
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Proverbs and idioms',
    goals: ['Recognize 10+ Korean proverbs and idioms.'],
    task: 'Pick three proverbs and explain their meaning.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'Quoting and consoling patterns',
    goals: ['A/V-고 해서', 'A-다더니 / V-ㄴ다더니', 'A/V-기 마련이다', 'V-다 보니(까)'],
    task: 'Use A/V-기 마련이다 to console a friend.' },
  { id: ACT.pronunciation, section: 'Pronunciation', title: 'Final ㄹㄱ, ㄹㅁ',
    goals: ['Pronounce 닭, 삶, 흙 correctly.'],
    task: 'Read 닭, 삶, 흙 with the right final-consonant sound.' },
  { id: ACT.culture, section: 'Culture Note', title: 'Main characters of proverbs',
    goals: ['Recognize recurring proverb characters: 호랑이, 소, 까마귀, 까치.'],
    task: 'Pick one proverb-animal and find a similar saying from your culture.' },
];

const lesson = {
  title: '레벨 2 · 5과: 속담과 관용어 (Proverbs and Idioms)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'quoting', label: 'Quoting a proverb', goal: 'Use A-다더니/V-ㄴ다더니 to quote a saying that matches the situation.' },
    { id: 'consoling', label: 'Consoling someone', goal: 'Use A/V-기 마련이다 to reassure that something is normal.' },
  ],
  relatedPools: ['topic-proverbs-idioms', 'pos-proverbs', 'pos-idioms'],
  content: [
    createContentItem('속담', 'sokdam', 'proverb', 'word', '한국 속담을 배워요.', 'I am learning Korean proverbs.', null, [ACT.vocabulary]),
    createContentItem('관용어', 'gwanyongeo', 'idiomatic expression', 'word', '관용어가 어려워요.', 'Idioms are difficult.', null, [ACT.vocabulary]),
    createContentItem('가는 말이 고와야 오는 말이 곱다', 'ganeun mari gowaya oneun mari gopda', 'kind words bring kind words back (proverb)', 'word', '가는 말이 고와야 오는 말이 곱대요.', 'They say kind words bring kind words back.', null, [ACT.vocabulary]),
    createContentItem('티끌 모아 태산', 'tikkeul moa taesan', 'many a little makes a mickle (proverb)', 'word', '티끌 모아 태산이라고 매일 저금해요.', 'Many a little makes a mickle, so I save daily.', null, [ACT.vocabulary]),
    createContentItem('소 잃고 외양간 고친다', 'so ilko oeyanggan gochinda', 'shutting the stable after the horse has bolted', 'word', '소 잃고 외양간 고치지 마세요.', 'Do not shut the stable after the horse has bolted.', null, [ACT.vocabulary]),
    createContentItem('호랑이도 제 말 하면 온다', 'horangido je mal hamyeon onda', 'speak of the devil', 'word', '호랑이도 제 말 하면 온다고, 마침 왔네요.', 'Speak of the devil — they just arrived.', null, [ACT.vocabulary]),
    createContentItem('발이 넓다', 'bari neopda', 'to know many people (idiom: have wide feet)', 'word', '저 사람은 발이 넓어요.', 'That person has a wide social network.', null, [ACT.vocabulary]),
    createContentItem('눈이 높다', 'nuni nopda', 'to have high standards (idiom: high eyes)', 'word', '눈이 너무 높아요.', 'Their standards are too high.', null, [ACT.vocabulary]),
    createContentItem('한 귀로 듣고 한 귀로 흘리다', 'han gwiro deutgo han gwiro heullida', 'in one ear and out the other', 'word', '엄마 말씀을 한 귀로 듣고 한 귀로 흘려요.', 'I let my mom\'s words go in one ear and out the other.', null, [ACT.vocabulary]),
    createContentItem('손이 크다', 'soni keuda', 'to be generous (idiom: big hands)', 'word', '저희 어머니는 손이 커요.', 'My mother is generous.', null, [ACT.vocabulary]),
    createContentItem('닭', 'dak', 'chicken (final-cluster ㄺ pronunciation)', 'word', '닭고기를 먹어요.', 'I eat chicken.', null, [ACT.vocabulary, ACT.pronunciation]),
    createContentItem('삶', 'sam', 'life (final-cluster ㄻ pronunciation)', 'word', '건강한 삶이 중요해요.', 'A healthy life is important.', null, [ACT.vocabulary, ACT.pronunciation]),

    createContentItem(
      '오늘 비도 오고 해서 그냥 집에 있어요.', 'oneul bido ogo haeseo geunyang jibe isseoyo.',
      'It rained and so on, so I just stayed home.', 'sentence',
      '오늘 비도 오고 친구도 바쁘고 해서 그냥 집에 있어요.',
      'It rained and my friend was busy and so on, so I just stayed home.',
      [
        { korean: '~고 해서', english: '~ and so on (multiple reasons)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '맛있다더니 진짜 맛있네요!', 'masitdadeoni jinjja masinneyo!',
      'They said it was tasty, and it really is!', 'sentence',
      '여기 음식이 맛있다더니 진짜 맛있네요! 친구가 추천한 가게예요.',
      'They said the food here is tasty, and it really is! It is a place my friend recommended.',
      [
        { korean: 'A-다더니', english: 'they said ~ and indeed (quoting hearsay)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '실수는 누구나 하기 마련이에요.', 'silsuneun nuguna hagi maryeonieyo.',
      'Anyone makes mistakes (it is bound to happen).', 'sentence',
      '실수는 누구나 하기 마련이에요. 너무 자책하지 마세요.',
      'Anyone makes mistakes. Do not blame yourself too much.',
      [
        { korean: '~기 마련이다', english: 'is bound to ~ (consoling expression)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '한국에 살다 보니까 김치를 좋아하게 됐어요.', 'hanguge salda bonikka gimchireul joahage dwaesseoyo.',
      'Living in Korea, I have come to like kimchi.', 'sentence',
      '한국에 살다 보니까 김치를 좋아하게 됐어요. 매일 먹어요.',
      'Living in Korea, I have come to like kimchi. I eat it every day.',
      [
        { korean: '~다 보니(까)', english: 'as I kept ~ / having ~' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '속담으로 위로하기', 'sokdameuro wirohagi',
      'Consoling with a proverb', 'conversation',
      'A: 시험을 또 못 봤어. 어떻게 해.\nB: 너무 자책하지 마. 실수는 누구나 하기 마련이야.\nA: 그래도 매번 같은 실수를 해서 속상해.\nB: 가는 말이 고와야 오는 말이 곱다고, 자기 자신한테도 친절해야 해. 다음에 잘하면 돼.\nA: 고마워. 네 말이 맞아.',
      'A: I bombed the exam again. What do I do.\nB: Do not blame yourself too much. Everyone makes mistakes.\nA: But I make the same mistake every time, it is upsetting.\nB: They say "kind words for kind words back" — you should be kind to yourself too. You can do better next time.\nA: Thanks. You are right.',
      [
        { korean: '자책하다', english: 'to blame oneself' },
        { korean: '속상하다', english: 'to be upset' },
      ],
      [ACT.listeningSpeaking, ACT.speaking],
    ),
  ],
};

module.exports = lesson;
