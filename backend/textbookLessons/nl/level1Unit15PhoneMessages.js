const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u15',
  title: 'Level 1 · Unit 15: Bellen en Berichten — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make short calls, leave messages, and ask for repetition.',
  vocabularyGoal: 'Use phone, message, number, and callback vocabulary.',
  grammarGoal: 'Use polite questions with `kan ik`, `kunt u`, and separable verbs such as `terugbellen`.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening call', 'Use a phone greeting and identify yourself.'),
    practice('leaving-message', 'Leaving message', 'Use `kan ik een bericht achterlaten?`.'),
    practice('asking-repeat', 'Asking repetition', 'Use `kunt u dat herhalen?`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('hallo', 'ha-LOH', 'The ordinary Dutch phone greeting.', 'Hallo, met Eva.', '“Hello, this is Eva.”'),
    item('kan ik met ... spreken?', 'kan ik met ... SPRAY-khen', '“May I speak with ...?” A natural phone request.', 'Kan ik met meneer De Vries spreken?', '“May I speak with Mr. De Vries?”'),
    item('hij is er nu niet', 'hey is er ny neet', '“He is not here now.” A common status phrase.', 'Hij is er nu niet.', '“He is not here now.”'),
    item('een bericht', 'ən bə-RIKHT', '“A message.” Useful for phone and text contexts.', 'Kan ik een bericht achterlaten?', '“May I leave a message?”'),
    item('wilt u zeggen dat ik heb gebeld?', 'vilt y ZEG-ghen dat ik hep khə-BELT', '“Would you say that I called?” A polite relay request.', 'Wilt u zeggen dat ik heb gebeld?', '“Would you say that I called?”'),
    item('telefoonnummer', 'tay-lə-FOHN-num-mer', '“Phone number.” A transparent compound.', 'Wat is uw telefoonnummer?', '“What is your phone number?”'),
    item('kunt u dat herhalen?', 'kunt y dat her-HAH-len', '“Could you repeat that?” A crucial repair phrase.', 'Kunt u dat nummer herhalen?', '“Could you repeat that number?”'),
    item('ik bel later terug', 'ik bel LAH-ter tə-RUKH', '“I will call back later.” The separable prefix moves to the end.', 'Goed, ik bel later terug.', '“Okay, I will call back later.”'),
  ],
});
