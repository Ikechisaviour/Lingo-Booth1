const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('bn', {
  slug: 'bn-l1u11',
  title: 'Level 1 · Unit 11: সময় ও দেখা করা — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and change plans politely.',
  vocabularyGoal: 'Use meeting, schedule, clock-time, and availability words.',
  grammarGoal: 'Use future forms with `করব`, possibility with `পারব`, and polite scheduling questions.',
  speakingGoal: 'Propose a time, accept or reject it, and offer another option.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use `দেখা করব?`.'),
    practice('accepting', 'Accepting', 'Use `পারব`.'),
    practice('rescheduling', 'Rescheduling', 'Use `পারব না` plus another option.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('দেখা', 'dekha', '“Meeting / seeing.” Often used with `করা` for “to meet.”', 'আগামীকাল একটা দেখা আছে।', '“Tomorrow there is a meeting.”'),
    item('সময়সূচি', 'shomoysuchi', '“Schedule / timetable.” Useful for school and work contexts.', 'আজ আমার সময়সূচি ভরা।', '“Today my schedule is full.”'),
    item('তিনটায়', 'tintay', '“At three o’clock.” Time expressions often take this compact ending.', 'মিটিং তিনটায় শুরু হবে।', '“The meeting will start at three.”'),
    item('আমি পারব', 'ami parbo', '“I can / I will be able to.” Useful for availability.', 'আমি সন্ধ্যায় পারব।', '“I can do evening.”'),
    item('আমি পারব না', 'ami parbo na', '“I cannot.” Add an alternative to sound cooperative.', 'আমি সকালে পারব না।', '“I cannot in the morning.”'),
    item('আগামীকাল দেখা করব?', 'agamikal dekha korbo', '“Shall we meet tomorrow?” A natural proposal.', 'আগামীকাল দেখা করব?', '“Shall we meet tomorrow?”'),
    item('সময় বদলানো যাবে?', 'shomoy bodlano jabe', '“Can the time be changed?” A useful rescheduling frame.', 'সময় বদলানো যাবে?', '“Can the time be changed?”'),
    item('ঠিক আছে', 'thik achhe', '“Okay / alright.” A compact acceptance phrase.', 'ঠিক আছে, পাঁচটায় দেখা হবে।', '“Okay, we will meet at five.”'),
  ],
});
