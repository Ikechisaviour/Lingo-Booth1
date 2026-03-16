import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { useRoute, useNavigation } from '@react-navigation/native';
import { authService } from '../../services/api';
import { colors } from '../../config/theme';

const VerifyEmailScreen: React.FC = () => {
  const { t } = useTranslation();
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const insets = useSafeAreaInsets();
  const token = route.params?.token;

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage(t('verify.noToken', 'No verification token found.'));
      return;
    }

    const verify = async () => {
      try {
        const res = await authService.verifyEmail(token);
        setStatus('success');
        setMessage(res.data?.message || t('verify.success', 'Email verified successfully!'));
      } catch (err: any) {
        setStatus('error');
        setMessage(err.response?.data?.message || t('verify.failed', 'Verification failed. The link may have expired.'));
      }
    };

    verify();
  }, [token, t]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 24 }]}>
      {status === 'loading' && (
        <>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.text}>{t('verify.verifying', 'Verifying your email...')}</Text>
        </>
      )}

      {status === 'success' && (
        <>
          <Text style={styles.icon}>✅</Text>
          <Text variant="titleLarge" style={styles.title}>{t('verify.verified', 'Email Verified!')}</Text>
          <Text style={styles.text}>{message}</Text>
          <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
            {t('verify.goToLogin', 'Go to Login')}
          </Button>
        </>
      )}

      {status === 'error' && (
        <>
          <Text style={styles.icon}>❌</Text>
          <Text variant="titleLarge" style={styles.title}>{t('verify.failedTitle', 'Verification Failed')}</Text>
          <Text style={styles.text}>{message}</Text>
          <Button mode="contained" onPress={() => navigation.navigate('Login')} style={styles.button}>
            {t('verify.backToLogin', 'Back to Login')}
          </Button>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  icon: { fontSize: 72, marginBottom: 20 },
  title: { fontWeight: '800', color: colors.textPrimary, marginBottom: 8, textAlign: 'center' },
  text: { color: colors.textSecondary, textAlign: 'center', fontSize: 15, marginTop: 8, lineHeight: 22 },
  button: { marginTop: 28, borderRadius: 10, paddingHorizontal: 8 },
});

export default VerifyEmailScreen;
