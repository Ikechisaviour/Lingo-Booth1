import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService, guestXPHelper } from '../services/api';
import './Auth.css';

function RegisterPage({ setIsAuthenticated, setIsGuest }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Only show email feedback once the user has started typing
  const emailTouched = formData.email.length > 0;
  const emailValid = EMAIL_REGEX.test(formData.email);

  // Only show password match feedback once the user has started typing in confirmPassword
  const confirmTouched = formData.confirmPassword.length > 0;
  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const guestXP = guestXPHelper.get();
      const data = await authService.register(
        formData.username,
        formData.email,
        formData.password,
        guestXP
      );
      guestXPHelper.clear();

      localStorage.setItem('token', data.token);
      localStorage.setItem('userId', data.user.id);
      localStorage.setItem('username', data.user.username);
      localStorage.setItem('userRole', data.user.role);
      localStorage.removeItem('guestMode');

      setIsAuthenticated(true);
      setIsGuest(false);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

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
            {emailTouched && (
              <p style={{
                marginTop: '6px',
                fontSize: '0.85rem',
                color: emailValid ? '#16a34a' : '#dc2626',
              }}>
                {emailValid ? '✓ Valid email address' : '✗ Please enter a valid email address'}
              </p>
            )}
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
            {confirmTouched && (
              <p style={{
                marginTop: '6px',
                fontSize: '0.85rem',
                color: passwordsMatch ? '#16a34a' : '#dc2626',
              }}>
                {passwordsMatch ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading || !emailValid || (confirmTouched && !passwordsMatch)}
          >
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
