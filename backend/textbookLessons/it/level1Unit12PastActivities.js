const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u12',
  title: 'Level 1 · Unit 12: Che cosa hai fatto? — Past Activities',
  category: 'past',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about what you did yesterday and last weekend.',
  vocabularyGoal: 'Use yesterday, last week, study, visit, watch, and rest vocabulary.',
  grammarGoal: 'Use the passato prossimo with `avere` and `essere` in beginner-safe examples.',
  speakingGoal: 'Tell a three-step story about yesterday.',
  task: 'Give a short recap of your last weekend.',
  expressionPractice: [
    practice('reporting-past', 'Reporting past actions', 'Use the passato prossimo accurately.'),
    practice('sequencing-events', 'Sequencing events', 'Use `poi`.'),
    practice('asking-past-question', 'Asking past question', 'Use `Che cosa hai fatto?`.'),
  ],
  relatedPools: ['topic-past', 'topic-routines'],
  items: [
    item('ieri', 'ieri', '“Yesterday.”', 'Ieri ho studiato a casa.', '“Yesterday I studied at home.”'),
    item('la settimana scorsa', 'la settimana scorsa', '“Last week.”', 'La settimana scorsa sono andato a Firenze.', '“Last week I went to Florence.”'),
    item('ho studiato', 'ho studiato', '“I studied.” Passato prossimo with `avere`.', 'Ho studiato italiano.', '“I studied Italian.”'),
    item('sono andato / andata', 'sono andato / andata', '“I went.” Motion verbs often use `essere`, and the participle agrees with speaker gender.', 'Sono andata al mercato.', '“I went to the market.”'),
    item('ho visto', 'ho visto', '“I saw / watched.”', 'Ho visto un film.', '“I watched a film.”'),
    item('ho visitato', 'ho visitato', '“I visited.”', 'Ho visitato mia nonna.', '“I visited my grandmother.”'),
    item('mi sono riposato / riposata', 'mi sono riposato / riposata', '“I rested.” A reflexive verb using `essere`.', 'Domenica mi sono riposata.', '“On Sunday I rested.”'),
    item('poi', 'poi', '“Then.” Useful for simple sequencing.', 'Ho mangiato e poi ho dormito.', '“I ate and then slept.”'),
    item('Che cosa hai fatto?', 'che cosa hai fatto?', '“What did you do?”', 'Che cosa hai fatto ieri?', '“What did you do yesterday?”'),
    item('non ho fatto molto', 'non ho fatto molto', '“I did not do much.” A natural low-key reply.', 'Sabato non ho fatto molto.', '“On Saturday I did not do much.”'),
  ],
});
