const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u15',
  title: 'Level 1 · Unit 15: Tawag at Mensahe — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Answer a call, ask who is speaking, and leave a short message.',
  vocabularyGoal: 'Use phone, message, callback, and contact words.',
  grammarGoal: 'Use polite particles such as `po` and service requests with `pwede`.',
  speakingGoal: 'Handle a short phone exchange and leave one clear message.',
  task: 'Roleplay calling someone who is unavailable.',
  expressionPractice: [
    practice('answering-call', 'Answering call', 'Use a natural opening.'),
    practice('asking-identity', 'Asking identity', 'Ask who is speaking politely.'),
    practice('leaving-message', 'Leaving message', 'State your name and request a callback.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('Hello?', 'hello?', 'The common phone opening in Filipino conversation.', 'Hello, magandang umaga po.', '“Hello, good morning.”'),
    item('Sino po ito?', 'sino po ito?', '“Who is this?” The particle `po` adds politeness.', 'Sino po ang nagsasalita?', '“Who is speaking?”'),
    item('Pwede po bang makausap si ...?', 'pwede po bang makausap si ...?', '“May I speak with ...?”', 'Pwede po bang makausap si Ana?', '“May I speak with Ana?”'),
    item('mensahe', 'mensahe', '“Message.”', 'Gusto mo bang mag-iwan ng mensahe?', '“Do you want to leave a message?”'),
    item('Tawagan mo ako', 'tawagan mo ako', '“Call me.” Add `po` or fuller wording for more politeness.', 'Pakisabi, tawagan niya ako mamaya.', '“Please say that he should call me later.”'),
    item('numero ng telepono', 'numero ng telepono', '“Phone number.”', 'Ano ang numero ng telepono mo?', '“What is your phone number?”'),
    item('abala siya ngayon', 'abala siya ngayon', '“He / she is busy now.”', 'Abala siya ngayon.', '“He / she is busy now.”'),
    item('Tatawag ako mamaya', 'tatawag ako mamaya', '“I will call later.”', 'Tatawag ako pagkatapos ng klase.', '“I will call after class.”'),
    item('WhatsApp', 'whatsapp', 'A practical modern communication word.', 'Nagpadala ako ng mensahe sa WhatsApp.', '“I sent a message on WhatsApp.”'),
    item('Natanggap ko', 'natanggap ko', '“I received it.”', 'Natanggap ko ang mensahe mo.', '“I received your message.”'),
  ],
});
