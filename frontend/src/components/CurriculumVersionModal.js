import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FiBookOpen, FiX, FiZap } from 'react-icons/fi';
import { getLanguageDisplayName } from '../config/languages';
import './CurriculumVersionModal.css';

function CurriculumVersionModal({ open, targetLanguage, onChoose, onDismiss, saving }) {
  const { t, i18n } = useTranslation();
  const [pending, setPending] = useState('');

  if (!open) return null;

  const languageName = getLanguageDisplayName(targetLanguage, t)
    || (targetLanguage ? targetLanguage.toUpperCase() : '');

  const pick = async (version) => {
    setPending(version);
    try {
      await onChoose(version);
    } finally {
      setPending('');
    }
  };

  return (
    <div className="curriculum-version-overlay" role="dialog" aria-modal="true" aria-labelledby="curriculum-version-title">
      <div className="curriculum-version-card" lang={i18n.resolvedLanguage}>
        <button
          type="button"
          className="curriculum-version-close"
          onClick={onDismiss}
          aria-label={t('common.close', 'Close')}
        >
          <FiX />
        </button>

        <p className="curriculum-version-kicker">
          {t('curriculumVersion.kicker', 'Curriculum update available')}
        </p>
        <h2 id="curriculum-version-title">
          {t('curriculumVersion.title', 'Choose your {{language}} experience', { language: languageName })}
        </h2>
        <p className="curriculum-version-lede">
          {t(
            'curriculumVersion.lede',
            "We've launched a new {{language}} curriculum with pattern drills, comprehensible-input stories, and a session planner that adapts to what you've forgotten.",
            { language: languageName },
          )}
        </p>

        <div className="curriculum-version-options">
          <button
            type="button"
            className="curriculum-version-option curriculum-version-option--v2"
            onClick={() => pick('v2')}
            disabled={!!pending || saving}
          >
            <span className="curriculum-version-option-badge"><FiZap /> {t('curriculumVersion.recommended', 'Recommended')}</span>
            <strong>{t('curriculumVersion.v2Title', 'Try the new curriculum')}</strong>
            <small>
              {t(
                'curriculumVersion.v2Body',
                'Concept-first lessons across pattern drills, stories, cloze production, vocab SRS, and pronunciation tasks — interleaved by a session planner.',
              )}
            </small>
            <span className="curriculum-version-option-cta">
              {pending === 'v2' ? t('common.saving', 'Saving…') : t('curriculumVersion.tryV2', 'Try it')}
            </span>
          </button>

          <button
            type="button"
            className="curriculum-version-option curriculum-version-option--v1"
            onClick={() => pick('v1')}
            disabled={!!pending || saving}
          >
            <strong>{t('curriculumVersion.v1Title', 'Stay on the classic experience')}</strong>
            <small>
              {t(
                'curriculumVersion.v1Body',
                'Keep using the vocabulary lists and class lessons you know. You can switch any time from Settings.',
              )}
            </small>
            <span className="curriculum-version-option-cta">
              {pending === 'v1' ? t('common.saving', 'Saving…') : t('curriculumVersion.stayV1', 'Keep classic')}
            </span>
          </button>
        </div>

        <button type="button" className="curriculum-version-defer" onClick={onDismiss} disabled={!!pending || saving}>
          <FiBookOpen /> {t('curriculumVersion.decideLater', 'Decide later')}
        </button>
      </div>
    </div>
  );
}

export default CurriculumVersionModal;
