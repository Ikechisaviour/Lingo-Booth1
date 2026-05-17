const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u21',
  title: 'Level 1 · Unit 21: आशाएँ और सपने — Hopes and Dreams',
  category: 'future',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Talk about plans, hopes, and longer-term dreams.',
  vocabularyGoal: 'Use future, study, work, travel, and aspiration vocabulary.',
  grammarGoal: 'Use `मैं ... चाहता / चाहती हूँ`, `आशा है कि`, and simple future forms.',
  speakingGoal: 'Describe one realistic plan and one longer-term dream.',
  task: 'Give a short future-self introduction.',
  expressionPractice: [
    practice('stating-plan', 'Stating plan', 'Use a future form clearly.'),
    practice('stating-hope', 'Stating hope', 'Use `आशा है कि`.'),
    practice('stating-dream', 'Stating dream', 'Describe a longer-term aspiration.'),
  ],
  relatedPools: ['topic-future', 'topic-goals'],
  items: [
    item('भविष्य', 'bhaviṣya', '“Future.”', 'मैं अपने भविष्य के बारे में सोचता हूँ।', '“I think about my future.”'),
    item('सपना', 'sapnā', '“Dream.”', 'मेरा सपना डॉक्टर बनना है।', '“My dream is to become a doctor.”'),
    item('मैं ... चाहता हूँ / चाहती हूँ', 'main ... chāhtā hū̃ / chāhtī hū̃', '“I want ...” masculine / feminine speaker forms.', 'मैं अच्छी हिंदी सीखना चाहती हूँ।', '“I want to learn good Hindi.”'),
    item('आशा है कि', 'āśā hai ki', '“I hope that.” A useful softer future frame.', 'आशा है कि मैं भारत जाऊँगा।', '“I hope that I will go to India.”'),
    item('मैं पढ़ूँगा / पढ़ूँगी', 'main paṛhū̃gā / paṛhū̃gī', '“I will study” masculine / feminine speaker forms.', 'मैं अगले साल इंजीनियरिंग पढ़ूँगी।', '“I will study engineering next year.”'),
    item('मैं काम करूँगा / करूँगी', 'main kām karū̃gā / karū̃gī', '“I will work.”', 'मैं एक बड़ी कंपनी में काम करूँगा।', '“I will work in a big company.”'),
    item('बनना', 'bannā', '“To become.”', 'मैं शिक्षक बनना चाहता हूँ।', '“I want to become a teacher.”'),
    item('अगर', 'agar', '“If.” Useful for realistic conditions around goals.', 'अगर मौका मिला, तो मैं विदेश जाऊँगा।', '“If I get the chance, I will go abroad.”'),
    item('मौका', 'maukā', '“Opportunity / chance.”', 'मुझे अच्छा मौका चाहिए।', '“I need a good opportunity.”'),
    item('एक दिन', 'ek din', '“One day.”', 'एक दिन मैं किताब लिखूँगी।', '“One day I will write a book.”'),
  ],
});
