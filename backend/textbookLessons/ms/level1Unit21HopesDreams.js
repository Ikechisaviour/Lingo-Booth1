const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ms', {
  slug: 'ms-l1u21',
  title: 'Level 1 · Unit 21: Harapan dan Impian — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about hopes, plans, and dreams using Malay future and desire language.',
  vocabularyGoal: 'Use future-facing words for study, work, travel, and personal goals.',
  grammarGoal: 'Use `ingin`, `harap`, `akan`, and `kalau` to distinguish desire, hope, plan, and condition.',
  speakingGoal: 'Describe one realistic plan and one longer-term dream.',
  task: 'Give a short self-introduction about your future.',
  expressionPractice: [
    practice('hope', 'Hope', 'Use `harap` for desired outcomes.'),
    practice('dream', 'Dream', 'Use `ingin` for personal aims.'),
    practice('future-plan', 'Future plan', 'Use `akan` for intended action.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('ingin', 'i.ngin', '“Want / wish to.” More formal and reflective than casual `nak`.', 'Saya ingin menjadi jurutera.', '“I want to become an engineer.”'),
    item('harap', 'ha.rap', '“Hope.” Often followed by a clause rather than an infinitive-like form.', 'Saya harap keluarga saya sihat.', '“I hope my family is healthy.”'),
    item('akan', 'a.kan', 'Future marker for plans or expected events.', 'Saya akan sambung belajar tahun depan.', '“I will continue studying next year.”'),
    item('impian', 'im.pi.an', '“Dream / aspiration.”', 'Impian saya ialah membuka perniagaan sendiri.', '“My dream is to open my own business.”'),
    item('cita-cita', 'ci.ta-ci.ta', '“Ambition / career dream.” Reduplicated and strongly tied to childhood or life aims.', 'Cita-cita saya menjadi doktor.', '“My ambition is to become a doctor.”'),
    item('menjadi', 'men.ja.di', '“Become.”', 'Dia mahu menjadi guru.', '“She wants to become a teacher.”'),
    item('sambung belajar', 'sam.bung be.la.jar', '“Continue studies.” A common educational goal phrase.', 'Saya ingin sambung belajar di universiti.', '“I want to continue studying at university.”'),
    item('membuka perniagaan', 'mem.bu.ka per.ni.a.ga.an', '“Open a business.”', 'Suatu hari nanti saya mahu membuka perniagaan kecil.', '“One day I want to open a small business.”'),
    item('suatu hari nanti', 'su.a.tu ha.ri nan.ti', '“One day in the future.”', 'Suatu hari nanti saya ingin tinggal di tepi laut.', '“One day I want to live by the sea.”'),
    item('kalau ada peluang', 'ka.lau a.da pe.lu.ang', '“If there is an opportunity.” A useful realistic condition around hopes.', 'Kalau ada peluang, saya mahu bekerja di luar negara.', '“If there is an opportunity, I want to work abroad.”'),
  ],
});
