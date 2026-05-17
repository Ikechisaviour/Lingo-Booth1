const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u6',
  title: 'Level 1 · Unit 6: Data en Kalender — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about days, dates, and short plans using Dutch calendar expressions.',
  vocabularyGoal: 'Use weekdays, months, today/tomorrow/yesterday, and date questions.',
  grammarGoal: 'Keep Dutch V2 order when a time expression begins the sentence.',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one plan.',
  task: 'Arrange a simple study meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `welke datum is het vandaag?`.'),
    practice('stating-date', 'Stating a date', 'Use one weekday and one numbered date.'),
    practice('making-plan', 'Making a plan', 'Use `volgende week` and maintain V2 order.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('vandaag', 'van-DAKH', '“Today.” If it starts the sentence, the verb still stays second.', 'Vandaag heb ik les.', '“Today I have class.”'),
    item('morgen', 'MOR-ghen', '“Tomorrow.” A basic future-planning word.', 'Morgen ga ik naar de bibliotheek.', '“Tomorrow I am going to the library.”'),
    item('gisteren', 'KHIS-te-ren', '“Yesterday.” It pairs naturally with the perfect tense later.', 'Gisteren had ik geen tijd.', '“Yesterday I had no time.”'),
    item('maandag', 'MAHN-dakh', '“Monday.” Weekdays do not need a preposition in many ordinary time answers.', 'De toets is maandag.', '“The test is on Monday.”'),
    item('welke datum is het vandaag?', 'wel-kə DAH-tum is hət van-DAKH', '“What date is it today?” A practical full question.', 'Welke datum is het vandaag?', '“What date is it today?”'),
    item('vijf mei', 'veyf mey', '“May fifth.” Dutch places the day number before the month.', 'De cursus begint op vijf mei.', '“The course begins on May fifth.”'),
    item('volgende week', 'VOL-ghen-də vayk', '“Next week.” A useful near-future phrase.', 'Volgende week hebben we vakantie.', '“Next week we have vacation.”'),
    item('wanneer?', 'va-NEER', '“When?” A compact question word for time and plans.', 'Wanneer begint de vergadering?', '“When does the meeting begin?”'),
  ],
});
