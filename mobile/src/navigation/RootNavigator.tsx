import React, { useEffect } from 'react';
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
  const { token, userId, isGuest, needsLanguageSetup, setNeedsLanguageSetup } = useAuthStore();
  const canAccess = !!token || isGuest;

  // Safety net: verify language setup status from the backend on app load
  useEffect(() => {
    if (!token || !userId || isGuest || needsLanguageSetup) return;

    userService.getProfile(userId)
      .then((res) => {
        const user = res.data;
        if (user.languageSetupComplete === false) {
          setNeedsLanguageSetup(true);
        }
      })
      .catch(() => {});
  }, [token, userId]);

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
