import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminNavbar from './pages/AdminNavbar';
import AdminSpeakingDemo from './pages/AdminSpeakingDemo';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const localDemoPreviewAllowed = ['localhost', '127.0.0.1'].includes(window.location.hostname);

  useEffect(() => {
    checkAuth();
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
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUserId');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

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
