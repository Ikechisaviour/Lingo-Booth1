const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u21',
  title: 'Level 1 · Unit 21: Speranze e sogni — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use `vorrei`, `spero di`, and simple future forms.',
  speakingGoal: 'Describe one realistic plan and one longer-term dream.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating plan', 'Use a future form clearly.'),
    practice('stating-hope', 'Stating hope', 'Use `spero di`.'),
    practice('stating-dream', 'Stating dream', 'Describe a longer-term aspiration.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('futuro', 'futuro', '“Future.”', 'Penso al mio futuro.', '“I think about my future.”'),
    item('sogno', 'sogno', '“Dream.”', 'Il mio sogno è diventare medico.', '“My dream is to become a doctor.”'),
    item('vorrei', 'vorrei', '“I would like.” Useful for aspirations as well as polite requests.', 'Vorrei imparare bene l’italiano.', '“I would like to learn Italian well.”'),
    item('spero di', 'spero di', '“I hope to.”', 'Spero di visitare Napoli.', '“I hope to visit Naples.”'),
    item('studierò', 'studierò', '“I will study.”', 'Studierò ingegneria l’anno prossimo.', '“I will study engineering next year.”'),
    item('lavorerò', 'lavorerò', '“I will work.”', 'Lavorerò in una grande azienda.', '“I will work in a large company.”'),
    item('diventare', 'diventare', '“To become.”', 'Vorrei diventare insegnante.', '“I would like to become a teacher.”'),
    item('se', 'se', '“If.” Useful for realistic conditions around goals.', 'Se avrò l’occasione, lavorerò all’estero.', '“If I have the chance, I will work abroad.”'),
    item('occasione', 'occasione', '“Opportunity / chance.”', 'Cerco una buona occasione.', '“I am looking for a good opportunity.”'),
    item('un giorno', 'un giorno', '“One day.”', 'Un giorno scriverò un libro.', '“One day I will write a book.”'),
  ],
});
