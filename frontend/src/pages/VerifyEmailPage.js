import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import api from '../services/api';
import './Auth.css';

function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage('No verification token found in the link.');
      return;
    }

    api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || 'Verification failed. The link may have expired.');
      });
  }, [searchParams]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />

        {status === 'verifying' && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
            <h2>Verifying your email...</h2>
          </div>
        )}

        {status === 'success' && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h2>Email verified!</h2>
            <p style={{ color: '#6b7280', margin: '12px 0 24px' }}>
              Your account is now active. You can log in and start learning.
            </p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Go to Login
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❌</div>
            <h2>Verification failed</h2>
            <p style={{ color: '#6b7280', margin: '12px 0 8px' }}>{message}</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '16px' }}>
              Need a new link? <Link to="/register">Register again</Link> or contact support.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
