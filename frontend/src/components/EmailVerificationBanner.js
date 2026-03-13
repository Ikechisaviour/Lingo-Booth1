import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/api';
import './EmailVerificationBanner.css';

function EmailVerificationBanner() {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  if (dismissed) return null;

  const handleResend = async () => {
    setSending(true);
    setError('');
    setSent(false);
    try {
      await authService.resendVerification();
      setSent(true);
      setTimeout(() => setSent(false), 5000);
    } catch (err) {
      const msg = err.response?.data?.message || t('emailBanner.failed');
      setError(msg);
      setTimeout(() => setError(''), 5000);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="email-verify-banner">
      <div className="banner-content">
        <span className="banner-icon">✉️</span>
        <span className="banner-message">
          {sent ? t('emailBanner.sent') : error || t('emailBanner.message')}
        </span>
        <button
          className="banner-resend-btn"
          onClick={handleResend}
          disabled={sending || sent}
        >
          {sending ? t('emailBanner.sending') : t('emailBanner.resend')}
        </button>
      </div>
      <button
        className="banner-dismiss"
        onClick={() => setDismissed(true)}
        aria-label={t('common.close')}
      >
        &times;
      </button>
    </div>
  );
}

export default EmailVerificationBanner;
