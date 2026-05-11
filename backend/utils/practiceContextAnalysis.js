const STOPWORDS = new Set([
  'a', 'an', 'and', 'are', 'as', 'at', 'be', 'been', 'but', 'by', 'can', 'could',
  'did', 'do', 'does', 'for', 'from', 'had', 'has', 'have', 'how', 'i', 'if',
  'in', 'is', 'it', 'just', 'like', 'me', 'my', 'of', 'on', 'or', 'our', 'so',
  'that', 'the', 'their', 'there', 'they', 'this', 'to', 'was', 'we', 'were',
  'what', 'when', 'where', 'which', 'who', 'will', 'with', 'would', 'you',
  'your', 'yeah', 'yes', 'no', 'ok', 'okay',
]);

const ENVIRONMENT_KEYWORDS = [
  { tag: 'food and cafe', words: ['coffee', 'tea', 'cafe', 'restaurant', 'order', 'menu', 'eat', 'drink', 'lunch', 'dinner', 'breakfast', 'cook', 'kitchen'] },
  { tag: 'work and meetings', words: ['meeting', 'client', 'office', 'project', 'deadline', 'manager', 'email', 'report', 'presentation', 'team'] },
  { tag: 'school and study', words: ['class', 'teacher', 'student', 'homework', 'exam', 'lecture', 'assignment', 'study', 'book'] },
  { tag: 'travel and directions', words: ['bus', 'train', 'taxi', 'station', 'airport', 'street', 'turn', 'left', 'right', 'map', 'hotel'] },
  { tag: 'shopping and money', words: ['buy', 'price', 'cost', 'cash', 'card', 'shop', 'store', 'discount', 'receipt', 'size'] },
  { tag: 'home and family', words: ['home', 'family', 'mother', 'father', 'child', 'room', 'clean', 'house', 'apartment'] },
  { tag: 'health and appointments', words: ['doctor', 'hospital', 'medicine', 'pain', 'appointment', 'pharmacy', 'sick', 'health'] },
];

