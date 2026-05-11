import React from 'react';
import './PronunciationGuide.css';

const clean = (value) => String(value || '').replace(/\s+/g, ' ').trim();
const comparable = (value) => clean(value)
  .toLowerCase()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '');

function differs(a, b) {
  const left = comparable(a);
  const right = comparable(b);
  return !!left && !!right && left !== right;
}

export function getPronunciationLines(item = {}, targetText = '') {
  const guide = item.pronunciationGuide || {};
  const learner = clean(item.learnerPronunciation || guide.learner || '');
  const official = clean(item.officialPronunciation || guide.official || item.romanization || item.pronunciation || '');
  const target = clean(targetText);

  const showLearner = learner && differs(learner, target);
  const showOfficial = official
    && differs(official, target)
    && (!learner || differs(official, learner));

  return {
    learner: showLearner ? learner : '',
    official: showOfficial ? official : '',
    confidence: item.pronunciationConfidence || guide.confidence || 'strong',
  };
}

function PronunciationGuide({ item, targetText, className = '' }) {
  const { learner, official, confidence } = getPronunciationLines(item, targetText);
  if (!learner && !official) return null;

  return (
    <div className={`pronunciation-guide ${className}`.trim()}>
      {learner && <span className="pronunciation-guide__learner">{learner}</span>}
      {official && <span className="pronunciation-guide__official">{official}</span>}
      {confidence === 'audioFirst' && (
        <span className="pronunciation-guide__note">Listen closely. This spelling is only a guide.</span>
      )}
    </div>
  );
}

export default PronunciationGuide;
