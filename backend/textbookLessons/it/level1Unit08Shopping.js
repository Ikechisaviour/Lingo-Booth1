const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u8',
  title: 'Level 1 · Unit 8: Fare shopping — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Ask prices, describe items, and buy everyday goods politely.',
  vocabularyGoal: 'Use clothing, color, money, and size vocabulary.',
  grammarGoal: 'Use `quanto costa`, articles, and adjective agreement.',
  speakingGoal: 'Ask for an item, describe it, and confirm the price.',
  task: 'Roleplay buying clothes in a shop.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `Quanto costa?`.'),
    practice('requesting-item', 'Requesting item', 'Use `Vorrei ...`.'),
    practice('describing-item', 'Describing item', 'Match adjective gender and number.'),
  ],
  relatedPools: ['topic-shopping', 'topic-money'],
  items: [
    item('Quanto costa?', 'quanto costa?', '“How much does it cost?” A core shopping question.', 'Quanto costa questa camicia?', '“How much does this shirt cost?”'),
    item('Vorrei', 'vorrei', '“I would like.” The polite conditional form is softer than bare `voglio`.', 'Vorrei una giacca blu.', '“I would like a blue jacket.”'),
    item('camicia', 'camicia', '“Shirt.” Feminine.', 'La camicia è bianca.', '“The shirt is white.”'),
    item('scarpe', 'scarpe', '“Shoes.” Usually plural in everyday use.', 'Vorrei delle scarpe nere.', '“I would like black shoes.”'),
    item('blu / rossa', 'blu / rossa', '“Blue / red.” Some color adjectives do not change, while others agree.', 'Una borsa rossa, una giacca blu.', '“A red bag, a blue jacket.”'),
    item('grande / piccola', 'grande / piccola', '“Big / small.” Agreement appears when the adjective changes form.', 'Avete una taglia più grande?', '“Do you have a larger size?”'),
    item('caro / economico', 'caro / economico', '“Expensive / inexpensive.”', 'Questo è caro, quello è più economico.', '“This is expensive, that one is cheaper.”'),
    item('taglia', 'taglia', '“Size” for clothes.', 'Che taglia porta?', '“What size do you wear?”'),
    item('contanti / carta', 'contanti / carta', '“Cash / card.”', 'Pago con carta.', '“I pay by card.”'),
    item('posso provare?', 'posso provare?', '“May I try it on?” A practical fitting-room question.', 'Posso provare questa giacca?', '“May I try on this jacket?”'),
  ],
});
