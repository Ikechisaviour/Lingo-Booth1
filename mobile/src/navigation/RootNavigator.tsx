import React, { useEffect, useCallback } from 'react';
import { AppState, View, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useAuthStore, useHasHydrated } from '../stores/authStore';
import { useLanguagesReady } from '../stores/settingsStore';
import { userService } from '../services/api';
import { colors } from '../config/theme';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import EmailVerificationBanner from '../components/EmailVerificationBanner';

const prefix = Linking.createURL('/');

const linking: LinkingOptions<any> = {
  prefixes: [prefix, 'lingobooth://', 'https://lingobooth.com'],
  config: {
    screens: {
      VerifyEmail: 'verify-email/:token',
      Login: 'login',
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
    <Image
      source={require('../../assets/icon.png')}
      style={splashStyles.logo}
      resizeMode="contain"
    />
    <Text style={splashStyles.brandName}>Lingo Booth</Text>
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
  logo: { width: 100, height: 100, marginBottom: 16 },
  brandName: { color: '#fff', fontSize: 32, fontWeight: '800', letterSpacing: 0.5 },
  spinner: { marginTop: 32 },
});

const RootNavigator: React.FC = () => {
  const hasHydrated = useHasHydrated();
  const { token, userId, isGuest, needsLanguageSetup } = useAuthStore();
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
    </NavigationContainer>
  );
};

export default RootNavigator;
