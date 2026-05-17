const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u17',
  title: 'Level 1 · Unit 17: Sa Post Office — At the Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Send a letter or parcel, give an address, and ask about delivery.',
  vocabularyGoal: 'Use post office, parcel, stamp, address, and shipping vocabulary.',
  grammarGoal: 'Use `gusto kong ipadala` and destination phrases with `sa`.',
  speakingGoal: 'Explain what you want to send and where it should go.',
  task: 'Roleplay sending a parcel abroad.',
  expressionPractice: [
    practice('sending-item', 'Sending item', 'Use `gusto kong ipadala`.'),
    practice('giving-address', 'Giving address', 'State the destination clearly.'),
    practice('asking-delivery', 'Asking delivery', 'Ask about cost or arrival time.'),
  ],
  relatedPools: ['topic-service', 'topic-mail'],
  items: [
    item('post office', 'post office', 'The English loan phrase is widely used in everyday Filipino.', 'Nasaan ang post office?', '“Where is the post office?”'),
    item('liham', 'liham', '“Letter.”', 'Gusto kong ipadala ang liham na ito.', '“I want to send this letter.”'),
    item('pakete', 'pakete', '“Parcel / package.”', 'Ang paketeng ito ay para sa Cebu.', '“This parcel is for Cebu.”'),
    item('selyo', 'selyo', '“Stamp.”', 'Kailangan ko ng selyo.', '“I need a stamp.”'),
    item('address / tirahan', 'address / tirahan', 'Both the English loan and native word appear; `tirahan` is literally residence.', 'Isulat ang address dito.', '“Write the address here.”'),
    item('gusto kong ipadala', 'gusto kong ipadala', '“I want to send.”', 'Gusto kong ipadala ang paketeng ito.', '“I want to send this parcel.”'),
    item('sa ibang bansa', 'sa ibang bansa', '“Abroad / to another country.”', 'Pupunta ito sa ibang bansa.', '“This is going abroad.”'),
    item('Magkano ang bayad?', 'magkano ang bayad?', '“How much is the fee?”', 'Magkano ang bayad sa express mail?', '“How much is the express-mail fee?”'),
    item('mabilis / regular', 'mabilis / regular', '“Express / regular.”', 'Gusto ko ng mabilis na pagpapadala.', '“I want fast delivery.”'),
    item('Kailan darating?', 'kailan darating?', '“When will it arrive?”', 'Kailan darating ang pakete?', '“When will the parcel arrive?”'),
  ],
});
