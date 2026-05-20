import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LANGUAGES, { getLanguageDisplayName } from '../config/languages';
import { classLessonService, userService } from '../services/api';
import {
  applyPublicLanguage,
  getPublicLanguagePair,
  setLandingLanguagePreference,
  targetLanguageForPublicNative,
} from '../utils/publicLanguage';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';
import BrandLogo from '../components/BrandLogo';
import './LanguageSelectPage.css';

function LanguageSelectPage({ setIsGuest, onLogout }) {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode'); // 'register' or 'guest'
  const suggestedPair = useMemo(() => getPublicLanguagePair(), []);

  const [nativeLanguage, setNativeLanguage] = useState(
    normalizeLanguageCode(suggestedPair.nativeLanguage || localStorage.getItem('nativeLanguage')) || ''
  );
  const [targetLanguage, setTargetLanguage] = useState(
    normalizeLanguageCode(suggestedPair.targetLanguage || localStorage.getItem('targetLanguage')) || ''
  );

  useEffect(() => {
    applyPublicLanguage(i18n);
  }, [i18n]);

  const handleNativeChange = (code) => {
    const nextCode = normalizeLanguageCode(code);
    setNativeLanguage(nextCode);
    setLandingLanguagePreference(nextCode);
    // If native and target are now the same, reset target
    if (nextCode === targetLanguage) {
      setTargetLanguage(targetLanguageForPublicNative(nextCode));
    }
    // Immediately switch UI language for real-time feedback
    i18n.changeLanguage(nextCode);
  };

  const handleTargetChange = (code) => {
    setTargetLanguage(normalizeLanguageCode(code));
  };

  const handleBack = () => {
    if (mode === 'google-setup' && onLogout) {
      onLogout();
    }
    navigate('/login');
  };

  const canContinue = nativeLanguage && targetLanguage && nativeLanguage !== targetLanguage;

  const [saving, setSaving] = useState(false);

  // If no valid mode, redirect to login
  if (mode !== 'register' && mode !== 'guest' && mode !== 'google-setup') {
    return <Navigate to="/login" />;
  }

  const handleContinue = async () => {
    if (!canContinue) return;
    const canonicalNative = normalizeLanguageCode(nativeLanguage);
    const canonicalTarget = normalizeLanguageCode(targetLanguage);
    localStorage.setItem('nativeLanguage', canonicalNative);
    localStorage.setItem('targetLanguage', canonicalTarget);
    setLandingLanguagePreference(canonicalNative);
    i18n.changeLanguage(canonicalNative);
    classLessonService.preparePair({
      nativeLang: canonicalNative,
      targetLang: canonicalTarget,
    }).catch(() => {});

    if (mode === 'guest') {
      localStorage.setItem('guestMode', 'true');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('username');
      localStorage.removeItem('userRole');
      localStorage.setItem('subscriptionTier', 'free');
      localStorage.setItem('aiEntitlements', JSON.stringify({
        subscriptionTier: 'free',
        canUseAI: true,
        canSendAI: true,
        canSyncAIMemory: false,
        canUsePracticeContext: false,
        aiMemoryScope: 'none',
      }));
      if (setIsGuest) setIsGuest(true);
      navigate('/');
    } else if (mode === 'google-setup') {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setSaving(true);
        try {
          await userService.updateProfile(userId, { nativeLanguage: canonicalNative, targetLanguage: canonicalTarget });
          localStorage.removeItem('needsLanguageSetup');
          navigate('/');
        } catch {
          setSaving(false);
          alert(t('languageSelect.saveFailed', 'Could not save your languages. Please check your connection and try again.'));
        }
      }
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
        <BrandLogo variant="lockup" className="auth-logo" decorative={false} />
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
                  <span className="lang-english">{getLanguageDisplayName(code, t)}</span>
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
                    <span className="lang-english">{getLanguageDisplayName(code, t)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <button className="btn btn-primary" onClick={handleContinue} disabled={!canContinue || saving}>
          {t('languageSelect.continue')} →
        </button>
      </div>
    </div>
  );
}

export default LanguageSelectPage;
