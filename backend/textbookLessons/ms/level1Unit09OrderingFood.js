const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u9',
  title: 'Level 1 · Unit 9: Memesan Makanan — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks naturally in Malay while distinguishing polite requests from blunt commands.',
  vocabularyGoal: 'Use core restaurant words, dish names, and quantity words that appear in ordinary Malaysian ordering.',
  grammarGoal: 'Use `nak`, `mahu`, `minta`, and `tolong` to make requests with different levels of directness.',
  speakingGoal: 'Place a complete food order, change one detail, and confirm the final order.',
  task: 'Roleplay a mamak-stall order from greeting to payment.',
  expressionPractice: [
    practice('ordering-politely', 'Ordering politely', 'Use `saya nak`, `saya mahu`, or `minta` with natural service tone.'),
    practice('changing-order', 'Changing an order', 'Add or remove ice, sugar, sambal, or portion size.'),
    practice('confirming-order', 'Confirming the order', 'Repeat the final items before payment.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('saya nak', 'sa.ya nak', 'Everyday “I want / I would like.” Natural in casual ordering; softer than a bare noun but less formal than `saya mahu`.', 'Saya nak nasi lemak satu.', '“I would like one nasi lemak.”'),
    item('saya mahu', 'sa.ya ma.hu', 'More careful or formal “I want / I would like.” Useful when the learner wants a polite default.', 'Saya mahu teh tarik kurang manis.', '“I would like teh tarik with less sugar.”'),
    item('minta', 'min.ta', '“Please give / I request.” Very common with food orders and often followed directly by the item.', 'Minta roti canai dua.', '“Two roti canai, please.”'),
    item('tolong', 'to.long', '“Please / help.” Adds politeness before a request and is especially useful when asking someone to do something.', 'Tolong bungkuskan ini.', '“Please pack this to go.”'),
    item('kurang manis', 'ku.rang ma.nis', '“Less sweet.” A culturally useful phrase in Malaysia because drinks are often sweet by default.', 'Teh tarik satu, kurang manis.', '“One teh tarik, less sweet.”'),
    item('tanpa ais', 'tan.pa ais', '“Without ice.” Use `tanpa` before the thing removed.', 'Saya nak kopi tanpa ais.', '“I want coffee without ice.”'),
    item('pedas / tidak pedas', 'pe.das / ti.dak pe.das', '“Spicy / not spicy.” `Tidak` negates adjectives in standard Malay.', 'Mee goreng tidak pedas, boleh?', '“Can I have mee goreng not spicy?”'),
    item('bungkus / makan sini', 'bung.kus / ma.kan si.ni', '“Take away / eat here.” `Bungkus` literally means “wrap,” and is the everyday takeaway word.', 'Bungkus atau makan sini?', '“Take away or eat here?”'),
    item('satu pinggan / dua gelas', 'sa.tu ping.gan / du.a ge.las', 'Malay commonly uses measure nouns for servings: `pinggan` for a plate, `gelas` for a glass.', 'Dua gelas air kosong.', '“Two glasses of plain water.”'),
    item('berapa jumlahnya?', 'be.ra.pa jum.lah.nya', '“What is the total?” The suffix `-nya` makes the question refer to the total amount already discussed.', 'Berapa jumlahnya semua?', '“What is the total altogether?”'),
  ],
});
