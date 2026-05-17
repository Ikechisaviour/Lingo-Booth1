const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u11',
  title: 'Level 1 · Unit 11: Pagtatakda ng Oras — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Set a meeting time, check availability, and move a plan when needed.',
  vocabularyGoal: 'Use weekday, hour, meeting, and free/busy vocabulary.',
  grammarGoal: 'Use `sa` with time expressions and future forms such as `magkikita`.',
  speakingGoal: 'Suggest a time, accept it, or offer another one.',
  task: 'Arrange a study meeting for next week.',
  expressionPractice: [
    practice('suggesting-time', 'Suggesting time', 'Use a day and hour clearly.'),
    practice('checking-availability', 'Checking availability', 'Ask whether someone is free.'),
    practice('rescheduling', 'Rescheduling', 'Offer an alternative politely.'),
  ],
  relatedPools: ['topic-time', 'topic-plans'],
  items: [
    item('pagkikita', 'pagkikita', '“Meeting / seeing one another.”', 'May pagkikita kami sa Lunes.', '“We have a meeting on Monday.”'),
    item('Kailan?', 'kailan?', '“When?”', 'Kailan tayo magkikita?', '“When will we meet?”'),
    item('sa Lunes', 'sa lunes', '“On Monday.”', 'Magkikita tayo sa Lunes.', '“We will meet on Monday.”'),
    item('alas tres', 'alas tres', '“At three o’clock.” Spanish-derived clock wording remains common.', 'Magsisimula ang klase ng alas tres.', '“Class starts at three.”'),
    item('bakante / abala', 'bakante / abala', '“Free / busy.”', 'Bakante ka ba bukas?', '“Are you free tomorrow?”'),
    item('bukas / sa makalawa', 'bukas / sa makalawa', '“Tomorrow / the day after tomorrow.”', 'Abala ako bukas.', '“I am busy tomorrow.”'),
    item('magkikita tayo', 'magkikita tayo', '“We will meet.”', 'Magkikita tayo sa hapon.', '“We will meet in the afternoon.”'),
    item('Pwede bang ilipat?', 'pwede bang ilipat?', '“Can it be moved?” A natural rescheduling question.', 'Pwede bang ilipat sa Huwebes?', '“Can it be moved to Thursday?”'),
    item('Ayos sa akin', 'ayos sa akin', '“That works for me.”', 'Biyernes ay ayos sa akin.', '“Friday works for me.”'),
    item('sa susunod na linggo', 'sa susunod na linggo', '“Next week.”', 'May pagsusulit sa susunod na linggo.', '“There is a test next week.”'),
  ],
});
