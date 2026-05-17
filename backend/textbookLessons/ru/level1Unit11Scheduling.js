const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u11',
  title: 'Level 1 · Unit 11: Встречи и расписание — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and change plans politely.',
  vocabularyGoal: 'Use appointment, schedule, time, and availability words.',
  grammarGoal: 'Use `можно`, `сможешь`, and time phrases with `в` for clock times.',
  speakingGoal: 'Propose a time, accept or reject it, and offer another option.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use `давай` or `может быть`.'),
    practice('accepting', 'Accepting', 'Use `могу` or `подходит`.'),
    practice('rescheduling', 'Rescheduling', 'Use `не могу` plus another option.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('встреча', 'vstrecha', '“Meeting.” It is the everyday noun for many appointments.', 'У меня встреча завтра.', '“I have a meeting tomorrow.”'),
    item('расписание', 'raspisaniye', '“Schedule.” Useful for school timetables and personal planning.', 'Моё расписание занято.', '“My schedule is busy.”'),
    item('в три часа', 'v tri chasa', '“At three o’clock.” Clock time follows `в`.', 'Встреча будет в три часа.', '“The meeting will be at three.”'),
    item('я могу', 'ya mogu', '“I can / I am available.” Context gives the scheduling meaning.', 'Я могу вечером.', '“I am available in the evening.”'),
    item('я не могу', 'ya ne mogu', '“I cannot.” Add another suggestion to sound cooperative.', 'Я не могу утром, но могу после обеда.', '“I cannot in the morning, but I can after lunch.”'),
    item('давай встретимся', 'davay vstretimsya', '“Let’s meet.” Friendly and natural with peers.', 'Давай встретимся в пятницу.', '“Let’s meet on Friday.”'),
    item('тебе подходит?', 'tebe podkhodit', '“Does that suit you?” A practical check after proposing a time.', 'Пять часов тебе подходит?', '“Does five o’clock suit you?”'),
    item('перенести встречу', 'perenesti vstrechu', '“Reschedule the meeting.” A useful phrase once plans change.', 'Можно перенести встречу?', '“Can we reschedule the meeting?”'),
  ],
});
