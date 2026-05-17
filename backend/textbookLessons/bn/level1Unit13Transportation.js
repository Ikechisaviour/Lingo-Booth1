const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u13',
  title: 'Level 1 · Unit 13: যাতায়াত — Transportation',
  category: 'travel',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Use transport language for buses, rickshaws, metro, and travel time.',
  vocabularyGoal: 'Use vehicle, stop, ticket, and route words.',
  grammarGoal: 'Use transport postpositions and verbs such as `যাই`, `চড়ি`, and `নামি`.',
  speakingGoal: 'Ask how to go somewhere, choose transport, and ask how long it takes.',
  task: 'Plan a trip from campus to the city center.',
  expressionPractice: [
    practice('choosing-transport', 'Choosing transport', 'Use one transport phrase.'),
    practice('asking-route', 'Asking route', 'Use one route question.'),
    practice('asking-duration', 'Asking duration', 'Use `কত সময় লাগে?`.'),
  ],
  relatedPools: ['topic-travel', 'topic-city'],
  items: [
    item('বাসে যাই', 'bas-e jai', '“I go by bus.” The ending marks transport means here.', 'আমি বিশ্ববিদ্যালয়ে বাসে যাই।', '“I go to university by bus.”'),
    item('রিকশা', 'riksha', '“Rickshaw.” A very practical local transport word.', 'ঢাকায় রিকশা খুব সাধারণ।', '“Rickshaws are very common in Dhaka.”'),
    item('মেট্রো', 'metro', '“Metro.” Increasingly important in both Dhaka and Kolkata contexts.', 'মেট্রো দ্রুত।', '“The metro is fast.”'),
    item('স্টপেজ', 'stopej', '“Stop.” A common transport noun.', 'বাস স্টপেজ কাছে।', '“The bus stop is nearby.”'),
    item('স্টেশন', 'steshon', '“Station.” Used for rail and metro.', 'পরের স্টেশনে নামবেন।', '“Get off at the next station.”'),
    item('টিকিট', 'ṭikit', '“Ticket.” Practical across transport and events.', 'একটা টিকিট চাই।', '“I want one ticket.”'),
    item('... কীভাবে যাব?', '... kibhabe jabo', '“How do I go to ...?” A practical route question.', 'মাঝখানে কীভাবে যাব?', '“How do I get to the center?”'),
    item('কত সময় লাগে?', 'koto shomoy lage', '“How long does it take?” A complete duration question.', 'বিমানবন্দরে যেতে কত সময় লাগে?', '“How long does it take to go to the airport?”'),
  ],
});
