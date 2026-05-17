const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u17',
  title: 'Level 1 · Unit 17: في مكتب البريد — At the Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Send a letter or parcel, ask about cost, and state the destination.',
  vocabularyGoal: 'Use letter, parcel, stamp, address, and delivery vocabulary.',
  grammarGoal: 'Use object nouns after `أريد أن أرسل` and destination phrases with `إلى`.',
  speakingGoal: 'Explain what you want to send and where it should go.',
  task: 'Roleplay sending a parcel internationally.',
  expressionPractice: [
    practice('sending-item', 'Sending an item', 'Use `أريد أن أرسل ...`.'),
    practice('giving-address', 'Giving an address', 'State the destination clearly.'),
    practice('asking-cost', 'Asking cost', 'Ask how much mailing will cost.'),
  ],
  relatedPools: ['topic-service', 'topic-mail'],
  items: [
    item('مكتب البريد', 'maktab al-barīd', '“Post office.” A compact noun chain learners can reuse with other service offices later.', 'أين مكتب البريد؟', '“Where is the post office?”'),
    item('رسالة', 'risāla', '“Letter / message.” Context tells whether it is physical mail or communication.', 'أريد أن أرسل رسالة.', '“I want to send a letter.”'),
    item('طرد', 'ṭard', '“Parcel / package.” Useful for mailing goods rather than letters.', 'هذا طرد إلى القاهرة.', '“This is a parcel to Cairo.”'),
    item('طابع', 'ṭābiʿ', '“Stamp.” The word also belongs to a root family about imprinting and printing.', 'أحتاج إلى طابع.', '“I need a stamp.”'),
    item('عنوان', 'ʿunwān', '“Address.” A high-frequency service noun.', 'اكتب العنوان هنا.', '“Write the address here.”'),
    item('أريد أن أرسل', 'urīdu an ursil', '“I want to send.” A reusable service phrase.', 'أريد أن أرسل هذا الطرد.', '“I want to send this parcel.”'),
    item('إلى الخارج', 'ilā al-khārij', '“Abroad / to another country.” Helpful in postal and travel contexts.', 'هل هذا البريد إلى الخارج؟', '“Is this mail going abroad?”'),
    item('كم التكلفة؟', 'kam at-taklifa?', '“How much is the cost?” A service question slightly more formal than a market-style price question.', 'كم تكلفة الإرسال؟', '“How much is the sending cost?”'),
    item('سريع / عادي', 'sarīʿ / ʿādī', '“Express / regular.” Useful when comparing service speed.', 'أريد بريدًا سريعًا.', '“I want express mail.”'),
    item('متى يصل؟', 'matā yaṣil?', '“When will it arrive?” A practical follow-up question.', 'متى يصل الطرد؟', '“When will the parcel arrive?”'),
  ],
});
