// Level 2 Track-Adult Unit 12 — 함께 살 집이 필요합니다 (Housing search)
// Source: Book 2A·12. Functions: finding housing, apartment terms, lease basics.

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
  vocabulary: 'l2au12-vocabulary',
  grammar: 'l2au12-grammar',
  speaking: 'l2au12-speaking',
  appendix: 'l2au12-appendix',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Housing types and rooms',
    goals: ['Use 원룸, 투룸, 보증금, 월세, 전세.'],
    task: 'Describe the kind of housing you would like in two sentences.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'V-(으)ㄹ + N + 필요하다 + N(이)나 N',
    goals: ['Use V-(으)ㄹ + N for a noun-modifying clause.', 'Use N(이)나 N to offer alternatives.'],
    task: 'Describe two housing options using V-(으)ㄹ + N.' },
  { id: ACT.speaking, section: 'Speaking', title: 'Talking to a real-estate agent',
    goals: ['Ask about rent, deposit, and contracts.'],
    task: 'Roleplay visiting a real-estate office to find a one-room near Kumoh National Institute of Technology.' },
  { id: ACT.appendix, section: 'Appendix', title: 'Forms and contracts (부록)',
    goals: ['Recognize key fields on 통합신고서 and 부동산 임대차계약서.'],
    task: 'Identify the rent, deposit, and contract length on a sample lease.' },
];

const lesson = {
  title: '레벨 2 (직장) · 12과: 함께 살 집이 필요합니다 (Housing Search)',
  category: 'shopping', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'asking-rent', label: 'Asking about rent and deposit', goal: 'Use 월세 / 보증금 / 전세 to ask about housing terms.' },
    { id: 'reading-contract', label: 'Reading a lease', goal: 'Locate rent, deposit, and length-of-contract fields on a 임대차계약서.' },
  ],
  relatedPools: [],
  content: [
    createContentItem('집', 'jip', 'house / home', 'word', '새 집을 찾고 있습니다.', 'I am looking for a new place.', null, [ACT.vocabulary]),
    createContentItem('아파트', 'apateu', 'apartment', 'word', '아파트에 살고 싶습니다.', 'I want to live in an apartment.', null, [ACT.vocabulary]),
    createContentItem('원룸', 'wonrum', 'studio / one-room', 'word', '원룸을 알아보고 있습니다.', 'I am checking out studio apartments.', null, [ACT.vocabulary]),
    createContentItem('투룸', 'turum', 'two-room (1 bed + 1 living)', 'word', '투룸도 괜찮습니다.', 'A two-room would also be fine.', null, [ACT.vocabulary]),
    createContentItem('월세', 'wolse', 'monthly rent', 'word', '월세가 50만 원입니다.', 'The monthly rent is 500,000 won.', null, [ACT.vocabulary]),
    createContentItem('전세', 'jeonse', 'jeonse (lump-sum lease)', 'word', '전세는 보증금이 큽니다.', 'Jeonse requires a large deposit.', null, [ACT.vocabulary]),
    createContentItem('보증금', 'bojeunggeum', 'deposit', 'word', '보증금은 1,000만 원입니다.', 'The deposit is 10,000,000 won.', null, [ACT.vocabulary]),
    createContentItem('관리비', 'gwallibi', 'maintenance fee', 'word', '관리비는 별도입니다.', 'Maintenance fee is separate.', null, [ACT.vocabulary]),
    createContentItem('계약', 'gyeyak', 'contract', 'word', '계약 전에 잘 확인하십시오.', 'Check carefully before signing.', null, [ACT.vocabulary]),
    createContentItem('부동산', 'budongsan', 'real estate (office)', 'word', '부동산에 가서 알아봅시다.', 'Let us go to the real-estate office.', null, [ACT.vocabulary]),
    createContentItem('이사하다', 'isahada', 'to move (homes)', 'word', '다음 주에 이사합니다.', 'I move next week.', null, [ACT.vocabulary]),
    createContentItem('통합신고서', 'tonghapsingoseo', 'integrated foreign-resident report form', 'word', '통합신고서를 작성하십시오.', 'Please fill out the integrated report.', null, [ACT.vocabulary, ACT.appendix]),
    createContentItem('임대차계약서', 'imdaechagyeyakseo', 'lease contract', 'word', '임대차계약서를 잘 읽으십시오.', 'Read the lease contract carefully.', null, [ACT.vocabulary, ACT.appendix]),

    createContentItem(
      '함께 살 집이 필요합니다.', 'hamkke sal jibi piryohamnida.',
      'I need a place to live in together.', 'sentence',
      '룸메이트하고 함께 살 집이 필요합니다. 투룸을 찾고 있습니다.',
      'I need a place to live in with a roommate. I am looking for a two-room.',
      [
        { korean: 'V-(으)ㄹ + N', english: 'noun-modifying clause "a place to live"' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '월세나 전세나 어떤 게 좋습니까?', 'wolsena jeonsena eotteon ge joseumnikka?',
      'Which is better, monthly rent or jeonse?', 'sentence',
      '월세나 전세나 어떤 게 좋습니까? — 보증금이 적은 월세가 좋겠습니다.',
      'Which is better, monthly rent or jeonse? — Monthly rent with a small deposit would be good.',
      [
        { korean: 'N(이)나 N', english: 'N or N (alternatives)' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '보증금과 월세 조건이 어떻게 됩니까?', 'bojeunggeumgwa wolse jogeoni eotteoke doemnikka?',
      'What are the conditions for deposit and rent?', 'sentence',
      '보증금과 월세 조건이 어떻게 됩니까? — 보증금 500만, 월세 40만 원입니다.',
      'What are the conditions for deposit and rent? — Deposit 5 million, rent 400,000 won.',
      [
        { korean: '~ 조건이 어떻게 됩니까?', english: 'what are the ~ conditions?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '부동산에서', 'budongsaneseo',
      'At the real-estate office', 'conversation',
      'A (사라): 안녕하세요. 원룸을 좀 알아보고 싶습니다.\nB (중개사): 어느 동네를 원하시나요?\nA: 금오공과대학교 근처면 좋습니다. 회사 셔틀을 타고 다닐 거예요.\nB: 보증금과 월세 예산은 어느 정도이십니까?\nA: 보증금은 500만 원, 월세는 40만 원 정도입니다.\nB: 그 조건에 맞는 원룸이 두 개 있습니다. 같이 보러 가실까요?\nA: 네, 좋습니다. 그런데 계약 기간은 보통 어떻게 됩니까?\nB: 보통 1년이나 2년입니다. 임대차계약서를 잘 읽고 사인하시면 됩니다.',
      'A (Sarah): Hello. I would like to look at studio apartments.\nB (agent): Which neighborhood do you want?\nA: Somewhere near Kumoh National Institute of Technology would be good. I will commute by company shuttle.\nB: What is your budget for deposit and rent?\nA: Deposit around 5 million won, rent around 400,000 won.\nB: I have two studios that match. Shall we go see them?\nA: Yes, sounds good. By the way, what is the typical contract length?\nB: Usually 1 or 2 years. Read the lease contract carefully and sign it.',
      [
        { korean: '동네', english: 'neighborhood' },
        { korean: '예산', english: 'budget' },
        { korean: '계약 기간', english: 'contract length' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
