const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('nl', {
  slug: 'nl-l1u11',
  title: 'Level 1 · Unit 11: Afspraken en Planning — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and change plans politely.',
  vocabularyGoal: 'Use appointment, schedule, clock-time, and availability words.',
  grammarGoal: 'Use modal verbs such as `kunnen` and keep V2 order in time-first sentences.',
  speakingGoal: 'Propose a time, accept or reject it, and offer another option.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use `zullen we ...?`.'),
    practice('accepting', 'Accepting', 'Use `dat kan`.'),
    practice('rescheduling', 'Rescheduling', 'Use `ik kan niet` plus another option.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('afspraak', 'AF-sprahk', '“Appointment / agreement.” A very useful everyday noun.', 'Ik heb morgen een afspraak.', '“I have an appointment tomorrow.”'),
    item('agenda', 'a-KHEN-da', '“Calendar / planner.” Common in scheduling talk.', 'Mijn agenda is vandaag vol.', '“My schedule is full today.”'),
    item('om drie uur', 'om dree yr', '“At three o’clock.” `Om` marks clock time.', 'De vergadering begint om drie uur.', '“The meeting starts at three.”'),
    item('ik kan', 'ik kan', '“I can / I am available.” Context supplies the scheduling meaning.', 'Ik kan vanavond.', '“I am available tonight.”'),
    item('ik kan niet', 'ik kan neet', '“I cannot.” Add an alternative to stay cooperative.', 'Ik kan niet in de ochtend, maar wel in de avond.', '“I cannot in the morning, but I can in the evening.”'),
    item('zullen we ...?', 'ZUL-len və', '“Shall we ...?” A natural proposal frame.', 'Zullen we vrijdag afspreken?', '“Shall we meet on Friday?”'),
    item('dat kan', 'dat kan', '“That works.” A concise acceptance.', 'Vijf uur? Ja, dat kan.', '“Five o’clock? Yes, that works.”'),
    item('verzetten', 'fer-ZET-ten', '“To reschedule / move.” Common for changing appointments.', 'Kunnen we de afspraak verzetten?', '“Can we reschedule the appointment?”'),
  ],
});
