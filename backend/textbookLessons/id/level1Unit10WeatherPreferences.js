const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u10',
  title: 'Level 1 · Unit 10: Cuaca dan Kesukaan — Weather and Preferences',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe tropical weather and say what you like, dislike, or prefer.',
  vocabularyGoal: 'Use weather words, season words, and preference vocabulary.',
  grammarGoal: 'Use `suka`, `tidak suka`, and `lebih suka` with nouns or activities.',
  speakingGoal: 'Describe today’s weather and compare two simple preferences.',
  task: 'Chat about weather before choosing a weekend plan.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use one weather noun and one adjective.'),
    practice('stating-like', 'Stating a like', 'Use `suka` naturally.'),
    practice('stating-preference', 'Stating preference', 'Use `lebih suka` to compare options.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('cuaca', 'cuaca', '“Weather.” It is the umbrella noun for daily weather talk.', 'Cuaca hari ini panas.', '“The weather today is hot.”'),
    item('panas', 'panas', '“Hot.” In Indonesia this often describes ordinary daytime weather, not only extreme heat.', 'Siang ini sangat panas.', '“This afternoon is very hot.”'),
    item('hujan', 'hujan', '“Rain / to rain.” Indonesian often uses the same form as noun and verb.', 'Sore ini hujan deras.', '“This afternoon it is raining heavily.”'),
    item('musim hujan', 'musim hujan', '“Rainy season.” A central real-life season distinction in Indonesia.', 'Musim hujan mulai sekitar Oktober.', '“The rainy season starts around October.”'),
    item('cerah', 'cerah', '“Bright / clear.” It is useful for cheerful weather and visual clarity.', 'Pagi ini cerah sekali.', '“This morning is very clear.”'),
    item('saya suka', 'saya suka', '“I like.” `Suka` works with nouns and verbs without extra machinery.', 'Saya suka kopi panas.', '“I like hot coffee.”'),
    item('saya tidak suka', 'saya tidak suka', '“I do not like.” `Tidak` negates the adjective-like preference word.', 'Saya tidak suka cuaca terlalu panas.', '“I do not like weather that is too hot.”'),
    item('lebih suka', 'lebih suka', '“Prefer.” Literally “like more,” it is the standard comparison form.', 'Saya lebih suka hujan daripada panas.', '“I prefer rain to heat.”'),
    item('sejuk', 'sejuk', '“Cool / pleasantly fresh.” It is usually pleasant, unlike `dingin`, which can simply mean cold.', 'Udara pagi di Bandung sejuk.', '“The morning air in Bandung is cool.”'),
    item('karena', 'karena', '“Because.” This connector lets a preference become a fuller answer.', 'Saya suka musim hujan karena udaranya sejuk.', '“I like the rainy season because the air is cool.”'),
  ],
});
