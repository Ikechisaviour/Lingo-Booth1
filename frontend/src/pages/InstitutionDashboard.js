import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  FiBriefcase,
  FiCheckCircle,
  FiEdit3,
  FiImage,
  FiMail,
  FiPlus,
  FiRefreshCw,
  FiTrash2,
  FiTrendingUp,
  FiUpload,
  FiUserPlus,
  FiUsers,
} from 'react-icons/fi';
import { billingService } from '../services/api';
import LANGUAGES, { getLanguageDisplayName } from '../config/languages';
import './InstitutionDashboard.css';

const roleOptions = ['learner', 'teacher', 'admin', 'owner'];
const statusOptions = ['active', 'invited', 'removed'];
const organizationTypes = ['school', 'company', 'religious', 'language_center', 'nonprofit', 'government', 'other'];
const languageCodes = Object.keys(LANGUAGES);
const certificateLogoTypes = ['image/png', 'image/jpeg', 'image/webp'];
const certificateLogoMaxBytes = 600 * 1024;

function formatDate(value, fallback, locale) {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString(locale || undefined);
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
  const [certificateLogoName, setCertificateLogoName] = useState('');
  const [brandingSaving, setBrandingSaving] = useState(false);

  const organization = dashboard?.organization || null;
  const canManage = !!dashboard?.currentMembership?.canManage;
  const members = useMemo(() => dashboard?.members || [], [dashboard?.members]);
  const activeLearners = useMemo(
    () => members.filter((member) => member.role === 'learner' && member.status === 'active'),
    [members],
  );
  const locale = i18n.resolvedLanguage || i18n.language || undefined;
  const localizedDate = (value, fallback) => formatDate(value, fallback, locale);

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
    if (!certificateLogoTypes.includes(file.type) || file.size > certificateLogoMaxBytes) {
      setError(t('institution.certificateLogoInvalid', 'Use a PNG, JPG, or WebP logo under 600 KB.'));
      event.target.value = '';
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setCertificateLogoPreview(String(reader.result || ''));
      setCertificateLogoName(file.name);
      setError('');
      setNotice('');
    };
    reader.onerror = () => {
      setError(t('institution.certificateLogoReadFailed', 'Could not read that logo file.'));
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };

  const saveCertificateBranding = async () => {
    if (!organization?._id || !certificateLogoPreview) return;
    setBrandingSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.updateInstitutionCertificateBranding(organization._id, {
        logoDataUrl: certificateLogoPreview,
        logoOriginalName: certificateLogoName,
      });
      setNotice(t('institution.certificateBrandingSaved', 'Certificate branding saved.'));
      await loadDashboard(organization._id);
    } catch (err) {
      setError(t('institution.certificateBrandingFailed', 'Could not save certificate branding. Use a PNG, JPG, or WebP logo under 600 KB.'));
    } finally {
      setBrandingSaving(false);
    }
  };

  const removeCertificateBranding = async () => {
    if (!organization?._id) return;
    setBrandingSaving(true);
    setNotice('');
    setError('');
    try {
      await billingService.updateInstitutionCertificateBranding(organization._id, { removeLogo: true });
      setCertificateLogoPreview('');
      setCertificateLogoName('');
      setNotice(t('institution.certificateBrandingRemoved', 'Certificate logo removed.'));
      await loadDashboard(organization._id);
    } catch (err) {
      setError(t('institution.certificateBrandingFailed', 'Could not save certificate branding. Use a PNG, JPG, or WebP logo under 600 KB.'));
    } finally {
      setBrandingSaving(false);
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

  const currentCertificateLogo = certificateLogoPreview || organization?.certificateBranding?.logoUrl || '';

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
          <span>{t('institution.seatsUsed')}</span>
          <strong>{dashboard.seatUsage.used}/{dashboard.seatUsage.purchased}</strong>
          <small>{t('institution.remainingSeats', { count: dashboard.seatUsage.remaining })}</small>
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

          <div className="institution-member-table">
            <div className="institution-member-row header">
              <span>{t('institution.member')}</span>
              <span>{t('institution.role')}</span>
              <span>{t('institution.status')}</span>
              <span>{t('institution.progress')}</span>
              <span>{t('institution.lastActive')}</span>
            </div>
            {members.map((member) => (
              <div key={member._id} className="institution-member-row">
                <span>
                  <strong>{member.user?.username || member.email}</strong>
                  <small>{member.user?.email || member.email}</small>
                </span>
                <span>
                  {canManage ? (
                    <div className="institution-member-controls">
                      <select value={member.role} onChange={(event) => updateMember(member, { role: event.target.value })} disabled={saving}>
                        {roleOptions.map((role) => (
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
                <span>
                  {canManage ? (
                    <select value={member.status} onChange={(event) => updateMember(member, { status: event.target.value })} disabled={saving}>
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{t(`institution.statuses.${status}`)}</option>
                      ))}
                    </select>
                  ) : t(`institution.statuses.${member.status}`, member.status)}
                </span>
                <span>
                  <strong>{asPercent(member.learnerSummary.averageScore, t('institution.noScore'))}</strong>
                  <small>{t('institution.completedItemsShort', { count: member.learnerSummary.completedClassItems })}</small>
                </span>
                <span>{localizedDate(member.user?.lastActive || member.learnerSummary.lastStudiedAt, t('profilePage.unknown'))}</span>
              </div>
            ))}
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
                      >
                        {getLanguageDisplayName(code, t)}
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
                    accept="image/png,image/jpeg,image/webp"
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
                </div>
                <p className="institution-branding-note">
                  {t('institution.certificateLogoRequirement', 'Use a clean PNG, JPG, or WebP logo under 600 KB. Transparent logos usually look best.')}
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
                        >
                          {getLanguageDisplayName(code, t)}
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
