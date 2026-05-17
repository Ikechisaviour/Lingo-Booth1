const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u15',
  title: 'Level 1 · Unit 15: שיחות והודעות — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Answer a call, ask who is speaking, and leave a short message.',
  vocabularyGoal: 'Use phone, message, callback, and contact vocabulary.',
  grammarGoal: 'Use practical imperatives and the polite service word `אפשר`.',
  speakingGoal: 'Handle a short phone exchange and leave one clear message.',
  task: 'Roleplay calling someone who is unavailable.',
  expressionPractice: [
    practice('answering-call', 'Answering call', 'Use an appropriate opening.'),
    practice('asking-identity', 'Asking identity', 'Ask who is speaking.'),
    practice('leaving-message', 'Leaving message', 'State your name and request a callback.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('הלו', 'halo', '“Hello” on the phone. It is more call-specific than ordinary greetings.', 'הלו, שלום.', '“Hello, hi.”'),
    item('מי מדבר?', 'mi medaber?', '“Who is speaking?” The present form is masculine default here.', 'מי מדבר בבקשה?', '“Who is speaking, please?”'),
    item('אפשר לדבר עם ...?', 'efshar ledaber im ...?', '“May I speak with ...?” A polite call request.', 'אפשר לדבר עם דנה?', '“May I speak with Dana?”'),
    item('הודעה', 'hoda’a', '“Message.” Useful for calls and texting.', 'את רוצה להשאיר הודעה?', '“Do you want to leave a message?”'),
    item('תחזור אליי', 'takhzor elai', '“Call me back / return to me.” A practical masculine imperative phrase.', 'בבקשה תחזור אליי בערב.', '“Please call me back in the evening.”'),
    item('מספר טלפון', 'mispar telefon', '“Phone number.” A construct phrase.', 'מה מספר הטלפון שלך?', '“What is your phone number?”'),
    item('עסוק עכשיו', 'asuk akhshav', '“Busy now.” Useful when the person cannot come to the phone.', 'הוא עסוק עכשיו.', '“He is busy now.”'),
    item('אני אתקשר אחר כך', 'ani etkasher akhar kakh', '“I will call later.” A common future promise.', 'אני אתקשר אחר כך.', '“I will call later.”'),
    item('ווטסאפ', 'votsap', '“WhatsApp.” Common modern communication vocabulary.', 'שלחתי לך הודעה בווטסאפ.', '“I sent you a message on WhatsApp.”'),
    item('קיבלתי', 'kibalti', '“I received.” Useful for confirming a message.', 'קיבלתי את ההודעה.', '“I received the message.”'),
  ],
});
