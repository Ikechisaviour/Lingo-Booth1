const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u14',
  title: 'Level 1 · Unit 14: পারা ও অনুমতি — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about ability, permission, and obligation in everyday situations.',
  vocabularyGoal: 'Use skill, permission, and obligation language.',
  grammarGoal: 'Use `পারি`, `পারব`, `পারবেন?`, and `উচিত` in practical contexts.',
  speakingGoal: 'Say what you can do, ask permission, and state one obligation.',
  task: 'Handle three everyday ability and permission questions.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `আমি পারি`.'),
    practice('asking-permission', 'Asking permission', 'Use `পারব?` politely.'),
    practice('stating-obligation', 'Stating obligation', 'Use `উচিত`.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('আমি সাঁতার কাটতে পারি', 'ami shatar katte pari', '“I can swim.” `পারি` expresses ability.', 'আমি সাঁতার কাটতে পারি।', '“I can swim.”'),
    item('আমি আসতে পারব না', 'ami aste parbo na', '“I will not be able to come.” A practical inability phrase.', 'আজ আমি আসতে পারব না।', '“Today I cannot come.”'),
    item('আমি কি ঢুকতে পারি?', 'ami ki dhukte pari', '“May I enter?” A permission question.', 'আমি কি ঢুকতে পারি?', '“May I enter?”'),
    item('এখানে ধূমপান করা যাবে না', 'ekhane dhumpan kora jabe na', '“Smoking is not allowed here.” A common impersonal prohibition.', 'এখানে ধূমপান করা যাবে না।', '“Smoking is not allowed here.”'),
    item('আমার পড়া উচিত', 'amar poṛa uchit', '“I should study.” `উচিত` expresses advice or obligation.', 'পরীক্ষার জন্য আমার পড়া উচিত।', '“I should study for the exam.”'),
    item('দরকার', 'dorkar', '“Need.” A practical necessity noun.', 'আমার একটা পাসপোর্ট দরকার।', '“I need a passport.”'),
    item('শিখতে', 'shikhte', '“To learn.” Useful with ability and future goals.', 'আমি গাড়ি চালাতে শিখতে চাই।', '“I want to learn to drive.”'),
    item('হবে', 'hobe', '“Will be / must happen.” A versatile future/necessity form.', 'এটা করতে হবে।', '“This must be done.”'),
  ],
});
