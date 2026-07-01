import React from 'react';
import { useTranslation } from 'react-i18next';

// Shown when a page fails to render (a crash, or a lazy chunk that won't load).
// Sends the user to the site root — lingobooth.com in production — with a full
// navigation, which also clears the broken React state.
function RedirectHome() {
  const { t } = useTranslation();
  React.useEffect(() => {
    const t = setTimeout(() => { window.location.replace('/'); }, 100);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '40px 20px',
        color: '#6b7280',
        fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      }}
    >
      <p style={{ fontSize: '1.1rem', margin: 0 }}>{t('errorBoundary.redirecting', 'Taking you home…')}</p>
      <a href="/" style={{ marginTop: 12, color: '#ff6b35', fontWeight: 600, textDecoration: 'none' }}>
        {t('errorBoundary.goHome', 'Go to the Lingo Booth home page')}
      </a>
    </div>
  );
}

// Catches render/runtime errors in the page tree so a broken or unresponsive
// screen never leaves the user stranded on a blank page.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('App error boundary caught an error:', error, info);
  }

  render() {
    if (this.state.hasError) return <RedirectHome />;
    return this.props.children;
  }
}

export default ErrorBoundary;
