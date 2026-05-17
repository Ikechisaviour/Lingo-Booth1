const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u18',
  title: 'Level 1 · Unit 18: Saúde — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic vocabulary.',
  grammarGoal: 'Use `estar com`, `ter`, `precisar`, and negative commands in simple health contexts.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a pharmacy or clinic.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use `estou com` or `tenho`.'),
    practice('asking-help', 'Asking help', 'Use `preciso de`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize one command and one prohibition.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('dor de cabeça', 'dor djee ka-BEH-sa', '“Headache.” Portuguese uses `dor de` plus the body part for many pains.', 'Estou com dor de cabeça.', '“I have a headache.”'),
    item('febre', 'FEH-bree', '“Fever.” A common clinic and pharmacy word.', 'Tenho febre desde ontem.', '“I have had a fever since yesterday.”'),
    item('tosse', 'TOH-see', '“Cough.” It is common in both symptoms and over-the-counter medicine names.', 'Estou com tosse seca.', '“I have a dry cough.”'),
    item('estômago', 'esh-TOH-ma-goo', '“Stomach.” The stress mark helps learners keep the right syllable prominent.', 'Meu estômago dói.', '“My stomach hurts.”'),
    item('remédio', 'heh-MEH-jee-oo', '“Medicine / remedy.” More everyday in Brazil than a formal pharmaceutical term.', 'Preciso de um remédio para gripe.', '“I need medicine for the flu.”'),
    item('médico / médica', 'MEH-jee-koo / MEH-jee-ka', '“Doctor” masculine / feminine. Profession words visibly mark gender here.', 'Quero falar com a médica.', '“I want to speak with the doctor.”'),
    item('precisa descansar', 'preh-SEE-za des-kan-SAR', '“You need to rest.” A common gentle medical instruction.', 'Você precisa descansar dois dias.', '“You need to rest for two days.”'),
    item('não coma comida pesada', 'nao KOH-ma ko-MEE-da peh-ZA-da', '“Do not eat heavy food.” Negative commands matter in health advice.', 'Não coma comida pesada hoje.', '“Do not eat heavy food today.”'),
    item('desde quando?', 'DEZ-jee KWAN-doo', '“Since when?” A standard history-taking question.', 'Desde quando você está com febre?', '“Since when have you had a fever?”'),
    item('melhor', 'meh-LYOR', '“Better.” It can describe recovery or compare options.', 'Hoje estou melhor.', '“Today I am better.”'),
  ],
});
