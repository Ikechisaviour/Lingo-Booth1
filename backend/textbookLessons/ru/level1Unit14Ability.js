const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u14',
  title: 'Level 1 · Unit 14: Уметь и мочь — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Separate learned skill from situational ability and permission.',
  vocabularyGoal: 'Use skill, permission, and obligation language.',
  grammarGoal: 'Use `уметь` for learned skills and `мочь` for possibility or permission.',
  speakingGoal: 'Say what you know how to do, ask permission, and state one obligation.',
  task: 'Handle three everyday ability and permission questions.',
  expressionPractice: [
    practice('stating-skill', 'Stating skill', 'Use `я умею`.'),
    practice('asking-permission', 'Asking permission', 'Use `можно ...?`.'),
    practice('stating-obligation', 'Stating obligation', 'Use `нужно` or `надо`.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('я умею', 'ya umeyu', '“I know how to.” Use this for learned skills.', 'Я умею плавать.', '“I know how to swim.”'),
    item('я не умею', 'ya ne umeyu', '“I do not know how to.” Honest and useful for beginners.', 'Я не умею играть на гитаре.', '“I do not know how to play guitar.”'),
    item('я могу', 'ya mogu', '“I can.” This often means situational possibility rather than learned skill.', 'Я могу прийти вечером.', '“I can come in the evening.”'),
    item('можно?', 'mozhno', '“May I / is it allowed?” A compact permission question.', 'Можно войти?', '“May I come in?”'),
    item('нельзя', 'nelzya', '“Not allowed / impossible.” Very common on signs and in rules.', 'Здесь нельзя курить.', '“Smoking is not allowed here.”'),
    item('мне нужно', 'mne nuzhno', '“I need to.” A useful impersonal necessity frame.', 'Мне нужно больше практиковаться.', '“I need to practice more.”'),
    item('надо', 'nado', '“Need to / must.” Slightly more colloquial and direct than `нужно` in many uses.', 'Надо взять паспорт.', '“You need to take a passport.”'),
    item('получается', 'poluchayetsya', '“It is working out / I am managing.” A gentle way to talk about progress in a skill.', 'У меня уже получается читать по-русски.', '“I am already managing to read in Russian.”'),
  ],
});
