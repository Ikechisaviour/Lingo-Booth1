// Level 2 Track-Adult Unit 3 — 돼지고기를 안 먹습니다 (Food preferences/restrictions)
// Source: Book 2A·3. Functions: stating dietary needs, allergies, religious restrictions.

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
  vocabulary: 'l2au3-vocabulary',
  grammar: 'l2au3-grammar',
  speaking: 'l2au3-speaking',
};

const activities = [
  { id: ACT.vocabulary, section: 'Vocabulary', title: 'Foods, ingredients, dietary words',
    goals: ['Name common Korean dishes.', 'Use 알레르기, 채식, 종교.'],
    task: 'List foods you can and cannot eat.' },
  { id: ACT.grammar, section: 'Grammar and Expression', title: 'V-아/어요 + 안 + V-(으)면 안 되다',
    goals: ['Negate eating with 안.', 'Use V-(으)면 안 되다 to indicate something you must not eat.'],
    task: 'Make two sentences using 안 + V and one with V-(으)면 안 되다.' },
  { id: ACT.speaking, section: 'Speaking', title: 'At the company cafeteria',
    goals: ['Tell coworkers what you cannot eat.', 'Ask if a dish contains a particular ingredient.'],
    task: 'Roleplay choosing a dish at the company cafeteria.' },
];

const lesson = {
  title: '레벨 2 (직장) · 3과: 돼지고기를 안 먹습니다 (Food Preferences and Restrictions)',
  category: 'food', difficulty: 'intermediate',
  targetLang: 'ko', nativeLang: 'en',
  track: 'textbook', lessonType: 'workplace',
  activities,
  expressionPractice: [
    { id: 'stating-diet', label: 'Stating dietary restrictions', goal: 'Use 안 + V or V-(으)면 안 되다 to explain what you cannot eat.' },
    { id: 'asking-ingredient', label: 'Asking about ingredients', goal: 'Use ~이/가 들어 있어요? to check whether an ingredient is in a dish.' },
  ],
  relatedPools: ['topic-food'],
  content: [
    createContentItem('돼지고기', 'dwaejigogi', 'pork', 'word', '저는 돼지고기를 안 먹습니다.', 'I do not eat pork.', null, [ACT.vocabulary]),
    createContentItem('소고기', 'sogogi', 'beef', 'word', '소고기는 비싸요.', 'Beef is expensive.', null, [ACT.vocabulary]),
    createContentItem('닭고기', 'dakgogi', 'chicken (meat)', 'word', '닭고기는 자주 먹습니다.', 'I often eat chicken.', null, [ACT.vocabulary]),
    createContentItem('생선', 'saengseon', 'fish', 'word', '생선을 좋아합니다.', 'I like fish.', null, [ACT.vocabulary]),
    createContentItem('해산물', 'haesanmul', 'seafood', 'word', '해산물 알레르기가 있어요.', 'I have a seafood allergy.', null, [ACT.vocabulary]),
    createContentItem('알레르기', 'allereugi', 'allergy', 'word', '땅콩 알레르기가 있습니다.', 'I have a peanut allergy.', null, [ACT.vocabulary]),
    createContentItem('채식', 'chaesik', 'vegetarian diet', 'word', '저는 채식주의자입니다.', 'I am a vegetarian.', null, [ACT.vocabulary]),
    createContentItem('종교', 'jonggyo', 'religion', 'word', '종교 때문에 먹지 못합니다.', 'I cannot eat (it) because of religion.', null, [ACT.vocabulary]),
    createContentItem('맵다', 'maepda', 'to be spicy', 'word', '한국 음식은 좀 매워요.', 'Korean food is a bit spicy.', null, [ACT.vocabulary]),
    createContentItem('짜다', 'jjada', 'to be salty', 'word', '국이 좀 짜요.', 'The soup is a bit salty.', null, [ACT.vocabulary]),
    createContentItem('들어 있다', 'deureo itda', 'to be in / contain', 'word', '여기에 마늘이 들어 있어요?', 'Is there garlic in this?', null, [ACT.vocabulary]),
    createContentItem('빼다', 'ppaeda', 'to remove / take out', 'word', '고추를 빼 주세요.', 'Please leave out the chili pepper.', null, [ACT.vocabulary]),

    createContentItem(
      '저는 돼지고기를 안 먹습니다.', 'jeoneun dwaejigogireul an meokseumnida.',
      'I do not eat pork.', 'sentence',
      '저는 돼지고기를 안 먹습니다. 종교 때문입니다.',
      'I do not eat pork. It is for religious reasons.',
      [
        { korean: '안 먹습니다', english: 'do not eat (formal negation)' },
      ],
      [ACT.grammar, ACT.speaking],
    ),
    createContentItem(
      '땅콩이 들어 있으면 안 됩니다.', 'ttangkongi deureo isseumyeon an doemnida.',
      'Peanuts must not be included.', 'sentence',
      '저는 땅콩 알레르기가 있어서 땅콩이 들어 있으면 안 됩니다.',
      'I have a peanut allergy, so peanuts must not be included.',
      [
        { korean: '~으면 안 됩니다', english: 'must not / not allowed' },
      ],
      [ACT.grammar],
    ),
    createContentItem(
      '여기에 마늘이 들어 있어요?', 'yeogie maneuri deureo isseoyo?',
      'Is there garlic in this?', 'sentence',
      '여기에 마늘이 들어 있어요? — 네, 조금 들어 있습니다.',
      'Is there garlic in this? — Yes, a little.',
      [
        { korean: '~이/가 들어 있어요?', english: 'is ~ in it?' },
      ],
      [ACT.grammar, ACT.speaking],
    ),

    createContentItem(
      '회사 식당에서', 'hoesa sikdangeseo',
      'At the company cafeteria', 'conversation',
      'A (직원): 점심 메뉴는 김치찌개와 제육볶음입니다.\nB (사라): 죄송합니다. 저는 돼지고기를 안 먹습니다. 다른 메뉴가 있습니까?\nA: 두부조림과 야채 비빔밥이 있습니다. 비빔밥에 고추장이 들어 있는데 맵습니다. 괜찮으십니까?\nB: 매운 거 잘 먹습니다. 비빔밥으로 부탁합니다. 마늘은 빼 주실 수 있습니까?\nA: 알겠습니다.',
      'A (staff): Today\'s menu is kimchi stew and stir-fried pork.\nB (Sarah): Sorry. I do not eat pork. Is there another option?\nA: There is braised tofu and vegetable bibimbap. The bibimbap has gochujang and is spicy. Is that okay?\nB: I eat spicy food well. Bibimbap please. Could you leave out the garlic?\nA: Understood.',
      [
        { korean: '제육볶음', english: 'stir-fried pork' },
        { korean: '두부조림', english: 'braised tofu' },
        { korean: '~로 부탁합니다', english: 'I request / I will have ~' },
      ],
      [ACT.speaking],
    ),
  ],
};

module.exports = lesson;
