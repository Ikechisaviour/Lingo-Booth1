import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/api';
import { applyPublicLanguage } from '../utils/publicLanguage';
import BrandLogo from '../components/BrandLogo';
import './Auth.css';

function ForgotPasswordPage() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [googleNotice, setGoogleNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    applyPublicLanguage(i18n);
  }, [i18n]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setGoogleNotice('');
    setLoading(true);
    try {
      const res = await authService.forgotPassword(email.trim());
      if (res?.data?.provider === 'google') {
        // Google sign-in account — no password to reset; guide them to sign in.
        setGoogleNotice(res.data.message || t('forgotPassword.googleMessage', 'This account was created with Google sign-in, so there is no password to reset. Please use “Continue with Google” to sign in.'));
      } else {
        setSent(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || t('forgotPassword.error', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <BrandLogo variant="lockup" className="auth-logo" decorative={false} />
        <h1>{t('forgotPassword.title', 'Forgot Password')}</h1>
        <p className="auth-subtitle">
          {t('forgotPassword.subtitle', "Enter your email and we'll send you a link to reset your password.")}
        </p>

        {error && <div className="error">{error}</div>}

        {googleNotice ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔑</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>
              {t('forgotPassword.googleTitle', 'Use Google sign-in')}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
              {googleNotice}
            </p>
            <Link className="btn btn-primary" to="/login">
              {t('forgotPassword.goToSignIn', 'Go to sign in')}
            </Link>
          </div>
        ) : sent ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📧</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '8px' }}>
              {t('forgotPassword.checkEmail', 'Check your email')}
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              {t('forgotPassword.sentMessage', 'If an account with that email exists, we sent a password reset link.')}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('login.email', 'Email')}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('login.emailPlaceholder', 'Enter your email')}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading || !email.trim()}>
              {loading ? t('common.sending', 'Sending...') : t('forgotPassword.sendLink', 'Send Reset Link')}
            </button>
          </form>
        )}

        <p className="auth-link">
          <Link to="/login">{t('forgotPassword.backToLogin', 'Back to Login')}</Link>
        </p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
