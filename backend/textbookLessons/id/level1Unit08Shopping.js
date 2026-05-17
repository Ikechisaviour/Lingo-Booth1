const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u8',
  title: 'Level 1 · Unit 8: Belanja — Shopping',
  category: 'shopping',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Shop in markets and stores using quantity words, prices, and polite bargaining language.',
  vocabularyGoal: 'Use shopping nouns, colors, sizes, and money expressions.',
  grammarGoal: 'Use `berapa`, `yang`, and classifier-like measure words where Indonesian naturally needs them.',
  speakingGoal: 'Ask the price, request one item, compare two options, and complete a purchase.',
  task: 'Buy one practical item at a pasar or small shop.',
  expressionPractice: [
    practice('asking-price', 'Asking price', 'Use `berapa harganya?` naturally.'),
    practice('choosing-item', 'Choosing item', 'Use `yang` to point to the item you want.'),
    practice('bargaining', 'Bargaining politely', 'Use a soft request such as `boleh kurang?`.'),
  ],
  relatedPools: ['topic-shopping', 'topic-service'],
  items: [
    item('berapa harganya?', 'berapa harganya', '“How much is it?” The suffix `-nya` refers back to the item already under discussion.', 'Tas ini berapa harganya?', '“How much is this bag?”'),
    item('saya mau yang ini', 'saya mau yang ini', '“I want this one.” `Yang` turns “this” into a selected item rather than a bare demonstrative.', 'Saya mau yang ini, bukan yang itu.', '“I want this one, not that one.”'),
    item('lebih murah', 'lebih murah', '“Cheaper.” `Lebih` creates a comparison before the adjective.', 'Ada yang lebih murah?', '“Is there a cheaper one?”'),
    item('mahal', 'mahal', '“Expensive.” This is useful both for description and polite hesitation in bargaining.', 'Sedikit mahal untuk saya.', '“It is a little expensive for me.”'),
    item('boleh kurang?', 'boleh kurang', '“Can it be less?” A common soft bargaining question rather than a blunt demand.', 'Kalau dua, boleh kurang?', '“If I buy two, can the price be lower?”'),
    item('ukuran besar', 'ukuran besar', '“Large size.” `Ukuran` lets the learner speak clearly about size before the adjective.', 'Saya cari ukuran besar.', '“I am looking for a large size.”'),
    item('warna merah', 'warna merah', '“Red color.” Color words normally follow the noun they describe.', 'Ada warna merah?', '“Do you have red?”'),
    item('satu kilo', 'satu kilo', '“One kilogram.” Food shopping often uses measure words such as `kilo`, `bungkus`, or `botol`.', 'Saya beli satu kilo mangga.', '“I am buying one kilo of mangoes.”'),
    item('uang tunai', 'uang tunai', '“Cash.” Useful beside `kartu` and increasingly common digital-payment terms.', 'Saya bayar dengan uang tunai.', '“I will pay with cash.”'),
    item('kembalian', 'kembalian', '“Change.” This noun matters in small shops and market transactions.', 'Ini kembaliannya.', '“Here is your change.”'),
  ],
});
