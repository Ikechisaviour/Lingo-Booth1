const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u16',
  title: 'Level 1 · Unit 16: Clubs en Vrije Tijd — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use `graag`, `houden van`, and frequency adverbs in natural order.',
  speakingGoal: 'Describe one hobby, ask about another person’s hobby, and recommend a club.',
  task: 'Introduce your hobby and choose one student club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use `ik ... graag`.'),
    practice('frequency', 'Talking frequency', 'Use `vaak` or `soms`.'),
    practice('recommending', 'Recommending club', 'Give one reason with `omdat`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('hobby', 'HOB-bee', '“Hobby.” A familiar loanword in Dutch too.', 'Mijn hobby is fotografie.', '“My hobby is photography.”'),
    item('club', 'klup', '“Club.” Useful for campus, sports, and social groups.', 'Ik zit bij de debatclub.', '“I am in the debate club.”'),
    item('ik lees graag', 'ik lays khrahkh', '“I like reading.” Dutch often uses `graag` with the verb rather than a separate “like” verb.', 'Ik lees graag romans.', '“I like reading novels.”'),
    item('gitaar spelen', 'khi-TAHR SPAY-len', '“Play guitar.”', 'Zij speelt graag gitaar.', '“She likes playing guitar.”'),
    item('sporten', 'SPOR-ten', '“To exercise / do sports.” A useful ordinary leisure verb.', 'Ik sport drie keer per week.', '“I exercise three times per week.”'),
    item('vaak', 'fahk', '“Often.” A common frequency adverb.', 'Wij kijken vaak films.', '“We often watch films.”'),
    item('soms', 'soms', '“Sometimes.” Useful for moderate frequency.', 'Soms kook ik thuis.', '“Sometimes I cook at home.”'),
    item('vrije tijd', 'FREE-yə teyt', '“Free time.” A standard frame for hobby questions.', 'Wat doe je in je vrije tijd?', '“What do you do in your free time?”'),
  ],
});
