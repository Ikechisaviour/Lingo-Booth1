import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userService } from '../services/api';
import './Navbar.css';

function Navbar({ isGuest, onGuestExit, userRole, challengeMode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const hasToken = !!localStorage.getItem('token');
  const [activityState, setActivityState] = useState(null);

  // Sync challenge mode theme with DB state.
  useEffect(() => {
    if (isGuest || !userId || !hasToken) return;
    userService.getProfile(userId).then(res => {
      if (res.data && res.data.xpDecayEnabled !== undefined) {
        const isChallenge = !!res.data.xpDecayEnabled;
        if (localStorage.getItem('xpDecayEnabled') !== String(isChallenge)) {
          localStorage.setItem('xpDecayEnabled', String(isChallenge));
          window.dispatchEvent(new CustomEvent('xpModeChanged', { detail: { enabled: isChallenge } }));
        }
      }
    }).catch(() => {});
  }, [userId, hasToken, isGuest]);

  // Refresh activity state on route changes (lightweight call).
  useEffect(() => {
    if (!userId || !hasToken || isGuest) return;
    userService.getActivityState(userId).then(res => {
      if (res.data && res.data.activityType) {
        setActivityState(res.data);
      } else {
        setActivityState(null);
      }
    }).catch(() => setActivityState(null));
  }, [userId, hasToken, isGuest, location.pathname]);

  const getContinueLink = () => {
    if (!activityState) return null;
    if ((activityState.activityType === 'quiz' || activityState.activityType === 'lesson') && activityState.quiz) {
      return `/quiz/${activityState.quiz._id}`;
    }
    if (activityState.activityType === 'flashcard') {
      return '/flashcards';
    }
    return null;
  };

  const getContinueLabel = () => {
    if (!activityState) return '';
    if ((activityState.activityType === 'quiz' || activityState.activityType === 'lesson') && activityState.quiz) {
      return activityState.quiz.title;
    }
    return t('navbar.flashcards', 'Flashcards');
  };

  const handleSignUp = () => {
    if (onGuestExit) {
      onGuestExit();
    }
    navigate('/select-language?mode=register');
  };

  const handleLogin = () => {
    if (onGuestExit) {
      onGuestExit();
    }
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;
  const isActiveSection = (paths) =>
    paths.some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

  const exerciseActive = isActiveSection(['/exercise', '/quiz', '/flashcards', '/writing']);

  return (
    <nav className={`navbar${challengeMode ? ' challenge-active' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/images/logo.png" alt="Lingo Booth" className="brand-logo" />
        </Link>

        {!isGuest && activityState && getContinueLink() && (
          <Link to={getContinueLink()} className="nav-continue-btn" title={`${t('navbar.continue')}: ${getContinueLabel()}`}>
            <span className="continue-icon">&#9654;</span>
            <span className="continue-text">{t('navbar.continue')}</span>
          </Link>
        )}

        {isGuest && (
          <div className="guest-banner">
            <span className="guest-icon">&#128075;</span>
            <span className="guest-text">{t('navbar.guestMode')}</span>
          </div>
        )}

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <span className="nav-icon">&#127968;</span>
              <span className="nav-text">{t('navbar.home')}</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to="/class" className={`nav-link ${isActiveSection(['/class']) ? 'active' : ''}`}>
              <span className="nav-icon">&#127979;</span>
              <span className="nav-text">{t('navbar.class', 'Class')}</span>
            </Link>
          </li>

          <li className="nav-item nav-item-dropdown">
            <Link
              to="/exercise"
              className={`nav-link ${exerciseActive ? 'active' : ''}`}
              aria-haspopup="true"
            >
              <span className="nav-icon">&#9997;</span>
              <span className="nav-text">{t('navbar.exercise', 'Exercise')}</span>
            </Link>
            <div className="nav-submenu" aria-label="Exercise options">
              <Link to="/quiz" className={`nav-submenu-link ${isActiveSection(['/quiz']) ? 'active' : ''}`}>
                <span>&#128221;</span>
                {t('navbar.quiz', 'Quiz')}
              </Link>
              <Link to="/flashcards" className={`nav-submenu-link ${isActiveSection(['/flashcards']) ? 'active' : ''}`}>
                <span>&#127183;</span>
                {t('navbar.flashcards', 'Flashcards')}
              </Link>
              <Link to="/writing" className={`nav-submenu-link ${isActiveSection(['/writing']) ? 'active' : ''}`}>
                <span>&#9998;</span>
                Writing
              </Link>
            </div>
          </li>

          <li className="nav-item">
            <Link to="/conversation" className={`nav-link ${isActive('/conversation') ? 'active' : ''}`}>
              <span className="nav-icon">&#128172;</span>
              <span className="nav-text">Conversation</span>
            </Link>
          </li>

          {!isGuest && userRole === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className={`nav-link nav-admin ${isActive('/admin') ? 'active' : ''}`}>
                <span className="nav-icon">&#9881;</span>
                <span className="nav-text">{t('navbar.admin')}</span>
              </Link>
            </li>
          )}

          {isGuest ? (
            <>
              <li className="nav-item">
                <button className="nav-link btn-auth" onClick={handleLogin}>
                  <span className="nav-icon">&#128273;</span>
                  <span className="nav-text">{t('navbar.login')}</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-signup" onClick={handleSignUp}>
                  <span className="nav-text">{t('navbar.signUpFree')}</span>
                </button>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                <span className="nav-icon">&#128100;</span>
                <span className="nav-text">{username || t('navbar.profile')}</span>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
