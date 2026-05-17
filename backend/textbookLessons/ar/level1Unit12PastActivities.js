const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ar', {
  slug: 'ar-l1u12',
  title: 'Level 1 · Unit 12: ماذا فعلت؟ — Past Activities',
  category: 'past',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about what happened yesterday and last week with common past-tense verbs.',
  vocabularyGoal: 'Use yesterday, last week, study, visit, watch, and go-out vocabulary.',
  grammarGoal: 'Use the perfect/past form with first-person and third-person agreement.',
  speakingGoal: 'Tell a short sequence of three things you did yesterday.',
  task: 'Give a brief recap of your last weekend.',
  expressionPractice: [
    practice('reporting-past', 'Reporting the past', 'Use first-person past verbs accurately.'),
    practice('sequencing-events', 'Sequencing events', 'Use `ثم` to order actions.'),
    practice('asking-past-question', 'Asking about the past', 'Use `ماذا فعلت؟` and related questions.'),
  ],
  relatedPools: ['topic-past', 'topic-routines'],
  items: [
    item('أمس', 'ams', '“Yesterday.” A useful anchor for early past-tense storytelling.', 'ذهبت إلى السوق أمس.', '“I went to the market yesterday.”'),
    item('الأسبوع الماضي', 'al-usbūʿ al-māḍī', '“Last week.” The adjective agrees with the masculine noun `أسبوع`.', 'درست كثيرًا الأسبوع الماضي.', '“I studied a lot last week.”'),
    item('ذهبت', 'dhahabtu', '“I went.” The final `-تُ` marks first-person singular in the past.', 'ذهبت إلى الجامعة.', '“I went to the university.”'),
    item('درست', 'darastu', '“I studied.” Another high-frequency first-person past verb.', 'درست العربية مساءً.', '“I studied Arabic in the evening.”'),
    item('زرت', 'zurtu', '“I visited.” Useful for family, friends, and places.', 'زرت جدتي يوم الجمعة.', '“I visited my grandmother on Friday.”'),
    item('شاهدت', 'shāhadtu', '“I watched.” Common for films, matches, and television.', 'شاهدت فيلمًا.', '“I watched a film.”'),
    item('خرجت', 'kharajtu', '“I went out.” Distinct from simply going somewhere; it foregrounds leaving the house.', 'خرجت مع أصدقائي.', '“I went out with my friends.”'),
    item('ثم', 'thumma', '“Then.” Use it to connect actions in sequence.', 'درست ثم نمت.', '“I studied, then I slept.”'),
    item('ماذا فعلت؟', 'mādhā faʿalta?', '“What did you do?” A direct past-tense question to a masculine addressee.', 'ماذا فعلت أمس؟', '“What did you do yesterday?”'),
    item('لم أفعل شيئًا', 'lam afʿal shayʾan', '“I did nothing.” A useful negative reply using `لم` with the jussive.', 'لم أفعل شيئًا في المساء.', '“I did nothing in the evening.”'),
  ],
});
