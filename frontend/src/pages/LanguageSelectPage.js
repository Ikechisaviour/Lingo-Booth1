import React, { useState } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LANGUAGES from '../config/languages';
import { userService } from '../services/api';
import './LanguageSelectPage.css';

function LanguageSelectPage({ setIsGuest, onLogout }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode'); // 'register' or 'guest'

  const [nativeLanguage, setNativeLanguage] = useState(
    localStorage.getItem('nativeLanguage') || 'en'
  );
  const [targetLanguage, setTargetLanguage] = useState(
    localStorage.getItem('targetLanguage') || 'ko'
  );

  // If no valid mode, redirect to login
  if (mode !== 'register' && mode !== 'guest' && mode !== 'google-setup') {
    return <Navigate to="/login" />;
  }

  const handleNativeChange = (code) => {
    setNativeLanguage(code);
    // If native and target are now the same, reset target
    if (code === targetLanguage) {
      setTargetLanguage('');
    }
    // Immediately switch UI language for real-time feedback
    i18n.changeLanguage(code);
  };

  const handleTargetChange = (code) => {
    setTargetLanguage(code);
  };

  const handleBack = () => {
    if (mode === 'google-setup' && onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const canContinue = nativeLanguage && targetLanguage && nativeLanguage !== targetLanguage;

  const handleContinue = () => {
    if (!canContinue) return;
    localStorage.setItem('nativeLanguage', nativeLanguage);
    localStorage.setItem('targetLanguage', targetLanguage);
    i18n.changeLanguage(nativeLanguage);

    if (mode === 'guest') {
      localStorage.setItem('guestMode', 'true');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      if (setIsGuest) setIsGuest(true);
      navigate('/');
    } else if (mode === 'google-setup') {
      // New Google user — save languages to backend and go home
      const userId = localStorage.getItem('userId');
      if (userId) {
        userService.updateProfile(userId, { nativeLanguage, targetLanguage }).catch(() => {});
      }
      localStorage.removeItem('needsLanguageSetup');
      navigate('/');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card language-select-card">
        <button className="back-to-login" onClick={handleBack} type="button">
          ← {t('common.back', 'Back')}
        </button>
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
        <h1>{t('languageSelect.title')}</h1>
        <p className="auth-subtitle">{t('languageSelect.subtitle')}</p>

        <div className="lang-section">
          <label className="lang-section-label">{t('languageSelect.iSpeak')}</label>
          <div className="language-grid">
            {Object.entries(LANGUAGES).map(([code, lang]) => (
              <button
                key={code}
                type="button"
                className={`language-option${nativeLanguage === code ? ' selected' : ''}`}
                onClick={() => handleNativeChange(code)}
              >
                <span className="lang-flag">{lang.flag}</span>
                <span className="lang-name">
                  <span className="lang-english">{lang.name}</span>
                  {lang.nativeName !== lang.name && (
                    <span className="lang-native">{lang.nativeName}</span>
                  )}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="lang-section">
          <label className="lang-section-label">{t('languageSelect.iWantToLearn')}</label>
          <div className="language-grid">
            {Object.entries(LANGUAGES).map(([code, lang]) => {
              const isNative = code === nativeLanguage;
              return (
                <button
                  key={code}
                  type="button"
                  className={`language-option${targetLanguage === code ? ' selected' : ''}${isNative ? ' native-lock' : ''}`}
                  onClick={() => !isNative && handleTargetChange(code)}
                  disabled={isNative}
                >
                  <span className="lang-flag">{lang.flag}</span>
                  <span className="lang-name">
                    <span className="lang-english">{lang.name}</span>
                    {lang.nativeName !== lang.name && (
                      <span className="lang-native">{lang.nativeName}</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleContinue} disabled={!canContinue}>
          {t('languageSelect.continue')} →
        </button>
      </div>
    </div>
  );
}

export default LanguageSelectPage;
