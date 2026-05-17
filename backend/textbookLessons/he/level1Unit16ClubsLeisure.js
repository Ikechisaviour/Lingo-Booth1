const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u16',
  title: 'Level 1 · Unit 16: תחביבים ומועדונים — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby nouns and activity verbs for sports, reading, music, and clubs.',
  grammarGoal: 'Use present-tense verbs with frequency expressions and `אוהב / אוהבת`.',
  speakingGoal: 'Describe two hobbies and invite someone to one activity.',
  task: 'Introduce your leisure routine and one club you would like to join.',
  expressionPractice: [
    practice('naming-hobby', 'Naming hobby', 'Use one clear hobby noun or verb phrase.'),
    practice('stating-frequency', 'Stating frequency', 'Use `כל שבוע` or another time phrase.'),
    practice('inviting-activity', 'Inviting activity', 'Ask someone to join you.'),
  ],
  relatedPools: ['topic-leisure', 'topic-social'],
  items: [
    item('תחביב', 'takhbiv', '“Hobby.” A useful umbrella noun.', 'מה התחביב שלך?', '“What is your hobby?”'),
    item('קריאה', 'kri’a', '“Reading.” A verbal noun used for the activity itself.', 'אני אוהבת קריאה.', '“I like reading.”'),
    item('ספורט', 'sport', '“Sport.” A common loanword.', 'אני עושה ספורט כל שבוע.', '“I exercise every week.”'),
    item('כדורגל', 'kaduregel', '“Football / soccer.” Literally “ball-foot.”', 'אני משחק כדורגל עם חברים.', '“I play football with friends.”'),
    item('מוזיקה', 'muzika', '“Music.”', 'אני שומעת מוזיקה בערב.', '“I listen to music in the evening.”'),
    item('מועדון', 'mo’adon', '“Club.” Useful for student or hobby clubs.', 'אני רוצה להצטרף למועדון צילום.', '“I want to join a photography club.”'),
    item('זמן פנוי', 'zman panui', '“Free time.” An adjective phrase with masculine agreement.', 'מה אתה עושה בזמן הפנוי?', '“What do you do in your free time?”'),
    item('כל שבוע', 'kol shavua', '“Every week.” A simple frequency phrase.', 'אני הולכת למועדון כל שבוע.', '“I go to the club every week.”'),
    item('רוצה להצטרף?', 'rotse lehitshtaref?', '“Want to join?” A compact invitation.', 'את רוצה להצטרף אלינו?', '“Do you want to join us?”'),
    item('עם חברים', 'im khaverim', '“With friends.” A very useful social phrase.', 'אני רואה סרטים עם חברים.', '“I watch films with friends.”'),
  ],
});
