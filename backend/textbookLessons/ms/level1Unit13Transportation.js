const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u13',
  title: 'Level 1 · Unit 13: Pengangkutan — Transportation',
  category: 'transportation',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Choose transport, ask routes, and describe commuting in Malaysian cities.',
  vocabularyGoal: 'Use transport vocabulary that reflects buses, trains, ride-hailing, and local commuter life.',
  grammarGoal: 'Use `naik`, `turun`, `dengan`, and `ke` to describe movement and transport choice.',
  speakingGoal: 'Explain how you travel from home to a destination.',
  task: 'Ask for the best way to reach a station, then explain your own route.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Name a transport mode with `naik`.'),
    practice('giving-route', 'Giving a route', 'Combine `dari`, `ke`, `naik`, and `turun`.'),
    practice('asking-best-way', 'Asking the best way', 'Ask what transport is easiest or fastest.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('pengangkutan awam', 'pe.ngang.ku.tan a.wam', '“Public transport.” Built from the root `angkut`, “carry.”', 'Pengangkutan awam di Kuala Lumpur semakin baik.', '“Public transport in Kuala Lumpur is improving.”'),
    item('naik', 'na.ik', '“Ride / board / go up.” Use it with buses, trains, and ride-hailing cars.', 'Saya naik MRT ke pusat bandar.', '“I take the MRT downtown.”'),
    item('turun', 'tu.run', '“Get off / descend.”', 'Turun di stesen Pasar Seni.', '“Get off at Pasar Seni station.”'),
    item('dengan', 'de.ngan', '“With / by means of.” Common for transport choice.', 'Saya pergi dengan bas.', '“I go by bus.”'),
    item('MRT / LRT / KTM', 'em.ar.ti / el.ar.ti / ke.ti.em', 'Three common rail labels in Malaysia; learners meet the abbreviations before the long official names.', 'Saya tukar dari LRT ke MRT.', '“I transfer from the LRT to the MRT.”'),
    item('Grab', 'grab', 'Ride-hailing is common enough that the brand name is used as everyday transport vocabulary.', 'Kalau hujan, saya ambil Grab.', '“If it rains, I take Grab.”'),
    item('sesak', 'se.sak', '“Congested / jammed.” Useful for traffic and crowded transport.', 'Jalan raya sesak waktu puncak.', '“The road is congested at rush hour.”'),
    item('waktu puncak', 'wak.tu pun.cak', '“Peak hour / rush hour.”', 'Elak naik bas pada waktu puncak.', '“Avoid taking the bus at rush hour.”'),
    item('dari ... ke ...', 'da.ri ... ke ...', '“From ... to ...” route frame.', 'Dari rumah ke pejabat saya naik motosikal.', '“From home to the office I ride a motorcycle.”'),
    item('cara paling mudah', 'ca.ra pa.ling mu.dah', '“The easiest way.” `Paling` marks the superlative.', 'Apa cara paling mudah ke KL Sentral?', '“What is the easiest way to KL Sentral?”'),
  ],
});
