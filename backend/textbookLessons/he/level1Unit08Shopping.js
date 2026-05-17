const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u8',
  title: 'Level 1 · Unit 8: קניות — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Ask prices, describe items, and buy everyday goods politely.',
  vocabularyGoal: 'Use clothing, color, money, and size words common in shops.',
  grammarGoal: 'Use `כמה זה עולה?`, adjective agreement, and `יש / אין` for availability.',
  speakingGoal: 'Ask for one item, describe it, and check whether another option exists.',
  task: 'Roleplay buying a shirt and checking for another size.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `כמה זה עולה?`.'),
    practice('checking-availability', 'Checking availability', 'Use `יש` and `אין`.'),
    practice('describing-item', 'Describing an item', 'Match adjective gender and number.'),
  ],
  relatedPools: ['topic-shopping', 'topic-money'],
  items: [
    item('כמה זה עולה?', 'kama ze oleh?', '“How much does this cost?” A fixed high-frequency shopping question.', 'כמה זה עולה בבקשה?', '“How much does this cost, please?”'),
    item('חולצה', 'khultsa', '“Shirt.” A feminine noun, so adjectives describing it take feminine form.', 'אני רוצה חולצה כחולה.', '“I want a blue shirt.”'),
    item('מכנסיים', 'mikhnasayim', '“Pants / trousers.” The word is grammatically plural.', 'יש מכנסיים שחורים?', '“Are there black pants?”'),
    item('כחול / כחולה', 'kakhol / kkhula', '“Blue” masculine / feminine. Color agreement is visible and useful early.', 'החולצה כחולה.', '“The shirt is blue.”'),
    item('גדול / גדולה', 'gadol / gdola', '“Big” masculine / feminine.', 'יש מידה גדולה יותר?', '“Is there a larger size?”'),
    item('יש / אין', 'yesh / ein', '“There is / there is not.” Essential for availability, possession, and existence.', 'יש מידה קטנה? אין צבע אדום.', '“Is there a small size? There is no red color.”'),
    item('מידה', 'mida', '“Size.” A feminine noun used in clothing talk.', 'איזו מידה אתה צריך?', '“What size do you need?”'),
    item('יקר / זול', 'yakar / zol', '“Expensive / cheap.” Useful for simple comparisons.', 'זה יקר, אבל זה זול יותר.', '“This is expensive, but this is cheaper.”'),
    item('שקל', 'shekel', '“Shekel.” The local currency word and a useful pluralization topic later.', 'זה עולה חמישים שקל.', '“It costs fifty shekels.”'),
    item('אני רוצה לקנות', 'ani rotse liknot', '“I want to buy.” The infinitive after `רוצה` carries the action.', 'אני רוצה לקנות מתנה.', '“I want to buy a gift.”'),
  ],
});
