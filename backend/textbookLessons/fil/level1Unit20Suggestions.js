const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u20',
  title: 'Level 1 · Unit 20: Mga Mungkahi — Suggestions',
  category: 'suggestions',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make suggestions, accept them, reject them gently, and offer alternatives.',
  vocabularyGoal: 'Use outing, food, study, and leisure vocabulary that makes suggestions useful.',
  grammarGoal: 'Use `tara`, `pwede ba tayong`, and `paano kung` for different suggestion styles.',
  speakingGoal: 'Suggest one activity, react to another, and offer an alternative.',
  task: 'Plan an evening with a friend.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use more than one suggestion frame.'),
    practice('accepting-suggestion', 'Accepting suggestion', 'Reply naturally.'),
    practice('offering-alternative', 'Offering alternative', 'Redirect politely.'),
  ],
  relatedPools: ['topic-social', 'topic-plans'],
  items: [
    item('Tara', 'tara', '“Let’s go.” A very common invitation opener.', 'Tara, pumunta tayo sa café.', '“Let’s go to the café.”'),
    item('Pwede ba tayong ...?', 'pwede ba tayong ...?', '“Can we ...?” A neutral suggestion frame.', 'Pwede ba tayong manood ng pelikula?', '“Can we watch a film?”'),
    item('Paano kung ...?', 'paano kung ...?', '“What if ...?” A softer proposal frame.', 'Paano kung kumain tayo sa labas?', '“What if we eat out?”'),
    item('Magandang ideya', 'magandang ideya', '“Good idea.”', 'Oo, magandang ideya iyan.', '“Yes, that is a good idea.”'),
    item('Hindi ako puwede ngayon', 'hindi ako puwede ngayon', '“I cannot today.” Best followed by another option.', 'Hindi ako puwede ngayon, pero bukas puwede.', '“I cannot today, but tomorrow works.”'),
    item('Sa halip', 'sa halip', '“Instead.”', 'Sa halip, mag-aral tayo sa bahay.', '“Instead, let’s study at home.”'),
    item('Manood tayo ng pelikula', 'manood tayo ng pelikula', '“Let’s watch a film.”', 'Manood tayo ng pelikula mamaya.', '“Let’s watch a film later.”'),
    item('Mag-aral tayo nang magkasama', 'mag-aral tayo nang magkasama', '“Let’s study together.”', 'Mag-aral tayo nang magkasama sa aklatan.', '“Let’s study together in the library.”'),
    item('Ayos', 'ayos', '“Okay / that works.”', 'Alas siyete ay ayos sa akin.', '“Seven o’clock works for me.”'),
    item('Ano naman ang ...?', 'ano naman ang ...?', '“What about ...?” A useful alternative frame.', 'Ano naman ang parke?', '“What about the park?”'),
  ],
});
