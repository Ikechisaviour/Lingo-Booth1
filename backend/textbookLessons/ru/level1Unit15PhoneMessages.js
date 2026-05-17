const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u15',
  title: 'Level 1 · Unit 15: Телефон и сообщения — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make short calls, leave messages, and ask for repetition.',
  vocabularyGoal: 'Use phone, message, number, and callback vocabulary.',
  grammarGoal: 'Use polite requests with `можно`, `передайте`, and `повторите`.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening call', 'Use one phone greeting and identify yourself.'),
    practice('leaving-message', 'Leaving message', 'Use `передайте, пожалуйста`.'),
    practice('asking-repeat', 'Asking repetition', 'Use `повторите, пожалуйста`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('алло', 'allo', 'The standard Russian phone greeting.', 'Алло, это Анна.', '“Hello, this is Anna.”'),
    item('можно поговорить с ...?', 'mozhno pogovorit s', '“May I speak with ...?” A polite phone request with instrumental after `с`.', 'Можно поговорить с Иваном?', '“May I speak with Ivan?”'),
    item('его сейчас нет', 'yego seychas net', '“He is not here now.” The genitive after `нет` is part of the phrase.', 'Его сейчас нет на месте.', '“He is not at his desk right now.”'),
    item('сообщение', 'soobshcheniye', '“Message.” Useful for phone and text contexts.', 'Можно оставить сообщение?', '“May I leave a message?”'),
    item('передайте, пожалуйста', 'peredayte pozhaluysta', '“Please pass on / tell them.” A polite service request.', 'Передайте, пожалуйста, что я звонил.', '“Please tell them that I called.”'),
    item('номер телефона', 'nomer telefona', '“Phone number.” The second noun appears in genitive form.', 'Какой у вас номер телефона?', '“What is your phone number?”'),
    item('повторите, пожалуйста', 'povtorite pozhaluysta', '“Please repeat.” A core repair phrase for learners.', 'Повторите номер, пожалуйста.', '“Please repeat the number.”'),
    item('я перезвоню позже', 'ya perezvonyu pozzhe', '“I will call back later.” A natural call-ending promise.', 'Хорошо, я перезвоню позже.', '“Alright, I will call back later.”'),
  ],
});
