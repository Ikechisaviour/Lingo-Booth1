/**
 * Curriculum v2 structural validator.
 *
 * Reads every lesson under ../lessons/ and refuses to pass if any structural
 * rule from ../README.md is violated. Designed to be the single source of
 * structural truth — it replaces the multiple audit/repair scripts under
 * backend/scripts/.
 *
 * Exit codes:
 *   0  all lessons valid
 *   1  one or more lessons invalid
 *   2  internal error loading lessons
 *
 * Programmatic use:
 *   const { validateAll } = require('./validate');
 *   const result = validateAll();  // { ok, errors, lessonCount }
 */

const fs = require('fs');
const path = require('path');

const { LESSON_TYPES, DIFFICULTIES } = require('../schema/lessonTypes');
const { isValidConceptId } = require('../schema/concepts');
const { isValidSlotCategory } = require('../schema/slotCategories');
const { isValidRegister } = require('../schema/register');
const { isValidFunction } = require('../schema/functions');

const LESSONS_DIR = path.join(__dirname, '..', 'lessons');

function loadLessons() {
  if (!fs.existsSync(LESSONS_DIR)) return [];
  const lessons = [];
  for (const entry of fs.readdirSync(LESSONS_DIR, { withFileTypes: true })) {
    if (!entry.isFile() || !entry.name.endsWith('.js')) continue;
    const fullPath = path.join(LESSONS_DIR, entry.name);
    delete require.cache[require.resolve(fullPath)];
    const mod = require(fullPath);
    const items = Array.isArray(mod) ? mod : [mod];
    for (const item of items) {
      lessons.push({ lesson: item, sourceFile: entry.name });
    }
  }
  return lessons;
}

function pushErr(errors, sourceFile, lessonId, message) {
  errors.push({ sourceFile, lessonId: lessonId || '(unknown)', message });
}

function validateBase(lesson, sourceFile, errors) {
  const lessonId = lesson && lesson.id;

  if (!lesson || typeof lesson !== 'object') {
    pushErr(errors, sourceFile, lessonId, 'Lesson is not an object.');
    return false;
  }
  if (typeof lesson.id !== 'string' || !lesson.id.trim()) {
    pushErr(errors, sourceFile, lessonId, 'Missing or empty `id`.');
    return false;
  }
  if (!Object.values(LESSON_TYPES).includes(lesson.lessonType)) {
    pushErr(errors, sourceFile, lessonId, `Invalid lessonType: ${lesson.lessonType}`);
    return false;
  }
  if (!isValidConceptId(lesson.conceptId)) {
    pushErr(errors, sourceFile, lessonId, `Unknown conceptId: ${lesson.conceptId}`);
  }
  if (typeof lesson.targetLang !== 'string' || lesson.targetLang.length < 2) {
    pushErr(errors, sourceFile, lessonId, 'Missing or invalid `targetLang`.');
  }
  if (typeof lesson.nativeLang !== 'string' || lesson.nativeLang.length < 2) {
    pushErr(errors, sourceFile, lessonId, 'Missing or invalid `nativeLang`.');
  }
  if (!DIFFICULTIES.includes(lesson.difficulty)) {
    pushErr(errors, sourceFile, lessonId, `Invalid difficulty: ${lesson.difficulty}`);
  }
  if (!Array.isArray(lesson.prerequisites)) {
    pushErr(errors, sourceFile, lessonId, '`prerequisites` must be an array.');
  } else {
    for (const p of lesson.prerequisites) {
      if (!isValidConceptId(p)) {
        pushErr(errors, sourceFile, lessonId, `Prerequisite refers to unknown concept: ${p}`);
      }
    }
  }
  if (typeof lesson.estimatedMinutes !== 'number' || lesson.estimatedMinutes <= 0) {
    pushErr(errors, sourceFile, lessonId, '`estimatedMinutes` must be a positive number.');
  }
  if (lesson.register !== undefined && !isValidRegister(lesson.register)) {
    pushErr(errors, sourceFile, lessonId, `Invalid register: ${lesson.register}`);
  }
  if (lesson.function !== undefined && !isValidFunction(lesson.function)) {
    pushErr(errors, sourceFile, lessonId, `Invalid function: ${lesson.function}`);
  }
  return true;
}

