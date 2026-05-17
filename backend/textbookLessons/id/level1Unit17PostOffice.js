const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u17',
  title: 'Level 1 · Unit 17: Kantor Pos — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle simple postal tasks such as sending letters, parcels, and asking delivery questions.',
  vocabularyGoal: 'Use parcel, letter, stamp, address, and delivery vocabulary.',
  grammarGoal: 'Use `mau`, `ke`, and passive-like service phrases such as `dikirim` in predictable transactions.',
  speakingGoal: 'Say what you want to send, where it should go, and ask when it will arrive.',
  task: 'Send one parcel at a post office counter.',
  expressionPractice: [
    practice('stating-service-need', 'Stating service need', 'Use `saya mau kirim`.'),
    practice('giving-destination', 'Giving destination', 'Use `ke` with a place.'),
    practice('asking-arrival', 'Asking arrival', 'Use `kapan sampai?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('kantor pos', 'kantor pos', '“Post office.” A useful service-location compound.', 'Kantor pos ada di sebelah bank.', '“The post office is next to the bank.”'),
    item('surat', 'surat', '“Letter.” Still important for formal mail and documents.', 'Saya mau kirim surat.', '“I want to send a letter.”'),
    item('paket', 'paket', '“Parcel / package.” Common in both post-office and delivery-app contexts.', 'Paket ini untuk Surabaya.', '“This package is for Surabaya.”'),
    item('perangko', 'perangko', '“Stamp.” It is a specific service noun learners will not infer from English easily.', 'Saya perlu dua perangko.', '“I need two stamps.”'),
    item('alamat', 'alamat', '“Address.” It is required in many practical service encounters.', 'Tolong tulis alamat lengkap.', '“Please write the full address.”'),
    item('saya mau kirim', 'saya mau kirim', '“I want to send.” This compact frame starts many counter transactions.', 'Saya mau kirim paket ke Bali.', '“I want to send a parcel to Bali.”'),
    item('dikirim', 'dikirim', '“Sent.” The `di-` prefix often forms passive service language where the item is the focus.', 'Paket ini dikirim hari ini.', '“This parcel is sent today.”'),
    item('berapa ongkos kirimnya?', 'berapa ongkos kirimnya', '“How much is the shipping cost?” A highly practical fixed question.', 'Ke Makassar berapa ongkos kirimnya?', '“How much is shipping to Makassar?”'),
    item('kapan sampai?', 'kapan sampai', '“When will it arrive?” Direct and natural in delivery contexts.', 'Paket ini kapan sampai?', '“When will this parcel arrive?”'),
    item('nomor resi', 'nomor resi', '“Tracking number.” `Resi` is the everyday delivery receipt/tracking term.', 'Ini nomor resinya.', '“Here is the tracking number.”'),
  ],
});
