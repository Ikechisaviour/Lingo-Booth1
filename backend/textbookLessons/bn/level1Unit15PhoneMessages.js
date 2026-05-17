const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u15',
  title: 'Level 1 · Unit 15: ফোন ও বার্তা — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make short calls, leave messages, and ask for repetition politely.',
  vocabularyGoal: 'Use phone, message, number, and callback vocabulary.',
  grammarGoal: 'Use respectful requests with `পারবেন?`, `বলবেন`, and `আবার বলবেন?`.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening call', 'Use one phone greeting and identify yourself.'),
    practice('leaving-message', 'Leaving message', 'Use one relay request.'),
    practice('asking-repeat', 'Asking repetition', 'Use `আবার বলবেন?`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('হ্যালো', 'hyalo', 'The ordinary phone greeting.', 'হ্যালো, আমি মিতা বলছি।', '“Hello, this is Mita speaking.”'),
    item('... এর সঙ্গে কথা বলতে পারি?', '... er shonge kotha bolte pari', '“May I speak with ...?” A polite phone request.', 'রহিমের সঙ্গে কথা বলতে পারি?', '“May I speak with Rahim?”'),
    item('তিনি এখন নেই', 'tini ekhon nei', '“He/she is not here now.” `তিনি` is respectful and gender-neutral.', 'তিনি এখন অফিসে নেই।', '“They are not in the office now.”'),
    item('বার্তা', 'barta', '“Message.” Useful for phone and written contexts.', 'আমি কি একটা বার্তা রাখতে পারি?', '“May I leave a message?”'),
    item('বলবেন যে আমি ফোন করেছি', 'bolben je ami phone korechhi', '“Please say that I called.” A respectful relay request.', 'বলবেন যে আমি ফোন করেছি।', '“Please say that I called.”'),
    item('ফোন নম্বর', 'phone nombor', '“Phone number.” A practical service phrase.', 'আপনার ফোন নম্বর কত?', '“What is your phone number?”'),
    item('আবার বলবেন?', 'abar bolben', '“Would you say that again?” A crucial repair phrase.', 'নম্বরটা আবার বলবেন?', '“Would you repeat the number?”'),
    item('পরে আবার ফোন করব', 'pore abar phone korbo', '“I will call again later.” A natural call-ending promise.', 'ঠিক আছে, পরে আবার ফোন করব।', '“Okay, I will call again later.”'),
  ],
});
