const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u17',
  title: 'Level 1 · Unit 17: Postanede — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle simple postal tasks such as sending letters, parcels, and asking about delivery.',
  vocabularyGoal: 'Use letter, parcel, stamp, address, and delivery words.',
  grammarGoal: 'Use `göndermek`, destination suffixes, and polite service questions.',
  speakingGoal: 'Say what you want to send, where it goes, and ask when it arrives.',
  task: 'Send one parcel at a post office counter.',
  expressionPractice: [
    practice('service-need', 'Stating service need', 'Use `göndermek istiyorum`.'),
    practice('destination', 'Giving destination', 'Use a dative destination.'),
    practice('asking-arrival', 'Asking arrival', 'Use `ne zaman ulaşır?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('postane', 'pos-ta-NE', '“Post office.” A familiar service-location word.', 'Postane bankanın yanında.', '“The post office is next to the bank.”'),
    item('mektup', 'mek-TUP', '“Letter.” Useful for documents and formal mail.', 'Bir mektup göndermek istiyorum.', '“I want to send a letter.”'),
    item('paket', 'pa-KET', '“Package / parcel.” Practical in postal and delivery contexts.', 'Bu paket İzmir’e gidiyor.', '“This package is going to Izmir.”'),
    item('pul', 'PUL', '“Stamp.” A small but important postal noun.', 'İki pul istiyorum.', '“I want two stamps.”'),
    item('adres', 'ad-RES', '“Address.” Essential for service interactions.', 'Lütfen tam adresi yazın.', '“Please write the full address.”'),
    item('göndermek istiyorum', 'gön-der-MEK is-ti-YO-rum', '“I want to send.” A natural counter opening.', 'Bu paketi Ankara’ya göndermek istiyorum.', '“I want to send this package to Ankara.”'),
    item('kargo ücreti', 'kar-GO üc-RE-ti', '“Shipping fee.” A practical service phrase.', 'Kargo ücreti ne kadar?', '“How much is the shipping fee?”'),
    item('ne zaman ulaşır?', 'ne za-MAN u-la-ŞIR', '“When will it arrive?” A concise delivery question.', 'Paket ne zaman ulaşır?', '“When will the package arrive?”'),
  ],
});
