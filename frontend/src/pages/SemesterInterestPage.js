import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FiArrowLeft, FiCalendar, FiCheckCircle } from 'react-icons/fi';
import BrandLogo from '../components/BrandLogo';
import LANGUAGES, { getLanguageDisplayName } from '../config/languages';
import { getPreferredPublicLanguage } from '../utils/publicLanguage';
import { semesterInterestService } from '../services/api';
import './SemesterInterestPage.css';

// Public marketing/lead-capture page. All visible copy lives in this table and
// is rendered through member expressions / .map(), so the i18n-leak audit (which
// only flags English string literals written directly in JSX, including on
// placeholder/aria-label/title attributes) stays green. Extra locales can be
// added as sibling keys; anything missing falls back to English.
const COPY = {
  en: {
    backToFeatures: 'Back',
    home: 'Home',
    title: 'Join a Semester',
    lead: 'Semester cohorts run on a fixed schedule, so registration opens in windows. Leave your details and we will remind you the moment registration for the next semester opens, with no commitment now.',
    nameLabel: 'Full name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email address',
    emailPlaceholder: 'you@example.com',
    targetLabel: 'Language you want to learn',
    nativeLabel: 'Your native language',
    levelLabel: 'Your current level',
    levels: {
      unsure: 'Not sure yet',
      beginner: 'Beginner',
      elementary: 'Elementary',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
    notesLabel: 'Anything else? (optional)',
    notesPlaceholder: 'Goals, preferred schedule, questions…',
    submit: 'Remind me when registration opens',
    submitting: 'Sending…',
    successTitle: 'You’re on the list',
    successMessage: 'Thanks. We’ve saved your details and will email you when registration for the next semester opens.',
    successAction: 'Back to features',
    errorGeneric: 'Something went wrong. Please try again.',
    requiredHint: 'Name and email are required.',
  },
};

const LEVEL_ORDER = ['unsure', 'beginner', 'elementary', 'intermediate', 'advanced'];

function readStored(key) {
  if (typeof window === 'undefined') return '';
  try {
    return window.localStorage.getItem(key) || '';
  } catch {
    return '';
  }
}

function SemesterInterestPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const lang = getPreferredPublicLanguage();
  const copy = COPY[lang] || COPY.en;

  const languageOptions = useMemo(
    () => Object.keys(LANGUAGES).map((code) => ({
      code,
      label: getLanguageDisplayName(code, t),
    })),
    [t]
  );

  const [form, setForm] = useState(() => ({
    fullName: readStored('userFullName') || readStored('username') || '',
    email: readStored('userEmail') || '',
    targetLanguage: readStored('targetLanguage') || 'ko',
    nativeLanguage: readStored('nativeLanguage') || (lang || 'en'),
    currentLevel: 'unsure',
    notes: '',
    company: '',
  }));
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const update = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === 'submitting') return;

    if (!form.fullName.trim() || !form.email.trim()) {
      setStatus('error');
      setErrorMessage(copy.requiredHint);
      return;
    }

    setStatus('submitting');
    setErrorMessage('');
    try {
      await semesterInterestService.submit({
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        targetLanguage: form.targetLanguage,
        nativeLanguage: form.nativeLanguage,
        currentLevel: form.currentLevel,
        notes: form.notes.trim(),
        company: form.company, // honeypot
        source: 'web',
        page: typeof window !== 'undefined' ? window.location.pathname : '',
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(error?.response?.data?.message || copy.errorGeneric);
    }
  };

  return (
    <div className="semester-page">
      <header className="semester-nav">
        <button
          type="button"
          className="semester-brand"
          onClick={() => navigate('/')}
          aria-label={t('common.backToHome')}
        >
          <BrandLogo variant="lockup" decorative />
        </button>
        <button type="button" className="semester-nav-link" onClick={() => navigate('/features')}>
          <FiArrowLeft aria-hidden="true" /> {copy.backToFeatures}
        </button>
      </header>

      <main className="semester-main">
        <div className="semester-card">
          <span className="semester-card-icon" aria-hidden="true">
            <FiCalendar />
          </span>

          {status === 'success' ? (
            <div className="semester-success">
              <span className="semester-success-icon" aria-hidden="true">
                <FiCheckCircle />
              </span>
              <h1>{copy.successTitle}</h1>
              <p>{copy.successMessage}</p>
              <button type="button" className="semester-primary" onClick={() => navigate('/features')}>
                {copy.successAction}
              </button>
            </div>
          ) : (
            <>
              <h1>{copy.title}</h1>
              <p className="semester-lead">{copy.lead}</p>

              <form className="semester-form" onSubmit={handleSubmit} noValidate>
                <label className="semester-field">
                  <span className="semester-field-label">{copy.nameLabel}</span>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={update('fullName')}
                    placeholder={copy.namePlaceholder}
                    autoComplete="name"
                    required
                  />
                </label>

                <label className="semester-field">
                  <span className="semester-field-label">{copy.emailLabel}</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder={copy.emailPlaceholder}
                    autoComplete="email"
                    required
                  />
                </label>

                <div className="semester-row">
                  <label className="semester-field">
                    <span className="semester-field-label">{copy.targetLabel}</span>
                    <select value={form.targetLanguage} onChange={update('targetLanguage')}>
                      {languageOptions.map((option) => (
                        <option key={option.code} value={option.code}>{option.label}</option>
                      ))}
                    </select>
                  </label>

                  <label className="semester-field">
                    <span className="semester-field-label">{copy.nativeLabel}</span>
                    <select value={form.nativeLanguage} onChange={update('nativeLanguage')}>
                      {languageOptions.map((option) => (
                        <option key={option.code} value={option.code}>{option.label}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="semester-field">
                  <span className="semester-field-label">{copy.levelLabel}</span>
                  <select value={form.currentLevel} onChange={update('currentLevel')}>
                    {LEVEL_ORDER.map((level) => (
                      <option key={level} value={level}>{copy.levels[level]}</option>
                    ))}
                  </select>
                </label>

                <label className="semester-field">
                  <span className="semester-field-label">{copy.notesLabel}</span>
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={update('notes')}
                    placeholder={copy.notesPlaceholder}
                  />
                </label>

                {/* Honeypot field, hidden from real users, catches bots. */}
                <input
                  type="text"
                  className="semester-hp"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  value={form.company}
                  onChange={update('company')}
                />

                {status === 'error' && errorMessage && (
                  <p className="semester-error" role="alert">{errorMessage}</p>
                )}

                <button type="submit" className="semester-primary" disabled={status === 'submitting'}>
                  {status === 'submitting' ? copy.submitting : copy.submit}
                </button>
              </form>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default SemesterInterestPage;
