const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u14',
  title: 'Level 1 · Unit 14: Kakayahan — Ability',
  category: 'ability',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say what you can do, cannot do, and are learning to do.',
  vocabularyGoal: 'Use skill verbs for speaking, reading, cooking, driving, and swimming.',
  grammarGoal: 'Use `marunong`, `kayang`, and negation with `hindi`.',
  speakingGoal: 'Describe three abilities and one skill you are still learning.',
  task: 'Give a short introduction to your abilities.',
  expressionPractice: [
    practice('stating-skill', 'Stating learned skill', 'Use `marunong`.'),
    practice('stating-capacity', 'Stating capacity', 'Use `kaya`.'),
    practice('learning-skill', 'Learning skill', 'Use `natututo`.'),
  ],
  relatedPools: ['topic-ability', 'topic-self'],
  items: [
    item('marunong', 'marunong', '“Knows how to.” Best for learned skills.', 'Marunong akong magbasa ng Filipino.', '“I know how to read Filipino.”'),
    item('kaya', 'kaya', '“Can / able to manage.” Useful for capacity or possibility.', 'Kaya kong magluto.', '“I can cook.”'),
    item('hindi marunong', 'hindi marunong', '“Does not know how to.”', 'Hindi ako marunong magmaneho.', '“I do not know how to drive.”'),
    item('magbasa', 'magbasa', '“To read.”', 'Marunong akong magbasa.', '“I know how to read.”'),
    item('magsalita', 'magsalita', '“To speak.”', 'Nagsasalita ako ng kaunting Filipino.', '“I speak a little Filipino.”'),
    item('magsulat', 'magsulat', '“To write.”', 'Kaya kong magsulat ng maikling mensahe.', '“I can write a short message.”'),
    item('magluto', 'magluto', '“To cook.”', 'Marunong akong magluto ng adobo.', '“I know how to cook adobo.”'),
    item('magmaneho', 'magmaneho', '“To drive.”', 'Marunong ka bang magmaneho?', '“Do you know how to drive?”'),
    item('lumangoy', 'lumangoy', '“To swim.”', 'Natututo akong lumangoy.', '“I am learning to swim.”'),
    item('kaunti / mahusay', 'kaunti / mahusay', '“A little / well.”', 'Nagsasalita ako ng Filipino nang kaunti.', '“I speak a little Filipino.”'),
  ],
});
