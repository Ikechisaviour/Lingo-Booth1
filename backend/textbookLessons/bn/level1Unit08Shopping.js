const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u8',
  title: 'Level 1 · Unit 8: কেনাকাটা — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop for everyday items, ask prices, compare options, and pay.',
  vocabularyGoal: 'Use price, color, size, and payment words.',
  grammarGoal: 'Use demonstratives, classifiers, and comparison words in practical shopping talk.',
  speakingGoal: 'Ask a price, request one item, and compare two options.',
  task: 'Buy one practical item in a shop or market.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `এটার দাম কত?`.'),
    practice('choosing-item', 'Choosing item', 'Use one classifier phrase.'),
    practice('comparing', 'Comparing items', 'Use `আরও সস্তা`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('এটার দাম কত?', 'etar dam koto', '“How much is this?” The classifier-like form keeps the item specific.', 'এই ব্যাগটার দাম কত?', '“How much is this bag?”'),
    item('এটা চাই', 'eta chai', '“I want this.” A concise shopping phrase.', 'এটা চাই, ওটা না।', '“I want this, not that.”'),
    item('আরও সস্তা', 'aro shosta', '“Cheaper / more cheap.” A practical comparison phrase.', 'আরও সস্তা কিছু আছে?', '“Is there anything cheaper?”'),
    item('দামী', 'dami', '“Expensive.” A useful descriptive adjective.', 'এই জামাটা দামী।', '“This shirt is expensive.”'),
    item('বড় সাইজ', 'boro size', '“Large size.” A practical clothing phrase.', 'বড় সাইজ আছে?', '“Do you have a large size?”'),
    item('লাল', 'lal', '“Red.” Color words are straightforward but high-frequency.', 'লাল শাড়ি চাই।', '“I want a red sari.”'),
    item('এক কেজি', 'ek keji', '“One kilogram.” Food shopping naturally uses measure words.', 'এক কেজি আম চাই।', '“I want one kilo of mangoes.”'),
    item('নগদ / কার্ডে', 'nogod / card-e', '“Cash / by card.” Useful payment choices.', 'কার্ডে দিতে পারি?', '“Can I pay by card?”'),
  ],
});
