const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u20',
  title: 'Level 1 · Unit 20: Saran dan Rencana — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, accept them, reject them softly, and choose a plan together.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases for everyday coordination.',
  grammarGoal: 'Use `ayo`, `mari`, and `bagaimana kalau` with different levels of warmth and formality.',
  speakingGoal: 'Suggest one activity, respond to a suggestion, and settle on a plan.',
  task: 'Plan a simple weekend outing with a friend.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Choose `ayo`, `mari`, or `bagaimana kalau`.'),
    practice('accepting-suggestion', 'Accepting suggestion', 'Use a positive response plus one detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and alternative.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('ayo', 'ayo', '“Let’s.” Warm, direct, and common with friends.', 'Ayo makan siang bersama.', '“Let’s have lunch together.”'),
    item('mari', 'mari', '“Let us.” Slightly more formal or polished than `ayo`.', 'Mari kita mulai.', '“Let us begin.”'),
    item('bagaimana kalau ...?', 'bagaimana kalau', '“How about ...?” A softer planning frame that invites discussion.', 'Bagaimana kalau kita pergi Sabtu?', '“How about we go on Saturday?”'),
    item('setuju', 'setuju', '“Agree.” It is a clear acceptance word in plans and opinions.', 'Saya setuju dengan rencana itu.', '“I agree with that plan.”'),
    item('ide bagus', 'ide bagus', '“Good idea.” Friendly and very reusable in planning talk.', 'Itu ide bagus.', '“That is a good idea.”'),
    item('maaf, saya tidak bisa', 'maaf saya tidak bisa', '“Sorry, I cannot.” A polite refusal needs less repair when it includes apology.', 'Maaf, saya tidak bisa hari Minggu.', '“Sorry, I cannot on Sunday.”'),
    item('kalau begitu', 'kalau begitu', '“In that case / then.” It helps the conversation pivot after new information.', 'Kalau begitu, kita pergi Senin saja.', '“In that case, let’s go on Monday instead.”'),
    item('lebih baik', 'lebih baik', '“It is better.” Useful for comparing two possible plans.', 'Lebih baik kita berangkat pagi.', '“It is better if we leave in the morning.”'),
    item('nanti', 'nanti', '“Later.” A small but important planning word with flexible timing.', 'Kita bahas nanti.', '“We will discuss it later.”'),
    item('jadi', 'jadi', '“So / therefore / become.” In plans it often marks the settled result.', 'Jadi, kita bertemu jam lima.', '“So, we meet at five.”'),
  ],
});
