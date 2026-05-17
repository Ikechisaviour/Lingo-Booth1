const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u11',
  title: 'Level 1 · Unit 11: Fissare un appuntamento — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Set a meeting time, check availability, and move a plan when needed.',
  vocabularyGoal: 'Use weekday, hour, appointment, and free/busy vocabulary.',
  grammarGoal: 'Use time prepositions and near-future / present-for-future phrasing.',
  speakingGoal: 'Suggest a time, accept it, or offer another one.',
  task: 'Arrange a study meeting for next week.',
  expressionPractice: [
    practice('suggesting-time', 'Suggesting time', 'Use a day and hour clearly.'),
    practice('checking-availability', 'Checking availability', 'Ask whether someone is free.'),
    practice('rescheduling', 'Rescheduling', 'Offer an alternative politely.'),
  ],
  relatedPools: ['topic-time', 'topic-plans'],
  items: [
    item('appuntamento', 'appuntamento', '“Appointment / meeting.”', 'Ho un appuntamento lunedì.', '“I have an appointment Monday.”'),
    item('quando?', 'quando?', '“When?”', 'Quando ci vediamo?', '“When shall we see each other?”'),
    item('lunedì', 'lunedì', '“Monday.” Weekday names are usually lowercase.', 'Ci vediamo lunedì.', '“We will see each other Monday.”'),
    item('alle tre', 'alle tre', '“At three o’clock.” The preposition contracts with the article.', 'La lezione inizia alle tre.', '“The lesson starts at three.”'),
    item('libero / libera', 'libero / libera', '“Free / available” masculine / feminine.', 'Sei libera domani?', '“Are you free tomorrow?”'),
    item('occupato / occupata', 'occupato / occupata', '“Busy” masculine / feminine.', 'Sono occupato stasera.', '“I am busy tonight.”'),
    item('ci vediamo', 'ci vediamo', '“We will see each other / see you.” A natural meeting phrase.', 'Ci vediamo domani?', '“Shall we meet tomorrow?”'),
    item('possiamo rimandare?', 'possiamo rimandare?', '“Can we postpone?”', 'Possiamo rimandare a giovedì?', '“Can we postpone to Thursday?”'),
    item('va bene per me', 'va bene per me', '“It works for me.”', 'Venerdì va bene per me.', '“Friday works for me.”'),
    item('la prossima settimana', 'la prossima settimana', '“Next week.”', 'Ho un esame la prossima settimana.', '“I have an exam next week.”'),
  ],
});
