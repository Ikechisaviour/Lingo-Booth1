const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u7',
  title: 'Level 1 · Unit 7: Куда вы идёте? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say where you are, where you are going, and ask for basic directions.',
  vocabularyGoal: 'Use destinations, route words, and direction phrases.',
  grammarGoal: 'Keep `где?` location separate from `куда?` destination with `в/на` plus different case forms.',
  speakingGoal: 'Say where you are, ask how to get somewhere, and give one short route.',
  task: 'Guide a visitor from the metro to the library.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use a location form after `где?`.'),
    practice('stating-destination', 'Stating destination', 'Use a destination form after `куда?`.'),
    practice('asking-route', 'Asking route', 'Use `как пройти к ...?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('я в университете', 'ya v universitete', '“I am at the university.” The location answer uses the prepositional case.', 'Сейчас я в университете.', '“Right now I am at the university.”'),
    item('я иду в библиотеку', 'ya idu v biblioteku', '“I am going to the library.” Movement toward a destination uses the accusative.', 'После пары я иду в библиотеку.', '“After class I am going to the library.”'),
    item('от дома', 'ot doma', '“From home.” Origin often uses genitive forms after prepositions such as `от` or `из`.', 'Я иду от дома к метро.', '“I am walking from home to the metro.”'),
    item('поверните налево', 'povernite nalevo', '“Turn left.” A useful polite imperative for directions.', 'У банка поверните налево.', '“At the bank, turn left.”'),
    item('идите прямо', 'idite pryamo', '“Go straight.” A standard route instruction.', 'Идите прямо до светофора.', '“Go straight until the traffic light.”'),
    item('близко / далеко', 'blizko / daleko', '“Near / far.” These adverbs answer many location questions directly.', 'Метро близко, не далеко.', '“The metro is near, not far.”'),
    item('как пройти к ...?', 'kak proyti k', '“How do I get to ...?” Literally “how to walk to,” useful for street directions.', 'Как пройти к аптеке?', '“How do I get to the pharmacy?”'),
    item('рядом с', 'ryadom s', '“Next to.” It takes the instrumental case, so the following noun changes form.', 'Кафе рядом с музеем.', '“The cafe is next to the museum.”'),
  ],
});
