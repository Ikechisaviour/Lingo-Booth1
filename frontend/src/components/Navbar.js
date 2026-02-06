import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onLogout, isGuest, onGuestExit, userRole }) {
  const navigate = useNavigate();
  const location = useLocation();
  const username = localStorage.getItem('username');

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

        {/* Stats - only show for authenticated users */}
        {!isGuest && (
          <div className="nav-stats">
            <div className="stat-item streak">
              <span className="stat-icon">🔥</span>
              <span className="stat-value">6</span>
            </div>
            <div className="stat-item xp">
              <span className="stat-icon">⚡</span>
              <span className="stat-value">339</span>
            </div>
            <div className="stat-item hearts">
              <span className="stat-icon">❤️</span>
              <span className="stat-value">5</span>
            </div>
          </div>
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

          {/* Progress - only for authenticated users */}
          {!isGuest && (
            <li className="nav-item">
              <Link to="/progress" className={`nav-link ${isActive('/progress') ? 'active' : ''}`}>
                <span className="nav-icon">📊</span>
                <span className="nav-text">Progress</span>
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
              <li className="nav-item">
                <button className="nav-link btn-logout" onClick={handleLogout}>
                  <span className="nav-icon">👋</span>
                  <span className="nav-text">Logout</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
