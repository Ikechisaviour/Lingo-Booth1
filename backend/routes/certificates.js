const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const CompletionCertificate = require('../models/CompletionCertificate');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const Lesson = require('../models/Lesson');
const { verifyToken } = require('../middleware/auth');
const { getBillingSource, getEffectiveSubscriptionTier } = require('../utils/subscription');
const { renderCertificatePdf } = require('../utils/certificatePdfRenderer');

const CLASS_LESSON_TRACK = 'textbook';
const INCLUDED_CERTIFICATE_TIERS = new Set(['pro', 'ultra']);

function normalizeLang(code, fallback = 'en') {
  const value = String(code || fallback).trim().toLowerCase().slice(0, 20);
  const aliases = {
    kr: 'ko',
    kor: 'ko',
    cn: 'zh',
    chn: 'zh',
    jp: 'ja',
    jpn: 'ja',
    iw: 'he',
    in: 'id',
    tl: 'fil',
  };
  if (aliases[value]) return aliases[value];
  if (value.startsWith('zh')) return 'zh';
  if (value.startsWith('pt')) return 'pt';
  const base = value.split(/[-_]/)[0];
  return aliases[base] || base || fallback;
}

function sanitizeCompletedItems(items, totalItemCount) {
  if (!Array.isArray(items)) return [];
  const max = Math.max(Number(totalItemCount || 0), 0);
  return Array.from(new Set(
    items
      .map(item => Number(item))
      .filter(item => Number.isInteger(item) && item >= 0 && item < max)
      .slice(0, 1000),
  ));
}

function publicCertificate(certificate) {
  if (!certificate) return null;
  const cert = typeof certificate.toObject === 'function' ? certificate.toObject() : certificate;
  const organization = cert.organizationId && typeof cert.organizationId === 'object'
    ? cert.organizationId
    : null;
  const certificateBranding = organization?.certificateBranding || {};
  return {
    certificateId: cert.certificateId,
    certificateType: cert.certificateType,
    userName: cert.userName,
    classLessonId: cert.classLessonId,
    classLessonTitle: cert.classLessonTitle,
    level: cert.level,
    contextType: cert.contextType,
    organizationId: organization?._id || cert.organizationId,
    organizationName: cert.organizationName || organization?.name || '',
    organizationLogoUrl: certificateBranding.logoUrl || '',
    organizationLogoOriginalName: certificateBranding.logoOriginalName || '',
    targetLanguage: cert.targetLanguage,
    nativeLanguage: cert.nativeLanguage,
    completedItemCount: cert.completedItemCount,
    totalItemCount: cert.totalItemCount,
    completionPercent: cert.completionPercent,
    score: cert.score,
    readiness: cert.readiness,
    issuedAt: cert.issuedAt,
    expiresAt: cert.expiresAt,
    status: cert.status,
  };
}

function sampleCertificate(certificateId) {
  const issuedAt = new Date('2026-05-22T09:00:00.000Z');
  const samples = {
    'LB-SAMPLE-CLASS': {
      certificateId: 'LB-SAMPLE-CLASS',
      certificateType: 'class_lesson_completion',
      userName: 'Sample Learner',
      classLessonTitle: 'Ordering at a cafe',
      level: 1,
      contextType: 'personal',
      organizationName: '',
      targetLanguage: 'ko',
      nativeLanguage: 'en',
      completedItemCount: 26,
      totalItemCount: 26,
      completionPercent: 100,
      score: null,
      readiness: 'complete',
      issuedAt,
      expiresAt: null,
      status: 'active',
    },
    'LB-SAMPLE-LEVEL': {
      certificateId: 'LB-SAMPLE-LEVEL',
      certificateType: 'level_completion',
      userName: 'Sample Learner',
      classLessonTitle: '',
      level: 2,
      contextType: 'personal',
      organizationName: '',
      targetLanguage: 'es',
      nativeLanguage: 'en',
      completedItemCount: 48,
      totalItemCount: 52,
      completionPercent: 92,
      score: 84,
      readiness: 'ready',
      issuedAt,
      expiresAt: null,
      status: 'active',
    },
    'LB-SAMPLE-PROFICIENCY': {
      certificateId: 'LB-SAMPLE-PROFICIENCY',
      certificateType: 'level_proficiency',
      userName: 'Sample Learner',
      classLessonTitle: '',
      level: 3,
      contextType: 'personal',
      organizationName: '',
      targetLanguage: 'fr',
      nativeLanguage: 'en',
      completedItemCount: 16,
      totalItemCount: 16,
      completionPercent: 100,
      score: 91,
      readiness: 'ready',
      issuedAt,
      expiresAt: null,
      status: 'active',
    },
    'LB-SAMPLE-INSTITUTION': {
      certificateId: 'LB-SAMPLE-INSTITUTION',
      certificateType: 'institution_proficiency',
      userName: 'Sample Learner',
      classLessonTitle: '',
      level: 4,
      contextType: 'institution',
      organizationName: 'Sample Language Academy',
      organizationLogoUrl: '',
      targetLanguage: 'zh',
      nativeLanguage: 'en',
      completedItemCount: 16,
      totalItemCount: 16,
      completionPercent: 100,
      score: 88,
      readiness: 'ready',
      issuedAt,
      expiresAt: null,
      status: 'active',
    },
    'LB-SAMPLE-INSTITUTION-COMPLETION': {
      certificateId: 'LB-SAMPLE-INSTITUTION-COMPLETION',
      certificateType: 'institution_completion',
      userName: 'Sample Learner',
      classLessonTitle: '',
      level: 2,
      contextType: 'institution',
      organizationName: 'Sample Language Academy',
      organizationLogoUrl: '',
      targetLanguage: 'ja',
      nativeLanguage: 'en',
      completedItemCount: 48,
      totalItemCount: 48,
      completionPercent: 100,
      score: 86,
      readiness: 'ready',
      issuedAt,
      expiresAt: null,
      status: 'active',
    },
  };
  return samples[certificateId] || null;
}

