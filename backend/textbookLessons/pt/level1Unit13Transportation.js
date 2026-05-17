const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u13',
  title: 'Level 1 · Unit 13: Transporte — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use Portuguese transport language for buses, metro, trains, and travel time.',
  vocabularyGoal: 'Use vehicle, station, ticket, and route words.',
  grammarGoal: 'Use `ir de` for transport means and keep `pegar` distinct from literal English “catch.”',
  speakingGoal: 'Ask how to go somewhere, choose a transport mode, and ask how long it takes.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Use `vou de ônibus/metro`.'),
    practice('asking-route', 'Asking route', 'Use `como chego` or `qual ônibus`.'),
    practice('asking-duration', 'Asking duration', 'Use `quanto tempo leva?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('vou de ônibus', 'voh djee OH-nee-boos', '“I go by bus.” `De` marks the means of transport.', 'Vou de ônibus para a universidade.', '“I go by bus to the university.”'),
    item('metrô', 'meh-TROH', '“Metro / subway.” In Brazilian cities it is a basic urban transport word.', 'O metrô chega em cinco minutos.', '“The metro arrives in five minutes.”'),
    item('trem', 'treng', '“Train.” The nasal final is part of the everyday sound of the word.', 'O trem para na próxima estação.', '“The train stops at the next station.”'),
    item('pegar o ônibus', 'peh-GAR oo OH-nee-boos', '“Take the bus.” In Brazil `pegar` is the natural everyday verb here.', 'Preciso pegar o ônibus 702.', '“I need to take bus 702.”'),
    item('ponto de ônibus', 'PON-too djee OH-nee-boos', '“Bus stop.” `Ponto` is the practical landmark word.', 'O ponto de ônibus fica na esquina.', '“The bus stop is on the corner.”'),
    item('estação', 'esh-ta-SAO', '“Station.” A key noun for metro and rail travel.', 'Desço na próxima estação.', '“I get off at the next station.”'),
    item('bilhete', 'bee-LYEH-chee', '“Ticket.” Common for public transport and entry tickets.', 'Quero um bilhete para Lisboa.', '“I want one ticket to Lisbon.”'),
    item('qual ônibus vai para ...?', 'kwal OH-nee-boos vy PA-ra', '“Which bus goes to ...?” A realistic route question.', 'Qual ônibus vai para o centro?', '“Which bus goes downtown?”'),
    item('trânsito', 'TRAN-see-too', '“Traffic.” Very useful in large Brazilian cities.', 'O trânsito está pesado hoje.', '“Traffic is heavy today.”'),
    item('quanto tempo leva?', 'KWAN-too TEM-poo LEH-va', '“How long does it take?” A complete practical question.', 'Quanto tempo leva até o aeroporto?', '“How long does it take to the airport?”'),
  ],
});
