const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('id', {
  slug: 'id-l1u16',
  title: 'Level 1 · Unit 16: Klub dan Waktu Luang — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, clubs, and regular leisure activities.',
  vocabularyGoal: 'Use hobby words, club words, and frequency expressions.',
  grammarGoal: 'Use `suka`, `sering`, `kadang-kadang`, and `ber-` activity verbs in simple descriptions.',
  speakingGoal: 'Describe one hobby, ask about someone else’s hobby, and choose a club.',
  task: 'Introduce your hobby and recommend one campus club.',
  expressionPractice: [
    practice('stating-hobby', 'Stating hobby', 'Use `saya suka` plus an activity.'),
    practice('frequency', 'Talking frequency', 'Use `sering` or `kadang-kadang`.'),
    practice('recommending-club', 'Recommending club', 'Give one reason with `karena`.'),
  ],
  relatedPools: ['topic-leisure', 'topic-campus'],
  items: [
    item('hobi', 'hobi', '“Hobby.” It is a common loanword and appears naturally in introductions.', 'Hobi saya membaca.', '“My hobby is reading.”'),
    item('klub', 'klub', '“Club.” Campus clubs are a useful beginner topic because they create real choices.', 'Saya ikut klub fotografi.', '“I join the photography club.”'),
    item('membaca', 'membaca', '“To read.” The `meN-` prefix is part of the active verb form learners will keep meeting.', 'Saya suka membaca novel.', '“I like reading novels.”'),
    item('bermain gitar', 'bermain gitar', '“Play guitar.” `Ber-` often marks activities or intransitive actions.', 'Dia sering bermain gitar.', '“He often plays guitar.”'),
    item('olahraga', 'olahraga', '“Exercise / sport.” It can function as noun or activity in everyday speech.', 'Saya olahraga setiap pagi.', '“I exercise every morning.”'),
    item('sering', 'sering', '“Often.” Frequency adverbs normally come before the main verb.', 'Kami sering menonton film.', '“We often watch films.”'),
    item('kadang-kadang', 'kadang-kadang', '“Sometimes.” Reduplication is visible here and very common in Indonesian word-building.', 'Saya kadang-kadang memasak.', '“I sometimes cook.”'),
    item('waktu luang', 'waktu luang', '“Free time.” It is useful for talking about when hobbies happen.', 'Apa yang kamu lakukan pada waktu luang?', '“What do you do in your free time?”'),
    item('ikut', 'ikut', '“Join / take part.” A compact high-frequency verb for clubs and events.', 'Saya mau ikut klub debat.', '“I want to join the debate club.”'),
    item('menarik', 'menarik', '“Interesting.” It often gives the reason for a leisure choice.', 'Klub itu menarik karena banyak kegiatan.', '“That club is interesting because it has many activities.”'),
  ],
});
