import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authService, guestXPHelper } from '../services/api';
import './Auth.css';

function RegisterPage({ setIsAuthenticated, setIsGuest }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const guestXP = guestXPHelper.get();
      await authService.register(
        formData.username,
        formData.email,
        formData.password,
        guestXP
      );
      guestXPHelper.clear();
      setEmailSent(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📧</div>
            <h2>Check your email</h2>
            <p style={{ color: '#6b7280', margin: '12px 0 8px' }}>
              We sent a verification link to <strong>{formData.email}</strong>
            </p>
            <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>
              Click the link in the email to activate your account. The link expires in 24 hours.
            </p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '24px' }}>
              Already verified? <Link to="/login">Log in here</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />
        <h1>Create Your Account</h1>
        <p className="auth-subtitle">Start your Korean learning journey today!</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Choose a username"
              required
            />
          </div>
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
              placeholder="Create a password (min. 6 characters)"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        <p className="auth-link">
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
