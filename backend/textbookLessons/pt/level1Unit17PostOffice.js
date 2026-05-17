const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u17',
  title: 'Level 1 · Unit 17: Correios — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle simple postal tasks such as sending letters, parcels, and asking delivery questions.',
  vocabularyGoal: 'Use letter, package, stamp, address, and shipping vocabulary.',
  grammarGoal: 'Use `quero enviar`, `para`, and passive-style service forms such as `foi enviado`.',
  speakingGoal: 'Say what you want to send, where it goes, and ask when it arrives.',
  task: 'Send one parcel at a counter.',
  expressionPractice: [
    practice('service-need', 'Stating service need', 'Use `quero enviar`.'),
    practice('destination', 'Giving destination', 'Use `para` with the destination.'),
    practice('arrival', 'Asking arrival', 'Use `quando chega?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('correio', 'ko-HAY-oo', '“Post office / mail.” Context decides whether the place or the service is meant.', 'O correio fica ao lado do banco.', '“The post office is next to the bank.”'),
    item('carta', 'KAR-ta', '“Letter.” Still useful for formal documents and greetings.', 'Quero enviar uma carta.', '“I want to send a letter.”'),
    item('pacote', 'pa-KOH-chee', '“Package / parcel.” A practical service noun.', 'Este pacote vai para Porto Alegre.', '“This package goes to Porto Alegre.”'),
    item('selo', 'SEH-loo', '“Stamp.” A concrete postal item beginners cannot guess from context alone.', 'Preciso de dois selos.', '“I need two stamps.”'),
    item('endereço', 'en-deh-REH-soo', '“Address.” Note the nasal initial and cedilla in writing.', 'Escreva o endereço completo.', '“Write the full address.”'),
    item('quero enviar', 'KEH-roo en-vee-AR', '“I want to send.” A natural counter opening.', 'Quero enviar este pacote para Recife.', '“I want to send this package to Recife.”'),
    item('frete', 'FREH-chee', '“Shipping cost.” Common in parcel and online shopping contexts.', 'Quanto fica o frete?', '“How much is the shipping?”'),
    item('quando chega?', 'KWAN-doo SHEH-ga', '“When does it arrive?” Compact and practical.', 'Quando chega em Lisboa?', '“When does it arrive in Lisbon?”'),
    item('código de rastreio', 'KOH-jee-goo djee hash-TRAY-oo', '“Tracking code.” More transparent than a literal “receipt number.”', 'Aqui está o código de rastreio.', '“Here is the tracking code.”'),
    item('foi enviado', 'foy en-vee-A-doo', '“Was sent.” A service update phrase learners often see in notifications.', 'O pacote foi enviado ontem.', '“The package was sent yesterday.”'),
  ],
});
