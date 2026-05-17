const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u8',
  title: 'Level 1 · Unit 8: வாங்குவது — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop for everyday items, ask prices, compare options, and pay.',
  vocabularyGoal: 'Use price, size, color, and payment words.',
  grammarGoal: 'Use demonstratives, object marking, and comparative forms in practical shopping talk.',
  speakingGoal: 'Ask a price, request one item, and compare two options.',
  task: 'Buy one practical item at a shop or market.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `இது எவ்வளவு?`.'),
    practice('choosing-item', 'Choosing item', 'Use `இதைக் வேண்டும்`.'),
    practice('comparing', 'Comparing items', 'Use `இதைவிட மலிவு`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('இது எவ்வளவு?', 'itu evvaḷavu', '“How much is this?” A core service question.', 'இந்த பை எவ்வளவு?', '“How much is this bag?”'),
    item('இதைக் வேண்டும்', 'itaik vēṇṭum', '“I want this.” The object marker attaches to the demonstrative.', 'இதைக் வேண்டும், அதைக் வேண்டாம்.', '“I want this, not that.”'),
    item('மலிவு', 'malivu', '“Cheap / inexpensive.” Useful in comparison talk.', 'இதைவிட மலிவு உள்ளதா?', '“Is there something cheaper than this?”'),
    item('விலை உயர்ந்தது', 'vilai uyarntatu', '“Expensive.” Literally “price-raised,” a natural descriptive phrase.', 'இந்த சட்டை விலை உயர்ந்தது.', '“This shirt is expensive.”'),
    item('பெரிய அளவு', 'periya aḷavu', '“Large size.” A practical clothing phrase.', 'பெரிய அளவு இருக்கிறதா?', '“Do you have a large size?”'),
    item('சிவப்பு', 'civappu', '“Red.” A common color adjective.', 'சிவப்பு சேலை வேண்டும்.', '“I want a red sari.”'),
    item('ஒரு கிலோ', 'oru kilō', '“One kilo.” Market shopping naturally uses measure nouns.', 'ஒரு கிலோ மாம்பழம் வேண்டும்.', '“I want one kilo of mangoes.”'),
    item('பணம் / அட்டை', 'paṇam / aṭṭai', '“Cash / card.” Useful for payment choices.', 'அட்டையால் கட்டலாமா?', '“May I pay by card?”'),
  ],
});
