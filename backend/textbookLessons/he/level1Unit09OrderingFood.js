const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u9',
  title: 'Level 1 · Unit 9: מזמינים אוכל — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks, ask for changes, and close the meal politely.',
  vocabularyGoal: 'Use restaurant, dish, drink, and taste vocabulary.',
  grammarGoal: 'Use `אני רוצה`, infinitives, and polite service requests with `אפשר`.',
  speakingGoal: 'Place a short order and change one ingredient.',
  task: 'Roleplay ordering lunch in a café.',
  expressionPractice: [
    practice('ordering-food', 'Ordering food', 'Use `אני רוצה` naturally.'),
    practice('requesting-change', 'Requesting a change', 'Use `אפשר בלי ...?`.'),
    practice('asking-bill', 'Asking for the bill', 'Close the meal politely.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('אני רוצה', 'ani rotse / rotsa', '“I want.” The adjective-like present form changes with speaker gender.', 'אני רוצה סלט.', '“I want a salad.”'),
    item('אפשר', 'efshar', '“Is it possible / may I?” A very common polite request opener.', 'אפשר קפה בלי סוכר?', '“Can I have coffee without sugar?”'),
    item('בלי', 'bli', '“Without.” Use it directly before the ingredient you want removed.', 'אני רוצה שקשוקה בלי בצל.', '“I want shakshuka without onion.”'),
    item('עם', 'im', '“With.” A tiny word that does a lot of work in food orders.', 'תה עם נענע.', '“Tea with mint.”'),
    item('מים / קפה / תה', 'mayim / kafe / te', 'Water, coffee, and tea: basic beverage words worth making automatic.', 'אני רוצה מים וקפה.', '“I want water and coffee.”'),
    item('סלט / מרק / לחם', 'salat / marak / lekhem', 'Salad, soup, and bread: practical meal-building nouns.', 'אפשר מרק ולחם?', '“May I have soup and bread?”'),
    item('טעים', 'ta’im', '“Tasty / delicious.” The feminine form is `טעימה` if the noun requires it.', 'המרק טעים מאוד.', '“The soup is very tasty.”'),
    item('חריף', 'kharif', '“Spicy.” Useful for preference and warning.', 'זה חריף מדי בשבילי.', '“This is too spicy for me.”'),
    item('החשבון', 'ha-kheshbon', '“The bill / check.” Definite article included in the everyday phrase.', 'אפשר את החשבון?', '“May I have the bill?”'),
    item('לקחת או לשבת?', 'lakakhat o lashevet?', '“To take away or to sit?” A café-style service question.', 'אני רוצה לקחת.', '“I want takeaway.”'),
  ],
});
