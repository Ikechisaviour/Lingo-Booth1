const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u13',
  title: 'Level 1 · Unit 13: Ulaşım — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use transport language for buses, metro, ferries, and travel time.',
  vocabularyGoal: 'Use vehicle, stop, ticket, and route words.',
  grammarGoal: 'Use `ile/-la/-le` for means and destination case endings in practical travel sentences.',
  speakingGoal: 'Ask how to go somewhere, choose a transport mode, and ask how long it takes.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Use one vehicle with `-la/-le`.'),
    practice('asking-route', 'Asking route', 'Use one route question.'),
    practice('asking-duration', 'Asking duration', 'Use `ne kadar sürer?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('otobüsle gidiyorum', 'o-to-BÜS-le gi-di-YO-rum', '“I am going by bus.” The instrument suffix attaches directly to the vehicle.', 'Okula otobüsle gidiyorum.', '“I go to school by bus.”'),
    item('metro', 'MET-ro', '“Metro.” A central city transport word in Istanbul and Ankara.', 'Metro hızlı ve rahat.', '“The metro is fast and comfortable.”'),
    item('vapur', 'va-PUR', '“Ferry.” Especially important in Istanbul daily life across the Bosphorus.', 'Beşiktaş’a vapurla gidiyorum.', '“I am going to Beşiktaş by ferry.”'),
    item('durak', 'du-RAK', '“Stop.” Used for buses and similar transport.', 'Otobüs durağı burada.', '“The bus stop is here.”'),
    item('istasyon', 'is-tas-YON', '“Station.” Used for metro and trains.', 'Bir sonraki istasyonda iniyorum.', '“I get off at the next station.”'),
    item('bilet', 'bi-LET', '“Ticket.” Practical across transport and events.', 'Bir bilet istiyorum.', '“I want one ticket.”'),
    item('... nasıl giderim?', 'na-SIL gi-de-RİM', '“How do I get to ...?” A destination phrase plus travel question.', 'Taksim’e nasıl giderim?', '“How do I get to Taksim?”'),
    item('ne kadar sürer?', 'ne ka-DAR sü-RER', '“How long does it take?” A complete useful duration question.', 'Havaalanına gitmek ne kadar sürer?', '“How long does it take to go to the airport?”'),
  ],
});
