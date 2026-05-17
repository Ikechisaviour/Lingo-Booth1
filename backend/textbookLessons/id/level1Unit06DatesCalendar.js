const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u6',
  title: 'Level 1 · Unit 6: Tanggal dan Kalender — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about days, dates, and simple plans using Indonesian time words in the order people actually say them.',
  vocabularyGoal: 'Use weekdays, months, date words, and near-time expressions such as today, tomorrow, and next week.',
  grammarGoal: 'Notice that Indonesian usually uses date-first order and does not need a verb equivalent to “is” in simple calendar statements.',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one future date.',
  task: 'Arrange a simple class meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `tanggal berapa` and `hari apa` naturally.'),
    practice('stating-date', 'Stating a date', 'Say day, date, and month without adding an unnecessary copula.'),
    practice('making-plan', 'Making a plan', 'Use `besok`, `minggu depan`, and one exact date.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('hari ini', 'hari ini', '“Today.” Indonesian often places time expressions early when they frame the whole sentence.', 'Hari ini hari Senin.', '“Today is Monday.”'),
    item('besok', 'besok', '“Tomorrow.” This is the ordinary conversational word, used before or after the main clause.', 'Besok saya ada kelas.', '“Tomorrow I have class.”'),
    item('kemarin', 'kemarin', '“Yesterday.” It can stand alone as the main time marker without changing the verb form.', 'Kemarin saya belajar di perpustakaan.', '“Yesterday I studied in the library.”'),
    item('hari Senin', 'hari Senin', '“Monday.” Indonesian weekdays are named with `hari` when the speaker wants to be explicit.', 'Rapatnya hari Senin.', '“The meeting is on Monday.”'),
    item('tanggal berapa?', 'tanggal berapa', '“What date?” `Berapa` asks for a number, so it pairs naturally with calendar dates.', 'Ujiannya tanggal berapa?', '“What date is the exam?”'),
    item('tanggal lima Mei', 'tanggal lima Mei', 'Date-first order is normal: date number before month name.', 'Kelas mulai tanggal lima Mei.', '“Class starts on May fifth.”'),
    item('bulan depan', 'bulan depan', '“Next month.” `Depan` literally means “front,” but in time expressions it means what is coming next.', 'Saya pindah bulan depan.', '“I am moving next month.”'),
    item('minggu lalu', 'minggu lalu', '“Last week.” `Lalu` marks a completed previous period and recurs across many time phrases.', 'Minggu lalu saya sakit.', '“Last week I was sick.”'),
    item('akhir pekan', 'akhir pekan', '“Weekend.” A useful neutral phrase for plans, distinct from the weekday names.', 'Akhir pekan ini saya mau istirahat.', '“This weekend I want to rest.”'),
    item('kapan?', 'kapan', '“When?” This broad question word works for times, dates, and plans.', 'Kapan kita bertemu?', '“When shall we meet?”'),
  ],
});
