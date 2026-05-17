const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u20',
  title: 'Level 1 · Unit 20: பரிந்துரைகள் மற்றும் திட்டங்கள் — Suggestions and Plans',
  category: 'planning',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make friendly suggestions, respond to them, and settle on a plan.',
  vocabularyGoal: 'Use suggestion, plan, and response phrases.',
  grammarGoal: 'Use inclusive suggestion forms such as `போகலாம்`, soft questions, and polite refusals.',
  speakingGoal: 'Suggest one activity, respond to one suggestion, and agree on a plan.',
  task: 'Plan a simple weekend outing.',
  expressionPractice: [
    practice('making-suggestion', 'Making suggestion', 'Use one `-லாம்` form.'),
    practice('accepting', 'Accepting suggestion', 'Use one positive response plus detail.'),
    practice('declining-softly', 'Declining softly', 'Give a reason and another option.'),
  ],
  relatedPools: ['topic-planning', 'topic-leisure'],
  items: [
    item('போகலாம்', 'pōkalām', '“Let’s go / we can go.” The `-லாம்` form is a key suggestion tool.', 'வார இறுதியில் கடற்கரைக்கு போகலாம்.', '“Let’s go to the beach on the weekend.”'),
    item('காபி குடிக்கலாமா?', 'kāpi kuṭikkalāmā', '“Shall we drink coffee?” A friendly suggestion question.', 'வகுப்புக்குப் பிறகு காபி குடிக்கலாமா?', '“Shall we drink coffee after class?”'),
    item('நல்ல யோசனை', 'nalla yōcaṉai', '“Good idea.” A quick positive response.', 'அது நல்ல யோசனை.', '“That is a good idea.”'),
    item('சரி', 'cari', '“Okay.” A compact acceptance word.', 'சரி, சனிக்கிழமை போகலாம்.', '“Okay, let’s go on Saturday.”'),
    item('மன்னிக்கவும், வர முடியாது', 'maṉṉikkavum vara muṭiyātu', '“Sorry, I cannot come.” A soft refusal.', 'மன்னிக்கவும், சனிக்கிழமை வர முடியாது.', '“Sorry, I cannot come on Saturday.”'),
    item('ஒருவேளை', 'oruvēḷai', '“Maybe.” Useful when the speaker is uncertain.', 'ஒருவேளை ஞாயிறு நல்லது.', '“Maybe Sunday is better.”'),
    item('நன்றாக இருக்கும்', 'naṉṟāka irukkum', '“It will be good / better.” Useful in comparing plans.', 'காலையில் போனால் நன்றாக இருக்கும்.', '“It would be good if we go in the morning.”'),
    item('அப்படியானால்', 'appaṭiyāṉāl', '“In that case.” A natural pivot after new information.', 'அப்படியானால் ஐந்து மணிக்கு சந்திப்போம்.', '“In that case, let’s meet at five.”'),
  ],
});
