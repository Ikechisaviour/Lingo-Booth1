/**
 * playerNotification.ts
 *
 * Shows a persistent "Now Playing" notification when flashcard autoplay is
 * active. The notification is visible in the notification drawer when the
 * app is minimised, giving users a quick view of the current card and a
 * one-tap way to stop playback.
 *
 * On Android this notification includes a STOP action button.
 * On iOS it shows as a banner / notification centre entry.
 *
 * Note: In Expo Go the notification icon defaults to the generic Expo icon.
 * In an EAS production / dev-client build the app icon is used.
 */

import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const CHANNEL_ID = 'flashcard-autoplay';
const NOTIFICATION_ID = 'flashcard-player';

// Set up the notification handler (show even when app is foregrounded)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: false, // don't pop alert when app is open
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

let channelCreated = false;

async function ensureChannel() {
  if (Platform.OS !== 'android' || channelCreated) return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Flashcard Auto-Play',
    importance: Notifications.AndroidImportance.LOW, // silent, no sound
    sound: null,
    vibrationPattern: null,
    showBadge: false,
  });
  channelCreated = true;
}

/** Request notification permissions if not already granted. */
export async function requestPermissions(): Promise<boolean> {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

/**
 * Show (or update) the mini-player notification.
 * @param targetWord  The word being studied in the target language (e.g. 안녕하세요)
 * @param nativeWord  The translation in the native language (e.g. Hello)
 * @param cardNum     Current card number (1-based)
 * @param total       Total cards in the study deck
 */
export async function showPlayerNotification(
  targetWord: string,
  nativeWord: string,
  cardNum: number,
  total: number,
): Promise<void> {
  try {
    await ensureChannel();
    await Notifications.scheduleNotificationAsync({
      identifier: NOTIFICATION_ID,
      content: {
        title: `🎴 ${targetWord}`,
        body: `${nativeWord}  ·  Card ${cardNum} of ${total}`,
        data: { type: 'flashcard-player' },
        sticky: true,           // Android: stays even after swipe
        ...(Platform.OS === 'android' && {
          channelId: CHANNEL_ID,
          autoDismiss: false,
          ongoing: true,        // makes it non-dismissible (like a media player)
          priority: Notifications.AndroidNotificationPriority.LOW,
          color: '#58cc02',
        }),
      },
      trigger: null, // deliver immediately
    });
  } catch {
    // Notification permission not granted — silently ignore
  }
}

/** Dismiss the mini-player notification. */
export async function dismissPlayerNotification(): Promise<void> {
  try {
    await Notifications.dismissNotificationAsync(NOTIFICATION_ID);
  } catch {}
}
