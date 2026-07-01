import React, { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { applyPublicLanguage } from '../utils/publicLanguage';
import BrandLogo from '../components/BrandLogo';
import './Auth.css';

const APP_SCHEME = 'lingobooth://';

function safeMobileUrl(raw) {
  const value = String(raw || '').trim();
  return value.startsWith(APP_SCHEME) ? value : '';
}

function safeFallbackUrl(raw) {
  try {
    const parsed = new URL(String(raw || '/'), window.location.origin);
    if (parsed.origin !== window.location.origin && parsed.hostname !== 'lingobooth.com') {
      return '/';
    }
    return parsed.href;
  } catch (_) {
    return '/';
  }
}

function AppLinkPage() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const mobileUrl = useMemo(() => safeMobileUrl(searchParams.get('mobile')), [searchParams]);
  const fallbackUrl = useMemo(() => safeFallbackUrl(searchParams.get('fallback')), [searchParams]);

  useEffect(() => {
    applyPublicLanguage(i18n);
  }, [i18n]);

  useEffect(() => {
    if (!mobileUrl) {
      window.location.replace(fallbackUrl);
      return undefined;
    }

    window.location.href = mobileUrl;
    const fallbackTimer = window.setTimeout(() => {
      window.location.replace(fallbackUrl);
    }, 1600);

    return () => window.clearTimeout(fallbackTimer);
  }, [fallbackUrl, mobileUrl]);

  const openFallback = () => {
    window.location.href = fallbackUrl;
  };

  return (
    <div className="auth-container">
      <div className="auth-card" style={{ textAlign: 'center' }}>
        <BrandLogo variant="lockup" className="auth-logo" decorative={false} />
        <h1>{t('appLink.title', 'Opening Lingo Booth')}</h1>
        <p className="auth-subtitle">
          {t('appLink.body', 'If the app does not open, continue in your browser.')}
        </p>
        <button type="button" className="btn btn-primary" onClick={openFallback}>
          {t('appLink.fallbackButton', 'Continue in browser')}
        </button>
      </div>
    </div>
  );
}

export default AppLinkPage;
