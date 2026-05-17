const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u17',
  title: 'Level 1 · Unit 17: ডাকঘরে — Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle simple postal tasks such as sending letters, parcels, and asking about delivery.',
  vocabularyGoal: 'Use letter, parcel, stamp, address, and delivery words.',
  grammarGoal: 'Use object phrases, destination postpositions, and polite counter requests.',
  speakingGoal: 'Say what you want to send, where it goes, and ask when it arrives.',
  task: 'Send one parcel at a post office counter.',
  expressionPractice: [
    practice('service-need', 'Stating service need', 'Use `পাঠাতে চাই`.'),
    practice('destination', 'Giving destination', 'Use one destination phrase.'),
    practice('asking-arrival', 'Asking arrival', 'Use `কখন পৌঁছাবে?`.'),
  ],
  relatedPools: ['topic-service', 'topic-travel'],
  items: [
    item('ডাকঘর', 'dakghor', '“Post office.” A useful service-location noun.', 'ডাকঘর ব্যাংকের পাশে।', '“The post office is next to the bank.”'),
    item('চিঠি', 'chithi', '“Letter.” Practical for formal mail.', 'আমি একটা চিঠি পাঠাতে চাই।', '“I want to send a letter.”'),
    item('পার্সেল', 'parcel', '“Parcel.” A common loanword in service contexts.', 'এই পার্সেলটা খুলনায় যাবে।', '“This parcel will go to Khulna.”'),
    item('স্ট্যাম্প', 'stamp', '“Stamp.” A common loanword for postage.', 'দুইটা স্ট্যাম্প চাই।', '“I want two stamps.”'),
    item('ঠিকানা', 'thikana', '“Address.” Essential in service interactions.', 'পূর্ণ ঠিকানা লিখুন।', '“Write the full address.”'),
    item('পাঠাতে চাই', 'pathate chai', '“I want to send.” A natural counter-opening frame.', 'এই পার্সেলটা চট্টগ্রামে পাঠাতে চাই।', '“I want to send this parcel to Chattogram.”'),
    item('খরচ কত?', 'khoroch koto', '“How much is the cost?” A compact shipping question.', 'পাঠানোর খরচ কত?', '“How much is the sending cost?”'),
    item('কখন পৌঁছাবে?', 'kokhon pouchhabe', '“When will it arrive?” A concise delivery question.', 'পার্সেলটা কখন পৌঁছাবে?', '“When will the parcel arrive?”'),
  ],
});
