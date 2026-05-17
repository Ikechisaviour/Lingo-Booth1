const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u13',
  title: 'Level 1 · Unit 13: Transportasi — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use Indonesian transport language for buses, trains, ride-hailing, and route questions.',
  vocabularyGoal: 'Use vehicle names, ticket words, and common route terms.',
  grammarGoal: 'Use `naik` for taking transport and keep transport expressions compact rather than translating English word-for-word.',
  speakingGoal: 'Ask how to go somewhere, choose transport, and understand a basic answer.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Use `naik` with a vehicle.'),
    practice('asking-route', 'Asking route', 'Use `ke ... naik apa?`.'),
    practice('buying-ticket', 'Buying ticket', 'Ask for one ticket and confirm the destination.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('naik bus', 'naik bus', '“Take the bus.” `Naik` literally means “go up,” but with vehicles it means to ride or take them.', 'Saya naik bus ke kampus.', '“I take the bus to campus.”'),
    item('kereta', 'kereta', '“Train.” In cities this appears beside commuter, intercity, and MRT-style transport vocabulary.', 'Kereta berangkat jam tujuh.', '“The train leaves at seven.”'),
    item('ojek', 'ojek', 'Motorcycle taxi, a very Indonesian transport reality now often booked through apps.', 'Kalau macet, saya naik ojek.', '“If traffic is bad, I take an ojek.”'),
    item('halte', 'halte', '“Bus stop.” It is a practical landmark word in urban travel.', 'Halte bus ada di depan kampus.', '“The bus stop is in front of campus.”'),
    item('stasiun', 'stasiun', '“Station.” Usually used for rail stations.', 'Saya turun di stasiun berikutnya.', '“I get off at the next station.”'),
    item('turun', 'turun', '“Get off / go down.” It naturally pairs with `naik` in transport talk.', 'Saya turun di Sudirman.', '“I get off at Sudirman.”'),
    item('tiket', 'tiket', '“Ticket.” This covers transport and event tickets.', 'Saya beli satu tiket ke Bogor.', '“I bought one ticket to Bogor.”'),
    item('ke sana naik apa?', 'ke sana naik apa', '“What do I take to get there?” This is a compact real-life route question.', 'Ke museum naik apa?', '“What do I take to the museum?”'),
    item('macet', 'macet', '“Traffic jammed.” In Jakarta-area conversation it is one of the most useful city words.', 'Jalan ini macet setiap pagi.', '“This road is congested every morning.”'),
    item('berapa lama?', 'berapa lama', '“How long?” Use it for travel duration as well as general time length.', 'Dari sini ke bandara berapa lama?', '“How long is it from here to the airport?”'),
  ],
});
