const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u8',
  title: 'Level 1 · Unit 8: Pamimili — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Ask prices, describe items, and buy everyday goods politely.',
  vocabularyGoal: 'Use clothing, color, money, and size words.',
  grammarGoal: 'Use `Magkano ito?`, `gusto ko`, and adjective placement around nouns.',
  speakingGoal: 'Ask for one item, describe it, and confirm the price.',
  task: 'Roleplay buying clothes in a shop.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `Magkano ito?`.'),
    practice('requesting-item', 'Requesting item', 'Use `Gusto ko ng ...`.'),
    practice('describing-item', 'Describing item', 'Use descriptive words naturally.'),
  ],
  relatedPools: ['topic-shopping', 'topic-money'],
  items: [
    item('Magkano ito?', 'magkano ito?', '“How much is this?” A core shopping question.', 'Magkano ang damit na ito?', '“How much is this clothing item?”'),
    item('Gusto ko ng ...', 'gusto ko ng ...', '“I want ...” with `ng` before the object.', 'Gusto ko ng pulang bag.', '“I want a red bag.”'),
    item('damit', 'damit', '“Clothes / garment.”', 'Maganda ang damit na ito.', '“This garment is beautiful.”'),
    item('sapatos', 'sapatos', '“Shoes.”', 'Gusto ko ng itim na sapatos.', '“I want black shoes.”'),
    item('pula / asul', 'pula / asul', '“Red / blue.”', 'Pulang bag, asul na damit.', '“Red bag, blue clothing.”'),
    item('malaki / maliit', 'malaki / maliit', '“Big / small.”', 'May mas malaking sukat ba?', '“Is there a larger size?”'),
    item('mahal / mura', 'mahal / mura', '“Expensive / cheap.”', 'Mahal ito, pero mura iyon.', '“This is expensive, but that is cheap.”'),
    item('sukat', 'sukat', '“Size.”', 'Anong sukat ang gusto mo?', '“What size do you want?”'),
    item('cash / card', 'cash / card', 'Cash / card are commonly used loanwords in urban retail.', 'Magbabayad ako gamit ang card.', '“I will pay using a card.”'),
    item('Pwede kong sukatin?', 'pwede kong sukatin?', '“May I try it on?” A practical fitting-room question.', 'Pwede kong sukatin ang jacket?', '“May I try on the jacket?”'),
  ],
});
