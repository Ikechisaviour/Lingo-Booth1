const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u12',
  title: 'Level 1 · Unit 12: Wat Heb Je Gedaan? — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed past activities with the Dutch perfect tense.',
  vocabularyGoal: 'Use past-time markers and common activity verbs.',
  grammarGoal: 'Use `hebben` or `zijn` plus a past participle, and notice separable prefixes in participles.',
  speakingGoal: 'Say what you did yesterday and ask someone else one past question.',
  task: 'Give a short update about yesterday.',
  expressionPractice: [
    practice('stating-past', 'Stating past action', 'Use one perfect-tense sentence.'),
    practice('sequencing', 'Sequencing', 'Use `daarna`.'),
    practice('asking-past', 'Asking about past', 'Use `wat heb je gedaan?`.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('ik heb gegeten', 'ik hep khə-AY-ten', '“I ate / have eaten.” Most activity verbs use `hebben` in the perfect.', 'Gisteren heb ik thuis gegeten.', '“Yesterday I ate at home.”'),
    item('ik ben gegaan', 'ik ben khə-KHAHN', '“I went.” Motion toward a new location commonly uses `zijn`.', 'Ik ben naar de bibliotheek gegaan.', '“I went to the library.”'),
    item('ik heb gestudeerd', 'ik hep khə-sty-DEERT', '“I studied.” A regular weak participle with `ge-`.', 'Ik heb twee uur gestudeerd.', '“I studied for two hours.”'),
    item('ik ben opgestaan', 'ik ben OP-khə-stahn', '“I got up.” The separable prefix stays before `ge` in the participle.', 'Ik ben vroeg opgestaan.', '“I got up early.”'),
    item('daarna', 'dahr-NAH', '“After that.” A simple sequence connector.', 'Daarna heb ik mijn vriend ontmoet.', '“After that I met my friend.”'),
    item('vorige week', 'VOH-ri-khə vayk', '“Last week.” A common past-time phrase.', 'Vorige week zijn we naar het museum gegaan.', '“Last week we went to the museum.”'),
    item('wat heb je gedaan?', 'vat hep yə khə-DAHN', '“What did you do?” A core past-question frame.', 'Wat heb je gisteren gedaan?', '“What did you do yesterday?”'),
    item('al', 'al', '“Already.” Useful with completed actions and questions.', 'Heb je al geluncht?', '“Have you already had lunch?”'),
  ],
});
