const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('it', {
  slug: 'it-l1u18',
  title: 'Level 1 · Unit 18: La salute — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, say what hurts, and ask for help.',
  vocabularyGoal: 'Use body-part, pain, fever, medicine, and doctor words.',
  grammarGoal: 'Use `mi fa male`, `ho`, and simple duration phrases.',
  speakingGoal: 'Explain one symptom and understand one simple recommendation.',
  task: 'Roleplay a short clinic visit.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use `ho ...`.'),
    practice('saying-pain', 'Saying pain', 'Use `mi fa male`.'),
    practice('asking-help', 'Asking help', 'Ask for a doctor or medicine.'),
  ],
  relatedPools: ['topic-health', 'topic-body'],
  items: [
    item('salute', 'salute', '“Health.”', 'La salute è importante.', '“Health is important.”'),
    item('ho mal di testa', 'ho mal di testa', '“I have a headache.”', 'Ho mal di testa da stamattina.', '“I have had a headache since this morning.”'),
    item('febbre', 'febbre', '“Fever.”', 'Ho un po’ di febbre.', '“I have a slight fever.”'),
    item('tosse', 'tosse', '“Cough.”', 'Ho una tosse forte.', '“I have a strong cough.”'),
    item('mi fa male lo stomaco', 'mi fa male lo stomaco', '“My stomach hurts.” Literally “the stomach hurts me.”', 'Mi fa male la schiena.', '“My back hurts.”'),
    item('medico / dottoressa', 'medico / dottoressa', '“Doctor” with common masculine and feminine forms.', 'Ho bisogno di una dottoressa.', '“I need a female doctor.”'),
    item('medicina', 'medicina', '“Medicine.”', 'C’è una medicina per la tosse?', '“Is there medicine for cough?”'),
    item('farmacia', 'farmacia', '“Pharmacy.”', 'Dov’è la farmacia più vicina?', '“Where is the nearest pharmacy?”'),
    item('riposi', 'riposi', '“Rest” in a polite imperative-like form.', 'Riposi e beva molta acqua.', '“Rest and drink a lot of water.”'),
    item('da ieri', 'da ieri', '“Since yesterday.”', 'Sto male da ieri.', '“I have felt ill since yesterday.”'),
  ],
});
