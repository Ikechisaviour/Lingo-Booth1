const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u16',
  title: 'Level 1 · Unit 16: Kulüpler ve Boş Zaman — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use verb nouns in `-mek/-mak`, `seviyorum`, and adverbs such as `sık sık`.',
  speakingGoal: 'Describe one hobby, ask about another person’s hobby, and recommend a club.',
  task: 'Introduce your hobby and choose one campus club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use `... yapmayı seviyorum`.'),
    practice('frequency', 'Talking frequency', 'Use `sık sık` or `bazen`.'),
    practice('recommending', 'Recommending club', 'Give one reason with `çünkü`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('hobi', 'ho-Bİ', '“Hobby.” A common everyday loanword.', 'Hobim fotoğraf çekmek.', '“My hobby is taking photos.”'),
    item('kulüp', 'ku-LÜP', '“Club.” Useful for campus and social groups.', 'Tiyatro kulübüne katılıyorum.', '“I am joining the theater club.”'),
    item('kitap okumak', 'ki-TAP o-ku-MAK', '“Reading books.” Infinitive forms often name activities.', 'Kitap okumayı seviyorum.', '“I like reading books.”'),
    item('gitar çalmak', 'gi-TAR çal-MAK', '“Playing guitar.”', 'O gitar çalmayı seviyor.', '“She likes playing guitar.”'),
    item('spor yapmak', 'SPOR yap-MAK', '“Doing sports.” Turkish often uses `yapmak` with activity nouns.', 'Hafta sonu spor yapıyorum.', '“I do sports on weekends.”'),
    item('sık sık', 'SIK SIK', '“Often.” Reduplication intensifies frequency.', 'Sık sık film izliyorum.', '“I often watch films.”'),
    item('bazen', 'ba-ZEN', '“Sometimes.” Useful for moderate frequency.', 'Bazen evde yemek yapıyorum.', '“Sometimes I cook at home.”'),
    item('boş zaman', 'BOŞ za-MAN', '“Free time.” A standard frame for hobby questions.', 'Boş zamanında ne yapıyorsun?', '“What do you do in your free time?”'),
  ],
});
