/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const {
  contextualCoreNotes,
} = require('../textbookLessons/shared/richCurriculumFactory');

const ROOT = path.join(__dirname, '..', 'textbookLessons');
const LANGS = ['ko', 'en', 'ja', 'de', 'es', 'fr', 'ms', 'ar', 'he', 'hi', 'it', 'fil', 'id', 'pt', 'ru', 'tr', 'nl', 'ta', 'bn'];

const oldPrefixes = [
  'Model use:',
  'Usage focus:',
  'Contrast check:',
  'Recall prompt:',
  'Repair prompt:',
  'Transfer prompt:',
  'Collocation check:',
  'Listening cue:',
  'Writing check:',
  'Register check:',
];

const supportRewrites = {
  'Read this connected model as one piece, then identify how the lesson vocabulary and grammar cooperate inside it.':
    (entry) => `Read "${entry.exampleTarget}" as one connected model. Notice how the lesson vocabulary and grammar cooperate inside it instead of appearing as isolated flashcards.`,
  'This short exchange is meant to sound like real interaction rather than a list of isolated sentences.':
    (entry) => `Hear "${entry.exampleTarget}" as interaction, not as a sentence list. Follow the exchange while keeping the lesson's register and grammar intact.`,
  'Use the lesson pattern in your own writing so the form becomes available outside the model sentence.':
    (entry) => `Write your own version after studying "${entry.exampleTarget}". Keep the same grammatical job, then change the detail that makes the sentence true for you.`,
  'Hear the lesson language inside a short exchange so the learner follows the message rather than isolated flashcards.':
    (entry) => `Hear "${entry.exampleTarget}" inside a short exchange so the learner follows the message rather than isolated flashcards.`,
};

