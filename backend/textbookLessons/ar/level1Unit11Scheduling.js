const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u11',
  title: 'Level 1 · Unit 11: المواعيد — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange times, confirm availability, and move an appointment when necessary.',
  vocabularyGoal: 'Use clock-time, weekday, meeting, and availability words in ordinary plans.',
  grammarGoal: 'Use prepositions for time, future marking, and question words such as `متى` and `هل`.',
  speakingGoal: 'Suggest a time, accept or reject it, and propose an alternative.',
  task: 'Schedule a study meeting for next week.',
  expressionPractice: [
    practice('suggesting-time', 'Suggesting a time', 'Use a clear future plan with a day and hour.'),
    practice('checking-availability', 'Checking availability', 'Ask whether the other person is free.'),
    practice('rescheduling', 'Rescheduling', 'Move a plan politely.'),
  ],
  relatedPools: ['topic-time', 'topic-plans'],
  items: [
    item('موعد', 'mawʿid', '“Appointment / scheduled time.” It can refer to a meeting, visit, or arranged slot.', 'عندي موعد يوم الاثنين.', '“I have an appointment on Monday.”'),
    item('متى؟', 'matā?', '“When?” The core question word for time.', 'متى نلتقي؟', '“When shall we meet?”'),
    item('الساعة', 'as-sāʿa', '“The hour / o’clock.” Use before the clock number.', 'نلتقي الساعة الثالثة.', '“We meet at three o’clock.”'),
    item('يوم الاثنين', 'yawm al-ithnayn', '“On Monday.” Weekdays often appear with `يوم` in beginner-safe phrasing.', 'سأزورك يوم الاثنين.', '“I will visit you on Monday.”'),
    item('هل أنت متفرغ؟', 'hal anta mutafarigh?', '“Are you free / available?” A useful formal-neutral planning question.', 'هل أنت متفرغ غدًا؟', '“Are you free tomorrow?”'),
    item('غدًا / بعد غد', 'ghadan / baʿda ghad', '“Tomorrow / the day after tomorrow.” Short, high-frequency planning adverbs.', 'أنا مشغول غدًا.', '“I am busy tomorrow.”'),
    item('مشغول / متفرغة', 'mashghūl / mutafarigha', '“Busy / free” with agreement. The feminine form matters when the speaker or referent is feminine.', 'هي متفرغة مساءً.', '“She is free in the evening.”'),
    item('لنؤجل', 'linuʾajjil', '“Let us postpone.” A compact suggestion built with the jussive invitation prefix.', 'لنؤجل الموعد إلى الجمعة.', '“Let us postpone the appointment until Friday.”'),
    item('يناسبني', 'yunāsibunī', '“It suits me.” A natural phrase for accepting a proposed time.', 'الخامسة تناسبني.', '“Five o’clock suits me.”'),
    item('إلى اللقاء', 'ilā al-liqāʾ', '“See you / until the meeting.” Useful as a clean close after scheduling.', 'إلى اللقاء يوم الخميس.', '“See you on Thursday.”'),
  ],
});
