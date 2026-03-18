import { MD3LightTheme, configureFonts } from 'react-native-paper';

const colors = {
  primary: '#ff6b35',
  primaryHover: '#e55a2b',
  secondary: '#1a1a2e',
  accentGreen: '#58cc02',
  accentBlue: '#1cb0f6',
  accentPurple: '#a560e8',
  accentYellow: '#ffc800',
  accentRed: '#ff4b4b',
  background: '#faf7f2',
  surface: '#ffffff',
  textPrimary: '#1a1a2e',
  textSecondary: '#6b7280',
  textMuted: '#9ca3af',
  border: '#e5e7eb',
  success: '#10b981',
  error: '#ef4444',
  warning: '#f59e0b',
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: colors.primary,
    secondary: colors.secondary,
    background: colors.background,
    surface: colors.surface,
    error: colors.error,
    onSurface: colors.textPrimary,
    onSurfaceVariant: colors.textSecondary,
    outline: colors.border,
  },
  roundness: 12,
};

export const challengeTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    primary: colors.accentGreen,
  },
};

export const shadows = {
  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  md: {
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
  },
  lg: {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
  },
  up: {
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
};

// Pre-computed challenge-mode colors (stable reference — no new object per render)
const challengeColors = Object.freeze({ ...colors, primary: colors.accentGreen, primaryHover: '#46a302' });

export type AppColors = typeof colors;

/**
 * Hook that returns the colors object with `primary` swapped to green
 * when challenge mode is active. Use this instead of importing `colors`
 * directly so screens respond to mode changes.
 */
export function useAppColors(): AppColors {
  // Inline require to avoid circular deps — authStore is tiny
  const { useAuthStore } = require('../stores/authStore');
  const challengeMode = useAuthStore((s: any) => s.challengeMode);
  return challengeMode ? challengeColors : colors;
}

export { colors };
export default theme;
