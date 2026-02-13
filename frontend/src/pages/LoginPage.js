import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { authService } from '../services/api';
import './Auth.css';

function LoginPage({ setIsAuthenticated, setIsGuest }) {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [suspended, setSuspended] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user was redirected here after mid-session suspension
  const wasSuspendedMidSession = location.state?.suspended;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await authService.login(formData.email, formData.password);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.user.id);
      localStorage.setItem('username', response.data.user.username);
      localStorage.setItem('userRole', response.data.user.role || 'user');
      if (response.data.user.preferredVoice) {
        localStorage.setItem('preferredVoice', response.data.user.preferredVoice);
      }
      localStorage.removeItem('guestMode');
      setIsGuest(false);
      setIsAuthenticated(true);
      navigate('/');
    } catch (err) {
      if (err.response?.status === 403 && err.response?.data?.reason) {
        setSuspended({
          message: err.response.data.message,
          reason: err.response.data.reason,
        });
        setError('');
      } else {
        setError(err.response?.data?.message || 'Login failed');
        setSuspended(null);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    localStorage.setItem('guestMode', 'true');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole');
    setIsGuest(true);
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
        <h1>Welcome Back!</h1>
        <p className="auth-subtitle">Continue your Korean learning journey</p>

        {wasSuspendedMidSession && !suspended && (
          <div className="suspended-notice">
            <div className="suspended-icon">&#x1F6AB;</div>
            <h3>Account Suspended</h3>
            <p>Your account has been suspended. You have been logged out.</p>
            <p className="suspended-contact">Please contact support for more information.</p>
          </div>
        )}

        {suspended && (
          <div className="suspended-notice">
            <div className="suspended-icon">&#x1F6AB;</div>
            <h3>Account Suspended</h3>
            <p>{suspended.message}</p>
            <p className="suspended-reason"><strong>Reason:</strong> {suspended.reason}</p>
            <p className="suspended-contact">If you believe this is a mistake, please contact support.</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button className="btn btn-guest" onClick={handleGuestMode}>
          Try as Guest
        </button>
        <p className="guest-note">No account needed - explore the app freely!</p>

        <p className="auth-link">
          Don't have an account? <Link to="/register">Sign up here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
