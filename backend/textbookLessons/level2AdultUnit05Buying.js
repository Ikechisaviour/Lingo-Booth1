// Level 2 Track-Adult Unit 5 — 얼마예요? (Buying in adult contexts)
// Source: Book 2A·5. Functions: pricing, payment methods, returns, receipts.

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
  vocabulary: 'l2au5-vocabulary',
  grammar: 'l2au5-grammar',
  speaking: 'l2au5-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Prices, payment, receipts',
    goals: ['Use 가격, 카드, 현금, 영수증, 환불.'],
    task: 'Buy something and ask for a receipt.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'N(으)로 means + V-(으)ㄹ게요',
    goals: ['Use N(으)로 to mark how you pay.', 'Use V-(으)ㄹ게요 for first-person commitment.'],
    task: 'Make two sentences using N(으)로 and V-(으)ㄹ게요.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Buying daily necessities',
    goals: ['Buy something at a convenience store.', 'Ask for a refund.'],
    task: 'Roleplay returning a shirt to a clothing store.' },
];

const lesson = {
  title: '레벨 2 (직장) · 5과: 얼마입니까? (Buying Daily Necessities)',
  category: 'shopping', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'paying', label: 'Choosing payment method', goal: 'Use 카드로 / 현금으로 결제하다 to choose how you pay.' },
    { id: 'asking-refund', label: 'Asking for a refund', goal: 'Use 환불받다 + V-고 싶다 to request a refund.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('가격', 'gagyeok', 'price', 'word', '가격이 어떻게 됩니까?', 'How much is the price?', null, [ACT.vocabulary]),
    createContentItem('계산', 'gyesan', 'payment / settling the bill', 'word', '계산해 주십시오.', 'Please process the payment.', null, [ACT.vocabulary]),
    createContentItem('카드', 'kadeu', 'card', 'word', '카드로 결제할게요.', 'I will pay by card.', null, [ACT.vocabulary]),
    createContentItem('현금', 'hyeongeum', 'cash', 'word', '현금만 받습니다.', 'We accept only cash.', null, [ACT.vocabulary]),
    createContentItem('영수증', 'yeongsujeung', 'receipt', 'word', '영수증을 주십시오.', 'Please give me a receipt.', null, [ACT.vocabulary]),
    createContentItem('환불', 'hwanbul', 'refund', 'word', '환불을 받고 싶습니다.', 'I would like a refund.', null, [ACT.vocabulary]),
    createContentItem('교환', 'gyohwan', 'exchange', 'word', '다른 사이즈로 교환하고 싶습니다.', 'I would like to exchange for a different size.', null, [ACT.vocabulary]),
    createContentItem('할인', 'harin', 'discount', 'word', '오늘은 할인이 있습니다.', 'There is a discount today.', null, [ACT.vocabulary]),
    createContentItem('편의점', 'pyeonuijeom', 'convenience store', 'word', '편의점에서 삽니다.', 'I buy it at the convenience store.', null, [ACT.vocabulary]),
    createContentItem('마트', 'mateu', 'mart / supermarket', 'word', '마트에 가서 장을 봅니다.', 'I go shopping at the mart.', null, [ACT.vocabulary]),
    createContentItem('생필품', 'saengpilpum', 'daily necessities', 'word', '생필품을 사야 합니다.', 'I need to buy daily necessities.', null, [ACT.vocabulary]),
    createContentItem('포장', 'pojang', 'packaging / wrapping', 'word', '포장해 주십시오.', 'Please wrap it for me.', null, [ACT.vocabulary]),

    createContentItem(
      '카드로 결제하겠습니다.', 'kadeuro gyeoljehagetseumnida.',
      'I will pay by card.', 'sentence',
      '카드로 결제하겠습니다. 영수증도 부탁합니다.',
      'I will pay by card. A receipt as well, please.',
      [
        { korean: '카드로', english: 'by card (N(으)로 means)' },
        { korean: '결제하겠습니다', english: 'will pay (formal future)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '내일 다시 올게요.', 'naeil dasi olgeyo.',
      'I will come back tomorrow.', 'sentence',
      '오늘은 시간이 없어서요. 내일 다시 올게요.',
      'I do not have time today. I will come back tomorrow.',
      [
        { korean: 'V-(으)ㄹ게요', english: 'first-person commitment "I will ~"' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '환불받을 수 있습니까?', 'hwanburadeul su itseumnikka?',
      'Can I get a refund?', 'sentence',
      '이 옷을 환불받을 수 있습니까? 영수증은 여기 있습니다.',
      'Can I get a refund for this clothing? The receipt is here.',
      [
        { korean: '환불받다', english: 'to receive a refund' },
        { korean: '~ㄹ 수 있습니까?', english: 'can I ~? (formal)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '환불 요청', 'hwanbul yocheong',
      'Asking for a refund', 'conversation',
      'A (직원): 무엇을 도와드릴까요?\nB (고객): 어제 산 셔츠인데요. 사이즈가 안 맞아서 환불받고 싶습니다.\nA: 영수증을 가지고 오셨어요?\nB: 네, 여기 있습니다.\nA: 카드로 결제하셨네요. 카드 환불해 드리겠습니다. 3-5일 정도 걸립니다.\nB: 알겠습니다. 감사합니다.',
      'A (staff): How may I help you?\nB (customer): It is a shirt I bought yesterday. The size does not fit so I would like a refund.\nA: Did you bring your receipt?\nB: Yes, here it is.\nA: I see you paid by card. I will refund to your card. It takes 3-5 days.\nB: Understood. Thank you.',
      [
        { korean: '사이즈가 안 맞다', english: 'the size does not fit' },
        { korean: '카드 환불해 드리겠습니다', english: 'I will refund to your card' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
