const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u14',
  title: 'Level 1 · Unit 14: Kebolehan — Ability',
  category: 'ability',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say what you can do, cannot do yet, and are learning to do.',
  vocabularyGoal: 'Use practical skill words for language, sport, work, and digital life.',
  grammarGoal: 'Use `boleh`, `pandai`, `tahu`, and `sedang belajar` without flattening them into one English “can.”',
  speakingGoal: 'Describe three abilities and one skill you are still developing.',
  task: 'Introduce your abilities in a short club-registration conversation.',
  expressionPractice: [
    practice('ability', 'Ability', 'Use `boleh` for possibility or capability.'),
    practice('skill', 'Learned skill', 'Use `pandai` when the focus is competence.'),
    practice('knowledge', 'Knowing how', 'Use `tahu` when the focus is knowledge.'),
  ],
  relatedPools: ['topic-skills', 'topic-clubs'],
  items: [
    item('boleh', 'bo.leh', 'General “can / may.” It can express ability, permission, or possibility depending on context.', 'Saya boleh berenang.', '“I can swim.”'),
    item('tidak boleh', 'ti.dak bo.leh', '“Cannot / may not.” The context decides whether it is inability or prohibition.', 'Saya tidak boleh datang esok.', '“I cannot come tomorrow.”'),
    item('pandai', 'pan.dai', '“Skilled / good at.” Often used for learned abilities.', 'Dia pandai memasak.', '“She is good at cooking.”'),
    item('tahu', 'ta.hu', '“Know.” Use it when the focus is knowing how or knowing information.', 'Saya tahu guna Excel.', '“I know how to use Excel.”'),
    item('sedang belajar', 'se.dang be.la.jar', '“Currently learning.” `Sedang` marks ongoing action.', 'Saya sedang belajar memandu.', '“I am learning to drive.”'),
    item('bercakap', 'ber.ca.kap', '“Speak.” The `ber-` form is common with intransitive verbal activities.', 'Saya boleh bercakap bahasa Melayu sedikit.', '“I can speak a little Malay.”'),
    item('menulis', 'me.nu.lis', '“Write.” Active verb from root `tulis`.', 'Dia pandai menulis laporan.', '“He is good at writing reports.”'),
    item('menggunakan', 'me.nggu.na.kan', '“Use.” The `-kan` suffix often gives a transitive sense.', 'Saya tahu menggunakan komputer.', '“I know how to use a computer.”'),
    item('masih belum', 'ma.sih be.lum', '“Still not yet.” Useful for a skill in progress.', 'Saya masih belum pandai berenang.', '“I am still not good at swimming yet.”'),
    item('boleh cuba', 'bo.leh cu.ba', '“Can try.” A gentle bridge from ability to willingness.', 'Saya belum pandai, tetapi saya boleh cuba.', '“I am not skilled yet, but I can try.”'),
  ],
});
