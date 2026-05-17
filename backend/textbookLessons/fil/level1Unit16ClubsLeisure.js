const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u16',
  title: 'Level 1 · Unit 16: Libangan at Samahan — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby nouns and activity verbs for sports, reading, music, and clubs.',
  grammarGoal: 'Use actor-focus verbs and preference frames with `gusto`.',
  speakingGoal: 'Describe two hobbies and invite someone to one activity.',
  task: 'Introduce your leisure routine and one club you would like to join.',
  expressionPractice: [
    practice('naming-hobby', 'Naming hobby', 'Use one clear hobby phrase.'),
    practice('stating-frequency', 'Stating frequency', 'Use `tuwing linggo`.'),
    practice('inviting-activity', 'Inviting activity', 'Ask someone to join you.'),
  ],
  relatedPools: ['topic-leisure', 'topic-social'],
  items: [
    item('libangan', 'libangan', '“Hobby / pastime.”', 'Ano ang libangan mo?', '“What is your hobby?”'),
    item('pagbabasa', 'pagbabasa', '“Reading.”', 'Gusto ko ang pagbabasa.', '“I like reading.”'),
    item('palakasan', 'palakasan', '“Sports / athletics.”', 'Nag-eehersisyo ako tuwing linggo.', '“I exercise every week.”'),
    item('football', 'football', 'The English loanword is common beside `sipa`-based local vocabulary.', 'Naglalaro ako ng football kasama ang mga kaibigan.', '“I play football with friends.”'),
    item('musika', 'musika', '“Music.”', 'Nakikinig ako ng musika sa gabi.', '“I listen to music in the evening.”'),
    item('samahan', 'samahan', '“Club / association.”', 'Gusto kong sumali sa samahan ng wika.', '“I want to join the language club.”'),
    item('oras na libre', 'oras na libre', '“Free time.”', 'Ano ang ginagawa mo sa oras na libre?', '“What do you do in your free time?”'),
    item('tuwing linggo', 'tuwing linggo', '“Every week / every Sunday” depending context; common in routine talk.', 'Pumupunta ako sa club tuwing linggo.', '“I go to the club every week.”'),
    item('Gusto mo bang sumali?', 'gusto mo bang sumali?', '“Do you want to join?”', 'Gusto mo bang sumali sa amin?', '“Do you want to join us?”'),
    item('kasama ang mga kaibigan', 'kasama ang mga kaibigan', '“With friends.”', 'Nanood ako ng pelikula kasama ang mga kaibigan.', '“I watched a film with friends.”'),
  ],
});
