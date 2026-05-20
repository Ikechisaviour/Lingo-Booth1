import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useAuthStore } from './stores/authStore';
import theme, { challengeTheme } from './config/theme';
import RootNavigator from './navigation/RootNavigator';
import ErrorBoundary from './components/common/ErrorBoundary';
import GuestSignupPrompt from './components/common/GuestSignupPrompt';
import { installStudyHeartbeat, markStudyInteraction } from './services/studyHeartbeat';
import './i18n';

const App: React.FC = () => {
  const challengeMode = useAuthStore((state) => state.challengeMode);
  const activeTheme = challengeMode ? challengeTheme : theme;

  // Heartbeat: passive engagement (autoplay flashcards, replay, browsing)
  // updates lastAnsweredAt so XP decay doesn't tick through real study time.
  // Awards 0 XP — see services/studyHeartbeat.ts.
  useEffect(() => installStudyHeartbeat(), []);

  return (
    <ErrorBoundary>
      <GestureHandlerRootView style={styles.root} onTouchStart={markStudyInteraction}>
        <SafeAreaProvider>
          <PaperProvider theme={activeTheme}>
            <StatusBar style="light" />
            <RootNavigator />
            <GuestSignupPrompt />
          </PaperProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </ErrorBoundary>
  );
};

const styles = StyleSheet.create({
  root: { flex: 1 },
});

export default App;
