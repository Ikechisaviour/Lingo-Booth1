const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u21',
  title: 'Level 1 · Unit 21: Umutlar ve Hayaller — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about future plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration words.',
  grammarGoal: 'Use `istiyorum`, future `-ecek/-acak`, and `umarım` for desire, plan, and hope.',
  speakingGoal: 'Describe one realistic plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-desire', 'Stating desire', 'Use `istiyorum`.'),
    practice('stating-plan', 'Stating plan', 'Use one future form.'),
    practice('stating-hope', 'Stating hope', 'Use `umarım`.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('gelecek', 'ge-le-JEK', '“Future.” It also appears as the future participle form in many contexts.', 'Geleceğimi düşünüyorum.', '“I am thinking about my future.”'),
    item('hayal', 'ha-YAL', '“Dream / aspiration.”', 'Hayalim doktor olmak.', '“My dream is to become a doctor.”'),
    item('istiyorum', 'is-ti-YO-rum', '“I want.” A direct statement of desire.', 'Türkçeyi iyi öğrenmek istiyorum.', '“I want to learn Turkish well.”'),
    item('çalışacağım', 'ça-lı-şa-JA-ğım', '“I will work / study.” Future suffixes obey harmony and soften before personal endings.', 'Üniversitede çalışacağım.', '“I will study at university.”'),
    item('umarım', 'u-ma-RIM', '“I hope.” Useful before a desired clause.', 'Umarım Türkiye’ye giderim.', '“I hope I go to Turkey.”'),
    item('olmak', 'ol-MAK', '“To become / be.” Career dreams often use this infinitive.', 'Öğretmen olmak istiyorum.', '“I want to become a teacher.”'),
    item('fırsat olursa', 'fır-SAT o-LUR-sa', '“If there is an opportunity.” A realistic condition around future plans.', 'Fırsat olursa yurt dışında çalışacağım.', '“If there is an opportunity, I will work abroad.”'),
    item('bir gün', 'bir GÜN', '“One day.” A simple phrase for distant dreams.', 'Bir gün kitap yazmak istiyorum.', '“One day I want to write a book.”'),
  ],
});
