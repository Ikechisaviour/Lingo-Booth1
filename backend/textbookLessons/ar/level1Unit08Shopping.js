const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u8',
  title: 'Level 1 · Unit 8: التسوق — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Ask prices, compare items, and buy everyday goods in Modern Standard Arabic.',
  vocabularyGoal: 'Use shopping nouns, color words, and basic money expressions that fit markets and shops.',
  grammarGoal: 'Use demonstratives, adjective agreement, and the price question `بكم هذا؟` naturally.',
  speakingGoal: 'Ask for one item, describe it, compare two choices, and confirm the price.',
  task: 'Roleplay buying clothing and one household item in a shop.',
  expressionPractice: [
    practice('asking-price', 'Asking the price', 'Use `بكم هذا؟` and understand the reply.'),
    practice('describing-item', 'Describing an item', 'Match adjectives to noun gender.'),
    practice('comparing-items', 'Comparing items', 'Use `أكبر`, `أصغر`, and `أرخص` in context.'),
  ],
  relatedPools: ['topic-shopping', 'topic-money'],
  items: [
    item('بكم هذا؟', 'bikam hādhā?', '“How much is this?” The most reusable price question for a masculine item or an item treated generically.', 'بكم هذا القميص؟', '“How much is this shirt?”'),
    item('بكم هذه؟', 'bikam hādhihi?', 'Use the feminine demonstrative when the noun is feminine, such as `الحقيبة` or `الساعة`.', 'بكم هذه الحقيبة؟', '“How much is this bag?”'),
    item('قميص', 'qamīṣ', '“Shirt.” A masculine noun, so descriptive adjectives take masculine form.', 'أريد قميصًا أزرق.', '“I want a blue shirt.”'),
    item('حقيبة', 'ḥaqība', '“Bag.” A feminine noun, which makes the adjective feminine too.', 'هذه حقيبة صغيرة.', '“This is a small bag.”'),
    item('سعر', 'siʿr', '“Price.” The phrase `ما السعر؟` is more formal than everyday `بكم؟`.', 'ما سعر هذا الكتاب؟', '“What is the price of this book?”'),
    item('غالي / رخيص', 'ghālin / rakhīṣ', '“Expensive / cheap.” Adjectives agree with the noun they describe.', 'هذا المعطف غالٍ، لكن هذا أرخص.', '“This coat is expensive, but this one is cheaper.”'),
    item('أحمر / حمراء', 'aḥmar / ḥamrāʾ', '“Red” in masculine and feminine. Colors are a useful early window into irregular adjective agreement.', 'أريد حقيبة حمراء.', '“I want a red bag.”'),
    item('كبير / صغيرة', 'kabīr / ṣaghīra', '“Big / small.” Learn the agreement pattern with concrete nouns before longer adjective chains.', 'هل عندك مقاس أكبر؟', '“Do you have a larger size?”'),
    item('نقدًا / بالبطاقة', 'naqdan / bil-biṭāqa', '“In cash / by card.” Use after payment verbs or in short service answers.', 'سأدفع بالبطاقة.', '“I will pay by card.”'),
    item('أريد أن أشتري', 'urīdu an ashtarī', '“I want to buy.” The particle `أن` introduces the following verb in a very common beginner structure.', 'أريد أن أشتري هدية.', '“I want to buy a gift.”'),
  ],
});
