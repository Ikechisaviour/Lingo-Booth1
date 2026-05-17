const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u8',
  title: 'Level 1 · Unit 8: Alışveriş — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop for everyday items, ask prices, compare options, and pay.',
  vocabularyGoal: 'Use price, color, size, and payment words.',
  grammarGoal: 'Use `bu/şu`, accusative-marked specific objects, and comparison with `daha`.',
  speakingGoal: 'Ask a price, request one item, and compare two options.',
  task: 'Buy one practical item in a shop or pazar.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `bu ne kadar?`.'),
    practice('choosing-item', 'Choosing item', 'Use `bunu istiyorum`.'),
    practice('comparing', 'Comparing items', 'Use `daha ucuz`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('bu ne kadar?', 'bu ne ka-DAR', '“How much is this?” A core shopping question.', 'Bu çanta ne kadar?', '“How much is this bag?”'),
    item('bunu istiyorum', 'bu-NU is-ti-YO-rum', '“I want this one.” The accusative `-u` marks a specific object.', 'Bunu istiyorum, şunu değil.', '“I want this one, not that one.”'),
    item('daha ucuz', 'da-HA u-JUZ', '“Cheaper.” `Daha` forms the comparison before the adjective.', 'Daha ucuz bir model var mı?', '“Is there a cheaper model?”'),
    item('pahalı', 'pa-ha-LI', '“Expensive.” A simple adjective often enough for polite hesitation.', 'Bu biraz pahalı.', '“This is a little expensive.”'),
    item('büyük beden', 'bü-YÜK be-DEN', '“Large size.” A practical clothing phrase.', 'Büyük beden var mı?', '“Do you have a large size?”'),
    item('kırmızı', 'kır-mı-ZI', '“Red.” Color adjectives usually come before the noun.', 'Kırmızı gömlek arıyorum.', '“I am looking for a red shirt.”'),
    item('bir kilo', 'bir ki-LO', '“One kilo.” Food shopping uses measures naturally before nouns.', 'Bir kilo elma istiyorum.', '“I want one kilo of apples.”'),
    item('nakit / kartla', 'na-KİT / kart-LA', '“Cash / by card.” `-la` marks instrument or means.', 'Kartla ödeyebilir miyim?', '“Can I pay by card?”'),
  ],
});
