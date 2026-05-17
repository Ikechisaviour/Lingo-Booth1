const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u11',
  title: 'Level 1 · Unit 11: நேரம் மற்றும் சந்திப்பு — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and change plans politely.',
  vocabularyGoal: 'Use meeting, schedule, clock-time, and availability words.',
  grammarGoal: 'Use future/polite forms with `சந்திப்போம்`, `முடியுமா`, and time expressions.',
  speakingGoal: 'Propose a time, accept or reject it, and offer another option.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use `சந்திப்போமா?`.'),
    practice('accepting', 'Accepting', 'Use `சரி`.'),
    practice('rescheduling', 'Rescheduling', 'Use `முடியாது` plus another option.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('சந்திப்பு', 'cantippu', '“Meeting.” A practical scheduling noun.', 'நாளை எனக்கு ஒரு சந்திப்பு உள்ளது.', '“Tomorrow I have a meeting.”'),
    item('நேர அட்டவணை', 'nēra aṭṭavaṇai', '“Schedule / timetable.” A useful school-and-work phrase.', 'என் நேர அட்டவணை இன்று நிரம்பியுள்ளது.', '“My schedule is full today.”'),
    item('மூன்று மணிக்கு', 'mūṉṟu maṇikku', '“At three o’clock.” The dative-style suffix marks time.', 'கூட்டம் மூன்று மணிக்கு தொடங்கும்.', '“The meeting starts at three.”'),
    item('எனக்கு முடியும்', 'eṉakku muṭiyum', '“I can / it is possible for me.” Useful for availability.', 'மாலை எனக்கு முடியும்.', '“Evening works for me.”'),
    item('எனக்கு முடியாது', 'eṉakku muṭiyātu', '“I cannot.” Add another option to stay cooperative.', 'காலை எனக்கு முடியாது.', '“Morning does not work for me.”'),
    item('நாளை சந்திப்போமா?', 'nāḷai cantippōmā', '“Shall we meet tomorrow?” A natural proposal.', 'நாளை சந்திப்போமா?', '“Shall we meet tomorrow?”'),
    item('நேரத்தை மாற்ற முடியுமா?', 'nērattai māṟṟa muṭiyumā', '“Can we change the time?” A practical rescheduling question.', 'நேரத்தை மாற்ற முடியுமா?', '“Can we change the time?”'),
    item('சரி', 'cari', '“Okay / alright.” A compact acceptance word.', 'சரி, ஐந்து மணிக்கு சந்திப்போம்.', '“Okay, let’s meet at five.”'),
  ],
});
