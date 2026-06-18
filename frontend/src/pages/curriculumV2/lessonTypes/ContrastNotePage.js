import React from 'react';
import { useTranslation } from 'react-i18next';
import PlayableKorean from '../../../components/PlayableKorean';

export default function ContrastNotePage({ lesson, onComplete }) {
  const { t } = useTranslation();
  const targetLanguageName = lesson.targetLang === 'ko'
    ? t('languages.ko', 'Korean')
    : lesson.targetLang.toUpperCase();

  // Quick spoken sample: extract the Korean text out of l2Pattern by taking the
  // chunk inside the first pair of straight quotes if present (most lessons
  // use the shape `Korean: "안녕하세요" — explanation`).
  const l2SpokenSample = (() => {
    const match = /"([^"]+)"/.exec(lesson.l2Pattern || '');
    return match ? match[1] : '';
  })();

  return (
    <div className="v2-card">
      <div className="v2-shell__meta">
        {t('curriculumV2.contrast.meta', 'Contrast - English to {{language}}', { language: targetLanguageName })}
      </div>
      <h2>{lesson.patternGloss || t('curriculumV2.contrast.fallbackTitle', 'Why this is different in your language')}</h2>

      <h3>{t('curriculumV2.contrast.inYourLanguage', 'In your language')}</h3>
      <p className="v2-native">{lesson.l1Pattern}</p>

      <h3>{t('curriculumV2.contrast.inTargetLanguage', 'In {{language}}', { language: targetLanguageName })}</h3>
      <p className="v2-target">
        {lesson.l2Pattern}
        {l2SpokenSample && (
          <> <PlayableKorean text={l2SpokenSample} ariaLabel={t('curriculumV2.playSample', 'Play sample')} /></>
        )}
      </p>

      <h3>{t('curriculumV2.contrast.whyDiffer', 'Why they differ')}</h3>
      <p style={{ lineHeight: 1.7 }}>{lesson.explanation}</p>

      <h3>{t('curriculumV2.contrast.commonMistakes', 'Mistakes English speakers commonly make')}</h3>
      {lesson.commonMistakes.map((m, i) => (
        <div key={i} className="v2-mistake">{m}</div>
      ))}

      {lesson.culturalNote && (
        <>
          <h3>{t('curriculumV2.contrast.cultural', 'Cultural context')}</h3>
          <p style={{ lineHeight: 1.7 }}>{lesson.culturalNote.text}</p>
          {lesson.culturalNote.example && (
            <p className="v2-target" style={{ marginTop: 8 }}>
              {lesson.culturalNote.example}
            </p>
          )}
        </>
      )}

      <div className="v2-footer">
        <span className="v2-shell__meta">~{lesson.estimatedMinutes} min</span>
        <button className="v2-btn v2-btn--primary" onClick={onComplete}>
          {t('curriculumV2.gotIt', 'Got it')}
        </button>
      </div>
    </div>
  );
}
