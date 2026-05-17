const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u17',
  title: 'Level 1 · Unit 17: Pejabat Pos — Post Office',
  category: 'services',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Send a parcel, ask the price, and understand basic delivery options.',
  vocabularyGoal: 'Use service vocabulary for letters, parcels, stamps, and tracking.',
  grammarGoal: 'Use the passive `di-` and transitive `-kan` forms that appear naturally in service transactions.',
  speakingGoal: 'Explain what you want to send and choose a delivery option.',
  task: 'Complete a post-office counter exchange for one parcel.',
  expressionPractice: [
    practice('sending-parcel', 'Sending a parcel', 'State what you want to send.'),
    practice('service-passive', 'Service passive', 'Recognize `dihantar`, `ditimbang`, and `dibayar`.'),
    practice('tracking', 'Tracking', 'Ask for tracking and delivery time.'),
  ],
  relatedPools: ['topic-services', 'topic-shopping'],
  items: [
    item('pejabat pos', 'pe.ja.bat pos', '“Post office.”', 'Saya pergi ke pejabat pos pagi tadi.', '“I went to the post office this morning.”'),
    item('surat', 'su.rat', '“Letter.”', 'Saya mahu hantar surat ini.', '“I want to send this letter.”'),
    item('bungkusan', 'bung.ku.san', '“Parcel / package.” The suffix `-an` turns the root into a thing.', 'Bungkusan ini untuk Johor.', '“This parcel is for Johor.”'),
    item('setem', 'se.tem', '“Stamp.”', 'Saya perlu beli setem.', '“I need to buy a stamp.”'),
    item('hantar / dihantar', 'han.tar / di.han.tar', 'Active “send” versus passive “is sent.” Passive forms are very common in service explanations.', 'Bungkusan akan dihantar esok.', '“The parcel will be sent tomorrow.”'),
    item('timbang / ditimbang', 'tim.bang / di.tim.bang', '“Weigh / is weighed.” The parcel is usually the topic at the counter.', 'Bungkusan ini perlu ditimbang.', '“This parcel needs to be weighed.”'),
    item('nombor penjejakan', 'nom.bor pen.je.ja.kan', '“Tracking number.” Built from `jejak`, “trace.”', 'Ada nombor penjejakan?', '“Is there a tracking number?”'),
    item('penghantaran biasa / ekspres', 'peng.han.ta.ran bi.a.sa / eks.pres', '“Standard / express delivery.”', 'Saya pilih penghantaran ekspres.', '“I choose express delivery.”'),
    item('berapa hari sampai?', 'be.ra.pa ha.ri sam.pai', '“How many days until it arrives?”', 'Kalau ke Sabah, berapa hari sampai?', '“If it goes to Sabah, how many days until it arrives?”'),
    item('isi borang', 'i.si bo.rang', '“Fill in a form.”', 'Tolong isi borang ini dahulu.', '“Please fill in this form first.”'),
  ],
});
