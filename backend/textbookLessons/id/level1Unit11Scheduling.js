const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u11',
  title: 'Level 1 · Unit 11: Janji dan Jadwal — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and adjust a plan politely.',
  vocabularyGoal: 'Use appointment, time, and availability words.',
  grammarGoal: 'Use `bisa`, `tidak bisa`, and `pada` with times and dates.',
  speakingGoal: 'Propose a time, accept or reject it, and offer another option.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use `bagaimana kalau` with a time.'),
    practice('accepting', 'Accepting', 'Use `bisa` or `cocok`.'),
    practice('rescheduling', 'Rescheduling', 'Use `tidak bisa` plus another option.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('janji', 'janji', '“Appointment / promise.” Context tells whether it is a meeting or a commitment.', 'Saya punya janji dengan dosen.', '“I have an appointment with the lecturer.”'),
    item('jadwal', 'jadwal', '“Schedule.” It is useful for both personal calendars and institutional timetables.', 'Jadwal saya penuh hari ini.', '“My schedule is full today.”'),
    item('jam tiga', 'jam tiga', '“Three o’clock.” `Jam` introduces clock time directly.', 'Kita bertemu jam tiga.', '“We meet at three.”'),
    item('pada hari Jumat', 'pada hari Jumat', '“On Friday.” `Pada` is a careful marker for time, especially in more formal statements.', 'Rapatnya pada hari Jumat.', '“The meeting is on Friday.”'),
    item('bisa', 'bisa', '“Can / be able to.” In scheduling it often means availability, not just skill.', 'Saya bisa sore ini.', '“I am available this afternoon.”'),
    item('tidak bisa', 'tidak bisa', '“Cannot / not available.” Add a reason or alternative to sound cooperative.', 'Saya tidak bisa pagi, tetapi bisa malam.', '“I cannot do morning, but evening works.”'),
    item('bagaimana kalau ...?', 'bagaimana kalau', '“How about ...?” A soft, useful proposal frame.', 'Bagaimana kalau besok jam dua?', '“How about tomorrow at two?”'),
    item('cocok', 'cocok', '“Suitable / works.” It is a natural reply when a proposed time fits.', 'Jam empat cocok untuk saya.', '“Four o’clock works for me.”'),
    item('ubah jadwal', 'ubah jadwal', '“Change the schedule.” `Ubah` is the base verb for changing something.', 'Bolehkah kita ubah jadwal?', '“May we change the schedule?”'),
    item('tepat waktu', 'tepat waktu', '“On time.” This is a useful social phrase around meetings and transport.', 'Saya akan datang tepat waktu.', '“I will come on time.”'),
  ],
});
