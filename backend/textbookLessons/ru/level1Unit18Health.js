const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ru', {
  slug: 'ru-l1u18',
  title: 'Level 1 · Unit 18: Здоровье — Health',
  category: 'health',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Describe simple symptoms, ask for help, and understand basic health advice.',
  vocabularyGoal: 'Use body-part, symptom, medicine, and clinic vocabulary.',
  grammarGoal: 'Use `у меня болит`, `мне нужно`, and simple imperative advice.',
  speakingGoal: 'Say what hurts, describe one symptom, and understand one instruction.',
  task: 'Explain a minor illness at a pharmacy or clinic.',
  expressionPractice: [
    practice('describing-symptom', 'Describing symptom', 'Use `у меня болит`.'),
    practice('asking-help', 'Asking help', 'Use `мне нужно`.'),
    practice('understanding-advice', 'Understanding advice', 'Recognize one recommendation and one prohibition.'),
  ],
  relatedPools: ['topic-health', 'topic-service'],
  items: [
    item('у меня болит голова', 'u menya bolit golova', '“My head hurts.” Russian often frames pain as “at me hurts X.”', 'У меня болит голова с утра.', '“My head has hurt since morning.”'),
    item('температура', 'temperatura', '“Fever / temperature.” Everyday speech often uses this noun for having a fever.', 'У меня высокая температура.', '“I have a high fever.”'),
    item('кашель', 'kashel', '“Cough.” A common pharmacy word.', 'У меня сухой кашель.', '“I have a dry cough.”'),
    item('живот', 'zhivot', '“Stomach / belly.” Useful in ordinary complaints.', 'У меня болит живот.', '“My stomach hurts.”'),
    item('лекарство', 'lekarstvo', '“Medicine.” A practical health noun.', 'Мне нужно лекарство от простуды.', '“I need medicine for a cold.”'),
    item('врач', 'vrach', '“Doctor.” A common profession noun in health contexts.', 'Мне нужно к врачу.', '“I need to see a doctor.”'),
    item('вам нужно отдыхать', 'vam nuzhno otdykhat', '“You need to rest.” A polite advice phrase with dative `вам`.', 'Вам нужно отдыхать два дня.', '“You need to rest for two days.”'),
    item('не ешьте острое', 'ne yeshte ostroye', '“Do not eat spicy food.” A polite negative imperative.', 'Не ешьте острое сегодня.', '“Do not eat spicy food today.”'),
  ],
});
