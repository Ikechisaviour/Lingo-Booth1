const CompletionCertificate = require('../models/CompletionCertificate');

const CLASS_CERTIFICATE_KEY = {
  userId: 1,
  classLessonId: 1,
  nativeLanguage: 1,
  targetLanguage: 1,
};

const LEVEL_CERTIFICATE_LOOKUP_KEY = {
  userId: 1,
  certificateType: 1,
  contextType: 1,
  organizationId: 1,
  targetLanguage: 1,
  nativeLanguage: 1,
  level: 1,
};

function sameKey(left = {}, right = {}) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  return leftKeys.length === rightKeys.length
    && leftKeys.every((key) => left[key] === right[key]);
}

function isClassCertificatePartial(index) {
  return index?.partialFilterExpression?.certificateType === 'class_lesson_completion';
}

async function ensureCertificateIndexes() {
  const collection = CompletionCertificate.collection;
  const indexes = await collection.indexes();

  const legacyClassCertificateIndex = indexes.find((index) => (
    index.unique
    && sameKey(index.key, CLASS_CERTIFICATE_KEY)
    && !isClassCertificatePartial(index)
  ));

  if (legacyClassCertificateIndex) {
    await collection.dropIndex(legacyClassCertificateIndex.name);
    console.log(`Dropped legacy certificate index: ${legacyClassCertificateIndex.name}`);
  }

  const refreshedIndexes = legacyClassCertificateIndex ? await collection.indexes() : indexes;
  const hasClassCertificateIndex = refreshedIndexes.some((index) => (
    index.unique
    && sameKey(index.key, CLASS_CERTIFICATE_KEY)
    && isClassCertificatePartial(index)
  ));

  if (!hasClassCertificateIndex) {
    await collection.createIndex(
      CLASS_CERTIFICATE_KEY,
      {
        unique: true,
        partialFilterExpression: { certificateType: 'class_lesson_completion' },
        name: 'class_lesson_certificate_unique',
      },
    );
  }

  const latestIndexes = hasClassCertificateIndex ? refreshedIndexes : await collection.indexes();
  const hasLevelLookupIndex = latestIndexes.some((index) => (
    sameKey(index.key, LEVEL_CERTIFICATE_LOOKUP_KEY)
  ));

  if (!hasLevelLookupIndex) {
    await collection.createIndex(
      LEVEL_CERTIFICATE_LOOKUP_KEY,
      { name: 'certificate_level_context_lookup' },
    );
  }
}

module.exports = ensureCertificateIndexes;