const contextualSupportPatterns = [
  {
    match: /^Keep .+ clear enough/i,
    rewrite: (entry) => `${entry.nativeText} In this lesson, listen especially while saying "${entry.exampleTarget}".`,
  },
  {
    match: /^Notice .+ how this .+ is (actually )?used/i,
    rewrite: (entry) => `${entry.nativeText} Use "${entry.exampleTarget}" as the social comparison point for this lesson.`,
  },
  {
    match: /^Watch for literal-translation mistakes/i,
    rewrite: (entry) => `${entry.nativeText} Begin by checking "${entry.exampleTarget}" against the model.`,
  },
  {
    match: /^Check whether the (setting|situation) calls for/i,
    rewrite: (entry) => `${entry.nativeText} Compare the social fit of "${entry.exampleTarget}" before reusing it elsewhere.`,
  },
  {
    match: /^Say the idea as one connected/i,
    rewrite: (entry) => `${entry.nativeText} Aim to carry "${entry.exampleTarget}" as one thought.`,
  },
  {
    match: /^Move the lesson pattern/i,
    rewrite: (entry) => `${entry.nativeText} Start from "${entry.exampleTarget}" and move it into your own life.`,
  },
  {
    match: /^Retrieve the key form from memory/i,
    rewrite: (entry) => `${entry.nativeText} Begin with "${entry.exampleTarget}" before looking back.`,
  },
  {
    match: /^Extend the answer with one cause/i,
    rewrite: (entry) => `${entry.nativeText} Extend from "${entry.exampleTarget}" rather than restarting from a blank sentence.`,
  },
  {
    match: /^Compare the central form/i,
    rewrite: (entry) => `${entry.nativeText} Use "${entry.exampleTarget}" as the comparison line.`,
  },
  {
    match: /^Repair the one /i,
    rewrite: (entry) => `${entry.nativeText} Use "${entry.exampleTarget}" as the repair line.`,
  },
  {
    match: /^Change one participant/i,
    rewrite: (entry) => `${entry.nativeText} Begin from "${entry.exampleTarget}".`,
  },
  {
    match: /^Build the sentence in layers/i,
    rewrite: (entry) => `${entry.nativeText} Rebuild "${entry.exampleTarget}" one layer at a time.`,
  },
  {
    match: /^Choose the better of two nearby forms/i,
    rewrite: (entry) => `${entry.nativeText} Use "${entry.exampleTarget}" as the deciding example.`,
  },
  {
    match: /^Name the one feature from this lesson/i,
    rewrite: (entry) => `${entry.nativeText} Finish by testing that idea against "${entry.exampleTarget}".`,
  },
  {
    match: /^Listen for the exact (particle, ending, mora, or omission|syllable, ending, article, or pronoun) that changes the meaning of the model\.$/i,
    rewrite: (entry) => `Listen inside "${entry.exampleTarget}" for the exact sound detail that changes the meaning of the model.`,
  },
  {
    match: /^Answer once with the shortest correct .+ form, then answer again with one useful extension\.$/i,
    rewrite: (entry) => `Answer first with the shortest correct form that still fits "${entry.exampleTarget}", then add one useful extension.`,
  },
  {
    match: /^Turn the model into a fuller answer by adding cause, time, or contrast without changing the core grammar\.$/i,
    rewrite: (entry) => `Turn "${entry.exampleTarget}" into a fuller answer by adding cause, time, or contrast without changing the core grammar.`,
  },
  {
    match: /^Turn the model into a fuller answer by adding cause, time, contrast, or social detail without losing the core grammar\.$/i,
    rewrite: (entry) => `Turn "${entry.exampleTarget}" into a fuller answer by adding cause, time, contrast, or social detail without losing the core grammar.`,
  },
  {
    match: /^Contrast the lesson form with the nearest form a learner might confuse it with and explain what changes\.$/i,
    rewrite: (entry) => `Compare "${entry.exampleTarget}" with the nearest form a learner might confuse it with and explain what changes.`,
  },
  {
    match: /^Copy the target sentence once, then rewrite it from memory with attention to (particles, kana, kanji, and endings|accents, agreement, and pronoun placement)\.$/i,
    rewrite: (entry) => `Copy "${entry.exampleTarget}" once, then rewrite it from memory while preserving the lesson's form details.`,
  },
  {
    match: /^Move the lesson language into a new setting so the learner proves transfer rather than repetition\.$/i,
    rewrite: (entry) => `Move "${entry.exampleTarget}" into a new setting so the learner proves transfer rather than repetition.`,
  },
  {
    match: /^Name one error you might make in this lesson and repair it before looking back at the model\.$/i,
    rewrite: (entry) => `Name one error you might make while producing "${entry.exampleTarget}", then repair it before looking back at the model.`,
  },
  {
    match: /^Speak for twenty seconds using at least two lesson forms in one connected .+ answer\.$/i,
    rewrite: (entry) => `Speak for twenty seconds by linking at least two lesson forms around "${entry.exampleTarget}" in one connected answer.`,
  },
  {
    match: /^Combine forms from two earlier units in one sentence so review means recombination, not simple repetition\.$/i,
    rewrite: (entry) => `Combine two reviewed forms inside "${entry.exampleTarget}" so review means recombination, not simple repetition.`,
  },
  {
    match: /^Explain why two earlier patterns are not interchangeable even when both seem possible at first glance\.$/i,
    rewrite: (entry) => `Explain why the two reviewed patterns inside "${entry.exampleTarget}" are not interchangeable even when both seem possible at first glance.`,
  },
  {
    match: /^Recall one form from each reviewed unit without looking, then check the model only after retrieval\.$/i,
    rewrite: (entry) => `Recall one form from each reviewed unit before checking "${entry.exampleTarget}" against the model.`,
  },
  {
    match: /^Handle one longer scene that forces vocabulary from several previous lessons to appear together\.$/i,
    rewrite: (entry) => `Handle one longer scene around "${entry.exampleTarget}" so vocabulary from several earlier lessons has to work together.`,
  },
  {
    match: /^List the three mistakes most likely to reappear across the reviewed units and repair each one\.$/i,
    rewrite: (entry) => `List the three mistakes most likely to reappear around "${entry.exampleTarget}" and repair each one.`,
  },
  {
    match: /^Read one connected paragraph and mark where each reviewed unit contributes meaning\.$/i,
    rewrite: (entry) => `Read "${entry.exampleTarget}" as one connected paragraph and mark where each reviewed unit contributes meaning.`,
  },
  {
    match: /^Summarize the reviewed material aloud in one minute using examples rather than naming grammar labels only\.$/i,
    rewrite: (entry) => `Summarize the reviewed material aloud by building examples around "${entry.exampleTarget}" rather than naming grammar labels only.`,
  },
  {
    match: /^Name which reviewed area is still weakest and choose the next lesson that will repair it\.$/i,
    rewrite: (entry) => `Name the reviewed area still weakest after "${entry.exampleTarget}", then choose the next lesson that will repair it.`,
  },
];

