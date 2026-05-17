const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u19',
  title: 'Level 1 · Unit 19: Hari Raya dan Budaya — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major Indonesian holidays, greetings, and family travel traditions.',
  vocabularyGoal: 'Use holiday, family, greeting, and travel words tied to Indonesian life.',
  grammarGoal: 'Use `sedang`, `akan`, and simple reason clauses when describing holiday routines.',
  speakingGoal: 'Describe one holiday, say what people do, and give an appropriate greeting.',
  task: 'Explain one Indonesian holiday to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming a holiday', 'Introduce one holiday clearly.'),
    practice('describing-custom', 'Describing custom', 'Use one action people do.'),
    practice('giving-greeting', 'Giving greeting', 'Use the right formula for the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('Hari Raya Idulfitri', 'hari raya idulfitri', 'The major Muslim celebration after Ramadan and one of the most important annual moments in Indonesia.', 'Hari Raya Idulfitri biasanya dirayakan bersama keluarga.', '“Eid al-Fitr is usually celebrated with family.”'),
    item('mudik', 'mudik', 'The annual homecoming journey before Idulfitri; it is a central Indonesian cultural rhythm, not just “going home.”', 'Banyak orang mudik sebelum Lebaran.', '“Many people travel home before Lebaran.”'),
    item('Lebaran', 'lebaran', 'The everyday Indonesian name often used for Idulfitri celebrations.', 'Selamat Lebaran!', '“Happy Lebaran!”'),
    item('Selamat Idulfitri', 'selamat idulfitri', 'A holiday greeting for Eid al-Fitr, often followed by a request for forgiveness.', 'Selamat Idulfitri, mohon maaf lahir dan batin.', '“Happy Eid al-Fitr, please forgive me outwardly and inwardly.”'),
    item('Tahun Baru Imlek', 'tahun baru imlek', 'Chinese New Year in Indonesian usage, especially visible in cities with Chinese-Indonesian communities.', 'Tahun Baru Imlek dirayakan dengan lampion merah.', '“Chinese New Year is celebrated with red lanterns.”'),
    item('Nyepi', 'nyepi', 'Balinese Hindu Day of Silence; the island’s public life quiets dramatically for reflection.', 'Pada Hari Nyepi, Bali sangat tenang.', '“On Nyepi, Bali is very quiet.”'),
    item('sedang merayakan', 'sedang merayakan', '“Are celebrating.” `Sedang` marks an action in progress right now.', 'Mereka sedang merayakan hari besar.', '“They are celebrating a holiday.”'),
    item('akan pulang', 'akan pulang', '“Will go home.” `Akan` marks a planned or expected future action.', 'Saya akan pulang saat libur panjang.', '“I will go home during the long holiday.”'),
    item('keluarga besar', 'keluarga besar', '“Extended family.” Holidays often make this social unit especially visible.', 'Kami berkumpul dengan keluarga besar.', '“We gather with the extended family.”'),
    item('tradisi', 'tradisi', '“Tradition.” A useful bridge word for explaining customs.', 'Mudik adalah tradisi penting di Indonesia.', '“Mudik is an important tradition in Indonesia.”'),
  ],
});
