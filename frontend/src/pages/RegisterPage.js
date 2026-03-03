import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService, guestXPHelper } from '../services/api';
import './Auth.css';

function RegisterPage({ setIsAuthenticated, setIsGuest }) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Languages should already be set by LanguageSelectPage
  const nativeLanguage = localStorage.getItem('nativeLanguage');
  const targetLanguage = localStorage.getItem('targetLanguage');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Guard: if no language was selected, redirect to language selection
  if (!nativeLanguage) {
    return <Navigate to="/select-language?mode=register" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const emailTouched = formData.email.length > 0;
  const emailValid = EMAIL_REGEX.test(formData.email);

  const confirmTouched = formData.confirmPassword.length > 0;
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!passwordsMatch) {
      setError(t('register.passwordsNoMatch'));
      return;
    }

    setLoading(true);

    try {
      const guestXP = guestXPHelper.get();
      const data = await authService.register(
        formData.username,
        formData.email,
        formData.password,
        guestXP,
        nativeLanguage || 'en',
        targetLanguage || 'ko'
      );
      guestXPHelper.clear();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('nativeLanguage', data.user.nativeLanguage || 'en');
      localStorage.setItem('targetLanguage', data.user.targetLanguage || 'ko');
      localStorage.removeItem('guestMode');

      setIsAuthenticated(true);
      setIsGuest(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || t('register.registrationFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
        <h1>{t('register.title')}</h1>
        <p className="auth-subtitle">{t('register.subtitle')}</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">{t('register.username')}</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder={t('register.usernamePlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">{t('register.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('register.emailPlaceholder')}
              required
            />
            {emailTouched && (
              <p style={{
                marginTop: '6px',
                fontSize: '0.85rem',
                color: emailValid ? '#16a34a' : '#dc2626',
              }}>
                {emailValid ? `✓ ${t('register.validEmail')}` : `✗ ${t('register.invalidEmail')}`}
              </p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('register.password')}</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('register.passwordPlaceholder')}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? t('login.hidePassword') : t('login.showPassword')}
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
            <label htmlFor="confirmPassword">{t('register.confirmPassword')}</label>
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder={t('register.confirmPlaceholder')}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? t('login.hidePassword') : t('login.showPassword')}
              >
                {showConfirmPassword ? (
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
            {confirmTouched && (
              <p style={{
                marginTop: '6px',
                fontSize: '0.85rem',
                color: passwordsMatch ? '#16a34a' : '#dc2626',
              }}>
                {passwordsMatch ? `✓ ${t('register.passwordsMatch')}` : `✗ ${t('register.passwordsNoMatch')}`}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !emailValid || (confirmTouched && !passwordsMatch)}
          >
            {loading ? t('register.creatingAccount') : t('register.signUpButton')}
          </button>
        </form>

        <p className="auth-link">
          {t('register.hasAccount')} <Link to="/login">{t('register.loginHere')}</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
