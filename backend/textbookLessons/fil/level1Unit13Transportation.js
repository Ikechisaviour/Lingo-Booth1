const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u13',
  title: 'Level 1 · Unit 13: Transportasyon — Transportation',
  category: 'transport',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Choose transport, ask how to get somewhere, and describe a route.',
  vocabularyGoal: 'Use jeepney, bus, train, ticket, and route words.',
  grammarGoal: 'Use `sakay`, `mula ... hanggang ...`, and direction questions.',
  speakingGoal: 'Explain how you travel from one place to another.',
  task: 'Ask for the best way to reach a destination and describe your commute.',
  expressionPractice: [
    practice('naming-transport', 'Naming transport', 'Use the right vehicle word.'),
    practice('describing-route', 'Describing route', 'Combine origin, destination, and means.'),
    practice('asking-how', 'Asking how', 'Use a practical route question.'),
  ],
  relatedPools: ['topic-transport', 'topic-travel'],
  items: [
    item('dyip', 'dyip', '“Jeepney.” A culturally iconic Philippine transport word.', 'Sumasakay ako ng dyip.', '“I ride a jeepney.”'),
    item('bus', 'bus', '“Bus.”', 'Pumupunta ako sa trabaho sakay ng bus.', '“I go to work by bus.”'),
    item('tren', 'tren', '“Train.”', 'Mabilis ang tren.', '“The train is fast.”'),
    item('istasyon', 'istasyon', '“Station.”', 'Nasaan ang istasyon?', '“Where is the station?”'),
    item('tiket', 'tiket', '“Ticket.”', 'Kailangan ko ng tiket papuntang Baguio.', '“I need a ticket to Baguio.”'),
    item('sakay ng', 'sakay ng', '“By riding / aboard.” A practical means phrase.', 'Pupunta ako sakay ng tren.', '“I will go by train.”'),
    item('mula ... hanggang ...', 'mula ... hanggang ...', '“From ... to ...” for routes.', 'Mula Maynila hanggang Quezon City.', '“From Manila to Quezon City.”'),
    item('Paano pumunta sa ...?', 'paano pumunta sa ...?', '“How do you go to ...?”', 'Paano pumunta sa istasyon?', '“How do you get to the station?”'),
    item('malapit / malayo', 'malapit / malayo', '“Near / far.”', 'Malayo ba iyon?', '“Is that far?”'),
    item('maglakad', 'maglakad', '“To walk.”', 'Kung malapit, maglalakad ako.', '“If it is near, I will walk.”'),
  ],
});
