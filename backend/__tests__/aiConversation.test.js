const {
  buildLanguagePairRedirect,
  buildLessonBrief,
  detectDominantLanguage,
  detectOutOfPairLanguage,
  learnerRequestedNativeFirstOrder,
  orderSpeechPartsForPair,
  parseAIJsonContent,
  resolveConversationRoleState,
  sanitizeClassAction,
  sanitizeCustomRoleplay,
  teachingDirectivesFor,
} = require('../utils/aiConversation');

describe('ai conversation language pair guard', () => {
  it('allows target-language script input inside the selected pair', () => {
    expect(detectOutOfPairLanguage({
      transcript: '안녕하세요',
      nativeLanguage: 'en',
      targetLanguage: 'ko',
    })).toBeNull();
  });

  it('detects script languages outside the selected pair', () => {
    const result = detectOutOfPairLanguage({
      transcript: '你好',
      nativeLanguage: 'en',
      targetLanguage: 'ko',
    });

    expect(result).toMatchObject({
      language: 'zh',
      languageName: 'Chinese',
      nativeLanguageName: 'English',
      targetLanguageName: 'Korean',
    });
  });

  it('detects Latin-script languages outside the selected pair', () => {
    const result = detectOutOfPairLanguage({
      transcript: 'Hola, como estas hoy',
      nativeLanguage: 'en',
      targetLanguage: 'ko',
    });

    expect(result).toMatchObject({
      language: 'es',
      languageName: 'Spanish',
    });
  });

  it('does not flag either side of a Latin-script selected pair', () => {
    expect(detectOutOfPairLanguage({
      transcript: 'Bonjour, je voudrais un cafe',
      nativeLanguage: 'en',
      targetLanguage: 'fr',
    })).toBeNull();

    expect(detectDominantLanguage('Please remind me what I ordered', 'fr', 'en', 'fr')).toBe('en');
  });

  it('builds a user-safe redirect without operational details', () => {
    const redirect = buildLanguagePairRedirect({
      language: 'es',
      languageName: 'Spanish',
      nativeLanguage: 'en',
      nativeLanguageName: 'English',
      targetLanguage: 'ko',
      targetLanguageName: 'Korean',
    });

    expect(redirect.reply).toContain('English or Korean');
    expect(redirect.reply).toContain('Spanish');
    expect(redirect.reply).not.toMatch(/api|backend|token|model/i);
    expect(redirect.languageOutOfPair).toBe(true);
  });

  it('delivers out-of-pair redirects in the learner native language', () => {
    const outOfPair = detectOutOfPairLanguage({
      transcript: 'hi',
      nativeLanguage: 'fil',
      targetLanguage: 'de',
    });
    const redirect = buildLanguagePairRedirect(outOfPair);

    expect(redirect.expectedLanguage).toBe('fil');
    expect(redirect.reply).toContain('Panatilihin');
    expect(redirect.reply).toContain('Filipino o Aleman');
    expect(redirect.reply).toContain('Ingles');
    expect(redirect.reply).not.toContain("Let's keep");
  });

  it('extracts a clean reply from fenced JSON content', () => {
    const parsed = parseAIJsonContent('```json\n{"reply":"Bagus! Apa yang awak nak pesan?","expectedLanguage":"ms"}\n```');

    expect(parsed.reply).toBe('Bagus! Apa yang awak nak pesan?');
    expect(parsed.expectedLanguage).toBe('ms');
  });

  it('does not expose malformed JSON as the learner-facing reply', () => {
    const parsed = parseAIJsonContent('{"reply":"Nice!","speechParts":[');

    expect(parsed.reply).toBe('Nice!');
  });

  it('orders bilingual speech parts with the target language first', () => {
    const ordered = orderSpeechPartsForPair([
      { language: 'fil', text: 'Gusto mong umorder ng kape.' },
      { language: 'de', text: 'Was moechten Sie bestellen?' },
    ], 'de', 'fil');

    expect(ordered.map(part => part.language)).toEqual(['de', 'fil']);
  });

  it('detects explicit native-first ordering requests', () => {
    expect(learnerRequestedNativeFirstOrder(
      'Please answer in Filipino first, then German.',
      'de',
      'fil',
    )).toBe(true);

    expect(learnerRequestedNativeFirstOrder(
      'Please answer in German first, then Filipino.',
      'de',
      'fil',
    )).toBe(false);
  });

  it('switches cafe roles when the learner asks to be the cafe staff', () => {
    const roleState = resolveConversationRoleState({
      scenario: 'Ordering at a cafe',
      transcript: 'I want to be the cafe staff',
      memory: {},
    });

    expect(roleState).toMatchObject({
      scenarioKey: 'cafe',
      learnerRoleKey: 'cafeStaff',
      partnerRoleKey: 'customer',
      learnerRole: 'cafe staff',
      partnerRole: 'customer',
      roleSwitchRequested: true,
    });
  });

  it('accepts complete custom roleplay definitions', () => {
    expect(sanitizeCustomRoleplay({
      learnerRole: 'Student',
      partnerRole: 'Professor',
      situation: 'Office hours',
      goal: 'Ask about an assignment deadline',
    })).toMatchObject({
      title: 'Student and Professor',
      learnerRole: 'Student',
      partnerRole: 'Professor',
      situation: 'Office hours',
      goal: 'Ask about an assignment deadline',
    });
  });
});

