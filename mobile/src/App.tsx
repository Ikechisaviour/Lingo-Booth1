import React from 'react';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useAuthStore } from './stores/authStore';
import theme, { challengeTheme } from './config/theme';
import RootNavigator from './navigation/RootNavigator';
import ErrorBoundary from './components/common/ErrorBoundary';
import GuestSignupPrompt from './components/common/GuestSignupPrompt';
import './i18n';

const App: React.FC = () => {
  const challengeMode = useAuthStore((state) => state.challengeMode);
  const activeTheme = challengeMode ? challengeTheme : theme;

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root}>
        <PaperProvider theme={activeTheme}>
          <StatusBar style="dark" />
          <RootNavigator />
          <GuestSignupPrompt />
        </PaperProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
