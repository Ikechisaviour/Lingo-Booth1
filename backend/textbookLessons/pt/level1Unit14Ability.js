const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u14',
  title: 'Level 1 · Unit 14: Poder e Saber — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Separate ability, knowledge, and permission with `poder` and `saber`.',
  vocabularyGoal: 'Use skill, permission, and obligation language.',
  grammarGoal: 'Use `poder` for can/may and `saber` for knowing how to do something.',
  speakingGoal: 'Say what you can do, ask permission, and describe one learned skill.',
  task: 'Handle three everyday permission and ability questions.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `sei` for learned skill.'),
    practice('asking-permission', 'Asking permission', 'Use `posso ...?`.'),
    practice('stating-obligation', 'Stating obligation', 'Use `preciso` or `tenho que`.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('posso', 'POH-soo', '“I can / may.” It often asks permission in real interactions.', 'Posso entrar?', '“May I come in?”'),
    item('não posso', 'nao POH-soo', '“I cannot / may not.” Context decides whether the limit is ability or permission.', 'Não posso sair agora.', '“I cannot leave now.”'),
    item('sei', 'say', '“I know how to.” Use `saber` for learned ability rather than general permission.', 'Sei nadar.', '“I know how to swim.”'),
    item('não sei', 'nao say', '“I do not know how to / I do not know.” Very useful for honest beginner replies.', 'Não sei cozinhar bem.', '“I do not know how to cook well.”'),
    item('preciso', 'preh-SEE-zoo', '“I need.” It normally takes `de` before nouns and an infinitive directly before verbs.', 'Preciso estudar mais.', '“I need to study more.”'),
    item('tenho que', 'TEN-yoo kee', '“I have to.” A common everyday obligation frame.', 'Tenho que levar meu documento.', '“I have to bring my document.”'),
    item('é permitido', 'eh per-mee-CHEE-doo', '“It is allowed.” More formal than ordinary spoken `pode`.', 'É permitido usar o celular aqui?', '“Is it allowed to use a cellphone here?”'),
    item('proibido', 'pro-ee-BEE-doo', '“Forbidden / prohibited.” Common on signs and notices.', 'É proibido fumar.', '“Smoking is prohibited.”'),
    item('aprender', 'a-pren-DER', '“To learn.” It often appears with a new skill.', 'Quero aprender a dirigir.', '“I want to learn to drive.”'),
    item('conseguir', 'kon-seh-GEER', '“To manage / be able to successfully do.” It is useful when ability depends on circumstance.', 'Consegui terminar o exercício.', '“I managed to finish the exercise.”'),
  ],
});
