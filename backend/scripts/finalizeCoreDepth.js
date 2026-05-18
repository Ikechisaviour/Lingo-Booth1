/* eslint-disable no-console */
const fs = require('fs');
const path = require('path');
const { makeCoreDepthProfile } = require('../textbookLessons/shared/coreDepthProfiles');
const { mergeDuplicateContentItems } = require('../textbookLessons/shared/richCurriculumFactory');

const ROOTS = {
  ko: path.join(__dirname, '..', 'textbookLessons'),
  en: path.join(__dirname, '..', 'textbookLessons', 'en'),
};
const TARGET_MIN_CONTENT = 65;

const create = (target, note, example, exampleNote, type, activityIds) => ({
  type,
  activityIds,
  targetText: target,
  romanization: '',
  nativeText: note,
  pronunciation: '',
  exampleTarget: example,
  exampleNative: exampleNote,
  korean: target,
  english: note,
  example,
  exampleEnglish: exampleNote,
});

const q = (value) => `"${String(value || '').trim()}"`;

const normalize = (value) => String(value || '').trim().toLowerCase();

function sectionId(lesson, ...candidates) {
  const activity = (lesson.activities || []).find((entry) => candidates.includes(normalize(entry.section)));
  return activity?.id;
}

function firstAvailable(...values) {
  return values.find(Boolean);
}

