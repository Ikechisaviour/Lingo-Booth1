import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { guestXPHelper, authService } from './services/api';
import guestActivityTracker from './services/guestActivityTracker';
import Navbar from './components/Navbar';
import EmailVerificationBanner from './components/EmailVerificationBanner';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import FlashcardsPage from './pages/FlashcardsPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LanguageSelectPage from './pages/LanguageSelectPage';
import LessonDetail from './pages/LessonDetail';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';
import VerifyEmailPage from './pages/VerifyEmailPage';
import './App.css';

// Listens for mid-session suspension and redirects to login
function SuspensionListener({ onSuspended }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => {
      onSuspended();
      navigate('/login', { state: { suspended: true } });
    };
    window.addEventListener('accountSuspended', handler);
    return () => window.removeEventListener('accountSuspended', handler);
  }, [navigate, onSuspended]);

  return null;
}

function GuestSignupPrompt({ onClose, onGuestExit }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const guestXP = guestXPHelper.get();

  const handleSignUp = () => {
    onClose();
    if (onGuestExit) onGuestExit();
    navigate('/select-language?mode=register');
  };

  const handleLogin = () => {
    onClose();
    if (onGuestExit) onGuestExit();
    navigate('/login');
  };

  return (
    <div className="guest-prompt-overlay">
      <div className="guest-prompt-modal">
        <button className="guest-prompt-close" onClick={onClose} aria-label={t('common.close')}>&times;</button>
        <div className="guest-prompt-icon">🎓</div>
        <h2>{t('guestPrompt.title')}</h2>
        {guestXP > 0 && (
          <p className="guest-prompt-xp" dangerouslySetInnerHTML={{ __html: t('guestPrompt.xpEarned', { xp: guestXP }) }} />
        )}
        <p className="guest-prompt-message" dangerouslySetInnerHTML={{ __html: t('guestPrompt.message') }} />
        <ul className="guest-prompt-benefits">
          <li>{t('guestPrompt.benefit1')}</li>
          <li>{t('guestPrompt.benefit2')}</li>
          <li>{t('guestPrompt.benefit3')}</li>
          <li>{t('guestPrompt.benefit4')}</li>
        </ul>
        <div className="guest-prompt-actions">
          <button className="btn btn-primary guest-prompt-signup" onClick={handleSignUp}>
            {t('guestPrompt.signUpFree')}
          </button>
          <button className="btn btn-outline guest-prompt-login" onClick={handleLogin}>
            {t('guestPrompt.alreadyHaveAccount')}
          </button>
        </div>
        <button className="guest-prompt-dismiss" onClick={onClose}>
          {t('guestPrompt.continueAsGuest')}
        </button>
      </div>
    </div>
  );
}

