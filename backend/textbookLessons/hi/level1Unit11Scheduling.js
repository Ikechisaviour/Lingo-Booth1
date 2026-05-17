const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u11',
  title: 'Level 1 · Unit 11: समय तय करना — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Set a meeting time, check availability, and move a plan when needed.',
  vocabularyGoal: 'Use weekday, hour, meeting, and free/busy vocabulary.',
  grammarGoal: 'Use time postpositions, future forms, and polite questions.',
  speakingGoal: 'Suggest a time, accept it, or offer another one.',
  task: 'Arrange a study meeting for next week.',
  expressionPractice: [
    practice('suggesting-time', 'Suggesting time', 'Use a day and hour clearly.'),
    practice('checking-availability', 'Checking availability', 'Ask whether someone is free.'),
    practice('rescheduling', 'Rescheduling', 'Offer an alternative politely.'),
  ],
  relatedPools: ['topic-time', 'topic-plans'],
  items: [
    item('मुलाकात', 'mulākāt', '“Meeting / visit.” Useful for social and formal scheduling.', 'सोमवार को मेरी मुलाकात है।', '“I have a meeting on Monday.”'),
    item('कब?', 'kab?', '“When?”', 'हम कब मिलेंगे?', '“When will we meet?”'),
    item('सोमवार को', 'somvār ko', '“On Monday.” The postposition `को` marks the day.', 'हम सोमवार को मिलेंगे।', '“We will meet on Monday.”'),
    item('तीन बजे', 'tīn baje', '“At three o’clock.” `बजे` follows the number.', 'कक्षा तीन बजे शुरू होती है।', '“Class starts at three.”'),
    item('खाली / व्यस्त', 'khālī / vyast', '“Free / busy.”', 'क्या आप कल खाली हैं?', '“Are you free tomorrow?”'),
    item('कल / परसों', 'kal / parsõ', '“Tomorrow or yesterday / day after tomorrow or day before yesterday.” Context resolves the first word, so learners must listen to tense.', 'मैं कल व्यस्त हूँ।', '“I am busy tomorrow.”'),
    item('हम मिलेंगे', 'ham mileṅge', '“We will meet.” A ready-made future chunk.', 'हम शाम को मिलेंगे।', '“We will meet in the evening.”'),
    item('क्या हम बदल सकते हैं?', 'kyā ham badal sakte hain?', '“Can we change it?” A polite rescheduling question.', 'क्या हम समय बदल सकते हैं?', '“Can we change the time?”'),
    item('मेरे लिए ठीक है', 'mere liye ṭhīk hai', '“It is fine for me.” A natural acceptance phrase.', 'शुक्रवार मेरे लिए ठीक है।', '“Friday works for me.”'),
    item('अगले सप्ताह', 'agle saptāh', '“Next week.” The adjective takes oblique form before the masculine noun phrase.', 'अगले सप्ताह परीक्षा है।', '“There is an exam next week.”'),
  ],
});
