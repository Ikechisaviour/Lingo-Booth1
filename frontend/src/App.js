import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { guestXPHelper, authService } from './services/api';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LessonsPage from './pages/LessonsPage';
import FlashcardsPage from './pages/FlashcardsPage';
import ProgressPage from './pages/ProgressPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
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
  const navigate = useNavigate();
  const guestXP = guestXPHelper.get();

  const handleSignUp = () => {
    onClose();
    if (onGuestExit) onGuestExit();
    navigate('/register');
  };

  const handleLogin = () => {
    onClose();
    if (onGuestExit) onGuestExit();
    navigate('/login');
  };

  return (
    <div className="guest-prompt-overlay">
      <div className="guest-prompt-modal">
        <button className="guest-prompt-close" onClick={onClose} aria-label="Close">&times;</button>
        <div className="guest-prompt-icon">🎓</div>
        <h2>You're doing great!</h2>
        {guestXP > 0 && (
          <p className="guest-prompt-xp">You've earned <strong>{guestXP} XP</strong> so far!</p>
        )}
        <p className="guest-prompt-message">
          Create a free account to <strong>save your score</strong> and keep your progress safe. Without an account, your XP will be lost when you leave.
        </p>
        <ul className="guest-prompt-benefits">
          <li>Save your XP and learning progress permanently</li>
          <li>Track your scores across lessons and flashcards</li>
          <li>Pick up right where you left off</li>
          <li>Access your stats and achievements</li>
        </ul>
        <div className="guest-prompt-actions">
          <button className="btn btn-primary guest-prompt-signup" onClick={handleSignUp}>
            Sign Up Free
          </button>
          <button className="btn btn-outline guest-prompt-login" onClick={handleLogin}>
            Already have an account? Login
          </button>
        </div>
        <button className="guest-prompt-dismiss" onClick={onClose}>
          Continue as guest
        </button>
      </div>
    </div>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('token')
  );
  const [isGuest, setIsGuest] = useState(
    localStorage.getItem('guestMode') === 'true'
  );
  const [challengeMode, setChallengeMode] = useState(
    localStorage.getItem('xpDecayEnabled') === 'true'
  );
  const [showGuestPrompt, setShowGuestPrompt] = useState(false);

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
    setIsAuthenticated(false);
    setIsGuest(false);
    setChallengeMode(false);
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

  return (
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
                />
              )
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
    </Router>
  );
}

export default App;