function cleanText(value = '', max = 180) {
  return String(value || '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function sentenceSplit(text) {
  return cleanText(text, 6000)
    .split(/(?<=[.!?。！？])\s+|\n+/)
    .map((sentence) => cleanText(sentence, 260))
    .filter((sentence) => sentence.length >= 8);
}

function wordTokens(text) {
  return String(text || '')
    .toLowerCase()
    .match(/[\p{L}\p{N}'-]{2,}/gu) || [];
}

function detectLanguageForText(text, nativeLanguage = 'en', targetLanguage = 'ko') {
  if (/[\uac00-\ud7af]/.test(text)) return 'ko';
  if (/[\u3040-\u30ff]/.test(text)) return 'ja';
  if (/[\u4e00-\u9fff]/.test(text)) return 'zh';
  if (/[\u0900-\u097f]/.test(text)) return 'hi';
  if (/[\u0980-\u09ff]/.test(text)) return 'bn';
  if (/[\u0600-\u06ff]/.test(text)) return 'ar';
  return nativeLanguage || targetLanguage || 'en';
}

function topVocabulary(text, nativeLanguage, targetLanguage) {
  const counts = new Map();
  for (const token of wordTokens(text)) {
    const normalized = token.replace(/^['-]+|['-]+$/g, '');
    if (!normalized || STOPWORDS.has(normalized) || normalized.length < 3) continue;
    counts.set(normalized, (counts.get(normalized) || 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 12)
    .map(([textValue, count]) => ({
      text: textValue,
      language: detectLanguageForText(textValue, nativeLanguage, targetLanguage),
      note: count > 1 ? `Heard ${count} times` : 'Useful word from this session',
      context: '',
    }));
}

function usefulPhrases(text, nativeLanguage, targetLanguage) {
  return sentenceSplit(text)
    .filter((sentence) => {
      const length = wordTokens(sentence).length;
      return length >= 4 && length <= 18;
    })
    .slice(0, 8)
    .map((sentence) => ({
      text: sentence,
      language: detectLanguageForText(sentence, nativeLanguage, targetLanguage),
      note: 'Practice saying this naturally',
      context: '',
    }));
}

function environmentTags(text) {
  const tokens = new Set(wordTokens(text));
  return ENVIRONMENT_KEYWORDS
    .map((entry) => ({
      tag: entry.tag,
      matches: entry.words.filter((word) => tokens.has(word)).length,
    }))
    .filter((entry) => entry.matches > 0)
    .sort((a, b) => b.matches - a.matches)
    .slice(0, 5)
    .map((entry) => entry.tag);
}

function topicsFrom(text, tags) {
  const sentences = sentenceSplit(text);
  const topicItems = tags.map((tag) => ({
    text: tag,
    language: 'topic',
    note: 'Common setting from this session',
    context: '',
  }));

  const questionTopics = sentences
    .filter((sentence) => /[?？]$/.test(sentence) || /\b(how|what|where|when|why|can|could|would|do you|did you)\b/i.test(sentence))
    .slice(0, 4)
    .map((sentence) => ({
      text: sentence,
      language: 'topic',
      note: 'Question pattern to practice',
      context: '',
    }));

  return [...topicItems, ...questionTopics].slice(0, 8);
}

function goalsFrom(tags, phrases) {
  const goals = [];
  if (tags.length) goals.push(`Practice ${tags[0]} conversations earlier and more often.`);
  if (phrases.length) goals.push('Turn real phrases from daily life into short speaking drills.');
  goals.push('Review saved context before class, quiz, and conversation practice.');
  return goals.slice(0, 4);
}

function analyzePracticeContext({ transcript, nativeLanguage = 'en', targetLanguage = 'ko' }) {
  const cleaned = cleanText(transcript, 6000);
  const words = wordTokens(cleaned);
  const tags = environmentTags(cleaned);
  const vocabulary = topVocabulary(cleaned, nativeLanguage, targetLanguage);
  const phrases = usefulPhrases(cleaned, nativeLanguage, targetLanguage);
  const topics = topicsFrom(cleaned, tags);
  const summaryParts = [];
  if (tags.length) summaryParts.push(`Likely settings: ${tags.join(', ')}.`);
  if (vocabulary.length) summaryParts.push(`Useful words: ${vocabulary.slice(0, 6).map(item => item.text).join(', ')}.`);
  if (phrases.length) summaryParts.push(`Captured ${phrases.length} phrase${phrases.length === 1 ? '' : 's'} for speaking practice.`);

  return {
    summary: summaryParts.join(' ') || 'A short context practice session was captured. Review and save any useful items.',
    environmentTags: tags,
    topics,
    vocabulary,
    phrases,
    goals: goalsFrom(tags, phrases),
    transcriptWordCount: words.length,
  };
}

function compactPracticeContextBrief(contexts = []) {
  const recent = contexts.slice(0, 5);
  if (!recent.length) return '';

  const tags = [...new Set(recent.flatMap(ctx => ctx.environmentTags || []))].slice(0, 8);
  const words = [...new Set(recent.flatMap(ctx => (ctx.vocabulary || []).map(item => item.text)))].slice(0, 12);
  const phrases = recent.flatMap(ctx => ctx.phrases || []).slice(0, 5).map(item => item.text);

  return [
    'Personal learning context from approved practice sessions:',
    tags.length ? `Frequent settings: ${tags.join(', ')}.` : '',
    words.length ? `Useful words to weave in when relevant: ${words.join(', ')}.` : '',
    phrases.length ? `Real-life phrases to practice or adapt: ${phrases.join(' | ')}.` : '',
    'Use this only to make examples more relevant; do not mention private monitoring.',
  ].filter(Boolean).join('\n');
}

function uniqueByText(items = [], limit = 10) {
  const seen = new Set();
  const result = [];
  for (const item of items) {
    const text = cleanText(item?.text || item?.title || item?.prompt || item, 180);
    const key = text.toLowerCase();
    if (!text || seen.has(key)) continue;
    seen.add(key);
    const base = item && typeof item === 'object' ? item : {};
    result.push({ ...base, text });
    if (result.length >= limit) break;
  }
  return result;
}

function roleplayForTag(tag) {
  const value = String(tag || '').toLowerCase();
  if (value.includes('food') || value.includes('cafe')) {
    return {
      title: 'Practice ordering food or drinks',
      prompt: 'Start a roleplay based on my saved cafe or food context. Help me order, ask questions, and confirm details.',
      situation: 'cafe or restaurant',
    };
  }
  if (value.includes('work') || value.includes('meeting')) {
    return {
      title: 'Practice a workplace conversation',
      prompt: 'Start a roleplay based on my saved workplace context. Help me talk about schedules, tasks, and meetings.',
      situation: 'workplace',
    };
  }
  if (value.includes('school') || value.includes('study')) {
    return {
      title: 'Practice a school conversation',
      prompt: 'Start a roleplay based on my saved school context. Help me ask about class, study, and assignments.',
      situation: 'school',
    };
  }
  if (value.includes('travel') || value.includes('direction')) {
    return {
      title: 'Practice directions and travel',
      prompt: 'Start a roleplay based on my saved travel context. Help me ask for directions and confirm where to go.',
      situation: 'travel',
    };
  }
  if (value.includes('shopping') || value.includes('money')) {
    return {
      title: 'Practice shopping',
      prompt: 'Start a roleplay based on my saved shopping context. Help me ask prices, sizes, and payment questions.',
      situation: 'shopping',
    };
  }
  if (value.includes('health')) {
    return {
      title: 'Practice a health appointment',
      prompt: 'Start a roleplay based on my saved health context. Help me explain symptoms and ask simple questions.',
      situation: 'health',
    };
  }
  return {
    title: `Practice ${tag}`,
    prompt: `Start a roleplay based on my saved context about ${tag}. Keep it practical and useful.`,
    situation: tag,
  };
}

function buildPracticeRecommendations(contexts = []) {
  const recent = contexts.slice(0, 12);
  const tags = uniqueByText(recent.flatMap(ctx => ctx.environmentTags || []), 8).map(item => item.text);
  const topics = uniqueByText(recent.flatMap(ctx => ctx.topics || []), 8);
  const vocabulary = uniqueByText(recent.flatMap(ctx => ctx.vocabulary || []), 16);
  const phrases = uniqueByText(recent.flatMap(ctx => ctx.phrases || []), 12);
  const goals = uniqueByText(recent.flatMap(ctx => ctx.goals || []), 8).map(item => item.text);

  const roleplays = uniqueByText(tags.map(roleplayForTag), 5);
  if (roleplays.length < 3) {
    for (const topic of topics) {
      roleplays.push({
        title: `Practice ${topic.text}`,
        prompt: `Start a roleplay based on my saved context: ${topic.text}. Ask me natural questions and help me answer.`,
        situation: topic.text,
      });
      if (roleplays.length >= 3) break;
    }
  }

  const reviewDrills = [
    ...vocabulary.slice(0, 8).map(item => ({
      type: 'word',
      text: item.text,
      language: item.language || '',
      prompt: `Help me practice the word "${item.text}" with three short examples.`,
    })),
    ...phrases.slice(0, 5).map(item => ({
      type: 'phrase',
      text: item.text,
      language: item.language || '',
      prompt: `Help me say this more naturally and practice it: "${item.text}"`,
    })),
  ].slice(0, 10);

  const classPrompts = [
    tags[0] ? `Teach the next lesson using examples from ${tags[0]}.` : '',
    vocabulary[0] ? `Explain a useful grammar pattern with the word "${vocabulary[0].text}".` : '',
    phrases[0] ? `Break down this saved phrase and teach me how to adapt it: "${phrases[0].text}"` : '',
    goals[0] || '',
  ].filter(Boolean).slice(0, 4);

  return {
    hasContext: recent.length > 0,
    priorityTopics: [
      ...tags.map(tag => ({ text: tag, source: 'environment' })),
      ...topics.map(topic => ({ text: topic.text, source: 'topic', note: topic.note || '' })),
    ].slice(0, 10),
    roleplays: roleplays.slice(0, 5),
    reviewDrills,
    classPrompts,
    goals,
  };
}

module.exports = {
  analyzePracticeContext,
  buildPracticeRecommendations,
  compactPracticeContextBrief,
};
