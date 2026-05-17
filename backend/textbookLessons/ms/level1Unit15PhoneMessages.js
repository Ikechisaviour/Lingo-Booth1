const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u15',
  title: 'Level 1 · Unit 15: Panggilan dan Mesej — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Handle a short phone call, leave a message, and ask someone to call back.',
  vocabularyGoal: 'Use common phone and messaging vocabulary from both formal Malay and everyday digital life.',
  grammarGoal: 'Use polite imperatives with `tolong`, passive `di-` forms in notices, and the particle `ya` for soft confirmation.',
  speakingGoal: 'Take a message and repeat the caller’s request accurately.',
  task: 'Roleplay calling an office when the person you need is unavailable.',
  expressionPractice: [
    practice('answering-phone', 'Answering the phone', 'Open a call naturally and identify yourself.'),
    practice('taking-message', 'Taking a message', 'Ask for a name, number, and reason.'),
    practice('calling-back', 'Calling back', 'Request a return call politely.'),
  ],
  relatedPools: ['topic-phone', 'topic-work'],
  items: [
    item('panggilan telefon', 'pang.gi.lan te.le.fon', '“Phone call.” `Panggilan` comes from the verb `panggil`, “call.”', 'Saya terima panggilan telefon pagi tadi.', '“I received a phone call this morning.”'),
    item('mesej', 'me.sej', '“Message.” Common in both formal and digital contexts.', 'Saya sudah hantar mesej.', '“I have sent a message.”'),
    item('Siapa bercakap?', 'si.a.pa ber.ca.kap', '“Who is speaking?” More natural on the phone than a literal translation of “who are you?”', 'Maaf, siapa bercakap?', '“Sorry, who is speaking?”'),
    item('Boleh saya tinggalkan mesej?', 'bo.leh sa.ya ting.gal.kan me.sej', '“May I leave a message?”', 'Dia tiada. Boleh saya tinggalkan mesej?', '“He is not here. May I leave a message?”'),
    item('tolong hubungi saya semula', 'to.long hu.bu.ngi sa.ya se.mu.la', '“Please contact me again / call me back.” `Semula` adds the “again/back” sense.', 'Tolong hubungi saya semula petang ini.', '“Please call me back this evening.”'),
    item('nombor telefon', 'nom.bor te.le.fon', '“Phone number.”', 'Apa nombor telefon puan?', '“What is your phone number, ma’am?”'),
    item('sedang dalam mesyuarat', 'se.dang da.lam me.syua.rat', '“Currently in a meeting.” A useful workplace explanation.', 'Encik Lim sedang dalam mesyuarat.', '“Mr Lim is currently in a meeting.”'),
    item('akan saya sampaikan', 'a.kan sa.ya sam.pai.kan', '“I will pass it on.” The object can stay understood because the message was just mentioned.', 'Baik, mesej itu akan saya sampaikan.', '“Alright, I will pass on that message.”'),
    item('telefon bimbit', 'te.le.fon bim.bit', '“Mobile phone.”', 'Telefon bimbit saya kehabisan bateri.', '“My mobile phone ran out of battery.”'),
    item('WhatsApp saya ya', 'wot.sep sa.ya ya', 'Everyday mixed register: using the app name as a verb plus `ya` to soften the request.', 'Kalau sudah sampai, WhatsApp saya ya.', '“When you arrive, WhatsApp me, okay?”'),
  ],
});
