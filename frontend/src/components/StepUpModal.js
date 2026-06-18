import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/api';
import './StepUpModal.css';

// Listens for `stepUpRequired` events dispatched by the API interceptor when a
// sensitive endpoint demands a fresh credential proof (e.g. opening Stripe
// checkout/portal long after login). Asks the user to re-enter their password,
// calls /auth/step-up to refresh `authAt`, then transparently retries the
// original request so the user is not bounced out of their flow.
function StepUpModal() {
  const { t } = useTranslation();
  const [pending, setPending] = useState(null);
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (event) => {
      // If another step-up was already in-flight, cancel it so its caller gets
      // a clean rejection rather than a hung promise.
      setPending((prev) => {
        if (prev?.onCancel) prev.onCancel();
        return {
          onComplete: event.detail?.onComplete,
          onCancel: event.detail?.onCancel,
        };
      });
      setPassword('');
      setError('');
    };
    window.addEventListener('stepUpRequired', handler);
    return () => window.removeEventListener('stepUpRequired', handler);
  }, []);

  if (!pending) return null;

  const handleCancel = () => {
    if (pending.onCancel) pending.onCancel();
    setPending(null);
    setPassword('');
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password || submitting) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await authService.stepUp(password);
      const { token, refreshToken } = res.data || {};
      if (token) localStorage.setItem('token', token);
      if (refreshToken) localStorage.setItem('refreshToken', refreshToken);
      const onComplete = pending.onComplete;
      setPending(null);
      setPassword('');
      if (typeof onComplete === 'function') {
        onComplete();
      }
    } catch (err) {
      setError(err.response?.data?.message || t('stepUp.verifyFailed', 'Could not verify password'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="step-up-overlay" role="dialog" aria-modal="true">
      <form className="step-up-modal" onSubmit={handleSubmit}>
        <h2>{t('stepUp.title', "Confirm it's you")}</h2>
        <p>{t('stepUp.message', 'For your security, please re-enter your password to continue with this action.')}</p>
        <input
          type="password"
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t('stepUp.passwordPlaceholder', 'Password')}
          autoComplete="current-password"
          disabled={submitting}
        />
        {error && <div className="step-up-error">{error}</div>}
        <div className="step-up-actions">
          <button type="button" onClick={handleCancel} disabled={submitting}>{t('common.cancel', 'Cancel')}</button>
          <button type="submit" disabled={submitting || !password}>
            {submitting ? t('stepUp.verifying', 'Verifying...') : t('stepUp.confirm', 'Confirm')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default StepUpModal;
