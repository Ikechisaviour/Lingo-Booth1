const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u10',
  title: 'Level 1 · Unit 10: Il tempo — Weather and Preferences',
  category: 'weather',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say which season or climate you prefer.',
  vocabularyGoal: 'Use heat, cold, rain, sun, wind, and season vocabulary.',
  grammarGoal: 'Use weather expressions with `fa`, `c’è`, and preference verbs.',
  speakingGoal: 'Describe today’s weather and compare two seasons.',
  task: 'Give a short weather update and your favorite season.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use `fa` and `c’è` correctly.'),
    practice('stating-preference', 'Stating preference', 'Use `mi piace` or `preferisco`.'),
    practice('comparing-seasons', 'Comparing seasons', 'Contrast two seasons naturally.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('Che tempo fa?', 'che tempo fa?', '“What is the weather like?” The idiom uses `fare`, not “to be.”', 'Che tempo fa oggi?', '“What is the weather like today?”'),
    item('fa caldo / fa freddo', 'fa caldo / fa freddo', '“It is hot / it is cold.” Again, Italian uses `fare`.', 'Oggi fa molto caldo.', '“Today it is very hot.”'),
    item('piove', 'piove', '“It is raining.” An impersonal weather verb.', 'Oggi piove.', '“Today it is raining.”'),
    item('c’è il sole', 'c’è il sole', '“There is sun / it is sunny.”', 'Domani c’è il sole.', '“Tomorrow it is sunny.”'),
    item('vento', 'vento', '“Wind.”', 'C’è molto vento.', '“There is a lot of wind.”'),
    item('estate / inverno', 'estate / inverno', '“Summer / winter.”', 'Preferisco l’inverno all’estate.', '“I prefer winter to summer.”'),
    item('mi piace', 'mi piace', '“I like.” Literally “it pleases me,” so the thing liked controls the verb.', 'Mi piace la pioggia.', '“I like rain.”'),
    item('preferisco', 'preferisco', '“I prefer.”', 'Preferisco il tempo fresco.', '“I prefer cool weather.”'),
    item('temperatura', 'temperatura', '“Temperature.”', 'La temperatura è di trenta gradi.', '“The temperature is thirty degrees.”'),
    item('umido', 'umido', '“Humid.” A useful weather adjective in many Italian summers.', 'A Roma l’estate è calda e umida.', '“In Rome summer is hot and humid.”'),
  ],
});
