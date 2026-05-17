const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u6',
  title: 'Level 1 · Unit 6: Petsa at Kalendaryo — Dates and the Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about weekdays, dates, birthdays, and simple calendar plans.',
  vocabularyGoal: 'Use weekday, month, birthday, and appointment vocabulary.',
  grammarGoal: 'Use `sa` for days and dates, and ordinal forms such as `ika-`.',
  speakingGoal: 'Say today’s date and arrange one simple meeting.',
  task: 'Tell the date, your birthday, and one plan for next week.',
  expressionPractice: [
    practice('saying-date', 'Saying date', 'Use a weekday and calendar date.'),
    practice('asking-birthday', 'Asking birthday', 'Use `Kailan ang kaarawan mo?`.'),
    practice('making-plan', 'Making plan', 'Use `sa` with a future date.'),
  ],
  relatedPools: ['topic-time', 'topic-plans'],
  items: [
    item('Lunes / Martes / Miyerkules', 'lunes / martes / miyerkules', 'Weekday names used in ordinary scheduling.', 'May klase ako sa Lunes.', '“I have class on Monday.”'),
    item('Enero / Pebrero / Marso', 'enero / pebrero / marso', 'Month names with familiar Spanish roots but Filipino spelling.', 'Ang kaarawan ko ay sa Marso.', '“My birthday is in March.”'),
    item('ika-lima', 'ika-lima', '“Fifth.” `ika-` forms ordinals in a very visible way.', 'Ngayon ay ika-lima ng Mayo.', '“Today is the fifth of May.”'),
    item('Kailan?', 'kailan?', '“When?”', 'Kailan ang pulong?', '“When is the meeting?”'),
    item('kaarawan', 'kaarawan', '“Birthday.”', 'Kailan ang kaarawan mo?', '“When is your birthday?”'),
    item('sa susunod na linggo', 'sa susunod na linggo', '“Next week.”', 'May pagsusulit sa susunod na linggo.', '“There is a test next week.”'),
    item('araw', 'araw', '“Day” and also “sun,” a useful polysemous word.', 'Anong araw ngayon?', '“What day is it today?”'),
    item('petsa', 'petsa', '“Date.”', 'Ano ang petsa ngayon?', '“What is today’s date?”'),
  ],
});
