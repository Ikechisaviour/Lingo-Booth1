import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    !!localStorage.getItem('token')
  );
  const [isGuest, setIsGuest] = React.useState(
    localStorage.getItem('guestMode') === 'true'
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    localStorage.removeItem('guestMode');
    setIsAuthenticated(false);
    setIsGuest(false);
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
      <div className="App">
        {canAccessApp && (
          <Navbar
            onLogout={handleLogout}
            isGuest={isGuest}
            onGuestExit={handleGuestExit}
            userRole={localStorage.getItem('userRole')}
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
