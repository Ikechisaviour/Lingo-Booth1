const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u7',
  title: 'Level 1 · Unit 7: Pergi ke Mana? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Move around town using the core location trio `di`, `ke`, and `dari` with everyday destinations.',
  vocabularyGoal: 'Use common destinations, direction words, and arrival/departure verbs.',
  grammarGoal: 'Keep `di` for location, `ke` for movement toward, and `dari` for origin rather than treating one preposition as all-purpose.',
  speakingGoal: 'Say where you are, where you are going, and where you came from.',
  task: 'Ask for and give a short route from campus to a nearby place.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use `di` with a place.'),
    practice('stating-destination', 'Stating destination', 'Use `ke` with a destination.'),
    practice('asking-route', 'Asking route', 'Use `bagaimana cara ke ...?` politely.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('di kampus', 'di kampus', '“At campus.” `Di` marks a static location and is written separately from the noun.', 'Saya di kampus sekarang.', '“I am at campus now.”'),
    item('ke pasar', 'ke pasar', '“To the market.” `Ke` points toward a destination and is also written separately.', 'Saya pergi ke pasar pagi ini.', '“I am going to the market this morning.”'),
    item('dari rumah', 'dari rumah', '“From home.” `Dari` marks origin or source.', 'Saya datang dari rumah.', '“I came from home.”'),
    item('pergi', 'pergi', '“To go.” It is a general movement verb and often pairs with `ke`.', 'Kami pergi ke museum.', '“We are going to the museum.”'),
    item('datang', 'datang', '“To come / arrive.” The perspective is toward the speaker or reference point.', 'Dia datang dari Bandung.', '“She came from Bandung.”'),
    item('belok kiri', 'belok kiri', '“Turn left.” Direction phrases usually follow the verb directly.', 'Di lampu merah, belok kiri.', '“At the traffic light, turn left.”'),
    item('lurus saja', 'lurus saja', '“Just go straight.” `Saja` softens and narrows the instruction to the simple action.', 'Lurus saja sampai halte.', '“Just go straight until the bus stop.”'),
    item('dekat / jauh', 'dekat / jauh', '“Near / far.” These adjectives are enough by themselves in many conversational answers.', 'Stasiunnya dekat, bukan jauh.', '“The station is near, not far.”'),
    item('bagaimana cara ke ...?', 'bagaimana cara ke', '“How do I get to ...?” This is a practical full-question frame for asking directions.', 'Bagaimana cara ke perpustakaan?', '“How do I get to the library?”'),
    item('sampai', 'sampai', '“To arrive / until.” It can describe reaching a place or the endpoint of a route.', 'Kita sampai di kantor pos.', '“We arrive at the post office.”'),
  ],
});
