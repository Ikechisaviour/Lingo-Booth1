const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u5',
  title: 'Level 1 · Unit 5: বাংলার জীবন — Life in Bengal',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe everyday Bengali life through food, family, language, and city culture.',
  vocabularyGoal: 'Use food, family, city, and culture words tied to Bengali daily life.',
  grammarGoal: 'Notice classifiers, honorific choices, and that Bengali has no grammatical gender agreement in verbs.',
  speakingGoal: 'Describe one feature of Bengali daily life and compare it with your own.',
  task: 'Introduce daily life in Bengal to a visiting friend.',
  expressionPractice: [
    practice('describing-place', 'Describing place', 'Use one city or culture noun.'),
    practice('describing-routine', 'Describing routine', 'Use one food or family expression.'),
    practice('noticing-respect', 'Noticing respect', 'Choose one appropriate pronoun.'),
  ],
  relatedPools: ['topic-culture', 'topic-city'],
  items: [
    item('বাংলা', 'bangla', '“Bengali / Bangla.” It names both the language and a cultural identity.', 'আমি বাংলা শিখছি।', '“I am learning Bengali.”'),
    item('ঢাকা', 'dhaka', '“Dhaka.” The Bangladeshi capital is a practical city anchor for the curriculum.', 'ঢাকা খুব ব্যস্ত শহর।', '“Dhaka is a very busy city.”'),
    item('কলকাতা', 'kolkata', '“Kolkata.” A major Bengali-speaking cultural center in India.', 'কলকাতা বইয়ের জন্য বিখ্যাত।', '“Kolkata is famous for books.”'),
    item('ভাত', 'bhat', '“Rice.” A central everyday food noun in Bengali life.', 'অনেক মানুষ প্রতিদিন ভাত খান।', '“Many people eat rice every day.”'),
    item('মাছ', 'machh', '“Fish.” Fish-and-rice is one of the best-known Bengali food pairings.', 'ভাত আর মাছ জনপ্রিয় খাবার।', '“Rice and fish are popular foods.”'),
    item('পরিবার', 'poribar', '“Family.” A high-value culture and daily-life noun.', 'আমার পরিবার ঢাকায় থাকে।', '“My family lives in Dhaka.”'),
    item('আপনি / তুমি', 'apni / tumi', 'Respectful “you” / familiar “you.” Social distance matters much more than English translation suggests.', 'আপনি কেমন আছেন? / তুমি কেমন আছ?', '“How are you?” respectful / familiar.'),
    item('একটা বই', 'ekta boi', '“One book.” The classifier `-টা` is a very visible Bengali pattern learners should notice early.', 'আমার একটা বই আছে।', '“I have one book.”'),
  ],
});
