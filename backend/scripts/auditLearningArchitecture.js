/**
 * Verifies that class, quiz, and flashcard source generation share the same
 * four-level learning architecture. This prevents future content work from
 * silently drifting back into duplicate Level 1 / Level 2 buckets or loading
 * unaligned practice material.
 */

const { SUPPORTED_LANGUAGES } = require('../config/languages');
const { loadTargetCurriculum } = require('../utils/loadTargetCurriculum');
const {
  buildDefaultFlashcardSourceForLanguage,
  buildPracticeLessonsForLanguage,
} = require('../utils/targetAuthoredPracticeContent');
const {
  BRANCH_TYPES,
  LESSON_ROLES,
  LONG_ACTIVITY_TYPES,
  SUPPORT_BY_LEVEL,
  inferLearningArchitecture,
} = require('../utils/learningArchitecture');

function clean(value) {
  return String(value || '').trim();
}

function issue(issues, lang, area, message, extra = {}) {
  issues.push({ lang, area, message, ...extra });
}

function hasLevelUse(item, level) {
  return !!(item?.levelUses && typeof item.levelUses === 'object' && item.levelUses[level]);
}

function hasActiveLevel(item, level) {
  return Array.isArray(item?.activeLevels) && item.activeLevels.includes(level);
}

function auditAlignedItem(item, level, issues, lang, area, extra = {}) {
  if (!item.conceptId) {
    issue(issues, lang, area, 'Item missing conceptId', extra);
  }
  if (!item.senseId) {
    issue(issues, lang, area, 'Item missing senseId', extra);
  }
  if (![1, 2, 3, 4].includes(Number(item.firstIntroducedLevel))) {
    issue(issues, lang, area, 'Item missing firstIntroducedLevel', extra);
  }
  if (!hasActiveLevel(item, level)) {
    issue(issues, lang, area, 'Item activeLevels does not include its learning level', extra);
  }
  if (!hasLevelUse(item, level)) {
    issue(issues, lang, area, 'Item missing levelUses entry for its learning level', extra);
  }
}

function auditLessonPlanMetadata(item, issues, lang, area, extra = {}) {
  const manifestSource = clean(item.manifestSource || item.learning?.manifestSource);
  if (manifestSource !== 'four-level-curriculum-plan') {
    issue(issues, lang, area, 'Missing explicit four-level curriculum manifest source', { ...extra, manifestSource });
  }
  const unitOrder = Number(item.unitOrder ?? item.learning?.unitOrder);
  const sequenceOrder = Number(item.sequenceOrder ?? item.learning?.sequenceOrder);
  if (!Number.isFinite(unitOrder) || !Number.isFinite(sequenceOrder)) {
    issue(issues, lang, area, 'Missing unitOrder or sequenceOrder', { ...extra, unitOrder, sequenceOrder });
  }
  if (!clean(item.programLevelNameKey || item.learning?.programLevelNameKey)) {
    issue(issues, lang, area, 'Missing programLevelNameKey', extra);
  }
  if (!clean(item.programLevelDescriptionKey || item.learning?.programLevelDescriptionKey)) {
    issue(issues, lang, area, 'Missing programLevelDescriptionKey', extra);
  }
  const role = clean(item.lessonRole || item.learning?.lessonRole);
  if (!LESSON_ROLES.includes(role)) {
    issue(issues, lang, area, 'Missing or invalid lessonRole', { ...extra, lessonRole: role });
  }
  const branchType = clean(item.branchType || item.learning?.branchType);
  if (!BRANCH_TYPES.includes(branchType)) {
    issue(issues, lang, area, 'Missing or invalid branchType', { ...extra, branchType });
  }
  const lessonWeight = Number(item.lessonWeight || item.learning?.lessonWeight);
  if (![1, 2, 3].includes(lessonWeight)) {
    issue(issues, lang, area, 'Missing or invalid lessonWeight', { ...extra, lessonWeight });
  }
  const longActivityTypes = item.longActivityTypes || item.learning?.longActivityTypes || [];
  if (!Array.isArray(longActivityTypes) || longActivityTypes.length === 0) {
    issue(issues, lang, area, 'Missing longActivityTypes', extra);
  } else {
    longActivityTypes.forEach((type) => {
      if (!LONG_ACTIVITY_TYPES.includes(type)) {
        issue(issues, lang, area, 'Invalid longActivityTypes entry', { ...extra, type });
      }
    });
  }
  if (role === 'checkpoint' && !clean(item.checkpointType || item.learning?.checkpointType)) {
    issue(issues, lang, area, 'Checkpoint lesson missing checkpointType', extra);
  }
  if (role === 'repair' && !(item.repairFocus || item.learning?.repairFocus || []).length) {
    issue(issues, lang, area, 'Repair lesson missing repairFocus', extra);
  }
  const skillFocus = item.skillFocus || item.learning?.skillFocus || item.skillStrands || item.learning?.skillStrands || [];
  if (!Array.isArray(skillFocus) || skillFocus.length === 0) {
    issue(issues, lang, area, 'Missing skillFocus', extra);
  }
}

