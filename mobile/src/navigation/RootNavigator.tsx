import React, { useEffect, useCallback } from 'react';
import { AppState, View, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useAuthStore, useHasHydrated } from '../stores/authStore';
import { useLanguagesReady, useSettingsStore } from '../stores/settingsStore';
import { userService } from '../services/api';
import {
  initializePracticeNotifications,
  refreshPracticeReminderSchedule,
  registerPracticeNotificationResponseHandler,
} from '../services/practicePromptService';
import { colors } from '../config/theme';
import BrandLogo from '../components/BrandLogo';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import EmailVerificationBanner from '../components/EmailVerificationBanner';
import StepUpModal from '../components/StepUpModal';
import CurriculumVersionModal from '../components/CurriculumVersionModal';

const prefix = Linking.createURL('/');

const linking: LinkingOptions<any> = {
  prefixes: [prefix, 'lingobooth://', 'https://lingobooth.com'],
  config: {
    screens: {
      VerifyEmail: 'verify-email/:token',
      ResetPassword: 'reset-password/:token',
      CertificateVerify: 'certificates/verify/:certificateId',
      Login: 'login',
      Contact: 'contact',
      Pricing: 'pricing',
      Conversation: 'conversation',
      Class: 'class',
      Exercise: 'exercise',
      Profile: 'profile',
      Billing: 'billing',
      Institution: 'institution',
    },
  },
};

export type SetupStackParamList = {
  LanguageSelect: { mode: 'google-setup' };
};

const Stack = createNativeStackNavigator<SetupStackParamList>();

const SetupStack: React.FC = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen
      name="LanguageSelect"
      component={LanguageSelectScreen}
      initialParams={{ mode: 'google-setup' }}
    />
  </Stack.Navigator>
);

const SplashScreen: React.FC = () => (
  <View style={splashStyles.container}>
    <BrandLogo variant="lockup" markSize={86} wordmarkWidth={220} style={splashStyles.logo} />
    <ActivityIndicator size="small" color="#fff" style={splashStyles.spinner} />
  </View>
);

const splashStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { marginBottom: 16 },
  spinner: { marginTop: 32 },
});

const RootNavigator: React.FC = () => {
  const hasHydrated = useHasHydrated();
  const { token, userId, isGuest, needsLanguageSetup } = useAuthStore();
  const { nativeLanguage, targetLanguage } = useSettingsStore();
  const languagesReady = useLanguagesReady();
  const canAccess = !!token || isGuest;

  // Verify account status from the backend (uses getState to avoid stale closures)
  const verifyAccount = useCallback(() => {
    const { token: t, userId: uid, isGuest: guest, needsLanguageSetup: nls } = useAuthStore.getState();
    if (!t || !uid || guest) return;

    userService.getProfile(uid)
      .then((res) => {
        const user = res.data;
        if (user.languageSetupComplete === false && !nls) {
          useAuthStore.getState().setNeedsLanguageSetup(true);
        }
      })
      .catch((err) => {
        // Account deleted or token invalid — force logout
        if (err.response?.status === 404 || err.response?.status === 401) {
          useAuthStore.getState().logout();
        }
      });
  }, []);

  // Check on initial load
  useEffect(() => {
    verifyAccount();
  }, [token, userId, verifyAccount]);

  // Re-check when app comes back to foreground
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') verifyAccount();
    });
    return () => sub.remove();
  }, [verifyAccount]);

  useEffect(() => {
    const cleanup = registerPracticeNotificationResponseHandler();
    initializePracticeNotifications().catch(() => {});
    return cleanup;
  }, []);

  useEffect(() => {
    if (!canAccess || !languagesReady) return;
    refreshPracticeReminderSchedule().catch(() => {});
  }, [canAccess, languagesReady, nativeLanguage, targetLanguage]);

  if (!hasHydrated) return <SplashScreen />;

  return (
    <NavigationContainer linking={linking}>
      {!canAccess ? (
        <AuthStack />
      ) : needsLanguageSetup || !languagesReady ? (
        <SetupStack />
      ) : (
        <View style={{ flex: 1 }}>
          <EmailVerificationBanner />
          <MainTabs />
        </View>
      )}
      <StepUpModal />
      <CurriculumVersionModal />
    </NavigationContainer>
  );
};

export default RootNavigator;
