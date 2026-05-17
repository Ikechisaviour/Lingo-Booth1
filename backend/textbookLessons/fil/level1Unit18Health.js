const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u18',
  title: 'Level 1 · Unit 18: Kalusugan — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, say what hurts, and ask for help.',
  vocabularyGoal: 'Use body-part, pain, fever, medicine, and doctor words.',
  grammarGoal: 'Use `masakit ang ...`, `may`, and simple duration phrases.',
  speakingGoal: 'Explain one symptom and understand one simple recommendation.',
  task: 'Roleplay a short clinic visit.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use `may ... ako`.'),
    practice('saying-pain', 'Saying pain', 'Use `masakit ang ...`.'),
    practice('asking-help', 'Asking help', 'Ask for a doctor or medicine.'),
  ],
  relatedPools: ['topic-health', 'topic-body'],
  items: [
    item('kalusugan', 'kalusugan', '“Health.”', 'Mahalaga ang kalusugan.', '“Health is important.”'),
    item('Masakit ang ulo ko', 'masakit ang ulo ko', '“My head hurts.”', 'Masakit ang ulo ko mula kaninang umaga.', '“My head has hurt since this morning.”'),
    item('lagnat', 'lagnat', '“Fever.”', 'May kaunting lagnat ako.', '“I have a slight fever.”'),
    item('ubo', 'ubo', '“Cough.”', 'May malakas akong ubo.', '“I have a strong cough.”'),
    item('doktor', 'doktor', '“Doctor.”', 'Kailangan ko ng doktor.', '“I need a doctor.”'),
    item('gamot', 'gamot', '“Medicine.”', 'May gamot ba para sa ubo?', '“Is there medicine for cough?”'),
    item('botika', 'botika', '“Pharmacy.”', 'Nasaan ang pinakamalapit na botika?', '“Where is the nearest pharmacy?”'),
    item('Magpahinga ka', 'magpahinga ka', '“Rest.” A common imperative.', 'Magpahinga ka at uminom ng tubig.', '“Rest and drink water.”'),
    item('mula kahapon', 'mula kahapon', '“Since yesterday.”', 'May sakit ako mula kahapon.', '“I have been sick since yesterday.”'),
    item('Hindi maganda ang pakiramdam ko', 'hindi maganda ang pakiramdam ko', '“I do not feel well.” A natural general complaint.', 'Hindi maganda ang pakiramdam ko ngayon.', '“I do not feel well today.”'),
  ],
});
