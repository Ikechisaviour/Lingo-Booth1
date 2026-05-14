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

const featureKey = (feature) => `pricing.features.${feature}`;
const planNameKey = (plan) => `pricing.planNames.${plan.id}`;
const planTaglineKey = (plan) => `pricing.planTaglines.${plan.id}`;

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
          const price = money(interval === 'annual' ? plan.annualPriceCents : plan.monthlyPriceCents, interval, t);
          const isHighlighted = plan.id === 'pro';
          return (
            <article key={plan.id} className={`pricing-card ${isHighlighted ? 'highlighted' : ''}`}>
              {isHighlighted && <span className="pricing-ribbon">{t('pricing.recommended')}</span>}
              <div className="pricing-card-head">
                <h2>{name}</h2>
                <span>{tagline}</span>
              </div>
              <div className="pricing-price">
                <strong>{price}</strong>
              </div>
              <ul className="pricing-features">
                {(plan.features || []).map((feature) => (
                  <li key={feature}><FiCheck /> {t(featureKey(feature), feature)}</li>
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
            {(plans.institutional || []).map((plan) => (
              <div key={plan.id}>
                <FiUsers />
                <strong>{t(planNameKey(plan), plan.name)}</strong>
                <span>
                  {plan.seatPriceMonthlyCents == null
                    ? t('pricing.customPricing')
                    : t('pricing.seatPrice', { price: money(plan.seatPriceMonthlyCents, 'monthly', t), seats: plan.minimumSeats })}
                </span>
              </div>
            ))}
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
          <button type="submit" className="pricing-primary"><FiGlobe /> {t('pricing.sendInstitutionalRequest')}</button>
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
