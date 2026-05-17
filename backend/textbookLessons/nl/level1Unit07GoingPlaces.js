const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u7',
  title: 'Level 1 · Unit 7: Waar Ga Je Heen? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say where you are, where you are going, and ask for simple directions.',
  vocabularyGoal: 'Use common destinations, route words, and direction phrases.',
  grammarGoal: 'Use `naar` for destinations, `in/op/bij` for locations, and keep V2 order in route sentences.',
  speakingGoal: 'Say where you are, ask how to get somewhere, and give one short route.',
  task: 'Guide a visitor from the station to a cafe.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use one location preposition.'),
    practice('stating-destination', 'Stating destination', 'Use `naar`.'),
    practice('asking-route', 'Asking route', 'Use `hoe kom ik bij ...?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('ik ben op de universiteit', 'ik ben op də oo-nee-ver-see-TAYT', '“I am at the university.” `Op` is idiomatic with institutions such as school and university.', 'Nu ben ik op de universiteit.', '“Now I am at the university.”'),
    item('ik ga naar de bibliotheek', 'ik kha na:r də bee-blee-o-TAYK', '“I am going to the library.” `Naar` marks destination.', 'Na de les ga ik naar de bibliotheek.', '“After class I go to the library.”'),
    item('ik kom uit huis', 'ik kom oyt hœys', '“I come from home.” `Uit` marks movement out of a place.', 'Ik kom net uit huis.', '“I just came from home.”'),
    item('ga linksaf', 'kha LINKS-af', '“Turn left.” This is a separable-verb shape learners will keep meeting.', 'Bij het stoplicht ga je linksaf.', '“At the traffic light you turn left.”'),
    item('ga rechtdoor', 'kha REKHT-dor', '“Go straight ahead.” A common complete route instruction.', 'Ga rechtdoor tot de brug.', '“Go straight until the bridge.”'),
    item('dichtbij / ver weg', 'DIKHT-bey / fer vekh', '“Nearby / far away.” Practical distance expressions.', 'Het station is dichtbij.', '“The station is nearby.”'),
    item('hoe kom ik bij ...?', 'hoo kom ik bey', '“How do I get to ...?” A full real-life directions question.', 'Hoe kom ik bij het museum?', '“How do I get to the museum?”'),
    item('naast', 'nahst', '“Next to.” A compact landmark preposition.', 'Het café is naast de bank.', '“The cafe is next to the bank.”'),
  ],
});
