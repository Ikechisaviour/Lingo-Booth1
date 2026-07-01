const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');

const CompletionCertificate = require('../models/CompletionCertificate');
const LanguagePairProfile = require('../models/LanguagePairProfile');
const Lesson = require('../models/Lesson');
const LevelTestAttempt = require('../models/LevelTestAttempt');
const LevelTestCredit = require('../models/LevelTestCredit');
const Organization = require('../models/Organization');
const { verifyToken } = require('../middleware/auth');
const {
  getBillingSource,
  getEffectiveSubscriptionTier,
  getProficiencyTestIncludedLimit,
  getTestingEntitlements,
  PROFICIENCY_TEST_PRICE_CENTS,
} = require('../utils/subscription');
const { applyTranslation, getOrCreateTranslation } = require('../utils/translationService');
const {
  listLearningContexts,
  normalizeTargetLanguage,
  resolveLearningContext,
} = require('../utils/learningContext');
const { normalizeLangCode } = require('../utils/languageMetadata');
const { fullNameValidation } = require('../utils/fullName');
const { sendServerError, sendClientError } = require('../utils/sendError');

const router = express.Router();

const TEST_MODES = new Set(['completion', 'proficiency']);
const LEVELS = [1, 2, 3, 4];

// Map a passed proficiency-test level to the LanguagePairProfile.currentLevel
// string. The curriculum v2 planner uses currentLevel to filter content by
// difficulty (see backend/curriculum/planner.js).
function inferCurrentLevelFromAttempt(level) {
  if (level >= 4) return 'advanced';
  if (level >= 3) return 'intermediate';
  return 'beginner';
}

// Monotonic rank — only ratchet currentLevel up, never down. A learner
// who passed L4 should not slip back to 'beginner' if they later pass an
// L1 test for fun.
const CURRENT_LEVEL_RANK = {
  '': 0,
  new: 0,
  unsure: 0,
  beginner: 1,
  intermediate: 2,
  advanced: 3,
};

async function syncProfileFromPassedAttempt(attempt) {
  if (!attempt.passed) return;
  if (attempt.mode !== 'proficiency') return; // completion tests don't claim proficiency

  const inferred = inferCurrentLevelFromAttempt(attempt.level);
  const profile = await LanguagePairProfile.findOne({
    userId: attempt.userId,
    targetLanguage: attempt.targetLanguage,
    nativeLanguage: attempt.nativeLanguage,
  });
  if (!profile) return; // no profile yet; nothing to update

  const currentRank = CURRENT_LEVEL_RANK[profile.currentLevel] || 0;
  const inferredRank = CURRENT_LEVEL_RANK[inferred] || 0;
  if (inferredRank > currentRank) {
    profile.currentLevel = inferred;
    await profile.save();
  }
}

const PASS_THRESHOLDS = {
  completion: 60,
  proficiency: 80,
};

function monthStart(date = new Date()) {
  return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), 1, 0, 0, 0, 0));
}

async function buildLevelTestEntitlements(user, userId, now = new Date()) {
  const tier = getEffectiveSubscriptionTier(user);
  const included = getProficiencyTestIncludedLimit(tier);
  const periodStart = monthStart(now);
  const [used, paidCreditsAvailable] = await Promise.all([
    LevelTestAttempt.countDocuments({
      userId,
      mode: 'proficiency',
      startedAt: { $gte: periodStart },
    }),
    LevelTestCredit.countDocuments({
      userId,
      creditType: 'proficiency',
      status: 'available',
    }),
  ]);
  const testing = getTestingEntitlements(tier);
  return {
    ...testing,
    proficiencyTests: {
      ...testing.proficiencyTests,
      included,
      used,
      remainingIncluded: Math.max(0, included - used),
      paidCreditsAvailable,
      periodKey: now.toISOString().slice(0, 7),
    },
  };
}

const SUPPORT_POLICY_BY_LEVEL = {
  1: 'native_guided',
  2: 'mixed',
  3: 'target_first',
  4: 'target_dominant',
};

function cleanMode(mode) {
  return TEST_MODES.has(mode) ? mode : 'completion';
}

