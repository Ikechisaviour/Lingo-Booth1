const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('fil', {
  slug: 'fil-l1u19',
  title: 'Level 1 · Unit 19: Mga Pista at Pagdiriwang — Holidays and Celebrations',
  category: 'culture',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about major holidays, greetings, family visits, and celebration plans.',
  vocabularyGoal: 'Use holiday names, greeting formulas, meal words, and visit vocabulary.',
  grammarGoal: 'Use habitual and contemplated forms to describe customs and plans.',
  speakingGoal: 'Describe one holiday and what people usually do during it.',
  task: 'Explain a holiday plan for a family visit.',
  expressionPractice: [
    practice('naming-holiday', 'Naming holiday', 'Use the holiday name accurately.'),
    practice('giving-greeting', 'Giving greeting', 'Choose a fitting formula.'),
    practice('describing-custom', 'Describing custom', 'Say what people usually do.'),
  ],
  relatedPools: ['topic-culture', 'topic-family'],
  items: [
    item('pista', 'pista', '“Festival / town feast.” A culturally important local celebration word.', 'Masaya ang pista sa baryo.', '“The town fiesta is joyful.”'),
    item('Pasko', 'pasko', '“Christmas.”', 'Sa Pasko, nagtitipon ang pamilya.', '“At Christmas, the family gathers.”'),
    item('Araw ng Kalayaan', 'araw ng kalayaan', '“Independence Day.”', 'Ipinagdiriwang ang Araw ng Kalayaan tuwing Hunyo.', '“Independence Day is celebrated every June.”'),
    item('Maligayang Pasko', 'maligayang pasko', '“Merry Christmas.”', 'Maligayang Pasko sa inyong lahat!', '“Merry Christmas to all of you!”'),
    item('handa', 'handa', '“Feast / prepared food spread.”', 'Maraming handa sa mesa.', '“There is a lot of feast food on the table.”'),
    item('pamilya', 'pamilya', '“Family.”', 'Bibisita kami sa pamilya.', '“We will visit family.”'),
    item('regalo', 'regalo', '“Gift.”', 'Bumili ako ng regalo para sa kapatid ko.', '“I bought a gift for my sibling.”'),
    item('suman', 'suman', 'A sticky-rice delicacy that fits many local celebrations.', 'Kumakain kami ng suman sa pista.', '“We eat suman during the fiesta.”'),
    item('magdiwang', 'magdiwang', '“To celebrate.”', 'Magdiriwang kami nang sama-sama.', '“We will celebrate together.”'),
    item('sa susunod na linggo', 'sa susunod na linggo', '“Next week.”', 'Magdiriwang kami sa susunod na linggo.', '“We will celebrate next week.”'),
  ],
});
