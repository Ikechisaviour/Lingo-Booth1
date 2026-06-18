import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiCheck, FiCreditCard, FiGlobe, FiUsers } from 'react-icons/fi';
import { billingService } from '../services/api';
import './PricingPage.css';

const money = (cents, cadence, t) => {
  if (cents == null) return null;
  if (cents === 0) return t('pricing.freePrice', '$0');
  const amount = `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
  return cadence === 'annual'
    ? t('pricing.priceAnnual', { amount, defaultValue: '{{amount}}/yr' })
    : t('pricing.priceMonthly', { amount, defaultValue: '{{amount}}/mo' });
};

const moneyAmount = (cents) => {
  if (cents == null) return '';
  return `$${(cents / 100).toFixed(cents % 100 === 0 ? 0 : 2)}`;
};

const featureKey = (feature) => `pricing.features.${feature}`;
const planNameKey = (plan) => `pricing.planNames.${plan.id}`;
const planTaglineKey = (plan) => `pricing.planTaglines.${plan.id}`;

const formatCount = (value) => Number(value || 0).toLocaleString();

const planEntitlementLines = (plan, t) => {
  const entitlements = plan.entitlements || {};
  const placement = entitlements.placementTests || {};
  const proficiency = entitlements.proficiencyTests || {};
  const lines = [];
  if (placement.limit) {
    lines.push(placement.period === 'lifetime'
      ? t('pricing.entitlements.placementLifetime', '{{count}} placement check', { count: placement.limit })
      : t('pricing.entitlements.placementMonthly', '{{count}} placement checks/month', { count: placement.limit }));
  }
  if (proficiency) {
    const price = moneyAmount(proficiency.paidPriceCents || 1000);
    lines.push((proficiency.included || 0) > 0
      ? t('pricing.entitlements.proficiencyIncluded', '{{count}} proficiency checks/month included, then {{price}} each', { count: proficiency.included, price })
      : t('pricing.entitlements.proficiencyPaid', 'Proficiency checks {{price}} each', { price }));
  }
  if (entitlements.dailyConversationTokens) {
    lines.push(t('pricing.entitlements.dailyTokens', '{{count}} daily conversation tokens', { count: formatCount(entitlements.dailyConversationTokens) }));
  }
  return lines;
};

const automaticDiscountFor = (plan, interval) => (
  interval === 'annual'
    ? plan.automaticDiscountAnnual
    : plan.automaticDiscountMonthly
);

const discountedPriceFor = (plan, interval) => (
  interval === 'annual'
    ? plan.discountedAnnualPriceCents
    : plan.discountedMonthlyPriceCents
);

function PricingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState({ individual: [], institutional: [] });
  const [interval, setBillingInterval] = useState('monthly');
  const [loading, setLoading] = useState(true);
  const [busyPlan, setBusyPlan] = useState('');
  const [notice, setNotice] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [leadForm, setLeadForm] = useState({
    organizationName: '',
    organizationType: 'school',
    contactName: localStorage.getItem('username') || '',
    email: localStorage.getItem('userEmail') || '',
    planId: 'institution_pro',
    seatsRequested: 25,
    message: '',
  });

  const isAuthenticated = Boolean(localStorage.getItem('token'));
  const isGuest = localStorage.getItem('guestMode') === 'true';

  useEffect(() => {
    let active = true;
    billingService.getPlans()
      .then((res) => {
        if (active) setPlans(res.data || { individual: [], institutional: [] });
      })
      .catch(() => {
        if (active) setNotice(t('pricing.loadFailed'));
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [t]);

  const handlePlan = async (plan) => {
    setNotice('');
    if (plan.id === 'free') {
      navigate(isAuthenticated || isGuest ? '/' : '/select-language?mode=guest');
      return;
    }
    if (!isAuthenticated) {
      navigate(`/select-language?mode=register&plan=${encodeURIComponent(plan.id)}`);
      return;
    }

    try {
      setBusyPlan(plan.id);
      const res = await billingService.createCheckoutSession({
        planId: plan.id,
        interval,
        discountCode: discountCode.trim(),
        successUrl: `${window.location.origin}/billing?checkout=success`,
        cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
      });
      if (res.data?.checkoutUrl) {
        window.location.assign(res.data.checkoutUrl);
        return;
      }
      if (res.data?.requiresSetup) {
        setNotice(t('pricing.checkoutSetupNeeded'));
      }
    } catch (error) {
      const status = error.response?.status;
      setNotice(status === 400 ? t('pricing.discountUnavailable') : t('pricing.checkoutFailed'));
    } finally {
      setBusyPlan('');
    }
  };

  const handleLeadChange = (event) => {
    const { name, value } = event.target;
    setLeadForm((current) => ({ ...current, [name]: value }));
  };

  const handleLeadSubmit = async (event) => {
    event.preventDefault();
    setLeadStatus('');
    try {
      await billingService.sendInstitutionalInquiry({
        ...leadForm,
        seatsRequested: Number(leadForm.seatsRequested) || 1,
        source: 'web',
        page: window.location.pathname,
      });
      setLeadStatus(t('pricing.institutionalSent'));
      setLeadForm((current) => ({ ...current, organizationName: '', phone: '', message: '' }));
    } catch (error) {
      setLeadStatus(error.response?.data?.message || t('pricing.institutionalFailed'));
    }
  };

  const handleInstitutionCheckout = async () => {
    setLeadStatus('');
    if (!leadForm.organizationName.trim() || !leadForm.email.trim()) {
      setLeadStatus(t('pricing.institutionCheckoutDetailsRequired', 'Enter your institution details before checkout.'));
      return;
    }
    if (!isAuthenticated) {
      navigate(`/select-language?mode=register&plan=${encodeURIComponent(leadForm.planId)}`);
      return;
    }
    try {
      setBusyPlan(leadForm.planId);
      const res = await billingService.createCheckoutSession({
        planId: leadForm.planId,
        interval,
        discountCode: discountCode.trim(),
        organizationName: leadForm.organizationName,
        organizationType: leadForm.organizationType,
        seatsRequested: Number(leadForm.seatsRequested) || 1,
        successUrl: `${window.location.origin}/billing?checkout=success`,
        cancelUrl: `${window.location.origin}/pricing?checkout=cancelled`,
      });
      if (res.data?.checkoutUrl) {
        window.location.assign(res.data.checkoutUrl);
        return;
      }
      if (res.data?.requiresSetup) {
        setLeadStatus(t('pricing.checkoutSetupNeeded'));
      }
    } catch (error) {
      setLeadStatus(error.response?.data?.message || t('pricing.checkoutFailed'));
    } finally {
      setBusyPlan('');
    }
  };

  if (loading) {
    return <div className="pricing-page"><div className="loading">{t('common.loading')}</div></div>;
  }

  return (
    <div className="pricing-page">
      <section className="pricing-hero">
        <div>
          <p className="pricing-kicker">{t('pricing.kicker')}</p>
          <h1>{t('pricing.title')}</h1>
          <p>{t('pricing.subtitle')}</p>
        </div>
        <div className="pricing-hero-controls">
          <div className="pricing-interval" role="group" aria-label={t('pricing.billingCycle')}>
            <button
              type="button"
              className={interval === 'monthly' ? 'active' : ''}
              onClick={() => setBillingInterval('monthly')}
            >
              {t('pricing.monthly')}
            </button>
            <button
              type="button"
              className={interval === 'annual' ? 'active' : ''}
              onClick={() => setBillingInterval('annual')}
            >
              {t('pricing.annual')}
            </button>
          </div>
          <label className="pricing-discount-box">
            <span>{t('pricing.discountCode')}</span>
            <input
              value={discountCode}
              onChange={(event) => setDiscountCode(event.target.value.toUpperCase())}
              placeholder={t('pricing.discountPlaceholder')}
              autoCapitalize="characters"
            />
          </label>
        </div>
      </section>

      {notice && <div className="pricing-notice">{notice}</div>}

      <section className="pricing-grid" aria-label={t('pricing.individualPlans')}>
        {(plans.individual || []).map((plan) => {
          const name = t(planNameKey(plan), plan.name);
          const tagline = t(planTaglineKey(plan), plan.tagline);
          const originalPriceCents = interval === 'annual' ? plan.annualPriceCents : plan.monthlyPriceCents;
          const automaticDiscount = automaticDiscountFor(plan, interval);
          const discountedPriceCents = discountedPriceFor(plan, interval);
          const hasAutomaticDiscount = automaticDiscount && discountedPriceCents != null && discountedPriceCents < originalPriceCents;
          const price = money(hasAutomaticDiscount ? discountedPriceCents : originalPriceCents, interval, t);
          const originalPrice = hasAutomaticDiscount ? money(originalPriceCents, interval, t) : null;
          const isHighlighted = plan.id === 'pro';
          return (
            <article key={plan.id} className={`pricing-card ${isHighlighted ? 'highlighted' : ''}`}>
              {isHighlighted && <span className="pricing-ribbon">{t('pricing.recommended')}</span>}
              <div className="pricing-card-head">
                <h2>{name}</h2>
                <span>{tagline}</span>
              </div>
              <div className="pricing-price">
                {hasAutomaticDiscount && <span className="pricing-original-price">{originalPrice}</span>}
                <strong>{price}</strong>
                {hasAutomaticDiscount && (
                  <span className="pricing-auto-discount">
                    {t('pricing.automaticDiscountApplied', {
                      discount: automaticDiscount.discountType === 'percent'
                        ? `${automaticDiscount.percentOff}%`
                        : moneyAmount(automaticDiscount.amountOffCents),
                    })}
                  </span>
                )}
              </div>
              <ul className="pricing-features">
                {(plan.features || []).map((feature) => (
                  <li key={feature}><FiCheck /> {t(featureKey(feature), feature)}</li>
                ))}
                {planEntitlementLines(plan, t).map((line) => (
                  <li key={line}><FiCheck /> {line}</li>
                ))}
              </ul>
              <button
                type="button"
                className={isHighlighted ? 'pricing-primary' : 'pricing-secondary'}
                onClick={() => handlePlan(plan)}
                disabled={busyPlan === plan.id}
              >
                <FiCreditCard />
                {busyPlan === plan.id ? t('common.loading') : t(plan.id === 'free' ? 'pricing.startFree' : 'pricing.choosePlan', { plan: name })}
              </button>
            </article>
          );
        })}
      </section>

      <section className="pricing-institutional">
        <div className="pricing-institutional-copy">
          <p className="pricing-kicker">{t('pricing.institutionalKicker')}</p>
          <h2>{t('pricing.institutionalTitle')}</h2>
          <p>{t('pricing.institutionalSubtitle')}</p>
          <div className="pricing-institutional-list">
            {(plans.institutional || []).map((plan) => {
              if (plan.pricePerSeatCents == null) {
                return (
                  <div key={plan.id}>
                    <FiUsers />
                    <strong>{t(planNameKey(plan), plan.name)}</strong>
                    <span>{t('pricing.customPricing')}</span>
                  </div>
                );
              }
              const tiers = Array.isArray(plan.bulkPricing) ? plan.bulkPricing : [];
              const cheapest = tiers.length
                ? tiers.reduce((a, b) => (a.pricePerSeatCents <= b.pricePerSeatCents ? a : b))
                : null;
              const fromPrice = ((cheapest?.pricePerSeatCents || plan.pricePerSeatCents) / 100).toFixed(2);
              return (
                <div key={plan.id}>
                  <FiUsers />
                  <strong>{t(planNameKey(plan), plan.name)}</strong>
                  <span>
                    {t('pricing.seatPriceFrom', {
                      defaultValue: 'From USD {{from}}/seat · {{minSeats}}-seat minimum · 30 days each',
                      from: fromPrice,
                      minSeats: plan.minimumSeats,
                    })}
                  </span>
                  {tiers.length > 1 && (
                    <details className="pricing-bulk-details">
                      <summary>
                        {t('pricing.viewVolumePricing', {
                          defaultValue: 'View volume pricing ({{count}} tiers)',
                          count: tiers.length,
                        })}
                      </summary>
                      <small className="pricing-bulk-tiers">
                        {tiers.map((tier) => {
                          const tierPrice = (tier.pricePerSeatCents / 100).toFixed(2);
                          return (
                            <em key={tier.minSeats}>
                              {t('pricing.bulkTier', {
                                defaultValue: '{{count}}+: USD {{price}}/seat',
                                count: tier.minSeats,
                                price: tierPrice,
                              })}
                            </em>
                          );
                        })}
                      </small>
                    </details>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <form className="pricing-lead-form" onSubmit={handleLeadSubmit}>
          <h3>{t('pricing.institutionalFormTitle')}</h3>
          {leadStatus && <div className="pricing-form-status">{leadStatus}</div>}
          <label>
            {t('pricing.organizationName')}
            <input name="organizationName" value={leadForm.organizationName} onChange={handleLeadChange} required />
          </label>
          <label>
            {t('pricing.organizationType')}
            <select name="organizationType" value={leadForm.organizationType} onChange={handleLeadChange}>
              {['school', 'company', 'church', 'language_center', 'nonprofit', 'government', 'other'].map((type) => (
                <option key={type} value={type}>{t(`pricing.organizationTypes.${type}`)}</option>
              ))}
            </select>
          </label>
          <div className="pricing-form-row">
            <label>
              {t('pricing.contactName')}
              <input name="contactName" value={leadForm.contactName} onChange={handleLeadChange} required />
            </label>
            <label>
              {t('pricing.email')}
              <input name="email" type="email" value={leadForm.email} onChange={handleLeadChange} required />
            </label>
          </div>
          <div className="pricing-form-row">
            <label>
              {t('pricing.planInterest')}
              <select name="planId" value={leadForm.planId} onChange={handleLeadChange}>
                {(plans.institutional || []).map((plan) => (
                  <option key={plan.id} value={plan.id}>{t(planNameKey(plan), plan.name)}</option>
                ))}
              </select>
            </label>
            <label>
              {t('pricing.seats')}
              <input name="seatsRequested" type="number" min="1" value={leadForm.seatsRequested} onChange={handleLeadChange} required />
            </label>
          </div>
          <label>
            {t('pricing.message')}
            <textarea name="message" rows="4" value={leadForm.message} onChange={handleLeadChange} />
          </label>
          <button type="submit" className="pricing-secondary"><FiGlobe /> {t('pricing.sendInstitutionalRequest')}</button>
          <button type="button" className="pricing-primary" onClick={handleInstitutionCheckout} disabled={busyPlan === leadForm.planId}>
            <FiCreditCard /> {busyPlan === leadForm.planId ? t('common.loading') : t('pricing.payInstitutionSubscription', 'Pay and open institution dashboard')}
          </button>
        </form>
      </section>

      <section className="pricing-footer-cta">
        <h2>{t('pricing.needHelp')}</h2>
        <p>{t('pricing.needHelpText')}</p>
        <button type="button" className="pricing-secondary" onClick={() => navigate('/contact')}>
          {t('contact.navLabel')}
        </button>
      </section>
    </div>
  );
}

export default PricingPage;
