const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u12',
  title: 'Level 1 · Unit 12: מה עשית? — Past Activities',
  category: 'past',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about what you did yesterday and last weekend.',
  vocabularyGoal: 'Use yesterday, last week, study, visit, watch, and rest vocabulary.',
  grammarGoal: 'Use common past-tense forms for first person and ask `מה עשית?`.',
  speakingGoal: 'Tell a three-step story about yesterday.',
  task: 'Give a short recap of your last weekend.',
  expressionPractice: [
    practice('reporting-past', 'Reporting past actions', 'Use first-person past forms.'),
    practice('sequencing-events', 'Sequencing events', 'Use `ואז` naturally.'),
    practice('asking-past-question', 'Asking about past', 'Use `מה עשית?`.'),
  ],
  relatedPools: ['topic-past', 'topic-routines'],
  items: [
    item('אתמול', 'etmol', '“Yesterday.” The easiest time anchor for early past narration.', 'אתמול למדתי בבית.', '“Yesterday I studied at home.”'),
    item('בשבוע שעבר', 'bashavua she’avar', '“Last week.” Literally “in the week that passed.”', 'בשבוע שעבר ביקרתי חבר.', '“Last week I visited a friend.”'),
    item('עשיתי', 'asiti', '“I did.” A very useful irregular past form.', 'מה עשית אתמול?', '“What did you do yesterday?”'),
    item('למדתי', 'lamadti', '“I studied.” A regular first-person past form.', 'למדתי עברית בערב.', '“I studied Hebrew in the evening.”'),
    item('הלכתי', 'halakhti', '“I went.” A common past form worth memorizing whole.', 'הלכתי לשוק.', '“I went to the market.”'),
    item('ראיתי', 'ra’iti', '“I saw / watched.” Useful for films and people.', 'ראיתי סרט.', '“I watched a film.”'),
    item('ביקרתי', 'bikarti', '“I visited.” Common for family and friends.', 'ביקרתי את סבתא שלי.', '“I visited my grandmother.”'),
    item('נחתי', 'nakhti', '“I rested.” A practical weekend verb.', 'נחתי בבית.', '“I rested at home.”'),
    item('ואז', 've’az', '“And then.” A compact sequencing word.', 'אכלתי ואז ישנתי.', '“I ate and then slept.”'),
    item('לא עשיתי הרבה', 'lo asiti harbe', '“I did not do much.” A natural low-key answer.', 'בשבת לא עשיתי הרבה.', '“On Saturday I did not do much.”'),
  ],
});
