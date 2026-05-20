import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, useWindowDimensions } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/AuthStack';
import BrandLogo from '../../components/BrandLogo';
import { authService } from '../../services/api';
import { getResponsiveLayout } from '../../utils/responsiveLayout';
import { colors } from '../../config/theme';

type NavProp = NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;

const ForgotPasswordScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const { height: winHeight, width: winWidth } = useWindowDimensions();
  const layout = getResponsiveLayout(winWidth, winHeight);
  const useWideLayout = layout.isWide || layout.isFoldable || layout.isTablet;

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!email.trim()) return;
    setError('');
    setLoading(true);
    try {
      await authService.forgotPassword(email.trim());
      setSent(true);
    } catch (err: any) {
      setError(err.response?.data?.message || t('forgotPassword.error', 'Something went wrong. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.outer}>
        <View style={[styles.authLayout, useWideLayout && styles.authLayoutWide]}>
          <View
            style={[
              styles.brandTop,
              useWideLayout && styles.brandTopWide,
              { paddingTop: useWideLayout ? insets.top + 12 : insets.top + 24 },
            ]}
          >
            <BrandLogo
              variant="lockup"
              markSize={useWideLayout ? 76 : 62}
              wordmarkWidth={useWideLayout ? 218 : 180}
              style={styles.brandLogo}
            />
          </View>

          <ScrollView
            style={[styles.formScroll, useWideLayout && styles.formScrollWide]}
            contentContainerStyle={[
              styles.formContent,
              useWideLayout && styles.formContentWide,
              { paddingBottom: useWideLayout ? insets.bottom + 20 : insets.bottom + 28 },
            ]}
            keyboardShouldPersistTaps="handled"
          >
            <View style={[styles.formCard, useWideLayout && styles.formCardWide]}>
            <Text variant="headlineMedium" style={styles.title}>
              {t('forgotPassword.title', 'Forgot Password')}
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              {t('forgotPassword.subtitle', "Enter your email and we'll send you a link to reset your password.")}
            </Text>

            {!!error && (
              <Text style={styles.errorText}>{error}</Text>
            )}

            {sent ? (
              <View style={styles.sentContainer}>
                <Text style={styles.sentIcon}>📧</Text>
                <Text style={styles.sentTitle}>
                  {t('forgotPassword.checkEmail', 'Check your email')}
                </Text>
                <Text style={styles.sentMessage}>
                  {t('forgotPassword.sentMessage', 'If an account with that email exists, we sent a password reset link.')}
                </Text>
              </View>
            ) : (
              <>
                <TextInput
                  label={t('login.email', 'Email')}
                  value={email}
                  onChangeText={setEmail}
                  mode="outlined"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  style={styles.input}
                  outlineColor={colors.border}
                  activeOutlineColor={colors.primary}
                />

                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  loading={loading}
                  disabled={loading || !email.trim()}
                  style={styles.primaryButton}
                  labelStyle={styles.buttonLabel}
                >
                  {t('forgotPassword.sendLink', 'Send Reset Link')}
                </Button>
              </>
            )}

            <Text
              style={styles.backLink}
              onPress={() => navigation.navigate('Login')}
            >
              {t('forgotPassword.backToLogin', 'Back to Login')}
            </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  outer: { flex: 1, backgroundColor: colors.primary },
  authLayout: { flex: 1 },
  authLayoutWide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    paddingVertical: 18,
    gap: 28,
  },
  brandTop: {
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 28,
  },
  brandTopWide: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingBottom: 0,
  },
  brandLogo: { marginBottom: 12 },
  formScroll: { flex: 1 },
  formContent: { flexGrow: 1 },
  formScrollWide: {
    flex: 1.1,
    maxWidth: 620,
  },
  formContentWide: {
    justifyContent: 'center',
    paddingVertical: 18,
  },
  formCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 28,
    paddingTop: 32,
    paddingBottom: 8,
    flex: 1,
  },
  formCardWide: {
    width: '100%',
    borderRadius: 30,
    flex: 0,
    paddingHorizontal: 32,
    paddingVertical: 30,
  },
  title: { fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  subtitle: { color: colors.textSecondary, marginBottom: 24 },
  input: { marginBottom: 16, backgroundColor: colors.surface },
  primaryButton: { marginTop: 8, borderRadius: 10, backgroundColor: colors.primary },
  buttonLabel: { fontSize: 16, fontWeight: '600', paddingVertical: 4 },
  errorText: {
    color: colors.error,
    backgroundColor: '#fef2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 14,
  },
  sentContainer: { alignItems: 'center', paddingVertical: 24 },
  sentIcon: { fontSize: 48, marginBottom: 16 },
  sentTitle: { fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 8 },
  sentMessage: { fontSize: 14, color: colors.textSecondary, textAlign: 'center', lineHeight: 20 },
  backLink: {
    textAlign: 'center',
    color: colors.primary,
    fontWeight: '600',
    marginTop: 24,
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
