const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u10',
  title: 'Level 1 · Unit 10: Clima e Preferências — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what you like or prefer.',
  vocabularyGoal: 'Use weather nouns, season words, and preference phrases.',
  grammarGoal: 'Use `gostar de` and `preferir` with the prepositions Portuguese requires.',
  speakingGoal: 'Describe today’s weather and compare two preferences.',
  task: 'Choose a weekend plan based on the weather.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one weather expression naturally.'),
    practice('stating-like', 'Stating like', 'Keep the `de` in `gostar de`.'),
    practice('stating-preference', 'Stating preference', 'Use `prefiro X a Y`.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('está calor', 'esh-TA ka-LOR', '“It is hot.” Portuguese often uses `estar` plus the noun-like weather word `calor`.', 'Hoje está muito calor.', '“Today it is very hot.”'),
    item('está frio', 'esh-TA FREE-oo', '“It is cold.” A basic weather frame with `estar`.', 'De manhã está frio.', '“In the morning it is cold.”'),
    item('está chovendo', 'esh-TA shoh-VEN-doo', 'Brazilian Portuguese “it is raining,” using `estar + gerund`.', 'Está chovendo desde cedo.', '“It has been raining since early.”'),
    item('faz sol', 'faz sol', '“It is sunny.” Portuguese often uses `fazer` for weather.', 'No verão faz muito sol.', '“In summer it is very sunny.”'),
    item('gosto de', 'GOS-too djee', '“I like.” The preposition `de` is required before nouns and verbs.', 'Gosto de dias frios.', '“I like cold days.”'),
    item('não gosto de', 'nao GOS-too djee', '“I do not like.” The `de` remains even in the negative.', 'Não gosto de chuva forte.', '“I do not like heavy rain.”'),
    item('prefiro', 'preh-FEE-roo', '“I prefer.” It often takes a direct object and then `a` before the comparison.', 'Prefiro praia a montanha.', '“I prefer beach to mountain.”'),
    item('verão', 'veh-RAO', '“Summer.” The nasal ending is important and highly recurrent.', 'No verão, as praias ficam cheias.', '“In summer, the beaches get crowded.”'),
    item('inverno', 'een-VER-noo', '“Winter.” This becomes especially useful when comparing Brazil and Portugal.', 'O inverno em Portugal é mais frio.', '“Winter in Portugal is colder.”'),
    item('porque', 'por-KEE', '“Because.” A preference sounds more real when the learner can give a reason.', 'Gosto do outono porque o clima é agradável.', '“I like autumn because the weather is pleasant.”'),
  ],
});
