import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminNavbar from './pages/AdminNavbar';
import AdminSpeakingDemo from './pages/AdminSpeakingDemo';
import './App.css';

// Admin consoles run on shared/unattended workstations more often than the
// learner app, so we apply an idle-timeout policy here — but NOT on the
// learner frontend, where forced logouts hurt retention.
const ADMIN_IDLE_TIMEOUT_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const clearAdminSession = () => {
  localStorage.removeItem('adminToken');
  localStorage.removeItem('adminUserId');
  localStorage.removeItem('adminUsername');
  localStorage.removeItem('adminRole');
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const localDemoPreviewAllowed = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    const handleUnauthorized = () => {
      clearAdminSession();
      setIsAuthenticated(false);
      setIsAdmin(false);
    };

    window.addEventListener('adminUnauthorized', handleUnauthorized);
    return () => window.removeEventListener('adminUnauthorized', handleUnauthorized);
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken');
    const role = localStorage.getItem('adminRole');
    if (token && role === 'admin') {
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
    setLoading(false);
  };

  const handleLogin = (token, user) => {
    if (user.role === 'admin') {
      localStorage.setItem('adminToken', token);
      localStorage.setItem('adminUserId', user.id);
      localStorage.setItem('adminUsername', user.username);
      localStorage.setItem('adminRole', user.role);
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
  };

  const handleLogout = () => {
    clearAdminSession();
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // Idle timeout — admin consoles can be left open on shared workstations,
  // so log out after 30 minutes of no input. Resets on mouse, keyboard, touch,
  // or scroll. Only armed while the admin is signed in.
  const idleTimerRef = useRef(null);
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) return undefined;

    const resetTimer = () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        handleLogout();
      }, ADMIN_IDLE_TIMEOUT_MS);
    };

    const events = ['mousemove', 'keydown', 'touchstart', 'scroll', 'click'];
    events.forEach((event) => window.addEventListener(event, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [isAuthenticated, isAdmin]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="App">
        {isAuthenticated && isAdmin && <AdminNavbar onLogout={handleLogout} />}
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated && isAdmin ? (
                <Navigate to="/" />
              ) : (
                <AdminLogin onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated && isAdmin ? (
                <AdminDashboard />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/demo"
            element={
              isAuthenticated && isAdmin ? (
                <AdminSpeakingDemo />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
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
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
