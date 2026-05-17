const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u6',
  title: 'Level 1 · Unit 6: Даты и календарь — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about weekdays, dates, and simple plans using Russian calendar forms.',
  vocabularyGoal: 'Use weekdays, months, today/tomorrow/yesterday, and date questions.',
  grammarGoal: 'Notice that full dates use ordinal forms and that weekdays often appear with `в` plus the accusative.',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one plan.',
  task: 'Arrange a short study meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `какое сегодня число?` and `когда?`.'),
    practice('stating-date', 'Stating a date', 'Use one weekday and one calendar date.'),
    practice('making-plan', 'Making a plan', 'Use `в понедельник` or `на следующей неделе`.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('сегодня', 'segodnya', '“Today.” It often opens the sentence when the time frame matters.', 'Сегодня понедельник.', '“Today is Monday.”'),
    item('завтра', 'zavtra', '“Tomorrow.” A high-frequency planning word with no case change required.', 'Завтра у меня урок.', '“Tomorrow I have a lesson.”'),
    item('вчера', 'vchera', '“Yesterday.” It sets past time while the verb carries gendered past agreement.', 'Вчера я учился дома.', '“Yesterday I studied at home.”'),
    item('в понедельник', 'v ponedelnik', '“On Monday.” Weekdays commonly use `в` plus the accusative form.', 'Экзамен будет в понедельник.', '“The exam will be on Monday.”'),
    item('какое сегодня число?', 'kakoye segodnya chislo', '“What is today’s date?” Literally “what number is today?”', 'Какое сегодня число?', '“What is today’s date?”'),
    item('пятого мая', 'pyatogo maya', '“On the fifth of May.” Russian dates use ordinal genitive forms for both day and month.', 'Занятия начинаются пятого мая.', '“Classes begin on May fifth.”'),
    item('на следующей неделе', 'na sleduyushchey nedele', '“Next week.” This fixed phrase introduces a near-future period.', 'Мы встретимся на следующей неделе.', '“We will meet next week.”'),
    item('когда?', 'kogda', '“When?” A compact question word for dates and times.', 'Когда начинается встреча?', '“When does the meeting start?”'),
  ],
});
