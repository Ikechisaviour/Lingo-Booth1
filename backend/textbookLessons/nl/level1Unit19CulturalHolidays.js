const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u19',
  title: 'Level 1 · Unit 19: Feestdagen en Tradities — Cultural Holidays',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about Dutch holidays, greetings, and family traditions.',
  vocabularyGoal: 'Use holiday, family, greeting, and tradition words.',
  grammarGoal: 'Use habitual present forms and `meestal` to describe customs.',
  speakingGoal: 'Describe one holiday, say what people usually do, and give an appropriate greeting.',
  task: 'Explain one Dutch holiday to a visitor.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Introduce one celebration clearly.'),
    practice('describing-custom', 'Describing custom', 'Use `meestal` plus one action.'),
    practice('giving-greeting', 'Giving greeting', 'Use the formula that fits the occasion.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('Koningsdag', 'KOH-nings-dakh', 'King’s Day, one of the most visible Dutch national celebrations.', 'Op Koningsdag dragen veel mensen oranje.', '“On King’s Day many people wear orange.”'),
    item('Sinterklaas', 'SIN-ter-klahs', 'A major December tradition involving gifts, poems, and family rituals.', 'Met Sinterklaas krijgen kinderen cadeautjes.', '“At Sinterklaas children receive gifts.”'),
    item('Kerstmis', 'KERST-mis', '“Christmas.” A major family holiday.', 'Met Kerstmis eten families samen.', '“At Christmas families eat together.”'),
    item('Nieuwjaar', 'NYU-yahr', '“New Year.” Fireworks and greetings are common associations.', 'Met Nieuwjaar wensen we elkaar geluk.', '“At New Year we wish each other happiness.”'),
    item('meestal', 'MAY-stal', '“Usually.” A useful word for customs.', 'Meestal bezoeken we familie.', '“Usually we visit family.”'),
    item('vieren', 'FEE-ren', '“To celebrate.” A central holiday verb.', 'Hoe vieren jullie Kerstmis?', '“How do you celebrate Christmas?”'),
    item('fijne feestdagen', 'FEY-nə FEEST-dah-khen', '“Happy holidays.” A flexible seasonal greeting.', 'Fijne feestdagen voor jou en je familie.', '“Happy holidays to you and your family.”'),
    item('traditie', 'tra-DEE-see', '“Tradition.” A useful bridge noun for cultural explanation.', 'Dat is een oude traditie.', '“That is an old tradition.”'),
  ],
});
