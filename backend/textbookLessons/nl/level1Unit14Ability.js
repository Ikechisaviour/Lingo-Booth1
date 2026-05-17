const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u14',
  title: 'Level 1 · Unit 14: Kunnen en Mogen — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Separate ability, permission, and obligation with Dutch modal verbs.',
  vocabularyGoal: 'Use skill, permission, and obligation language.',
  grammarGoal: 'Use `kunnen` for ability, `mogen` for permission, and `moeten` for obligation.',
  speakingGoal: 'Say what you can do, ask permission, and state one obligation.',
  task: 'Handle three everyday ability and permission questions.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use `ik kan`.'),
    practice('asking-permission', 'Asking permission', 'Use `mag ik ...?`.'),
    practice('stating-obligation', 'Stating obligation', 'Use `ik moet`.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('ik kan', 'ik kan', '“I can.” Use it for ability or practical possibility.', 'Ik kan zwemmen.', '“I can swim.”'),
    item('ik kan niet', 'ik kan neet', '“I cannot.” A core negative ability phrase.', 'Ik kan vandaag niet komen.', '“I cannot come today.”'),
    item('mag ik ...?', 'makh ik', '“May I ...?” Use it for permission, not learned skill.', 'Mag ik hier zitten?', '“May I sit here?”'),
    item('dat mag niet', 'dat makh neet', '“That is not allowed.” A concise prohibition phrase.', 'Hier roken? Dat mag niet.', '“Smoking here? That is not allowed.”'),
    item('ik moet', 'ik moot', '“I must / have to.” A common obligation modal.', 'Ik moet mijn paspoort meenemen.', '“I have to bring my passport.”'),
    item('ik hoef niet', 'ik hoof neet', '“I do not need to.” A useful Dutch-specific contrast with English negation.', 'Ik hoef morgen niet te werken.', '“I do not need to work tomorrow.”'),
    item('leren', 'LAY-ren', '“To learn.” Useful with new abilities.', 'Ik wil autorijden leren.', '“I want to learn to drive.”'),
    item('het lukt', 'hət lukt', '“It works / I manage.” A natural progress phrase.', 'Het lukt al beter.', '“It is already going better.”'),
  ],
});
