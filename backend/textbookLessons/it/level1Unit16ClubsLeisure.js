const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u16',
  title: 'Level 1 · Unit 16: Hobby e tempo libero — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby nouns and activity verbs for sports, reading, music, and clubs.',
  grammarGoal: 'Use `mi piace`, regular present-tense verbs, and frequency expressions.',
  speakingGoal: 'Describe two hobbies and invite someone to one activity.',
  task: 'Introduce your leisure routine and one club you would like to join.',
  expressionPractice: [
    practice('naming-hobby', 'Naming hobby', 'Use one clear hobby word or phrase.'),
    practice('stating-frequency', 'Stating frequency', 'Use `ogni settimana`.'),
    practice('inviting-activity', 'Inviting activity', 'Ask someone to join you.'),
  ],
  relatedPools: ['topic-leisure', 'topic-social'],
  items: [
    item('hobby', 'hobby', '“Hobby.” The English loanword is common in Italian too.', 'Qual è il tuo hobby?', '“What is your hobby?”'),
    item('lettura', 'lettura', '“Reading.”', 'Mi piace la lettura.', '“I like reading.”'),
    item('sport', 'sport', '“Sport.”', 'Faccio sport ogni settimana.', '“I do sport every week.”'),
    item('calcio', 'calcio', '“Football / soccer.”', 'Gioco a calcio con gli amici.', '“I play football with friends.”'),
    item('musica', 'musica', '“Music.”', 'Ascolto musica la sera.', '“I listen to music in the evening.”'),
    item('club', 'club', '“Club.”', 'Vorrei iscrivermi a un club di fotografia.', '“I would like to join a photography club.”'),
    item('tempo libero', 'tempo libero', '“Free time.”', 'Che cosa fai nel tempo libero?', '“What do you do in your free time?”'),
    item('ogni settimana', 'ogni settimana', '“Every week.”', 'Vado in palestra ogni settimana.', '“I go to the gym every week.”'),
    item('vuoi venire?', 'vuoi venire?', '“Do you want to come?” A simple invitation.', 'Vuoi venire con noi?', '“Do you want to come with us?”'),
    item('con gli amici', 'con gli amici', '“With friends.”', 'Guardo film con gli amici.', '“I watch films with friends.”'),
  ],
});
