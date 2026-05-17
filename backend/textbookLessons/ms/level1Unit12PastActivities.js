const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u12',
  title: 'Level 1 · Unit 12: Aktiviti Lepas — Past Activities',
  category: 'past-activities',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed, not-yet-completed, and experienced actions without relying on verb conjugation.',
  vocabularyGoal: 'Use everyday verbs for weekend and study activities.',
  grammarGoal: 'Use `sudah`, `belum`, and `pernah` as Malay aspect markers.',
  speakingGoal: 'Describe yesterday, ask whether someone has done something, and say what has not happened yet.',
  task: 'Tell a short weekend story using all three aspect markers.',
  expressionPractice: [
    practice('completed-actions', 'Completed actions', 'Use `sudah` for actions that are done.'),
    practice('not-yet', 'Not yet', 'Use `belum` without adding an unnecessary extra negative.'),
    practice('experience', 'Experience', 'Use `pernah` for life experience.'),
  ],
  relatedPools: ['topic-weekend', 'topic-time'],
  items: [
    item('sudah', 'su.dah', 'Completed aspect, often like “already / have done.” The verb itself does not change form.', 'Saya sudah makan.', '“I have eaten / I already ate.”'),
    item('belum', 'be.lum', '“Not yet.” It already contains the negative meaning, so `tidak belum` is wrong.', 'Saya belum siap.', '“I am not ready yet.”'),
    item('pernah', 'per.nah', 'Experiential aspect, used for “have ever done.”', 'Awak pernah pergi ke Langkawi?', '“Have you ever been to Langkawi?”'),
    item('semalam', 'se.ma.lam', '“Yesterday.” A time word can carry past reference even when the verb is unchanged.', 'Semalam saya belajar di perpustakaan.', '“Yesterday I studied at the library.”'),
    item('minggu lepas', 'ming.gu le.pas', '“Last week.” `Lepas` marks something that has passed.', 'Minggu lepas kami menonton wayang.', '“Last week we watched a movie.”'),
    item('menonton', 'me.non.ton', '“Watch.” The `meN-` prefix marks an active transitive verb.', 'Saya menonton drama semalam.', '“I watched a drama yesterday.”'),
    item('berjumpa', 'ber.jum.pa', '“Meet.” The `ber-` form is common for reciprocal or intransitive activities.', 'Saya berjumpa kawan di kafe.', '“I met a friend at a cafe.”'),
    item('membeli', 'mem.be.li', 'Active “buy.” Compare the bare root `beli` from casual speech.', 'Saya membeli buku baru.', '“I bought a new book.”'),
    item('sudah ... tetapi belum ...', 'su.dah ... te.ta.pi be.lum ...', 'A useful contrast frame for what is done and what remains unfinished.', 'Saya sudah mandi tetapi belum sarapan.', '“I have showered but have not had breakfast yet.”'),
    item('pernah / tidak pernah', 'per.nah / ti.dak per.nah', 'Use `tidak pernah` for “never.”', 'Saya tidak pernah naik kapal terbang.', '“I have never taken a plane.”'),
  ],
});
