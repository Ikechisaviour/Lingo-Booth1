const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u12',
  title: 'Level 1 · Unit 12: आपने क्या किया? — Past Activities',
  category: 'past',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about what happened yesterday and last weekend.',
  vocabularyGoal: 'Use yesterday, last week, study, visit, watch, and rest vocabulary.',
  grammarGoal: 'Use perfective past forms and notice ergative `ने` with many transitive verbs.',
  speakingGoal: 'Tell a three-step story about yesterday.',
  task: 'Give a short recap of your last weekend.',
  expressionPractice: [
    practice('reporting-past', 'Reporting past actions', 'Use past forms accurately.'),
    practice('sequencing-events', 'Sequencing events', 'Use `फिर` naturally.'),
    practice('asking-past-question', 'Asking about past', 'Use `आपने क्या किया?`.'),
  ],
  relatedPools: ['topic-past', 'topic-routines'],
  items: [
    item('कल', 'kal', '“Yesterday” or “tomorrow.” The verb tense tells you which one is meant.', 'कल मैंने पढ़ाई की।', '“Yesterday I studied.”'),
    item('पिछले सप्ताह', 'pichhle saptāh', '“Last week.” The adjective appears in oblique form before the noun.', 'पिछले सप्ताह मैं दिल्ली गया।', '“Last week I went to Delhi.”'),
    item('मैंने', 'mainē', '“I” with ergative `ने`, used with many completed transitive actions.', 'मैंने किताब पढ़ी।', '“I read a book.”'),
    item('पढ़ाई की', 'paṛhāī kī', '“Studied.” A noun-plus-light-verb expression.', 'मैंने शाम को पढ़ाई की।', '“I studied in the evening.”'),
    item('गया / गई', 'gayā / gaī', '“Went” masculine / feminine subject forms.', 'मैं बाज़ार गई।', '“I went to the market.”'),
    item('देखा', 'dekhā', '“Saw / watched.”', 'मैंने फ़िल्म देखी।', '“I watched a film.”'),
    item('मिला / मिली', 'milā / milī', '“Met.” The form agrees with the subject in many simple uses.', 'मैं अपने दोस्त से मिला।', '“I met my friend.”'),
    item('आराम किया', 'ārām kiyā', '“Rested.” Another noun-plus-light-verb expression.', 'रविवार को मैंने आराम किया।', '“On Sunday I rested.”'),
    item('फिर', 'phir', '“Then.” Useful for simple sequencing.', 'मैंने खाना खाया, फिर सो गया।', '“I ate, then slept.”'),
    item('आपने क्या किया?', 'āpnē kyā kiyā?', '“What did you do?” The honorific subject takes ergative `ने`.', 'आपने कल क्या किया?', '“What did you do yesterday?”'),
  ],
});