function App() {
  const { i18n } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const [isGuest, setIsGuest] = useState(
    localStorage.getItem('guestMode') === 'true'
  );
  const [challengeMode, setChallengeMode] = useState(
    localStorage.getItem('xpDecayEnabled') === 'true'
  );
  const [emailVerified, setEmailVerified] = useState(
    localStorage.getItem('emailVerified') !== 'false'
  );
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

  // RTL support for Arabic and Hebrew
  useEffect(() => {
    const rtlLanguages = ['ar', 'he'];
    const dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  // Start / stop guest activity tracker alongside guest mode
  useEffect(() => {
    if (isGuest) {
      guestActivityTracker.init();
    } else {
      guestActivityTracker.destroy();
    }
  }, [isGuest]);

  // Guest signup prompt — first after 5 min, then every 30 min
  useEffect(() => {
    if (!isGuest) {
      setShowGuestPrompt(false);
      return;
    }
    let repeatTimer = null;
    const firstTimer = setTimeout(() => {
      setShowGuestPrompt(true);
      repeatTimer = setInterval(() => {
        setShowGuestPrompt(true);
      }, 30 * 60 * 1000);
    }, 5 * 60 * 1000);
    return () => {
      clearTimeout(firstTimer);
      if (repeatTimer) clearInterval(repeatTimer);
    };
  }, [isGuest]);

  // Listen for mode changes from ProfilePage
  useEffect(() => {
    const handleModeChange = (e) => {
      const enabled = !!e.detail?.enabled;
      setChallengeMode(enabled);
      localStorage.setItem('xpDecayEnabled', String(enabled));
    };
    window.addEventListener('xpModeChanged', handleModeChange);
    return () => window.removeEventListener('xpModeChanged', handleModeChange);
  }, []);

  // Listen for email verification events
  useEffect(() => {
    const handler = () => {
      setEmailVerified(true);
      localStorage.setItem('emailVerified', 'true');
    };
    window.addEventListener('emailVerified', handler);
    return () => window.removeEventListener('emailVerified', handler);
  }, []);

  // Track time spent on platform for authenticated users
  useEffect(() => {
    if (!isAuthenticated) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    let startTime = Date.now();

    const sendTime = (minutes) => {
      if (minutes <= 0) return;
      authService.trackActivity(userId, minutes).catch(() => {});
    };

    // Send accumulated time every 5 minutes
    const interval = setInterval(() => {
      const minutes = Math.floor((Date.now() - startTime) / 60000);
      if (minutes > 0) {
        sendTime(minutes);
        startTime = Date.now();
      }
    }, 5 * 60 * 1000);

    // When tab becomes hidden, save elapsed time and pause; resume on return
    const handleVisibility = () => {
      if (document.hidden) {
        const minutes = Math.floor((Date.now() - startTime) / 60000);
        sendTime(minutes);
      } else {
        startTime = Date.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      // Save any remaining time when component unmounts / user logs out
      const minutes = Math.floor((Date.now() - startTime) / 60000);
      sendTime(minutes);
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isAuthenticated]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('guestMode');
    localStorage.removeItem('xpDecayEnabled');
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('nativeLanguage');
    localStorage.removeItem('targetLanguage');
    setIsAuthenticated(false);
    setIsGuest(false);
    setChallengeMode(false);
    setEmailVerified(true);
    i18n.changeLanguage('en');
  };

  const handleSuspended = useCallback(() => {
    setIsAuthenticated(false);
    setIsGuest(false);
  }, []);

  const handleGuestExit = () => {
    localStorage.removeItem('guestMode');
    setIsGuest(false);
  };

  // Check if user can access the app (either authenticated or guest)
  const canAccessApp = isAuthenticated || isGuest;

  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId || ''}>
    <Router>
      <SuspensionListener onSuspended={handleSuspended} />
      <div className={`App${challengeMode ? ' challenge-theme' : ''}`}>
        {canAccessApp && (
          <Navbar
            onLogout={handleLogout}
            isGuest={isGuest}
            onGuestExit={handleGuestExit}
            userRole={localStorage.getItem('userRole')}
            challengeMode={challengeMode}
          />
        )}
        <div className="app-content">
        {isAuthenticated && !emailVerified && !isGuest && (
          <EmailVerificationBanner />
        )}
        {showGuestPrompt && isGuest && (
          <GuestSignupPrompt
            onClose={() => setShowGuestPrompt(false)}
            onGuestExit={handleGuestExit}
          />
        )}
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? <Navigate to="/" /> : (
                <LoginPage
                  setIsAuthenticated={setIsAuthenticated}
                  setIsGuest={setIsGuest}
                  setEmailVerified={setEmailVerified}
                />
              )
            }
          />
          <Route
            path="/register"
            element={
              isAuthenticated ? <Navigate to="/" /> : (
                <RegisterPage
                  setIsAuthenticated={setIsAuthenticated}
                  setIsGuest={setIsGuest}
                  setEmailVerified={setEmailVerified}
                />
              )
            }
          />

          {/* Language selection — before register, guest mode, or google-setup */}
          <Route
            path="/select-language"
            element={
              <LanguageSelectPage
                setIsGuest={setIsGuest}
              />
            }
          />

          {/* Email verification — always public */}
          <Route path="/verify-email" element={<VerifyEmailPage />} />

          {/* Main App Routes - Accessible by authenticated users and guests */}
          <Route
            path="/"
            element={
              canAccessApp ? <HomePage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/lessons"
            element={
              canAccessApp ? <LessonsPage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/lessons/:id"
            element={
              canAccessApp ? <LessonDetail isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/flashcards"
            element={
              canAccessApp ? <FlashcardsPage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />

          {/* Authenticated-only Routes */}
          <Route
            path="/progress"
            element={
              isAuthenticated ? <ProgressPage /> : (
                isGuest ? <Navigate to="/" state={{ showSignupPrompt: true }} /> : <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isAuthenticated ? <ProfilePage onLogout={handleLogout} /> : <Navigate to="/login" />
            }
          />

          {/* Admin Route */}
          <Route
            path="/admin"
            element={
              isAuthenticated && localStorage.getItem('userRole') === 'admin' ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
        </div>
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
