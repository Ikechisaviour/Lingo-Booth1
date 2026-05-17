const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u13',
  title: 'Level 1 · Unit 13: I trasporti — Transportation',
  category: 'transport',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Choose transport, ask how to get somewhere, and describe a route.',
  vocabularyGoal: 'Use bus, train, metro, ticket, and station words.',
  grammarGoal: 'Use `in` for transport means and `da ... a ...` for routes.',
  speakingGoal: 'Explain how you travel from one place to another.',
  task: 'Ask for the best way to reach a destination and describe your commute.',
  expressionPractice: [
    practice('naming-transport', 'Naming transport', 'Use the right vehicle noun.'),
    practice('describing-route', 'Describing route', 'Combine origin, destination, and means.'),
    practice('asking-how', 'Asking how', 'Use a practical route question.'),
  ],
  relatedPools: ['topic-transport', 'topic-travel'],
  items: [
    item('autobus', 'autobus', '“Bus.”', 'Vado in autobus.', '“I go by bus.”'),
    item('treno', 'treno', '“Train.”', 'Il treno è veloce.', '“The train is fast.”'),
    item('metropolitana', 'metropolitana', '“Metro / subway.”', 'Prendo la metropolitana per andare al lavoro.', '“I take the metro to go to work.”'),
    item('macchina', 'macchina', '“Car.” Common in everyday Italian.', 'Vado in macchina.', '“I go by car.”'),
    item('biglietto', 'biglietto', '“Ticket.”', 'Vorrei un biglietto per Roma.', '“I would like a ticket to Rome.”'),
    item('stazione', 'stazione', '“Station.”', 'Dov’è la stazione?', '“Where is the station?”'),
    item('in', 'in', 'Used with many means of transport: `in treno`, `in autobus`, `in macchina`.', 'Vado in treno.', '“I go by train.”'),
    item('da ... a ...', 'da ... a ...', '“From ... to ...” for routes.', 'Vado da Milano a Torino.', '“I go from Milan to Turin.”'),
    item('come arrivo a ...?', 'come arrivo a ...?', '“How do I get to ...?”', 'Come arrivo alla stazione?', '“How do I get to the station?”'),
    item('a piedi', 'a piedi', '“On foot.”', 'Se è vicino, vado a piedi.', '“If it is near, I walk.”'),
  ],
});
