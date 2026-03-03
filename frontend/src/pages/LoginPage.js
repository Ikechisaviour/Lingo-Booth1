import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { authService, userService, guestXPHelper } from '../services/api';
import './Auth.css';

function LoginPage({ setIsAuthenticated, setIsGuest }) {
  const { t, i18n } = useTranslation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [suspended, setSuspended] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user was redirected here after mid-session suspension
  const wasSuspendedMidSession = location.state?.suspended;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const guestXP = guestXPHelper.get();
      const response = await authService.login(formData.email, formData.password, guestXP);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('userRole', response.data.user.role || 'user');
      localStorage.setItem('xpDecayEnabled', String(!!response.data.user.xpDecayEnabled));
      if (response.data.user.preferredVoice) {
        localStorage.setItem('preferredVoice', response.data.user.preferredVoice);
      }
      localStorage.setItem('nativeLanguage', response.data.user.nativeLanguage || 'en');
      localStorage.setItem('targetLanguage', response.data.user.targetLanguage || 'ko');
      localStorage.removeItem('guestMode');
      guestXPHelper.clear();
      setIsGuest(false);
      setIsAuthenticated(true);

      // Switch UI language to user's saved preference
      i18n.changeLanguage(response.data.user.nativeLanguage || 'en');

      // Redirect to last activity if available, otherwise home
      const uid = response.data.user.id;
      try {
        const actRes = await userService.getActivityState(uid);
        const state = actRes.data;
        if (state.activityType === 'lesson' && state.lesson?._id) {
          navigate(`/lessons/${state.lesson._id}`);
        } else if (state.activityType === 'flashcard' && state.flashcardIndex > 0) {
          navigate('/flashcards');
        } else {
          navigate('/');
        }
      } catch {
        navigate('/');
      }
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.reason) {
        setSuspended({
          message: err.response.data.message,
          reason: err.response.data.reason,
        });
        setError('');
      } else {
        setError(err.response?.data?.message || t('login.loginFailed'));
        setSuspended(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    navigate('/select-language?mode=guest');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
        <h1>{t('login.welcomeBack')}</h1>
        <p className="auth-subtitle">{t('login.subtitle')}</p>

        {wasSuspendedMidSession && !suspended && (
          <div className="suspended-notice">
            <div className="suspended-icon">&#x1F6AB;</div>
            <h3>{t('login.accountSuspended')}</h3>
            <p>{t('login.suspendedLoggedOut')}</p>
            <p className="suspended-contact">{t('login.contactSupport')}</p>
          </div>
        )}

        {suspended && (
          <div className="suspended-notice">
            <div className="suspended-icon">&#x1F6AB;</div>
            <h3>{t('login.accountSuspended')}</h3>
            <p>{suspended.message}</p>
            <p className="suspended-reason"><strong>{t('login.reason')}:</strong> {suspended.reason}</p>
            <p className="suspended-contact">{t('login.suspendedMistake')}</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t('login.emailPlaceholder')}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder={t('login.passwordPlaceholder')}
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
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? t('login.loggingIn') : t('login.loginButton')}
          </button>
        </form>

        <div className="auth-divider">
          <span>{t('common.or')}</span>
        </div>

        <button className="btn btn-guest" onClick={handleGuestMode}>
          {t('login.tryAsGuest')}
        </button>
        <p className="guest-note">{t('login.guestNote')}</p>

        <p className="auth-link">
          {t('login.noAccount')} <Link to="/select-language?mode=register">{t('login.signUpHere')}</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
