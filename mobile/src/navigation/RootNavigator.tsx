import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { useAuthStore } from '../stores/authStore';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';

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

const RootNavigator: React.FC = () => {
  const { token, isGuest } = useAuthStore();
  const canAccess = !!token || isGuest;

  return (
    <NavigationContainer linking={linking}>
      {canAccess ? <MainTabs /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
