const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u14',
  title: 'Level 1 · Unit 14: Capacità — Ability',
  category: 'ability',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say what you can do, cannot do, and are learning to do.',
  vocabularyGoal: 'Use skill verbs for speaking, reading, cooking, driving, and swimming.',
  grammarGoal: 'Use `sapere` for learned skills and `potere` for possibility.',
  speakingGoal: 'Describe three abilities and one skill you are still learning.',
  task: 'Give a short introduction to your abilities.',
  expressionPractice: [
    practice('stating-skill', 'Stating learned skill', 'Use `so + infinitive`.'),
    practice('stating-possibility', 'Stating possibility', 'Use `posso + infinitive`.'),
    practice('learning-skill', 'Learning skill', 'Use `sto imparando a ...`.'),
  ],
  relatedPools: ['topic-ability', 'topic-self'],
  items: [
    item('so', 'so', '“I know how to.” Use `sapere` for learned skills.', 'So leggere in italiano.', '“I can read in Italian.”'),
    item('posso', 'posso', '“I can / may.” Use `potere` for possibility or permission.', 'Posso entrare?', '“May I come in?”'),
    item('leggere', 'leggere', '“To read.”', 'So leggere il giornale.', '“I can read the newspaper.”'),
    item('parlare', 'parlare', '“To speak.”', 'Parlo un po’ di italiano.', '“I speak a little Italian.”'),
    item('scrivere', 'scrivere', '“To write.”', 'So scrivere un messaggio breve.', '“I can write a short message.”'),
    item('cucinare', 'cucinare', '“To cook.”', 'So cucinare la pasta.', '“I can cook pasta.”'),
    item('guidare', 'guidare', '“To drive.”', 'Sai guidare?', '“Do you know how to drive?”'),
    item('nuotare', 'nuotare', '“To swim.”', 'Sto imparando a nuotare.', '“I am learning to swim.”'),
    item('non so', 'non so', '“I do not know how.”', 'Non so suonare il piano.', '“I cannot play the piano.”'),
    item('bene / un po’', 'bene / un po’', '“Well / a little.” Useful for honest skill descriptions.', 'Parlo un po’ di italiano.', '“I speak a little Italian.”'),
  ],
});
