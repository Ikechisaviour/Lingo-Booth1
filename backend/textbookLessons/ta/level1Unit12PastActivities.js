const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u12',
  title: 'Level 1 · Unit 12: நேற்று என்ன செய்தீர்கள்? — Past Activities',
  category: 'daily-life',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about completed past activities with Tamil past-tense agreement.',
  vocabularyGoal: 'Use past-time markers and common activity verbs.',
  grammarGoal: 'Use gender/person-sensitive past forms such as `போனேன்`, `சாப்பிட்டேன்`, and `படித்தேன்`.',
  speakingGoal: 'Say what you did yesterday and ask someone else one past question.',
  task: 'Give a short update about yesterday.',
  expressionPractice: [
    practice('stating-past', 'Stating past action', 'Use one past-tense verb.'),
    practice('sequencing', 'Sequencing', 'Use `பிறகு`.'),
    practice('asking-past', 'Asking about past', 'Use `நேற்று என்ன செய்தீர்கள்?`.'),
  ],
  relatedPools: ['topic-routines', 'topic-time'],
  items: [
    item('நான் போனேன்', 'nāṉ pōṉēṉ', '“I went.” The first-person ending shows agreement clearly.', 'நேற்று நான் சந்தைக்கு போனேன்.', '“Yesterday I went to the market.”'),
    item('நான் சாப்பிட்டேன்', 'nāṉ cāppiṭṭēṉ', '“I ate.” A high-frequency past form.', 'காலை நான் இட்லி சாப்பிட்டேன்.', '“In the morning I ate idli.”'),
    item('நான் படித்தேன்', 'nāṉ paṭittēṉ', '“I studied.” Another useful first-person past form.', 'நேற்று இரவு நான் படித்தேன்.', '“Yesterday night I studied.”'),
    item('நான் பார்த்தேன்', 'nāṉ pārttēṉ', '“I watched / saw.” Useful for leisure narratives.', 'நான் ஒரு படம் பார்த்தேன்.', '“I watched a film.”'),
    item('பிறகு', 'piṟaku', '“Then / afterwards.” A simple sequence connector.', 'பிறகு வீட்டிற்கு வந்தேன்.', '“Afterwards I came home.”'),
    item('கடந்த வாரம்', 'kaṭanta vāram', '“Last week.” A common past-time phrase.', 'கடந்த வாரம் நாங்கள் கோவிலுக்கு போனோம்.', '“Last week we went to the temple.”'),
    item('நேற்று என்ன செய்தீர்கள்?', 'nēṟṟu eṉṉa ceytīrkaḷ', '“What did you do yesterday?” Respectful question form.', 'நேற்று என்ன செய்தீர்கள்?', '“What did you do yesterday?”'),
    item('ஏற்கனவே', 'ēṟkaṉavē', '“Already.” Useful with completed actions.', 'நான் ஏற்கனவே மதிய உணவு சாப்பிட்டேன்.', '“I already ate lunch.”'),
  ],
});
