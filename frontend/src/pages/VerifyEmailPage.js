import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import './Auth.css';

function VerifyEmailPage() {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('verifying'); // 'verifying' | 'success' | 'error'
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = searchParams.get('token');
    if (!token) {
      setStatus('error');
      setMessage(t('verifyEmail.noToken'));
      return;
    }

    api.get(`/auth/verify-email?token=${encodeURIComponent(token)}`)
      .then(() => {
        setStatus('success');
      })
      .catch((err) => {
        setStatus('error');
        setMessage(err.response?.data?.message || t('verifyEmail.failedMessage'));
      });
  }, [searchParams, t]);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src="/images/logo.png" alt="Lingo Booth" className="auth-logo" />

        {status === 'verifying' && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '16px' }}>⏳</div>
            <h2>{t('verifyEmail.verifying')}</h2>
          </div>
        )}

        {status === 'success' && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
            <h2>{t('verifyEmail.success')}</h2>
            <p style={{ color: '#6b7280', margin: '12px 0 24px' }}>
              {t('verifyEmail.successMessage')}
            </p>
            <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
              {t('verifyEmail.goToLogin')}
            </Link>
          </div>
        )}

        {status === 'error' && (
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❌</div>
            <h2>{t('verifyEmail.failed')}</h2>
            <p style={{ color: '#6b7280', margin: '12px 0 8px' }}>{message}</p>
            <p style={{ color: '#9ca3af', fontSize: '0.85rem', marginTop: '16px' }}>
              {t('verifyEmail.needNewLink')} <Link to="/select-language?mode=register">{t('verifyEmail.registerAgain')}</Link> {t('verifyEmail.orContactSupport')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VerifyEmailPage;
