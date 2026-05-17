import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiBriefcase, FiCheckCircle, FiEdit3, FiMail, FiRefreshCw, FiTrendingUp, FiUserPlus, FiUsers } from 'react-icons/fi';
import { billingService } from '../services/api';
import './InstitutionDashboard.css';

const roleOptions = ['learner', 'teacher', 'admin', 'owner'];
const statusOptions = ['active', 'invited', 'removed'];
const organizationTypes = ['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'];

function formatDate(value, fallback, locale) {
  if (!value) return fallback;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return fallback;
  return date.toLocaleDateString(locale || undefined);
}

function asPercent(value, fallback) {
  return Number.isFinite(value) ? `${value}%` : fallback;
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
  const [inviteForm, setInviteForm] = useState({ email: '', role: 'learner' });
  const [profileForm, setProfileForm] = useState({ name: '', type: 'other', billingEmail: '', notes: '' });

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
        setProfileForm({
          name: nextOrg.name || '',
          type: nextOrg.type || 'other',
          billingEmail: nextOrg.billingEmail || '',
          notes: nextOrg.notes || '',
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
      setInviteForm({ email: '', role: 'learner' });
      setNotice(t('institution.memberAdded'));
      await loadDashboard(organization._id);
    } catch {
      setError(t('institution.memberAddFailed'));
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
                    <select value={member.role} onChange={(event) => updateMember(member, { role: event.target.value })} disabled={saving}>
                      {roleOptions.map((role) => (
                        <option key={role} value={role}>{t(`institution.roles.${role}`)}</option>
                      ))}
                    </select>
                  ) : t(`institution.roles.${member.role}`, member.role)}
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
              {canManage && (
                <button type="submit" className="institution-primary" disabled={saving}>
                  {saving ? t('common.saving') : t('common.save')}
                </button>
              )}
            </form>
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
                    {(member.learnerSnapshot?.reasons || []).map((reason) => t(`institution.snapshotReasons.${reason}`, reason)).join(' · ')}
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
