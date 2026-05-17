const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u15',
  title: 'Level 1 · Unit 15: தொலைபேசி மற்றும் செய்திகள் — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make short calls, leave messages, and ask for repetition politely.',
  vocabularyGoal: 'Use phone, message, number, and callback vocabulary.',
  grammarGoal: 'Use respectful request forms such as `... முடியுமா?` and polite imperatives.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening call', 'Use one phone greeting and identify yourself.'),
    practice('leaving-message', 'Leaving message', 'Use `செய்தி சொல்ல முடியுமா?`.'),
    practice('asking-repeat', 'Asking repetition', 'Use `மீண்டும் சொல்ல முடியுமா?`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('ஹலோ', 'halō', 'The ordinary phone greeting.', 'ஹலோ, நான் மீனா பேசுகிறேன்.', '“Hello, this is Meena speaking.”'),
    item('... உடன் பேச முடியுமா?', '...uṭaṉ pēca muṭiyumā', '“May I speak with ...?” A polite phone request.', 'ராமுடன் பேச முடியுமா?', '“May I speak with Ram?”'),
    item('இப்போது இல்லை', 'ippōtu illai', '“Not available now.” A simple status phrase.', 'அவர் இப்போது இல்லை.', '“He is not available now.”'),
    item('செய்தி', 'ceyti', '“Message.” Useful for phone and text contexts.', 'ஒரு செய்தி விடலாமா?', '“May I leave a message?”'),
    item('நான் அழைத்தேன் என்று சொல்லுங்கள்', 'nāṉ aḻaittēṉ eṉṟu colluṅkaḷ', '“Please say that I called.” A practical relay request.', 'நான் அழைத்தேன் என்று சொல்லுங்கள்.', '“Please say that I called.”'),
    item('தொலைபேசி எண்', 'tolaipēci eṇ', '“Phone number.” A common service phrase.', 'உங்கள் தொலைபேசி எண் என்ன?', '“What is your phone number?”'),
    item('மீண்டும் சொல்ல முடியுமா?', 'mīṇṭum colla muṭiyumā', '“Could you say it again?” A core repair phrase.', 'எண்ணை மீண்டும் சொல்ல முடியுமா?', '“Could you repeat the number?”'),
    item('பிறகு மீண்டும் அழைக்கிறேன்', 'piṟaku mīṇṭum aḻaikkiṟēṉ', '“I will call again later.” A natural call-ending promise.', 'சரி, பிறகு மீண்டும் அழைக்கிறேன்.', '“Okay, I will call again later.”'),
  ],
});