function uniqueAdditions(lesson, additions) {
  const seen = new Set((lesson.content || []).map((entry) => `${entry.type}::${entry.targetText}::${entry.nativeText}`));
  return additions.filter((entry) => {
    const signature = `${entry.type}::${entry.targetText}::${entry.nativeText}`;
    if (!entry.activityIds.every(Boolean) || seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}

function depthPack(lesson, profile) {
  const ids = {
    orientation: sectionId(lesson, 'orientation'),
    pronunciation: sectionId(lesson, 'pronunciation'),
    vocabularyI: sectionId(lesson, 'vocabulary i', 'vocabulary', 'patterns overview', 'patterns'),
    vocabularyII: sectionId(lesson, 'vocabulary ii'),
    grammarI: sectionId(lesson, 'grammar i', 'pattern 1', 'adjective', 'verb present'),
    grammarII: sectionId(lesson, 'grammar ii', 'pattern 2', 'comparison', 'irregulars'),
    reading: sectionId(lesson, 'reading', 'reading and speaking'),
    listening: sectionId(lesson, 'listening', 'listening and speaking', 'speaking'),
    writing: sectionId(lesson, 'writing'),
    culture: sectionId(lesson, 'culture note', 'culture recap'),
    task: sectionId(lesson, 'task'),
  };

  const anchors = {
    orientation: firstAvailable(ids.orientation, ids.reading, ids.vocabularyI, ids.task),
    pronunciation: firstAvailable(ids.pronunciation, ids.listening, ids.reading, ids.orientation),
    vocabularyI: firstAvailable(ids.vocabularyI, ids.reading, ids.orientation),
    vocabularyII: firstAvailable(ids.vocabularyII, ids.vocabularyI, ids.reading, ids.orientation),
    grammarI: firstAvailable(ids.grammarI, ids.vocabularyI, ids.reading, ids.orientation),
    grammarII: firstAvailable(ids.grammarII, ids.grammarI, ids.vocabularyI, ids.reading, ids.orientation),
    reading: firstAvailable(ids.reading, ids.vocabularyI, ids.orientation),
    listening: firstAvailable(ids.listening, ids.reading, ids.task, ids.orientation),
    writing: firstAvailable(ids.writing, ids.reading, ids.task, ids.orientation),
    culture: firstAvailable(ids.culture, ids.reading, ids.task, ids.orientation),
    task: firstAvailable(ids.task, ids.writing, ids.listening, ids.reading),
  };

  return [
    create(profile.orientationAnchor, profile.overview, profile.orientationExample, profile.orientationExampleNote, 'note', [anchors.orientation]),
    create(profile.pronunciationAnchor, profile.pronunciationGoal, profile.pronunciationExample, profile.pronunciationExampleNote, 'pronunciation', [anchors.pronunciation]),
    create(profile.readingAnchor, `Read ${q(profile.readingExample)} as one connected model, then identify how the lesson vocabulary and grammar cooperate inside it.`, profile.readingExample, profile.readingExampleNote, 'reading', [anchors.reading]),
    create(profile.listeningAnchor, `Hear ${q(profile.listeningExample)} inside a short exchange so the learner follows the message rather than isolated flashcards.`, profile.listeningExample, profile.listeningExampleNote, 'conversation', [anchors.listening]),
    create(profile.writingAnchor, `Use ${q(profile.writingExample)} as the model for your own writing so the form becomes available outside one memorized sentence.`, profile.writingExample, profile.writingExampleNote, 'writing', [anchors.writing]),
    create(profile.cultureAnchor, profile.cultureGoal, profile.cultureExample, profile.cultureExampleNote, 'culture', [anchors.culture]),
    create(profile.errorAnchor, profile.errorGoal, profile.errorExample, profile.errorExampleNote, 'note', [anchors.grammarII]),
    create(profile.registerAnchor, profile.registerGoal, profile.registerExample, profile.registerExampleNote, 'culture', [anchors.vocabularyII, anchors.culture]),
    create(profile.fluencyAnchor, profile.fluencyGoal, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [anchors.listening, anchors.task]),
    create(profile.transferAnchor, profile.transferGoal, profile.transferExample, profile.transferExampleNote, 'practice', [anchors.writing, anchors.task]),
    create(profile.recallAnchor, profile.recallGoal, profile.recallExample, profile.recallExampleNote, 'practice', [anchors.vocabularyI, anchors.grammarI]),
    create(profile.extensionAnchor, profile.extensionGoal, profile.extensionExample, profile.extensionExampleNote, 'note', [anchors.reading, anchors.writing]),
    create(profile.comparisonAnchor, profile.comparisonGoal, profile.comparisonExample, profile.comparisonExampleNote, 'note', [anchors.grammarII]),
    create(profile.pronunciationRepairAnchor, profile.pronunciationRepairGoal, profile.pronunciationRepairExample, profile.pronunciationRepairExampleNote, 'pronunciation', [anchors.pronunciation]),
    create(profile.dialogueVariationAnchor, profile.dialogueVariationGoal, profile.dialogueVariationExample, profile.dialogueVariationExampleNote, 'conversation', [anchors.listening, anchors.task]),
    create(profile.sentenceBuildingAnchor, profile.sentenceBuildingGoal, profile.sentenceBuildingExample, profile.sentenceBuildingExampleNote, 'practice', [anchors.grammarI, anchors.writing]),
    create(profile.miniQuizAnchor, profile.miniQuizGoal, profile.miniQuizExample, profile.miniQuizExampleNote, 'practice', [anchors.vocabularyII, anchors.grammarII]),
    create(profile.reflectionAnchor, profile.reflectionGoal, profile.reflectionExample, profile.reflectionExampleNote, 'note', [anchors.culture, anchors.task]),
    create(profile.listeningCheckAnchor, profile.listeningCheckGoal, profile.pronunciationExample, profile.pronunciationExampleNote, 'practice', [anchors.pronunciation, anchors.listening]),
    create(profile.shortAnswerAnchor, profile.shortAnswerGoal, profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [anchors.vocabularyI, anchors.task]),
    create(profile.longAnswerAnchor, profile.longAnswerGoal, profile.extensionExample, profile.extensionExampleNote, 'practice', [anchors.writing, anchors.task]),
    create(profile.minimalPairAnchor, profile.minimalPairGoal, profile.secondaryGrammarExample, profile.secondaryGrammarExampleNote, 'practice', [anchors.grammarII]),
    create(profile.rewriteAnchor, profile.rewriteGoal, profile.writingExample, profile.writingExampleNote, 'writing', [anchors.writing]),
    create(profile.newSituationAnchor, profile.newSituationGoal, profile.taskExample, profile.taskExampleNote, 'conversation', [anchors.task]),
    create(profile.selfCorrectionAnchor, profile.selfCorrectionGoal, profile.errorExample, profile.errorExampleNote, 'practice', [anchors.grammarII]),
    create(profile.oralOutputAnchor, profile.oralOutputGoal, profile.fluencyExample, profile.fluencyExampleNote, 'practice', [anchors.listening, anchors.task]),
    create(profile.collocationAnchor, profile.collocationGoal, profile.vocabularyExample, profile.vocabularyExampleNote, 'practice', [anchors.vocabularyI, anchors.reading]),
    create(profile.formCheckAnchor, profile.formCheckGoal, profile.grammarExample, profile.grammarExampleNote, 'practice', [anchors.grammarI, anchors.grammarII]),
    create(profile.repairPromptAnchor, profile.repairPromptGoal, profile.errorExample, profile.errorExampleNote, 'practice', [anchors.grammarII, anchors.writing]),
    create(profile.contextCheckAnchor, profile.contextCheckGoal, profile.registerExample, profile.registerExampleNote, 'practice', [anchors.culture, anchors.task]),
    create(profile.completionCheckAnchor, profile.completionCheckGoal, profile.taskExample, profile.taskExampleNote, 'practice', [anchors.writing, anchors.task]),
    create(profile.taskAnchor, profile.task, profile.taskExample, profile.taskExampleNote, 'conversation', [anchors.task]),
  ];
}

for (const [lang, root] of Object.entries(ROOTS)) {
  const files = fs.readdirSync(root).filter((name) => /^level.*\.js$/.test(name));
  let changed = 0;

  files.forEach((name) => {
    const file = path.join(root, name);
    delete require.cache[require.resolve(file)];
    const lesson = require(file);
    if ((lesson.content?.length || 0) >= TARGET_MIN_CONTENT) return;

    const profile = makeCoreDepthProfile(lang, name.replace(/\.js$/, ''), lesson);
    const additions = uniqueAdditions(lesson, depthPack(lesson, profile));
    lesson.content = mergeDuplicateContentItems([
      ...(lesson.content || []),
      ...additions,
    ]);
    lesson.expressionPractice = lesson.expressionPractice?.length ? lesson.expressionPractice : profile.expressionPractice;
    lesson.relatedPools = lesson.relatedPools?.length ? lesson.relatedPools : profile.relatedPools;

    fs.writeFileSync(file, `module.exports = ${JSON.stringify(lesson, null, 2)};\n`, 'utf8');
    changed += 1;
  });

  console.log(`Finalized core depth for ${lang}: ${changed} lessons enriched.`);
}
