const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('pt', {
  slug: 'pt-l1u11',
  title: 'Level 1 · Unit 11: Horários e Compromissos — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and adjust a plan politely.',
  vocabularyGoal: 'Use appointment, schedule, clock-time, and availability words.',
  grammarGoal: 'Use `poder`, `às`, and polite proposal frames such as `que tal...?`.',
  speakingGoal: 'Propose a time, accept it, reject it, and offer another one.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use `que tal` plus a time.'),
    practice('accepting', 'Accepting', 'Use `posso` or `serve para mim`.'),
    practice('rescheduling', 'Rescheduling', 'Use `não posso` plus an alternative.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('compromisso', 'kom-proh-MEE-soo', '“Appointment / engagement.” It covers many scheduled obligations.', 'Tenho um compromisso amanhã.', '“I have an appointment tomorrow.”'),
    item('horário', 'oh-RA-ree-oo', '“Schedule / time slot.” It is common in both school and service settings.', 'Qual horário é melhor para você?', '“What time is better for you?”'),
    item('às três', 'as tres', '“At three.” The accented `às` is the contraction used with feminine plural `horas` understood.', 'A reunião começa às três.', '“The meeting starts at three.”'),
    item('posso', 'POH-soo', '“I can.” In scheduling it often means availability.', 'Posso na quinta à tarde.', '“I can do Thursday afternoon.”'),
    item('não posso', 'nao POH-soo', '“I cannot.” Add a new option to stay cooperative.', 'Não posso de manhã, mas posso à noite.', '“I cannot in the morning, but I can at night.”'),
    item('que tal ...?', 'kee TAO', '“How about ...?” A friendly proposal frame.', 'Que tal sexta às quatro?', '“How about Friday at four?”'),
    item('serve para mim', 'SER-vee PA-ra meeng', '“That works for me.” Useful after a proposal.', 'Sábado de manhã serve para mim.', '“Saturday morning works for me.”'),
    item('mudar o horário', 'moo-DAR oo oh-RA-ree-oo', '“Change the time.” A practical rescheduling phrase.', 'Podemos mudar o horário?', '“Can we change the time?”'),
    item('chegar no horário', 'sheh-GAR noo oh-RA-ree-oo', '“Arrive on time.” A helpful social phrase around appointments.', 'Vou chegar no horário.', '“I will arrive on time.”'),
    item('mais tarde', 'myz TAR-jee', '“Later.” A small but useful scheduling modifier.', 'Podemos falar mais tarde.', '“We can talk later.”'),
  ],
});
