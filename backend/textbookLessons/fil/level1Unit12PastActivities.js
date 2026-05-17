const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u12',
  title: 'Level 1 · Unit 12: Ano ang ginawa mo? — Past Activities',
  category: 'past',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about what you did yesterday and last weekend.',
  vocabularyGoal: 'Use yesterday, last week, study, visit, watch, and rest vocabulary.',
  grammarGoal: 'Use completed aspect forms such as `nag-aral`, `pumunta`, and `nanood`.',
  speakingGoal: 'Tell a three-step story about yesterday.',
  task: 'Give a short recap of your last weekend.',
  expressionPractice: [
    practice('reporting-past', 'Reporting past actions', 'Use completed forms accurately.'),
    practice('sequencing-events', 'Sequencing events', 'Use `pagkatapos`.'),
    practice('asking-past-question', 'Asking past question', 'Use `Ano ang ginawa mo?`.'),
  ],
  relatedPools: ['topic-past', 'topic-routines'],
  items: [
    item('kahapon', 'kahapon', '“Yesterday.”', 'Nag-aral ako kahapon.', '“I studied yesterday.”'),
    item('noong nakaraang linggo', 'noong nakaraang linggo', '“Last week.”', 'Pumunta ako sa Cebu noong nakaraang linggo.', '“I went to Cebu last week.”'),
    item('nag-aral', 'nag-aral', '“Studied.” A completed actor-focus form.', 'Nag-aral ako ng Filipino.', '“I studied Filipino.”'),
    item('pumunta', 'pumunta', '“Went.”', 'Pumunta ako sa palengke.', '“I went to the market.”'),
    item('nanood', 'nanood', '“Watched.”', 'Nanood ako ng pelikula.', '“I watched a film.”'),
    item('bumisita', 'bumisita', '“Visited.”', 'Bumisita ako sa lola ko.', '“I visited my grandmother.”'),
    item('nagpahinga', 'nagpahinga', '“Rested.”', 'Nagpahinga ako noong Linggo.', '“I rested on Sunday.”'),
    item('pagkatapos', 'pagkatapos', '“Afterward / then.”', 'Kumain ako, pagkatapos natulog.', '“I ate, then slept.”'),
    item('Ano ang ginawa mo?', 'ano ang ginawa mo?', '“What did you do?”', 'Ano ang ginawa mo kahapon?', '“What did you do yesterday?”'),
    item('Wala akong masyadong ginawa', 'wala akong masyadong ginawa', '“I did not do much.” A natural modest answer.', 'Noong Sabado, wala akong masyadong ginawa.', '“On Saturday, I did not do much.”'),
  ],
});
