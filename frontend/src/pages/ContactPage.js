import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCheckCircle, FiMessageCircle, FiSend } from 'react-icons/fi';
import { contactService, userService } from '../services/api';
import { applyPublicLanguage } from '../utils/publicLanguage';
import './ContactPage.css';

function ContactPage() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isSignedIn = !!localStorage.getItem('token') && localStorage.getItem('guestMode') !== 'true';
  const [formData, setFormData] = useState(() => ({
    name: localStorage.getItem('username') || '',
    email: isSignedIn ? (localStorage.getItem('userEmail') || '') : '',
    subject: '',
    message: '',
    company: '',
  }));
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    applyPublicLanguage(i18n);
  }, [i18n]);

  useEffect(() => {
    if (!isSignedIn) return;
    const userId = localStorage.getItem('userId');
    const cachedEmail = localStorage.getItem('userEmail') || '';
    if (cachedEmail || !userId) return;

    userService.getProfile(userId)
      .then((res) => {
        const user = res.data || {};
        localStorage.setItem('userEmail', user.email || '');
        setFormData(current => ({
          ...current,
          name: current.name || user.username || '',
          email: user.email || '',
        }));
      })
      .catch(() => {});
  }, [isSignedIn]);

  const canSubmit = useMemo(() => (
    formData.name.trim().length >= 2 &&
    formData.email.trim().length > 3 &&
    formData.message.trim().length >= 10 &&
    !loading
  ), [formData, loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', message: '' });
    setLoading(true);

    try {
      await contactService.sendMessage({
        ...formData,
        page: window.location.href,
        userAgent: window.navigator.userAgent,
        source: 'web',
        nativeLanguage: localStorage.getItem('nativeLanguage') || '',
        targetLanguage: localStorage.getItem('targetLanguage') || '',
        clientLanguage: window.navigator.language || '',
      });
      setStatus({ type: 'success', message: t('contact.success') });
      setFormData(current => ({
        ...current,
        subject: '',
        message: '',
        company: '',
      }));
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.response?.data?.message || t('contact.error'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="contact-page">
      <section className="contact-shell">
        <button type="button" className="contact-back" onClick={() => navigate(-1)}>
          <FiArrowLeft aria-hidden="true" />
          {t('common.back')}
        </button>

        <div className="contact-intro">
          <span className="contact-kicker">{t('contact.kicker')}</span>
          <h1>{t('contact.title')}</h1>
          <p>{t('contact.subtitle')}</p>
        </div>

        <div className="contact-layout">
          <aside className="contact-card contact-info">
            <div className="contact-icon">
              <FiMessageCircle aria-hidden="true" />
            </div>
            <h2>{t('contact.infoTitle')}</h2>
            <p>{t('contact.infoText')}</p>
          </aside>

          <form className="contact-card contact-form" onSubmit={handleSubmit}>
            {status.message && (
              <div className={`contact-alert ${status.type}`} role={status.type === 'error' ? 'alert' : 'status'}>
                {status.type === 'success' && <FiCheckCircle aria-hidden="true" />}
                <span>{status.message}</span>
              </div>
            )}

            <div className="contact-field-grid">
              <label>
                <span>{t('contact.name')}</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.namePlaceholder')}
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={120}
                />
              </label>

              <label>
                <span>{t('contact.email')}</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t('contact.emailPlaceholder')}
                  autoComplete="email"
                  readOnly={isSignedIn}
                  required
                  maxLength={254}
                />
              </label>
            </div>

            <label>
              <span>{t('contact.subject')}</span>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contact.subjectPlaceholder')}
                maxLength={160}
              />
            </label>

            <label>
              <span>{t('contact.message')}</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.messagePlaceholder')}
                rows={8}
                required
                minLength={10}
                maxLength={5000}
              />
            </label>

            <label className="contact-hidden-field" aria-hidden="true">
              <span>{t('contact.companyTrap', 'Company')}</span>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <button type="submit" className="contact-submit" disabled={!canSubmit}>
              <FiSend aria-hidden="true" />
              {loading ? t('common.sending') : t('contact.send')}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default ContactPage;
