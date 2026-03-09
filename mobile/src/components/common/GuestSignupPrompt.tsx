import React, { useState, useEffect } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '../../stores/authStore';
import { colors } from '../../config/theme';

const PROMPT_DELAY_MS = 3 * 60 * 1000; // 3 minutes

const GuestSignupPrompt: React.FC = () => {
  const { t } = useTranslation();
  const { isGuest, logout } = useAuthStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isGuest) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, PROMPT_DELAY_MS);

    return () => clearTimeout(timer);
  }, [isGuest]);

  if (!isGuest) return null;

  const handleSignup = () => {
    setVisible(false);
    logout(); // Returns to auth stack where they can register
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => setVisible(false)}>
      <View style={styles.overlay}>
        <View style={styles.content}>
          <Text style={styles.icon}>🚀</Text>
          <Text variant="titleLarge" style={styles.title}>
            {t('guest.signupTitle', 'Ready to save your progress?')}
          </Text>
          <Text style={styles.description}>
            {t('guest.signupDesc', 'Create a free account to keep your XP, unlock all features, and track your learning journey.')}
          </Text>

          <View style={styles.benefits}>
            {[
              { icon: '⚡', text: t('guest.benefitXP', 'Keep all your earned XP') },
              { icon: '📊', text: t('guest.benefitProgress', 'Track your progress') },
              { icon: '🏆', text: t('guest.benefitLeaderboard', 'Join the leaderboard') },
            ].map((item, idx) => (
              <View key={idx} style={styles.benefitRow}>
                <Text style={styles.benefitIcon}>{item.icon}</Text>
                <Text style={styles.benefitText}>{item.text}</Text>
              </View>
            ))}
          </View>

          <Button mode="contained" onPress={handleSignup} style={styles.signupBtn}>
            {t('guest.createAccount', 'Create Account')}
          </Button>
          <Button mode="text" onPress={() => setVisible(false)}>
            {t('guest.maybeLater', 'Maybe Later')}
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 28,
    alignItems: 'center',
  },
  icon: { fontSize: 48, marginBottom: 12 },
  title: { fontWeight: '700', color: colors.textPrimary, textAlign: 'center', marginBottom: 8 },
  description: { color: colors.textSecondary, textAlign: 'center', fontSize: 14, lineHeight: 20, marginBottom: 20 },
  benefits: { width: '100%', marginBottom: 20 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  benefitIcon: { fontSize: 20 },
  benefitText: { fontSize: 14, color: colors.textPrimary, fontWeight: '500' },
  signupBtn: { borderRadius: 8, width: '100%', marginBottom: 8 },
});

export default GuestSignupPrompt;
