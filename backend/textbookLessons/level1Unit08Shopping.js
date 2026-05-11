// Level 1 Unit 8 — Shopping & bargaining
// Sources: Book 1A·9 (좀 비싸지만 좋아요) + Book 1B·8 (좀 깎아 주세요)
// Functions: asking prices, native-Korean numbers + counters, bargaining politely.

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
  vocabulary: 'l1u8-vocabulary',
  grammar: 'l1u8-grammar',
  speaking: 'l1u8-speaking',
};

const activities = [
  {
    id: ACT.vocabulary, section: 'Vocabulary',
    title: 'Numbers, counters, and shopping items',
    goals: ['Use native-Korean numbers 1-10.', 'Pair counters with items: 개, 명, 잔, 권.'],
    task: 'Practice counting three different items with the right counter.',
  },
  {
    id: ACT.grammar, section: 'Grammar and Expression',
    title: '얼마예요? + N + native number + counter + 좀 + adjective + 주세요',
    goals: [
      'Ask 얼마예요? for prices and read price answers.',
      'Soften a request with 좀 + adjective.',
      'Use V-아/어 주세요 for polite requests (especially 깎아 주세요).',
    ],
    task: 'Buy two apples and a coffee, asking the price and requesting a discount.',
  },
  {
    id: ACT.speaking, section: 'Speaking',
    title: 'At a market and a coffee shop',
    goals: ['Buy something at a market.', 'Order at a coffee shop.', 'Politely bargain a price.'],
    task: 'Roleplay buying fruit at a Korean traditional market.',
  },
];