const TYPE_VALIDATORS = {
  [LESSON_TYPES.PATTERN](lesson, sourceFile, errors) {
    const id = lesson.id;
    if (typeof lesson.patternTarget !== 'string' || !lesson.patternTarget.trim()) {
      pushErr(errors, sourceFile, id, 'PatternLesson missing `patternTarget`.');
    }
    if (typeof lesson.patternGloss !== 'string' || !lesson.patternGloss.trim()) {
      pushErr(errors, sourceFile, id, 'PatternLesson missing `patternGloss`.');
    }
    if (!Array.isArray(lesson.anchors) || lesson.anchors.length < 2) {
      pushErr(errors, sourceFile, id, 'PatternLesson must have ≥ 2 anchors.');
    } else {
      lesson.anchors.forEach((a, i) => {
        if (!a || !a.target || !a.native) {
          pushErr(errors, sourceFile, id, `Anchor ${i} missing target/native.`);
        }
      });
    }
    if (!Array.isArray(lesson.drills) || lesson.drills.length < 3) {
      pushErr(errors, sourceFile, id, 'PatternLesson must have ≥ 3 drill slots.');
    } else {
      const seenCategories = new Set();
      lesson.drills.forEach((d, i) => {
        if (!d || !isValidSlotCategory(d.slot)) {
          pushErr(errors, sourceFile, id, `Drill ${i} has invalid slot category: ${d && d.slot}`);
        } else {
          seenCategories.add(d.slot);
        }
        if (!Array.isArray(d.fillerConceptIds) || d.fillerConceptIds.length === 0) {
          pushErr(errors, sourceFile, id, `Drill ${i} has no fillerConceptIds.`);
        } else {
          for (const fid of d.fillerConceptIds) {
            if (!isValidConceptId(fid)) {
              pushErr(errors, sourceFile, id, `Drill ${i} references unknown conceptId: ${fid}`);
            }
          }
        }
        if (typeof d.promptTemplate !== 'string' || !d.promptTemplate.includes('{filler}')) {
          pushErr(errors, sourceFile, id, `Drill ${i} promptTemplate must contain "{filler}".`);
        }
      });
      if (seenCategories.size < 3) {
        pushErr(errors, sourceFile, id, `PatternLesson must cover ≥ 3 distinct slot categories (saw ${seenCategories.size}).`);
      }
    }
    if (typeof lesson.productionTask !== 'string' || !lesson.productionTask.trim()) {
      pushErr(errors, sourceFile, id, 'PatternLesson missing `productionTask`.');
    }
  },

  [LESSON_TYPES.CLOZE](lesson, sourceFile, errors) {
    const id = lesson.id;
    if (!Array.isArray(lesson.items) || lesson.items.length < 3) {
      pushErr(errors, sourceFile, id, 'ClozeLesson must have ≥ 3 items.');
      return;
    }
    lesson.items.forEach((it, i) => {
      if (!it.target || !it.target.includes('___')) {
        pushErr(errors, sourceFile, id, `Cloze item ${i} target must contain '___' marking the blank.`);
      }
      if (!it.native || !it.answer) {
        pushErr(errors, sourceFile, id, `Cloze item ${i} missing native/answer.`);
      }
    });
  },

  [LESSON_TYPES.STORY](lesson, sourceFile, errors) {
    const id = lesson.id;
    if (!['monologue', 'dialogue'].includes(lesson.mode)) {
      pushErr(errors, sourceFile, id, `StoryLesson mode must be 'monologue' or 'dialogue', got: ${lesson.mode}`);
    }
    if (typeof lesson.title !== 'string') {
      pushErr(errors, sourceFile, id, 'StoryLesson missing `title`.');
    }
    if (!Array.isArray(lesson.turns) || lesson.turns.length < 2) {
      pushErr(errors, sourceFile, id, 'StoryLesson must have ≥ 2 turns.');
    } else {
      lesson.turns.forEach((t, i) => {
        if (!t.target || !t.native) {
          pushErr(errors, sourceFile, id, `Story turn ${i} missing target/native.`);
        }
      });
    }
    if (!Array.isArray(lesson.comprehensionQuestions)) {
      pushErr(errors, sourceFile, id, 'StoryLesson missing `comprehensionQuestions` array.');
    }
  },

  [LESSON_TYPES.CONTRAST](lesson, sourceFile, errors) {
    const id = lesson.id;
    for (const field of ['l1Pattern', 'l2Pattern', 'explanation']) {
      if (typeof lesson[field] !== 'string' || !lesson[field].trim()) {
        pushErr(errors, sourceFile, id, `ContrastNote missing \`${field}\`.`);
      }
    }
    if (!Array.isArray(lesson.commonMistakes) || lesson.commonMistakes.length === 0) {
      pushErr(errors, sourceFile, id, 'ContrastNote must list ≥ 1 common mistake.');
    }
  },

  [LESSON_TYPES.VOCAB](lesson, sourceFile, errors) {
    const id = lesson.id;
    if (!Array.isArray(lesson.fillerConceptIds) || lesson.fillerConceptIds.length === 0) {
      pushErr(errors, sourceFile, id, 'VocabDeck must list ≥ 1 fillerConceptIds.');
      return;
    }
    for (const fid of lesson.fillerConceptIds) {
      if (!isValidConceptId(fid)) {
        pushErr(errors, sourceFile, id, `VocabDeck references unknown conceptId: ${fid}`);
      }
    }
  },

  [LESSON_TYPES.PRONUNCIATION](lesson, sourceFile, errors) {
    const id = lesson.id;
    if (!Array.isArray(lesson.items) || lesson.items.length === 0) {
      pushErr(errors, sourceFile, id, 'PronunciationTask must have ≥ 1 item.');
      return;
    }
    lesson.items.forEach((it, i) => {
      if (!it.target || !it.native) {
        pushErr(errors, sourceFile, id, `Pronunciation item ${i} missing target/native.`);
      }
    });
  },

  [LESSON_TYPES.MINIMAL_PAIR](lesson, sourceFile, errors) {
    const id = lesson.id;
    if (!Array.isArray(lesson.pairs) || lesson.pairs.length < 2) {
      pushErr(errors, sourceFile, id, 'MinimalPairTask must have ≥ 2 pairs.');
      return;
    }
    lesson.pairs.forEach((p, i) => {
      if (!p.a || !p.b || !p.contrast) {
        pushErr(errors, sourceFile, id, `MinimalPair ${i} missing a/b/contrast.`);
      }
    });
  },
};

