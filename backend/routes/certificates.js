const crypto = require('crypto');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const CompletionCertificate = require('../models/CompletionCertificate');
const ClassLessonProgress = require('../models/ClassLessonProgress');
const Lesson = require('../models/Lesson');
const { verifyToken } = require('../middleware/auth');
const { getBillingSource, getEffectiveSubscriptionTier } = require('../utils/subscription');

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
  return {
    certificateId: cert.certificateId,
    certificateType: cert.certificateType,
    userName: cert.userName,
    classLessonId: cert.classLessonId,
    classLessonTitle: cert.classLessonTitle,
    targetLanguage: cert.targetLanguage,
    nativeLanguage: cert.nativeLanguage,
    completedItemCount: cert.completedItemCount,
    totalItemCount: cert.totalItemCount,
    completionPercent: cert.completionPercent,
    issuedAt: cert.issuedAt,
    expiresAt: cert.expiresAt,
    status: cert.status,
  };
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

router.get('/verify/:certificateId', async (req, res) => {
  try {
    const certificateId = String(req.params.certificateId || '').trim().toUpperCase();
    const certificate = await CompletionCertificate.findOne({
      certificateId,
      status: 'active',
    }).lean();

    if (!certificate) {
      return res.status(404).json({ valid: false, message: 'Certificate not found' });
    }

    res.json({ valid: true, certificate: publicCertificate(certificate) });
  } catch (error) {
    console.error('Verify certificate error:', error);
    res.status(500).json({ valid: false, message: 'Could not verify certificate' });
  }
});

module.exports = router;
