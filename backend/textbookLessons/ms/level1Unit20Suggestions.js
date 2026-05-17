const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u20',
  title: 'Level 1 · Unit 20: Cadangan — Suggestions',
  category: 'suggestions',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make suggestions, accept them, and offer a gentle alternative.',
  vocabularyGoal: 'Use everyday activity words that commonly appear in friendly planning.',
  grammarGoal: 'Use `jom`, `apa kata`, `lebih baik`, and `kalau` for suggestions with different tones.',
  speakingGoal: 'Suggest a plan, respond, and modify it after one objection.',
  task: 'Plan a weekend outing with a friend in six turns.',
  expressionPractice: [
    practice('direct-suggestion', 'Direct suggestion', 'Use `jom` naturally with friends.'),
    practice('soft-suggestion', 'Soft suggestion', 'Use `apa kata` when proposing an option.'),
    practice('alternative', 'Alternative', 'Offer a better fit with `lebih baik`.'),
  ],
  relatedPools: ['topic-plans', 'topic-leisure'],
  items: [
    item('jom', 'jom', 'Friendly “let’s.” Very common in spoken Malay and strongly associated with informal invitations.', 'Jom makan malam bersama.', '“Let’s have dinner together.”'),
    item('apa kata', 'a.pa ka.ta', '“How about / what if.” Softer than a direct command.', 'Apa kata kita pergi Sabtu?', '“How about we go on Saturday?”'),
    item('lebih baik', 'le.bih ba.ik', '“It is better.” Useful for alternatives and advice.', 'Lebih baik kita pergi awal.', '“It is better that we go early.”'),
    item('kalau', 'ka.lau', '“If.” Makes a suggestion conditional and less pushy.', 'Kalau hujan, kita tengok wayang.', '“If it rains, we can watch a movie.”'),
    item('setuju', 'se.tu.ju', '“Agree.”', 'Saya setuju dengan cadangan itu.', '“I agree with that suggestion.”'),
    item('boleh juga', 'bo.leh ju.ga', '“That could work too.” A natural accepting response.', 'Kafe baharu itu? Boleh juga.', '“That new cafe? That could work too.”'),
    item('tak sesuai', 'tak se.su.ai', '“Not suitable.” `Tak` is the everyday spoken form of `tidak`.', 'Hari Ahad tak sesuai untuk saya.', '“Sunday does not suit me.”'),
    item('cuba', 'cu.ba', '“Try.” Useful for suggesting an experiment or alternative.', 'Cuba restoran baru di Bangsar.', '“Try the new restaurant in Bangsar.”'),
    item('pergi awal', 'per.gi a.wal', '“Go early.” Simple activity chunk for planning.', 'Jom pergi awal supaya tidak sesak.', '“Let’s go early so it is not crowded.”'),
    item('supaya', 'su.pa.ya', '“So that.” Adds a reason to a suggestion.', 'Kita tempah dulu supaya dapat tempat.', '“Let’s book first so we can get a seat.”'),
  ],
});
