const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u6',
  title: 'Level 1 · Unit 6: தேதி மற்றும் நாட்காட்டி — Dates and Calendar',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about days, dates, and short plans using Tamil time words.',
  vocabularyGoal: 'Use weekdays, months, today/tomorrow/yesterday, and date questions.',
  grammarGoal: 'Use time nouns with case markers such as `-இல்` when the sentence needs “on/in.”',
  speakingGoal: 'Say today’s date, ask when something happens, and answer with one plan.',
  task: 'Arrange a simple class meeting on a calendar.',
  expressionPractice: [
    practice('asking-date', 'Asking the date', 'Use `இன்று என்ன தேதி?`.'),
    practice('stating-date', 'Stating a date', 'Use one weekday and one numbered date.'),
    practice('making-plan', 'Making a plan', 'Use `அடுத்த வாரம்`.'),
  ],
  relatedPools: ['topic-time', 'topic-calendar'],
  items: [
    item('இன்று', 'iṉṟu', '“Today.” A high-frequency time word for everyday planning.', 'இன்று திங்கட்கிழமை.', '“Today is Monday.”'),
    item('நாளை', 'nāḷai', '“Tomorrow.” Useful in nearly every future-planning exchange.', 'நாளை எனக்கு வகுப்பு உள்ளது.', '“Tomorrow I have class.”'),
    item('நேற்று', 'nēṟṟu', '“Yesterday.” It pairs naturally with past forms later.', 'நேற்று நான் படித்தேன்.', '“Yesterday I studied.”'),
    item('திங்கட்கிழமை', 'tiṅkaṭkiḻamai', '“Monday.” Tamil weekday names often end with `கிழமை`.', 'தேர்வு திங்கட்கிழமை.', '“The exam is on Monday.”'),
    item('இன்று என்ன தேதி?', 'iṉṟu eṉṉa tēti', '“What is today’s date?” A practical full question.', 'இன்று என்ன தேதி?', '“What is today’s date?”'),
    item('மே ஐந்து', 'mē aintu', '“May fifth.” The day number follows the month in this simple spoken frame.', 'வகுப்பு மே ஐந்தில் தொடங்கும்.', '“Class starts on May fifth.”'),
    item('அடுத்த வாரம்', 'aṭutta vāram', '“Next week.” A common near-future phrase.', 'அடுத்த வாரம் நாம் சந்திப்போம்.', '“We will meet next week.”'),
    item('எப்போது?', 'eppōtu', '“When?” A compact question word for time and plans.', 'கூட்டம் எப்போது தொடங்கும்?', '“When does the meeting start?”'),
  ],
});
