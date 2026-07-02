import { Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { notificationService } from './api';
import { useAuthStore } from '../stores/authStore';

const DEVICE_ID_KEY = 'lingoDeviceId';
const PUSH_TOKEN_KEY = 'serverPushToken';
const CHANNEL_ID = 'lingo_booth_notifications';

const createDeviceId = () => `mobile-${Date.now()}-${Math.random().toString(36).slice(2, 14)}`;

async function getDeviceId() {
  const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (stored) return stored;
  const created = createDeviceId();
  await AsyncStorage.setItem(DEVICE_ID_KEY, created);
  return created;
}

function getExpoProjectId() {
  return (
    Constants.expoConfig?.extra?.eas?.projectId
    || Constants.easConfig?.projectId
    || ''
  );
}

async function configureChannel() {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Lingo Booth notifications',
    importance: Notifications.AndroidImportance.HIGH,
    sound: 'default',
    vibrationPattern: [0, 180, 120, 180],
    lightColor: '#58cc02',
    lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
  });
}

async function ensurePermission() {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

export async function registerServerPushToken() {
  const { token, userId, isGuest } = useAuthStore.getState();
  if (!token || !userId || isGuest || Platform.OS === 'web') return false;

  await configureChannel();
  const granted = await ensurePermission();
  if (!granted) return false;

  const projectId = getExpoProjectId();
  if (!projectId) return false;

  const deviceId = await getDeviceId();
  const pushToken = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  if (!pushToken) return false;

  await notificationService.registerPushToken({
    token: pushToken,
    deviceId,
    platform: Platform.OS === 'ios' || Platform.OS === 'android' ? Platform.OS : 'unknown',
  });
  await AsyncStorage.setItem(PUSH_TOKEN_KEY, pushToken);
  return true;
}

export async function unregisterServerPushToken() {
  const deviceId = await getDeviceId();
  const token = await AsyncStorage.getItem(PUSH_TOKEN_KEY);
  await notificationService.unregisterPushToken({ token: token || undefined, deviceId }).catch(() => null);
  await AsyncStorage.removeItem(PUSH_TOKEN_KEY);
}

export function registerServerPushResponseHandler() {
  const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
    const data = response.notification.request.content.data || {};
    if (data.kind !== 'serverNotification') return;
    const route = String(data.route || '/profile');
    const url = route.startsWith('lingobooth://')
      ? route
      : `lingobooth://${route.replace(/^\/+/, '')}`;
    Linking.openURL(url).catch(() => {});
  });

  return () => subscription.remove();
}
