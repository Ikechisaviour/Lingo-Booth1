import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../stores/authStore';
import { userService, authService } from '../services/api';
import { colors } from '../config/theme';

const EmailVerificationBanner: React.FC = () => {
  const { t } = useTranslation();
  const { userId, isGuest, token } = useAuthStore();
  const [emailVerified, setEmailVerified] = useState(true);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!userId || isGuest || !token) return;
    userService.getProfile(userId)
      .then((res) => {
        setEmailVerified(!!res.data.emailVerified);
      })
      .catch(() => {});
  }, [userId, isGuest, token]);

  if (emailVerified || isGuest || !token || dismissed) return null;

  const handleResend = async () => {
    setSending(true);
    try {
      await authService.resendVerification();
      setSent(true);
    } catch {
      // Silently fail — rate limited or other error
    } finally {
      setSending(false);
    }
  };

  return (
    <View style={styles.banner}>
      <View style={styles.content}>
        <Text style={styles.text}>
          {sent
            ? t('emailBanner.sent', 'Verification email sent! Check your inbox.')
            : t('emailBanner.message', 'Please verify your email address.')}
        </Text>
        {!sent && (
          <TouchableOpacity onPress={handleResend} disabled={sending}>
            <Text style={styles.resendLink}>
              {sending
                ? t('common.sending', 'Sending...')
                : t('emailBanner.resend', 'Resend')}
            </Text>
          </TouchableOpacity>
        )}
      </View>
      <TouchableOpacity onPress={() => setDismissed(true)} style={styles.dismiss}>
        <Text style={styles.dismissText}>✕</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#fff8f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ffe0cc',
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  text: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  resendLink: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  dismiss: {
    padding: 4,
    marginLeft: 8,
  },
  dismissText: {
    fontSize: 14,
    color: colors.textMuted,
  },
});

export default EmailVerificationBanner;
