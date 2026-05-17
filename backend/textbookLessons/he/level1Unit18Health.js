const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('he', {
  slug: 'he-l1u18',
  title: 'Level 1 · Unit 18: בריאות — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, say what hurts, and ask for help.',
  vocabularyGoal: 'Use body-part, pain, fever, medicine, and doctor vocabulary.',
  grammarGoal: 'Use `כואב לי` and possessive body-part phrases.',
  speakingGoal: 'Explain one symptom and understand one simple recommendation.',
  task: 'Roleplay a short clinic visit.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use a symptom phrase clearly.'),
    practice('saying-pain', 'Saying pain', 'Use `כואב לי`.'),
    practice('asking-help', 'Asking help', 'Ask for a doctor or medicine.'),
  ],
  relatedPools: ['topic-health', 'topic-body'],
  items: [
    item('בריאות', 'bri’ut', '“Health.” A useful abstract noun.', 'בריאות חשובה.', '“Health is important.”'),
    item('כואב לי הראש', 'ko’ev li ha-rosh', '“My head hurts.” Hebrew literally says “it hurts to me, the head.”', 'כואבת לי הבטן.', '“My stomach hurts.”'),
    item('חום', 'khom', '“Fever / heat.” Context distinguishes illness from temperature.', 'יש לי חום.', '“I have a fever.”'),
    item('שיעול', 'shi’ul', '“Cough.”', 'יש לי שיעול חזק.', '“I have a strong cough.”'),
    item('רופא / רופאה', 'rofe / rofa’a', '“Doctor” masculine / feminine.', 'אני צריך רופאה.', '“I need a female doctor.”'),
    item('תרופה', 'trufa', '“Medicine.” Feminine.', 'יש תרופה לשיעול?', '“Is there medicine for cough?”'),
    item('בית מרקחת', 'beit mirkakhat', '“Pharmacy.” Another construct phrase, literally “house of medicines.”', 'איפה בית המרקחת הקרוב?', '“Where is the nearest pharmacy?”'),
    item('תנוח', 'tanuakh', '“Rest.” A masculine imperative.', 'תנוח ותשתה מים.', '“Rest and drink water.”'),
    item('מאז אתמול', 'me’az etmol', '“Since yesterday.” Useful for symptom duration.', 'אני חולה מאז אתמול.', '“I have been sick since yesterday.”'),
    item('אני לא מרגיש טוב', 'ani lo margish tov', '“I do not feel well.” Speaker-gender changes the participle if needed.', 'אני לא מרגישה טוב היום.', '“I do not feel well today.”'),
  ],
});
