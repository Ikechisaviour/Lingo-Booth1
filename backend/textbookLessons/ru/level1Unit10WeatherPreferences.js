const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u10',
  title: 'Level 1 · Unit 10: Погода и предпочтения — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say what you like or prefer.',
  vocabularyGoal: 'Use weather words, seasons, and preference language.',
  grammarGoal: 'Use impersonal weather expressions and `мне нравится` with singular or plural things.',
  speakingGoal: 'Describe today’s weather and compare two simple preferences.',
  task: 'Choose a weekend plan based on the weather.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one impersonal weather phrase.'),
    practice('stating-like', 'Stating like', 'Use `мне нравится` correctly.'),
    practice('stating-preference', 'Stating preference', 'Use `я больше люблю`.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('сегодня холодно', 'segodnya kholodno', '“Today it is cold.” Russian weather often uses impersonal adverbs, not a dummy subject.', 'Сегодня очень холодно.', '“Today it is very cold.”'),
    item('идёт дождь', 'idyot dozhd', '“It is raining.” Literally “rain is going.”', 'Сейчас идёт дождь.', '“It is raining now.”'),
    item('снег', 'sneg', '“Snow.” It is central in Russian weather talk and has final devoicing in pronunciation.', 'Зимой часто идёт снег.', '“In winter it often snows.”'),
    item('лето / зима', 'leto / zima', '“Summer / winter.” Seasons are common comparison anchors.', 'Я люблю лето, но не люблю зиму.', '“I like summer, but I do not like winter.”'),
    item('мне нравится', 'mne nravitsya', '“I like.” The thing liked is the grammatical subject, so singular/plural matters.', 'Мне нравится тёплая погода.', '“I like warm weather.”'),
    item('мне нравятся', 'mne nravyatsya', 'Plural “I like.” Use it when the thing liked is plural.', 'Мне нравятся длинные вечера летом.', '“I like long summer evenings.”'),
    item('я больше люблю', 'ya bolshe lyublyu', '“I prefer / I like more.” A direct comparison frame.', 'Я больше люблю весну, чем осень.', '“I prefer spring to autumn.”'),
    item('потому что', 'potomu chto', '“Because.” It turns a preference into a fuller answer.', 'Я люблю весну, потому что тепло.', '“I like spring because it is warm.”'),
  ],
});
