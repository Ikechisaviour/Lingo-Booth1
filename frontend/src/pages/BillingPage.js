import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiBriefcase, FiCreditCard, FiShield, FiUsers } from 'react-icons/fi';
import { billingService } from '../services/api';
import './BillingPage.css';

function BillingPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState('');
  const [portalLoading, setPortalLoading] = useState(false);

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
