const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u11',
  title: 'Level 1 · Unit 11: קובעים פגישה — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Set a meeting time, check availability, and move a plan when needed.',
  vocabularyGoal: 'Use weekday, hour, meeting, and availability vocabulary.',
  grammarGoal: 'Use `ב־` for days/times and future forms for planned meetings.',
  speakingGoal: 'Suggest a time, accept it, or offer another one.',
  task: 'Arrange a study meeting for next week.',
  expressionPractice: [
    practice('suggesting-time', 'Suggesting time', 'Use a day and hour clearly.'),
    practice('checking-availability', 'Checking availability', 'Ask whether someone is free.'),
    practice('rescheduling', 'Rescheduling', 'Offer a workable alternative.'),
  ],
  relatedPools: ['topic-time', 'topic-plans'],
  items: [
    item('פגישה', 'pgisha', '“Meeting / appointment.” A feminine noun.', 'יש לי פגישה ביום ראשון.', '“I have a meeting on Sunday.”'),
    item('מתי?', 'matai?', '“When?” The core scheduling question word.', 'מתי נפגשים?', '“When are we meeting?”'),
    item('ביום שני', 'beyom sheni', '“On Monday.” The prefix `ב־` attaches to the day expression.', 'ניפגש ביום שני.', '“We will meet on Monday.”'),
    item('בשעה שלוש', 'basha’a shalosh', '“At three o’clock.” A standard time frame.', 'השיעור מתחיל בשעה שלוש.', '“The lesson starts at three.”'),
    item('פנוי / פנויה', 'panui / pnuya', '“Free / available” masculine / feminine.', 'את פנויה מחר?', '“Are you free tomorrow?”'),
    item('עסוק / עסוקה', 'asuk / asuka', '“Busy” masculine / feminine.', 'אני עסוק בערב.', '“I am busy in the evening.”'),
    item('ניפגש', 'nipagesh', '“We will meet.” A high-value future form learners can use as a chunk.', 'ניפגש מחר?', '“Shall we meet tomorrow?”'),
    item('אפשר לדחות?', 'efshar lidkhot?', '“Can we postpone?” Infinitive after `אפשר` makes a polite request.', 'אפשר לדחות ליום חמישי?', '“Can we postpone to Thursday?”'),
    item('מתאים לי', 'mat’im li', '“It suits me.” A natural acceptance phrase.', 'יום רביעי מתאים לי.', '“Wednesday works for me.”'),
    item('בשבוע הבא', 'bashavua haba', '“Next week.” A useful planning horizon phrase.', 'יש לנו מבחן בשבוע הבא.', '“We have an exam next week.”'),
  ],
});
