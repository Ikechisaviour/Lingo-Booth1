const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u20',
  title: 'Level 1 · Unit 20: الاقتراحات — Suggestions',
  category: 'suggestions',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make simple suggestions, accept them, reject them politely, and offer alternatives.',
  vocabularyGoal: 'Use outing, food, study, and free-time words that make suggestions useful.',
  grammarGoal: 'Use `هيا`, `لنـ`, and `ما رأيك في ...؟` for different suggestion styles.',
  speakingGoal: 'Suggest an activity, react to another suggestion, and propose an alternative.',
  task: 'Plan one evening with a friend.',
  expressionPractice: [
    practice('making-suggestion', 'Making a suggestion', 'Use more than one suggestion frame.'),
    practice('accepting-suggestion', 'Accepting a suggestion', 'Use a natural positive reply.'),
    practice('offering-alternative', 'Offering an alternative', 'Reject gently and propose another plan.'),
  ],
  relatedPools: ['topic-social', 'topic-plans'],
  items: [
    item('هيا', 'hayyā', '“Come on / let’s.” An energetic invitation frame.', 'هيا نذهب إلى المقهى.', '“Let’s go to the café.”'),
    item('لنذهب', 'linadhhab', '“Let us go.” A more explicitly grammatical suggestion form.', 'لنذهب بعد الدرس.', '“Let us go after class.”'),
    item('ما رأيك في ...؟', 'mā raʾyuka fī ...?', '“What do you think about ...?” A softer way to float an idea.', 'ما رأيك في مشاهدة فيلم؟', '“What do you think about watching a film?”'),
    item('فكرة جيدة', 'fikra jayyida', '“Good idea.” A compact acceptance phrase.', 'نعم، هذه فكرة جيدة.', '“Yes, that is a good idea.”'),
    item('لا أستطيع اليوم', 'lā astaṭīʿu al-yawm', '“I cannot today.” A polite enough refusal when followed by an alternative.', 'لا أستطيع اليوم، لكن غدًا مناسب.', '“I cannot today, but tomorrow suits me.”'),
    item('بدلًا من ذلك', 'badalan min dhālik', '“Instead of that.” Useful for redirecting a plan.', 'بدلًا من ذلك، لنأكل في البيت.', '“Instead, let us eat at home.”'),
    item('نشاهد فيلمًا', 'nushāhidu filman', '“We watch a film.” A ready-made activity phrase.', 'هل نشاهد فيلمًا الليلة؟', '“Shall we watch a film tonight?”'),
    item('نذاكر معًا', 'nudhākiru maʿan', '“We study together.” A common student-life suggestion.', 'لنذاكر معًا في المكتبة.', '“Let us study together in the library.”'),
    item('مناسب', 'munāsib', '“Suitable / convenient.” Helpful for evaluating suggested times or places.', 'الساعة السابعة مناسبة.', '“Seven o’clock is suitable.”'),
    item('ماذا عن ...؟', 'mādhā ʿan ...?', '“What about ...?” Another compact alternative-suggestion frame.', 'ماذا عن المطعم الجديد؟', '“What about the new restaurant?”'),
  ],
});
