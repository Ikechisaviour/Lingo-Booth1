const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u10',
  title: 'Level 1 · Unit 10: Cuaca dan Pilihan — Weather and Preferences',
  category: 'weather',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe tropical weather and say what conditions you like, dislike, or prefer.',
  vocabularyGoal: 'Use Malay weather words that fit the local climate rather than importing four-season assumptions.',
  grammarGoal: 'Use `suka`, `lebih suka`, and `tidak suka` with nouns and clauses to express preference.',
  speakingGoal: 'Describe today’s weather and compare two conditions you prefer.',
  task: 'Discuss the weather with a friend before choosing an outdoor plan.',
  expressionPractice: [
    practice('weather-report', 'Weather report', 'Describe temperature, rain, and sky conditions in one answer.'),
    practice('preferences', 'Preferences', 'Use `suka` and `lebih suka` accurately.'),
    practice('seasonal-context', 'Seasonal context', 'Talk about monsoon rain rather than forcing European seasons onto Malay.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('panas', 'pa.nas', '“Hot.” In Malaysia this is a high-frequency daily adjective, often paired with humidity rather than dry heat.', 'Hari ini panas sangat.', '“Today is very hot.”'),
    item('lembap', 'lem.bap', '“Humid / damp.” Useful because tropical heat is often described through moisture in the air.', 'Udara pagi ini lembap.', '“The air this morning is humid.”'),
    item('hujan', 'hu.jan', '“Rain.” It can be a noun or part of a verbal expression such as `sedang hujan`.', 'Petang ini mungkin hujan.', '“It may rain this evening.”'),
    item('ribut petir', 'ri.but pe.tir', '“Thunderstorm.” A common tropical-weather phrase rather than a rare textbook word.', 'Ada ribut petir pada waktu petang.', '“There is a thunderstorm in the evening.”'),
    item('mendung', 'men.dung', '“Cloudy / overcast.” Often predicts rain in everyday conversation.', 'Langit mendung sejak pagi.', '“The sky has been cloudy since morning.”'),
    item('musim tengkujuh', 'mu.sim teng.ku.juh', '“Monsoon season.” A culturally and geographically important season in Malaysia.', 'Pantai timur lebih basah semasa musim tengkujuh.', '“The east coast is wetter during monsoon season.”'),
    item('saya suka', 'sa.ya su.ka', '“I like.” Follow with a noun or clause without needing an equivalent of English “to.”', 'Saya suka cuaca sejuk.', '“I like cool weather.”'),
    item('saya lebih suka', 'sa.ya le.bih su.ka', '“I prefer.” `Lebih` marks comparison and turns liking into preference.', 'Saya lebih suka hujan daripada panas.', '“I prefer rain to heat.”'),
    item('daripada', 'da.ri.pa.da', '“Than / rather than” in comparisons between options.', 'Saya lebih suka pagi daripada tengah hari.', '“I prefer morning to midday.”'),
    item('kalau hujan', 'ka.lau hu.jan', '“If it rains.” `Kalau` introduces everyday conditions naturally.', 'Kalau hujan, kita makan di dalam.', '“If it rains, we will eat inside.”'),
  ],
});
