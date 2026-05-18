import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import LanguageSelectScreen from '../screens/auth/LanguageSelectScreen';
import VerifyEmailScreen from '../screens/auth/VerifyEmailScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/auth/ResetPasswordScreen';
import ContactScreen from '../screens/support/ContactScreen';
import BillingScreen from '../screens/billing/BillingScreen';
import CertificateVerifyScreen from '../screens/certificates/CertificateVerifyScreen';

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  LanguageSelect: { mode: 'register' | 'guest' | 'google-setup' };
  VerifyEmail: { token?: string };
  ForgotPassword: undefined;
  ResetPassword: { token?: string };
  Contact: undefined;
  Pricing: undefined;
  CertificateVerify: { certificateId?: string };
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
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Pricing" component={BillingScreen} />
      <Stack.Screen name="CertificateVerify" component={CertificateVerifyScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
