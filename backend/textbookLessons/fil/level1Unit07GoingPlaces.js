const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u7',
  title: 'Level 1 · Unit 7: Saan ka pupunta? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about destinations, movement, and reasons for going somewhere.',
  vocabularyGoal: 'Use place nouns and common motion verbs for daily routes.',
  grammarGoal: 'Use `sa` for destinations and notice completed / contemplated action prefixes.',
  speakingGoal: 'Say where you are going and why.',
  task: 'Describe a short afternoon route through town.',
  expressionPractice: [
    practice('asking-destination', 'Asking destination', 'Use `Saan ka pupunta?`.'),
    practice('stating-destination', 'Stating destination', 'Use `sa` before the place.'),
    practice('giving-reason', 'Giving reason', 'Add `para` plus a purpose phrase.'),
  ],
  relatedPools: ['topic-travel', 'topic-places'],
  items: [
    item('Saan ka pupunta?', 'saan ka pupunta?', '“Where are you going?” A high-frequency destination question.', 'Saan ka pupunta pagkatapos ng klase?', '“Where are you going after class?”'),
    item('pupunta', 'pupunta', '“Will go / going to go.” The contemplated aspect gives future-like meaning.', 'Pupunta ako sa palengke.', '“I will go to the market.”'),
    item('sa paaralan', 'sa paaralan', '“To school.” `Sa` marks location and destination.', 'Pupunta ang mga bata sa paaralan.', '“The children will go to school.”'),
    item('aklatan', 'aklatan', '“Library.”', 'Pupunta ako sa aklatan para mag-aral.', '“I will go to the library to study.”'),
    item('istasyon', 'istasyon', '“Station.”', 'Nasaan ang istasyon?', '“Where is the station?”'),
    item('para', 'para', '“For / in order to.” Useful before purpose phrases.', 'Pupunta ako sa tindahan para bumili ng tinapay.', '“I will go to the store to buy bread.”'),
    item('uuwi', 'uuwi', '“Will go home.” A common homeward motion verb.', 'Uuwi ako sa gabi.', '“I will go home in the evening.”'),
    item('ngayon', 'ngayon', '“Now / today.” Context gives the exact sense.', 'Aalis ako ngayon.', '“I am leaving now.”'),
  ],
});
