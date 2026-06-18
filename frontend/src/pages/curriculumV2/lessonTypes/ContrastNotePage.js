import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLessonAudio, prepForSpeech, LessonAudioButton } from '../../../utils/v2Audio';

export default function ContrastNotePage({ lesson, onComplete, onBack }) {
  const { t } = useTranslation();
  const targetLang = lesson.targetLang || 'ko';
  const targetLanguageName = targetLang === 'ko'
    ? t('languages.ko', 'Korean')
    : targetLang.toUpperCase();

  const audio = useLessonAudio(targetLang);

  // Build the per-section spoken scripts. Read EVERYTHING — section
  // headers, body text, every mistake. Parentheticals are NOT stripped:
  // on a contrast page they carry the lesson's morpheme demos like
  // "(으)" or "(있어요)" that a tutor would absolutely say out loud. The
  // splitter routes Korean inside parens to the Korean voice and English
  // inside parens to the English voice automatically. `prepForSpeech`
  // only swaps the V/N/A placeholders ("V-(으)ㄹ" → "verb-(으)ㄹ") so the
  // English voice doesn't read "vee" when it means "any verb stem".
  const titleText = lesson.patternGloss
    || t('curriculumV2.contrast.fallbackTitle', 'Why this is different in your language');
  const metaLine = t('curriculumV2.contrast.meta', 'Contrast - English to {{language}}', { language: targetLanguageName });

  const scripts = useMemo(() => {
    const intro = `${metaLine}. ${titleText}.`;
    const l1 = [
      t('curriculumV2.contrast.inYourLanguage', 'In your language') + '.',
      prepForSpeech(lesson.l1Pattern),
    ];
    const l2 = [
      t('curriculumV2.contrast.inTargetLanguage', 'In {{language}}', { language: targetLanguageName }) + '.',
      prepForSpeech(lesson.l2Pattern),
    ];
    const why = [
      t('curriculumV2.contrast.whyDiffer', 'Why they differ') + '.',
      prepForSpeech(lesson.explanation),
    ];
    const mistakeItems = (lesson.commonMistakes || []).flatMap((m, i) => [
      t('curriculumV2.contrast.mistakeN', 'Mistake {{n}}.', { n: i + 1 }),
      prepForSpeech(m),
    ]);
    const mistakes = [
      t('curriculumV2.contrast.commonMistakes', 'Mistakes English speakers commonly make') + '.',
      ...mistakeItems,
    ];
    const cultural = lesson.culturalNote
      ? [
          t('curriculumV2.contrast.cultural', 'Cultural context') + '.',
          prepForSpeech(lesson.culturalNote.text),
          lesson.culturalNote.example
            ? `${t('curriculumV2.contrast.forExample', 'For example')}: ${prepForSpeech(lesson.culturalNote.example)}`
            : '',
        ].filter(Boolean)
      : [];
    return {
      l1,
      l2,
      why,
      mistakes,
      cultural,
      page: [intro, ...l1, ...l2, ...why, ...mistakes, ...cultural],
    };
  }, [lesson, t, targetLanguageName, titleText, metaLine]);

  const playLabel = t('curriculumV2.playSection', 'Play section');

  return (
    <div className="v2-card">
      <div className="v2-shell__meta v2-contrast__topbar">
        <span>{metaLine}</span>
        <LessonAudioButton
          audio={audio}
          scope="page"
          items={scripts.page}
          variant="primary"
          label={t('curriculumV2.playPage', 'Play whole lesson')}
        />
      </div>

      <h2>{titleText}</h2>

      <div className="v2-contrast__sectionHead">
        <h3>{t('curriculumV2.contrast.inYourLanguage', 'In your language')}</h3>
        <LessonAudioButton audio={audio} scope="l1" items={scripts.l1} label={playLabel} />
      </div>
      <p className="v2-native">{lesson.l1Pattern}</p>

      <div className="v2-contrast__sectionHead">
        <h3>{t('curriculumV2.contrast.inTargetLanguage', 'In {{language}}', { language: targetLanguageName })}</h3>
        <LessonAudioButton audio={audio} scope="l2" items={scripts.l2} label={playLabel} />
      </div>
      <p className="v2-target">{lesson.l2Pattern}</p>

      <div className="v2-contrast__sectionHead">
        <h3>{t('curriculumV2.contrast.whyDiffer', 'Why they differ')}</h3>
        <LessonAudioButton audio={audio} scope="why" items={scripts.why} label={playLabel} />
      </div>
      <p style={{ lineHeight: 1.7 }}>{lesson.explanation}</p>

      <div className="v2-contrast__sectionHead">
        <h3>{t('curriculumV2.contrast.commonMistakes', 'Mistakes English speakers commonly make')}</h3>
        <LessonAudioButton audio={audio} scope="mistakes" items={scripts.mistakes} label={playLabel} />
      </div>
      {(lesson.commonMistakes || []).map((m, i) => {
        const items = [
          t('curriculumV2.contrast.mistakeN', 'Mistake {{n}}.', { n: i + 1 }),
          prepForSpeech(m),
        ];
        return (
          <div key={i} className="v2-mistake v2-contrast__mistake">
            <div className="v2-mistake__text">{m}</div>
            <LessonAudioButton
              audio={audio}
              scope={`mistake-${i}`}
              items={items}
              label={t('curriculumV2.contrast.playItem', 'Play item')}
            />
          </div>
        );
      })}

      {lesson.culturalNote && (
        <>
          <div className="v2-contrast__sectionHead">
            <h3>{t('curriculumV2.contrast.cultural', 'Cultural context')}</h3>
            <LessonAudioButton audio={audio} scope="cultural" items={scripts.cultural} label={playLabel} />
          </div>
          <p style={{ lineHeight: 1.7 }}>{lesson.culturalNote.text}</p>
          {lesson.culturalNote.example && (
            <p className="v2-target" style={{ marginTop: 8 }}>
              {lesson.culturalNote.example}
            </p>
          )}
        </>
      )}

      <div className="v2-footer">
        {onBack && (
          <button className="v2-btn v2-btn--secondary" onClick={onBack}>
            ← {t('curriculumV2.back', 'Back')}
          </button>
        )}
        <span className="v2-shell__meta">~{lesson.estimatedMinutes} min</span>
        <button className="v2-btn v2-btn--primary" onClick={onComplete}>
          {t('curriculumV2.gotIt', 'Got it')}
        </button>
      </div>
    </div>
  );
}
