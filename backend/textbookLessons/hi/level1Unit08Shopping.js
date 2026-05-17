const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u8',
  title: 'Level 1 · Unit 8: खरीदारी — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Ask prices, describe items, and buy everyday goods politely.',
  vocabularyGoal: 'Use clothing, color, money, and size words in ordinary shopping.',
  grammarGoal: 'Use `यह कितना है?`, adjective agreement, and `मुझे ... चाहिए` for polite wants.',
  speakingGoal: 'Ask for one item, describe it, and confirm the price.',
  task: 'Roleplay buying clothes in a shop.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `यह कितना है?`.'),
    practice('requesting-item', 'Requesting item', 'Use `मुझे ... चाहिए`.'),
    practice('describing-item', 'Describing item', 'Match adjective form to the noun.'),
  ],
  relatedPools: ['topic-shopping', 'topic-money'],
  items: [
    item('यह कितना है?', 'yah kitnā hai?', '“How much is this?” A compact everyday shopping question.', 'यह शर्ट कितनी है?', '“How much is this shirt?”'),
    item('मुझे ... चाहिए', 'mujhe ... chāhiye', '“I need / would like ...” A very natural polite request frame.', 'मुझे नीली कमीज़ चाहिए।', '“I would like a blue shirt.”'),
    item('कमीज़', 'kamīz', '“Shirt.” Feminine in Hindi, so many agreeing adjectives take feminine form.', 'यह कमीज़ सुंदर है।', '“This shirt is beautiful.”'),
    item('जूते', 'jūte', '“Shoes.” Commonly plural in everyday use.', 'मुझे काले जूते चाहिए।', '“I want black shoes.”'),
    item('नीला / नीली', 'nīlā / nīlī', '“Blue” masculine / feminine. Color words make agreement visible early.', 'नीली कमीज़, नीला बैग।', '“Blue shirt, blue bag.”'),
    item('बड़ा / बड़ी', 'baṛā / baṛī', '“Big” masculine / feminine.', 'क्या आपके पास बड़ा साइज़ है?', '“Do you have a bigger size?”'),
    item('महँगा / सस्ता', 'mahaṅgā / sastā', '“Expensive / cheap.” Useful for comparison and bargaining.', 'यह महँगा है, वह सस्ता है।', '“This is expensive, that is cheap.”'),
    item('दाम', 'dām', '“Price.” A useful alternative to simply asking `कितना`.', 'इसका दाम क्या है?', '“What is its price?”'),
    item('नकद / कार्ड से', 'nakad / kārḍ se', '“Cash / by card.”', 'मैं कार्ड से भुगतान करूँगा।', '“I will pay by card.”'),
    item('दिखाइए', 'dikhāiye', '“Please show.” A polite imperative for shop interactions.', 'कृपया दूसरी कमीज़ दिखाइए।', '“Please show another shirt.”'),
  ],
});
