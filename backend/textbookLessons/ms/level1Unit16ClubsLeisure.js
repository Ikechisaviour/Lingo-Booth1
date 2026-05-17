const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u16',
  title: 'Level 1 · Unit 16: Kelab dan Masa Lapang — Clubs and Leisure',
  category: 'leisure',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hobbies, join a club, and explain how often you do an activity.',
  vocabularyGoal: 'Use leisure words that fit school, community, and urban Malaysian life.',
  grammarGoal: 'Use `suka`, `gemar`, `bermain`, and frequency phrases such as `selalu`, `kadang-kadang`, and `setiap minggu`.',
  speakingGoal: 'Describe a hobby and invite someone to join one activity.',
  task: 'Choose a club and explain why it suits you.',
  expressionPractice: [
    practice('hobbies', 'Talking about hobbies', 'Use hobby verbs naturally.'),
    practice('frequency', 'Frequency', 'Say how often an activity happens.'),
    practice('inviting', 'Inviting', 'Invite someone to join a leisure activity.'),
  ],
  relatedPools: ['topic-leisure', 'topic-clubs'],
  items: [
    item('masa lapang', 'ma.sa la.pang', '“Free time.” `Lapang` also means available in scheduling.', 'Saya membaca pada masa lapang.', '“I read in my free time.”'),
    item('hobi', 'ho.bi', '“Hobby.” A common loanword.', 'Hobi saya bermain badminton.', '“My hobby is playing badminton.”'),
    item('kelab', 'ke.lab', '“Club.” Used for school clubs and community groups.', 'Saya mahu masuk kelab bahasa.', '“I want to join the language club.”'),
    item('bermain', 'ber.ma.in', '“Play.” The `ber-` form is used with sports and games.', 'Kami bermain futsal setiap Jumaat.', '“We play futsal every Friday.”'),
    item('membaca', 'mem.ba.ca', '“Read.” Active transitive form from `baca`.', 'Dia suka membaca novel.', '“She likes reading novels.”'),
    item('gemar', 'ge.mar', '“Fond of / enjoy.” Slightly more formal or literary than `suka`.', 'Saya gemar berkebun.', '“I enjoy gardening.”'),
    item('selalu / kadang-kadang / jarang', 'se.la.lu / ka.dang-ka.dang / ja.rang', '“Often / sometimes / rarely.” Frequency adverbs commonly come before the verb.', 'Saya kadang-kadang berjoging.', '“I sometimes jog.”'),
    item('setiap minggu', 'se.ti.ap ming.gu', '“Every week.” `Setiap` pairs naturally with time nouns.', 'Kelab kami bertemu setiap minggu.', '“Our club meets every week.”'),
    item('nak ikut?', 'nak i.kut', '“Want to come along?” `Ikut` means follow/join and sounds very natural in invitations.', 'Kami main badminton malam ini. Nak ikut?', '“We are playing badminton tonight. Want to join?”'),
    item('sesuai dengan', 'se.su.ai de.ngan', '“Suitable for / fits.” Useful for explaining club choice.', 'Kelab itu sesuai dengan minat saya.', '“That club suits my interests.”'),
  ],
});
