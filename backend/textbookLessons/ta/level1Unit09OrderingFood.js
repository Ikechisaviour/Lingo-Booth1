const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u9',
  title: 'Level 1 · Unit 9: உணவு ஆர்டர் செய்வது — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks politely in a canteen or restaurant.',
  vocabularyGoal: 'Use food, drink, portion, and service words.',
  grammarGoal: 'Use polite request forms with `வேண்டும்`, `கொடுக்க முடியுமா`, and `இல்லாமல்`.',
  speakingGoal: 'Place a complete order, change one detail, and ask for the bill.',
  task: 'Roleplay ordering a simple Tamil meal.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `எனக்கு ... வேண்டும்`.'),
    practice('customizing', 'Customizing', 'Use `இல்லாமல்`.'),
    practice('closing-order', 'Closing order', 'Ask for the bill naturally.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('எனக்கு ஒரு காபி வேண்டும்', 'eṉakku oru kāpi vēṇṭum', '“I want one coffee.” The dative-like `எனக்கு` marks the experiencer/recipient.', 'எனக்கு ஒரு காபி வேண்டும்.', '“I want one coffee.”'),
    item('கொடுக்க முடியுமா?', 'koṭukka muṭiyumā', '“Could you give?” A polite request frame.', 'ஒரு தோசை கொடுக்க முடியுமா?', '“Could you give one dosa?”'),
    item('சர்க்கரை இல்லாமல்', 'carkkarai illāmal', '“Without sugar.” `இல்லாமல்` means “without.”', 'சர்க்கரை இல்லாமல் தேநீர் வேண்டும்.', '“I want tea without sugar.”'),
    item('காரம் குறைவு', 'kāram kuṟaivu', '“Less spicy.” A practical food customization phrase.', 'காரம் குறைவு சாம்பார் வேண்டும்.', '“I want less-spicy sambar.”'),
    item('இங்கே சாப்பிட', 'iṅkē cāppiṭa', '“To eat here.” The infinitive-style form names the action.', 'இங்கே சாப்பிடவா அல்லது பார்சலா?', '“For eating here or parcel?”'),
    item('பார்சல்', 'pārcal', '“Parcel / takeaway.” A very common South Indian restaurant word.', 'இதை பார்சல் செய்யுங்கள்.', '“Please make this takeaway.”'),
    item('ஒரு பங்கு', 'oru paṅku', '“One portion.” Useful for serving-sized orders.', 'ஒரு பங்கு இட்லி வேண்டும்.', '“I want one portion of idli.”'),
    item('பில் கொடுங்கள்', 'pil koṭuṅkaḷ', '“Please give the bill.” A polite complete closing phrase.', 'பில் கொடுங்கள்.', '“Please give the bill.”'),
  ],
});
