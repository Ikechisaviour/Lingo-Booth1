const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u19',
  title: 'Level 1 · Unit 19: Bayramlar ve Gelenekler — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about Turkish holidays, greetings, and family customs.',
  vocabularyGoal: 'Use holiday, family, greeting, and tradition words.',
  grammarGoal: 'Use present habituals and future forms to describe customs and plans.',
  speakingGoal: 'Describe one holiday, say what people usually do, and give an appropriate greeting.',
  task: 'Explain one Turkish holiday to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Introduce one celebration clearly.'),
    practice('describing-custom', 'Describing custom', 'Use one repeated action.'),
    practice('giving-greeting', 'Giving greeting', 'Use the formula that fits the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('Ramazan Bayramı', 'ra-ma-ZAN bay-ra-MI', 'The holiday after Ramadan, centered on visits, sweets, and family greetings.', 'Ramazan Bayramı’nda ailemizi ziyaret ederiz.', '“During Ramadan Bayram, we visit our family.”'),
    item('Kurban Bayramı', 'kur-BAN bay-ra-MI', 'The Festival of Sacrifice, another major religious holiday in Turkey.', 'Kurban Bayramı dört gün sürer.', '“Kurban Bayram lasts four days.”'),
    item('Cumhuriyet Bayramı', 'cum-hu-ri-YET bay-ra-MI', 'Republic Day on October 29, marking the founding of the Turkish Republic.', 'Cumhuriyet Bayramı yirmi dokuz Ekim’dedir.', '“Republic Day is on October twenty-ninth.”'),
    item('bayramlaşmak', 'bay-ram-laş-MAK', '“To exchange holiday greetings.” A culture-specific verb showing how productive Turkish derivation is.', 'Bayramda büyüklerle bayramlaşırız.', '“On the holiday, we exchange greetings with elders.”'),
    item('ziyaret etmek', 'zi-ya-RET et-MEK', '“To visit.” Especially common in holiday family routines.', 'Akrabaları ziyaret ederiz.', '“We visit relatives.”'),
    item('Bayramınız kutlu olsun', 'bay-ra-MI-nız kut-LU ol-SUN', '“Happy holiday.” A polite greeting formula.', 'Bayramınız kutlu olsun!', '“Happy holiday!”'),
    item('gelenek', 'ge-le-NEK', '“Tradition.” A useful bridge noun for cultural explanation.', 'Bu önemli bir gelenek.', '“This is an important tradition.”'),
    item('aile büyükleri', 'a-i-LE bü-yük-LE-ri', '“Family elders.” Turkish holiday customs often center on visiting and honoring them.', 'Bayramda aile büyüklerini ziyaret ederiz.', '“On holidays we visit the family elders.”'),
  ],
});
