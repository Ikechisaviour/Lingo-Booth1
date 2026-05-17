const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u21',
  title: 'Level 1 · Unit 21: Planos e Sonhos — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about near plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration words.',
  grammarGoal: 'Use `quero`, `vou`, and `espero` to separate desire, planned action, and hope.',
  speakingGoal: 'Describe one realistic plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating plan', 'Use `vou` plus infinitive.'),
    practice('stating-desire', 'Stating desire', 'Use `quero`.'),
    practice('stating-hope', 'Stating hope', 'Use `espero`.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('futuro', 'foo-TOO-roo', '“Future.” A high-value abstract noun for goals and planning.', 'Penso muito no meu futuro.', '“I think a lot about my future.”'),
    item('sonho', 'SON-yoo', '“Dream.” It can be literal or aspirational depending on context.', 'Meu sonho é ser médica.', '“My dream is to be a doctor.”'),
    item('quero', 'KEH-roo', '“I want.” A direct expression of desire.', 'Quero aprender português muito bem.', '“I want to learn Portuguese very well.”'),
    item('vou estudar', 'voh esh-too-DAR', '“I am going to study.” `Ir + infinitive` is the most useful beginner future frame.', 'Vou estudar engenharia na universidade.', '“I am going to study engineering at university.”'),
    item('espero', 'esh-PEH-roo', '“I hope.” Often followed by an infinitive or a clause.', 'Espero viajar para o Brasil um dia.', '“I hope to travel to Brazil one day.”'),
    item('trabalhar', 'tra-ba-LYAR', '“To work.” A central verb in future plans.', 'Quero trabalhar em uma empresa internacional.', '“I want to work in an international company.”'),
    item('ser', 'ser', '“To be.” Career dreams often need `ser` rather than `estar`.', 'Quero ser professora.', '“I want to be a teacher.”'),
    item('se tiver oportunidade', 'see chee-VER oh-por-too-nee-DA-jee', '“If I have the opportunity.” A natural condition around future plans.', 'Se tiver oportunidade, vou morar em Lisboa.', '“If I have the opportunity, I will live in Lisbon.”'),
    item('um dia', 'oong JEE-a', '“One day.” A warm phrase for longer-term dreams.', 'Um dia quero escrever um livro.', '“One day I want to write a book.”'),
    item('porque', 'por-KEE', '“Because.” It lets the learner connect ambition with motive.', 'Quero ser médica porque gosto de ajudar pessoas.', '“I want to be a doctor because I like helping people.”'),
  ],
});
