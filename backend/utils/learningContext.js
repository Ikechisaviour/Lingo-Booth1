const mongoose = require('mongoose');
const Organization = require('../models/Organization');
const OrganizationMembership = require('../models/OrganizationMembership');
const InstitutionGroup = require('../models/InstitutionGroup');
const { LANGUAGE_METADATA, normalizeLangCode } = require('./languageMetadata');

const MANAGER_ROLES = new Set(['owner', 'admin']);
const OVERSIGHT_ROLES = new Set(['owner', 'admin', 'teacher']);
const ALL_TARGET_LANGUAGES = Object.keys(LANGUAGE_METADATA);

function normalizeTargetLanguage(code, fallback = 'ko') {
  const normalized = normalizeLangCode(code, fallback);
  return LANGUAGE_METADATA[normalized] ? normalized : fallback;
}

function cleanLanguageList(list) {
  if (!Array.isArray(list)) return [];
  return Array.from(new Set(
    list
      .map((code) => normalizeLangCode(code, ''))
      .filter((code) => code && LANGUAGE_METADATA[code]),
  ));
}

function membershipCanManage(membership) {
  return membership?.status === 'active' && MANAGER_ROLES.has(membership.role);
}

function membershipCanOversee(membership) {
  return membership?.status === 'active' && OVERSIGHT_ROLES.has(membership.role);
}

function publicLanguagePolicy({ organization, group, membership }) {
  const organizationAllowed = cleanLanguageList(organization?.allowedTargetLanguages);
  const groupAllowed = cleanLanguageList(group?.allowedTargetLanguages);
  const memberAllowed = cleanLanguageList(membership?.allowedTargetLanguages);
  const allowedTargetLanguages = memberAllowed.length
    ? memberAllowed
    : groupAllowed.length
      ? groupAllowed
      : organizationAllowed.length
        ? organizationAllowed
        : ALL_TARGET_LANGUAGES;
  const defaultTargetLanguage = normalizeTargetLanguage(
    membership?.defaultTargetLanguage
      || group?.defaultTargetLanguage
      || organization?.defaultTargetLanguage
      || allowedTargetLanguages[0]
      || 'ko',
    allowedTargetLanguages[0] || 'ko',
  );

  return {
    allowedTargetLanguages,
    defaultTargetLanguage: allowedTargetLanguages.includes(defaultTargetLanguage)
      ? defaultTargetLanguage
      : allowedTargetLanguages[0],
    allowLanguageRequests: organization?.allowLanguageRequests !== false,
  };
}

async function resolveLearningContext({ userId, contextType = 'personal', organizationId = '', targetLanguage = '' }) {
  const normalizedTarget = normalizeTargetLanguage(targetLanguage, 'ko');
  if (contextType !== 'institution') {
    return {
      contextType: 'personal',
      targetLanguage: normalizedTarget,
      allowedTargetLanguages: ALL_TARGET_LANGUAGES,
      defaultTargetLanguage: normalizedTarget,
      organization: null,
      membership: null,
      group: null,
      canManage: false,
      canOversee: false,
    };
  }

  if (!organizationId || !mongoose.Types.ObjectId.isValid(String(organizationId))) {
    const error = new Error('Institution context is required');
    error.statusCode = 400;
    throw error;
  }

  const membership = await OrganizationMembership.findOne({
    userId,
    organizationId,
    status: 'active',
  }).lean();
  if (!membership) {
    const error = new Error('Institution access is required');
    error.statusCode = 403;
    throw error;
  }

  const [organization, group] = await Promise.all([
    Organization.findById(organizationId).lean(),
    membership.groupId ? InstitutionGroup.findById(membership.groupId).lean() : null,
  ]);

  if (!organization || !['trialing', 'active'].includes(organization.status)) {
    const error = new Error('Institution access is not active');
    error.statusCode = 403;
    throw error;
  }

  const policy = publicLanguagePolicy({ organization, group, membership });
  if (!policy.allowedTargetLanguages.includes(normalizedTarget)) {
    const error = new Error('This target language is not available for your institution access');
    error.statusCode = 403;
    error.allowedTargetLanguages = policy.allowedTargetLanguages;
    throw error;
  }

  return {
    contextType: 'institution',
    targetLanguage: normalizedTarget,
    organization,
    membership,
    group,
    ...policy,
    canManage: membershipCanManage(membership),
    canOversee: membershipCanOversee(membership),
  };
}

async function listLearningContexts(userId) {
  const memberships = await OrganizationMembership.find({
    userId,
    status: 'active',
  })
    .populate('organizationId')
    .lean();

  const groups = await InstitutionGroup.find({
    _id: {
      $in: memberships.map((membership) => membership.groupId).filter(Boolean),
    },
  }).lean();
  const groupsById = new Map(groups.map((group) => [String(group._id), group]));

  const institutionContexts = memberships
    .filter((membership) => membership.organizationId && ['trialing', 'active'].includes(membership.organizationId.status))
    .map((membership) => {
      const organization = membership.organizationId;
      const group = membership.groupId ? groupsById.get(String(membership.groupId)) : null;
      const policy = publicLanguagePolicy({ organization, group, membership });
      return {
        contextType: 'institution',
        organizationId: organization._id,
        organizationName: organization.name,
        membershipId: membership._id,
        role: membership.role,
        groupId: group?._id || null,
        groupName: group?.name || '',
        canManage: membershipCanManage(membership),
        canOversee: membershipCanOversee(membership),
        ...policy,
      };
    });

  return [
    {
      contextType: 'personal',
      allowedTargetLanguages: ALL_TARGET_LANGUAGES,
      defaultTargetLanguage: 'ko',
      canManage: false,
      canOversee: false,
    },
    ...institutionContexts,
  ];
}

module.exports = {
  ALL_TARGET_LANGUAGES,
  cleanLanguageList,
  listLearningContexts,
  membershipCanManage,
  membershipCanOversee,
  normalizeTargetLanguage,
  publicLanguagePolicy,
  resolveLearningContext,
};
