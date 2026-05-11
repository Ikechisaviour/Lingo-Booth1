// Level 3 Cluster — Connectors
// Source: TTMIK Workbook Level 3, Lessons 2, 7, 12, 15, 21.
// Patterns: -고, -아/어/여서, 그래도, 그러면/그럼, -는/은/ㄴ데.

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
  pattern: 'l3c1-pattern',
  examples: 'l3c1-examples',
  practice: 'l3c1-practice',
};

const activities = [
  { id: ACT.pattern, section: 'Pattern', title: 'Connector patterns overview',
    goals: ['Recognize 5 common Korean connectors and what each does.'],
    task: 'Match each connector to its English meaning.' },
  { id: ACT.examples, section: 'Examples', title: 'Examples in context',
    goals: ['See each connector in a natural sentence.'],
    task: 'Read three example sentences aloud.' },
  { id: ACT.practice, section: 'Practice', title: 'Producing your own sentences',
    goals: ['Create your own sentence using each connector.'],
    task: 'Make five sentences, one with each connector.' },
];

const lesson = {
  title: 'Level 3 · Connectors (-고 / -아·어·여서 / 그래도 / 그러면 / -는데)',
  category: 'daily-life', difficulty: 'advanced',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'grammar',
  activities,
  expressionPractice: [
    { id: 'using-connector', label: 'Using a connector mid-sentence', goal: 'Pick the right connector for "and / so / but / then / well, but..." in a given context.' },
  ],
  relatedPools: ['pos-verbs-1', 'pos-adjectives-1'],
  content: [
    createContentItem('-고', '-go', 'and (linking equal clauses)', 'word', '저는 한국어 공부하고 운동도 해요.', 'I study Korean and exercise too.', null, [ACT.pattern]),
    createContentItem('-아/어/여서', '-aseo/eoseo/yeoseo', 'so / because (cause + sequence)', 'word', '비가 와서 집에 있어요.', 'It is raining so I am at home.', null, [ACT.pattern]),
    createContentItem('그래도', 'geuraedo', 'but still / nevertheless', 'word', '피곤해요. 그래도 가야 해요.', 'I am tired. But still I have to go.', null, [ACT.pattern]),
    createContentItem('그러면 / 그럼', 'geureomyeon / geureom', 'in that case / then', 'word', '바쁘세요? 그럼 다음에 봐요.', 'You are busy? Then see you next time.', null, [ACT.pattern]),
    createContentItem('-는/은/ㄴ데', '-neunde / -eunde / -nde', 'background: well, / and / but', 'word', '비가 오는데 우산이 없어요.', 'It is raining, and (yet) I have no umbrella.', null, [ACT.pattern]),

    createContentItem(
      '운동을 좋아하고 매일 30분 해요.', 'undongeul joahago maeil samsippun haeyo.',
      'I like exercise and do 30 minutes daily. (-고 connecting two facts)', 'sentence',
      '운동을 좋아하고 매일 30분 해요. 그래서 건강해요.',
      'I like exercise and do 30 minutes daily. So I am healthy.',
      [{ korean: '-고', english: 'and (equal clauses)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '늦게 자서 피곤해요.', 'neutge jaseo pigonhaeyo.',
      'I went to bed late so I am tired. (-아/어서 cause)', 'sentence',
      '늦게 자서 피곤해요. 오늘은 일찍 자야겠어요.',
      'I went to bed late so I am tired. I should sleep early today.',
      [{ korean: '늦게 자서', english: 'because I slept late' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '한국어가 어려워요. 그래도 재미있어요.', 'hangugeoga eoryeowoyo. geuraedo jaemiisseoyo.',
      'Korean is hard. But still it is fun.', 'sentence',
      '한국어가 어려워요. 그래도 재미있어서 계속할 거예요.',
      'Korean is hard. But still it is fun, so I will keep going.',
      [{ korean: '그래도', english: 'but still / nevertheless' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '시간이 없어요? 그럼 내일 만나요.', 'sigani eopseoyo? geureom naeil mannayo.',
      'You have no time? Then let us meet tomorrow.', 'sentence',
      '시간이 없어요? 그럼 내일 점심에 만나요.',
      'You have no time? Then let us meet tomorrow at lunch.',
      [{ korean: '그럼', english: 'in that case (shortened from 그러면)' }],
      [ACT.examples, ACT.practice],
    ),
    createContentItem(
      '한국어 공부하는데 어려운 부분이 있어요.', 'hangugeo gongbuhaneunde eoryeoun bubuni isseoyo.',
      'I am studying Korean, and there are some hard parts.', 'sentence',
      '한국어 공부하는데 어려운 부분이 있어요. 도와주실 수 있어요?',
      'I am studying Korean, and there are some hard parts. Could you help me?',
      [{ korean: '-는데', english: 'background / soft contrast' }],
      [ACT.examples, ACT.practice],
    ),
  ],
};

module.exports = lesson;
