const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u20',
  title: 'Level 1 · Unit 20: Fare proposte — Suggestions',
  category: 'suggestions',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make suggestions, accept them, reject them gently, and offer alternatives.',
  vocabularyGoal: 'Use outing, food, study, and leisure vocabulary that makes suggestions useful.',
  grammarGoal: 'Use `andiamo`, `perché non`, and `che ne dici di ...?`.',
  speakingGoal: 'Suggest one activity, react to another, and offer an alternative.',
  task: 'Plan an evening with a friend.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use more than one suggestion frame.'),
    practice('accepting-suggestion', 'Accepting suggestion', 'Reply naturally.'),
    practice('offering-alternative', 'Offering alternative', 'Redirect politely.'),
  ],
  relatedPools: ['topic-social', 'topic-plans'],
  items: [
    item('andiamo', 'andiamo', '“Let’s go.” A very common first-person plural suggestion.', 'Andiamo al bar.', '“Let’s go to the café.”'),
    item('perché non ...?', 'perché non ...?', '“Why don’t we ...?” A soft suggestion frame.', 'Perché non guardiamo un film?', '“Why don’t we watch a film?”'),
    item('che ne dici di ...?', 'che ne dici di ...?', '“What do you say about ...?” A conversational proposal frame.', 'Che ne dici di una pizza?', '“What do you say about a pizza?”'),
    item('buona idea', 'buona idea', '“Good idea.”', 'Sì, è una buona idea.', '“Yes, it is a good idea.”'),
    item('oggi non posso', 'oggi non posso', '“I cannot today.” Best followed by another proposal.', 'Oggi non posso, ma domani sì.', '“I cannot today, but tomorrow yes.”'),
    item('invece', 'invece', '“Instead.”', 'Invece studiamo a casa.', '“Instead, let’s study at home.”'),
    item('guardiamo un film', 'guardiamo un film', '“Let’s watch a film.”', 'Stasera guardiamo un film?', '“Shall we watch a film tonight?”'),
    item('studiamo insieme', 'studiamo insieme', '“Let’s study together.”', 'Studiamo insieme in biblioteca.', '“Let’s study together in the library.”'),
    item('va bene', 'va bene', '“It works / okay.”', 'Alle sette va bene.', '“Seven o’clock works.”'),
    item('e se ...?', 'e se ...?', '“What if ...?” Another light alternative frame.', 'E se andiamo al parco?', '“What if we go to the park?”'),
  ],
});
