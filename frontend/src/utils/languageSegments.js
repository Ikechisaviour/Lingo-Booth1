const SCRIPT_PATTERNS = {
  ko: /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/g,
  ja: /[\u3040-\u30ff]/g,
  zh: /[\u3400-\u9fff]/g,
  ar: /[\u0600-\u06ff]/g,
  he: /[\u0590-\u05ff]/g,
  hi: /[\u0900-\u097f]/g,
  bn: /[\u0980-\u09ff]/g,
  ta: /[\u0b80-\u0bff]/g,
  ru: /[\u0400-\u04ff]/g,
};

const LATIN_LANGUAGES = new Set(['en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'id', 'ms', 'fil', 'tr']);

function normalizeLanguage(language) {
  return String(language || '').trim().toLowerCase().split('-')[0];
}

function scriptCount(text, language) {
  const pattern = SCRIPT_PATTERNS[normalizeLanguage(language)];
  if (!pattern) return 0;
  return (String(text || '').match(pattern) || []).length;
}

function hasScriptLanguage(language) {
  return !!SCRIPT_PATTERNS[normalizeLanguage(language)];
}

function speakerLabelFromMarker(marker) {
  const normalized = String(marker || '').trim().toUpperCase();
  if (normalized === 'A') return 'Person A';
  if (normalized === 'B') return 'Person B';
  return '';
}

function normalizeSpeakerLabel(speaker) {
  const value = String(speaker || '').trim();
  if (!value) return '';
  const markerMatch = value.match(/^(?:person|speaker)?\s*([AB])\.?$/i);
  if (markerMatch?.[1]) return speakerLabelFromMarker(markerMatch[1]);
  return value.slice(0, 40);
}

function extractSpeakerPrefix(text) {
  const value = String(text || '').trim();
  const match = value.match(/^(?:(?:person|speaker)\s*)?([AB])\s*[:.)-]\s*(.+)$/i);
  if (!match?.[1] || !match?.[2]) return { speaker: '', text: value };
  return {
    speaker: speakerLabelFromMarker(match[1]),
    text: match[2].trim(),
  };
}

function stripExamplePrefix(text) {
  return String(text || '')
    .trim()
    .replace(/^(?:example|sample)\s*[:.)-]\s*/i, '')
    .trim();
}

function hasExamplePrefix(text) {
  return /^(?:example|sample)\s*[:.)-]\s*/i.test(String(text || '').trim());
}

function isSilentPart(part = {}) {
  const text = String(part?.text || '').trim();
  const structuralMeta = part?.type === 'meta'
    && /^(example|sample|note|tip)$/i.test(text);
  return part?.speak === false || part?.type === 'romanization' || structuralMeta;
}

function withSpeaker(part) {
  const examplePrefixed = hasExamplePrefix(part?.text);
  const extracted = extractSpeakerPrefix(stripExamplePrefix(part?.text));
  const speaker = extracted.speaker || normalizeSpeakerLabel(part?.speaker);
  return {
    ...part,
    text: extracted.text,
    section: part?.section || (examplePrefixed ? 'example' : ''),
    ...(speaker ? { speaker } : {}),
  };
}

function inferLanguage(text, targetLanguage, nativeLanguage, fallbackLanguage) {
  const target = normalizeLanguage(targetLanguage) || 'ko';
  const native = normalizeLanguage(nativeLanguage) || 'en';
  const fallback = normalizeLanguage(fallbackLanguage);
  const value = String(text || '');

  if (scriptCount(value, target) > 0) return target;
  if (scriptCount(value, native) > 0) return native;
  if (/[A-Za-z]/.test(value)) {
    if (fallback && !hasScriptLanguage(fallback) && (fallback === target || fallback === native)) return fallback;
    if (!hasScriptLanguage(native) && LATIN_LANGUAGES.has(native)) return native;
    if (!hasScriptLanguage(target) && LATIN_LANGUAGES.has(target)) return target;
  }
  if (fallback === target || fallback === native) return fallback;
  return target;
}

function latinLanguageForSpeech(targetLanguage, nativeLanguage, fallbackLanguage) {
  const target = normalizeLanguage(targetLanguage) || 'ko';
  const native = normalizeLanguage(nativeLanguage) || 'en';
  const fallback = normalizeLanguage(fallbackLanguage);

  if (fallback && !hasScriptLanguage(fallback) && (fallback === target || fallback === native)) return fallback;
  if (!hasScriptLanguage(native) && LATIN_LANGUAGES.has(native)) return native;
  if (!hasScriptLanguage(target) && LATIN_LANGUAGES.has(target)) return target;
  return fallback || native || target;
}

