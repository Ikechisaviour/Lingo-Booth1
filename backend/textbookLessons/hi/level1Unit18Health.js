const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u18',
  title: 'Level 1 · Unit 18: स्वास्थ्य — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, say what hurts, and ask for help.',
  vocabularyGoal: 'Use body-part, pain, fever, medicine, and doctor words.',
  grammarGoal: 'Use `मुझे ... है`, `... में दर्द है`, and duration phrases.',
  speakingGoal: 'Explain one symptom and understand one simple recommendation.',
  task: 'Roleplay a short clinic visit.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use `मुझे ... है`.'),
    practice('saying-pain', 'Saying pain', 'Use `... में दर्द है`.'),
    practice('asking-help', 'Asking help', 'Ask for a doctor or medicine.'),
  ],
  relatedPools: ['topic-health', 'topic-body'],
  items: [
    item('स्वास्थ्य', 'svāsthya', '“Health.” A formal but useful abstract noun.', 'स्वास्थ्य महत्वपूर्ण है।', '“Health is important.”'),
    item('मुझे सिरदर्द है', 'mujhe sirdard hai', '“I have a headache.” Hindi uses a dative-like experiencer frame.', 'मुझे सुबह से सिरदर्द है।', '“I have had a headache since morning.”'),
    item('बुखार', 'bukhār', '“Fever.”', 'मुझे हल्का बुखार है।', '“I have a mild fever.”'),
    item('खाँसी', 'khā̃sī', '“Cough.” Feminine.', 'मुझे खाँसी है।', '“I have a cough.”'),
    item('पेट में दर्द है', 'peṭ mẽ dard hai', '“There is pain in the stomach.” A common pain frame.', 'मेरे पेट में दर्द है।', '“My stomach hurts.”'),
    item('डॉक्टर', 'ḍŏkṭar', '“Doctor.”', 'मुझे डॉक्टर से मिलना है।', '“I need to see a doctor.”'),
    item('दवा', 'davā', '“Medicine.” Feminine.', 'क्या खाँसी की दवा है?', '“Is there medicine for cough?”'),
    item('दवा की दुकान', 'davā kī dukān', '“Pharmacy.” Literally “medicine shop.”', 'दवा की दुकान कहाँ है?', '“Where is the pharmacy?”'),
    item('आराम कीजिए', 'ārām kījiye', '“Please rest.” A polite imperative.', 'आराम कीजिए और पानी पीजिए।', '“Please rest and drink water.”'),
    item('से', 'se', '“Since / from” in duration phrases.', 'मैं कल से बीमार हूँ।', '“I have been sick since yesterday.”'),
  ],
});
