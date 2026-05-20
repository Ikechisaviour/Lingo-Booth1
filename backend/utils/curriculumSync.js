const crypto = require('crypto');

const MANAGED_FIELDS = new Set([
  '_id',
  '__v',
  'createdAt',
  'updatedAt',
  'curriculumSourceHash',
  'curriculumSeededAt',
  'curriculumStatus',
  'curriculumArchivedAt',
]);

function stripManagedFields(value) {
  if (Array.isArray(value)) {
    return value.map(stripManagedFields);
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.keys(value)
    .sort()
    .reduce((acc, key) => {
      if (MANAGED_FIELDS.has(key)) return acc;
      const next = stripManagedFields(value[key]);
      if (next !== undefined) acc[key] = next;
      return acc;
    }, {});
}

function stableStringify(value) {
  return JSON.stringify(stripManagedFields(value));
}

function curriculumSourceHash(value) {
  return crypto
    .createHash('sha256')
    .update(stableStringify(value))
    .digest('hex');
}

function comparableLessonShape(Lesson, lesson) {
  const hydrated = lesson instanceof Lesson
    ? lesson
    : new Lesson(lesson);
  return stripManagedFields(hydrated.toObject({
    depopulate: true,
    minimize: false,
    versionKey: false,
  }));
}

function preparedCurriculumLesson(Lesson, curriculumKey, lesson, seededAt = new Date()) {
  const base = {
    ...lesson,
    curriculumKey,
    curriculumStatus: 'active',
    curriculumArchivedAt: null,
  };
  const comparable = comparableLessonShape(Lesson, base);
  return {
    ...base,
    curriculumSourceHash: curriculumSourceHash(comparable),
    curriculumSeededAt: seededAt,
  };
}

module.exports = {
  comparableLessonShape,
  curriculumSourceHash,
  preparedCurriculumLesson,
  stableStringify,
  stripManagedFields,
};
