const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u15',
  title: 'Level 1 · Unit 15: Telefon ve Mesajlar — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make short calls, leave messages, and ask for repetition.',
  vocabularyGoal: 'Use phone, message, number, and callback vocabulary.',
  grammarGoal: 'Use polite request forms with `-abilir misiniz` and concise report phrases.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening call', 'Use one phone greeting and identify yourself.'),
    practice('leaving-message', 'Leaving message', 'Use `mesaj bırakabilir miyim?`.'),
    practice('asking-repeat', 'Asking repetition', 'Use `tekrar eder misiniz?`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('alo', 'a-LO', 'The standard Turkish phone greeting.', 'Alo, ben Elif.', '“Hello, this is Elif.”'),
    item('... ile görüşebilir miyim?', 'i-LE gö-rü-şe-bi-LİR mi-YİM', '“May I speak with ...?” A polite phone request.', 'Ayşe Hanım ile görüşebilir miyim?', '“May I speak with Ms. Ayşe?”'),
    item('şu anda burada değil', 'şu an-DA bu-ra-DA de-ĞİL', '“Is not here right now.” A simple status phrase.', 'Şu anda burada değil.', '“He is not here right now.”'),
    item('mesaj', 'me-SAJ', '“Message.” Useful for phone and app contexts.', 'Mesaj bırakabilir miyim?', '“May I leave a message?”'),
    item('lütfen söyler misiniz?', 'lüt-FEN söy-LER mi-Sİ-niz', '“Could you please tell them?” A courteous relay request.', 'Aradığımı lütfen söyler misiniz?', '“Could you please say that I called?”'),
    item('telefon numarası', 'te-le-FON nu-ma-ra-SI', '“Phone number.” A possessed compound in Turkish form.', 'Telefon numaranız nedir?', '“What is your phone number?”'),
    item('tekrar eder misiniz?', 'tek-RAR e-DER mi-Sİ-niz', '“Could you repeat?” A crucial repair phrase.', 'Numarayı tekrar eder misiniz?', '“Could you repeat the number?”'),
    item('sonra tekrar ararım', 'son-RA tek-RAR a-ra-RIM', '“I will call again later.” A natural call-ending promise.', 'Tamam, sonra tekrar ararım.', '“Okay, I will call again later.”'),
  ],
});