function cleanLevel(level) {
  const value = Number(level);
  return LEVELS.includes(value) ? value : 1;
}

function asText(value) {
  return String(value || '').replace(/\s+/g, ' ').trim();
}

function normalizeAnswer(value) {
  return asText(value)
    .toLocaleLowerCase()
    .replace(/[.,!?;:()[\]{}"']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function stableId(prefix, ...parts) {
  return crypto
    .createHash('sha1')
    .update(parts.map((part) => String(part || '')).join('|'))
    .digest('hex')
    .slice(0, 16)
    .replace(/^/, prefix);
}

function shuffle(values, seed) {
  const output = [...values];
  let state = crypto.createHash('sha256').update(String(seed || 'level-test')).digest().readUInt32LE(0);
  for (let i = output.length - 1; i > 0; i -= 1) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const j = state % (i + 1);
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function publicQuestion(question) {
  return {
    questionId: question.questionId,
    skill: question.skill,
    taskType: question.taskType,
    prompt: question.prompt,
    targetText: question.targetText,
    nativeText: question.nativeText,
    options: question.options,
    sourceLessonId: question.sourceLessonId,
    sourceItemIndex: question.sourceItemIndex,
  };
}

function publicAttempt(attempt) {
  const plain = typeof attempt.toObject === 'function' ? attempt.toObject() : attempt;
  return {
    _id: plain._id,
    contextType: plain.contextType,
    organizationId: plain.organizationId,
    targetLanguage: plain.targetLanguage,
    nativeLanguage: plain.nativeLanguage,
    level: plain.level,
    mode: plain.mode,
    status: plain.status,
    passThreshold: plain.passThreshold,
    questionCount: plain.questionCount,
    supportPolicy: plain.supportPolicy,
    questions: (plain.questions || []).map(publicQuestion),
    answers: plain.answers || [],
    score: plain.score,
    passed: plain.passed,
    readiness: plain.readiness,
    weakSkills: plain.weakSkills || [],
    skillScores: plain.skillScores || [],
    certificateId: plain.certificateId,
    paymentStatus: plain.paymentStatus || 'included',
    user: plain.userId && typeof plain.userId === 'object'
      ? {
        _id: plain.userId._id,
        username: plain.userId.username,
        email: plain.userId.email,
      }
      : undefined,
    startedAt: plain.startedAt,
    submittedAt: plain.submittedAt,
  };
}

function publicCertificate(certificate) {
  if (!certificate) return null;
  const plain = typeof certificate.toObject === 'function' ? certificate.toObject() : certificate;
  const organization = plain.organizationId && typeof plain.organizationId === 'object'
    ? plain.organizationId
    : null;
  const certificateBranding = organization?.certificateBranding || {};
  return {
    certificateId: plain.certificateId,
    certificateType: plain.certificateType,
    userName: plain.userName,
    targetLanguage: plain.targetLanguage,
    nativeLanguage: plain.nativeLanguage,
    level: plain.level,
    contextType: plain.contextType,
    organizationId: organization?._id || plain.organizationId,
    organizationName: plain.organizationName || organization?.name || '',
    organizationLogoUrl: certificateBranding.logoUrl || '',
    organizationLogoOriginalName: certificateBranding.logoOriginalName || '',
    score: plain.score,
    readiness: plain.readiness,
    issuedAt: plain.issuedAt,
    status: plain.status,
  };
}

async function localizeLesson(lessonDoc, nativeLanguage, targetLanguage) {
  const lessonObj = lessonDoc.toJSON ? lessonDoc.toJSON() : { ...lessonDoc };
  if (nativeLanguage !== 'en') {
    const translation = await getOrCreateTranslation(lessonDoc, nativeLanguage, targetLanguage);
    applyTranslation(lessonObj, translation);
    const translatedItems = new Map((translation?.items || []).map((item) => [Number(item.index), item]));
    (lessonObj.content || []).forEach((item, index) => {
      const translated = translatedItems.get(index);
      if (!translated?.nativeText) {
        item.nativeText = '';
        item.english = '';
      }
      if (!translated?.exampleNative) {
        item.exampleNative = '';
        item.exampleEnglish = '';
      }
      if (Array.isArray(item.breakdown)) {
        item.breakdown = item.breakdown.map((row, rowIndex) => {
          const native = translated?.breakdown?.[rowIndex]?.native || '';
          return { ...row, native, english: native };
        });
      }
    });
  }
  return lessonObj;
}

function skillForItem(item) {
  const explicit = Array.isArray(item.skillStrands) ? item.skillStrands.find(Boolean) : '';
  if (explicit) return String(explicit).replace(/[^a-z_-]/gi, '').toLowerCase() || 'vocabulary';
  if (['conversation', 'pronunciation'].includes(item.type)) return 'speaking';
  if (['paragraph', 'reading', 'culture'].includes(item.type)) return 'reading';
  if (item.type === 'writing') return 'writing';
  if (item.type === 'grammar' || item.type === 'sentence') return 'grammar';
  return 'vocabulary';
}

function sourceItemsFromLessons(lessons) {
  const items = [];
  lessons.forEach((lesson) => {
    (lesson.content || []).forEach((item, index) => {
      const targetText = asText(item.targetText || item.exampleTarget || item.korean || item.example);
      const nativeText = asText(item.nativeText || item.exampleNative || item.english || item.exampleEnglish);
      if (!targetText || targetText.length > 280) return;
      items.push({
        lessonId: lesson._id,
        lessonTitle: lesson.title,
        itemIndex: index,
        type: item.type,
        skill: skillForItem(item),
        targetText,
        nativeText,
        romanization: asText(item.romanization || item.officialPronunciation || item.learnerPronunciation),
      });
    });
  });
  return items;
}

function buildQuestions(items, { level, mode, seed }) {
  const questionTarget = mode === 'proficiency' ? 16 : 12;
  const selected = shuffle(items, seed).slice(0, questionTarget);
  const optionPool = items.filter((item) => item.nativeText && item.targetText);

  return selected.map((item, index) => {
    const taskType = index % 4 === 0 && item.nativeText
      ? 'choose_target'
      : index % 4 === 1 && item.nativeText
        ? 'choose_meaning'
        : index % 4 === 2
          ? 'type_target'
          : 'short_response';

    const questionId = stableId('q_', item.lessonId, item.itemIndex, taskType, level, mode);
    const skill = item.skill;
    const base = {
      questionId,
      skill,
      taskType,
      prompt: taskType,
      targetText: item.targetText,
      nativeText: item.nativeText,
      options: [],
      expectedText: item.targetText,
      sourceLessonId: item.lessonId,
      sourceItemIndex: item.itemIndex,
    };

    if (taskType === 'choose_target') {
      const distractors = shuffle(
        optionPool.filter((candidate) => candidate.targetText !== item.targetText),
        `${seed}:${questionId}:target`,
      ).slice(0, 3);
      const options = shuffle([item, ...distractors], `${seed}:${questionId}:options`)
        .map((option, optionIndex) => ({
          optionId: stableId('o_', questionId, option.targetText, optionIndex),
          text: option.targetText,
        }));
      return {
        ...base,
        options,
        answerOptionId: options.find((option) => option.text === item.targetText)?.optionId || options[0]?.optionId,
      };
    }

    if (taskType === 'choose_meaning') {
      const distractors = shuffle(
        optionPool.filter((candidate) => candidate.nativeText && candidate.nativeText !== item.nativeText),
        `${seed}:${questionId}:meaning`,
      ).slice(0, 3);
      const options = shuffle([item, ...distractors], `${seed}:${questionId}:options`)
        .map((option, optionIndex) => ({
          optionId: stableId('o_', questionId, option.nativeText, optionIndex),
          text: option.nativeText || option.targetText,
        }));
      return {
        ...base,
        options,
        answerOptionId: options.find((option) => option.text === item.nativeText)?.optionId || options[0]?.optionId,
      };
    }

    return base;
  });
}

async function loadLevelMaterials({ targetLanguage, nativeLanguage, level }) {
  const lessons = await Lesson.find({
    track: 'textbook',
    targetLang: targetLanguage,
    curriculumStatus: 'active',
    learningLevel: level,
  }).sort({ sequenceOrder: 1, unitOrder: 1, title: 1 });

  const localized = await Promise.all(lessons.slice(0, 18).map((lesson) => localizeLesson(lesson, nativeLanguage, targetLanguage)));
  const items = sourceItemsFromLessons(localized);

  return {
    lessons: localized,
    items,
  };
}

function scoreAttempt(attempt, incomingAnswers = []) {
  const answersByQuestion = new Map(
    incomingAnswers.map((answer) => [String(answer.questionId || ''), answer]),
  );

  const skillTotals = new Map();
  let total = 0;
  let correct = 0;

  const scoredAnswers = (attempt.questions || []).map((question) => {
    const submitted = answersByQuestion.get(String(question.questionId)) || {};
    const taskType = question.taskType;
    const expected = normalizeAnswer(question.expectedText || question.targetText);
    let isCorrect = false;
    let selfScore = submitted.selfScore == null ? null : Math.max(0, Math.min(1, Number(submitted.selfScore) || 0));

    if (taskType === 'choose_target' || taskType === 'choose_meaning') {
      isCorrect = String(submitted.selectedOptionId || '') === String(question.answerOptionId || '');
    } else if (taskType === 'short_response') {
      selfScore = selfScore == null ? 0.7 : selfScore;
      isCorrect = selfScore >= 0.65;
    } else {
      const text = normalizeAnswer(submitted.text);
      isCorrect = !!text && !!expected && (text === expected || text.includes(expected) || expected.includes(text));
    }

    total += 1;
    if (isCorrect) correct += 1;

    const skill = question.skill || 'vocabulary';
    const skillRecord = skillTotals.get(skill) || { skill, total: 0, correct: 0 };
    skillRecord.total += 1;
    if (isCorrect) skillRecord.correct += 1;
    skillTotals.set(skill, skillRecord);

    return {
      questionId: question.questionId,
      selectedOptionId: submitted.selectedOptionId || '',
      text: asText(submitted.text),
      selfScore,
      correct: isCorrect,
    };
  });

  const score = total ? Math.round((correct / total) * 100) : 0;
  const skillScores = Array.from(skillTotals.values()).map((record) => ({
    ...record,
    score: record.total ? Math.round((record.correct / record.total) * 100) : 0,
  }));
  const weakSkills = skillScores.filter((record) => record.score < 70).map((record) => record.skill);
  const passed = score >= attempt.passThreshold;
  const readiness = passed ? 'ready' : score >= Math.max(0, attempt.passThreshold - 15) ? 'review_recommended' : 'not_ready';

  return {
    answers: scoredAnswers,
    score,
    passed,
    readiness,
    skillScores,
    weakSkills,
  };
}

function makeCertificateId(mode) {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const token = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `LB-${mode === 'proficiency' ? 'PROF' : 'LVL'}-${stamp}-${token}`;
}

function certificateTypeForAttempt(attempt) {
  if (attempt.contextType === 'institution') {
    return attempt.mode === 'proficiency' ? 'institution_proficiency' : 'institution_completion';
  }
  return attempt.mode === 'proficiency' ? 'level_proficiency' : 'level_completion';
}

router.use(verifyToken);

router.get('/contexts', async (req, res) => {
  try {
    const contexts = await listLearningContexts(req.userId);
    res.json({ contexts });
  } catch (error) {
    return sendServerError(req, res, error, 'LEVEL_TEST_CONTEXTS_FAILED', {
      clientMessage: 'Could not load learning contexts',
    });
  }
});

router.get('/overview', async (req, res) => {
  try {
    const nativeLanguage = normalizeLangCode(req.query.nativeLang || req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeTargetLanguage(req.query.targetLang || req.user?.targetLanguage || 'ko');
    const contextType = req.query.contextType === 'institution' ? 'institution' : 'personal';
    const context = await resolveLearningContext({
      userId: req.userId,
      contextType,
      organizationId: req.query.organizationId,
      targetLanguage,
    });

    const [attempts, certificates] = await Promise.all([
      LevelTestAttempt.find({
        userId: req.userId,
        contextType,
        organizationId: context.organization?._id || null,
        targetLanguage,
        nativeLanguage,
      }).sort({ updatedAt: -1 }).limit(30).lean(),
      CompletionCertificate.find({
        userId: req.userId,
        contextType,
        organizationId: context.organization?._id || null,
        targetLanguage,
        nativeLanguage,
        status: 'active',
      }).sort({ issuedAt: -1 }).limit(30).lean(),
    ]);

    const testEntitlements = await buildLevelTestEntitlements(req.user, req.userId);

    res.json({
      context,
      attempts: attempts.map(publicAttempt),
      certificates: certificates.map(publicCertificate),
      testEntitlements,
    });
  } catch (error) {
    return sendServerError(req, res, error, 'LEVEL_TEST_OVERVIEW_FAILED', {
      httpStatus: error.statusCode || 500,
      clientMessage: error.message || 'Could not load level tests',
      extra: { allowedTargetLanguages: error.allowedTargetLanguages || undefined },
    });
  }
});

router.post('/start', async (req, res) => {
  let reservedCredit = null;
  try {
    const nativeLanguage = normalizeLangCode(req.body?.nativeLanguage || req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeTargetLanguage(req.body?.targetLanguage || req.user?.targetLanguage || 'ko');
    const mode = cleanMode(req.body?.mode);
    const level = cleanLevel(req.body?.level);
    const contextType = req.body?.contextType === 'institution' ? 'institution' : 'personal';
    const context = await resolveLearningContext({
      userId: req.userId,
      contextType,
      organizationId: req.body?.organizationId,
      targetLanguage,
    });

    let paymentStatus = 'included';
    if (mode === 'proficiency') {
      const testEntitlements = await buildLevelTestEntitlements(req.user, req.userId);
      if (testEntitlements.proficiencyTests.used >= testEntitlements.proficiencyTests.included) {
        reservedCredit = await LevelTestCredit.findOneAndUpdate({
          userId: req.userId,
          creditType: 'proficiency',
          status: 'available',
        }, {
          $set: {
            status: 'reserved',
            reservedAt: new Date(),
          },
        }, {
          sort: { purchasedAt: 1 },
          new: true,
        });
        if (!reservedCredit) {
          return res.status(402).json({
            code: 'PROFICIENCY_TEST_PAYMENT_REQUIRED',
            message: 'Payment is required for this proficiency check',
            priceCents: PROFICIENCY_TEST_PRICE_CENTS,
            checkoutRequired: true,
            testEntitlements,
          });
        }
        paymentStatus = 'paid';
      }
    }

    const { lessons, items } = await loadLevelMaterials({ targetLanguage, nativeLanguage, level });
    if (items.length < 6) {
      return sendClientError(res, 404, 'LEVEL_TEST_INSUFFICIENT_MATERIAL', 'This level does not have enough test material yet');
    }

    const seed = `${req.userId}:${contextType}:${context.organization?._id || 'personal'}:${targetLanguage}:${nativeLanguage}:${level}:${mode}:${Date.now()}`;
    const questions = buildQuestions(items, { level, mode, seed });
    const attempt = await LevelTestAttempt.create({
      userId: req.userId,
      contextType,
      organizationId: context.organization?._id || null,
      institutionMembershipId: context.membership?._id || null,
      targetLanguage,
      nativeLanguage,
      level,
      mode,
      status: 'in_progress',
      passThreshold: PASS_THRESHOLDS[mode],
      questionCount: questions.length,
      supportPolicy: SUPPORT_POLICY_BY_LEVEL[level],
      paymentStatus,
      paidCreditId: reservedCredit?._id || null,
      questions,
      sourceSummary: {
        lessonCount: lessons.length,
        itemCount: items.length,
        curriculumKeys: lessons.map((lesson) => lesson.curriculumKey).filter(Boolean).slice(0, 50),
      },
    });

    if (reservedCredit) {
      await LevelTestCredit.updateOne({
        _id: reservedCredit._id,
        status: 'reserved',
      }, {
        $set: {
          status: 'consumed',
          consumedAt: new Date(),
          consumedAttemptId: attempt._id,
        },
      });
      reservedCredit = null;
    }

    res.status(201).json({
      attempt: publicAttempt(attempt),
      testEntitlements: await buildLevelTestEntitlements(req.user, req.userId),
    });
  } catch (error) {
    if (reservedCredit?._id) {
      await LevelTestCredit.updateOne({
        _id: reservedCredit._id,
        status: 'reserved',
      }, {
        $set: {
          status: 'available',
          reservedAt: null,
        },
      }).catch(() => {});
    }
    return sendServerError(req, res, error, 'LEVEL_TEST_START_FAILED', {
      httpStatus: error.statusCode || 500,
      clientMessage: error.message || 'Could not start level test',
      extra: { allowedTargetLanguages: error.allowedTargetLanguages || undefined },
    });
  }
});

router.get('/attempts/:attemptId', async (req, res) => {
  try {
    const attempt = await LevelTestAttempt.findOne({ _id: req.params.attemptId, userId: req.userId });
    if (!attempt) return sendClientError(res, 404, 'LEVEL_TEST_ATTEMPT_NOT_FOUND', 'Level test not found');
    res.json({ attempt: publicAttempt(attempt) });
  } catch (error) {
    return sendServerError(req, res, error, 'LEVEL_TEST_LOAD_ATTEMPT_FAILED', {
      clientMessage: 'Could not load level test',
      metadata: { attemptId: req.params.attemptId },
    });
  }
});

router.post('/attempts/:attemptId/submit', async (req, res) => {
  try {
    const attempt = await LevelTestAttempt.findOne({ _id: req.params.attemptId, userId: req.userId });
    if (!attempt) return sendClientError(res, 404, 'LEVEL_TEST_SUBMIT_ATTEMPT_NOT_FOUND', 'Level test not found');
    if (attempt.status === 'submitted') {
      return res.json({ attempt: publicAttempt(attempt) });
    }

    const scored = scoreAttempt(attempt, req.body?.answers || []);
    attempt.answers = scored.answers;
    attempt.skillScores = scored.skillScores;
    attempt.score = scored.score;
    attempt.passed = scored.passed;
    attempt.readiness = scored.readiness;
    attempt.weakSkills = scored.weakSkills;
    attempt.status = 'submitted';
    attempt.submittedAt = new Date();
    await attempt.save();

    // Ratchet LanguagePairProfile.currentLevel from a passed proficiency
    // test. Failures here must not block the submit response — log only.
    try {
      await syncProfileFromPassedAttempt(attempt);
    } catch (syncErr) {
      console.warn('Failed to sync LanguagePairProfile from level test:', syncErr.message || syncErr);
    }

    res.json({ attempt: publicAttempt(attempt) });
  } catch (error) {
    return sendServerError(req, res, error, 'LEVEL_TEST_SUBMIT_FAILED', {
      clientMessage: 'Could not submit level test',
      metadata: { attemptId: req.params.attemptId },
    });
  }
});

router.post('/attempts/:attemptId/certificate', async (req, res) => {
  try {
    const attempt = await LevelTestAttempt.findOne({ _id: req.params.attemptId, userId: req.userId });
    if (!attempt) return sendClientError(res, 404, 'LEVEL_TEST_CERTIFICATE_ATTEMPT_NOT_FOUND', 'Level test not found');
    if (attempt.status !== 'submitted' || !attempt.passed) {
      return sendClientError(res, 400, 'LEVEL_TEST_CERTIFICATE_NOT_PASSED', 'Pass the level test before issuing a certificate');
    }

    const certificateType = certificateTypeForAttempt(attempt);
    const accessTier = getEffectiveSubscriptionTier(req.user);
    const billingSource = getBillingSource(req.user);
    const submittedFullName = req.body?.fullName;
    const nameSource = submittedFullName !== undefined ? submittedFullName : req.user.fullName;
    const fullNameCheck = fullNameValidation(nameSource, { required: true });
    if (!fullNameCheck.valid) {
      return res.status(fullNameCheck.code === 'FULL_NAME_REQUIRED' ? 409 : 400).json({
        code: fullNameCheck.code,
        message: fullNameCheck.code === 'FULL_NAME_REQUIRED'
          ? 'Add your full name before issuing this certificate'
          : 'Please enter a valid full name',
      });
    }

    if (submittedFullName !== undefined && req.user.fullName !== fullNameCheck.fullName) {
      req.user.fullName = fullNameCheck.fullName;
      await req.user.save();
    }

    const userName = fullNameCheck.fullName;
    const userEmail = String(req.user.email || '').trim().toLowerCase().slice(0, 180);
    const organization = attempt.organizationId
      ? await Organization.findById(attempt.organizationId).select('name certificateBranding').lean()
      : null;

    const certificate = await CompletionCertificate.findOneAndUpdate(
      {
        userId: req.userId,
        certificateType,
        contextType: attempt.contextType,
        organizationId: attempt.organizationId || null,
        targetLanguage: attempt.targetLanguage,
        nativeLanguage: attempt.nativeLanguage,
        level: attempt.level,
        status: 'active',
      },
      {
        $setOnInsert: {
          certificateId: makeCertificateId(attempt.mode),
          issuedAt: new Date(),
          status: 'active',
        },
        $set: {
          userId: req.userId,
          userName,
          userEmail,
          certificateType,
          contextType: attempt.contextType,
          organizationId: attempt.organizationId || null,
          organizationName: organization?.name || '',
          institutionMembershipId: attempt.institutionMembershipId || null,
          testAttemptId: attempt._id,
          targetLanguage: attempt.targetLanguage,
          nativeLanguage: attempt.nativeLanguage,
          level: attempt.level,
          classLessonId: null,
          classLessonTitle: '',
          completedItemCount: attempt.questionCount,
          totalItemCount: attempt.questionCount,
          completionPercent: attempt.score,
          score: attempt.score,
          skillScores: attempt.skillScores || [],
          readiness: attempt.readiness,
          paymentStatus: 'included',
          planTier: accessTier,
          billingSource,
        },
      },
      { upsert: true, new: true },
    );

    attempt.certificateId = certificate.certificateId;
    await attempt.save();

    const publicCert = publicCertificate({
      ...(certificate.toObject ? certificate.toObject() : certificate),
      organizationId: organization || certificate.organizationId,
    });

    res.status(201).json({ certificate: publicCert, attempt: publicAttempt(attempt) });
  } catch (error) {
    return sendServerError(req, res, error, 'LEVEL_TEST_CERTIFICATE_FAILED', {
      clientMessage: 'Could not issue certificate',
      metadata: { attemptId: req.params.attemptId },
    });
  }
});

router.get('/institution/:organizationId/report', async (req, res) => {
  try {
    const targetLanguage = normalizeTargetLanguage(req.query.targetLang || req.user?.targetLanguage || 'ko');
    const context = await resolveLearningContext({
      userId: req.userId,
      contextType: 'institution',
      organizationId: req.params.organizationId,
      targetLanguage,
    });
    if (!context.canOversee) {
      return sendClientError(res, 403, 'LEVEL_TEST_INSTITUTION_ACCESS_DENIED', 'Institution teacher access is required');
    }

    const attempts = await LevelTestAttempt.find({
      organizationId: req.params.organizationId,
      status: 'submitted',
    })
      .sort({ submittedAt: -1 })
      .limit(100)
      .populate('userId', 'username email')
      .lean();
    const certificates = await CompletionCertificate.find({
      organizationId: req.params.organizationId,
      status: 'active',
    })
      .sort({ issuedAt: -1 })
      .limit(100)
      .populate('userId', 'username email')
      .lean();

    res.json({
      attempts: attempts.map(publicAttempt),
      certificates: certificates.map(publicCertificate),
    });
  } catch (error) {
    return sendServerError(req, res, error, 'LEVEL_TEST_INSTITUTION_REPORT_FAILED', {
      httpStatus: error.statusCode || 500,
      clientMessage: error.message || 'Could not load institution test report',
      metadata: { organizationId: req.params.organizationId },
    });
  }
});

module.exports = router;
