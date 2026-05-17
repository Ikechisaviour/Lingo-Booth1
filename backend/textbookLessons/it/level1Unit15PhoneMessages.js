const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u15',
  title: 'Level 1 · Unit 15: Telefonate e messaggi — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Answer a call, ask who is speaking, and leave a short message.',
  vocabularyGoal: 'Use phone, message, callback, and contact vocabulary.',
  grammarGoal: 'Use polite phone formulas and imperative-like requests with `può`.',
  speakingGoal: 'Handle a short phone exchange and leave one clear message.',
  task: 'Roleplay calling someone who is unavailable.',
  expressionPractice: [
    practice('answering-call', 'Answering call', 'Use a natural phone opening.'),
    practice('asking-identity', 'Asking identity', 'Ask who is speaking politely.'),
    practice('leaving-message', 'Leaving message', 'State your name and request a callback.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('Pronto?', 'pronto?', '“Hello?” on the telephone, not an ordinary face-to-face greeting.', 'Pronto, buongiorno.', '“Hello, good morning.”'),
    item('Chi parla?', 'chi parla?', '“Who is speaking?”', 'Mi scusi, chi parla?', '“Excuse me, who is speaking?”'),
    item('Posso parlare con ...?', 'posso parlare con ...?', '“May I speak with ...?”', 'Posso parlare con la signora Rossi?', '“May I speak with Mrs. Rossi?”'),
    item('messaggio', 'messaggio', '“Message.”', 'Vuole lasciare un messaggio?', '“Would you like to leave a message?”'),
    item('mi richiami', 'mi richiami', '“Call me back” in a polite request frame.', 'Mi richiami stasera, per favore.', '“Please call me back tonight.”'),
    item('numero di telefono', 'numero di telefono', '“Phone number.”', 'Qual è il suo numero di telefono?', '“What is your phone number?”'),
    item('è occupato adesso', 'è occupato adesso', '“He is busy now.”', 'Il dottore è occupato adesso.', '“The doctor is busy now.”'),
    item('la richiamo dopo', 'la richiamo dopo', '“I will call you back later.” Formal object pronoun in service style.', 'La richiamo dopo pranzo.', '“I will call you back after lunch.”'),
    item('WhatsApp', 'whatsapp', 'A practical modern communication word.', 'Le ho mandato un messaggio su WhatsApp.', '“I sent you a message on WhatsApp.”'),
    item('ho ricevuto', 'ho ricevuto', '“I received.”', 'Ho ricevuto il suo messaggio.', '“I received your message.”'),
  ],
});
