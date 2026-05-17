const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u14',
  title: 'Level 1 · Unit 14: Yapabilmek — Ability and Permission',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about ability, permission, and obligation with Turkish suffixes.',
  vocabularyGoal: 'Use skill, permission, and obligation language.',
  grammarGoal: 'Use the ability suffix `-ebil/-abil`, permission questions, and `-malı/-meli` for necessity.',
  speakingGoal: 'Say what you can do, ask permission, and state one obligation.',
  task: 'Handle three everyday ability and permission questions.',
  expressionPractice: [
    practice('stating-ability', 'Stating ability', 'Use one `-ebil/-abil` form.'),
    practice('asking-permission', 'Asking permission', 'Use `...ebilir miyim?`.'),
    practice('stating-obligation', 'Stating obligation', 'Use one `-malı/-meli` form.'),
  ],
  relatedPools: ['topic-ability', 'topic-classroom'],
  items: [
    item('yüzebilirim', 'yü-ze-bi-Lİ-rim', '“I can swim.” The ability suffix fits inside the verb before person marking.', 'Ben yüzebilirim.', '“I can swim.”'),
    item('gelemem', 'ge-le-MEM', '“I cannot come.” The negative ability form contracts differently from a simple negative.', 'Bugün gelemem.', '“I cannot come today.”'),
    item('girebilir miyim?', 'gi-re-bi-LİR mi-YİM', '“May I enter?” A polite permission question.', 'Sınıfa girebilir miyim?', '“May I enter the classroom?”'),
    item('yasak', 'ya-SAK', '“Forbidden / prohibited.” Common on signs and in rules.', 'Burada sigara içmek yasak.', '“Smoking here is forbidden.”'),
    item('çalışmalıyım', 'ça-lış-ma-LI-yım', '“I must study.” The necessity suffix follows vowel harmony.', 'Sınav için çalışmalıyım.', '“I must study for the exam.”'),
    item('gerekiyor', 'ge-re-ki-YOR', '“It is necessary.” A common impersonal obligation form.', 'Pasaport gerekiyor.', '“A passport is required.”'),
    item('öğrenmek', 'öğ-ren-MEK', '“To learn.” Useful with ability and goals.', 'Araba kullanmayı öğrenmek istiyorum.', '“I want to learn to drive.”'),
    item('başarabilirim', 'ba-şa-ra-bi-Lİ-rim', '“I can succeed / manage.” A good learner-confidence word built from the same suffix logic.', 'Daha çok çalışırsam başarabilirim.', '“If I study more, I can succeed.”'),
  ],
});
