const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u21',
  title: 'Level 1 · Unit 21: Plannen en Dromen — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about future plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration words.',
  grammarGoal: 'Use `ik wil`, `ik ga`, and `ik hoop` to separate desire, plan, and hope.',
  speakingGoal: 'Describe one realistic plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-desire', 'Stating desire', 'Use `ik wil`.'),
    practice('stating-plan', 'Stating plan', 'Use `ik ga` plus infinitive.'),
    practice('stating-hope', 'Stating hope', 'Use `ik hoop`.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('toekomst', 'TOO-komst', '“Future.” A common abstract noun for planning and goals.', 'Ik denk vaak aan mijn toekomst.', '“I often think about my future.”'),
    item('droom', 'drohm', '“Dream.” It can be literal or aspirational.', 'Mijn droom is dokter worden.', '“My dream is to become a doctor.”'),
    item('ik wil', 'ik vil', '“I want.” A direct expression of desire.', 'Ik wil goed Nederlands leren.', '“I want to learn Dutch well.”'),
    item('ik ga studeren', 'ik kha sty-DAY-ren', '“I am going to study.” `Gaan + infinitive` is a common future frame.', 'Ik ga techniek studeren.', '“I am going to study engineering.”'),
    item('ik hoop', 'ik hohp', '“I hope.” Often followed by a clause with subordinate word order.', 'Ik hoop dat ik naar Nederland kan gaan.', '“I hope that I can go to the Netherlands.”'),
    item('worden', 'VOR-den', '“To become.” A core verb for career dreams.', 'Ik wil leraar worden.', '“I want to become a teacher.”'),
    item('als ik de kans krijg', 'als ik də kans khreykh', '“If I get the chance.” A natural condition around future plans.', 'Als ik de kans krijg, wil ik in Amsterdam werken.', '“If I get the chance, I want to work in Amsterdam.”'),
    item('ooit', 'OYT', '“Someday / ever.” A compact word for distant hopes.', 'Ooit wil ik een boek schrijven.', '“Someday I want to write a book.”'),
  ],
});
