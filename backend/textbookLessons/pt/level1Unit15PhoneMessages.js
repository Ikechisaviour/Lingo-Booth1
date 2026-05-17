const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u15',
  title: 'Level 1 · Unit 15: Telefonemas e Mensagens — Phone Calls and Messages',
  category: 'communication',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Make short calls, leave messages, and repair misunderstandings.',
  vocabularyGoal: 'Use call, message, number, and contact vocabulary.',
  grammarGoal: 'Use polite phone requests with `poderia` and concise confirmation phrases.',
  speakingGoal: 'Open a call, ask for someone, leave a message, and confirm a number.',
  task: 'Leave a clear message for a classmate.',
  expressionPractice: [
    practice('opening-call', 'Opening call', 'Use one greeting and identify yourself.'),
    practice('leaving-message', 'Leaving message', 'Use `pode deixar um recado?`.'),
    practice('asking-repeat', 'Asking repetition', 'Use `pode repetir?`.'),
  ],
  relatedPools: ['topic-communication', 'topic-service'],
  items: [
    item('alô', 'a-LOH', 'The standard Brazilian phone greeting.', 'Alô, aqui é a Marina.', '“Hello, this is Marina.”'),
    item('eu gostaria de falar com ...', 'eh-oo gos-ta-REE-a djee fa-LAR kong', '“I would like to speak with ...” A courteous request for calls.', 'Eu gostaria de falar com o professor Silva.', '“I would like to speak with Professor Silva.”'),
    item('não está disponível', 'nao esh-TA jees-po-NEE-vel', '“Is not available.” Useful in office or service calls.', 'Ela não está disponível agora.', '“She is not available now.”'),
    item('recado', 'heh-KA-doo', '“Message.” In Brazilian phone talk this is often more natural than a literal loanword.', 'Posso deixar um recado?', '“May I leave a message?”'),
    item('pode avisar que liguei?', 'POH-jee a-vee-ZAR kee lee-GAY', '“Can you tell them that I called?” A highly practical message formula.', 'Pode avisar que liguei?', '“Can you tell them that I called?”'),
    item('número de telefone', 'NOO-meh-roo djee teh-leh-FOH-nee', '“Phone number.” `Número` keeps the accent in writing and stress in speech.', 'Qual é o seu número de telefone?', '“What is your phone number?”'),
    item('pode repetir?', 'POH-jee heh-peh-CHEER', '“Can you repeat?” One of the most important learner repair phrases.', 'Desculpe, pode repetir o número?', '“Sorry, can you repeat the number?”'),
    item('mensagem', 'men-SA-zhem', '“Message.” This often refers to texts or app messages.', 'Vou mandar uma mensagem depois.', '“I will send a message later.”'),
    item('ligo mais tarde', 'LEE-goo myz TAR-jee', '“I will call later.” A natural call-ending promise.', 'Tudo bem, ligo mais tarde.', '“Alright, I will call later.”'),
    item('até logo', 'a-TEH LOH-goo', '“See you soon / bye for now.” A neutral call closing.', 'Obrigada, até logo.', '“Thank you, see you soon.”'),
  ],
});
