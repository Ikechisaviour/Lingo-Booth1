import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiAlertTriangle,
  FiAward,
  FiBriefcase,
  FiCheckCircle,
  FiClock,
  FiCreditCard,
  FiEdit3,
  FiImage,
  FiMail,
  FiPauseCircle,
  FiPlus,
  FiRefreshCw,
  FiShoppingBag,
  FiTrash2,
  FiTrendingUp,
  FiUpload,
  FiUserPlus,
  FiUsers,
  FiZap,
} from 'react-icons/fi';
import { billingService, certificateService } from '../services/api';
import LANGUAGES, { getLanguageDisplayName } from '../config/languages';
import './InstitutionDashboard.css';

const roleOptions = ['learner', 'teacher', 'admin', 'owner'];
const managerRoleOptions = ['teacher', 'admin', 'owner'];
const managerRoles = ['admin', 'owner'];
const statusOptions = ['active', 'invited', 'suspended', 'removed'];
const organizationTypes = ['school', 'company', 'religious', 'language_center', 'nonprofit', 'government', 'other'];
const languageCodes = Object.keys(LANGUAGES);
const certificateLogoTypes = ['image/png', 'image/x-png', 'image/jpeg', 'image/pjpeg', 'image/webp', 'image/gif', 'image/svg+xml'];
const certificateLogoExtensions = new Map([
  ['png', 'image/png'],
  ['jpg', 'image/jpeg'],
  ['jpeg', 'image/jpeg'],
  ['webp', 'image/webp'],
  ['gif', 'image/gif'],
  ['svg', 'image/svg+xml'],
]);
const certificateLogoMaxBytes = 600 * 1024;

function certificateLogoMimeFor(file) {
  if (file?.type === 'image/x-png') return 'image/png';
  if (file?.type === 'image/pjpeg') return 'image/jpeg';
  if (certificateLogoTypes.includes(file?.type)) return file.type;
  const extension = String(file?.name || '').split('.').pop()?.toLowerCase();
  return certificateLogoExtensions.get(extension) || '';
}

function normalizeLogoDataUrl(dataUrl, mimeType) {
  const value = String(dataUrl || '');
  if (!mimeType || value.startsWith(`data:${mimeType};`)) return value;
  return value.replace(/^data:[^;,]*;/, `data:${mimeType};`);
}

function formatDate(value, fallback, locale) {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString(locale || undefined);
}

