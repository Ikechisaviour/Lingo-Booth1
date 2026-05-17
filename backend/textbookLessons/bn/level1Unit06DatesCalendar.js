const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u6',
  title: 'Level 1 · Unit 6: তারিখ ও ক্যালেন্ডার — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about days, dates, and short plans using Bengali calendar expressions.',
  vocabularyGoal: 'Use weekdays, months, today/tomorrow/yesterday, and date questions.',
  grammarGoal: 'Use postpositional-style time endings and common date phrases.',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one plan.',
  task: 'Arrange a simple class meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `আজ কত তারিখ?`.'),
    practice('stating-date', 'Stating a date', 'Use one weekday and one date.'),
    practice('making-plan', 'Making a plan', 'Use `আগামী সপ্তাহে`.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('আজ', 'aj', '“Today.” A compact high-frequency time word.', 'আজ সোমবার।', '“Today is Monday.”'),
    item('আগামীকাল', 'agamikal', '“Tomorrow.” Useful in nearly every planning exchange.', 'আগামীকাল আমার ক্লাস আছে।', '“Tomorrow I have class.”'),
    item('গতকাল', 'gotokal', '“Yesterday.” A basic past-time marker.', 'গতকাল আমি পড়েছি।', '“Yesterday I studied.”'),
    item('সোমবার', 'shombar', '“Monday.” Weekday names are practical early vocabulary.', 'পরীক্ষা সোমবার।', '“The exam is on Monday.”'),
    item('আজ কত তারিখ?', 'aj koto tarikh', '“What is today’s date?” A practical full question.', 'আজ কত তারিখ?', '“What is today’s date?”'),
    item('পাঁচ মে', 'panch me', '“May fifth.” Bengali states the day number with the month name in compact form.', 'ক্লাস পাঁচ মে শুরু হবে।', '“Class will begin on May fifth.”'),
    item('আগামী সপ্তাহে', 'agami shoptah-e', '“Next week.” The ending marks the time setting.', 'আমরা আগামী সপ্তাহে দেখা করব।', '“We will meet next week.”'),
    item('কখন?', 'kokhon', '“When?” A compact question word for times and plans.', 'মিটিং কখন শুরু হবে?', '“When will the meeting start?”'),
  ],
});
