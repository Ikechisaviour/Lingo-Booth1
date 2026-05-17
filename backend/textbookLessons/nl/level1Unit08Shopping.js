const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u8',
  title: 'Level 1 · Unit 8: Winkelen — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop for everyday items, ask prices, compare options, and pay.',
  vocabularyGoal: 'Use price, size, color, and payment vocabulary.',
  grammarGoal: 'Use `de/het` awareness with demonstratives such as `deze/dit` and simple comparatives with `-er` or `meer`.',
  speakingGoal: 'Ask a price, request one item, and compare two options.',
  task: 'Buy one practical item in a winkel or market stall.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `hoeveel kost dit?`.'),
    practice('choosing-item', 'Choosing item', 'Use `deze` or `dit` correctly.'),
    practice('comparing', 'Comparing items', 'Use `goedkoper`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('hoeveel kost dit?', 'hoo-FEEL kost dit', '“How much does this cost?” A basic service question.', 'Hoeveel kost deze tas?', '“How much does this bag cost?”'),
    item('deze / dit', 'DAY-zə / dit', '“This” for `de` nouns / `het` nouns. The article class matters even when English gives no clue.', 'Ik wil deze tas en dit boek.', '“I want this bag and this book.”'),
    item('goedkoper', 'khood-KOH-per', '“Cheaper.” The common comparative adds `-er`.', 'Heeft u iets goedkoper?', '“Do you have something cheaper?”'),
    item('duur', 'dyr', '“Expensive.” A short adjective common in shopping talk.', 'Deze jas is duur.', '“This coat is expensive.”'),
    item('grote maat', 'KHROH-tə maht', '“Large size.” The adjective takes `-e` before many attributed nouns.', 'Ik zoek een grote maat.', '“I am looking for a large size.”'),
    item('rode trui', 'ROH-də troy', '“Red sweater.” Color adjectives often show the same attributive `-e`.', 'Heeft u een rode trui?', '“Do you have a red sweater?”'),
    item('een kilo', 'ən KEE-loh', '“One kilo.” Markets use measures naturally with food nouns.', 'Ik wil een kilo appels.', '“I want one kilo of apples.”'),
    item('contant / met pin', 'kon-TANT / met pin', '“Cash / by card.” `Met pin` is the everyday Dutch payment phrase.', 'Kan ik met pin betalen?', '“Can I pay by card?”'),
  ],
});