function certificateAccessForUser(user) {
  const tier = getEffectiveSubscriptionTier(user);
  const billingSource = getBillingSource(user);
  const included = user?.role === 'admin'
    || INCLUDED_CERTIFICATE_TIERS.has(tier)
    || billingSource === 'institution';
  const priceCents = tier === 'plus' ? 500 : included ? 0 : 900;

  return {
    included,
    requiresPayment: !included,
    priceCents,
    currency: 'usd',
    tier,
    billingSource,
  };
}

async function loadLessonStatus({ userId, classLessonId, nativeLanguage, targetLanguage, completedItemsOverride = null }) {
  if (!mongoose.Types.ObjectId.isValid(classLessonId)) {
    const error = new Error('Class lesson not found');
    error.statusCode = 404;
    throw error;
  }

  const lesson = await Lesson.findById(classLessonId).select('title track content targetLang').lean();
  if (!lesson || lesson.track !== CLASS_LESSON_TRACK) {
    const error = new Error('Class lesson not found');
    error.statusCode = 404;
    throw error;
  }

  const totalItemCount = Array.isArray(lesson.content) ? lesson.content.length : 0;
  if (!totalItemCount) {
    const error = new Error('This class lesson has no certifiable items yet');
    error.statusCode = 400;
    throw error;
  }

  const progress = await ClassLessonProgress.findOne({
    userId,
    classLessonId,
    nativeLanguage,
    targetLanguage,
  }).lean();

  const savedItems = sanitizeCompletedItems(progress?.completedItems || [], totalItemCount);
  const overrideItems = sanitizeCompletedItems(completedItemsOverride || [], totalItemCount);
  const completedItems = overrideItems.length > savedItems.length ? overrideItems : savedItems;
  const completedItemCount = completedItems.length;
  const completionPercent = Math.min(100, Math.round((completedItemCount / totalItemCount) * 100));
  const complete = completedItemCount >= totalItemCount;
  const certificate = await CompletionCertificate.findOne({
    userId,
    classLessonId,
    nativeLanguage,
    targetLanguage,
    status: 'active',
  }).lean();

  return {
    lesson,
    progress,
    completedItems,
    totalItemCount,
    completedItemCount,
    completionPercent,
    complete,
    certificate,
  };
}

function makeCertificateId() {
  const now = new Date();
  const stamp = now.toISOString().slice(0, 10).replace(/-/g, '');
  const token = crypto.randomBytes(4).toString('hex').toUpperCase();
  return `LB-COMP-${stamp}-${token}`;
}

async function createCertificate({ user, classLessonId, nativeLanguage, targetLanguage, status, access }) {
  const userName = String(user.username || user.name || user.email || 'Learner').trim().slice(0, 160);
  const userEmail = String(user.email || '').trim().toLowerCase().slice(0, 180);

  for (let attempt = 0; attempt < 4; attempt += 1) {
    try {
      return await CompletionCertificate.findOneAndUpdate(
        {
          userId: user._id,
          classLessonId,
          nativeLanguage,
          targetLanguage,
        },
        {
          $setOnInsert: {
            certificateId: makeCertificateId(),
            userId: user._id,
            userName,
            userEmail,
            classLessonId,
            classLessonTitle: String(status.lesson.title || 'Class lesson').slice(0, 240),
            targetLanguage,
            nativeLanguage,
            completedItemCount: status.completedItemCount,
            totalItemCount: status.totalItemCount,
            completionPercent: 100,
            paymentStatus: access.included ? 'included' : 'paid',
            planTier: access.tier,
            billingSource: access.billingSource,
            issuedAt: new Date(),
            status: 'active',
          },
        },
        { upsert: true, new: true },
      ).lean();
    } catch (error) {
      if (error?.code !== 11000 || attempt === 3) throw error;
    }
  }

  throw new Error('Could not issue certificate');
}

