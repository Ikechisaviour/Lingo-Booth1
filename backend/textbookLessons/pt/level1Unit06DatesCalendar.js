const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u6',
  title: 'Level 1 · Unit 6: Datas e Calendário — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about days, dates, and short plans using Portuguese calendar expressions.',
  vocabularyGoal: 'Use weekdays, months, dates, and near-time expressions.',
  grammarGoal: 'Use `em` plus articles in calendar phrases, and notice the contractions `no`, `na`, and `em + o/a`.',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one plan.',
  task: 'Arrange a study meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `que dia é hoje?` and `quando?`.'),
    practice('stating-date', 'Stating a date', 'Use one weekday and one numbered date.'),
    practice('making-plan', 'Making a plan', 'Use `na segunda`, `no sábado`, or `mês que vem`.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('hoje', 'OH-zhee', '“Today.” It frames many everyday answers before the verb.', 'Hoje é segunda-feira.', '“Today is Monday.”'),
    item('amanhã', 'a-ma-NYANG', '“Tomorrow.” The nasal ending is part of the word, not an optional accent detail.', 'Amanhã tenho aula.', '“Tomorrow I have class.”'),
    item('ontem', 'ON-teng', '“Yesterday.” The final nasal sound is a high-frequency pronunciation habit worth fixing early.', 'Ontem estudei português.', '“Yesterday I studied Portuguese.”'),
    item('segunda-feira', 'se-GOON-da FAY-ra', '“Monday.” Weekdays from Monday to Friday commonly include `-feira`.', 'A prova é na segunda-feira.', '“The test is on Monday.”'),
    item('que dia é hoje?', 'kee JEE-a eh OH-zhee', '“What day is today?” A practical full question for classroom and planning talk.', 'Que dia é hoje?', '“What day is today?”'),
    item('dia cinco de maio', 'JEE-a SEEN-koo djee MY-oo', 'Portuguese says the day number before the month with `de` between them.', 'A aula começa no dia cinco de maio.', '“Class starts on May fifth.”'),
    item('na sexta-feira', 'na SES-ta FAY-ra', '“On Friday.” `Na` is the contraction of `em + a` and is normal with feminine weekdays.', 'Nos vemos na sexta-feira.', '“We will see each other on Friday.”'),
    item('no sábado', 'no SA-ba-doo', '“On Saturday.” `No` is the contraction of `em + o`.', 'Eu trabalho no sábado.', '“I work on Saturday.”'),
    item('mês que vem', 'mes kee veng', '“Next month.” Literally “month that comes,” a common future phrase.', 'Vou viajar no mês que vem.', '“I will travel next month.”'),
    item('quando?', 'KWAN-doo', '“When?” A compact question word for times, dates, and events.', 'Quando começa a reunião?', '“When does the meeting start?”'),
  ],
});
