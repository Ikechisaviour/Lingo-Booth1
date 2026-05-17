const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u20',
  title: 'Level 1 · Unit 20: Предложения и планы — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, respond to them, and settle on a plan.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases.',
  grammarGoal: 'Use `давай`, `может`, and short response structures naturally.',
  speakingGoal: 'Suggest one activity, accept or reject a suggestion, and agree on a plan.',
  task: 'Plan a simple weekend outing.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use `давай` or `может`.'),
    practice('accepting', 'Accepting suggestion', 'Use one positive response plus detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and another option.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('давай', 'davay', '“Let’s.” Warm and very common with peers.', 'Давай выпьем кофе после пары.', '“Let’s have coffee after class.”'),
    item('может, ...?', 'mozhet', '“Maybe / how about ...?” A softer suggestion frame.', 'Может, пойдём в кино?', '“Maybe we should go to the cinema?”'),
    item('хорошая идея', 'khoroshaya ideya', '“Good idea.” Agreement makes the adjective feminine with `идея`.', 'Это хорошая идея.', '“That is a good idea.”'),
    item('договорились', 'dogovorilis', '“Agreed.” A very natural way to close a plan.', 'Хорошо, договорились.', '“Alright, agreed.”'),
    item('извини, я не могу', 'izvini ya ne mogu', '“Sorry, I cannot.” A polite refusal start.', 'Извини, я не могу в субботу.', '“Sorry, I cannot on Saturday.”'),
    item('может быть', 'mozhet byt', '“Maybe.” Useful when the speaker is uncertain.', 'Может быть, воскресенье лучше.', '“Maybe Sunday is better.”'),
    item('лучше', 'luchshe', '“Better.” A practical comparison word in planning.', 'Лучше выйти пораньше.', '“It is better to leave earlier.”'),
    item('тогда', 'togda', '“Then / in that case.” It helps the plan pivot after new information.', 'Тогда встретимся в пять.', '“Then we will meet at five.”'),
  ],
});