function auditCurriculumLanguage(lang, issues) {
  const { curriculum } = loadTargetCurriculum(lang);
  const byLevel = new Map();
  const longActivityCoverage = new Set();
  let branchCount = 0;

  Object.entries(curriculum).forEach(([curriculumKey, lesson]) => {
    const learning = inferLearningArchitecture({ ...lesson, curriculumKey });
    if (!SUPPORT_BY_LEVEL[learning.level]) {
      issue(issues, lang, 'class', 'Invalid learning level', { curriculumKey, level: learning.level });
      return;
    }
    if (learning.supportLevel !== SUPPORT_BY_LEVEL[learning.level].supportLevel) {
      issue(issues, lang, 'class', 'Support level does not match level policy', {
        curriculumKey,
        level: learning.level,
        supportLevel: learning.supportLevel,
      });
    }
    auditLessonPlanMetadata(learning, issues, lang, 'class-plan', { curriculumKey, level: learning.level });
    if (learning.lessonRole === 'branch') branchCount += 1;
    (learning.longActivityTypes || []).forEach(type => longActivityCoverage.add(type));
    const entry = byLevel.get(learning.level) || { total: 0, coreOrCheckpoint: 0, core: 0, branch: 0, checkpoint: 0 };
    entry.total += 1;
    if (learning.coreRequired || learning.lessonRole === 'checkpoint') entry.coreOrCheckpoint += 1;
    if (learning.lessonRole === 'core') entry.core += 1;
    if (learning.lessonRole === 'branch') entry.branch += 1;
    if (learning.lessonRole === 'checkpoint') entry.checkpoint += 1;
    byLevel.set(learning.level, entry);
  });

  [1, 2, 3, 4].forEach((level) => {
    const entry = byLevel.get(level);
    if (!entry?.total) {
      issue(issues, lang, 'class', `Missing learner-facing Level ${level}`);
    } else if (!entry.coreOrCheckpoint) {
      issue(issues, lang, 'class', `Level ${level} has no required core/checkpoint lesson`);
    } else if (!entry.core) {
      issue(issues, lang, 'class', `Level ${level} has no core lesson`);
    } else if (!entry.checkpoint) {
      issue(issues, lang, 'class', `Level ${level} has no checkpoint lesson`);
    }
  });

  if (!branchCount) {
    issue(issues, lang, 'class', 'No optional branch lessons found');
  }

  ['comprehension', 'typed-writing', 'storytelling', 'story-hearing'].forEach((type) => {
    if (!longActivityCoverage.has(type)) {
      issue(issues, lang, 'class', `Missing long activity coverage: ${type}`);
    }
  });
}

