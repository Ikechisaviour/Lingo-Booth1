const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u4',
  title: 'Level 1 · Unit 4: দৈনন্দিন কাজ — Daily Routines',
  category: 'daily-routines',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe a simple day using Bengali routine verbs and time expressions.',
  vocabularyGoal: 'Use morning, afternoon, evening, night, and common activity verbs.',
  grammarGoal: 'Use present habitual forms and keep subject-respect choices consistent.',
  speakingGoal: 'Describe your own day in five short sentences.',
  task: 'Tell a friend about your weekday routine.',
  expressionPractice: [
    practice('stating-routine', 'Stating routine', 'Use one habitual verb.'),
    practice('sequencing', 'Sequencing', 'Use `তারপর`.'),
    practice('asking-routine', 'Asking routine', 'Use one respectful question.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('সকাল', 'shokal', '“Morning.” A core time-of-day word.', 'আমি সকালে উঠি।', '“I get up in the morning.”'),
    item('দুপুর', 'dupur', '“Noon / afternoon.” Often tied to lunch and school schedules.', 'আমি দুপুরে ভাত খাই।', '“I eat rice at noon.”'),
    item('সন্ধ্যা', 'shondhya', '“Evening.” A useful daily-rhythm word.', 'সন্ধ্যায় আমি পড়ি।', '“In the evening I study.”'),
    item('ঘুমাই', 'ghumai', '“I sleep.” A common first-person habitual form.', 'আমি রাতে ঘুমাই।', '“I sleep at night.”'),
    item('খাই', 'khai', '“I eat.” Bengali verbs do not change for speaker gender.', 'আমি সকাল আটটায় নাশতা খাই।', '“I eat breakfast at eight in the morning.”'),
    item('পড়ি', 'poṛi', '“I study / read.” Context determines which English verb fits.', 'আমি বিশ্ববিদ্যালয়ে পড়ি।', '“I study at university.”'),
    item('তারপর', 'tarpor', '“Then / after that.” A simple sequence connector.', 'তারপর আমি বাসে যাই।', '“Then I go by bus.”'),
    item('আপনি কখন ওঠেন?', 'apni kokhon othen', '“When do you get up?” The respectful subject pairs with respectful verb form.', 'আপনি কখন ওঠেন?', '“When do you get up?”'),
  ],
});
