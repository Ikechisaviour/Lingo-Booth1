import React from 'react';
import { useTranslation } from 'react-i18next';

export default function ContrastNotePage({ lesson, onComplete }) {
  const { t } = useTranslation();
  const targetLanguageName = lesson.targetLang === 'ko'
    ? t('languages.ko', 'Korean')
    : lesson.targetLang.toUpperCase();

  return (
    <div className="v2-card">
      <div className="v2-shell__meta">
        {t('curriculumV2.contrast.meta', 'Contrast - English to {{language}}', { language: targetLanguageName })}
      </div>
      <h2>{lesson.patternGloss || t('curriculumV2.contrast.fallbackTitle', 'Why this is different in your language')}</h2>

      <h3>{t('curriculumV2.contrast.inYourLanguage', 'In your language')}</h3>
      <p className="v2-native">{lesson.l1Pattern}</p>

      <h3>{t('curriculumV2.contrast.inTargetLanguage', 'In {{language}}', { language: targetLanguageName })}</h3>
      <p className="v2-target">{lesson.l2Pattern}</p>

      <h3>{t('curriculumV2.contrast.whyDiffer', 'Why they differ')}</h3>
      <p style={{ lineHeight: 1.7 }}>{lesson.explanation}</p>

      <h3>{t('curriculumV2.contrast.commonMistakes', 'Mistakes English speakers commonly make')}</h3>
      {lesson.commonMistakes.map((m, i) => (
        <div key={i} className="v2-mistake">{m}</div>
      ))}

      <div className="v2-footer">
        <span className="v2-shell__meta">~{lesson.estimatedMinutes} min</span>
        <button className="v2-btn v2-btn--primary" onClick={onComplete}>
          {t('curriculumV2.gotIt', 'Got it')}
        </button>
      </div>
    </div>
  );
}