describe('class lesson brief and teaching directives', () => {
  // A small synthetic lesson covers two activities and three item types so the
  // tests can assert filtering, untagged-item passthrough, and section routing
  // without depending on the textbook seed. Adding/removing fields here only
  // affects the tests, not the production data.
  const sampleLesson = {
    title: 'Test Unit',
    category: 'career',
    difficulty: 'intermediate',
    activities: [
      {
        id: 'vocab-act',
        section: 'Vocabulary',
        title: 'Words',
        goals: ['Learn the words.'],
        task: 'Make a sentence.',
      },
      {
        id: 'pron-act',
        section: 'Pronunciation',
        title: 'Tense sounds',
        goals: ['Hear the tense reading.'],
        task: 'Say it back.',
      },
    ],
    content: [
      { type: 'word', targetText: '여권', romanization: 'yeokkwon', nativeText: 'passport', activityIds: ['pron-act'] },
      { type: 'word', targetText: '능력', romanization: 'neungnyeok', nativeText: 'ability', activityIds: ['vocab-act'] },
      { type: 'sentence', targetText: '저는 학생입니다.', nativeText: 'I am a student.', activityIds: ['vocab-act'] },
      { type: 'word', targetText: '직업', romanization: 'jigeop', nativeText: 'job' }, // untagged
    ],
  };

  it('returns all items when no activityId is given', () => {
    const brief = buildLessonBrief(sampleLesson);
    expect(brief.items).toHaveLength(4);
    expect(brief.activeActivity).toBeNull();
    expect(brief.availableActivities.map(a => a.id)).toEqual(['vocab-act', 'pron-act']);
  });

  it('filters items to a specific activity but keeps untagged items', () => {
    const brief = buildLessonBrief(sampleLesson, 'vocab-act');
    const targets = brief.items.map(i => i.target);
    expect(targets).toContain('능력');
    expect(targets).toContain('저는 학생입니다.');
    expect(targets).toContain('직업'); // untagged is permissive, appears everywhere
    expect(targets).not.toContain('여권'); // tagged for a different activity
    expect(brief.activeActivity).toMatchObject({ id: 'vocab-act', section: 'Vocabulary' });
  });

  it('preserves the global lesson.content[] index in items[].globalIndex', () => {
    const brief = buildLessonBrief(sampleLesson, 'pron-act');
    expect(brief.items).toHaveLength(2); // 여권 + untagged 직업
    const yeogwon = brief.items.find(i => i.target === '여권');
    expect(yeogwon).toMatchObject({ globalIndex: 0, type: 'word' });
  });

  it('returns null for a lesson without a content array', () => {
    expect(buildLessonBrief(null)).toBeNull();
    expect(buildLessonBrief({ title: 'Empty' })).toBeNull();
  });

  it('produces empty directives when there is no lesson brief', () => {
    expect(teachingDirectivesFor(null)).toEqual([]);
    expect(teachingDirectivesFor(undefined)).toEqual([]);
  });

  it('routes Pronunciation activities to the tense-sound directive', () => {
    const brief = buildLessonBrief(sampleLesson, 'pron-act');
    const directives = teachingDirectivesFor(brief).join(' ');
    expect(directives).toMatch(/tense/i);
    expect(directives).toMatch(/spelling.*pronounced/i);
  });

  it('routes Vocabulary activities to the vocabulary directive', () => {
    const brief = buildLessonBrief(sampleLesson, 'vocab-act');
    const directives = teachingDirectivesFor(brief).join(' ');
    expect(directives).toMatch(/Vocabulary activity/);
    expect(directives).toMatch(/make their own sentence/);
  });

  it('falls back to default directives for an unknown section', () => {
    const customBrief = buildLessonBrief({
      ...sampleLesson,
      activities: [{ id: 'mystery', section: 'Imaginary Drill', title: 'X' }],
      content: [{ type: 'word', targetText: 'a', nativeText: 'b', activityIds: ['mystery'] }],
    }, 'mystery');
    const directives = teachingDirectivesFor(customBrief).join(' ');
    expect(directives).toMatch(/No specific activity is selected|Walk through lessonBrief.items/);
  });

  it('sanitizes a structured classAction payload and trims oversize strings', () => {
    const cleaned = sanitizeClassAction({
      action: 'teach_selected_item',
      activityId: 'pron-act',
      activitySection: 'Pronunciation',
      activityTitle: 'Glottalization: 여권',
      activityGoals: ['Notice tense-sound pronunciation.', '', null],
      activityTask: 'Listen and compare with the spelling.',
      itemIndex: 18,
      itemType: 'word',
      target: '여권',
      romanization: 'yeokkwon',
      native: 'passport',
      exampleTarget: '여권을 잃어버렸어요.',
      exampleNative: 'I lost my passport.',
      lessonTitle: '1과: 적성과 진로',
    });

    expect(cleaned).toMatchObject({
      action: 'teach_selected_item',
      activityId: 'pron-act',
      activitySection: 'Pronunciation',
      itemIndex: 18,
      itemType: 'word',
      target: '여권',
    });
    expect(cleaned.activityGoals).toEqual(['Notice tense-sound pronunciation.']);
  });

  it('rejects classAction payloads without an action verb', () => {
    expect(sanitizeClassAction({})).toBeNull();
    expect(sanitizeClassAction({ activityId: 'x' })).toBeNull();
    expect(sanitizeClassAction(null)).toBeNull();
    expect(sanitizeClassAction([])).toBeNull();
  });

  it('surfaces expressionPractice and relatedPools on the brief', () => {
    const brief = buildLessonBrief({
      ...sampleLesson,
      lessonType: 'thematic',
      expressionPractice: [
        { id: 'seeking-advice', label: 'Seeking advice', goal: 'Ask another speaker for guidance.' },
        { id: '', label: 'invalid' }, // missing id should be dropped
      ],
      relatedPools: ['topic-school', 'topic-society', '', null, 'pos-idioms'],
    });

    expect(brief.lessonType).toBe('thematic');
    expect(brief.expressionPractice).toEqual([
      { id: 'seeking-advice', label: 'Seeking advice', goal: 'Ask another speaker for guidance.' },
    ]);
    expect(brief.relatedPools).toEqual(['topic-school', 'topic-society', 'pos-idioms']);
  });

  it('directives mention expressionPractice and relatedPools only when present', () => {
    const briefWith = buildLessonBrief({
      ...sampleLesson,
      expressionPractice: [{ id: 'seeking-advice', label: 'Seeking advice', goal: 'Ask for help.' }],
      relatedPools: ['topic-health'],
    });
    const directivesWith = teachingDirectivesFor(briefWith).join(' ');
    expect(directivesWith).toMatch(/lessonBrief\.expressionPractice lists functional language goals/);
    expect(directivesWith).toMatch(/lessonBrief\.relatedPools lists vocabulary pool keys/);

    const briefWithout = buildLessonBrief(sampleLesson);
    const directivesWithout = teachingDirectivesFor(briefWithout).join(' ');
    expect(directivesWithout).not.toMatch(/lessonBrief\.expressionPractice lists/);
    expect(directivesWithout).not.toMatch(/lessonBrief\.relatedPools lists/);
  });

  it('routes lessonType to the matching directive cluster', () => {
    const grammarBrief = buildLessonBrief({ ...sampleLesson, lessonType: 'grammar' });
    const grammarDirectives = teachingDirectivesFor(grammarBrief).join(' ');
    expect(grammarDirectives).toMatch(/grammar-pattern lesson/i);

    const workplaceBrief = buildLessonBrief({ ...sampleLesson, lessonType: 'workplace' });
    const workplaceDirectives = teachingDirectivesFor(workplaceBrief).join(' ');
    expect(workplaceDirectives).toMatch(/formal register/i);

    const reviewBrief = buildLessonBrief({ ...sampleLesson, lessonType: 'review' });
    const reviewDirectives = teachingDirectivesFor(reviewBrief).join(' ');
    expect(reviewDirectives).toMatch(/review lesson/i);

    const thematicBrief = buildLessonBrief({ ...sampleLesson, lessonType: 'thematic' });
    const thematicDirectives = teachingDirectivesFor(thematicBrief).join(' ');
    expect(thematicDirectives).not.toMatch(/grammar-pattern lesson/i);
    expect(thematicDirectives).not.toMatch(/workplace\/adult-life/i);
  });

  it('always asserts the new lessonProgress schema, not the legacy fields', () => {
    const brief = buildLessonBrief(sampleLesson, 'vocab-act');
    const directives = teachingDirectivesFor(brief).join(' ');
    expect(directives).toContain('memory.lessonProgress');
    expect(directives).toContain('activityId');
    expect(directives).toContain('itemIndex');
    expect(directives).toContain('itemType');
    // Old fields must not appear in the contract anymore.
    expect(directives).not.toMatch(/\bsection: "vocabulary"/);
    expect(directives).not.toMatch(/\bactivityIndex\b/);
  });
});
