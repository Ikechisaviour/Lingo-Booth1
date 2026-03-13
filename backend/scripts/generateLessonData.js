/**
 * generateLessonData.js
 * Generates expanded lesson data for all 18 languages using translations
 * from the master flashcardData.js file.
 *
 * Korean has 28 lessons (7 categories × 4 difficulties) with ~100 items each.
 * This script generates equivalent lesson files for all other languages.
 *
 * Usage: node scripts/generateLessonData.js
 */

const fs = require('fs');
const path = require('path');
const cards = require('../flashcardData');

const LANGS = ['es','fr','de','zh','ja','hi','ar','he','pt','it','nl','ru','id','tr','bn','ta','ms','fil'];

// Languages that need romanization (non-Latin scripts)
const ROMANIZATION_LANGS = new Set(['zh','ja','hi','ar','he','ru','bn','ta']);

// Map flashcard categories to lesson categories
const CATEGORY_MAP = {
  'greetings': 'greetings',
  'business': 'business',
  'travel': 'travel',
  'shopping': 'shopping',
  'healthcare': 'healthcare',
  'daily-life': 'daily-life',
  'food': 'food',
  // Overflow categories mapped to closest lesson category
  'numbers': 'daily-life',
  'family': 'daily-life',
  'colors': 'daily-life',
  'body': 'healthcare',
  'places': 'travel',
  'transportation': 'travel',
  'time': 'daily-life',
  'weather': 'daily-life',
  'adjectives': 'greetings',
  'verbs': 'daily-life',
  'pronouns': 'greetings',
  'common': 'greetings',
  'clothing': 'shopping',
  'technology': 'business',
  'emotions': 'greetings',
  'education': 'daily-life',
  'hobbies': 'daily-life',
  'nature': 'travel',
  'household': 'daily-life',
};

const LESSON_CATEGORIES = ['greetings', 'daily-life', 'food', 'travel', 'shopping', 'business', 'healthcare'];

// Lesson titles per category and difficulty
const TITLES = {
  greetings: {
    beginner: 'Basic Greetings & Introductions',
    intermediate: 'Polite Expressions & Social Phrases',
    advanced: 'Formal & Cultural Expressions',
    sentences: 'Conversation Practice',
  },
  'daily-life': {
    beginner: 'Everyday Life & Routines',
    intermediate: 'Daily Activities & Schedules',
    advanced: 'Lifestyle & Cultural Practices',
    sentences: 'Daily Conversations',
  },
  food: {
    beginner: 'Food & Dining',
    intermediate: 'Restaurant Conversations',
    advanced: 'Cuisine Culture',
    sentences: 'Restaurant Dialogues',
  },
  travel: {
    beginner: 'Travel & Transportation',
    intermediate: 'Public Transportation',
    advanced: 'Travel Planning',
    sentences: 'Travel Conversations',
  },
  shopping: {
    beginner: 'Shopping Basics',
    intermediate: 'Price Negotiation',
    advanced: 'Consumer Rights',
    sentences: 'Shopping Dialogues',
  },
  business: {
    beginner: 'Business Basics',
    intermediate: 'Office Communication',
    advanced: 'Corporate Management',
    sentences: 'Workplace Conversations',
  },
  healthcare: {
    beginner: 'Health & Medical Basics',
    intermediate: 'Medical Consultations',
    advanced: 'Specialized Treatment',
    sentences: 'Medical Conversations',
  },
};

// Target item counts per difficulty (matching Korean)
const TARGET_COUNTS = {
  greetings: { beginner: 100, intermediate: 100, advanced: 100, sentences: 100 },
  'daily-life': { beginner: 120, intermediate: 105, advanced: 95, sentences: 110 },
  food: { beginner: 115, intermediate: 99, advanced: 80, sentences: 100 },
  travel: { beginner: 100, intermediate: 100, advanced: 100, sentences: 100 },
  shopping: { beginner: 100, intermediate: 98, advanced: 94, sentences: 90 },
  business: { beginner: 100, intermediate: 97, advanced: 99, sentences: 91 },
  healthcare: { beginner: 100, intermediate: 94, advanced: 93, sentences: 94 },
};

