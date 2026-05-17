const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u10',
  title: 'Level 1 · Unit 10: मौसम — Weather and Preferences',
  category: 'weather',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe weather and say which weather or season you prefer.',
  vocabularyGoal: 'Use heat, cold, rain, wind, and season vocabulary.',
  grammarGoal: 'Use `है`, `हो रहा है`, and preference frames such as `मुझे ... पसंद है`.',
  speakingGoal: 'Describe today’s weather and compare two seasons.',
  task: 'Give a short weather update and your favorite season.',
  expressionPractice: [
    practice('describing-weather', 'Describing weather', 'Use a clear weather sentence.'),
    practice('stating-preference', 'Stating preference', 'Use `मुझे ... पसंद है`.'),
    practice('comparing-seasons', 'Comparing seasons', 'Contrast two seasons naturally.'),
  ],
  relatedPools: ['topic-weather', 'topic-preferences'],
  items: [
    item('मौसम', 'mausam', '“Weather.” A masculine noun.', 'आज मौसम अच्छा है।', '“Today the weather is nice.”'),
    item('गर्मी / ठंड', 'garmī / ṭhaṇḍ', '“Heat / cold.” Hindi often uses noun-like weather expressions rather than adjective-only ones.', 'आज बहुत गर्मी है।', '“Today it is very hot.”'),
    item('बारिश', 'bāriś', '“Rain.” Feminine.', 'बारिश हो रही है।', '“It is raining.”'),
    item('धूप', 'dhūp', '“Sunshine.”', 'आज तेज़ धूप है।', '“There is strong sunshine today.”'),
    item('हवा', 'havā', '“Wind / air.” Feminine.', 'ठंडी हवा चल रही है।', '“A cool wind is blowing.”'),
    item('गर्मी का मौसम / सर्दी का मौसम', 'garmī kā mausam / sardī kā mausam', '“Summer season / winter season.” Possessive agreement appears in the phrase.', 'मुझे सर्दी का मौसम पसंद है।', '“I like winter.”'),
    item('मुझे ... पसंद है', 'mujhe ... pasand hai', '“I like ...” Literally “to me ... is pleasing.”', 'मुझे बारिश पसंद है।', '“I like rain.”'),
    item('मैं ... पसंद करता हूँ / करती हूँ', 'main ... pasand kartā hū̃ / kartī hū̃', 'A more agentive “I prefer / like” frame with speaker-gender agreement.', 'मैं ठंडा मौसम पसंद करती हूँ।', '“I prefer cold weather.”'),
    item('तापमान', 'tāpmān', '“Temperature.”', 'आज तापमान तीस डिग्री है।', '“Today the temperature is thirty degrees.”'),
    item('आज मौसम कैसा है?', 'āj mausam kaisā hai?', '“How is the weather today?” A reusable question.', 'दिल्ली में मौसम कैसा है?', '“How is the weather in Delhi?”'),
  ],
});
