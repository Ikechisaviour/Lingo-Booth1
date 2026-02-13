import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { userService } from '../services/api';
import './Navbar.css';

function Navbar({ onLogout, isGuest, onGuestExit, userRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');
  const userId = localStorage.getItem('userId');
  const [activityState, setActivityState] = useState(null);
  const [totalXP, setTotalXP] = useState(null);

  // Fetch activity state and XP on mount and when location changes
  useEffect(() => {
    if (!userId || isGuest) return;
    userService.getActivityState(userId).then(res => {
      if (res.data && res.data.activityType) {
        setActivityState(res.data);
      } else {
        setActivityState(null);
      }
    }).catch(() => setActivityState(null));

    userService.getProfile(userId).then(res => {
      if (res.data && res.data.totalXP !== undefined) {
        setTotalXP(res.data.totalXP);
      }
    }).catch(() => {});
  }, [userId, isGuest, location.pathname]);

  // Listen for XP updates from awardXP calls
  useEffect(() => {
    const handleXpUpdate = (e) => {
      if (e.detail && e.detail.totalXP !== undefined) {
        setTotalXP(e.detail.totalXP);
      }
    };
    window.addEventListener('xpUpdated', handleXpUpdate);
    return () => window.removeEventListener('xpUpdated', handleXpUpdate);
  }, []);

  const getContinueLink = () => {
    if (!activityState) return null;
    if (activityState.activityType === 'lesson' && activityState.lesson) {
      return `/lessons/${activityState.lesson._id}`;
    }
    if (activityState.activityType === 'flashcard') {
      return '/flashcards';
    }
    return null;
  };

  const getContinueLabel = () => {
    if (!activityState) return '';
    if (activityState.activityType === 'lesson' && activityState.lesson) {
      return activityState.lesson.title;
    }
    return 'Flashcards';
  };

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  const handleSignUp = () => {
    if (onGuestExit) {
      onGuestExit();
    }
    navigate('/register');
  };

  const handleLogin = () => {
    if (onGuestExit) {
      onGuestExit();
    }
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <img src="/images/logo.png" alt="Lingo Booth" className="brand-logo" />
        </Link>

        {/* Continue Button - only show for authenticated users with activity */}
        {!isGuest && activityState && getContinueLink() && (
          <Link to={getContinueLink()} className="nav-continue-btn" title={`Continue: ${getContinueLabel()}`}>
            <span className="continue-icon">&#9654;</span>
            <span className="continue-text">Continue</span>
          </Link>
        )}

        {/* Guest Banner */}
        {isGuest && (
          <div className="guest-banner">
            <span className="guest-icon">👋</span>
            <span className="guest-text">Guest Mode</span>
          </div>
        )}

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              <span className="nav-icon">🏠</span>
              <span className="nav-text">Home</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/lessons" className={`nav-link ${isActive('/lessons') ? 'active' : ''}`}>
              <span className="nav-icon">📚</span>
              <span className="nav-text">Lessons</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/flashcards" className={`nav-link ${isActive('/flashcards') ? 'active' : ''}`}>
              <span className="nav-icon">🎴</span>
              <span className="nav-text">Flashcards</span>
            </Link>
          </li>

          {/* Progress / XP - only for authenticated users */}
          {!isGuest && (
            <li className="nav-item">
              <Link to="/progress" className={`nav-link nav-xp ${isActive('/progress') ? 'active' : ''}`}>
                <span className="nav-icon">📊</span>
                <span className="nav-text">{totalXP !== null ? <>{totalXP}<span className="xp-suffix"> XP</span></> : 'Progress'}</span>
              </Link>
            </li>
          )}

          {/* Admin link - only for admins */}
          {!isGuest && userRole === 'admin' && (
            <li className="nav-item">
              <Link to="/admin" className={`nav-link nav-admin ${isActive('/admin') ? 'active' : ''}`}>
                <span className="nav-icon">⚙️</span>
                <span className="nav-text">Admin</span>
              </Link>
            </li>
          )}

          {/* Guest actions */}
          {isGuest ? (
            <>
              <li className="nav-item">
                <button className="nav-link btn-auth" onClick={handleLogin}>
                  <span className="nav-icon">🔑</span>
                  <span className="nav-text">Login</span>
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn-signup" onClick={handleSignUp}>
                  <span className="nav-text">Sign Up Free</span>
                </button>
              </li>
            </>
          ) : (
            <>
              {/* Profile link */}
              <li className="nav-item">
                <Link to="/profile" className={`nav-link ${isActive('/profile') ? 'active' : ''}`}>
                  <span className="nav-icon">👤</span>
                  <span className="nav-text">{username || 'Profile'}</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
