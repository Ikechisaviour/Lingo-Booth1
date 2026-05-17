const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u13',
  title: 'Level 1 · Unit 13: Транспорт — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use transport language and begin distinguishing going on foot from going by vehicle.',
  vocabularyGoal: 'Use vehicle, station, ticket, and route words.',
  grammarGoal: 'Use `идти` for going on foot and `ехать` for going by transport.',
  speakingGoal: 'Ask how to get somewhere, choose transport, and ask how long it takes.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Choose `иду` or `еду` correctly.'),
    practice('asking-route', 'Asking route', 'Use one route question.'),
    practice('asking-duration', 'Asking duration', 'Use `сколько времени?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('я иду пешком', 'ya idu peshkom', '“I am going on foot.” Use `идти` for one-direction movement on foot.', 'Я иду пешком до метро.', '“I am walking to the metro.”'),
    item('я еду на автобусе', 'ya yedu na avtobuse', '“I am going by bus.” Use `ехать` for one-direction movement by vehicle.', 'Я еду на автобусе в центр.', '“I am going downtown by bus.”'),
    item('метро', 'metro', '“Metro.” In Moscow especially, it is both practical transport and a cultural landmark.', 'Метро очень удобное.', '“The metro is very convenient.”'),
    item('остановка', 'ostanovka', '“Stop.” Used for bus and tram stops.', 'Остановка рядом с университетом.', '“The stop is next to the university.”'),
    item('станция', 'stantsiya', '“Station.” Common for metro and train stations.', 'Я выхожу на следующей станции.', '“I get off at the next station.”'),
    item('билет', 'bilet', '“Ticket.” Practical across transport and events.', 'Мне нужен один билет до Тулы.', '“I need one ticket to Tula.”'),
    item('как доехать до ...?', 'kak doy ekhat do', '“How do I get to ... by transport?” A useful contrast with walking directions.', 'Как доехать до музея?', '“How do I get to the museum?”'),
    item('сколько времени занимает?', 'skolko vremeni zanimayet', '“How long does it take?” A complete travel-duration question.', 'Сколько времени занимает дорога?', '“How long does the trip take?”'),
  ],
});
