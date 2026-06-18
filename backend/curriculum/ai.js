/**
 * Curriculum v2 AI helpers.
 *
 * Two narrowly-scoped LLM calls:
 *   - evaluateProduction()    grades a learner-produced sentence against a pattern.
 *   - evaluatePronunciation() compares an ASR transcript against a target Korean phrase.
 *
 * Both return a structured JSON object the frontend can render directly. Both
 * fail gracefully if DEEPSEEK_API_KEY is missing or the provider is unreachable
 * so the pilot UI can degrade to no-AI mode without crashing.
 *
 * The general conversation pipeline in utils/aiConversation.js is intentionally
 * NOT reused — it carries class-lesson scaffolding, language-pair routing, and
 * token-quota machinery that don't apply to a focused structured-eval call.
 */

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const PROVIDER_TIMEOUT_MS = 15000;

function isAiAvailable() {
  return Boolean(process.env.DEEPSEEK_API_KEY);
}

async function callDeepSeekJson({ system, user, maxTokens = 300, temperature = 0.2 }) {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    const err = new Error('AI not configured');
    err.code = 'AI_NOT_CONFIGURED';
    throw err;
  }
  const model = process.env.DEEPSEEK_CURRICULUM_MODEL
    || process.env.DEEPSEEK_CONVERSATION_MODEL
    || process.env.DEEPSEEK_MODEL
    || 'deepseek-chat';

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), PROVIDER_TIMEOUT_MS);

  try {
    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: user },
        ],
        max_tokens: maxTokens,
        temperature,
        response_format: { type: 'json_object' },
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`DeepSeek ${response.status}: ${detail.slice(0, 200)}`);
    }
    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content || '{}';
    return safeParseJson(raw);
  } finally {
    clearTimeout(timer);
  }
}

function safeParseJson(s) {
  try {
    return JSON.parse(s);
  } catch {
    // Some providers wrap JSON in markdown. Strip and retry.
    const stripped = String(s).replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '');
    try {
      return JSON.parse(stripped);
    } catch {
      return null;
    }
  }
}

/**
 * Grade a learner's production attempt against the pattern they're practicing.
 *
 * @param {Object} args
 * @param {string} args.patternTarget   e.g. "{filler}-아/어 본 적이 있어요?"
 * @param {string} args.patternGloss    e.g. "Have you ever V-ed?"
 * @param {string} args.promptTemplate  e.g. "Ask if I have ever eaten {filler}."
 * @param {Object} args.filler          { target: '김치', native: 'kimchi' }
 * @param {string} args.learnerText     learner's Korean sentence
 * @returns {Promise<{correct:boolean, feedback:string, ideal:string} | null>}
 */
async function evaluateProduction({ patternTarget, patternGloss, promptTemplate, filler, learnerText }) {
  if (!isAiAvailable()) return null;

  const filledPrompt = String(promptTemplate || '').replace('{filler}', filler?.native || filler?.target || '');

  const system = [
    'You are a Korean language tutor evaluating a learner\'s short production attempt.',
    'The learner is a beginner. Be charitable on small spelling/spacing slips; flag grammar and structure mistakes.',
    'Respond ONLY with valid minified JSON. No prose, no markdown, no code fences.',
    'JSON shape: { "correct": boolean, "feedback": string, "ideal": string }',
    '- correct: true only if the learner\'s sentence is grammatically valid AND uses the requested pattern AND mentions the requested filler.',
    '- feedback: at most TWO short sentences in English. Lead with what the learner did right; then ONE specific fix if needed.',
    '- ideal: the exact Korean sentence you would expect, in polite (-요) form.',
  ].join(' ');

  const user = [
    `Pattern: ${patternTarget}`,
    `Pattern meaning: ${patternGloss}`,
    `Task given to learner: "${filledPrompt}"`,
    `Filler the learner should use: ${filler?.target || ''} (${filler?.native || ''})`,
    `Learner's response: "${learnerText}"`,
  ].join('\n');

  const parsed = await callDeepSeekJson({ system, user, maxTokens: 220 });
  if (!parsed || typeof parsed.correct !== 'boolean') return null;
  return {
    correct: parsed.correct,
    feedback: String(parsed.feedback || '').slice(0, 400),
    ideal: String(parsed.ideal || '').slice(0, 200),
  };
}

/**
 * Score an ASR transcript against the target Korean phrase.
 *
 * @param {Object} args
 * @param {string} args.target      target Korean phrase
 * @param {string} args.transcript  ASR-transcribed learner attempt
 * @returns {Promise<{accuracy:'high'|'partial'|'low', feedback:string} | null>}
 */
async function evaluatePronunciation({ target, transcript }) {
  if (!isAiAvailable()) return null;

  const system = [
    'You are a Korean pronunciation coach. The learner spoke aloud and a browser ASR transcribed it.',
    'ASR is imperfect for Korean — small one-character differences are often ASR error, not learner error. Be charitable.',
    'Respond ONLY with valid minified JSON. No prose, no markdown.',
    'JSON shape: { "accuracy": "high" | "partial" | "low", "feedback": string }',
    '- accuracy: "high" if the transcript is essentially correct (allow minor ASR drift); "partial" if some syllables match; "low" if very different.',
    '- feedback: ONE short English sentence pointing at what was close and one specific thing to attend to (e.g. a tense consonant, a final ㄹ).',
  ].join(' ');

  const user = [
    `Target Korean: "${target}"`,
    `ASR transcript: "${transcript || '(empty)'}"`,
  ].join('\n');

  const parsed = await callDeepSeekJson({ system, user, maxTokens: 150 });
  if (!parsed || !['high', 'partial', 'low'].includes(parsed.accuracy)) return null;
  return {
    accuracy: parsed.accuracy,
    feedback: String(parsed.feedback || '').slice(0, 300),
  };
}

module.exports = { evaluateProduction, evaluatePronunciation, isAiAvailable };
