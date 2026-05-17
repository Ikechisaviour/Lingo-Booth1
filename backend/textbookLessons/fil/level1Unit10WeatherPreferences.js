const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u10',
  title: 'Level 1 · Unit 10: Panahon — Weather and Preferences',
  category: 'weather',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say which weather or season you prefer.',
  vocabularyGoal: 'Use heat, cold, rain, wind, and season words.',
  grammarGoal: 'Use `mainit`, `umuulan`, and preference frames with `gusto ko`.',
  speakingGoal: 'Describe today’s weather and compare two kinds of weather.',
  task: 'Give a short weather update and your favorite season.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use a clear weather sentence.'),
    practice('stating-preference', 'Stating preference', 'Use `gusto ko`.'),
    practice('comparing-seasons', 'Comparing seasons', 'Contrast rainy and dry periods.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('panahon', 'panahon', '“Weather / season / time.” Context decides the sense.', 'Maganda ang panahon ngayon.', '“The weather is nice today.”'),
    item('mainit / malamig', 'mainit / malamig', '“Hot / cold.”', 'Mainit ngayon.', '“It is hot today.”'),
    item('umuulan', 'umuulan', '“It is raining.” The `um-` form presents the ongoing action.', 'Umuulan sa Maynila.', '“It is raining in Manila.”'),
    item('maaraw', 'maaraw', '“Sunny.” Built from `araw` (“sun / day”).', 'Maaraw ngayong umaga.', '“It is sunny this morning.”'),
    item('mahangin', 'mahangin', '“Windy.”', 'Mahangin sa tabing-dagat.', '“It is windy by the sea.”'),
    item('tag-init / tag-ulan', 'tag-init / tag-ulan', '“Dry / hot season” and “rainy season,” more culturally relevant than four-season vocabulary.', 'Mas gusto ko ang tag-ulan.', '“I prefer the rainy season.”'),
    item('gusto ko', 'gusto ko', '“I like / I want.” Context disambiguates preference from desire.', 'Gusto ko ang malamig na panahon.', '“I like cold weather.”'),
    item('mas gusto ko', 'mas gusto ko', '“I prefer.”', 'Mas gusto ko ang tag-ulan kaysa tag-init.', '“I prefer the rainy season to the hot season.”'),
    item('temperatura', 'temperatura', '“Temperature.”', 'Tatlumpung digri ang temperatura.', '“The temperature is thirty degrees.”'),
    item('Kumusta ang panahon?', 'kumusta ang panahon?', '“How is the weather?”', 'Kumusta ang panahon diyan?', '“How is the weather there?”'),
  ],
});
