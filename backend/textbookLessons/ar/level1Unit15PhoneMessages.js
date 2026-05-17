const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u15',
  title: 'Level 1 · Unit 15: المكالمات والرسائل — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Answer a call, ask who is speaking, and leave a short message.',
  vocabularyGoal: 'Use telephone, message, call-back, and contact vocabulary.',
  grammarGoal: 'Use polite phone formulas and imperatives such as `اتصل بي` and `اترك رسالة`.',
  speakingGoal: 'Handle a short phone exchange and leave one clear message.',
  task: 'Roleplay calling a classmate who is unavailable.',
  expressionPractice: [
    practice('answering-call', 'Answering a call', 'Use an appropriate opening.'),
    practice('asking-identity', 'Asking who is speaking', 'Use `من المتكلم؟` naturally.'),
    practice('leaving-message', 'Leaving a message', 'State your name and request a call-back.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('ألو', 'allū', '“Hello” on the telephone. It is call-specific rather than a general greeting.', 'ألو، السلام عليكم.', '“Hello, peace be upon you.”'),
    item('من المتكلم؟', 'man al-mutakallim?', '“Who is speaking?” A formal-neutral phone question.', 'من المتكلم من فضلك؟', '“Who is speaking, please?”'),
    item('هل يمكنني التحدث إلى ...؟', 'hal yumkinunī at-taḥadduth ilā ...?', '“May I speak to ...?” A polite phone request frame.', 'هل يمكنني التحدث إلى الأستاذة ليلى؟', '“May I speak to Ms. Layla?”'),
    item('رسالة', 'risāla', '“Message.” It can mean a text, letter, or verbal message depending on context.', 'هل تريد أن تترك رسالة؟', '“Would you like to leave a message?”'),
    item('اتصل بي', 'ittaṣil bī', '“Call me.” A direct imperative plus object pronoun.', 'من فضلك، اتصل بي مساءً.', '“Please call me in the evening.”'),
    item('رقم الهاتف', 'raqm al-hātif', '“Phone number.” Another useful noun chain.', 'ما رقم هاتفك؟', '“What is your phone number?”'),
    item('مشغول الآن', 'mashghūl al-ān', '“Busy now.” Helpful when someone cannot take the call.', 'هو مشغول الآن.', '“He is busy now.”'),
    item('سأعود لاحقًا', 'saʾaʿūdu lāḥiqan', '“I will return later.” Useful when promising a callback or recontact.', 'سأعود إلى الاتصال لاحقًا.', '“I will call back later.”'),
    item('واتساب', 'wātsāb', '“WhatsApp.” A practical modern communication word in many Arabophone contexts.', 'أرسلت لك رسالة على واتساب.', '“I sent you a message on WhatsApp.”'),
    item('وصلت الرسالة', 'waṣalat ar-risāla', '“The message arrived.” A useful confirmation phrase.', 'نعم، وصلت الرسالة.', '“Yes, the message arrived.”'),
  ],
});
