const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u7',
  title: 'Level 1 · Unit 7: Dove vai? — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about destinations, movement, and simple reasons for going somewhere.',
  vocabularyGoal: 'Use place nouns and motion verbs for everyday routes.',
  grammarGoal: 'Use `andare`, `a / in`, and infinitive purpose phrases.',
  speakingGoal: 'Say where you are going and why.',
  task: 'Describe a short afternoon route through town.',
  expressionPractice: [
    practice('asking-destination', 'Asking destination', 'Use `Dove vai?`.'),
    practice('stating-destination', 'Stating destination', 'Choose `a` or `in` naturally.'),
    practice('giving-reason', 'Giving reason', 'Add an infinitive purpose phrase.'),
  ],
  relatedPools: ['topic-travel', 'topic-places'],
  items: [
    item('Dove vai?', 'dove vai?', '“Where are you going?” A direct everyday destination question.', 'Dove vai dopo la lezione?', '“Where are you going after class?”'),
    item('vado', 'vado', '“I go.” The irregular first-person form of `andare`.', 'Vado in biblioteca.', '“I am going to the library.”'),
    item('a scuola / al bar', 'a scuola / al bar', 'Use `a` with many specific places and contractions such as `al` before masculine nouns.', 'Vado al bar per un caffè.', '“I am going to the café for a coffee.”'),
    item('in città / in banca', 'in città / in banca', 'Use `in` with cities-as-areas, countries, and several common place nouns.', 'Vado in banca.', '“I am going to the bank.”'),
    item('biblioteca', 'biblioteca', '“Library.” Feminine and common in student life.', 'Vado in biblioteca per studiare.', '“I am going to the library to study.”'),
    item('stazione', 'stazione', '“Station.” Feminine.', 'La stazione è vicina.', '“The station is nearby.”'),
    item('per studiare', 'per studiare', '“In order to study.” `Per` plus infinitive is the usual beginner purpose frame.', 'Vado a casa per riposare.', '“I am going home to rest.”'),
    item('torno', 'torno', '“I return / come back.”', 'Torno a casa la sera.', '“I return home in the evening.”'),
    item('adesso', 'adesso', '“Now.” Useful for immediate plans.', 'Esco adesso.', '“I am going out now.”'),
    item('strada', 'strada', '“Street / road.” A useful route noun.', 'Questa strada è corta.', '“This road is short.”'),
  ],
});
