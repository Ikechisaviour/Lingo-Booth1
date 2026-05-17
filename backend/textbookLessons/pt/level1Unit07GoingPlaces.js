const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u7',
  title: 'Level 1 · Unit 7: Indo a Lugares — Going Places',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Say where you are, where you are going, and how to get there.',
  vocabularyGoal: 'Use common destinations, route words, and direction phrases.',
  grammarGoal: 'Use `em`, `a`, and `para` with contractions such as `ao`, `à`, `no`, and `na` where Portuguese requires them.',
  speakingGoal: 'Ask for a route and give one short direction.',
  task: 'Guide a visitor from campus to a nearby cafe.',
  expressionPractice: [
    practice('stating-location', 'Stating location', 'Use `no` or `na` with a place.'),
    practice('stating-destination', 'Stating destination', 'Use `vou ao/à` naturally.'),
    practice('asking-route', 'Asking route', 'Use `como chego a ...?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-directions'],
  items: [
    item('estou na universidade', 'es-TOH na oo-nee-ver-see-da-jee', '“I am at the university.” `Na` is the contraction of `em + a`.', 'Estou na universidade agora.', '“I am at the university now.”'),
    item('vou ao mercado', 'voh ao mer-KA-doo', '“I am going to the market.” `Ao` is `a + o`, a contraction learners must hear as one unit.', 'Vou ao mercado depois da aula.', '“I am going to the market after class.”'),
    item('vou à biblioteca', 'voh a bee-blee-o-TEH-ka', '“I am going to the library.” The accent in `à` marks the contraction `a + a`.', 'Vou à biblioteca estudar.', '“I am going to the library to study.”'),
    item('venho de casa', 'VEN-yoo djee KA-za', '“I come from home.” `De` marks origin and often contracts with articles in other nouns.', 'Venho de casa todos os dias.', '“I come from home every day.”'),
    item('vire à esquerda', 'VEE-ree a es-KER-da', '“Turn left.” A useful polite imperative for directions.', 'No semáforo, vire à esquerda.', '“At the traffic light, turn left.”'),
    item('siga em frente', 'SEE-ga eng FREN-chee', '“Go straight ahead.” This is one of the most reusable direction formulas.', 'Siga em frente até o banco.', '“Go straight until the bank.”'),
    item('perto / longe', 'PER-too / LON-zhee', '“Near / far.” They answer many route questions by themselves.', 'O metrô fica perto, não longe.', '“The metro is nearby, not far.”'),
    item('como chego a ...?', 'KOH-moo SHE-goo a', '“How do I get to ...?” A full practical question for asking directions.', 'Como chego à estação?', '“How do I get to the station?”'),
    item('atrás de', 'a-TRAS djee', '“Behind.” Portuguese uses prepositional phrases heavily for landmarks.', 'O café fica atrás do museu.', '“The cafe is behind the museum.”'),
    item('em frente a', 'eng FREN-chee a', '“In front of / opposite.” It is useful for urban landmarks and service directions.', 'A farmácia fica em frente ao banco.', '“The pharmacy is across from the bank.”'),
  ],
});
