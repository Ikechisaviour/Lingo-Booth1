const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u9',
  title: 'Level 1 · Unit 9: Pesan Makanan — Ordering Food',
  category: 'food',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Order food and drinks at a warung or cafe while adjusting spice, sweetness, and takeaway needs.',
  vocabularyGoal: 'Use common food, drink, portion, and service words.',
  grammarGoal: 'Use `mau`, `minta`, and `tanpa` to request, specify, and remove details.',
  speakingGoal: 'Place a complete order, change one detail, and confirm it.',
  task: 'Roleplay ordering lunch and a drink at a warung.',
  expressionPractice: [
    practice('ordering', 'Ordering politely', 'Use `saya mau` or `minta` with a natural tone.'),
    practice('changing-detail', 'Changing a detail', 'Add `tanpa`, `kurang`, or `tidak` naturally.'),
    practice('takeaway', 'Choosing takeaway', 'Use `makan di sini` or `bungkus`.'),
  ],
  relatedPools: ['topic-food', 'topic-service'],
  items: [
    item('saya mau', 'saya mau', '“I want / I would like.” In service settings it is everyday and acceptable, especially with a friendly tone.', 'Saya mau nasi goreng satu.', '“I would like one fried rice.”'),
    item('minta', 'minta', '“Please give / I request.” It is compact and very common in ordering.', 'Minta teh manis dingin.', '“Sweet iced tea, please.”'),
    item('kurang manis', 'kurang manis', '“Less sweet.” This is especially useful because many Indonesian drinks are sweet by default.', 'Es teh satu, kurang manis.', '“One iced tea, less sweet.”'),
    item('tidak pedas', 'tidak pedas', '“Not spicy.” `Tidak` negates adjectives and verbs, not nouns.', 'Saya mau mie tidak pedas.', '“I want noodles that are not spicy.”'),
    item('tanpa es', 'tanpa es', '“Without ice.” `Tanpa` removes an ingredient or feature cleanly.', 'Kopi tanpa es, ya.', '“Coffee without ice, please.”'),
    item('makan di sini', 'makan di sini', '“Eat here.” It contrasts with takeaway language in restaurants and stalls.', 'Makan di sini atau dibungkus?', '“Eat here or take away?”'),
    item('bungkus', 'bungkus', '“Take away / wrap it.” The same word can name the action or the takeaway request.', 'Nasinya bungkus saja.', '“Just make the rice takeaway.”'),
    item('satu porsi', 'satu porsi', '“One portion.” Food orders often need a serving measure rather than only a bare number.', 'Satu porsi sate ayam.', '“One portion of chicken satay.”'),
    item('sudah semua?', 'sudah semua', '“Is that all?” `Sudah` often marks completion rather than past tense in a narrow English sense.', 'Pelayan bertanya, “Sudah semua?”', '“The server asks, ‘Is that all?’”'),
    item('berapa totalnya?', 'berapa totalnya', '“What is the total?” Useful once the order is complete.', 'Berapa totalnya semuanya?', '“What is the total altogether?”'),
  ],
});
