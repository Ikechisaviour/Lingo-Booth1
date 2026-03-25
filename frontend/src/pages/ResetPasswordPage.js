import React, { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService } from '../services/api';
import './Auth.css';

function ResetPasswordPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordsMatch = password === confirmPassword;
  const canSubmit = password.length >= 6 && passwordsMatch && !loading;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError('');
    setLoading(true);
    try {
      await authService.resetPassword(token, password);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || t('resetPassword.error', 'Failed to reset password.'));
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="auth-container">
        <div className="auth-card" style={{ textAlign: 'center' }}>
          <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
          <h1>{t('resetPassword.invalidLink', 'Invalid Link')}</h1>
          <p className="auth-subtitle">
            {t('resetPassword.noToken', 'This password reset link is invalid or has expired.')}
          </p>
          <p className="auth-link">
            <Link to="/forgot-password">{t('resetPassword.requestNew', 'Request a new reset link')}</Link>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
        <h1>{t('resetPassword.title', 'Reset Password')}</h1>
        <p className="auth-subtitle">
          {t('resetPassword.subtitle', 'Enter your new password below.')}
        </p>

        {error && <div className="error">{error}</div>}

        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <p style={{ color: 'var(--text-primary)', fontWeight: 600, marginBottom: '12px' }}>
              {t('resetPassword.success', 'Password reset successfully!')}
            </p>
            <button className="btn btn-primary" onClick={() => navigate('/login')}>
              {t('resetPassword.goToLogin', 'Go to Login')}
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="password">{t('register.password', 'New Password')}</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t('resetPassword.newPasswordPlaceholder', 'At least 6 characters')}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">{t('register.confirmPassword', 'Confirm Password')}</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder={t('register.confirmPlaceholder', 'Confirm your password')}
                required
              />
              {confirmPassword.length > 0 && (
                <p style={{
                  marginTop: '6px',
                  fontSize: '0.85rem',
                  color: passwordsMatch ? '#16a34a' : '#dc2626',
                }}>
                  {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
                </p>
              )}
            </div>
            <button type="submit" className="btn btn-primary" disabled={!canSubmit}>
              {loading ? t('common.saving', 'Saving...') : t('resetPassword.resetButton', 'Reset Password')}
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

export default ResetPasswordPage;
