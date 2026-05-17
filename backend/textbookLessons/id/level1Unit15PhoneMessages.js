const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u15',
  title: 'Level 1 · Unit 15: Telepon dan Pesan — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make simple calls, leave messages, and ask someone to repeat information.',
  vocabularyGoal: 'Use call, message, number, and contact words.',
  grammarGoal: 'Use request forms with `tolong` and `bisa` in short communication tasks.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear phone message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening a call', 'Use a natural greeting plus identity.'),
    practice('leaving-message', 'Leaving a message', 'Use `tolong sampaikan`.'),
    practice('asking-repeat', 'Asking for repetition', 'Use `bisa ulangi?`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('halo', 'halo', '“Hello” on the phone. It is the ordinary opening sound for calls.', 'Halo, ini Rina.', '“Hello, this is Rina.”'),
    item('saya mau bicara dengan ...', 'saya mau bicara dengan', '“I would like to speak with ...” A direct but normal phone request.', 'Saya mau bicara dengan Pak Andi.', '“I would like to speak with Mr. Andi.”'),
    item('sedang tidak ada', 'sedang tidak ada', '“Is not here at the moment.” `Sedang` marks an ongoing current situation.', 'Bu Sari sedang tidak ada.', '“Ms. Sari is not here right now.”'),
    item('pesan', 'pesan', '“Message.” It also appears as a verb in other contexts, so context matters.', 'Boleh saya tinggalkan pesan?', '“May I leave a message?”'),
    item('tolong sampaikan', 'tolong sampaikan', '“Please pass on.” `Tolong` softens a service request.', 'Tolong sampaikan bahwa saya menelepon.', '“Please tell her that I called.”'),
    item('nomor telepon', 'nomor telepon', '“Phone number.” `Nomor` is used broadly for ordered identifiers.', 'Apa nomor telepon Anda?', '“What is your phone number?”'),
    item('bisa ulangi?', 'bisa ulangi', '“Could you repeat?” A compact repair phrase worth knowing early.', 'Maaf, bisa ulangi nomornya?', '“Sorry, could you repeat the number?”'),
    item('kirim pesan', 'kirim pesan', '“Send a message.” This works for text messages and general messaging.', 'Saya kirim pesan nanti.', '“I will send a message later.”'),
    item('nanti saya hubungi lagi', 'nanti saya hubungi lagi', '“I will contact you again later.” Useful for ending a call gracefully.', 'Baik, nanti saya hubungi lagi.', '“Alright, I will contact you again later.”'),
    item('sampai nanti', 'sampai nanti', '“See you later.” Friendly but not overly casual for many calls.', 'Terima kasih, sampai nanti.', '“Thank you, see you later.”'),
  ],
});