function daysUntil(value) {
  if (!value) return null;
  const ms = new Date(value).getTime() - Date.now();
  if (!Number.isFinite(ms)) return null;
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

function formatCents(value) {
  if (value == null || !Number.isFinite(value)) return '—';
  return `$${(value / 100).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function seatBatchSourceLabel(source) {
  switch (source) {
    case 'stripe': return 'Stripe checkout';
    case 'manual': return 'Manual top-up';
    case 'lead_accept': return 'Lead accepted';
    case 'auto_renew': return 'Auto-renew';
    case 'initial': return 'Initial grant';
    default: return source || 'Manual';
  }
}

function asPercent(value, fallback) {
  return Number.isFinite(value) ? `${value}%` : fallback;
}

function organizationInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('') || 'LB';
}

function roleOptionsForMember(member) {
  return managerRoles.includes(member?.role) ? managerRoleOptions : roleOptions;
}

function InstitutionDashboard() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [noAccess, setNoAccess] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [dashboard, setDashboard] = useState(null);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState('');
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'learner', groupId: '', allowedTargetLanguages: [] });
  const [groupForm, setGroupForm] = useState({
    name: '',
    description: '',
    allowedTargetLanguages: [],
    defaultTargetLanguage: '',
  });
  const [profileForm, setProfileForm] = useState({
    name: '',
    type: 'other',
    billingEmail: '',
    notes: '',
    allowedTargetLanguages: [],
    defaultTargetLanguage: '',
    allowLanguageRequests: true,
  });
  const [certificateLogoPreview, setCertificateLogoPreview] = useState('');
  const [certificateLogoDisplayPreview, setCertificateLogoDisplayPreview] = useState('');
  const [certificateLogoName, setCertificateLogoName] = useState('');
  const [brandingSaving, setBrandingSaving] = useState(false);
  // Inline status for the certificate-branding card — the global notice
  // banner sits at the top of the page and is easy to miss while the user is
  // working in this card. `kind` is 'error' | 'success' | ''.
  const [brandingStatus, setBrandingStatus] = useState({ kind: '', message: '' });
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [wallet, setWallet] = useState(null);
  const [projection, setProjection] = useState(null);
  const [topUpQuantity, setTopUpQuantity] = useState(10);
  const [topUpSaving, setTopUpSaving] = useState(false);
  const [autoRenewForm, setAutoRenewForm] = useState({
    enabled: false, threshold: 0, refillQuantity: 10, planId: '',
  });
  const [autoRenewSaving, setAutoRenewSaving] = useState(false);
  const [seatActionId, setSeatActionId] = useState('');
  const [seatHistory, setSeatHistory] = useState({ membershipId: '', items: [], loading: false });

  const organization = dashboard?.organization || null;
  const canManage = !!dashboard?.currentMembership?.canManage;
  const members = useMemo(() => dashboard?.members || [], [dashboard?.members]);
  const activeLearners = useMemo(
    () => members.filter((member) => member.role === 'learner' && member.status === 'active'),
    [members],
  );
  const locale = i18n.resolvedLanguage || i18n.language || undefined;
  const localizedDate = (value, fallback) => formatDate(value, fallback, locale);
  const renderSeatCell = (member) => {
    if (member.role !== 'learner') {
      return <small className="institution-seat-na">{t('institution.seatNotApplicable', '—')}</small>;
    }
    const seat = member.currentSeat;
    const requestPending = member.suspensionRequest?.requestedAt && !member.suspensionRequest?.handledAt;
    const isProcessing = seatActionId === member._id;
    let badge = null;
    if (seat?.state === 'active' && seat.expiresAt) {
      const days = daysUntil(seat.expiresAt);
      badge = <span className="institution-seat-badge active">{t('institution.seatActive', '{{days}}d left', { days: days ?? 0 })}</span>;
    } else if (seat?.state === 'suspended') {
      const days = daysUntil(seat.expiresAt);
      badge = <span className="institution-seat-badge suspended" title={t('institution.seatSuspendedTooltip', 'Suspended — access continues until expiry')}>{t('institution.seatSuspended', 'Suspended · {{days}}d grace', { days: days ?? 0 })}</span>;
    } else if (member.status === 'suspended' && member.suspensionReason === 'pool_empty') {
      badge = <span className="institution-seat-badge empty">{t('institution.seatNoneEmptyPool', 'No seat — pool empty')}</span>;
    } else {
      badge = <span className="institution-seat-badge none">{t('institution.seatNone', 'No seat')}</span>;
    }
    return (
      <div className="institution-seat-cell-inner">
        {badge}
        {requestPending && <small className="institution-seat-request-flag">{t('institution.suspensionRequestedShort', 'Suspension requested')}</small>}
        {canManage && (
          <div className="institution-seat-actions">
            {seat && member.status === 'active' && (
              <button type="button" className="institution-link" onClick={() => handleSuspend(member)} disabled={isProcessing}>
                {t('institution.suspend', 'Suspend')}
              </button>
            )}
            {member.status === 'suspended' && (
              <button type="button" className="institution-link" onClick={() => handleUnsuspend(member)} disabled={isProcessing}>
                {t('institution.unsuspend', 'Unsuspend')}
              </button>
            )}
            <button type="button" className="institution-link" onClick={() => loadSeatHistoryFor(member)} disabled={isProcessing}>
              {seatHistory.membershipId === member._id ? t('common.close', 'Close') : t('institution.history', 'History')}
            </button>
          </div>
        )}
      </div>
    );
  };

  const renderMemberProgressDetail = (member) => {
    const summary = member?.learnerSummary || {};
    return (
      <div className="institution-member-detail">
        <div className="institution-progress-card-head">
          <div>
            <strong>{member.user?.username || member.email}</strong>
            <small>{member.groupId?.name || t('institution.noGroup', 'No group')}</small>
          </div>
          <span>{asPercent(summary.averageScore, t('institution.noScore'))}</span>
        </div>
        <div className="institution-progress-metrics">
          <div><span>{t('institution.mastered', 'Mastered')}</span><strong>{summary.mastered || 0}</strong></div>
          <div><span>{t('institution.comfortable', 'Comfortable')}</span><strong>{summary.comfortable || 0}</strong></div>
          <div><span>{t('institution.learning', 'Learning')}</span><strong>{summary.learning || 0}</strong></div>
          <div><span>{t('institution.struggling', 'Struggling')}</span><strong>{summary.struggling || 0}</strong></div>
        </div>
        <div className="institution-progress-foot">
          <span>{t('institution.progressRecords', { count: summary.progressRecords || 0 })}</span>
          <span>{t('institution.completedItemsShort', { count: summary.completedClassItems || 0 })}</span>
          <span>{t('institution.classLessonsStarted', '{{count}} lessons started', { count: summary.classLessonsStarted || 0 })}</span>
          <span>{localizedDate(member.user?.lastActive || summary.lastStudiedAt, t('profilePage.unknown'))}</span>
        </div>
      </div>
    );
  };

  const loadSeatData = async (organizationId) => {
    if (!organizationId) {
      setWallet(null);
      setProjection(null);
      return;
    }
    try {
      const [walletRes, projectionRes] = await Promise.all([
        billingService.getSeatWallet(organizationId),
        billingService.getSeatProjection(organizationId, 7),
      ]);
      setWallet(walletRes.data);
      setProjection(projectionRes.data);
    } catch (err) {
      // Non-fatal — the dashboard still renders without wallet/projection.
      setWallet(null);
      setProjection(null);
    }
  };

  const loadDashboard = async (organizationId = selectedOrganizationId) => {
    setLoading(true);
    setError('');
    setNoAccess(false);
    try {
      const res = await billingService.getInstitutionDashboard(organizationId);
      setDashboard(res.data);
      const nextOrg = res.data?.organization;
      if (nextOrg?._id) {
        setSelectedOrganizationId(String(nextOrg._id));
        setCertificateLogoPreview('');
        setCertificateLogoName('');
        setProfileForm({
          name: nextOrg.name || '',
          type: nextOrg.type || 'other',
          billingEmail: nextOrg.billingEmail || '',
          notes: nextOrg.notes || '',
          allowedTargetLanguages: res.data?.languagePolicy?.allowedTargetLanguages || nextOrg.allowedTargetLanguages || [],
          defaultTargetLanguage: res.data?.languagePolicy?.defaultTargetLanguage || nextOrg.defaultTargetLanguage || '',
          allowLanguageRequests: res.data?.languagePolicy?.allowLanguageRequests !== false,
        });
        setAutoRenewForm({
          enabled: !!nextOrg.autoRenew?.enabled,
          threshold: Number(nextOrg.autoRenew?.threshold) || 0,
          refillQuantity: Number(nextOrg.autoRenew?.refillQuantity) || 10,
          planId: nextOrg.autoRenew?.planId || nextOrg.planId || '',
        });
        await loadSeatData(nextOrg._id);
      }
    } catch (err) {
      if (err.response?.status === 403) {
        setNoAccess(true);
        setError(t('institution.noAccessBody'));
      } else {
        setError(t('institution.loadFailed'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOrganizationChange = (event) => {
    const organizationId = event.target.value;
    setSelectedOrganizationId(organizationId);
    loadDashboard(organizationId);
  };

  const handleInvite = async (event) => {
    event.preventDefault();
    if (!organization?._id || !inviteForm.email.trim()) return;
    setSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.addInstitutionMember(organization._id, inviteForm);
      setInviteForm({ email: '', role: 'learner', groupId: '', allowedTargetLanguages: [] });
      setNotice(t('institution.memberAdded'));
      await loadDashboard(organization._id);
    } catch {
      setError(t('institution.memberAddFailed'));
    } finally {
      setSaving(false);
    }
  };

  const toggleGroupLanguage = (code) => {
    setGroupForm((current) => {
      const set = new Set(current.allowedTargetLanguages || []);
      if (set.has(code)) set.delete(code);
      else set.add(code);
      const next = Array.from(set);
      return {
        ...current,
        allowedTargetLanguages: next,
        defaultTargetLanguage: next.includes(current.defaultTargetLanguage) ? current.defaultTargetLanguage : (next[0] || ''),
      };
    });
  };

  const toggleLanguage = (code) => {
    setProfileForm((current) => {
      const set = new Set(current.allowedTargetLanguages || []);
      if (set.has(code)) set.delete(code);
      else set.add(code);
      const next = Array.from(set);
      return {
        ...current,
        allowedTargetLanguages: next,
        defaultTargetLanguage: next.includes(current.defaultTargetLanguage) ? current.defaultTargetLanguage : (next[0] || ''),
      };
    });
  };

  const handleGroupCreate = async (event) => {
    event.preventDefault();
    if (!organization?._id || !groupForm.name.trim()) return;
    setSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.createInstitutionGroup(organization._id, groupForm);
      setGroupForm({ name: '', description: '', allowedTargetLanguages: [], defaultTargetLanguage: '' });
      setNotice(t('institution.groupSaved', 'Group saved.'));
      await loadDashboard(organization._id);
    } catch {
      setError(t('institution.groupSaveFailed', 'Could not save this group.'));
    } finally {
      setSaving(false);
    }
  };

  const handleProfileSave = async (event) => {
    event.preventDefault();
    if (!organization?._id) return;
    setSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.updateInstitutionProfile(organization._id, profileForm);
      setNotice(t('institution.profileSaved'));
      await loadDashboard(organization._id);
    } catch {
      setError(t('institution.profileFailed'));
    } finally {
      setSaving(false);
    }
  };

  const handleCertificateLogoSelect = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const mimeType = certificateLogoMimeFor(file);
    if (!mimeType || file.size > certificateLogoMaxBytes) {
      const message = t('institution.certificateLogoInvalid', 'Use a PNG, JPG, WebP, GIF, or SVG logo under 600 KB.');
      setError(message);
      setBrandingStatus({ kind: 'error', message });
      event.target.value = '';
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setCertificateLogoDisplayPreview(objectUrl);
    setCertificateLogoName(file.name);
    setError('');
    const selectedMessage = t('institution.certificateLogoSelected', '{{fileName}} selected. Preview it in the certificate card, then save the logo.', { fileName: file.name });
    setNotice(selectedMessage);
    setBrandingStatus({ kind: 'success', message: selectedMessage });

    const reader = new FileReader();
    reader.onload = () => {
      const normalizedDataUrl = normalizeLogoDataUrl(reader.result, mimeType);
      setCertificateLogoPreview(normalizedDataUrl);
      setCertificateLogoDisplayPreview((current) => {
        if (current && current.startsWith('blob:')) URL.revokeObjectURL(current);
        return normalizedDataUrl;
      });
      setError('');
      const readyMessage = t('institution.certificateLogoReady', '{{fileName}} is ready to save. The certificate card shows how it will appear.', { fileName: file.name });
      setNotice(readyMessage);
      setBrandingStatus({ kind: 'success', message: readyMessage });
    };
    reader.onerror = () => {
      setCertificateLogoDisplayPreview((current) => {
        if (current && current.startsWith('blob:')) URL.revokeObjectURL(current);
        return '';
      });
      setCertificateLogoPreview('');
      setCertificateLogoName('');
      const message = t('institution.certificateLogoReadFailed', 'Could not read that logo file. Please try a different image.');
      setError(message);
      setBrandingStatus({ kind: 'error', message });
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const saveCertificateBranding = async () => {
    if (!organization?._id || !certificateLogoPreview) return;
    setBrandingSaving(true);
    setNotice('');
    setError('');
    setBrandingStatus({ kind: '', message: '' });
    try {
      const res = await billingService.updateInstitutionCertificateBranding(organization._id, {
        logoDataUrl: certificateLogoPreview,
        logoOriginalName: certificateLogoName,
      });
      const savedBranding = res.data?.certificateBranding;
      if (savedBranding?.logoUrl) {
        setDashboard((current) => current ? {
          ...current,
          organization: {
            ...current.organization,
            certificateBranding: savedBranding,
          },
        } : current);
        setCertificateLogoDisplayPreview(savedBranding.logoUrl);
      }
      setCertificateLogoPreview('');
      setCertificateLogoName('');
      const savedMessage = t('institution.certificateBrandingSaved', 'Certificate branding saved.');
      setNotice(savedMessage);
      setBrandingStatus({ kind: 'success', message: savedMessage });
      await loadDashboard(organization._id);
    } catch (err) {
      const message = err.response?.data?.message || t('institution.certificateBrandingFailed', 'Could not save certificate branding. Use a PNG, JPG, WebP, GIF, or SVG logo under 600 KB.');
      setError(message);
      setBrandingStatus({ kind: 'error', message });
    } finally {
      setBrandingSaving(false);
    }
  };

  const removeCertificateBranding = async () => {
    if (!organization?._id) return;
    setBrandingSaving(true);
    setNotice('');
    setError('');
    setBrandingStatus({ kind: '', message: '' });
    try {
      await billingService.updateInstitutionCertificateBranding(organization._id, { removeLogo: true });
      setCertificateLogoPreview('');
      setCertificateLogoDisplayPreview('');
      setCertificateLogoName('');
      const removedMessage = t('institution.certificateBrandingRemoved', 'Certificate logo removed.');
      setNotice(removedMessage);
      setBrandingStatus({ kind: 'success', message: removedMessage });
      await loadDashboard(organization._id);
    } catch (err) {
      const message = err.response?.data?.message || t('institution.certificateBrandingRemoveFailed', 'Could not remove the certificate logo. Please try again.');
      setError(message);
      setBrandingStatus({ kind: 'error', message });
    } finally {
      setBrandingSaving(false);
    }
  };

  const previewSampleCertificate = async () => {
    if (!organization?._id) return;
    setNotice('');
    setError('');
    setBrandingStatus({ kind: '', message: '' });
    try {
      // Hand the just-picked logo to the preview window via localStorage.
      // sessionStorage doesn't work here: window.open(..., 'noopener,noreferrer')
      // creates a new browsing context that does NOT inherit the opener's
      // session storage (Chrome/Safari behavior), so the preview tab reads
      // null and falls back to the previously-saved logo. localStorage IS
      // shared across same-origin tabs, so we use it with a 5-minute TTL and
      // the preview tab clears the key after reading.
      const logoForPreview = certificateLogoPreview || organization?.certificateBranding?.logoUrl || '';
      window.localStorage.setItem(
        `institutionCertificatePreview:${organization._id}`,
        JSON.stringify({
          organizationName: organization.name,
          logoUrl: logoForPreview,
          createdAt: Date.now(),
        }),
      );
      const res = await certificateService.institutionSampleLink(organization._id);
      const previewPath = res.data?.previewPath;
      if (previewPath) {
        window.open(previewPath, '_blank', 'noopener,noreferrer');
        return;
      }
      const message = t('institution.sampleCertificateFailed', 'Could not open the sample certificate.');
      setError(message);
      setBrandingStatus({ kind: 'error', message });
    } catch {
      const message = t('institution.sampleCertificateFailed', 'Could not open the sample certificate.');
      setError(message);
      setBrandingStatus({ kind: 'error', message });
    }
  };

  const updateMember = async (member, changes) => {
    if (!organization?._id || !member?._id) return;
    setSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.updateInstitutionMember(organization._id, member._id, changes);
      setNotice(t('institution.memberUpdated'));
      await loadDashboard(organization._id);
    } catch (err) {
      setError(t('institution.memberUpdateFailed'));
    } finally {
      setSaving(false);
    }
  };

  const handleTopUp = async (event) => {
    event.preventDefault();
    if (!organization?._id) return;
    const quantity = Math.max(1, Math.floor(Number(topUpQuantity) || 0));
    if (!quantity) return;
    setTopUpSaving(true);
    setNotice('');
    setError('');
    try {
      const res = await billingService.topUpInstitutionSeats(organization._id, { quantity });
      setNotice(t(
        'institution.seatsToppedUp',
        '{{count}} seats added — wallet now {{available}} available.',
        { count: res.data.quantityAdded, available: res.data.seatsAvailable },
      ));
      await loadSeatData(organization._id);
    } catch {
      setError(t('institution.seatTopUpFailed', 'Could not top up seats.'));
    } finally {
      setTopUpSaving(false);
    }
  };

  const handleSuspend = async (member) => {
    if (!organization?._id || !member?._id) return;
    setSeatActionId(member._id);
    setNotice('');
    setError('');
    try {
      await billingService.suspendInstitutionMember(organization._id, member._id);
      setNotice(t('institution.memberSuspended', '{{name}} suspended — access continues until their seat expires.', { name: member.user?.username || member.email }));
      await Promise.all([loadDashboard(organization._id), loadSeatData(organization._id)]);
    } catch {
      setError(t('institution.memberSuspendFailed', 'Could not suspend this member.'));
    } finally {
      setSeatActionId('');
    }
  };

  const handleUnsuspend = async (member) => {
    if (!organization?._id || !member?._id) return;
    setSeatActionId(member._id);
    setNotice('');
    setError('');
    try {
      const res = await billingService.unsuspendInstitutionMember(organization._id, member._id);
      if (res?.status === 409) {
        setError(t('institution.unsuspendNoSeats', 'No seats available — buy more before unsuspending.'));
      } else {
        setNotice(t('institution.memberUnsuspended', '{{name}} reactivated.', { name: member.user?.username || member.email }));
        await Promise.all([loadDashboard(organization._id), loadSeatData(organization._id)]);
      }
    } catch (err) {
      if (err.response?.status === 409) {
        setError(t('institution.unsuspendNoSeats', 'No seats available — buy more before unsuspending.'));
      } else {
        setError(t('institution.memberUnsuspendFailed', 'Could not reactivate this member.'));
      }
    } finally {
      setSeatActionId('');
    }
  };

  const handleAutoRenewSave = async (event) => {
    event?.preventDefault?.();
    if (!organization?._id) return;
    setAutoRenewSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.updateAutoRenew(organization._id, {
        enabled: autoRenewForm.enabled,
        threshold: autoRenewForm.threshold,
        refillQuantity: autoRenewForm.refillQuantity,
        planId: autoRenewForm.planId || null,
      });
      setNotice(t('institution.autoRenewSaved', 'Auto-renew settings saved.'));
      await loadDashboard(organization._id);
    } catch {
      setError(t('institution.autoRenewFailed', 'Could not save auto-renew settings.'));
    } finally {
      setAutoRenewSaving(false);
    }
  };

  const loadSeatHistoryFor = async (member) => {
    if (!organization?._id || !member?._id) return;
    if (seatHistory.membershipId === member._id) {
      setSeatHistory({ membershipId: '', items: [], loading: false });
      return;
    }
    setSeatHistory({ membershipId: member._id, items: [], loading: true });
    try {
      const res = await billingService.getMemberSeatHistory(organization._id, member._id, 25);
      setSeatHistory({ membershipId: member._id, items: res.data?.seatAssignments || [], loading: false });
    } catch {
      setSeatHistory({ membershipId: '', items: [], loading: false });
      setError(t('institution.seatHistoryFailed', 'Could not load seat history.'));
    }
  };

  const pendingSuspensionRequests = useMemo(
    () => members.filter((m) => m.suspensionRequest?.requestedAt && !m.suspensionRequest?.handledAt),
    [members],
  );

  const currentCertificateLogo = certificateLogoDisplayPreview || certificateLogoPreview || organization?.certificateBranding?.logoUrl || '';

  if (loading) {
    return <div className="institution-page"><div className="loading">{t('common.loading')}</div></div>;
  }

  if (!dashboard || noAccess) {
    return (
      <main className="institution-page">
        <section className="institution-empty">
          <p className="institution-kicker">{t('institution.kicker')}</p>
          <h1>{t('institution.noAccessTitle')}</h1>
          <p>{error || t('institution.noAccessBody')}</p>
          <div className="institution-empty-actions">
            <button type="button" className="institution-primary" onClick={() => navigate('/pricing')}>
              {t('billing.viewPlans')}
            </button>
            <button type="button" className="institution-secondary" onClick={() => navigate('/contact')}>
              {t('contact.navLabel')}
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="institution-page">
      <section className="institution-hero">
        <div>
          <p className="institution-kicker">{t('institution.kicker')}</p>
          <h1>{organization?.name || t('institution.title')}</h1>
          <p>{t('institution.subtitle')}</p>
        </div>
        <div className="institution-hero-actions">
          {(dashboard.organizations || []).length > 1 && (
            <label className="institution-org-switcher">
              <span>{t('institution.organization')}</span>
              <select value={selectedOrganizationId} onChange={handleOrganizationChange}>
                {(dashboard.organizations || []).map((entry) => (
                  <option key={entry.organization._id} value={entry.organization._id}>
                    {entry.organization.name}
                  </option>
                ))}
              </select>
            </label>
          )}
          <button type="button" className="institution-secondary" onClick={() => loadDashboard(organization?._id)} disabled={loading}>
            <FiRefreshCw /> {t('common.refresh')}
          </button>
        </div>
      </section>

      {(notice || error) && (
        <div className={`institution-notice ${error ? 'error' : ''}`}>
          {error || notice}
        </div>
      )}

      <section className="institution-stats" aria-label={t('institution.overview')}>
        <article className="institution-stat">
          <FiUsers />
          <span>{t('institution.seatsAvailable', 'Seats available')}</span>
          <strong>{wallet?.totalAvailable ?? dashboard.seatUsage.remaining}</strong>
          <small>{t('institution.lifetimePurchased', '{{count}} lifetime purchased', { count: organization?.seatsPurchased || 0 })}</small>
        </article>
        <article className="institution-stat">
          <FiUserPlus />
          <span>{t('institution.learners')}</span>
          <strong>{dashboard.counts.learners}</strong>
          <small>{t('institution.invitedCount', { count: dashboard.seatUsage.invited })}</small>
        </article>
        <article className="institution-stat">
          <FiTrendingUp />
          <span>{t('institution.averageScore')}</span>
          <strong>{asPercent(dashboard.learningSummary.averageScore, t('institution.noScore'))}</strong>
          <small>{t('institution.progressRecords', { count: dashboard.learningSummary.progressRecords })}</small>
        </article>
        <article className="institution-stat">
          <FiCheckCircle />
          <span>{t('institution.classItems')}</span>
          <strong>{dashboard.learningSummary.completedClassItems}</strong>
          <small>{t('institution.totalXp', { count: dashboard.learningSummary.totalXP })}</small>
        </article>
      </section>

      {projection && projection.willAutoSuspendIfNoTopup > 0 && (
        <div className="institution-projection-banner" role="alert">
          <FiAlertTriangle />
          <div>
            <strong>{t('institution.projectionWarningTitle', 'Heads up — learners will lose access soon.')}</strong>
            <p>
              {t(
                'institution.projectionWarning',
                '{{count}} learners auto-renew in the next {{days}} days but you only have {{available}} seats. Top up to keep them learning.',
                {
                  count: projection.expiringInWindow,
                  days: projection.expiringInWindowDays,
                  available: projection.seatsAvailable,
                },
              )}
            </p>
          </div>
        </div>
      )}

      {canManage && wallet && (
        <section className="institution-seat-wallet" aria-label={t('institution.seatWallet', 'Seat wallet')}>
          <article className="institution-panel institution-wallet-summary">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker"><FiShoppingBag /> {t('institution.seatWallet', 'Seat wallet')}</p>
                <h2>{t('institution.seatWalletTitle', '{{count}} seats ready to assign', { count: wallet.totalAvailable })}</h2>
                <small>{t('institution.seatWalletHint', 'Each seat gives a learner 30 days of access once they start learning. Unused seats expire 365 days after purchase.')}</small>
              </div>
            </div>

            <form className="institution-topup-form" onSubmit={handleTopUp}>
              <label>
                <span>{t('institution.topUpQuantity', 'Add seats')}</span>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={topUpQuantity}
                  onChange={(event) => setTopUpQuantity(event.target.value)}
                />
              </label>
              <button type="submit" className="institution-primary" disabled={topUpSaving}>
                <FiPlus /> {topUpSaving ? t('common.saving') : t('institution.topUpButton', 'Top up')}
              </button>
            </form>

            <div className="institution-batch-list">
              {wallet.active.length === 0 && (
                <p className="institution-batch-empty">{t('institution.noActiveBatches', 'No seat packs in the wallet yet. Top up to start.')}</p>
              )}
              {wallet.active.map((batch) => {
                const shelfDays = daysUntil(batch.shelfExpiresAt);
                const isCritical = shelfDays != null && shelfDays <= 14;
                return (
                  <div key={batch._id} className={`institution-batch ${isCritical ? 'critical' : ''}`}>
                    <div>
                      <strong>{t('institution.batchRemaining', '{{remaining}} of {{quantity}} left', { remaining: batch.remaining, quantity: batch.quantity })}</strong>
                      <small>{seatBatchSourceLabel(batch.source)} · {localizedDate(batch.purchasedAt)}</small>
                    </div>
                    <div className="institution-batch-shelf">
                      <FiClock />
                      <span>
                        {shelfDays != null
                          ? t('institution.shelfDaysLeft', '{{count}} days until shelf expiry', { count: shelfDays })
                          : '—'}
                      </span>
                      {batch.pricePerSeatCents != null && <small>{formatCents(batch.pricePerSeatCents)}/seat</small>}
                    </div>
                  </div>
                );
              })}
              {wallet.shelfExpired.length > 0 && (
                <details className="institution-batch-stale">
                  <summary>{t('institution.shelfExpiredBatches', '{{count}} expired packs', { count: wallet.shelfExpired.length })}</summary>
                  {wallet.shelfExpired.map((batch) => (
                    <div key={batch._id} className="institution-batch shelf-expired">
                      <div>
                        <strong>{t('institution.unusedSeats', '{{count}} unused', { count: batch.quantity - batch.consumedCount })}</strong>
                        <small>
                          {seatBatchSourceLabel(batch.source)}
                          {' '}
                          {t('institution.purchasedOn', 'purchased {{date}}', { date: localizedDate(batch.purchasedAt) })}
                        </small>
                      </div>
                      <span>{t('institution.shelfExpired', 'Expired')}</span>
                    </div>
                  ))}
                </details>
              )}
            </div>
          </article>

          <article className="institution-panel institution-autorenew">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker"><FiZap /> {t('institution.autoRenew', 'Auto-renew')}</p>
                <h2>{t('institution.autoRenewTitle', 'Refill automatically when seats get low')}</h2>
                <small>
                  {organization?.autoRenew?.paymentMethodId
                    ? <><FiCreditCard /> {t('institution.cardOnFile', 'Card on file — Stripe will charge when triggered.')}</>
                    : t('institution.noCardOnFile', 'No card on file yet. Buy seats once via checkout to save a card.')}
                </small>
              </div>
              <label className="institution-toggle">
                <input
                  type="checkbox"
                  checked={autoRenewForm.enabled}
                  onChange={(event) => setAutoRenewForm((current) => ({ ...current, enabled: event.target.checked }))}
                />
                <span>{autoRenewForm.enabled ? t('institution.enabled', 'On') : t('institution.disabled', 'Off')}</span>
              </label>
            </div>

            <form className="institution-autorenew-form" onSubmit={handleAutoRenewSave}>
              <label>
                <span>{t('institution.autoRenewThreshold', 'Trigger when available seats fall to or below')}</span>
                <input
                  type="number"
                  min="0"
                  value={autoRenewForm.threshold}
                  onChange={(event) => setAutoRenewForm((current) => ({ ...current, threshold: event.target.value }))}
                  disabled={!autoRenewForm.enabled}
                />
              </label>
              <label>
                <span>{t('institution.autoRenewRefill', 'Refill quantity')}</span>
                <input
                  type="number"
                  min="1"
                  value={autoRenewForm.refillQuantity}
                  onChange={(event) => setAutoRenewForm((current) => ({ ...current, refillQuantity: event.target.value }))}
                  disabled={!autoRenewForm.enabled}
                />
              </label>
              <button type="submit" className="institution-primary" disabled={autoRenewSaving}>
                {autoRenewSaving ? t('common.saving') : t('common.save')}
              </button>
            </form>

            {organization?.autoRenew?.lastError && (
              <p className="institution-autorenew-error">
                <FiAlertTriangle /> {t('institution.autoRenewLastError', 'Last attempt failed: {{error}} ({{when}})', {
                  error: organization.autoRenew.lastError,
                  when: localizedDate(organization.autoRenew.lastErrorAt, '—'),
                })}
              </p>
            )}
          </article>
        </section>
      )}

      {canManage && pendingSuspensionRequests.length > 0 && (
        <section className="institution-suspension-requests">
          <article className="institution-panel">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker"><FiPauseCircle /> {t('institution.suspensionRequests', 'Suspension requests')}</p>
                <h2>{t('institution.suspensionRequestsTitle', '{{count}} learner(s) asked to pause', { count: pendingSuspensionRequests.length })}</h2>
              </div>
            </div>
            <div className="institution-request-list">
              {pendingSuspensionRequests.map((member) => (
                <div key={member._id} className="institution-request-row">
                  <div>
                    <strong>{member.user?.username || member.email}</strong>
                    <small>{localizedDate(member.suspensionRequest.requestedAt, '—')}</small>
                    {member.suspensionRequest.note && <p>{member.suspensionRequest.note}</p>}
                  </div>
                  <div className="institution-request-actions">
                    <button
                      type="button"
                      className="institution-primary"
                      onClick={() => handleSuspend(member)}
                      disabled={seatActionId === member._id}
                    >
                      {t('institution.approveSuspension', 'Approve & suspend')}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      )}

      <section className="institution-grid">
        <article className="institution-panel institution-members">
          <div className="institution-panel-head">
            <div>
              <p className="institution-kicker">{t('institution.people')}</p>
              <h2>{t('institution.membersTitle')}</h2>
            </div>
            <span>{t('institution.activeLearners', { count: activeLearners.length })}</span>
          </div>

          {canManage && (
            <form className="institution-invite-form" onSubmit={handleInvite}>
              <label>
                <span>{t('pricing.email')}</span>
                <input
                  type="email"
                  value={inviteForm.email}
                  onChange={(event) => setInviteForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder={t('institution.memberEmailPlaceholder')}
                  required
                />
              </label>
              {(dashboard.groups || []).length > 0 && (
                <label>
                  <span>{t('institution.group', 'Group')}</span>
                  <select
                    value={inviteForm.groupId}
                    onChange={(event) => setInviteForm((current) => ({ ...current, groupId: event.target.value }))}
                  >
                    <option value="">{t('institution.noGroup', 'No group')}</option>
                    {(dashboard.groups || []).map((group) => (
                      <option key={group._id} value={group._id}>{group.name}</option>
                    ))}
                  </select>
                </label>
              )}
              <label>
                <span>{t('institution.role')}</span>
                <select
                  value={inviteForm.role}
                  onChange={(event) => setInviteForm((current) => ({ ...current, role: event.target.value }))}
                >
                  {roleOptions.map((role) => (
                    <option key={role} value={role}>{t(`institution.roles.${role}`)}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="institution-primary" disabled={saving}>
                <FiMail /> {saving ? t('common.saving') : t('institution.addMember')}
              </button>
            </form>
          )}

          <div className="institution-member-table with-seat">
            <div className="institution-member-row header with-seat">
              <span>{t('institution.member')}</span>
              <span>{t('institution.role')}</span>
              <span>{t('institution.status')}</span>
              <span>{t('institution.seat', 'Seat')}</span>
              <span>{t('institution.progress')}</span>
              <span>{t('institution.lastActive')}</span>
            </div>
            {members.map((member) => {
              const selected = selectedMemberId === member._id;
              return (
                <React.Fragment key={member._id}>
                  <div
                    className={`institution-member-row clickable ${selected ? 'selected' : ''}`}
                    role="button"
                    tabIndex={0}
                    aria-expanded={selected}
                    onClick={() => setSelectedMemberId(selected ? '' : member._id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        setSelectedMemberId(selected ? '' : member._id);
                      }
                    }}
                  >
                    <span>
                      <strong>{member.user?.username || member.email}</strong>
                      <small>{member.user?.email || member.email}</small>
                    </span>
                    <span onClick={(event) => event.stopPropagation()}>
                      {canManage ? (
                        <div className="institution-member-controls">
                          <select value={member.role} onChange={(event) => updateMember(member, { role: event.target.value })} disabled={saving}>
                            {roleOptionsForMember(member).map((role) => (
                              <option key={role} value={role}>{t(`institution.roles.${role}`)}</option>
                            ))}
                          </select>
                          {(dashboard.groups || []).length > 0 && (
                            <select
                              value={member.groupId?._id || member.groupId || ''}
                              onChange={(event) => updateMember(member, { groupId: event.target.value })}
                              disabled={saving}
                            >
                              <option value="">{t('institution.noGroup', 'No group')}</option>
                              {(dashboard.groups || []).map((group) => (
                                <option key={group._id} value={group._id}>{group.name}</option>
                              ))}
                            </select>
                          )}
                        </div>
                      ) : t(`institution.roles.${member.role}`, member.role)}
                      {!canManage && member.groupId?.name && <small>{member.groupId.name}</small>}
                    </span>
                    <span onClick={(event) => event.stopPropagation()}>
                      {canManage ? (
                        <select value={member.status} onChange={(event) => updateMember(member, { status: event.target.value })} disabled={saving}>
                          {statusOptions.map((status) => (
                            <option key={status} value={status}>{t(`institution.statuses.${status}`, status)}</option>
                          ))}
                        </select>
                      ) : t(`institution.statuses.${member.status}`, member.status)}
                    </span>
                    <span className="institution-seat-cell" onClick={(event) => event.stopPropagation()}>
                      {renderSeatCell(member)}
                    </span>
                    <span>
                      <strong>{asPercent(member.learnerSummary.averageScore, t('institution.noScore'))}</strong>
                      <small>{t('institution.completedItemsShort', { count: member.learnerSummary.completedClassItems })}</small>
                    </span>
                    <span>{localizedDate(member.user?.lastActive || member.learnerSummary.lastStudiedAt, t('profilePage.unknown'))}</span>
                  </div>
                  {selected && renderMemberProgressDetail(member)}
                  {seatHistory.membershipId === member._id && (
                    <div className="institution-seat-history">
                      <div className="institution-seat-history-head">
                        <strong>{t('institution.seatHistoryTitle', 'Seat history')}</strong>
                        <button type="button" className="institution-link" onClick={() => setSeatHistory({ membershipId: '', items: [], loading: false })}>
                          {t('common.close', 'Close')}
                        </button>
                      </div>
                      {seatHistory.loading ? (
                        <p>{t('common.loading')}</p>
                      ) : seatHistory.items.length === 0 ? (
                        <p>{t('institution.noSeatHistory', 'No seats have been allocated to this learner yet.')}</p>
                      ) : (
                        <ul>
                          {seatHistory.items.map((item) => (
                            <li key={item._id}>
                              <strong>{item.state}</strong>
                              <span>
                                {localizedDate(item.activatedAt, '—')} → {localizedDate(item.expiresAt, '—')}
                                {item.endReason ? ` · ${item.endReason}` : ''}
                              </span>
                              <small>{t('institution.seatTrigger', 'Triggered by {{trigger}}', { trigger: item.triggeredBy || '—' })}</small>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </article>

        <aside className="institution-side">
          <article className="institution-panel">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker">{t('institution.profile')}</p>
                <h2>{t('institution.profileTitle')}</h2>
              </div>
              <FiEdit3 />
            </div>
            <form className="institution-profile-form" onSubmit={handleProfileSave}>
              <label>
                <span>{t('pricing.organizationName')}</span>
                <input value={profileForm.name} onChange={(event) => setProfileForm((current) => ({ ...current, name: event.target.value }))} disabled={!canManage} />
              </label>
              <label>
                <span>{t('pricing.organizationType')}</span>
                <select value={profileForm.type} onChange={(event) => setProfileForm((current) => ({ ...current, type: event.target.value }))} disabled={!canManage}>
                  {organizationTypes.map((type) => (
                    <option key={type} value={type}>{t(`pricing.organizationTypes.${type}`)}</option>
                  ))}
                </select>
              </label>
              <label>
                <span>{t('institution.billingEmail')}</span>
                <input type="email" value={profileForm.billingEmail} onChange={(event) => setProfileForm((current) => ({ ...current, billingEmail: event.target.value }))} disabled={!canManage} />
              </label>
              <label>
                <span>{t('pricing.message')}</span>
                <textarea value={profileForm.notes} onChange={(event) => setProfileForm((current) => ({ ...current, notes: event.target.value }))} disabled={!canManage} rows={4} />
              </label>
              <div className="institution-language-policy">
                <div>
                  <span>{t('institution.allowedTargetLanguages', 'Allowed target languages')}</span>
                  <p>{t('institution.allowedTargetLanguagesHelp', 'Learners using this institution access can choose only these target languages.')}</p>
                </div>
                <div className="institution-language-grid">
                  {languageCodes.map((code) => {
                    const active = (profileForm.allowedTargetLanguages || []).includes(code);
                    return (
                      <button
                        type="button"
                        key={code}
                        className={active ? 'active' : ''}
                        disabled={!canManage}
                        onClick={() => toggleLanguage(code)}
                        aria-pressed={active}
                      >
                        <span>{getLanguageDisplayName(code, t)}</span>
                        {active && <span className="institution-language-selected" aria-hidden="true">✓</span>}
                      </button>
                    );
                  })}
                </div>
                <label>
                  <span>{t('institution.defaultTargetLanguage', 'Default target language')}</span>
                  <select
                    value={profileForm.defaultTargetLanguage}
                    onChange={(event) => setProfileForm((current) => ({ ...current, defaultTargetLanguage: event.target.value }))}
                    disabled={!canManage}
                  >
                    <option value="">{t('institution.noDefaultLanguage', 'No default')}</option>
                    {(profileForm.allowedTargetLanguages || []).map((code) => (
                      <option key={code} value={code}>{getLanguageDisplayName(code, t)}</option>
                    ))}
                  </select>
                </label>
                <label className="institution-inline-check">
                  <input
                    type="checkbox"
                    checked={profileForm.allowLanguageRequests}
                    onChange={(event) => setProfileForm((current) => ({ ...current, allowLanguageRequests: event.target.checked }))}
                    disabled={!canManage}
                  />
                  <span>{t('institution.allowLanguageRequests', 'Allow learners to request another language')}</span>
                </label>
              </div>
              {canManage && (
                <button type="submit" className="institution-primary" disabled={saving}>
                  {saving ? t('common.saving') : t('common.save')}
                </button>
              )}
            </form>
          </article>

          {canManage && (
            <article className="institution-panel">
              <div className="institution-panel-head">
                <div>
                  <p className="institution-kicker">{t('institution.certificateBrandingKicker', 'Certificates')}</p>
                  <h2>{t('institution.certificateBrandingTitle', 'Certificate branding')}</h2>
                </div>
                <FiImage />
              </div>
              <div className="institution-certificate-branding">
                <div className="institution-certificate-preview">
                  <div className="institution-certificate-logo-preview">
                    {currentCertificateLogo ? (
                      <img
                        src={currentCertificateLogo}
                        alt={t('certificates.institutionLogoAlt', '{{organization}} logo', { organization: organization?.name || '' })}
                      />
                    ) : (
                      <span>{organizationInitials(organization?.name)}</span>
                    )}
                  </div>
                  <div>
                    <span>{t('certificates.issuedThrough', 'Issued through')}</span>
                    <strong>{organization?.name}</strong>
                    {certificateLogoName && (
                      <em className="institution-certificate-selected-logo">
                        {t('institution.selectedCertificateLogo', 'Selected logo: {{fileName}}', { fileName: certificateLogoName })}
                      </em>
                    )}
                    <small>
                      {t(
                        'institution.certificateBrandingHelp',
                        'Institution certificates use the same design as personal certificates, with this logo and institution name added.',
                      )}
                    </small>
                  </div>
                </div>

                <label className="institution-file-button">
                  <FiUpload />
                  <span>{certificateLogoName || t('institution.chooseCertificateLogo', 'Choose logo')}</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp,image/gif,image/svg+xml,.png,.jpg,.jpeg,.webp,.gif,.svg"
                    onChange={handleCertificateLogoSelect}
                  />
                </label>

                <div className="institution-branding-actions">
                  <button
                    type="button"
                    className="institution-primary"
                    onClick={saveCertificateBranding}
                    disabled={brandingSaving || !certificateLogoPreview}
                  >
                    {brandingSaving ? t('common.saving', 'Saving...') : t('institution.saveCertificateBranding', 'Save certificate logo')}
                  </button>
                  <button
                    type="button"
                    className="institution-secondary"
                    onClick={removeCertificateBranding}
                    disabled={brandingSaving || !organization?.certificateBranding?.logoUrl}
                  >
                    <FiTrash2 /> {t('institution.removeCertificateLogo', 'Remove logo')}
                  </button>
                  <button
                    type="button"
                    className="institution-secondary"
                    onClick={previewSampleCertificate}
                    disabled={brandingSaving || !organization?._id}
                  >
                    <FiAward /> {t('institution.previewSampleCertificate', 'Preview sample certificate')}
                  </button>
                </div>
                {brandingStatus.message && (
                  <div
                    className={`institution-branding-status ${brandingStatus.kind}`}
                    role={brandingStatus.kind === 'error' ? 'alert' : 'status'}
                    aria-live={brandingStatus.kind === 'error' ? 'assertive' : 'polite'}
                  >
                    {brandingStatus.kind === 'error' ? <FiAlertTriangle /> : null}
                    <span>{brandingStatus.message}</span>
                  </div>
                )}
                <p className="institution-branding-note">
                  {t('institution.certificateLogoRequirement', 'Use a clean PNG, JPG, WebP, GIF, or SVG logo under 600 KB. Transparent logos usually look best.')}
                </p>
              </div>
            </article>
          )}

          {canManage && (
            <article className="institution-panel">
              <div className="institution-panel-head">
                <div>
                  <p className="institution-kicker">{t('institution.groupsKicker', 'Groups')}</p>
                  <h2>{t('institution.groupsTitle', 'Learning groups')}</h2>
                </div>
                <FiUsers />
              </div>
              <div className="institution-group-list">
                {(dashboard.groups || []).length === 0 && (
                  <p>{t('institution.noGroupsYet', 'Create a group to manage language access for a class, cohort, or team.')}</p>
                )}
                {(dashboard.groups || []).map((group) => (
                  <div key={group._id} className="institution-group-card">
                    <strong>{group.name}</strong>
                    {group.description && <span>{group.description}</span>}
                    <small>
                      {(group.allowedTargetLanguages || []).length
                        ? (group.allowedTargetLanguages || []).map((code) => getLanguageDisplayName(code, t)).join(', ')
                        : t('institution.groupUsesOrgPolicy', 'Uses organization language policy')}
                    </small>
                  </div>
                ))}
              </div>
              <form className="institution-group-form" onSubmit={handleGroupCreate}>
                <label>
                  <span>{t('institution.groupName', 'Group name')}</span>
                  <input
                    value={groupForm.name}
                    onChange={(event) => setGroupForm((current) => ({ ...current, name: event.target.value }))}
                    placeholder={t('institution.groupNamePlaceholder', 'Example: Beginner evening class')}
                    required
                  />
                </label>
                <label>
                  <span>{t('pricing.message')}</span>
                  <textarea
                    value={groupForm.description}
                    onChange={(event) => setGroupForm((current) => ({ ...current, description: event.target.value }))}
                    rows={3}
                  />
                </label>
                <div className="institution-language-policy">
                  <div>
                    <span>{t('institution.groupLanguages', 'Group target languages')}</span>
                    <p>{t('institution.groupLanguagesHelp', 'Leave empty to use the organization policy, or select languages for this group only.')}</p>
                  </div>
                  <div className="institution-language-grid">
                    {languageCodes.map((code) => {
                      const active = (groupForm.allowedTargetLanguages || []).includes(code);
                      return (
                        <button
                          type="button"
                          key={code}
                          className={active ? 'active' : ''}
                          onClick={() => toggleGroupLanguage(code)}
                          aria-pressed={active}
                        >
                          <span>{getLanguageDisplayName(code, t)}</span>
                          {active && <span className="institution-language-selected" aria-hidden="true">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <button type="submit" className="institution-primary" disabled={saving || !groupForm.name.trim()}>
                  <FiPlus /> {saving ? t('common.saving') : t('institution.createGroup', 'Create group')}
                </button>
              </form>
            </article>
          )}

          <article className="institution-panel">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker">{t('institution.testingKicker', 'Level checks')}</p>
                <h2>{t('institution.testingTitle', 'Tests and certificates')}</h2>
              </div>
            </div>
            <div className="institution-test-list">
              <div>
                <span>{t('institution.recentAttempts', 'Recent attempts')}</span>
                <strong>{dashboard.testing?.attempts?.length || 0}</strong>
              </div>
              <div>
                <span>{t('institution.certificatesIssued', 'Certificates issued')}</span>
                <strong>{dashboard.testing?.certificates?.length || 0}</strong>
              </div>
            </div>
            <div className="institution-recent-list">
              {(dashboard.testing?.attempts || []).slice(0, 5).map((attempt) => (
                <div key={attempt._id}>
                  <strong>{attempt.user?.username || attempt.user?.email || t('institution.learner', 'Learner')}</strong>
                  <span>
                    {t('levelTests.levelLabel', 'Level {{level}}', { level: attempt.level })} - {attempt.score}% - {attempt.passed ? t('levelTests.passed', 'Passed') : t('levelTests.reviewRecommended', 'Review recommended')}
                  </span>
                </div>
              ))}
              {!(dashboard.testing?.attempts || []).length && <p>{t('institution.noTestAttempts', 'No level checks submitted yet.')}</p>}
            </div>
          </article>

          <article className="institution-panel">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker">{t('billing.kicker')}</p>
                <h2>{t('institution.planTitle')}</h2>
              </div>
              <FiBriefcase />
            </div>
            <div className="institution-plan-list">
              <div><span>{t('billing.currentPlan')}</span><strong>{t(`pricing.planNames.${organization.planId}`, organization.planId)}</strong></div>
              <div><span>{t('institution.status')}</span><strong>{t(`institution.orgStatuses.${organization.status}`, organization.status)}</strong></div>
              <div><span>{t('billing.sources.institution')}</span><strong>{organization.effectiveTier?.toUpperCase()}</strong></div>
              <div><span>{t('billing.noRenewalDate')}</span><strong>{localizedDate(organization.expiresAt, t('billing.noRenewalDate'))}</strong></div>
            </div>
            <button type="button" className="institution-secondary full" onClick={() => navigate('/pricing')}>
              {t('billing.viewPlans')}
            </button>
          </article>

          <article className="institution-panel">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker">{t('institution.recent')}</p>
                <h2>{t('institution.recentLearners')}</h2>
              </div>
            </div>
            <div className="institution-recent-list">
              {(dashboard.recentLearners || []).length === 0 && <p>{t('institution.noRecentLearners')}</p>}
              {(dashboard.recentLearners || []).map((member) => (
                <div key={member._id}>
                  <strong>{member.user?.username || member.email}</strong>
                  <span>{localizedDate(member.user?.lastActive || member.learnerSummary.lastStudiedAt, t('profilePage.unknown'))}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="institution-panel">
            <div className="institution-panel-head">
              <div>
                <p className="institution-kicker">{t('institution.snapshotsKicker', 'Learner snapshots')}</p>
                <h2>{t('institution.needsHelpTitle', 'Needs attention')}</h2>
              </div>
            </div>
            <div className="institution-recent-list">
              {(dashboard.needsHelpLearners || []).length === 0 && <p>{t('institution.noNeedsHelpLearners', 'No learners currently need extra attention.')}</p>}
              {(dashboard.needsHelpLearners || []).map((member) => (
                <div key={`needs-${member._id}`}>
                  <strong>{member.user?.username || member.email}</strong>
                  <span>
                    {(member.learnerSnapshot?.reasons || []).map((reason) => t(`institution.snapshotReasons.${reason}`, reason)).join(' - ')}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </aside>
      </section>
    </main>
  );
}

export default InstitutionDashboard;
