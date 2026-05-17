const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u20',
  title: 'Level 1 · Unit 20: পরামর্শ ও পরিকল্পনা — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, respond to them, and settle on a plan.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases.',
  grammarGoal: 'Use `চলুন`, `কেমন হয়`, and soft refusals with reasons.',
  speakingGoal: 'Suggest one activity, respond to one suggestion, and agree on a plan.',
  task: 'Plan a simple weekend outing.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use `চলুন` or `কেমন হয়`.'),
    practice('accepting', 'Accepting suggestion', 'Use one positive response plus detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and another option.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('চলুন', 'cholun', '“Let’s go / let us.” A polite inclusive suggestion.', 'চলুন কফি খাই।', '“Let’s drink coffee.”'),
    item('কেমন হয়?', 'kemon hoy', '“How would it be?” A soft suggestion frame.', 'শনিবার গেলে কেমন হয়?', '“How about going on Saturday?”'),
    item('ভালো idea', 'bhalo idea', '“Good idea.” Everyday speech often uses an English loan in this phrase.', 'এটা ভালো idea.', '“That is a good idea.”'),
    item('ঠিক আছে', 'thik achhe', '“Okay / alright.” A compact acceptance phrase.', 'ঠিক আছে, শনিবার যাই।', '“Okay, let’s go on Saturday.”'),
    item('দুঃখিত, পারব না', 'dukkhito parbo na', '“Sorry, I cannot.” A soft refusal.', 'দুঃখিত, শনিবার পারব না।', '“Sorry, I cannot on Saturday.”'),
    item('হয়তো', 'hoyto', '“Maybe.” Useful when the speaker is uncertain.', 'হয়তো রবিবার ভালো।', '“Maybe Sunday is better.”'),
    item('আরও ভালো', 'aro bhalo', '“Better.” A practical comparison phrase.', 'সকালে গেলে আরও ভালো।', '“It is better if we go in the morning.”'),
    item('তাহলে', 'tahole', '“Then / in that case.” A natural pivot after new information.', 'তাহলে পাঁচটায় দেখা করি।', '“Then let’s meet at five.”'),
  ],
});
