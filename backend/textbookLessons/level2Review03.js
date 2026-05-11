// Level 2 Track-Thematic — 복습 3 (Review 3)
// Consolidates Units 7-9: 옳고 그름, 흥미로운 세상, 한국의 대중문화.

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
  vocabulary: 'l2r3-vocabulary',
  grammar: 'l2r3-grammar',
  speaking: 'l2r3-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary Review', title: 'Mixed vocabulary from Units 7-9',
    goals: ['Recall key vocabulary from these units.'],
    task: 'Use five mixed words in your own sentences.' },
  { id: ACT.grammar, section: 'Grammar Review', title: 'Mixed grammar from Units 7-9',
    goals: ['Combine patterns from each unit.'],
    task: 'Write four sentences mixing patterns from the three units.' },
  { id: ACT.speaking, section: 'Speaking Review', title: 'Pop-culture debate roleplay',
    goals: ['Roleplay a debate or interview using mixed grammar.'],
    task: 'Roleplay an interview with a celebrity, defending a controversial opinion.' },
];

const lesson = {
  title: '레벨 2 · 복습 3 (Review of Units 7-9)',
  category: 'daily-life', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'review',
  activities,
  expressionPractice: [
    { id: 'review-mixed', label: 'Mixed opinion + culture + interview functions', goal: 'Combine asserting opinions, presenting culture features, and answering interview questions.' },
  ],
  relatedPools: ['topic-society', 'topic-culture'],
  content: [
    createContentItem('의견', 'uigyeon', 'opinion (Unit 7)', 'word', '제 의견은 다릅니다.', 'My opinion is different.', null, [ACT.vocabulary]),
    createContentItem('특징', 'teukjing', 'characteristic (Unit 8)', 'word', '한국 음식의 특징을 설명할게요.', 'I will explain the characteristics of Korean food.', null, [ACT.vocabulary]),
    createContentItem('연예인', 'yeonyein', 'celebrity (Unit 9)', 'word', '연예인을 직접 봤어요.', 'I saw a celebrity in person.', null, [ACT.vocabulary]),
    createContentItem('논란', 'nollan', 'controversy (Unit 7)', 'word', '큰 논란이 있어요.', 'There is a big controversy.', null, [ACT.vocabulary]),
    createContentItem('전통', 'jeontong', 'tradition (Unit 8)', 'word', '전통이 잘 보존돼 있어요.', 'The tradition is well preserved.', null, [ACT.vocabulary]),
    createContentItem('대중문화', 'daejungmunhwa', 'pop culture (Unit 9)', 'word', '한국 대중문화가 강해요.', 'Korean pop culture is strong.', null, [ACT.vocabulary]),
    createContentItem('비매너', 'bimaeneo', 'rude behavior (Unit 7)', 'word', '비매너 행동이 너무해요.', 'Such rude behavior is too much.', null, [ACT.vocabulary]),
    createContentItem('지역별', 'jiyeokbyeol', 'by region (Unit 8)', 'word', '지역별 사투리가 달라요.', 'Dialects differ by region.', null, [ACT.vocabulary]),
    createContentItem('인터뷰', 'inteobyu', 'interview (Unit 9)', 'word', '인터뷰가 길었어요.', 'The interview was long.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 그 행동이 무례하다고 보거든요. 그러나 사람마다 의견이 다른 듯해요.', 'jeoneun geu haengdongi muryehadago bogeodeunyo. geureona sarammada uigyeoni dareun deuthaeyo.',
      'I see that behavior as rude, you see. But it seems opinions differ by person.', 'sentence',
      '저는 그 행동이 무례하다고 보거든요. 그러나 사람마다 의견이 다른 듯해요. 더 듣고 판단할게요.',
      'I see that behavior as rude. But it seems opinions differ by person. I will listen more and decide.',
      [
        { korean: '~다고 보다', english: 'to view as ~ (Unit 7)' },
        { korean: '~거든요', english: 'because, you see (Unit 9)' },
        { korean: '~ㄴ 듯하다', english: 'seems ~ (Unit 9)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '제주도를 비롯해서 지역별 문화가 다양하더라도 한국이라는 정체성은 같아요.', 'jejudoreul birothaeso jiyeokbyeol munhwaga dayanghadeorado hangugiraneun jeongchaeseongeun gatayo.',
      'Even though regional cultures are diverse including Jeju, the Korean identity is the same.', 'sentence',
      '제주도를 비롯해서 지역별 문화가 다양하더라도 한국이라는 정체성은 같아요. 그래서 한국이 흥미로워요.',
      'Even though regional cultures are diverse including Jeju, the Korean identity is the same. That is why Korea is intriguing.',
      [
        { korean: 'N을/를 비롯해서', english: 'including N (Unit 8)' },
        { korean: '~더라도', english: 'even if ~ (Unit 7)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '그때 데뷔를 했더라면 그 작품을 비롯한 많은 인기 곡을 만들었을 거예요.', 'geuttae debireul haetdeoramyeon geu jakpumeul birothan maneun ingi gogeul mandeureosseul geoyeyo.',
      'If they had debuted then, they would have made many hit songs including that work.', 'sentence',
      '그때 데뷔를 했더라면 그 작품을 비롯한 많은 인기 곡을 만들었을 거예요. 아쉬워요.',
      'If they had debuted then, they would have made many hit songs including that work. It is a shame.',
      [
        { korean: '~았/었더라면', english: 'if only ~ had (Unit 9)' },
        { korean: 'N을/를 비롯한', english: 'including N (Unit 8)' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '복습 인터뷰', 'bokseup inteobyu',
      'Cross-unit interview', 'conversation',
      'A: 한국 문화에서 가장 흥미로운 점은 뭐라고 보세요?\nB: 음, 지역별 사투리를 비롯해서 다양한 문화가 공존한다는 점이 흥미롭다고 봐요.\nA: 그런데 일부 사람들이 사투리를 비웃는 행동도 있다고 하더라고요.\nB: 그런 비매너 행동은 옳지 않다고 보거든요. 더라도 사람마다 다르게 받아들이는 듯해요.\nA: 마지막으로 한 말씀 부탁드려요.\nB: 사투리를 비롯한 모든 한국 문화가 자랑스럽다고 생각합니다.',
      'A: What do you see as the most intriguing thing about Korean culture?\nB: Hmm, I think it is intriguing that diverse cultures coexist, including regional dialects.\nA: But I heard some people mock dialects, that kind of behavior.\nB: I see that rude behavior as wrong, you see. Still, it seems people take it differently.\nA: Lastly, a word please.\nB: I think all Korean culture, including dialects, is something to be proud of.',
      [
        { korean: '공존하다', english: 'to coexist' },
        { korean: '비웃다', english: 'to mock / ridicule' },
        { korean: '받아들이다', english: 'to accept / take in' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
