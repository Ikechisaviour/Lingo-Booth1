const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u14',
  title: 'Level 1 · Unit 14: Bisa dan Boleh — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Separate ability from permission with the high-frequency pair `bisa` and `boleh`.',
  vocabularyGoal: 'Use skill, permission, and request vocabulary in everyday situations.',
  grammarGoal: 'Use `bisa` for ability and `boleh` for permission or allowed action.',
  speakingGoal: 'Say what you can do, ask permission, and answer yes or no politely.',
  task: 'Handle three short classroom and daily-life permission questions.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `bisa` with one skill.'),
    practice('asking-permission', 'Asking permission', 'Use `boleh saya ...?`.'),
    practice('refusing-politely', 'Refusing politely', 'Use `maaf, tidak boleh` with a reason.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('bisa', 'bisa', '“Can / be able to.” It points to capacity, skill, or practical possibility.', 'Saya bisa berenang.', '“I can swim.”'),
    item('tidak bisa', 'tidak bisa', '“Cannot.” Add a short reason if the social setting calls for it.', 'Saya tidak bisa datang hari ini.', '“I cannot come today.”'),
    item('boleh', 'boleh', '“May / allowed to.” It is the main everyday permission word.', 'Boleh saya duduk di sini?', '“May I sit here?”'),
    item('tidak boleh', 'tidak boleh', '“May not / not allowed.” It is prohibition, not inability.', 'Di sini tidak boleh merokok.', '“Smoking is not allowed here.”'),
    item('mau', 'mau', '“Want to.” It often appears beside ability and permission when discussing intentions.', 'Saya mau belajar memasak.', '“I want to learn cooking.”'),
    item('harus', 'harus', '“Must / have to.” This creates obligation rather than ability or permission.', 'Kamu harus membawa kartu mahasiswa.', '“You must bring your student card.”'),
    item('perlu', 'perlu', '“Need to.” It is usually softer than `harus`.', 'Saya perlu latihan lebih banyak.', '“I need more practice.”'),
    item('pandai', 'pandai', '“Skilled / good at.” It praises competence rather than mere possibility.', 'Dia pandai bermain gitar.', '“She is good at playing guitar.”'),
    item('bolehkah saya ...?', 'bolehkah saya', 'A more careful permission frame than bare `boleh saya ...?`, useful in polite settings.', 'Bolehkah saya bertanya?', '“May I ask a question?”'),
    item('tentu saja', 'tentu saja', '“Of course.” A warm affirmative answer to a request.', 'Tentu saja, silakan masuk.', '“Of course, please come in.”'),
  ],
});
