const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u10',
  title: 'Level 1 · Unit 10: Weer en Voorkeuren — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what you like or prefer.',
  vocabularyGoal: 'Use weather words, seasons, and preference phrases.',
  grammarGoal: 'Use `ik vind`, `ik houd van`, and `liever` for opinions and preferences.',
  speakingGoal: 'Describe today’s weather and compare two simple preferences.',
  task: 'Choose a weekend plan based on the weather.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one weather sentence.'),
    practice('stating-like', 'Stating like', 'Use `ik houd van`.'),
    practice('stating-preference', 'Stating preference', 'Use `liever`.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('het regent', 'hət RAY-ghent', '“It is raining.” Dutch uses a weather subject much like English.', 'Vandaag regent het.', '“Today it is raining.”'),
    item('het is koud', 'hət is kowt', '“It is cold.” A common weather statement.', 'In de winter is het koud.', '“In winter it is cold.”'),
    item('de zon schijnt', 'də zon skheynt', '“The sun is shining.” A useful positive weather phrase.', 'Vandaag schijnt de zon.', '“Today the sun is shining.”'),
    item('zomer / winter', 'ZOH-mer / VIN-ter', '“Summer / winter.” Useful comparison anchors.', 'Ik houd van de zomer.', '“I like summer.”'),
    item('ik houd van', 'ik howt fan', '“I like / love.” A standard preference frame.', 'Ik houd van warm weer.', '“I like warm weather.”'),
    item('ik vind ... fijn', 'ik fint ... feyn', '“I find ... nice.” A natural opinion frame.', 'Ik vind herfstweer fijn.', '“I like autumn weather.”'),
    item('liever', 'LEE-ver', '“Preferably / rather.” It often marks preference without needing a long construction.', 'Ik drink liever thee dan koffie.', '“I prefer drinking tea to coffee.”'),
    item('omdat', 'om-DAT', '“Because.” It sends the verb to the end in the subordinate clause.', 'Ik houd van de lente omdat het warm wordt.', '“I like spring because it gets warm.”'),
  ],
});
