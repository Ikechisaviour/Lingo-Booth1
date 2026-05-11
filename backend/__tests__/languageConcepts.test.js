const {
  normalizeFlashcardsForLanguagePair,
  normalizeLessonForLanguagePair,
  languageField,
  prepareDefaultFlashcardForSeed,
} = require('../utils/languageConcepts');
const fs = require('fs');
const path = require('path');

const leakPatterns = [
  /\bOlder (?:brother|sister) \((?:male|female) speaker\)/i,
  /\bI\/Me \((?:formal|informal)\)/i,
  /\bHi \(informal\)/i,
  /\bGoodbye \((?:when you leave|to leaving person|to person leaving)\)/i,
];

function hasLeak(text) {
  return leakPatterns.some(pattern => pattern.test(String(text || '')));
}

describe('language concept normalization', () => {
  test('collapses Korean-only sibling speaker distinctions for Spanish cards', () => {
    const cards = [
      {
        _id: '1',
        isDefault: true,
        targetLang: 'es',
        korean: 'Hermano mayor (hablante masculino)',
        es: 'Hermano mayor (hablante masculino)',
        english: 'Older brother (male speaker)',
        category: ['family'],
      },
      {
        _id: '2',
        isDefault: true,
        targetLang: 'es',
        korean: 'Hermano mayor (hablante femenina)',
        es: 'Hermano mayor (hablante femenina)',
        english: 'Older brother (female speaker)',
        category: ['family'],
      },
    ];

    const normalized = normalizeFlashcardsForLanguagePair(cards, 'es', 'en');

    expect(normalized).toHaveLength(1);
    expect(normalized[0].es).toBe('Hermano mayor');
    expect(normalized[0].english).toBe('Older brother');
    expect(normalized[0].usage.distinction).toBe('family-speaker-gender');
  });

  test('uses target-language second-person forms instead of copied labels', () => {
    const cards = [
      {
        _id: '1',
        isDefault: true,
        targetLang: 'de',
        korean: 'Sie (informell)',
        de: 'Sie (informell)',
        english: 'You (informal)',
        category: ['pronouns'],
      },
      {
        _id: '2',
        isDefault: true,
        targetLang: 'de',
        korean: 'Sie (formell)',
        de: 'Sie (formell)',
        english: 'You (formal)',
        category: ['pronouns'],
      },
    ];

    const normalized = normalizeFlashcardsForLanguagePair(cards, 'de', 'en');

    expect(normalized.map(card => card.de)).toEqual(['du', 'Sie']);
    expect(normalized.map(card => card.english)).toEqual(['You (informal)', 'You (formal)']);
  });

  test('does not treat the legacy korean field as native Korean for non-Korean target cards', () => {
    const [card] = normalizeFlashcardsForLanguagePair([{
      _id: '1',
      isDefault: true,
      targetLang: 'es',
      korean: 'Hola',
      es: 'Hola',
      english: 'Hello',
      category: ['greetings'],
    }], 'es', 'ko');

    expect(card.es).toBe('Hola');
    expect(card.korean).toBe('');
  });

  test('normalizes quiz lesson content before native translation', () => {
    const lesson = {
      targetLang: 'zh',
      content: [
        { type: 'word', targetText: '我/我（非正式）', nativeText: 'I/Me (informal)' },
        { type: 'word', targetText: '我/我（正式）', nativeText: 'I/Me (formal)' },
      ],
    };

    normalizeLessonForLanguagePair(lesson, 'zh', 'en');

    expect(lesson.content).toHaveLength(1);
    expect(lesson.content[0].targetText).toBe('我/我');
    expect(lesson.content[0].nativeText).toBe('I/Me');
  });

  test('default seed docs do not carry every native-language translation field', () => {
    const doc = prepareDefaultFlashcardForSeed({
      korean: 'Hola (informal)',
      english: 'Hi (informal)',
      es: 'Hola',
      de: 'Hallo',
      category: ['greetings'],
    }, 'es', 0);

    expect(doc.es).toBe('Hola');
    expect(doc.de).toBeUndefined();
    expect(doc.english).toBe('Hi');
    expect(doc.conceptGloss).toBe('Hi');
  });

  test('keeps Korean first-person register distinctions when Korean is the target', () => {
    const doc = prepareDefaultFlashcardForSeed({
      korean: '저',
      romanization: 'jeo',
      english: 'I/Me (formal)',
      es: 'Yo/Yo (formal)',
      category: ['pronouns'],
    }, 'ko', 0);

    expect(doc.korean).toBe('저');
    expect(doc.english).toBe('I/Me (formal)');
    expect(doc.usage.distinction).toBe('first-person-register');
  });

  test('turns Korean source context notes into usage metadata for non-Korean targets', () => {
    const normalized = normalizeFlashcardsForLanguagePair([
      {
        _id: '1',
        isDefault: true,
        targetLang: 'es',
        korean: 'Adiós (cuando te vayas)',
        es: 'Adiós (cuando te vayas)',
        english: 'Goodbye (when you leave)',
        category: ['greetings'],
      },
      {
        _id: '2',
        isDefault: true,
        targetLang: 'es',
        korean: 'Adiós (a la persona que se va)',
        es: 'Adiós (a la persona que se va)',
        english: 'Goodbye (to leaving person)',
        category: ['greetings'],
      },
    ], 'es', 'en');

    expect(normalized).toHaveLength(1);
    expect(normalized[0].es).toBe('Adiós');
    expect(normalized[0].english).toBe('Goodbye');
    expect(normalized[0].usage.distinction).toBe('context-note');
  });

  test('keeps Korean source context notes visible when Korean is the target', () => {
    const [card] = normalizeFlashcardsForLanguagePair([{
      _id: '1',
      isDefault: true,
      targetLang: 'ko',
      korean: '안녕히 계세요',
      english: 'Goodbye (when you leave)',
      category: ['greetings'],
    }], 'ko', 'en');

    expect(card.korean).toBe('안녕히 계세요');
    expect(card.english).toBe('Goodbye (when you leave)');
  });

  test('normalizes known leakage patterns across generated flashcard language files', () => {
    const dir = path.join(__dirname, '..', 'flashcardData');
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    const issues = [];

    files.forEach((file) => {
      const lang = path.basename(file, '.js');
      const targetField = languageField(lang);
      const cards = require(path.join(dir, file)).map((card, index) => ({
        ...card,
        _id: `${lang}:${index}`,
        isDefault: true,
        [targetField]: card[targetField] || card.korean || '',
      }));
      normalizeFlashcardsForLanguagePair(cards, lang, 'en').forEach((card, index) => {
        if (hasLeak(card[targetField]) || hasLeak(card.english)) {
          issues.push({ lang, index, target: card[targetField], gloss: card.english });
        }
      });
    });

    expect(issues).toEqual([]);
  });

  test('normalizes known leakage patterns across generated quiz lesson files', () => {
    const dir = path.join(__dirname, '..', 'lessonData');
    const files = fs.readdirSync(dir).filter(file => file.endsWith('.js'));
    const issues = [];

    files.forEach((file) => {
      const lang = path.basename(file, '.js');
      const lessons = Object.values(require(path.join(dir, file))).filter(Boolean);
      lessons.forEach((lesson, lessonIndex) => {
        const normalized = normalizeLessonForLanguagePair(
          JSON.parse(JSON.stringify(lesson)),
          lesson.targetLang || lang,
          'en',
        );
        (normalized.content || []).forEach((item, itemIndex) => {
          if (hasLeak(item.targetText) || hasLeak(item.nativeText)) {
            issues.push({ lang, lessonIndex, itemIndex, target: item.targetText, gloss: item.nativeText });
          }
        });
      });
    });

    expect(issues).toEqual([]);
  });
});
