const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u12',
  title: 'Level 1 · Unit 12: গতকাল কী করলেন? — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed past activities with Bengali past forms.',
  vocabularyGoal: 'Use past-time markers and everyday activity verbs.',
  grammarGoal: 'Use past forms such as `গেছি`, `খেয়েছি`, `পড়েছি`, and notice that verbs do not change for speaker gender.',
  speakingGoal: 'Say what you did yesterday and ask someone else one past question.',
  task: 'Give a short update about yesterday.',
  expressionPractice: [
    practice('stating-past', 'Stating past action', 'Use one completed past form.'),
    practice('sequencing', 'Sequencing', 'Use `তারপর`.'),
    practice('asking-past', 'Asking about past', 'Use `গতকাল কী করলেন?`.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('গেছি', 'gechhi', '“I have gone / went.” A common completed form.', 'গতকাল বাজারে গেছি।', '“Yesterday I went to the market.”'),
    item('খেয়েছি', 'kheyechhi', '“I ate / have eaten.” A high-frequency completed form.', 'সকালে নাশতা খেয়েছি।', '“I ate breakfast in the morning.”'),
    item('পড়েছি', 'poṛechhi', '“I studied / have read.” Context selects the English translation.', 'গতরাতে আমি পড়েছি।', '“Last night I studied.”'),
    item('দেখেছি', 'dekhechhi', '“I saw / watched.” Useful for leisure narratives.', 'আমি একটা সিনেমা দেখেছি।', '“I watched a film.”'),
    item('তারপর', 'tarpor', '“Then / after that.” A simple sequence connector.', 'তারপর বাড়ি ফিরেছি।', '“Then I returned home.”'),
    item('গত সপ্তাহে', 'goto shoptah-e', '“Last week.” A common past-time phrase.', 'গত সপ্তাহে আমরা জাদুঘরে গেছি।', '“Last week we went to the museum.”'),
    item('গতকাল কী করলেন?', 'gotokal ki korlen', '“What did you do yesterday?” Respectful question form.', 'গতকাল কী করলেন?', '“What did you do yesterday?”'),
    item('ইতিমধ্যে', 'itimoddhe', '“Already.” Useful with completed actions.', 'আমি ইতিমধ্যে দুপুরের খাবার খেয়েছি।', '“I have already eaten lunch.”'),
  ],
});
