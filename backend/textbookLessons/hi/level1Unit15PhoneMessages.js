const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('hi', {
  slug: 'hi-l1u15',
  title: 'Level 1 · Unit 15: फ़ोन और संदेश — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Answer a call, ask who is speaking, and leave a short message.',
  vocabularyGoal: 'Use phone, message, callback, and contact vocabulary.',
  grammarGoal: 'Use polite imperatives such as `कृपया बताइए` and `फ़ोन कीजिए`.',
  speakingGoal: 'Handle a short phone exchange and leave one clear message.',
  task: 'Roleplay calling someone who is unavailable.',
  expressionPractice: [
    practice('answering-call', 'Answering call', 'Use a natural opening.'),
    practice('asking-identity', 'Asking identity', 'Ask who is speaking politely.'),
    practice('leaving-message', 'Leaving message', 'State your name and request a callback.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('हैलो', 'hailo', '“Hello” on the phone.', 'हैलो, नमस्ते।', '“Hello, namaste.”'),
    item('कौन बोल रहे हैं?', 'kaun bol rahe hain?', '“Who is speaking?” Honorific plural agreement keeps it polite.', 'कृपया बताइए, कौन बोल रहे हैं?', '“Please tell me, who is speaking?”'),
    item('क्या मैं ... से बात कर सकता हूँ?', 'kyā main ... se bāt kar saktā hū̃?', '“May I speak with ...?” A polite phone request.', 'क्या मैं सीमा जी से बात कर सकता हूँ?', '“May I speak with Ms. Seema?”'),
    item('संदेश', 'sandeś', '“Message.”', 'क्या आप संदेश छोड़ना चाहेंगे?', '“Would you like to leave a message?”'),
    item('मुझे फ़ोन कीजिए', 'mujhe phon kījiye', '“Please call me.” A polite imperative with indirect-object marking.', 'कृपया शाम को मुझे फ़ोन कीजिए।', '“Please call me in the evening.”'),
    item('फ़ोन नंबर', 'phon nambar', '“Phone number.”', 'आपका फ़ोन नंबर क्या है?', '“What is your phone number?”'),
    item('अभी व्यस्त हैं', 'abhī vyast hain', '“Is busy now.” Useful when the person cannot answer.', 'वे अभी व्यस्त हैं।', '“They are busy now.”'),
    item('मैं बाद में फ़ोन करूँगा / करूँगी', 'main bād mẽ phon karū̃gā / karū̃gī', '“I will call later” masculine / feminine speaker forms.', 'मैं आपको बाद में फ़ोन करूँगी।', '“I will call you later.”'),
    item('व्हाट्सऐप', 'vhāṭsaip', '“WhatsApp.” A practical modern communication word.', 'मैंने आपको व्हाट्सऐप पर संदेश भेजा।', '“I sent you a message on WhatsApp.”'),
    item('मिल गया', 'mil gayā', '“Received / got it.” Agreement may shift with the noun or speaker context.', 'मुझे आपका संदेश मिल गया।', '“I received your message.”'),
  ],
});
