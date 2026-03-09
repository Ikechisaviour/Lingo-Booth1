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

export { colors };
export default theme;
