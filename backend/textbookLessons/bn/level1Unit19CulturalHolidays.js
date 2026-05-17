const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u19',
  title: 'Level 1 · Unit 19: উৎসব ও ঐতিহ্য — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about Bengali festivals, greetings, and family customs.',
  vocabularyGoal: 'Use holiday, family, greeting, and tradition words.',
  grammarGoal: 'Use habitual present forms and simple future forms to describe customs and plans.',
  speakingGoal: 'Describe one festival, say what people usually do, and give an appropriate greeting.',
  task: 'Explain one Bengali festival to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Introduce one festival clearly.'),
    practice('describing-custom', 'Describing custom', 'Use one repeated action.'),
    practice('giving-greeting', 'Giving greeting', 'Use the formula that fits the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('পয়লা বৈশাখ', 'poila boishakh', 'Bengali New Year, a major cultural celebration in Bangladesh and West Bengal.', 'পয়লা বৈশাখে মানুষ নতুন পোশাক পরে।', '“At Poila Boishakh people wear new clothes.”'),
    item('দুর্গাপূজা', 'durgapuja', 'A major Bengali Hindu festival, especially visible in West Bengal.', 'দুর্গাপূজায় প্যান্ডেল দেখা হয়।', '“At Durga Puja people visit pandals.”'),
    item('ঈদ', 'eid', 'A major Muslim festival in Bangladesh and Bengali-speaking Muslim communities.', 'ঈদে পরিবার একসঙ্গে হয়।', '“At Eid the family gathers together.”'),
    item('নববর্ষ', 'noboborsho', '“New Year.” A useful general festival noun.', 'শুভ নববর্ষ!', '“Happy New Year!”'),
    item('সাধারণত', 'shadharonoto', '“Usually.” A useful word for customs.', 'সাধারণত আমরা আত্মীয়দের দেখি।', '“Usually we see relatives.”'),
    item('উদযাপন করা', 'udjapon kora', '“To celebrate.” A central festival verb.', 'আপনারা কীভাবে ঈদ উদযাপন করেন?', '“How do you celebrate Eid?”'),
    item('শুভেচ্ছা', 'shubhechchha', '“Greetings / good wishes.” A useful holiday word.', 'সবাইকে শুভেচ্ছা জানাই।', '“I send greetings to everyone.”'),
    item('ঐতিহ্য', 'oitihyo', '“Tradition.” A bridge noun for cultural explanation.', 'এটা খুব গুরুত্বপূর্ণ ঐতিহ্য।', '“This is a very important tradition.”'),
  ],
});
