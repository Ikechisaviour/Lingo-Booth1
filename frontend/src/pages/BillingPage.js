import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiBriefcase, FiClock, FiCreditCard, FiPauseCircle, FiShield, FiUsers } from 'react-icons/fi';
import { billingService } from '../services/api';
import './BillingPage.css';

function daysUntil(value) {
  if (!value) return null;
  const ms = new Date(value).getTime() - Date.now();
  if (!Number.isFinite(ms)) return null;
  return Math.max(0, Math.ceil(ms / (24 * 60 * 60 * 1000)));
}

function BillingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [requestNote, setRequestNote] = useState('');
  const [requestSaving, setRequestSaving] = useState(false);

  useEffect(() => {
    let active = true;
    billingService.getAccount()
      .then((res) => {
        if (active) setAccount(res.data || null);
      })
      .catch((error) => {
        if (active) setNotice(error.response?.data?.message || t('billing.loadFailed'));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [t]);

  const summary = account?.subscription || account?.entitlements?.subscription || {};
  const tier = summary.subscriptionTier || account?.entitlements?.subscriptionTier || localStorage.getItem('subscriptionTier') || 'free';
  const source = summary.billingSource || account?.entitlements?.billingSource || 'default';
  const memberships = useMemo(() => account?.memberships || [], [account?.memberships]);
  const subscriptions = account?.subscriptions || [];
  const activeMembership = useMemo(
    () => memberships.find((membership) => ['active', 'trialing'].includes(String(membership.organizationId?.status || membership.status || '').toLowerCase())),
    [memberships],
  );
  const locale = i18n.resolvedLanguage || i18n.language || undefined;
  const formatBillingDate = (value) => {
    if (!value) return t('billing.noRenewalDate');
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return t('billing.noRenewalDate');
    return date.toLocaleDateString(locale);
  };

  const currentSeat = account?.currentSeat || null;
  const learnerMembership = useMemo(
    () => memberships.find((membership) => membership.role === 'learner' && ['active', 'suspended'].includes(membership.status)),
    [memberships],
  );

  const handleRequestSuspension = async () => {
    if (!learnerMembership?.organizationId?._id || !learnerMembership?._id) return;
    setRequestSaving(true);
    setNotice('');
    try {
      await billingService.requestSeatSuspension(
        learnerMembership.organizationId._id,
        learnerMembership._id,
        { note: requestNote.trim() },
      );
      setNotice(t('billing.suspensionRequested', 'Your suspension request was sent to your institution admin.'));
      setRequestOpen(false);
      setRequestNote('');
    } catch (err) {
      setNotice(t('billing.suspensionRequestFailed', 'Could not send suspension request. Try again later.'));
    } finally {
      setRequestSaving(false);
    }
  };

  const handlePortal = async () => {
    setNotice('');
    try {
      setPortalLoading(true);
      const res = await billingService.openCustomerPortal(`${window.location.origin}/billing`);
      if (res.data?.portalUrl) {
        window.location.assign(res.data.portalUrl);
        return;
      }
      if (res.data?.requiresSetup) {
        setNotice(t('billing.portalSetupNeeded'));
      }
    } catch (error) {
      setNotice(error.response?.data?.message || t('billing.portalFailed'));
    } finally {
      setPortalLoading(false);
    }
  };

  if (loading) {
    return <div className="billing-page"><div className="loading">{t('common.loading')}</div></div>;
  }

  return (
    <div className="billing-page">
      <section className="billing-hero">
        <div>
          <p className="billing-kicker">{t('billing.kicker')}</p>
          <h1>{t('billing.title')}</h1>
          <p>{t('billing.subtitle')}</p>
        </div>
        <button type="button" className="billing-primary" onClick={() => navigate('/pricing')}>
          {t('billing.viewPlans')} <FiArrowRight />
        </button>
      </section>

      {notice && <div className="billing-notice">{notice}</div>}

      <section className="billing-grid">
        <article className="billing-card billing-current">
          <FiShield />
          <div>
            <span>{t('billing.currentPlan')}</span>
            <strong>{tier.toUpperCase()}</strong>
            <p>{t(`billing.sources.${source}`, source)}</p>
          </div>
        </article>
        <article className="billing-card">
          <FiCreditCard />
          <div>
            <span>{t('billing.personalBilling')}</span>
            <strong>{summary.personalSubscription?.status ? t(`adminBilling.statuses.${summary.personalSubscription.status}`, summary.personalSubscription.status) : t('billing.noPaidSubscription')}</strong>
            <p>{summary.personalSubscription?.cancelAtPeriodEnd ? t('billing.cancelsAtPeriodEnd') : t('billing.personalBillingHint')}</p>
          </div>
        </article>
        <article className="billing-card">
          <FiUsers />
          <div>
            <span>{t('billing.institutionAccess')}</span>
            <strong>{summary.institutionalAccess?.organizationName || activeMembership?.organizationId?.name || t('billing.none')}</strong>
            <p>{summary.institutionalAccess?.role ? t('billing.roleLabel', { role: summary.institutionalAccess.role }) : t('billing.institutionHint')}</p>
          </div>
        </article>
      </section>

      {learnerMembership && (
        <section className="billing-seat-widget">
          <article className="billing-card billing-seat-card">
            <FiClock />
            <div>
              <span>{t('billing.currentSeat', 'Your institutional seat')}</span>
              {currentSeat ? (
                <>
                  <strong>
                    {currentSeat.state === 'suspended'
                      ? t('billing.seatSuspendedDays', 'Suspended · {{days}} days left', { days: daysUntil(currentSeat.expiresAt) ?? 0 })
                      : t('billing.seatActiveDays', '{{days}} days remaining', { days: daysUntil(currentSeat.expiresAt) ?? 0 })}
                  </strong>
                  <p>
                    {currentSeat.state === 'suspended'
                      ? t('billing.seatSuspendedNote', 'Your admin paused your seat. Access continues until expiry, then no new seat will be assigned.')
                      : t('billing.seatActiveNote', 'Your next seat starts automatically the next time you study — provided your institution still has seats in their wallet.')}
                  </p>
                </>
              ) : learnerMembership.status === 'suspended' ? (
                <>
                  <strong>{t('billing.seatSuspendedNoAccess', 'No access — seat suspended')}</strong>
                  <p>{t('billing.seatSuspendedNoAccessNote', 'Contact your institution admin to be reactivated.')}</p>
                </>
              ) : (
                <>
                  <strong>{t('billing.seatPending', 'Ready to activate')}</strong>
                  <p>{t('billing.seatPendingNote', 'Start a lesson and your next 30-day seat begins automatically.')}</p>
                </>
              )}
            </div>
            <div className="billing-seat-actions">
              {learnerMembership.status === 'active' && (
                <button type="button" className="billing-secondary" onClick={() => setRequestOpen(true)}>
                  <FiPauseCircle /> {t('billing.requestSuspension', 'Request to pause')}
                </button>
              )}
              {learnerMembership.suspensionRequest?.requestedAt && !learnerMembership.suspensionRequest?.handledAt && (
                <small className="billing-seat-request-pending">
                  {t('billing.suspensionRequestPending', 'Your suspension request is awaiting admin review.')}
                </small>
              )}
            </div>
          </article>

          {requestOpen && (
            <div className="billing-request-dialog">
              <h3>{t('billing.requestSuspensionTitle', 'Tell your admin why you need to pause')}</h3>
              <textarea
                value={requestNote}
                onChange={(event) => setRequestNote(event.target.value)}
                maxLength={1000}
                placeholder={t('billing.requestSuspensionPlaceholder', 'Optional — a quick note for context.')}
                rows={4}
              />
              <div className="billing-request-actions">
                <button type="button" className="billing-secondary" onClick={() => setRequestOpen(false)} disabled={requestSaving}>
                  {t('common.cancel', 'Cancel')}
                </button>
                <button type="button" className="billing-primary" onClick={handleRequestSuspension} disabled={requestSaving}>
                  {requestSaving ? t('common.saving') : t('billing.requestSuspensionSubmit', 'Send request')}
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      <section className="billing-actions-panel">
        <div>
          <h2>{t('billing.manageTitle')}</h2>
          <p>{t('billing.manageText')}</p>
        </div>
        <div className="billing-action-buttons">
          <button type="button" className="billing-primary" onClick={handlePortal} disabled={portalLoading}>
            <FiCreditCard /> {portalLoading ? t('common.loading') : t('billing.manageBilling')}
          </button>
          <button type="button" className="billing-secondary" onClick={() => navigate('/pricing')}>
            <FiBriefcase /> {t('billing.changePlan')}
          </button>
        </div>
      </section>

      <section className="billing-history">
        <h2>{t('billing.historyTitle')}</h2>
        {subscriptions.length === 0 ? (
          <p>{t('billing.noHistory')}</p>
        ) : (
          <div className="billing-history-list">
            {subscriptions.map((subscription) => (
              <div key={subscription._id || subscription.providerSubscriptionId} className="billing-history-row">
                <strong>{t(`pricing.planNames.${subscription.planId}`, subscription.planId)}</strong>
                <span>{t(`adminBilling.statuses.${subscription.status}`, subscription.status)}</span>
                <span>{t(`billing.sources.${subscription.source}`, subscription.source)}</span>
                <small>{formatBillingDate(subscription.currentPeriodEnd)}</small>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BillingPage;