function auditPracticeLanguage(lang, issues) {
  const lessons = buildPracticeLessonsForLanguage(lang);
  if (!lessons.length) {
    issue(issues, lang, 'quiz', 'No generated quiz lessons');
    return;
  }

  lessons.forEach((lesson) => {
    const policy = SUPPORT_BY_LEVEL[lesson.learningLevel];
    if (!policy) {
      issue(issues, lang, 'quiz', 'Quiz lesson missing valid learningLevel', { curriculumKey: lesson.curriculumKey });
      return;
    }
    if (lesson.supportLevel !== policy.supportLevel || lesson.quizOptionMode !== policy.quizOptionMode) {
      issue(issues, lang, 'quiz', 'Quiz lesson does not follow support-fading policy', {
        curriculumKey: lesson.curriculumKey,
        learningLevel: lesson.learningLevel,
      });
    }
    auditLessonPlanMetadata(lesson, issues, lang, 'quiz-plan', { curriculumKey: lesson.curriculumKey });
    (lesson.content || []).forEach((item, index) => {
      if (item.learningLevel !== lesson.learningLevel || item.supportLevel !== lesson.supportLevel) {
        issue(issues, lang, 'quiz-item', 'Quiz item is not aligned with its source lesson level', {
          curriculumKey: lesson.curriculumKey,
          index,
        });
      }
      if (item.quizOptionMode !== lesson.quizOptionMode) {
        issue(issues, lang, 'quiz-item', 'Quiz item option mode does not match its source lesson', {
          curriculumKey: lesson.curriculumKey,
          index,
        });
      }
      if (!item.sourceClassLessonKey) {
        issue(issues, lang, 'quiz-item', 'Quiz item missing sourceClassLessonKey', {
          curriculumKey: lesson.curriculumKey,
          index,
        });
      }
      auditAlignedItem(item, lesson.learningLevel, issues, lang, 'quiz-item', {
        curriculumKey: lesson.curriculumKey,
        index,
      });
      auditLessonPlanMetadata(item, issues, lang, 'quiz-item-plan', {
        curriculumKey: lesson.curriculumKey,
        index,
      });
    });
  });
}

function auditFlashcardsLanguage(lang, issues) {
  const cards = buildDefaultFlashcardSourceForLanguage(lang);
  if (!cards.length) {
    issue(issues, lang, 'flashcards', 'No default flashcards generated');
    return;
  }

  const byTarget = new Map();

  cards.forEach((card, index) => {
    const policy = SUPPORT_BY_LEVEL[card.learningLevel];
    if (!policy) {
      issue(issues, lang, 'flashcards', 'Flashcard missing valid learningLevel', { index, target: card.korean });
      return;
    }
    if (card.supportLevel !== policy.supportLevel) {
      issue(issues, lang, 'flashcards', 'Flashcard support level does not match level policy', {
        index,
        target: card.korean,
        learningLevel: card.learningLevel,
      });
    }
    auditAlignedItem(card, card.learningLevel, issues, lang, 'flashcards', { index, target: card.korean });
    auditLessonPlanMetadata(card, issues, lang, 'flashcard-plan', { index, target: card.korean });
    if (!card.sourceClassLessonKeys?.length) {
      issue(issues, lang, 'flashcards', 'Flashcard missing sourceClassLessonKeys', { index, target: card.korean });
    }

    const targetKey = clean(card.korean).toLowerCase();
    if (targetKey) {
      if (byTarget.has(targetKey)) {
        issue(issues, lang, 'flashcards', 'Duplicate target flashcard was not merged', {
          firstIndex: byTarget.get(targetKey),
          index,
          target: card.korean,
        });
      } else {
        byTarget.set(targetKey, index);
      }
    }
  });
}

const issues = [];

SUPPORTED_LANGUAGES.forEach((lang) => {
  try {
    auditCurriculumLanguage(lang, issues);
    auditPracticeLanguage(lang, issues);
    auditFlashcardsLanguage(lang, issues);
  } catch (error) {
    issue(issues, lang, 'architecture', error.message || String(error));
  }
});

if (issues.length) {
  console.error(`Learning architecture audit found ${issues.length} issue(s).`);
  issues.slice(0, 50).forEach((item) => console.error(JSON.stringify(item)));
  process.exit(1);
}

console.log('Learning architecture audit passed.');
