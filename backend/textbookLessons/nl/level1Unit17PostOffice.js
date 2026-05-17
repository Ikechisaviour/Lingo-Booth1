const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u17',
  title: 'Level 1 · Unit 17: Op het Postkantoor — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle simple postal tasks such as sending letters, parcels, and asking about delivery.',
  vocabularyGoal: 'Use letter, parcel, stamp, address, and delivery vocabulary.',
  grammarGoal: 'Use `ik wil graag versturen`, destination phrases with `naar`, and service questions.',
  speakingGoal: 'Say what you want to send, where it goes, and ask when it arrives.',
  task: 'Send one parcel at a counter.',
  expressionPractice: [
    practice('service-need', 'Stating service need', 'Use `ik wil graag versturen`.'),
    practice('destination', 'Giving destination', 'Use `naar`.'),
    practice('asking-arrival', 'Asking arrival', 'Use `wanneer komt het aan?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('postkantoor', 'POST-kan-tor', '“Post office.” A useful service compound.', 'Het postkantoor is naast de bank.', '“The post office is next to the bank.”'),
    item('brief', 'breef', '“Letter.” Still important for formal mail.', 'Ik wil graag een brief versturen.', '“I would like to send a letter.”'),
    item('pakket', 'pa-KET', '“Parcel / package.” A practical service noun.', 'Dit pakket gaat naar Rotterdam.', '“This parcel goes to Rotterdam.”'),
    item('postzegel', 'POST-zay-khel', '“Stamp.” Literally “post seal.”', 'Ik heb twee postzegels nodig.', '“I need two stamps.”'),
    item('adres', 'a-DRES', '“Address.” Essential for service interactions.', 'Schrijf het volledige adres op.', '“Write down the full address.”'),
    item('versturen', 'fer-STY-ren', '“To send.” Common in postal contexts.', 'Ik wil dit pakket naar Leiden versturen.', '“I want to send this package to Leiden.”'),
    item('verzendkosten', 'fer-ZENT-kos-ten', '“Shipping costs.” A transparent service compound.', 'Hoeveel zijn de verzendkosten?', '“How much are the shipping costs?”'),
    item('wanneer komt het aan?', 'va-NEER komt hət ahn', '“When does it arrive?” The separable verb `aankomen` splits here.', 'Wanneer komt het pakket aan?', '“When does the package arrive?”'),
  ],
});
