const {
  buildLanguagePairRedirect,
  detectDominantLanguage,
  detectOutOfPairLanguage,
  learnerRequestedNativeFirstOrder,
  orderSpeechPartsForPair,
  parseAIJsonContent,
  resolveConversationRoleState,
  sanitizeCustomRoleplay,
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
