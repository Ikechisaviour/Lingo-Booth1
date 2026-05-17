const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u21',
  title: 'Level 1 · Unit 21: Pag-asa at Pangarap — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use `gusto kong`, `sana`, and contemplated forms for future meaning.',
  speakingGoal: 'Describe one realistic plan and one longer-term dream.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating plan', 'Use a contemplated form clearly.'),
    practice('stating-hope', 'Stating hope', 'Use `sana`.'),
    practice('stating-dream', 'Stating dream', 'Describe a longer-term aspiration.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('kinabukasan', 'kinabukasan', '“Future.”', 'Iniisip ko ang aking kinabukasan.', '“I think about my future.”'),
    item('pangarap', 'pangarap', '“Dream / aspiration.”', 'Pangarap kong maging doktor.', '“My dream is to become a doctor.”'),
    item('gusto kong', 'gusto kong', '“I want to.”', 'Gusto kong matutong mahusay sa Filipino.', '“I want to learn Filipino well.”'),
    item('sana', 'sana', '“I hope / hopefully.” A compact particle-like hope marker.', 'Sana makapunta ako sa Pilipinas.', '“I hope I can go to the Philippines.”'),
    item('mag-aaral ako', 'mag-aaral ako', '“I will study.”', 'Mag-aaral ako ng engineering sa susunod na taon.', '“I will study engineering next year.”'),
    item('magtratrabaho ako', 'magtratrabaho ako', '“I will work.”', 'Magtratrabaho ako sa malaking kumpanya.', '“I will work in a large company.”'),
    item('maging', 'maging', '“To become.”', 'Gusto kong maging guro.', '“I want to become a teacher.”'),
    item('kung', 'kung', '“If.” Useful for realistic conditions around goals.', 'Kung may pagkakataon, magtatrabaho ako sa ibang bansa.', '“If there is an opportunity, I will work abroad.”'),
    item('pagkakataon', 'pagkakataon', '“Opportunity / chance.”', 'Kailangan ko ng magandang pagkakataon.', '“I need a good opportunity.”'),
    item('balang araw', 'balang araw', '“One day.”', 'Balang araw, magsusulat ako ng libro.', '“One day, I will write a book.”'),
  ],
});
