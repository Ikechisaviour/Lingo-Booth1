const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u17',
  title: 'Level 1 · Unit 17: All’ufficio postale — At the Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Send a letter or parcel, give an address, and ask about delivery.',
  vocabularyGoal: 'Use post office, parcel, stamp, address, and shipping words.',
  grammarGoal: 'Use `vorrei spedire` and destination phrases with `a / in`.',
  speakingGoal: 'Explain what you want to send and where it should go.',
  task: 'Roleplay sending a parcel abroad.',
  expressionPractice: [
    practice('sending-item', 'Sending item', 'Use `vorrei spedire`.'),
    practice('giving-address', 'Giving address', 'State the destination clearly.'),
    practice('asking-delivery', 'Asking delivery', 'Ask about cost or arrival time.'),
  ],
  relatedPools: ['topic-service', 'topic-mail'],
  items: [
    item('ufficio postale', 'ufficio postale', '“Post office.”', 'Dov’è l’ufficio postale?', '“Where is the post office?”'),
    item('lettera', 'lettera', '“Letter.”', 'Vorrei spedire una lettera.', '“I would like to send a letter.”'),
    item('pacco', 'pacco', '“Parcel / package.”', 'Questo pacco è per Roma.', '“This parcel is for Rome.”'),
    item('francobollo', 'francobollo', '“Stamp.”', 'Ho bisogno di un francobollo.', '“I need a stamp.”'),
    item('indirizzo', 'indirizzo', '“Address.”', 'Scriva l’indirizzo qui.', '“Write the address here.”'),
    item('vorrei spedire', 'vorrei spedire', '“I would like to send.” A polite service frame.', 'Vorrei spedire questo pacco.', '“I would like to send this parcel.”'),
    item('all’estero', 'all’estero', '“Abroad.”', 'Il pacco va all’estero.', '“The parcel is going abroad.”'),
    item('quanto costa?', 'quanto costa?', 'The shopping price question works for service fees too.', 'Quanto costa la spedizione veloce?', '“How much does express shipping cost?”'),
    item('veloce / ordinario', 'veloce / ordinario', '“Express / regular.”', 'Vorrei una spedizione veloce.', '“I would like express shipping.”'),
    item('quando arriva?', 'quando arriva?', '“When does it arrive?”', 'Quando arriva il pacco?', '“When does the parcel arrive?”'),
  ],
});
