const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u21',
  title: 'Level 1 · Unit 21: Harapan dan Impian — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about future hopes, realistic plans, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use `ingin`, `mau`, `akan`, and `semoga` to separate desire, intention, and hope.',
  speakingGoal: 'Describe one near plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating plan', 'Use `akan` for one intended action.'),
    practice('stating-desire', 'Stating desire', 'Use `ingin` or `mau` naturally.'),
    practice('stating-hope', 'Stating hope', 'Use `semoga` with a meaningful wish.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('masa depan', 'masa depan', '“Future.” Literally a “time ahead,” it is the common abstract noun for one’s future.', 'Saya memikirkan masa depan saya.', '“I think about my future.”'),
    item('impian', 'impian', '“Dream / aspiration.” It is more goal-like than the ordinary sleep noun `mimpi`.', 'Impian saya adalah menjadi dokter.', '“My dream is to become a doctor.”'),
    item('ingin', 'ingin', '“Want / wish to.” It often sounds a little more deliberate or formal than `mau`.', 'Saya ingin belajar bahasa Indonesia dengan baik.', '“I want to learn Indonesian well.”'),
    item('mau', 'mau', '“Want / going to.” It is everyday and can express desire or immediate intention.', 'Saya mau bekerja setelah lulus.', '“I want to work after graduating.”'),
    item('akan', 'akan', '“Will.” It marks planned or expected future action without changing the verb.', 'Saya akan belajar di luar negeri.', '“I will study abroad.”'),
    item('semoga', 'semoga', '“Hopefully / may it be so.” It introduces a hope rather than a firm plan.', 'Semoga saya bisa pergi ke Jakarta tahun depan.', '“I hope I can go to Jakarta next year.”'),
    item('menjadi', 'menjadi', '“To become.” It is central for career and identity goals.', 'Saya ingin menjadi guru.', '“I want to become a teacher.”'),
    item('kalau ada kesempatan', 'kalau ada kesempatan', '“If there is an opportunity.” A natural condition around future plans.', 'Kalau ada kesempatan, saya akan bekerja di Indonesia.', '“If there is an opportunity, I will work in Indonesia.”'),
    item('suatu hari nanti', 'suatu hari nanti', '“One day.” A warm phrase for more distant dreams.', 'Suatu hari nanti saya ingin menulis buku.', '“One day I want to write a book.”'),
    item('karena', 'karena', '“Because.” A goal sounds more personal when the learner can add a reason.', 'Saya ingin menjadi dokter karena saya ingin membantu orang.', '“I want to become a doctor because I want to help people.”'),
  ],
});
