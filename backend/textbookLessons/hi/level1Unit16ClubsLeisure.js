const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u16',
  title: 'Level 1 · Unit 16: शौक और क्लब — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby nouns and activity verbs for sports, reading, music, and clubs.',
  grammarGoal: 'Use habitual present forms and `पसंद है` for preferences.',
  speakingGoal: 'Describe two hobbies and invite someone to one activity.',
  task: 'Introduce your leisure routine and one club you would like to join.',
  expressionPractice: [
    practice('naming-hobby', 'Naming hobby', 'Use a hobby noun or activity phrase.'),
    practice('stating-frequency', 'Stating frequency', 'Use `हर सप्ताह`.'),
    practice('inviting-activity', 'Inviting activity', 'Ask someone to join you.'),
  ],
  relatedPools: ['topic-leisure', 'topic-social'],
  items: [
    item('शौक', 'śauk', '“Hobby.”', 'आपका शौक क्या है?', '“What is your hobby?”'),
    item('पढ़ना', 'paṛhnā', '“Reading.” The infinitive can name the activity itself.', 'मुझे पढ़ना पसंद है।', '“I like reading.”'),
    item('खेल', 'khel', '“Sport / game.”', 'मैं हर सप्ताह खेल खेलता हूँ।', '“I play sports every week.”'),
    item('फ़ुटबॉल', 'phuṭbŏl', '“Football / soccer.”', 'मैं दोस्तों के साथ फ़ुटबॉल खेलता हूँ।', '“I play football with friends.”'),
    item('संगीत', 'saṅgīt', '“Music.”', 'मैं शाम को संगीत सुनती हूँ।', '“I listen to music in the evening.”'),
    item('क्लब', 'klab', '“Club.”', 'मैं भाषा क्लब में शामिल होना चाहता हूँ।', '“I want to join the language club.”'),
    item('खाली समय', 'khālī samay', '“Free time.”', 'आप खाली समय में क्या करते हैं?', '“What do you do in your free time?”'),
    item('हर सप्ताह', 'har saptāh', '“Every week.”', 'मैं हर सप्ताह पुस्तकालय जाता हूँ।', '“I go to the library every week.”'),
    item('क्या आप शामिल होना चाहेंगे?', 'kyā āp śāmil honā chāheṅge?', '“Would you like to join?” A polite invitation.', 'क्या आप हमारे साथ शामिल होना चाहेंगे?', '“Would you like to join us?”'),
    item('दोस्तों के साथ', 'dostõ ke sāth', '“With friends.”', 'मैं दोस्तों के साथ फ़िल्म देखता हूँ।', '“I watch films with friends.”'),
  ],
});
