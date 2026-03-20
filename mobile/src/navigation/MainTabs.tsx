import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';
import { Alert, useWindowDimensions } from 'react-native';
import { useAuthStore } from '../stores/authStore';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAppColors, shadows } from '../config/theme';

import HomeScreen from '../screens/home/HomeScreen';
import LessonsListScreen from '../screens/lessons/LessonsListScreen';
import LessonDetailScreen from '../screens/lessons/LessonDetailScreen';
import FlashcardsScreen from '../screens/flashcards/FlashcardsScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AdminScreen from '../screens/admin/AdminScreen';

const Tab = createBottomTabNavigator();
const LessonsStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const LessonsStackScreen: React.FC = () => (
  <LessonsStack.Navigator screenOptions={{ headerShown: false }}>
    <LessonsStack.Screen name="LessonsList" component={LessonsListScreen} />
    <LessonsStack.Screen name="LessonDetail" component={LessonDetailScreen} />
  </LessonsStack.Navigator>
);

const ProfileStackScreen: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="Admin" component={AdminScreen} />
  </ProfileStack.Navigator>
);

// Dummy screen — never actually rendered; the tab listener intercepts first
const EmptyScreen: React.FC = () => null;

const MainTabs: React.FC = () => {
  const { t } = useTranslation();
  const colors = useAppColors();
  const { isGuest, logout } = useAuthStore();
  const { width: winWidth, height: winHeight } = useWindowDimensions();
  const isCompact = winHeight < 450 || winWidth < 380;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopWidth: 0,
          height: isCompact ? 44 : 64,
          paddingBottom: isCompact ? 4 : 10,
          paddingTop: isCompact ? 4 : 6,
          ...shadows.up,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        tabBarShowLabel: !isCompact,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: t('navbar.home', 'Home'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Lessons"
        component={LessonsStackScreen}
        options={{
          tabBarLabel: t('navbar.lessons', 'Lessons'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-variant" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Flashcards"
        component={FlashcardsScreen}
        options={{
          tabBarLabel: t('navbar.flashcards', 'Flashcards'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cards" color={color} size={size} />
          ),
        }}
      />
      {!isGuest && (
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarLabel: t('navbar.progress', 'Progress'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chart-line" color={color} size={size} />
            ),
          }}
        />
      )}
      {!isGuest && (
        <Tab.Screen
          name="Profile"
          component={ProfileStackScreen}
          options={{
            tabBarLabel: t('navbar.profile', 'Profile'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
      )}
      {isGuest && (
        <Tab.Screen
          name="Login"
          component={EmptyScreen}
          options={{
            tabBarLabel: t('navbar.login', 'Login'),
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="login" color={color} size={size} />
            ),
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              Alert.alert(
                t('guest.loginTitle', 'Sign In'),
                t('guest.loginMessage', 'Create an account or sign in to save your progress and unlock all features.'),
                [
                  { text: t('guest.maybeLater', 'Maybe Later'), style: 'cancel' },
                  { text: t('guest.signIn', 'Sign In'), onPress: () => logout() },
                ],
              );
            },
          }}
        />
      )}
    </Tab.Navigator>
  );
};

export default MainTabs;
