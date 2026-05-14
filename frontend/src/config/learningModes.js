export const LEARNING_MODES = {
  relaxed: 'relaxed',
  challenge: 'challenge',
};

export const LEARNING_MODE_THEME = {
  [LEARNING_MODES.relaxed]: {
    primary: '#ff6b35',
    primaryHover: '#e55a2b',
    primaryDark: '#c94920',
    primaryLight: 'rgba(255, 107, 53, 0.1)',
    primarySoft: 'rgba(255, 107, 53, 0.08)',
    primarySoftStrong: 'rgba(255, 107, 53, 0.14)',
    primaryBorderSoft: 'rgba(255, 107, 53, 0.28)',
    primaryGradientEnd: '#ff8c5a',
    primaryShadowColor: 'rgba(255, 107, 53, 0.22)',
  },
  [LEARNING_MODES.challenge]: {
    primary: '#58cc02',
    primaryHover: '#46a302',
    primaryDark: '#3d8a02',
    primaryLight: 'rgba(88, 204, 2, 0.1)',
    primarySoft: 'rgba(88, 204, 2, 0.08)',
    primarySoftStrong: 'rgba(88, 204, 2, 0.14)',
    primaryBorderSoft: 'rgba(88, 204, 2, 0.28)',
    primaryGradientEnd: '#7ed957',
    primaryShadowColor: 'rgba(88, 204, 2, 0.22)',
  },
};

export function learningModeFromChallengeFlag(isChallengeMode) {
  return isChallengeMode ? LEARNING_MODES.challenge : LEARNING_MODES.relaxed;
}

export function getLearningModeTheme(mode) {
  return LEARNING_MODE_THEME[mode] || LEARNING_MODE_THEME[LEARNING_MODES.relaxed];
}