const promptKeyByPrefix = {
  'Model use:': 'model',
  'Usage focus:': 'usage',
  'Contrast check:': 'contrast',
  'Recall prompt:': 'recall',
  'Repair prompt:': 'repair',
  'Transfer prompt:': 'transfer',
  'Collocation check:': 'collocation',
  'Listening cue:': 'listening',
  'Writing check:': 'writing',
  'Register check:': 'register',
};

function signature(entry) {
  return `${entry.targetText || ''}::${entry.exampleTarget || ''}`;
}

function lessonFiles(lang) {
  const dir = lang === 'ko' ? ROOT : path.join(ROOT, lang);
  return fs.readdirSync(dir)
    .filter((file) => /^level.*\.js$/.test(file))
    .map((file) => path.join(dir, file));
}

function sourceNotesBySignature(content) {
  const map = new Map();
  content.forEach((entry) => {
    const value = String(entry.nativeText || '');
    if (!value || oldPrefixes.some((prefix) => value.startsWith(prefix)) || supportRewrites[value]) return;
    if (!map.has(signature(entry))) map.set(signature(entry), value);
  });
  return map;
}

function rewriteLesson(lesson) {
  const sourceNotes = sourceNotesBySignature(lesson.content || []);
  let changed = 0;

  lesson.content = (lesson.content || []).map((entry) => {
    const nativeText = String(entry.nativeText || '');
    if (supportRewrites[nativeText]) {
      changed += 1;
      return { ...entry, nativeText: supportRewrites[nativeText](entry), english: supportRewrites[nativeText](entry) };
    }

    const contextualSupport = contextualSupportPatterns.find(({ match }) => match.test(nativeText));
    if (contextualSupport && !nativeText.includes(`"${entry.exampleTarget}"`)) {
      const nextText = contextualSupport.rewrite(entry);
      changed += 1;
      return {
        ...entry,
        nativeText: nextText,
        english: nextText,
      };
    }

    const prefix = oldPrefixes.find((candidate) => nativeText.startsWith(candidate));
    if (!prefix) return entry;

    const note = sourceNotes.get(signature(entry)) || entry.exampleNative || entry.nativeText;
    const prompts = contextualCoreNotes({
      label: entry.targetText,
      note,
      example: entry.exampleTarget || entry.targetText,
      exampleNote: entry.exampleNative || note,
    });
    const nextText = prompts[promptKeyByPrefix[prefix]];
    changed += 1;
    return {
      ...entry,
      nativeText: nextText,
      english: nextText,
    };
  });

  return changed;
}

let totalChanged = 0;
LANGS.forEach((lang) => {
  let changedForLang = 0;
  lessonFiles(lang).forEach((file) => {
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    const changed = rewriteLesson(lesson);
    if (!changed) return;
    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
    changedForLang += changed;
  });
  totalChanged += changedForLang;
  console.log(`${lang}: refreshed ${changedForLang} generated scaffold entries.`);
});

console.log(`Refreshed ${totalChanged} generated scaffold entries across ${LANGS.length} curricula.`);
