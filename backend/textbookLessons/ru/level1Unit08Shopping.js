const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u8',
  title: 'Level 1 · Unit 8: Покупки — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop for everyday items, ask prices, compare options, and pay.',
  vocabularyGoal: 'Use price, size, color, and payment vocabulary.',
  grammarGoal: 'Use `сколько стоит`, adjective agreement, and basic number-plus-noun patterns.',
  speakingGoal: 'Ask a price, request one item, and compare two options.',
  task: 'Buy one practical item in a shop.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `сколько стоит?`.'),
    practice('choosing-item', 'Choosing item', 'Use `этот/эта` with agreement.'),
    practice('comparing', 'Comparing items', 'Use `дешевле` or `больше`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('сколько стоит?', 'skolko stoit', '“How much does it cost?” The verb agrees with the thing being priced.', 'Сколько стоит эта сумка?', '“How much does this bag cost?”'),
    item('этот / эта', 'etot / eta', '“This” masculine / feminine. Demonstratives agree with the noun’s gender.', 'Я хочу эту книгу и этот шарф.', '“I want this book and this scarf.”'),
    item('дешевле', 'deshevle', '“Cheaper.” A compact comparative used constantly in shopping.', 'Есть что-нибудь дешевле?', '“Is there anything cheaper?”'),
    item('дорогой / дорогая', 'dorogoy / dorogaya', '“Expensive” masculine / feminine. Adjectives visibly agree with nouns.', 'Эта куртка дорогая.', '“This jacket is expensive.”'),
    item('большой размер', 'bolshoy razmer', '“Large size.” `Размер` is masculine, so the adjective follows that agreement.', 'Мне нужен большой размер.', '“I need a large size.”'),
    item('красный цвет', 'krasnyy tsvet', '“Red color.” Colors behave like adjectives and agree when attached to nouns.', 'У вас есть красная рубашка?', '“Do you have a red shirt?”'),
    item('один килограмм', 'odin kilogramm', '“One kilogram.” Numbers begin the quantity phrase and later numbers change noun forms.', 'Мне нужен один килограмм яблок.', '“I need one kilogram of apples.”'),
    item('наличными / картой', 'nalichnymi / kartoy', '“In cash / by card.” The instrumental case marks the means of payment.', 'Можно оплатить картой?', '“Can I pay by card?”'),
  ],
});
