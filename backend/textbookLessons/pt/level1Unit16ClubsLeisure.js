const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u16',
  title: 'Level 1 · Unit 16: Clubes e Lazer — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use `gostar de`, `costumar`, and frequency adverbs in natural order.',
  speakingGoal: 'Describe one hobby, ask about someone else’s hobby, and recommend a club.',
  task: 'Introduce your hobby and choose one campus club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use `gosto de` plus an activity.'),
    practice('frequency', 'Talking frequency', 'Use `sempre`, `às vezes`, or `raramente`.'),
    practice('recommending', 'Recommending club', 'Give one reason with `porque`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('hobby', 'HOH-bee', 'The common loanword for hobby in everyday speech.', 'Meu hobby é fotografia.', '“My hobby is photography.”'),
    item('clube', 'KLOO-bee', '“Club.” Used for school clubs, sports clubs, and social groups.', 'Participo do clube de teatro.', '“I take part in the theater club.”'),
    item('ler', 'ler', '“To read.” One of the simplest leisure infinitives.', 'Gosto de ler romances.', '“I like reading novels.”'),
    item('tocar violão', 'toh-KAR vee-oh-LAO', '“Play guitar.” `Violão` is the everyday acoustic guitar word in Brazil.', 'Ela toca violão muito bem.', '“She plays guitar very well.”'),
    item('praticar esporte', 'pra-chee-KAR es-POR-chee', '“Practice sport / play sports.” Portuguese often uses `praticar` where English uses “do.”', 'Eu pratico esporte três vezes por semana.', '“I play sports three times a week.”'),
    item('sempre', 'SEM-pree', '“Always.” Frequency adverbs often appear before the main verb.', 'Sempre estudo à noite.', '“I always study at night.”'),
    item('às vezes', 'az VEH-zeez', '“Sometimes.” The contraction is fixed in this phrase.', 'Às vezes vejo filmes em casa.', '“Sometimes I watch films at home.”'),
    item('tempo livre', 'TEM-poo LEE-vree', '“Free time.” A useful frame for hobby questions.', 'O que você faz no tempo livre?', '“What do you do in your free time?”'),
    item('participar de', 'par-chee-see-PAR djee', '“Participate in.” It requires `de` before the group or event.', 'Quero participar de um clube de debate.', '“I want to join a debate club.”'),
    item('interessante', 'een-teh-heh-SAN-chee', '“Interesting.” A helpful reason word for recommendations.', 'Esse clube é interessante porque tem muitas atividades.', '“That club is interesting because it has many activities.”'),
  ],
});
