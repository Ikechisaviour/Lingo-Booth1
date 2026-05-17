const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u19',
  title: 'Level 1 · Unit 19: Feste e ricorrenze — Holidays and Celebrations',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major holidays, greetings, family visits, and celebration plans.',
  vocabularyGoal: 'Use holiday names, greeting formulas, meal words, and visit vocabulary.',
  grammarGoal: 'Use present habits and simple future planning language.',
  speakingGoal: 'Describe one holiday and what people usually do during it.',
  task: 'Explain a holiday plan for a family visit.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Use the holiday name accurately.'),
    practice('giving-greeting', 'Giving greeting', 'Choose a fitting formula.'),
    practice('describing-custom', 'Describing custom', 'Say what people usually do.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('festa', 'festa', '“Holiday / celebration.”', 'Buona festa!', '“Happy holiday!”'),
    item('Natale', 'natale', '“Christmas.”', 'A Natale molte famiglie si riuniscono.', '“At Christmas many families gather.”'),
    item('Pasqua', 'pasqua', '“Easter.”', 'A Pasqua si mangia insieme.', '“At Easter people eat together.”'),
    item('Ferragosto', 'ferragosto', 'A major mid-August holiday associated with summer travel and closures.', 'A Ferragosto molte città sono tranquille.', '“At Ferragosto many cities are quiet.”'),
    item('auguri', 'auguri', '“Best wishes.” A broad greeting for celebrations and birthdays.', 'Tanti auguri!', '“Many good wishes!”'),
    item('pranzo in famiglia', 'pranzo in famiglia', '“Family lunch.” A culturally important holiday phrase.', 'Facciamo un pranzo in famiglia.', '“We have a family lunch.”'),
    item('visitare', 'visitare', '“To visit.”', 'Visiterò i nonni.', '“I will visit my grandparents.”'),
    item('regalo', 'regalo', '“Gift.”', 'Ho comprato un regalo per mia sorella.', '“I bought a gift for my sister.”'),
    item('dolci', 'dolci', '“Sweets / desserts.”', 'Mangiamo dolci dopo pranzo.', '“We eat sweets after lunch.”'),
    item('la prossima settimana', 'la prossima settimana', '“Next week.” Useful for future celebration plans.', 'La prossima settimana festeggeremo insieme.', '“Next week we will celebrate together.”'),
  ],
});
