const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('ta', {
  slug: 'ta-l1u21',
  title: 'Level 1 · Unit 21: நம்பிக்கைகள் மற்றும் கனவுகள் — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about future plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use desire with `விரும்புகிறேன்`, future forms, and hope expressions.',
  speakingGoal: 'Describe one realistic plan and one longer dream with a reason.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-desire', 'Stating desire', 'Use `விரும்புகிறேன்`.'),
    practice('stating-plan', 'Stating plan', 'Use one future form.'),
    practice('stating-hope', 'Stating hope', 'Use `நம்புகிறேன்`.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('எதிர்காலம்', 'etirkālam', '“Future.” A central abstract noun for plans and goals.', 'என் எதிர்காலத்தைப் பற்றி நினைக்கிறேன்.', '“I think about my future.”'),
    item('கனவு', 'kaṉavu', '“Dream.” It can be literal or aspirational.', 'என் கனவு மருத்துவராக ஆகுவது.', '“My dream is to become a doctor.”'),
    item('விரும்புகிறேன்', 'virumpukiṟēṉ', '“I want / wish.” A useful desire verb.', 'நான் தமிழ் நன்றாக கற்க விரும்புகிறேன்.', '“I want to learn Tamil well.”'),
    item('படிப்பேன்', 'paṭippēṉ', '“I will study.” A first-person future form.', 'நான் பொறியியல் படிப்பேன்.', '“I will study engineering.”'),
    item('நம்புகிறேன்', 'nampukiṟēṉ', '“I hope / believe.” Context gives the hopeful reading.', 'ஒருநாள் சென்னை செல்ல நம்புகிறேன்.', '“I hope to go to Chennai one day.”'),
    item('ஆக', 'āka', '“To become.” Useful in career dreams.', 'நான் ஆசிரியராக ஆக விரும்புகிறேன்.', '“I want to become a teacher.”'),
    item('வாய்ப்பு இருந்தால்', 'vāyppu iruntāl', '“If there is an opportunity.” A natural condition around future plans.', 'வாய்ப்பு இருந்தால் வெளிநாட்டில் வேலை செய்வேன்.', '“If there is an opportunity, I will work abroad.”'),
    item('ஒருநாள்', 'orunāḷ', '“One day.” A simple phrase for distant hopes.', 'ஒருநாள் ஒரு புத்தகம் எழுத விரும்புகிறேன்.', '“One day I want to write a book.”'),
  ],
});
