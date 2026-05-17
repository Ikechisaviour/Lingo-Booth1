const { item, practice, structured } = require('../shared/profileFactory');

module.exports = structured('tr', {
  slug: 'tr-l1u11',
  title: 'Level 1 · Unit 11: Buluşmalar ve Programlar — Scheduling',
  category: 'time',
  difficulty: 'beginner',
  lessonType: 'thematic',
  overview: 'Arrange meetings, talk about availability, and change plans politely.',
  vocabularyGoal: 'Use meeting, schedule, clock-time, and availability words.',
  grammarGoal: 'Use `-de/-da` for time, `uygun`, and proposal frames with `... mi?`.',
  speakingGoal: 'Propose a time, accept or reject it, and offer another option.',
  task: 'Schedule a study meeting with a classmate.',
  expressionPractice: [
    practice('proposing-time', 'Proposing time', 'Use one time plus question.'),
    practice('accepting', 'Accepting', 'Use `uygun`.'),
    practice('rescheduling', 'Rescheduling', 'Use `uygun değil` plus another option.'),
  ],
  relatedPools: ['topic-time', 'topic-planning'],
  items: [
    item('buluşma', 'bu-luş-MA', '“Meeting / get-together.” A common everyday noun.', 'Yarın bir buluşmam var.', '“Tomorrow I have a meeting.”'),
    item('program', 'prog-RAM', '“Schedule / plan.” A useful everyday loanword.', 'Programım bugün dolu.', '“My schedule is full today.”'),
    item('saat üçte', 'sa-AT üç-TE', '“At three o’clock.” The locative suffix follows vowel harmony and consonant voicing rules.', 'Ders saat üçte başlıyor.', '“Class starts at three.”'),
    item('uygun', 'uy-GUN', '“Suitable / available.” A key scheduling adjective.', 'Akşam benim için uygun.', '“Evening works for me.”'),
    item('uygun değilim', 'uy-GUN de-Ğİ-lim', '“I am not available.” A concise polite refusal.', 'Sabah uygun değilim.', '“I am not available in the morning.”'),
    item('yarın görüşelim mi?', 'ya-RIN gö-rü-şe-LİM mi', '“Shall we meet tomorrow?” The question particle remains separate in writing.', 'Yarın görüşelim mi?', '“Shall we meet tomorrow?”'),
    item('saati değiştirebilir miyiz?', 'sa-a-Tİ de-ğiş-ti-re-bi-LİR mi-YİZ', '“Can we change the time?” Ability suffix plus question particle in a real task.', 'Saati değiştirebilir miyiz?', '“Can we change the time?”'),
    item('tamam, anlaştık', 'ta-MAM an-laş-TIK', '“Okay, agreed.” A natural way to close the plan.', 'Tamam, anlaştık.', '“Okay, agreed.”'),
  ],
});
