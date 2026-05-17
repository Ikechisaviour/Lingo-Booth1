const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u16',
  title: 'Level 1 · Unit 16: Клубы и свободное время — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and what you do in your free time.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use `любить` plus infinitive or nouns, and practice adverbs of frequency.',
  speakingGoal: 'Describe one hobby, ask about someone else’s hobby, and recommend a club.',
  task: 'Introduce your hobby and choose one student club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use `я люблю` with a hobby.'),
    practice('frequency', 'Talking frequency', 'Use `часто` or `иногда`.'),
    practice('recommending', 'Recommending club', 'Give one reason with `потому что`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('хобби', 'khobbi', '“Hobby.” A loanword that behaves conveniently as indeclinable in many contexts.', 'Моё хобби — фотография.', '“My hobby is photography.”'),
    item('клуб', 'klub', '“Club.” Useful for campus and hobby groups.', 'Я хожу в книжный клуб.', '“I go to a book club.”'),
    item('читать', 'chitat', '“To read.” Common after `любить` in hobby talk.', 'Я люблю читать романы.', '“I like reading novels.”'),
    item('играть на гитаре', 'igrat na gitare', '“Play guitar.” Instruments usually use `играть на` plus prepositional form.', 'Она играет на гитаре.', '“She plays guitar.”'),
    item('заниматься спортом', 'zanimatsya sportom', '“Do sports.” The noun appears in instrumental after this verb.', 'Я занимаюсь спортом по утрам.', '“I do sports in the mornings.”'),
    item('часто', 'chasto', '“Often.” Frequency adverbs fit naturally before or after the verb depending on emphasis.', 'Мы часто смотрим фильмы.', '“We often watch films.”'),
    item('иногда', 'inogda', '“Sometimes.” A useful moderate-frequency word.', 'Иногда я готовлю дома.', '“Sometimes I cook at home.”'),
    item('свободное время', 'svobodnoye vremya', '“Free time.” A standard frame for hobby questions.', 'Что ты делаешь в свободное время?', '“What do you do in your free time?”'),
  ],
});