async function findVerifiedCertificate(certificateId) {
  const normalizedId = String(certificateId || '').trim().toUpperCase();
  const sample = sampleCertificate(normalizedId);
  if (sample) {
    return { sample: true, certificate: sample };
  }

  const certificate = await CompletionCertificate.findOne({
    certificateId: normalizedId,
    status: 'active',
  })
    .populate('organizationId', 'name certificateBranding')
    .lean();

  if (!certificate) {
    const error = new Error('Certificate not found');
    error.statusCode = 404;
    throw error;
  }

  return { sample: false, certificate: publicCertificate(certificate) };
}

function safeCertificateFilename(certificate, fallbackId) {
  const base = [
    'lingo-booth-certificate',
    certificate?.certificateId || fallbackId,
    certificate?.userName,
  ]
    .filter(Boolean)
    .join('-');
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 90) || 'lingo-booth-certificate';
}

router.get('/', verifyToken, async (req, res) => {
  try {
    const certificates = await CompletionCertificate.find({
      userId: req.userId,
      status: 'active',
    }).sort({ issuedAt: -1 }).lean();
    res.json({ certificates: certificates.map(publicCertificate) });
  } catch (error) {
    console.error('List certificates error:', error);
    res.status(500).json({ message: 'Could not load certificates' });
  }
});

router.get('/class-lessons/:classLessonId/status', verifyToken, async (req, res) => {
  try {
    const nativeLanguage = normalizeLang(req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.query.targetLang, req.user?.targetLanguage || 'ko');
    const status = await loadLessonStatus({
      userId: req.userId,
      classLessonId: req.params.classLessonId,
      nativeLanguage,
      targetLanguage,
    });
    const access = certificateAccessForUser(req.user);
    res.json({
      complete: status.complete,
      completionPercent: status.completionPercent,
      completedItemCount: status.completedItemCount,
      totalItemCount: status.totalItemCount,
      canIssue: status.complete && access.included,
      access,
      certificate: publicCertificate(status.certificate),
    });
  } catch (error) {
    console.error('Certificate status error:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Could not load certificate status' });
  }
});

router.post('/class-lessons/:classLessonId/issue', verifyToken, async (req, res) => {
  try {
    const nativeLanguage = normalizeLang(req.body?.nativeLanguage || req.query.nativeLang, req.user?.nativeLanguage || 'en');
    const targetLanguage = normalizeLang(req.body?.targetLanguage || req.query.targetLang, req.user?.targetLanguage || 'ko');
    const status = await loadLessonStatus({
      userId: req.userId,
      classLessonId: req.params.classLessonId,
      nativeLanguage,
      targetLanguage,
      completedItemsOverride: req.body?.completedItems,
    });
    const access = certificateAccessForUser(req.user);

    if (!status.complete) {
      return res.status(400).json({
        message: 'Complete every class item before issuing a certificate',
        completionPercent: status.completionPercent,
        completedItemCount: status.completedItemCount,
        totalItemCount: status.totalItemCount,
      });
    }

    if (!access.included) {
      return res.status(402).json({
        message: 'Completion certificates are available after certificate purchase or plan upgrade',
        access,
      });
    }

    const certificate = status.certificate || await createCertificate({
      user: req.user,
      classLessonId: req.params.classLessonId,
      nativeLanguage,
      targetLanguage,
      status,
      access,
    });

    res.status(status.certificate ? 200 : 201).json({
      certificate: publicCertificate(certificate),
      access,
    });
  } catch (error) {
    console.error('Issue certificate error:', error);
    res.status(error.statusCode || 500).json({ message: error.message || 'Could not issue certificate' });
  }
});

router.get('/verify/:certificateId/download', async (req, res) => {
  try {
    const certificateId = String(req.params.certificateId || '').trim().toUpperCase();
    const certificateLanguage = normalizeLang(req.query.certLang || req.query.language, 'en');
    const { certificate } = await findVerifiedCertificate(certificateId);
    const pdf = await renderCertificatePdf({ certificateId, certificateLanguage });
    const filename = `${safeCertificateFilename(certificate, certificateId)}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Cache-Control', 'private, no-store');
    return res.send(pdf);
  } catch (error) {
    console.error('Download certificate error:', error);
    return res.status(error.statusCode || 500).json({
      message: error.message || 'Could not prepare certificate download',
    });
  }
});

router.get('/verify/:certificateId', async (req, res) => {
  try {
    const { sample, certificate } = await findVerifiedCertificate(req.params.certificateId);
    res.json({ valid: true, sample, certificate });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(error.statusCode || 500).json({
      valid: false,
      message: error.message || 'Could not verify certificate',
    });
  }
});

module.exports = router;
