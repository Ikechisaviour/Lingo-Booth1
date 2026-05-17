const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u9',
  title: 'Level 1 · Unit 9: طلب الطعام — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely, mention preferences, and ask for small changes.',
  vocabularyGoal: 'Use menu words, drink words, and common restaurant service phrases.',
  grammarGoal: 'Use `أريد`, the accusative after direct objects, and polite requests with `من فضلك`.',
  speakingGoal: 'Place a short restaurant order and change one detail without losing politeness.',
  task: 'Roleplay ordering a meal, drink, and one modification in a restaurant.',
  expressionPractice: [
    practice('ordering-food', 'Ordering food', 'Use `أريد` with the item you want.'),
    practice('making-request', 'Making a request', 'Add `من فضلك` naturally.'),
    practice('changing-detail', 'Changing a detail', 'Ask for less salt, no sugar, or another drink.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('أريد', 'urīdu', '“I want / I would like.” In service settings it is direct but acceptable when softened by tone or `من فضلك`.', 'أريد شوربة من فضلك.', '“I would like soup, please.”'),
    item('قائمة الطعام', 'qāʾimat aṭ-ṭaʿām', '“Menu.” Literally “list of food,” using an iḍāfa-style noun chain.', 'هل عندكم قائمة الطعام؟', '“Do you have a menu?”'),
    item('ماء / شاي / قهوة', 'māʾ / shāy / qahwa', 'Water, tea, and coffee: three service words worth making automatic early.', 'أريد ماءً وشايًا.', '“I would like water and tea.”'),
    item('دجاج / سمك / أرز', 'dajāj / samak / aruzz', 'Chicken, fish, and rice: useful meal-building nouns across many Arab cuisines.', 'أريد أرزًا مع الدجاج.', '“I would like rice with chicken.”'),
    item('من فضلك', 'min faḍlik', '“Please.” The final vowel changes with the addressee in fully marked speech, but the phrase is often learned as a practical whole.', 'ماء من فضلك.', '“Water, please.”'),
    item('بدون', 'bidūn', '“Without.” Use before the ingredient you want omitted.', 'قهوة بدون سكر.', '“Coffee without sugar.”'),
    item('قليل من', 'qalīl min', '“A little of.” Useful for salt, sugar, or spice.', 'أريد قليلًا من الملح.', '“I want a little salt.”'),
    item('هل يمكن', 'hal yumkin', '“Is it possible / can one…?” A polite request frame that avoids sounding abrupt.', 'هل يمكن قليل من السكر؟', '“Could I have a little sugar?”'),
    item('الحساب', 'al-ḥisāb', '“The bill / check.” A high-frequency closing word in restaurants.', 'الحساب من فضلك.', '“The bill, please.”'),
    item('لذيذ', 'ladhīdh', '“Delicious.” Agreement matters if you describe a feminine dish noun later.', 'الطعام لذيذ جدًا.', '“The food is very delicious.”'),
  ],
});
