import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  LanguageSelect: { mode: 'register' | 'guest' };
  VerifyEmail: { token?: string };
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthStack: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="LanguageSelect" component={LanguageSelectScreen} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
