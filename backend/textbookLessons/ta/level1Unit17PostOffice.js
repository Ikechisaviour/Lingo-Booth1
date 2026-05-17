const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u17',
  title: 'Level 1 · Unit 17: அஞ்சலகத்தில் — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle simple postal tasks such as sending letters, parcels, and asking about delivery.',
  vocabularyGoal: 'Use letter, parcel, stamp, address, and delivery words.',
  grammarGoal: 'Use object marking, destination marking, and polite service requests.',
  speakingGoal: 'Say what you want to send, where it goes, and ask when it arrives.',
  task: 'Send one parcel at a post office counter.',
  expressionPractice: [
    practice('service-need', 'Stating service need', 'Use `அனுப்ப வேண்டும்`.'),
    practice('destination', 'Giving destination', 'Use one dative destination.'),
    practice('asking-arrival', 'Asking arrival', 'Use `எப்போது சேரும்?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('அஞ்சலகம்', 'añcalakam', '“Post office.” A useful service-location noun.', 'அஞ்சலகம் வங்கியின் அருகில் உள்ளது.', '“The post office is near the bank.”'),
    item('கடிதம்', 'kaṭitam', '“Letter.” Practical for formal mail.', 'ஒரு கடிதம் அனுப்ப வேண்டும்.', '“I need to send a letter.”'),
    item('பார்சல்', 'pārcal', '“Parcel.” A common loanword in service contexts.', 'இந்த பார்சல் மதுரைக்கு போகிறது.', '“This parcel is going to Madurai.”'),
    item('முத்திரை', 'muttirai', '“Stamp.” A small but necessary postal noun.', 'இரண்டு முத்திரைகள் வேண்டும்.', '“I want two stamps.”'),
    item('முகவரி', 'mukavari', '“Address.” Essential in service interactions.', 'முழு முகவரியை எழுதுங்கள்.', '“Write the full address.”'),
    item('அனுப்ப வேண்டும்', 'aṉuppa vēṇṭum', '“Need to send.” A natural counter-opening frame.', 'இந்த பார்சலை கோயம்புத்தூருக்கு அனுப்ப வேண்டும்.', '“I need to send this parcel to Coimbatore.”'),
    item('கட்டணம்', 'kaṭṭaṇam', '“Fee / charge.” Useful for postage costs.', 'அனுப்பும் கட்டணம் எவ்வளவு?', '“How much is the sending fee?”'),
    item('எப்போது சேரும்?', 'eppōtu cērum', '“When will it arrive?” A concise delivery question.', 'பார்சல் எப்போது சேரும்?', '“When will the parcel arrive?”'),
  ],
});
