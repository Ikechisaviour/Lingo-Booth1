// Level 1 Unit 9 — Ordering food
// Sources: Book 1A·12 (우리 뭐 먹을까?) + Book 1B·7 (불고기 이 인분 주세요)
// Functions: ordering at a restaurant, asking what to eat, paying.

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
  vocabulary: 'l1u9-vocabulary',
  grammar: 'l1u9-grammar',
  speaking: 'l1u9-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Korean dishes and meal vocabulary',
    goals: ['Name common Korean dishes and side dishes.', 'Use 인분 (servings) for ordering.'],
    task: 'Choose three Korean dishes and say one fact about each.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: 'V-(으)ㄹ까요? (suggesting) + N 인분 + 더 + 계산',
    goals: [
      'Suggest a meal with V-(으)ㄹ까요?.',
      'Order with N + 인분 (servings).',
      'Ask for "more" with 더.',
      'Settle the bill with 계산해 주세요.',
    ],
    task: 'Order two servings of bulgogi and ask for more rice.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'At a Korean restaurant',
    goals: ['Suggest a place to eat.', 'Order food.', 'Pay the bill.'],
    task: 'Roleplay an evening out at a Korean BBQ restaurant near campus.',
  },
];

const lesson = {
  title: '레벨 1 · 9과: 불고기 이 인분 주세요 (Ordering Food)',
  category: 'food', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'suggesting-food', label: 'Suggesting what to eat', goal: 'Use V-(으)ㄹ까요? to suggest a dish or restaurant.' },
    { id: 'ordering-food', label: 'Ordering food', goal: 'State dish + 인분/개 + 주세요 to order.' },
    { id: 'paying-bill', label: 'Paying the bill', goal: 'Use 계산해 주세요 to settle and answer how you will pay.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('식당', 'sikdang', 'restaurant', 'word', '학교 근처 식당이 좋아요.', 'The restaurant near school is nice.', null, [ACT.vocabulary]),
    createContentItem('불고기', 'bulgogi', 'bulgogi (marinated beef)', 'word', '불고기를 좋아해요.', 'I like bulgogi.', null, [ACT.vocabulary]),
    createContentItem('비빔밥', 'bibimbap', 'bibimbap', 'word', '점심에 비빔밥을 먹어요.', 'I eat bibimbap for lunch.', null, [ACT.vocabulary]),
    createContentItem('김치찌개', 'gimchijjigae', 'kimchi stew', 'word', '오늘 저녁은 김치찌개예요.', 'Tonight\'s dinner is kimchi stew.', null, [ACT.vocabulary]),
    createContentItem('된장찌개', 'doenjangjjigae', 'soybean-paste stew', 'word', '된장찌개도 좋아해요.', 'I like soybean-paste stew too.', null, [ACT.vocabulary]),
    createContentItem('떡볶이', 'tteokbokki', 'tteokbokki (spicy rice cake)', 'word', '떡볶이는 매워요.', 'Tteokbokki is spicy.', null, [ACT.vocabulary]),
    createContentItem('김밥', 'gimbap', 'gimbap (seaweed roll)', 'word', '김밥 두 줄 주세요.', 'Two rolls of gimbap please.', null, [ACT.vocabulary]),
    createContentItem('밥', 'bap', 'rice / meal', 'word', '밥 좀 더 주세요.', 'Please give me more rice.', null, [ACT.vocabulary]),
    createContentItem('국', 'guk', 'soup', 'word', '국이 따뜻해요.', 'The soup is warm.', null, [ACT.vocabulary]),
    createContentItem('반찬', 'banchan', 'side dish', 'word', '반찬이 많아요.', 'There are many side dishes.', null, [ACT.vocabulary]),
    createContentItem('물', 'mul', 'water', 'word', '물 좀 주세요.', 'Please give me some water.', null, [ACT.vocabulary]),
    createContentItem('-인분', '-inbun', 'serving (counter for restaurant portions)', 'word', '불고기 이 인분 주세요.', 'Two servings of bulgogi please.', null, [ACT.vocabulary]),
    createContentItem('계산하다', 'gyesanhada', 'to settle / pay the bill', 'word', '계산해 주세요.', 'Please give me the bill.', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('맛있다', 'masitda', 'to be delicious', 'word', '정말 맛있어요!', 'It is really delicious!', null, [ACT.vocabulary]),

    createContentItem(
      '우리 뭐 먹을까요?', 'uri mwo meogeulkkayo?', 'What shall we eat?', 'sentence',
      '우리 뭐 먹을까요? — 비빔밥 먹을까요?', 'What shall we eat? — Shall we have bibimbap?',
      [
        { korean: '우리', english: 'we / us' },
        { korean: '뭐 먹을까요?', english: 'what shall we eat? (V-(으)ㄹ까요? suggesting)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '불고기 이 인분 주세요.', 'bulgogi i inbun juseyo.',
      'Two servings of bulgogi please.', 'sentence',
      '불고기 이 인분 주세요. 그리고 김치찌개도요.',
      'Two servings of bulgogi please. And kimchi stew too.',
      [
        { korean: '이 인분', english: 'two servings (Sino-Korean number + 인분)' },
        { korean: '주세요', english: 'please give me' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '밥 좀 더 주세요.', 'bap jom deo juseyo.',
      'Please give me a bit more rice.', 'sentence',
      '밥 좀 더 주세요. 물도 한 잔 더 주세요.',
      'Please give me a bit more rice. One more glass of water too.',
      [
        { korean: '밥', english: 'rice / meal' },
        { korean: '좀 더', english: 'a bit more' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '계산해 주세요.', 'gyesanhae juseyo.', 'Please bring the bill.', 'sentence',
      '계산해 주세요. 카드로 계산할게요.', 'Please bring the bill. I will pay by card.',
      [
        { korean: '계산해 주세요', english: 'please settle (the bill)' },
        { korean: '카드로', english: 'by card' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '저녁에 뭐 먹을까요?', 'jeonyeoge mwo meogeulkkayo?',
      'What shall we eat for dinner?', 'conversation',
      'A: 저녁에 뭐 먹을까요?\nB: 학교 근처에 한식당이 있어요. 거기에 갈까요?\nA: 좋아요. 뭐가 맛있어요?\nB: 김치찌개가 정말 맛있어요. 불고기도 괜찮아요.\nA: 그럼 같이 가요.',
      'A: What shall we eat for dinner?\nB: There is a Korean restaurant near school. Shall we go there?\nA: Sure. What is good?\nB: The kimchi stew is really delicious. Bulgogi is also good.\nA: Then let us go together.',
      [
        { korean: '한식당', english: 'Korean restaurant' },
        { korean: '뭐가 맛있어요?', english: 'what is good?' },
        { korean: '괜찮아요', english: 'is good / okay' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '식당에서 주문하기', 'sikdangeseo jumunhagi',
      'Ordering at a restaurant', 'conversation',
      'A (직원): 어서 오세요. 몇 분이세요?\nB (손님): 두 명이에요.\nA: 이쪽으로 앉으세요. 메뉴 여기 있습니다.\nB: 불고기 이 인분하고 김치찌개 하나 주세요.\nA: 음료수는요?\nB: 물만 주세요. 감사합니다.',
      'A (server): Welcome. How many people?\nB (customer): Two.\nA: Please sit this way. Here is the menu.\nB: Two servings of bulgogi and one kimchi stew, please.\nA: How about drinks?\nB: Just water, please. Thank you.',
      [
        { korean: '몇 분이세요?', english: 'how many of you? (honorific)' },
        { korean: '이쪽으로 앉으세요', english: 'please sit this way' },
        { korean: '음료수', english: 'beverage' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
