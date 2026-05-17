const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u20',
  title: 'Level 1 · Unit 20: Suggesties en Plannen — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, respond to them, and settle on a plan.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases.',
  grammarGoal: 'Use `zullen we`, `laten we`, and soft refusal structures.',
  speakingGoal: 'Suggest one activity, respond to one suggestion, and agree on a plan.',
  task: 'Plan a simple weekend outing.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use `zullen we` or `laten we`.'),
    practice('accepting', 'Accepting suggestion', 'Use one positive response plus detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and another option.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('zullen we ...?', 'ZUL-len və', '“Shall we ...?” A natural suggestion frame.', 'Zullen we koffie drinken na de les?', '“Shall we drink coffee after class?”'),
    item('laten we ...', 'LAH-ten və', '“Let’s ...” A slightly more directive suggestion frame.', 'Laten we zaterdag naar het museum gaan.', '“Let’s go to the museum on Saturday.”'),
    item('goed idee', 'khoot ee-DAY', '“Good idea.” A quick positive response.', 'Dat is een goed idee.', '“That is a good idea.”'),
    item('afgesproken', 'AF-khə-sproh-khen', '“Agreed.” A natural plan-closing word.', 'Prima, afgesproken.', '“Great, agreed.”'),
    item('sorry, ik kan niet', 'SOR-ree ik kan neet', '“Sorry, I cannot.” A polite refusal start.', 'Sorry, ik kan zaterdag niet.', '“Sorry, I cannot on Saturday.”'),
    item('misschien', 'mis-SKHEEN', '“Maybe.” Useful when the speaker is uncertain.', 'Misschien is zondag beter.', '“Maybe Sunday is better.”'),
    item('beter', 'BAY-ter', '“Better.” A practical comparison word in planning.', 'We kunnen beter vroeg vertrekken.', '“We had better leave early.”'),
    item('dan', 'dan', '“Then / in that case.” It helps the plan pivot after new information.', 'Dan spreken we om zes uur af.', '“Then we will meet at six.”'),
  ],
});
