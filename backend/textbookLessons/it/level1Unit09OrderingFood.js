const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u9',
  title: 'Level 1 · Unit 9: Ordinare al ristorante — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks, ask for small changes, and close the meal politely.',
  vocabularyGoal: 'Use menu, dish, drink, and taste vocabulary.',
  grammarGoal: 'Use `vorrei`, partitives, and polite service phrases.',
  speakingGoal: 'Place a short order and change one detail.',
  task: 'Roleplay ordering lunch in a trattoria.',
  expressionPractice: [
    practice('ordering-food', 'Ordering food', 'Use `Vorrei ...`.'),
    practice('changing-detail', 'Changing detail', 'Use `senza` and `con poco`.'),
    practice('asking-bill', 'Asking bill', 'Close the meal naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('Vorrei', 'vorrei', '“I would like.” The standard polite ordering opener.', 'Vorrei una pasta al pomodoro.', '“I would like a tomato pasta.”'),
    item('menu', 'menu', '“Menu.” Italian uses the same form without an accent in ordinary writing.', 'Posso vedere il menu?', '“May I see the menu?”'),
    item('acqua / caffè / tè', 'acqua / caffè / tè', 'Water, coffee, and tea: essential drink words.', 'Vorrei acqua e caffè.', '“I would like water and coffee.”'),
    item('pasta / zuppa / pane', 'pasta / zuppa / pane', 'Pasta, soup, and bread: useful meal-building nouns.', 'Vorrei della zuppa con pane.', '“I would like some soup with bread.”'),
    item('senza', 'senza', '“Without.” Use before the ingredient you want omitted.', 'Una pizza senza olive.', '“A pizza without olives.”'),
    item('poco sale', 'poco sale', '“Little salt.” Useful for simple modifications.', 'Con poco sale, per favore.', '“With little salt, please.”'),
    item('piccante', 'piccante', '“Spicy.”', 'È troppo piccante per me.', '“It is too spicy for me.”'),
    item('buono / buona', 'buono / buona', '“Good / tasty.” Agreement matters with the noun.', 'La minestra è buona.', '“The soup is good.”'),
    item('il conto', 'il conto', '“The bill / check.”', 'Il conto, per favore.', '“The bill, please.”'),
    item('da portare via', 'da portare via', '“To take away.”', 'Vorrei un panino da portare via.', '“I would like a sandwich to take away.”'),
  ],
});
