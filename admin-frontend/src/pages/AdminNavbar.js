import React from 'react';
import { Link } from 'react-router-dom';
import './AdminNavbar.css';

function AdminNavbar({ onLogout }) {
  const username = localStorage.getItem('adminUsername');

  return (
    <nav className="admin-navbar">
      <div className="admin-navbar-container">
        <div className="admin-brand">
          <span className="brand-icon">👑</span>
          <div className="brand-text">
            <span className="brand-name">Lingo Booth</span>
            <span className="brand-label">Admin</span>
          </div>
        </div>

        <div className="admin-nav-right">
          <Link className="btn-demo" to="/demo">Demo</Link>
          <Link className="btn-demo secondary" to="/">Dashboard</Link>
          <div className="admin-user">
            <div className="admin-avatar">{username?.charAt(0).toUpperCase() || 'A'}</div>
            <span className="admin-username">{username || 'Admin'}</span>
          </div>
          <button className="btn-logout" onClick={onLogout}>
            <span className="logout-icon">🚪</span>
            <span className="logout-text">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
