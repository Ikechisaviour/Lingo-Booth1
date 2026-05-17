const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u10',
  title: 'Level 1 · Unit 10: מזג האוויר — Weather and Preferences',
  category: 'weather',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what kind of weather or season you prefer.',
  vocabularyGoal: 'Use heat, cold, rain, wind, and season vocabulary.',
  grammarGoal: 'Use nominal weather sentences and preference verbs such as `אוהב` and `מעדיף`.',
  speakingGoal: 'Describe today’s weather and compare two seasons.',
  task: 'Give a brief weather report and your favorite season.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use concise weather sentences.'),
    practice('stating-preference', 'Stating preference', 'Use `אוהב` or `מעדיף`.'),
    practice('comparing-seasons', 'Comparing seasons', 'Contrast two kinds of weather.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('מזג האוויר', 'mezeg ha-avir', '“Weather.” Literally “state of the air,” a fixed expression.', 'מזג האוויר יפה היום.', '“The weather is nice today.”'),
    item('חם / קר', 'kham / kar', '“Hot / cold.” Short, common weather adjectives.', 'היום חם מאוד.', '“Today is very hot.”'),
    item('גשם', 'geshem', '“Rain.” One of the most frequent weather nouns.', 'יש גשם בחורף.', '“There is rain in winter.”'),
    item('שמש', 'shemesh', '“Sun.” Useful in both weather and ordinary noun practice.', 'יש שמש בבוקר.', '“There is sun in the morning.”'),
    item('רוח', 'ruakh', '“Wind.” Feminine in Hebrew despite no obvious ending cue.', 'יש רוח חזקה.', '“There is strong wind.”'),
    item('קיץ / חורף', 'kayits / khoref', '“Summer / winter.” A useful seasonal contrast.', 'אני מעדיף חורף.', '“I prefer winter.”'),
    item('אוהב / אוהבת', 'ohev / ohevet', '“Likes” masculine / feminine present form.', 'אני אוהבת גשם.', '“I like rain.”'),
    item('מעדיף / מעדיפה', 'ma’adif / ma’adifa', '“Prefers” masculine / feminine present form.', 'אני מעדיף מזג אוויר קר.', '“I prefer cold weather.”'),
    item('לחות', 'lakhut', '“Humidity.” A culturally relevant weather word in coastal Israel.', 'בתל אביב יש לחות גבוהה בקיץ.', '“Tel Aviv has high humidity in summer.”'),
    item('מה מזג האוויר היום?', 'ma mezeg ha-avir hayom?', '“What is the weather today?” A full, reusable question.', 'מה מזג האוויר בירושלים?', '“What is the weather in Jerusalem?”'),
  ],
});
