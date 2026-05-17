const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u20',
  title: 'Level 1 · Unit 20: Sugestões e Planos — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, respond to them, and settle on a plan.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases.',
  grammarGoal: 'Use `vamos`, `que tal`, and soft refusal phrases with reasons.',
  speakingGoal: 'Suggest one activity, respond to one suggestion, and agree on a plan.',
  task: 'Plan a simple weekend outing.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use `vamos` or `que tal`.'),
    practice('accepting', 'Accepting suggestion', 'Use a positive response plus one detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and another option.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('vamos', 'VA-moos', '“Let’s go / let’s.” A warm, direct suggestion form.', 'Vamos tomar café depois da aula.', '“Let’s have coffee after class.”'),
    item('que tal ...?', 'kee TAO', '“How about ...?” A soft proposal frame.', 'Que tal irmos ao cinema?', '“How about going to the cinema?”'),
    item('boa ideia', 'BOH-a ee-DAY-a', '“Good idea.” Friendly and reusable in planning talk.', 'Boa ideia, vamos no sábado.', '“Good idea, let’s go on Saturday.”'),
    item('combinado', 'kom-bee-NA-doo', '“Agreed / deal.” A natural way to close a plan.', 'Então, combinado.', '“So, agreed.”'),
    item('desculpe, não posso', 'desh-KOOL-pee nao POH-soo', '“Sorry, I cannot.” A polite refusal start.', 'Desculpe, não posso hoje.', '“Sorry, I cannot today.”'),
    item('talvez', 'tao-VEZ', '“Maybe.” Useful when the speaker does not want to commit yet.', 'Talvez domingo seja melhor.', '“Maybe Sunday is better.”'),
    item('melhor', 'meh-LYOR', '“Better.” A planning comparison word.', 'É melhor sairmos cedo.', '“It is better if we leave early.”'),
    item('mais tarde', 'myz TAR-jee', '“Later.” Handy for postponing or softening a plan.', 'Podemos falar mais tarde.', '“We can talk later.”'),
    item('então', 'en-TAO', '“Then / so.” It often introduces the final decision.', 'Então, nos vemos às seis.', '“So, we will see each other at six.”'),
    item('porque', 'por-KEE', '“Because.” Reasons make accepted or refused plans sound human rather than mechanical.', 'Prefiro sábado porque trabalho na sexta.', '“I prefer Saturday because I work on Friday.”'),
  ],
});