function detectDuplicateIds(lessons, errors) {
  const seen = new Map();
  for (const { lesson, sourceFile } of lessons) {
    if (!lesson || typeof lesson.id !== 'string') continue;
    if (seen.has(lesson.id)) {
      pushErr(
        errors,
        sourceFile,
        lesson.id,
        `Duplicate lesson id (also defined in ${seen.get(lesson.id)}).`,
      );
    } else {
      seen.set(lesson.id, sourceFile);
    }
  }
}

function detectPrerequisiteCycles(lessons, errors) {
  // Concept-level DAG. Nodes = concept IDs; edges = prerequisite relations
  // declared by any lesson keyed on that concept.
  const graph = new Map();
  for (const { lesson } of lessons) {
    if (!lesson || !lesson.conceptId || !Array.isArray(lesson.prerequisites)) continue;
    if (!graph.has(lesson.conceptId)) graph.set(lesson.conceptId, new Set());
    for (const p of lesson.prerequisites) {
      graph.get(lesson.conceptId).add(p);
    }
  }

  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map();
  for (const node of graph.keys()) color.set(node, WHITE);

  function dfs(node, stack) {
    color.set(node, GRAY);
    stack.push(node);
    for (const neighbor of graph.get(node) || []) {
      if (color.get(neighbor) === GRAY) {
        const cycle = stack.slice(stack.indexOf(neighbor)).concat(neighbor).join(' → ');
        return cycle;
      }
      if (color.get(neighbor) === WHITE || color.get(neighbor) === undefined) {
        const result = dfs(neighbor, stack);
        if (result) return result;
      }
    }
    stack.pop();
    color.set(node, BLACK);
    return null;
  }

  for (const node of graph.keys()) {
    if (color.get(node) === WHITE) {
      const cycle = dfs(node, []);
      if (cycle) {
        pushErr(errors, '(graph)', node, `Prerequisite cycle detected: ${cycle}`);
        break;
      }
    }
  }
}

function validateAll() {
  const errors = [];
  let lessons;
  try {
    lessons = loadLessons();
  } catch (err) {
    return { ok: false, errors: [{ sourceFile: '(loader)', lessonId: '(n/a)', message: err.message }], lessonCount: 0 };
  }

  for (const { lesson, sourceFile } of lessons) {
    const baseOk = validateBase(lesson, sourceFile, errors);
    if (!baseOk) continue;
    const typeValidator = TYPE_VALIDATORS[lesson.lessonType];
    if (typeValidator) typeValidator(lesson, sourceFile, errors);
  }

  detectDuplicateIds(lessons, errors);
  detectPrerequisiteCycles(lessons, errors);

  return { ok: errors.length === 0, errors, lessonCount: lessons.length };
}

function formatErrors(errors) {
  return errors
    .map((e) => `  [${e.sourceFile}] ${e.lessonId}: ${e.message}`)
    .join('\n');
}

if (require.main === module) {
  const result = validateAll();
  if (result.ok) {
    console.log(`✓ ${result.lessonCount} lesson(s) valid.`);
    process.exit(0);
  } else {
    console.error(`✗ ${result.errors.length} validation error(s) across ${result.lessonCount} lesson(s):`);
    console.error(formatErrors(result.errors));
    process.exit(1);
  }
}

module.exports = { validateAll, formatErrors };
