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
  const { token, userId, isGuest, needsLanguageSetup, setNeedsLanguageSetup, logout } = useAuthStore();
  const canAccess = !!token || isGuest;

  // Verify account status from the backend
  const verifyAccount = useCallback(() => {
    if (!token || !userId || isGuest) return;

    userService.getProfile(userId)
      .then((res) => {
        const user = res.data;
        if (user.languageSetupComplete === false && !needsLanguageSetup) {
          setNeedsLanguageSetup(true);
        }
      })
      .catch((err) => {
        // Account deleted or token invalid — force logout
        if (err.response?.status === 404 || err.response?.status === 401) {
          logout();
        }
      });
  }, [token, userId, isGuest, needsLanguageSetup]);

  // Check on initial load
  useEffect(() => {
    verifyAccount();
  }, [token, userId]);

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
