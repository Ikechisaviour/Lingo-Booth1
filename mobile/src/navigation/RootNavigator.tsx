import React, { useEffect, useCallback } from 'react';
import { AppState } from 'react-native';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Linking from 'expo-linking';
import { useAuthStore } from '../stores/authStore';
import { userService } from '../services/api';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';

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

const RootNavigator: React.FC = () => {
  const { token, userId, isGuest, needsLanguageSetup } = useAuthStore();
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

  return (
    <NavigationContainer linking={linking}>
      {!canAccess ? (
        <AuthStack />
      ) : needsLanguageSetup ? (
        <SetupStack />
      ) : (
        <MainTabs />
      )}
    </NavigationContainer>
  );
};

export default RootNavigator;