const lesson = {
  title: '레벨 1 · 8과: 좀 깎아 주세요 (Shopping and Bargaining)',
  category: 'shopping', difficulty: 'beginner',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'thematic',
  activities,
  expressionPractice: [
    { id: 'asking-price', label: 'Asking the price', goal: 'Use 얼마예요? to ask the price and parse the answer.' },
    { id: 'making-purchase', label: 'Making a purchase', goal: 'State item + native number + counter + 주세요 to buy items.' },
    { id: 'polite-bargain', label: 'Polite bargaining', goal: 'Use 좀 + adjective and 깎아 주세요 to ask politely for a small discount.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('하나', 'hana', 'one (native)', 'word', '하나 주세요.', 'Please give me one.', null, [ACT.vocabulary]),
    createContentItem('둘', 'dul', 'two (native)', 'word', '사과 두 개 주세요.', 'Two apples please.', null, [ACT.vocabulary]),
    createContentItem('셋', 'set', 'three (native)', 'word', '세 명이에요.', 'There are three people.', null, [ACT.vocabulary]),
    createContentItem('넷', 'net', 'four (native)', 'word', '커피 네 잔 주세요.', 'Four coffees please.', null, [ACT.vocabulary]),
    createContentItem('다섯', 'daseot', 'five (native)', 'word', '책 다섯 권이에요.', 'There are five books.', null, [ACT.vocabulary]),
    createContentItem('-개', '-gae', 'counter for general items', 'word', '사과 두 개', 'two apples', null, [ACT.vocabulary]),
    createContentItem('-명', '-myeong', 'counter for people', 'word', '학생 세 명', 'three students', null, [ACT.vocabulary]),
    createContentItem('-잔', '-jan', 'counter for cups / glasses', 'word', '물 한 잔', 'a glass of water', null, [ACT.vocabulary]),
    createContentItem('-권', '-gwon', 'counter for books', 'word', '책 한 권', 'one book', null, [ACT.vocabulary]),
    createContentItem('비싸다', 'bissada', 'to be expensive', 'word', '이거 좀 비싸요.', 'This is a bit expensive.', null, [ACT.vocabulary]),
    createContentItem('싸다', 'ssada', 'to be cheap', 'word', '이 가게는 싸요.', 'This shop is cheap.', null, [ACT.vocabulary]),
    createContentItem('얼마', 'eolma', 'how much', 'word', '얼마예요?', 'How much is it?', null, [ACT.vocabulary, ACT.speaking]),
    createContentItem('가격', 'gagyeok', 'price', 'word', '가격이 어때요?', 'How is the price?', null, [ACT.vocabulary]),
    createContentItem('깎다', 'kkakda', 'to discount / cut down', 'word', '좀 깎아 주세요.', 'Please give me a small discount.', null, [ACT.vocabulary, ACT.speaking]),

    createContentItem(
      '이거 얼마예요?', 'igeo eolmayeyo?', 'How much is this?', 'sentence',
      '이거 얼마예요? — 5,000원이에요.', 'How much is this? — It is 5,000 won.',
      [
        { korean: '이거', english: 'this' },
        { korean: '얼마예요?', english: 'how much is it?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '사과 두 개하고 커피 한 잔 주세요.', 'sagwa du gaehago keopi han jan juseyo.',
      'Two apples and one coffee, please.', 'sentence',
      '사과 두 개하고 커피 한 잔 주세요. 얼마예요?',
      'Two apples and one coffee, please. How much is it?',
      [
        { korean: '두 개', english: 'two (native + counter for items)' },
        { korean: '한 잔', english: 'one cup (native + counter for cups)' },
        { korean: '주세요', english: 'please give me' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '좀 비싸요. 좀 깎아 주세요.', 'jom bissayo. jom kkakka juseyo.',
      'It is a bit expensive. Please give me a small discount.', 'sentence',
      '좀 비싸요. 좀 깎아 주세요. — 그럼 500원 깎아 드릴게요.',
      'It is a bit expensive. Please give me a small discount. — Then I will take 500 won off.',
      [
        { korean: '좀 비싸요', english: 'a bit expensive (좀 softens)' },
        { korean: '깎아 주세요', english: 'please cut the price (V-아/어 주세요)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '이게 더 좋아요.', 'ige deo joayo.', 'This one is better.', 'sentence',
      '이게 더 좋아요. 그리고 더 싸요.', 'This one is better. And it is cheaper too.',
      [
        { korean: '이게', english: 'this one (이거 + subject 가 contracted)' },
        { korean: '더', english: 'more' },
        { korean: '좋아요', english: 'is good' },
      ],
      [ACT.grammar],
    ),

    createContentItem(
      '시장에서 사과를 사요.', 'sijangeseo sagwareul sayo.',
      'Buying apples at the market', 'conversation',
      'A: 안녕하세요. 사과 얼마예요?\nB: 한 개에 1,500원이에요.\nA: 음... 좀 비싸요. 다섯 개 살 거예요. 좀 깎아 주세요.\nB: 그럼 7,000원에 드릴게요.\nA: 감사합니다.',
      'A: Hello. How much are the apples?\nB: 1,500 won each.\nA: Hmm, that is a bit expensive. I will buy five. Could you give me a small discount?\nB: Then I will give them to you for 7,000 won.\nA: Thank you.',
      [
        { korean: '한 개에', english: 'per piece' },
        { korean: '다섯 개 살 거예요', english: 'I will buy five' },
        { korean: '~에 드릴게요', english: 'I will give it for ~' },
      ],
      [ACT.speaking],
    ),
    createContentItem(
      '카페에서 주문해요.', 'kapeeseo jumunhaeyo.',
      'Ordering at a cafe', 'conversation',
      'A: 어서 오세요. 뭐 드릴까요?\nB: 아메리카노 두 잔하고 케이크 한 개 주세요.\nA: 케이크는 어떤 거 드릴까요?\nB: 초코 케이크요.\nA: 모두 1만 5,000원입니다.\nB: 카드로 할게요.',
      'A: Welcome. What can I get for you?\nB: Two Americanos and one cake, please.\nA: Which cake would you like?\nB: A chocolate cake.\nA: That will be 15,000 won total.\nB: I will pay by card.',
      [
        { korean: '뭐 드릴까요?', english: 'what shall I give you? (server)' },
        { korean: '두 잔하고 한 개', english: 'two cups and one piece' },
        { korean: '카드로 할게요', english: 'I will pay by card' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
