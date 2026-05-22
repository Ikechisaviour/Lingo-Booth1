import React, { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { guestXPHelper, authService, userService } from './services/api';
import { installGlobalErrorReporting } from './services/errorReporter';
import { installStudyHeartbeat } from './services/studyHeartbeat';
import guestActivityTracker from './services/guestActivityTracker';
import Navbar from './components/Navbar';
import BrandLogo from './components/BrandLogo';
import EmailVerificationBanner from './components/EmailVerificationBanner';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LanguageSelectPage from './pages/LanguageSelectPage';
import { getPreferredPublicLanguage, googleLocaleForPublicLanguage } from './utils/publicLanguage';
import './App.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID || '';
const HomePage = lazy(() => import('./pages/HomePage'));
const ClassLessonsPage = lazy(() => import('./pages/ClassLessonsPage'));
const ClassLessonPage = lazy(() => import('./pages/ClassLessonPage'));
const ExercisePage = lazy(() => import('./pages/ExercisePage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const FlashcardsPage = lazy(() => import('./pages/FlashcardsPage'));
const WritingPracticePage = lazy(() => import('./pages/WritingPracticePage'));
const ReviewPage = lazy(() => import('./pages/ReviewPage'));
const PlacementCheckPage = lazy(() => import('./pages/PlacementCheckPage'));
const LevelTestPage = lazy(() => import('./pages/LevelTestPage'));
const ConversationPage = lazy(() => import('./pages/ConversationPage'));
const ContextPracticePage = lazy(() => import('./pages/ContextPracticePage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));
const QuizDetailPage = lazy(() => import('./pages/QuizDetailPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminSpeakingDemo = lazy(() => import('./pages/AdminSpeakingDemo'));
const VerifyEmailPage = lazy(() => import('./pages/VerifyEmailPage'));
const ForgotPasswordPage = lazy(() => import('./pages/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('./pages/ResetPasswordPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PricingPage = lazy(() => import('./pages/PricingPage'));
const BillingPage = lazy(() => import('./pages/BillingPage'));
const InstitutionDashboard = lazy(() => import('./pages/InstitutionDashboard'));
const CertificateVerifyPage = lazy(() => import('./pages/CertificateVerifyPage'));

// Listens for auth changes that should remove the current user from the app.
function AuthSessionListener({ onSessionEnded }) {
  const navigate = useNavigate();

  useEffect(() => {
    const handleSuspended = () => {
      onSessionEnded();
      navigate('/login', { state: { suspended: true } });
    };

    const handleExpired = () => {
      onSessionEnded();
      navigate('/login', { state: { sessionExpired: true } });
    };

    window.addEventListener('accountSuspended', handleSuspended);
    window.addEventListener('sessionExpired', handleExpired);
    return () => {
      window.removeEventListener('accountSuspended', handleSuspended);
      window.removeEventListener('sessionExpired', handleExpired);
    };
  }, [navigate, onSessionEnded]);

  return null;
}

function LegacyQuizRedirect() {
  const { id } = useParams();
  return <Navigate to={id ? `/quiz/${id}` : '/quiz'} replace />;
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

function GlobalHomeLogo({ hidden }) {
  const { t } = useTranslation();
  const location = useLocation();

  if (hidden || location.pathname === '/') {
    return null;
  }

  return (
    <Link to="/" className="global-home-logo" aria-label={t('common.backToHome')}>
      <BrandLogo variant="mark" decorative />
    </Link>
  );
}

function RouteLoadingFallback() {
  const { t } = useTranslation();
  return <div className="loading">{t('common.loading', 'Loading...')}</div>;
}

function App() {
  const { i18n } = useTranslation();
  const [googleLocale, setGoogleLocale] = useState(() => googleLocaleForPublicLanguage(getPreferredPublicLanguage()));
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

  useEffect(() => {
    installGlobalErrorReporting();
    // Heartbeat: fires `study_heartbeat` while the learner is interacting
    // with the app so passive engagement (autoplay, replay, browsing) still
    // resets the XP decay timer. Awards 0 XP — see services/studyHeartbeat.js.
    const uninstall = installStudyHeartbeat();
    return uninstall;
  }, []);

  useEffect(() => {
    const syncGoogleLocale = () => {
      setGoogleLocale(googleLocaleForPublicLanguage(getPreferredPublicLanguage()));
    };
    window.addEventListener('publicLanguageChanged', syncGoogleLocale);
    window.addEventListener('storage', syncGoogleLocale);
    return () => {
      window.removeEventListener('publicLanguageChanged', syncGoogleLocale);
      window.removeEventListener('storage', syncGoogleLocale);
    };
  }, []);

  // RTL support for Arabic and Hebrew
  useEffect(() => {
    const rtlLanguages = ['ar', 'he'];
    const dir = rtlLanguages.includes(i18n.language) ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', i18n.language);
  }, [i18n.language]);

  // Auto-scroll inputs into view when mobile keyboard opens
  useEffect(() => {
    if (!('ontouchstart' in window)) return;
    const handleFocusIn = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        setTimeout(() => {
          e.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
      }
    };
    document.addEventListener('focusin', handleFocusIn);
    return () => document.removeEventListener('focusin', handleFocusIn);
  }, []);

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

  // Safety net: verify language setup status from the backend on load
  useEffect(() => {
    if (!isAuthenticated || isGuest) return;
    if (!localStorage.getItem('token')) return;
    const userId = localStorage.getItem('userId');
    if (!userId || localStorage.getItem('needsLanguageSetup') === 'true') return;

    userService.getProfile(userId)
      .then((res) => {
        if (res.data.languageSetupComplete === false) {
          localStorage.setItem('needsLanguageSetup', 'true');
          window.location.replace('/select-language?mode=google-setup');
        }
      })
      .catch(() => {});
  }, [isAuthenticated, isGuest]);

  // Track time spent on platform for authenticated users
  useEffect(() => {
    if (!isAuthenticated) return;
    if (!localStorage.getItem('token')) return;
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
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userRole');
    localStorage.removeItem('subscriptionTier');
    localStorage.removeItem('aiEntitlements');
    localStorage.removeItem('guestMode');
    localStorage.removeItem('xpDecayEnabled');
    localStorage.removeItem('emailVerified');
    localStorage.removeItem('nativeLanguage');
    localStorage.removeItem('targetLanguage');
    localStorage.removeItem('needsLanguageSetup');
    setIsAuthenticated(false);
    setIsGuest(false);
    setChallengeMode(false);
    setEmailVerified(true);
    i18n.changeLanguage('en');
  };

  const handleSessionEnded = useCallback(() => {
    setIsAuthenticated(false);
    setIsGuest(false);
  }, []);

  const handleGuestExit = () => {
    localStorage.removeItem('guestMode');
    setIsGuest(false);
  };

  // Check if user can access the app (either authenticated or guest)
  const canAccessApp = isAuthenticated || isGuest;
  const needsLanguageSetup = localStorage.getItem('needsLanguageSetup') === 'true';
  const languagesReady = !!localStorage.getItem('nativeLanguage') && !!localStorage.getItem('targetLanguage');
  const localDemoPreviewAllowed = ['localhost', '127.0.0.1'].includes(window.location.hostname);
  const pageSearchParams = new URLSearchParams(window.location.search);
  const certificateRenderId = pageSearchParams.get('certificateRender') === '1'
    ? pageSearchParams.get('certificateId') || ''
    : '';
  const isCertificateRender = !!certificateRenderId;
  const showAppNavbar = canAccessApp && !needsLanguageSetup && languagesReady && !isCertificateRender;

  return (
    <GoogleOAuthProvider key={googleLocale} clientId={GOOGLE_CLIENT_ID} locale={googleLocale}>
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthSessionListener onSessionEnded={handleSessionEnded} />
      <div className={`App${challengeMode ? ' challenge-theme' : ''}`}>
        <GlobalHomeLogo hidden={showAppNavbar || isCertificateRender} />
        {showAppNavbar && (
          <Navbar
            onLogout={handleLogout}
            isGuest={isGuest}
            onGuestExit={handleGuestExit}
            userRole={localStorage.getItem('userRole')}
            challengeMode={challengeMode}
          />
        )}
        <div className="app-content">
        {isAuthenticated && !emailVerified && !isGuest && !isCertificateRender && (
          <EmailVerificationBanner />
        )}
        {showGuestPrompt && isGuest && !isCertificateRender && (
          <GuestSignupPrompt
            onClose={() => setShowGuestPrompt(false)}
            onGuestExit={handleGuestExit}
          />
        )}
        <Suspense fallback={<RouteLoadingFallback />}>
        <Routes>
          {/* Auth Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated && needsLanguageSetup ? <Navigate to="/select-language?mode=google-setup" /> :
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
                onLogout={handleLogout}
              />
            }
          />

          {/* Email verification — always public */}
          <Route path="/verify-email" element={<VerifyEmailPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/certificates/verify/:certificateId" element={<CertificateVerifyPage />} />
          <Route
            path="/demo-preview"
            element={
              localDemoPreviewAllowed ? (
                <AdminSpeakingDemo demoBypass />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* Main App Routes - Accessible by authenticated users and guests */}
          <Route
            path="/"
            element={
              isCertificateRender ? <CertificateVerifyPage certificateIdOverride={certificateRenderId} /> :
              isAuthenticated && (needsLanguageSetup || !languagesReady) ? <Navigate to="/select-language?mode=google-setup" /> :
              canAccessApp ? <HomePage isGuest={isGuest} /> : <LandingPage />
            }
          />
          <Route
            path="/class"
            element={
              canAccessApp ? <ClassLessonsPage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/class/:classLessonId"
            element={
              canAccessApp ? <ClassLessonPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/exercise"
            element={
              canAccessApp ? <ExercisePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/quiz"
            element={
              canAccessApp ? <QuizPage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/quiz/:quizId"
            element={
              canAccessApp ? <QuizDetailPage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/lessons"
            element={
              <LegacyQuizRedirect />
            }
          />
          <Route
            path="/lessons/:id"
            element={
              <LegacyQuizRedirect />
            }
          />
          <Route
            path="/flashcards"
            element={
              canAccessApp ? <FlashcardsPage isGuest={isGuest} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/writing"
            element={
              canAccessApp ? <WritingPracticePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/review"
            element={
              isAuthenticated ? <ReviewPage /> : (
                isGuest ? <Navigate to="/" state={{ showSignupPrompt: true }} /> : <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/level-check"
            element={
              isAuthenticated ? <PlacementCheckPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/level-tests"
            element={
              isAuthenticated ? <LevelTestPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/conversation"
            element={
              canAccessApp ? <ConversationPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/context"
            element={
              canAccessApp ? <ContextPracticePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/learning-personalization"
            element={
              canAccessApp ? <ContextPracticePage /> : <Navigate to="/login" />
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
          <Route
            path="/billing"
            element={
              isAuthenticated ? <BillingPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/institution"
            element={
              isAuthenticated ? <InstitutionDashboard /> : <Navigate to="/login" />
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
        </Suspense>
        </div>
      </div>
    </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
