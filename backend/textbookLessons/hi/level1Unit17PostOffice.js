const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u17',
  title: 'Level 1 · Unit 17: डाकघर में — At the Post Office',
  category: 'service',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Send a letter or parcel, give an address, and ask about delivery.',
  vocabularyGoal: 'Use post office, parcel, stamp, address, and shipping words.',
  grammarGoal: 'Use `मुझे ... भेजना है` and destination phrases with `को`.',
  speakingGoal: 'Explain what you want to send and where it should go.',
  task: 'Roleplay sending a parcel abroad.',
  expressionPractice: [
    practice('sending-item', 'Sending item', 'Use `मुझे ... भेजना है`.'),
    practice('giving-address', 'Giving address', 'State the destination clearly.'),
    practice('asking-delivery', 'Asking delivery', 'Ask about cost or arrival time.'),
  ],
  relatedPools: ['topic-service', 'topic-mail'],
  items: [
    item('डाकघर', 'ḍākghar', '“Post office.” Literally “mail house.”', 'डाकघर कहाँ है?', '“Where is the post office?”'),
    item('पत्र', 'patra', '“Letter.” Slightly formal but useful.', 'मुझे एक पत्र भेजना है।', '“I need to send a letter.”'),
    item('पार्सल', 'pārsal', '“Parcel.” A common loanword.', 'यह पार्सल दिल्ली को है।', '“This parcel is for Delhi.”'),
    item('टिकट / डाक टिकट', 'ṭikaṭ / ḍāk ṭikaṭ', '“Stamp / postage stamp.”', 'मुझे डाक टिकट चाहिए।', '“I need a postage stamp.”'),
    item('पता', 'patā', '“Address.”', 'यहाँ पता लिखिए।', '“Write the address here.”'),
    item('मुझे ... भेजना है', 'mujhe ... bhejnā hai', '“I need to send ...” A natural service frame.', 'मुझे यह पार्सल भेजना है।', '“I need to send this parcel.”'),
    item('विदेश', 'videś', '“Foreign country / abroad.”', 'यह पार्सल विदेश जाना है।', '“This parcel has to go abroad.”'),
    item('कितना खर्च होगा?', 'kitnā kharch hogā?', '“How much will it cost?” A practical service question.', 'तेज़ डाक का कितना खर्च होगा?', '“How much will express mail cost?”'),
    item('तेज़ / साधारण', 'tez / sādhāraṇ', '“Express / regular.”', 'मुझे तेज़ डाक चाहिए।', '“I need express mail.”'),
    item('कब पहुँचेगा?', 'kab pahũcegā?', '“When will it arrive?”', 'पार्सल कब पहुँचेगा?', '“When will the parcel arrive?”'),
  ],
});
