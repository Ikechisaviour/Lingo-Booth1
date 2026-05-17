const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u12',
  title: 'Level 1 · Unit 12: Что вы делали? — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about what happened yesterday using gendered Russian past forms.',
  vocabularyGoal: 'Use past-time markers and everyday activity verbs.',
  grammarGoal: 'Use `-л` past forms with masculine, feminine, neuter, and plural agreement.',
  speakingGoal: 'Say what you did yesterday and ask another person one past question.',
  task: 'Give a short update about yesterday.',
  expressionPractice: [
    practice('stating-past', 'Stating past action', 'Use one correctly gendered past verb.'),
    practice('sequencing', 'Sequencing', 'Use `потом` or `после этого`.'),
    practice('asking-past', 'Asking about past', 'Use `что ты делал/делала?`.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('я был / я была', 'ya byl / ya byla', '“I was” masculine / feminine. Russian past tense agrees with the subject’s gender in singular.', 'Вчера я был дома. / Вчера я была дома.', '“Yesterday I was at home.”'),
    item('я ходил / я ходила', 'ya khodil / ya khodila', '“I went / used to go on foot” masculine / feminine. Motion verbs begin to matter early.', 'Вчера я ходила в магазин.', '“Yesterday I went to the shop.”'),
    item('я ел / я ела', 'ya yel / ya yela', '“I ate” masculine / feminine.', 'Утром я ел кашу.', '“In the morning I ate porridge.”'),
    item('я учился / я училась', 'ya uchilsya / ya uchilas', '“I studied” masculine / feminine. Reflexive verbs keep the gendered past ending before the reflexive part.', 'Вчера я училась в библиотеке.', '“Yesterday I studied in the library.”'),
    item('потом', 'potom', '“Then / afterwards.” A simple sequence word for beginner narratives.', 'Потом я встретил друга.', '“Then I met a friend.”'),
    item('после этого', 'posle etogo', '“After that.” Slightly more explicit than `потом`.', 'После этого я пошёл домой.', '“After that I went home.”'),
    item('на прошлой неделе', 'na proshloy nedele', '“Last week.” A common past-time phrase.', 'На прошлой неделе мы были в музее.', '“Last week we were at the museum.”'),
    item('что ты делал / делала?', 'chto ty delal / delala', '“What did you do?” The question also reflects the addressee’s gender.', 'Что ты делала вчера?', '“What did you do yesterday?”'),
  ],
});
