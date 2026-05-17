const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u13',
  title: 'Level 1 · Unit 13: Vervoer — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use Dutch transport language for bikes, trains, buses, and travel time.',
  vocabularyGoal: 'Use vehicle, station, ticket, and route words.',
  grammarGoal: 'Use `met` for means, separable verbs such as `instappen/uitstappen`, and travel-time questions.',
  speakingGoal: 'Ask how to go somewhere, choose transport, and ask how long it takes.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Use `met de fiets/trein/bus`.'),
    practice('asking-route', 'Asking route', 'Use one route question.'),
    practice('asking-duration', 'Asking duration', 'Use `hoe lang duurt het?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('met de fiets', 'met də FEETS', '“By bike.” In Dutch life this is often the default transport answer.', 'Ik ga met de fiets naar school.', '“I go to school by bike.”'),
    item('de trein', 'də treyn', '“The train.” A core intercity transport noun.', 'De trein vertrekt om acht uur.', '“The train leaves at eight.”'),
    item('de tram', 'də tram', '“The tram.” Especially useful in Dutch cities.', 'De tram stopt voor het museum.', '“The tram stops in front of the museum.”'),
    item('de halte', 'də HAL-tə', '“The stop.” Used for bus and tram stops.', 'De bushalte is dichtbij.', '“The bus stop is nearby.”'),
    item('instappen / uitstappen', 'IN-stap-pen / OYT-stap-pen', '“Get on / get off.” Separable verbs that are common in transport announcements.', 'Ik stap bij het station uit.', '“I get off at the station.”'),
    item('een kaartje', 'ən KAHRT-yə', '“A ticket.” The diminutive form is the everyday word.', 'Ik koop een kaartje naar Utrecht.', '“I buy a ticket to Utrecht.”'),
    item('hoe kom ik in het centrum?', 'hoo kom ik in hət SEN-trum', '“How do I get downtown?” A practical route question.', 'Hoe kom ik in het centrum?', '“How do I get downtown?”'),
    item('hoe lang duurt het?', 'hoo lang dyrt hət', '“How long does it take?” A complete travel-duration question.', 'Hoe lang duurt het naar Schiphol?', '“How long does it take to Schiphol?”'),
  ],
});
