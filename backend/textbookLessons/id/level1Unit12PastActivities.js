const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u12',
  title: 'Level 1 · Unit 12: Kegiatan yang Sudah Lewat — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed and not-yet-completed activities without changing verb forms.',
  vocabularyGoal: 'Use common activity verbs and past-time expressions.',
  grammarGoal: 'Use `sudah`, `belum`, and time adverbs to express completion and non-completion.',
  speakingGoal: 'Say what you already did, what you have not done yet, and what happened yesterday.',
  task: 'Give a short update about yesterday and today.',
  expressionPractice: [
    practice('completed-action', 'Completed action', 'Use `sudah` with one activity.'),
    practice('not-yet', 'Not yet', 'Use `belum` naturally.'),
    practice('yesterday-update', 'Yesterday update', 'Use `kemarin` with a clear sequence.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('sudah', 'sudah', '“Already / completed.” It marks completion, not a dedicated past tense form.', 'Saya sudah makan.', '“I have already eaten.”'),
    item('belum', 'belum', '“Not yet.” This is the natural opposite of `sudah`.', 'Saya belum mandi.', '“I have not showered yet.”'),
    item('tadi pagi', 'tadi pagi', '“Earlier this morning.” `Tadi` anchors something earlier in the same day.', 'Tadi pagi saya olahraga.', '“Earlier this morning I exercised.”'),
    item('kemarin malam', 'kemarin malam', '“Last night.” Indonesian combines ordinary time words rather than changing verbs.', 'Kemarin malam saya menonton film.', '“Last night I watched a film.”'),
    item('pergi', 'pergi', '“Went / go.” The verb itself stays stable; time words carry the past meaning.', 'Kemarin saya pergi ke kantor pos.', '“Yesterday I went to the post office.”'),
    item('membeli', 'membeli', '“To buy.” The `meN-` prefix is common in active verbs and worth noticing early.', 'Saya membeli buah tadi pagi.', '“I bought fruit this morning.”'),
    item('belajar', 'belajar', '“To study.” `Ber-` appears in many intransitive or activity verbs.', 'Saya sudah belajar dua jam.', '“I already studied for two hours.”'),
    item('lalu', 'lalu', '“Then / ago.” It links sequences and also appears in time phrases such as `minggu lalu`.', 'Saya makan, lalu saya tidur.', '“I ate, then I slept.”'),
    item('setelah itu', 'setelah itu', '“After that.” A clearer sequence connector for short narratives.', 'Setelah itu, saya pulang.', '“After that, I went home.”'),
    item('apa yang kamu lakukan?', 'apa yang kamu lakukan', '“What did you do?” `Yang` helps package the action being asked about.', 'Apa yang kamu lakukan kemarin?', '“What did you do yesterday?”'),
  ],
});
