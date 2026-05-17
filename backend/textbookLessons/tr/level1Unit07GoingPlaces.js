const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u7',
  title: 'Level 1 · Unit 7: Nereye Gidiyorsun? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say where you are, where you are going, and ask for directions with Turkish case endings.',
  vocabularyGoal: 'Use common destinations, direction words, and route phrases.',
  grammarGoal: 'Keep location `-de/-da`, destination `-e/-a`, and source `-den/-dan` distinct.',
  speakingGoal: 'Say where you are, ask how to get somewhere, and give one short route.',
  task: 'Guide a visitor from campus to a nearby cafe.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use the locative ending.'),
    practice('stating-destination', 'Stating destination', 'Use the dative ending.'),
    practice('asking-route', 'Asking route', 'Use `... nasıl giderim?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('üniversitedeyim', 'ü-ni-ver-si-te-DE-yim', '“I am at the university.” The locative and personal ending stack onto the noun.', 'Şu an üniversitedeyim.', '“Right now I am at the university.”'),
    item('kütüphaneye gidiyorum', 'kü-tüp-ha-ne-YE gi-di-YO-rum', '“I am going to the library.” Destination takes the dative suffix.', 'Dersten sonra kütüphaneye gidiyorum.', '“After class I am going to the library.”'),
    item('evden geliyorum', 'ev-DEN ge-li-YO-rum', '“I am coming from home.” Source takes the ablative suffix.', 'Her sabah evden geliyorum.', '“Every morning I come from home.”'),
    item('sola dönün', 'so-LA dö-NÜN', '“Turn left.” The direction word itself carries the dative ending.', 'Işıklarda sola dönün.', '“At the lights, turn left.”'),
    item('düz gidin', 'DÜZ gi-DİN', '“Go straight.” A compact polite route instruction.', 'Düz gidin, sonra sağa dönün.', '“Go straight, then turn right.”'),
    item('yakın / uzak', 'ya-KIN / u-ZAK', '“Near / far.” These adjectives answer many route questions simply.', 'Metro yakın, otobüs durağı uzak.', '“The metro is near, the bus stop is far.”'),
    item('... nasıl giderim?', 'na-SIL gi-de-RİM', '“How do I get to ...?” The destination takes the dative suffix before the question.', 'Müzeye nasıl giderim?', '“How do I get to the museum?”'),
    item('yanında', 'ya-NIN-da', '“Next to.” The possessed/location structure literally means “at its side.”', 'Kafe müzenin yanında.', '“The cafe is next to the museum.”'),
  ],
});
