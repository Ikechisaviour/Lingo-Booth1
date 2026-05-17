const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u19',
  title: 'Level 1 · Unit 19: Праздники и традиции — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major Russian holidays, family customs, and seasonal traditions.',
  vocabularyGoal: 'Use holiday, family, greeting, and celebration words.',
  grammarGoal: 'Use `обычно`, `будем`, and simple holiday descriptions.',
  speakingGoal: 'Describe one holiday, say what people usually do, and give an appropriate greeting.',
  task: 'Explain one Russian holiday to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Introduce one celebration clearly.'),
    practice('describing-custom', 'Describing custom', 'Use `обычно` plus one action.'),
    practice('giving-greeting', 'Giving greeting', 'Use the formula that fits the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('Новый год', 'novyy god', '“New Year.” In Russia this is often the biggest family holiday of the year.', 'На Новый год семьи собираются вместе.', '“At New Year families gather together.”'),
    item('Рождество', 'rozhdestvo', '“Christmas.” In Russia it is celebrated on January 7 in the Orthodox tradition.', 'Рождество отмечают седьмого января.', '“Christmas is celebrated on January seventh.”'),
    item('Масленица', 'maslenitsa', 'A pre-Lenten festival associated with pancakes, late winter, and seeing off the cold season.', 'На Масленицу едят блины.', '“At Maslenitsa people eat blini.”'),
    item('День Победы', 'den pobedy', '“Victory Day,” May 9, a major public remembrance holiday in Russia.', 'День Победы отмечают девятого мая.', '“Victory Day is celebrated on May ninth.”'),
    item('обычно', 'obychno', '“Usually.” A key word for describing customs.', 'Обычно мы украшаем ёлку дома.', '“Usually we decorate a tree at home.”'),
    item('поздравлять', 'pozdravlyat', '“To congratulate / greet for an occasion.” Russian greetings often use this verb.', 'Мы поздравляем друзей с праздником.', '“We greet friends for the holiday.”'),
    item('С Новым годом!', 's novym godom', '“Happy New Year!” Literally “with the New Year,” using instrumental.', 'С Новым годом вас!', '“Happy New Year to you!”'),
    item('традиция', 'traditsiya', '“Tradition.” A useful bridge noun for cultural explanations.', 'Это важная семейная традиция.', '“This is an important family tradition.”'),
  ],
});
