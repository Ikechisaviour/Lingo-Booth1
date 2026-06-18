import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { userService } from '../services/api';
import { useCurriculumVersion } from '../hooks/useCurriculumVersion';
import BrandLogo from './BrandLogo';
import NotificationCenter from './NotificationCenter';
import './Navbar.css';

function Navbar({ isGuest, onGuestExit, userRole, challengeMode }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const hasToken = !!localStorage.getItem('token');
  const [activityState, setActivityState] = useState(null);
  const storedEntitlements = (() => {
    try {
      return JSON.parse(localStorage.getItem('aiEntitlements') || '{}');
    } catch (_) {
      return {};
    }
  })();
  const canManageInstitution = !isGuest && !!storedEntitlements.canManageOrganization;
  const { isV2: useV2 } = useCurriculumVersion();
  const classPath = useV2 ? '/learn/v2' : '/class';

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

  const exerciseActive = isActiveSection(['/exercise', '/quiz', '/flashcards', '/writing', '/review']);
  const classActive = useV2
    ? isActiveSection(['/learn/v2', '/learn'])
    : isActiveSection(['/class']);

  return (
    <nav className={`navbar${challengeMode ? ' challenge-active' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <BrandLogo variant="mark" className="brand-logo" decorative={false} />
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

        <NotificationCenter isGuest={isGuest} />

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <span className="nav-icon">&#127968;</span>
              <span className="nav-text">{t('navbar.home')}</span>
            </Link>
          </li>

          <li className="nav-item">
            <Link to={classPath} className={`nav-link ${classActive ? 'active' : ''}`}>
              <span className="nav-icon">&#127979;</span>
              <span className="nav-text">
                {useV2 ? t('navbar.learn', 'Learn') : t('navbar.class', 'Class')}
              </span>
              {useV2 && <span className="nav-v2-badge" aria-label="Curriculum v2">v2</span>}
            </Link>
          </li>

          {/* On v2 the planner folds Quiz / Flashcards / Writing / Review into every
              session, so the standalone Exercise menu collapses. v1 users keep it. */}
          {!useV2 && (
            <li className="nav-item nav-item-dropdown">
              <Link
                to="/exercise"
                className={`nav-link ${exerciseActive ? 'active' : ''}`}
                aria-haspopup="true"
              >
                <span className="nav-icon">&#9997;</span>
                <span className="nav-text">{t('navbar.exercise', 'Exercise')}</span>
              </Link>
              <div className="nav-submenu" aria-label={t('navbar.exerciseOptions', 'Exercise options')}>
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
                  {t('navbar.writing')}
                </Link>
                {!isGuest && (
                  <Link to="/review" className={`nav-submenu-link ${isActiveSection(['/review']) ? 'active' : ''}`}>
                    <span>&#8635;</span>
                    {t('navbar.review', 'Review')}
                  </Link>
                )}
              </div>
            </li>
          )}

          <li className="nav-item">
            <Link to="/conversation" className={`nav-link ${isActive('/conversation') ? 'active' : ''}`}>
              <span className="nav-icon">&#128172;</span>
              <span className="nav-text">{t('navbar.conversation')}</span>
            </Link>
          </li>

          {isGuest && (
            <li className="nav-item">
              <Link to="/pricing" className={`nav-link ${isActive('/pricing') || isActive('/billing') ? 'active' : ''}`}>
                <span className="nav-icon">&#128142;</span>
                <span className="nav-text">{t('navbar.plans')}</span>
              </Link>
            </li>
          )}

          {canManageInstitution && (
            <li className="nav-item">
              <Link to="/institution" className={`nav-link ${isActive('/institution') ? 'active' : ''}`}>
                <span className="nav-icon">&#127970;</span>
                <span className="nav-text">{t('navbar.institution')}</span>
              </Link>
            </li>
          )}

          {!isGuest && userRole === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className={`nav-link nav-admin ${isActiveSection(['/admin']) ? 'active' : ''}`}>
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
              <Link to="/profile" className={`nav-link ${isActiveSection(['/profile']) ? 'active' : ''}`}>
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
