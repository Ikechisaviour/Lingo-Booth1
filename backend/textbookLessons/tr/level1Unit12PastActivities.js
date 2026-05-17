const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u12',
  title: 'Level 1 · Unit 12: Dün Ne Yaptın? — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed past actions with the witnessed past `-di` series.',
  vocabularyGoal: 'Use past-time markers and common activity verbs.',
  grammarGoal: 'Use `-dı/-di/-du/-dü` and related forms shaped by vowel harmony and consonant voicing.',
  speakingGoal: 'Say what you did yesterday and ask someone else one past question.',
  task: 'Give a short update about yesterday.',
  expressionPractice: [
    practice('stating-past', 'Stating past action', 'Use one `-di` past form.'),
    practice('sequencing', 'Sequencing', 'Use `sonra`.'),
    practice('asking-past', 'Asking about past', 'Use `dün ne yaptın?`.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('gittim', 'git-TİM', '“I went.” The consonant and vowel shape the exact suffix form.', 'Dün pazara gittim.', '“Yesterday I went to the market.”'),
    item('yedim', 'ye-DİM', '“I ate.” A compact high-frequency past form.', 'Sabah simit yedim.', '“In the morning I ate simit.”'),
    item('çalıştım', 'ça-lış-TIM', '“I studied / worked.” The hard consonant triggers the `t` variant.', 'Dün akşam çalıştım.', '“Yesterday evening I studied.”'),
    item('izledim', 'iz-le-DİM', '“I watched.” A useful leisure verb in the past.', 'Gece film izledim.', '“At night I watched a film.”'),
    item('sonra', 'SON-ra', '“Then / afterwards.” A simple sequence connector.', 'Sonra eve döndüm.', '“Then I returned home.”'),
    item('geçen hafta', 'ge-ÇEN HAF-ta', '“Last week.” A common past-time phrase.', 'Geçen hafta müzeye gittik.', '“Last week we went to the museum.”'),
    item('dün ne yaptın?', 'DÜN ne yap-TIN', '“What did you do yesterday?” A core past-question frame.', 'Dün ne yaptın?', '“What did you do yesterday?”'),
    item('hiç', 'HİÇ', '“Ever / at all” depending on context, useful in negative and experience questions.', 'Hiç Türk kahvesi içtin mi?', '“Have you ever drunk Turkish coffee?”'),
  ],
});