function cleanScriptSpeechChunk(text) {
  return String(text || '')
    .replace(/["'`“”‘’]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanLatinSpeechChunk(text) {
  return String(text || '')
    .replace(/^[("'`“”‘’]+|[)"'`“”‘’]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function isInlineLatinTerm(text, before, after, scriptLanguage) {
  const cleaned = cleanLatinSpeechChunk(text);
  const wordCount = cleaned.split(/\s+/).filter(Boolean).length;
  const letterCount = (cleaned.match(/[A-Za-z0-9]/g) || []).length;

  return wordCount <= 2
    && letterCount <= 24
    && scriptCount(before, scriptLanguage) > 0
    && scriptCount(after, scriptLanguage) > 0;
}

export function speechChunksForPart(part = {}, targetLanguage, nativeLanguage, fallbackLanguage) {
  const text = String(part?.text || '').trim();
  if (!text) return [];

  const target = normalizeLanguage(targetLanguage) || 'ko';
  const native = normalizeLanguage(nativeLanguage) || 'en';
  const fallback = normalizeLanguage(part?.language || fallbackLanguage);
  const language = inferLanguage(text, target, native, fallback);
  const basePart = {
    language,
    text,
    speaker: part?.speaker || '',
    type: part?.type,
    speak: part?.speak,
  };
  const scriptLanguage = [target, native]
    .find(code => hasScriptLanguage(code) && scriptCount(text, code) > 0);
  const latinLanguage = latinLanguageForSpeech(target, native, fallback);

  if (!scriptLanguage || !latinLanguage || !/[A-Za-z]/.test(text)) {
    return [basePart];
  }

  const chunks = [];
  const latinRunPattern = /[A-Za-z][A-Za-z0-9'’]*(?:[-.][A-Za-z0-9'’]+)*(?:\s+[A-Za-z][A-Za-z0-9'’]*(?:[-.][A-Za-z0-9'’]+)*)*/g;
  let cursor = 0;
  let match;

  const pushChunk = (chunkLanguage, value, isLatin = false) => {
    const cleaned = isLatin ? cleanLatinSpeechChunk(value) : cleanScriptSpeechChunk(value);
    if (!cleaned) return;
    chunks.push({
      ...basePart,
      language: chunkLanguage,
      text: cleaned,
    });
  };

  while ((match = latinRunPattern.exec(text)) !== null) {
    const before = text.slice(0, match.index);
    const after = text.slice(match.index + match[0].length);
    const embeddedTermLanguage = isInlineLatinTerm(match[0], before, after, scriptLanguage)
      ? scriptLanguage
      : latinLanguage;

    pushChunk(scriptLanguage, text.slice(cursor, match.index));
    pushChunk(embeddedTermLanguage, match[0], true);
    cursor = match.index + match[0].length;
  }

  pushChunk(scriptLanguage, text.slice(cursor));
  return chunks.length ? chunks : [basePart];
}

function splitMixedLine(line, targetLanguage, nativeLanguage, fallbackLanguage) {
  const value = String(line || '').trim();
  if (!value) return [];

  const target = normalizeLanguage(targetLanguage) || 'ko';
  const native = normalizeLanguage(nativeLanguage) || 'en';

  if (scriptCount(value, target) > 0) {
    const dashIndex = value.search(/\s[-\u2013\u2014]\s/);
    const beforeDash = dashIndex >= 0 ? value.slice(0, dashIndex).trim() : value;
    const afterDash = dashIndex >= 0 ? value.slice(dashIndex + 3).trim() : '';
    const parenMatch = beforeDash.match(/^(.*?)(?:\s*\(([^)]*[A-Za-z][^)]*)\))\s*$/);
    const parts = [];
    const targetText = parenMatch ? parenMatch[1].trim() : beforeDash.trim();
    const romanization = parenMatch ? parenMatch[2].trim() : '';
    const targetPart = targetText
      ? withSpeaker({ text: targetText, language: target, type: 'target', speak: true })
      : null;

    if (targetPart) parts.push(targetPart);
    if (romanization) {
      parts.push(withSpeaker({
        text: romanization,
        language: target,
        type: 'romanization',
        speak: false,
        speaker: targetPart?.speaker,
      }));
    }
    if (afterDash) {
      parts.push(withSpeaker({
        text: afterDash,
        language: native,
        type: 'native',
        speak: true,
        speaker: targetPart?.speaker,
      }));
    }

    if (parts.length) return parts;
  }

  return [withSpeaker({ text: value, language: inferLanguage(value, target, native, fallbackLanguage) })];
}

export function languageRole(languageOrPart, targetLanguage, nativeLanguage) {
  if (languageOrPart && typeof languageOrPart === 'object') {
    if (languageOrPart.type === 'romanization') return 'romanization';
    if (languageOrPart.type === 'meta') return 'meta';
  }
  const code = normalizeLanguage(
    languageOrPart && typeof languageOrPart === 'object'
      ? languageOrPart.language
      : languageOrPart
  );
  if (code && code === normalizeLanguage(targetLanguage)) return 'target';
  if (code && code === normalizeLanguage(nativeLanguage)) return 'native';
  return 'other';
}

export function languageLabel(languageOrPart) {
  if (languageOrPart && typeof languageOrPart === 'object') {
    if (languageOrPart.type === 'romanization') return 'PRON';
    if (languageOrPart.type === 'meta') return 'NOTE';
    return normalizeLanguage(languageOrPart.language).toUpperCase();
  }
  return normalizeLanguage(languageOrPart).toUpperCase();
}

export function splitLanguageSegments(text, targetLanguage, nativeLanguage, fallbackLanguage) {
  return String(text || '')
    .split(/\n+|\s+[/|]\s+/u)
    .flatMap(line => splitMixedLine(line, targetLanguage, nativeLanguage, fallbackLanguage))
    .filter(part => part.text);
}

export function displayPartsForMessage(message, targetLanguage, nativeLanguage) {
  const displayParts = Array.isArray(message?.displayParts)
    ? message.displayParts
      .map((part) => {
        const text = String(part?.text || '').trim();
        return withSpeaker({
          type: part?.type || '',
          language: inferLanguage(text, targetLanguage, nativeLanguage, part?.language || message?.language),
          text,
          speaker: part?.speaker,
          section: part?.section || '',
          speak: part?.speak !== false,
        });
      })
      .filter(part => part.text)
    : [];

  if (displayParts.length) return displayParts;

  return splitLanguageSegments(
    String(message?.content || ''),
    targetLanguage,
    nativeLanguage,
    message?.language
  ).map(part => ({
    ...part,
    type: languageRole(part, targetLanguage, nativeLanguage),
    speak: true,
  }));
}

export function spokenPartsForMessage(message, targetLanguage, nativeLanguage) {
  const content = String(message?.content || '').trim();
  if (Array.isArray(message?.displayParts) && message.displayParts.length) {
    return displayPartsForMessage(message, targetLanguage, nativeLanguage)
      .filter(part => !isSilentPart(part))
      .flatMap(part => speechChunksForPart(part, targetLanguage, nativeLanguage, message?.language));
  }

  const parts = Array.isArray(message?.speechParts)
    ? message.speechParts
      .flatMap(part => speechChunksForPart({
        language: normalizeLanguage(part?.language || message?.language),
        text: String(part?.text || '').trim(),
        speaker: part?.speaker || '',
      }, targetLanguage, nativeLanguage, message?.language))
      .filter(part => part.text)
    : [];

  if (!content) return parts;
  if (!parts.length) {
    return splitLanguageSegments(content, targetLanguage, nativeLanguage, message?.language)
      .flatMap(part => speechChunksForPart(part, targetLanguage, nativeLanguage, message?.language));
  }

  const partText = parts.map(part => part.text).join(' ');
  const target = normalizeLanguage(targetLanguage) || 'ko';
  const native = normalizeLanguage(nativeLanguage) || 'en';
  const missingTarget = hasScriptLanguage(target) && scriptCount(content, target) > 0 && scriptCount(partText, target) === 0;
  const missingNative = hasScriptLanguage(native) && scriptCount(content, native) > 0 && scriptCount(partText, native) === 0;
  const tooShort = partText.length < Math.max(12, content.length * 0.45);

  if (missingTarget || missingNative || tooShort) {
    return splitLanguageSegments(content, targetLanguage, nativeLanguage, message?.language)
      .flatMap(part => speechChunksForPart(part, targetLanguage, nativeLanguage, message?.language));
  }

  return parts;
}