function escapeStr(s) {
  if (!s) return '';
  return s.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

// Group flashcard data by lesson category
function groupByCategory() {
  const groups = {};
  LESSON_CATEGORIES.forEach(cat => { groups[cat] = []; });

  cards.forEach(card => {
    const primaryCat = Array.isArray(card.category) ? card.category[0] : (card.category || 'uncategorized');
    const lessonCat = CATEGORY_MAP[primaryCat] || 'daily-life';
    groups[lessonCat].push(card);
  });

  return groups;
}

// Generate a createContentItem call string
function genWordItem(targetText, romanization, english) {
  return `    createContentItem('${escapeStr(targetText)}', '${escapeStr(romanization)}', '${escapeStr(english)}'),`;
}

// Generate a sentence-type item with breakdown
function genSentenceItem(targetText, romanization, english) {
  // Split the target text into words for breakdown
  const words = targetText.split(/\s+/).filter(w => w.length > 0);
  const engWords = english.split(/\s+/).filter(w => w.length > 0);

  if (words.length <= 1) {
    return `    createContentItem('${escapeStr(targetText)}', '${escapeStr(romanization)}', '${escapeStr(english)}', 'sentence'),`;
  }

  // Create breakdown pairs
  const breakdownParts = [];
  if (words.length <= 3) {
    words.forEach((w, i) => {
      const eng = engWords[i] || '';
      breakdownParts.push(`{ target: '${escapeStr(w)}', native: '${escapeStr(eng)}', korean: '${escapeStr(w)}', english: '${escapeStr(eng)}' }`);
    });
  } else {
    // Group into 2-3 chunks
    const mid = Math.ceil(words.length / 2);
    const part1 = words.slice(0, mid).join(' ');
    const part2 = words.slice(mid).join(' ');
    const engMid = Math.ceil(engWords.length / 2);
    const engPart1 = engWords.slice(0, engMid).join(' ');
    const engPart2 = engWords.slice(engMid).join(' ');
    breakdownParts.push(`{ target: '${escapeStr(part1)}', native: '${escapeStr(engPart1)}', korean: '${escapeStr(part1)}', english: '${escapeStr(engPart1)}' }`);
    breakdownParts.push(`{ target: '${escapeStr(part2)}', native: '${escapeStr(engPart2)}', korean: '${escapeStr(part2)}', english: '${escapeStr(engPart2)}' }`);
  }

  return `    createContentItem('${escapeStr(targetText)}', '${escapeStr(romanization)}', '${escapeStr(english)}', 'sentence', '', '', [\n      ${breakdownParts.join(',\n      ')},\n    ]),`;
}

// Variable name mapping for categories
const VAR_NAMES = {
  greetings: { beginner: 'greetings', intermediate: 'greetingsIntermediate', advanced: 'greetingsAdvanced', sentences: 'greetingsSentences' },
  'daily-life': { beginner: 'dailyLife', intermediate: 'dailyLifeIntermediate', advanced: 'dailyLifeAdvanced', sentences: 'dailyLifeSentences' },
  food: { beginner: 'food', intermediate: 'foodIntermediate', advanced: 'foodAdvanced', sentences: 'foodSentences' },
  travel: { beginner: 'travel', intermediate: 'travelIntermediate', advanced: 'travelAdvanced', sentences: 'travelSentences' },
  shopping: { beginner: 'shopping', intermediate: 'shoppingIntermediate', advanced: 'shoppingAdvanced', sentences: 'shoppingSentences' },
  business: { beginner: 'business', intermediate: 'businessIntermediate', advanced: 'businessAdvanced', sentences: 'businessSentences' },
  healthcare: { beginner: 'healthcare', intermediate: 'healthcareIntermediate', advanced: 'healthcareAdvanced', sentences: 'healthcareSentences' },
};

function generateLangFile(lang) {
  const groups = groupByCategory();
  const needsRoman = ROMANIZATION_LANGS.has(lang);
  const lines = [];

  // Header
  lines.push(`// ${lang.toUpperCase()} - Complete Lesson Data (all 7 categories × 4 difficulty levels)`);
  lines.push(`// Auto-generated from master flashcardData.js translations`);
  lines.push('');
  lines.push(`const createContentItem = (targetText, romanization, nativeText, type = 'word', exampleTarget = '', exampleNative = '', breakdown = null) => ({`);
  lines.push('  type,');
  lines.push('  targetText,');
  lines.push('  romanization,');
  lines.push('  nativeText,');
  lines.push('  pronunciation: romanization,');
  lines.push('  exampleTarget: exampleTarget || targetText,');
  lines.push('  exampleNative: exampleNative || nativeText,');
  lines.push('  korean: targetText,');
  lines.push('  english: nativeText,');
  lines.push('  example: exampleTarget || targetText,');
  lines.push('  exampleEnglish: exampleNative || nativeText,');
  lines.push(`  ...(breakdown ? { breakdown: breakdown.map(b => ({ target: b.korean || b.target, native: b.english || b.native, korean: b.korean || b.target, english: b.english || b.native })) } : {}),`);
  lines.push('});');
  lines.push('');

  const allVarNames = [];

  for (const cat of LESSON_CATEGORIES) {
    const catCards = groups[cat];
    const counts = TARGET_COUNTS[cat];
    const titles = TITLES[cat];

    // Split cards into difficulty buckets
    const beginnerCount = Math.min(counts.beginner, catCards.length);
    const intermediateStart = beginnerCount;
    const intermediateCount = Math.min(counts.intermediate, catCards.length - intermediateStart);
    const advancedStart = intermediateStart + intermediateCount;
    const advancedCount = Math.min(counts.advanced, catCards.length - advancedStart);
    const sentencesStart = advancedStart + advancedCount;
    const sentencesCount = Math.min(counts.sentences, catCards.length - sentencesStart);

    const difficulties = [
      { diff: 'beginner', start: 0, count: beginnerCount, isSentence: false },
      { diff: 'intermediate', start: intermediateStart, count: intermediateCount, isSentence: false },
      { diff: 'advanced', start: advancedStart, count: advancedCount, isSentence: false },
      { diff: 'sentences', start: sentencesStart, count: sentencesCount, isSentence: true },
    ];

    for (const { diff, start, count, isSentence } of difficulties) {
      const varName = VAR_NAMES[cat][diff];
      allVarNames.push(varName);
      const title = titles[diff];
      const items = catCards.slice(start, start + count);

      lines.push(`// ============================================================`);
      lines.push(`// ${cat.toUpperCase()} - ${title} (${diff})`);
      lines.push(`// ============================================================`);
      lines.push(`const ${varName} = {`);
      lines.push(`  title: '${escapeStr(title)}',`);
      lines.push(`  category: '${cat}',`);
      lines.push(`  difficulty: '${diff}',`);
      lines.push(`  targetLang: '${lang}',`);
      lines.push('  content: [');

      for (const card of items) {
        const targetText = card[lang] || '';
        const english = card.english || '';
        // For non-Latin languages, use romanization from the Korean field as fallback
        // (not ideal but better than empty for display purposes)
        const romanization = needsRoman ? (card.romanization || '') : '';

        if (!targetText) continue;

        if (isSentence) {
          lines.push(genSentenceItem(targetText, romanization, english));
        } else {
          lines.push(genWordItem(targetText, romanization, english));
        }
      }

      lines.push('  ],');
      lines.push('};');
      lines.push('');
    }
  }

  // Export
  lines.push(`module.exports = { ${allVarNames.join(', ')} };`);
  lines.push('');

  const outPath = path.join(__dirname, '..', 'lessonData', `${lang}.js`);
  fs.writeFileSync(outPath, lines.join('\n'));

  // Verify
  try {
    delete require.cache[require.resolve(outPath)];
    const data = require(outPath);
    const exportCount = Object.keys(data).length;
    const totalItems = Object.values(data).reduce((sum, lesson) => sum + (lesson.content ? lesson.content.length : 0), 0);
    console.log(`${lang}: ${exportCount} lessons, ${totalItems} total items`);
  } catch (e) {
    console.error(`${lang}: ERROR - ${e.message}`);
  }
}

// Generate all language files
console.log('Generating lesson data for all languages...\n');
for (const lang of LANGS) {
  generateLangFile(lang);
}
console.log('\nDone!');
