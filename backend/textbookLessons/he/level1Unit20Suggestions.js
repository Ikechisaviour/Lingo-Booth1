const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u20',
  title: 'Level 1 · Unit 20: הצעות — Suggestions',
  category: 'suggestions',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make suggestions, accept them, reject them gently, and offer alternatives.',
  vocabularyGoal: 'Use outing, food, study, and leisure vocabulary that makes suggestions useful.',
  grammarGoal: 'Use `בוא / בואי`, `אפשר`, and `מה דעתך על ...?` for different suggestion styles.',
  speakingGoal: 'Suggest one activity, react to another, and offer an alternative.',
  task: 'Plan an evening with a friend.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use more than one suggestion frame.'),
    practice('accepting-suggestion', 'Accepting suggestion', 'Reply naturally.'),
    practice('offering-alternative', 'Offering alternative', 'Redirect the plan politely.'),
  ],
  relatedPools: ['topic-social', 'topic-plans'],
  items: [
    item('בוא / בואי', 'bo / bo’i', '“Come / let’s” masculine / feminine addressee forms.', 'בוא נלך לבית קפה.', '“Let’s go to a café.”'),
    item('אפשר', 'efshar', '“It is possible / may we.” Useful for softer proposals.', 'אפשר לראות סרט הערב?', '“Can we watch a film tonight?”'),
    item('מה דעתך על ...?', 'ma da’atcha al ...?', '“What do you think about ...?” A polite suggestion frame.', 'מה דעתך על מסעדה חדשה?', '“What do you think about a new restaurant?”'),
    item('רעיון טוב', 'ra’ayon tov', '“Good idea.” A compact acceptance phrase.', 'כן, זה רעיון טוב.', '“Yes, that is a good idea.”'),
    item('אני לא יכול היום', 'ani lo yakhol hayom', '“I cannot today.” Best followed by another proposal.', 'אני לא יכול היום, אבל מחר כן.', '“I cannot today, but tomorrow yes.”'),
    item('במקום זה', 'bimkom ze', '“Instead of that.” Useful for alternatives.', 'במקום זה, נלמד בבית.', '“Instead, we will study at home.”'),
    item('נראה סרט', 'nir’e seret', '“We will watch a film.” A ready-made suggestion phrase.', 'אולי נראה סרט?', '“Maybe we will watch a film?”'),
    item('נלמד יחד', 'nilmad yakhad', '“We will study together.” Useful in student life.', 'בוא נלמד יחד בספרייה.', '“Let’s study together in the library.”'),
    item('מתאים', 'mat’im', '“Suitable / works.” Useful for evaluating plans.', 'שבע מתאים לי.', '“Seven works for me.”'),
    item('מה עם ...?', 'ma im ...?', '“What about ...?” A compact alternative frame.', 'מה עם הפארק?', '“What about the park?”'),
  ],
});
