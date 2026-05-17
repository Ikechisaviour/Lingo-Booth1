const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u12',
  title: 'Level 1 · Unit 12: O Que Você Fez? — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed past activities using a first pass at the pretérito perfeito.',
  vocabularyGoal: 'Use common past-time markers and daily activity verbs.',
  grammarGoal: 'Use a small practical set of regular and irregular past forms such as `fui`, `comi`, `estudei`, and `fiz`.',
  speakingGoal: 'Say what you did yesterday and ask someone else about one past action.',
  task: 'Give a short update about yesterday.',
  expressionPractice: [
    practice('stating-past', 'Stating past action', 'Use one completed verb form.'),
    practice('sequencing', 'Sequencing', 'Use `depois` or `então`.'),
    practice('asking-past', 'Asking about past', 'Use `o que você fez?`.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('ontem', 'ON-teng', '“Yesterday.” It anchors the whole sentence in the past.', 'Ontem fui ao mercado.', '“Yesterday I went to the market.”'),
    item('fui', 'foo-EE', '“I went / I was.” This irregular past form belongs to both `ir` and `ser`.', 'Fui à biblioteca depois da aula.', '“I went to the library after class.”'),
    item('comi', 'koh-MEE', '“I ate.” A regular -er verb in the first-person past.', 'Comi arroz e feijão no almoço.', '“I ate rice and beans at lunch.”'),
    item('estudei', 'esh-too-DAY', '“I studied.” A regular -ar verb in the first-person past.', 'Estudei português por duas horas.', '“I studied Portuguese for two hours.”'),
    item('fiz', 'feez', '“I did / made.” A useful irregular past form of `fazer`.', 'Fiz a lição de casa.', '“I did the homework.”'),
    item('depois', 'djee-POYS', '“After / afterwards.” It creates a clear beginner sequence.', 'Depois, encontrei meus amigos.', '“Afterwards, I met my friends.”'),
    item('então', 'en-TAO', '“Then / so.” It can move a story forward or mark a conclusion.', 'Então voltei para casa.', '“Then I returned home.”'),
    item('semana passada', 'seh-MA-na pa-SA-da', '“Last week.” The adjective agrees with feminine `semana`.', 'Na semana passada, visitei meus avós.', '“Last week, I visited my grandparents.”'),
    item('o que você fez?', 'oo kee voh-SEH fez', '“What did you do?” A core past-question frame.', 'O que você fez ontem?', '“What did you do yesterday?”'),
    item('já', 'zha', '“Already / ever” depending on context. It often appears with completed experience questions.', 'Você já almoçou?', '“Have you already had lunch?”'),
  ],
});
