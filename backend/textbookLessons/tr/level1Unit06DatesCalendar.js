const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u6',
  title: 'Level 1 · Unit 6: Tarihler ve Takvim — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about days, dates, and short plans while hearing vowel harmony in common time suffixes.',
  vocabularyGoal: 'Use weekdays, months, today/tomorrow/yesterday, and calendar questions.',
  grammarGoal: 'Use time suffixes such as `-de/-da` and date order without losing vowel harmony.',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one plan.',
  task: 'Arrange a simple study meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `bugün ayın kaçı?` and `ne zaman?`.'),
    practice('stating-date', 'Stating a date', 'Use one weekday and one numbered date.'),
    practice('making-plan', 'Making a plan', 'Use `pazartesi günü` or `gelecek hafta`.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('bugün', 'bu-GÜN', '“Today.” A high-frequency time word with front-rounded vowel harmony in later suffixes.', 'Bugün pazartesi.', '“Today is Monday.”'),
    item('yarın', 'ya-RIN', '“Tomorrow.” The undotted ı is a core Turkish sound learners need to keep distinct.', 'Yarın dersim var.', '“Tomorrow I have class.”'),
    item('dün', 'DÜN', '“Yesterday.” Short, common, and useful for every past-tense unit that follows.', 'Dün evdeydim.', '“Yesterday I was at home.”'),
    item('pazartesi günü', 'pa-zar-TE-si GÜ-nü', '“On Monday.” `Günü` makes the day expression explicit and natural.', 'Sınav pazartesi günü.', '“The exam is on Monday.”'),
    item('bugün ayın kaçı?', 'bu-GÜN a-YIN KA-çı', '“What is today’s date?” Literally “today is which of the month?”', 'Bugün ayın kaçı?', '“What is today’s date?”'),
    item('beş Mayıs', 'BEŞ ma-YIS', '“May fifth.” Turkish names the day number before the month.', 'Ders beş Mayıs’ta başlıyor.', '“Class starts on May fifth.”'),
    item('gelecek hafta', 'ge-le-JEK HAF-ta', '“Next week.” A practical near-future phrase.', 'Gelecek hafta görüşürüz.', '“We will see each other next week.”'),
    item('ne zaman?', 'ne za-MAN', '“When?” A core question phrase for time and plans.', 'Toplantı ne zaman?', '“When is the meeting?”'),
  ],
});
