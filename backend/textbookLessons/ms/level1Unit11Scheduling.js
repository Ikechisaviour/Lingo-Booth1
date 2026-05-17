const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u11',
  title: 'Level 1 · Unit 11: Janji Temu — Scheduling',
  category: 'scheduling',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, ask about availability, and move an appointment politely.',
  vocabularyGoal: 'Use Malay time words, weekdays, and appointment vocabulary in realistic planning.',
  grammarGoal: 'Use `boleh`, `pada`, `pukul`, and `akan` to combine availability with future plans.',
  speakingGoal: 'Suggest a time, reject one politely, and confirm a new arrangement.',
  task: 'Schedule a study meeting with one change of plan.',
  expressionPractice: [
    practice('checking-availability', 'Checking availability', 'Ask when someone is free.'),
    practice('rescheduling', 'Rescheduling', 'Move an appointment without sounding abrupt.'),
    practice('confirming-time', 'Confirming time', 'Repeat day and hour clearly.'),
  ],
  relatedPools: ['topic-time', 'topic-school'],
  items: [
    item('janji temu', 'jan.ji te.mu', '“Appointment / meeting.” Literally “promise to meet,” useful for clinics, study sessions, and formal appointments.', 'Saya ada janji temu pada hari Isnin.', '“I have an appointment on Monday.”'),
    item('lapang', 'la.pang', '“Free / available.” A natural adjective for schedule availability.', 'Awak lapang bila?', '“When are you free?”'),
    item('boleh pada hari Selasa?', 'bo.leh pa.da ha.ri se.la.sa', '“Can [you] on Tuesday?” Malay often leaves the subject understood when context is clear.', 'Boleh pada hari Selasa pukul tiga?', '“Can [we meet] Tuesday at three?”'),
    item('pukul', 'pu.kul', 'Marker used before clock time.', 'Kelas bermula pukul sembilan.', '“Class starts at nine.”'),
    item('pada', 'pa.da', 'Preposition for dates and days when the time is specific.', 'Kita jumpa pada hari Khamis.', '“We meet on Thursday.”'),
    item('akan', 'a.kan', 'Future marker that gives a planned or expected sense.', 'Saya akan datang lewat sedikit.', '“I will come a little late.”'),
    item('tukar masa', 'tu.kar ma.sa', '“Change the time.” A useful compact rescheduling phrase.', 'Boleh kita tukar masa?', '“Can we change the time?”'),
    item('ditunda', 'di.tun.da', '“Postponed.” The `di-` passive is common in announcements and formal scheduling.', 'Mesyuarat ditunda ke Jumaat.', '“The meeting is postponed to Friday.”'),
    item('awal / lewat', 'a.wal / le.wat', '“Early / late.” Everyday schedule adjectives.', 'Saya datang awal, tetapi dia lewat.', '“I came early, but he was late.”'),
    item('jadi', 'ja.di', 'Colloquial “so / agreed / it becomes.” Useful when confirming a plan.', 'Jadi, hari Rabu pukul dua.', '“So, Wednesday at two.”'),
  ],
});
