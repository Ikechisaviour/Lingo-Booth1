import { Platform, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { flashcardService } from './api';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import LANGUAGES, { getLangField } from '../config/languages';

const CHANNEL_ID = 'practice_prompts';
const CATEGORY_ID = 'practice_prompt';
const ACTION_KNOW = 'PRACTICE_PROMPT_KNOW';
const ACTION_REVIEW = 'PRACTICE_PROMPT_REVIEW';
const ACTION_LATER = 'PRACTICE_PROMPT_LATER';
const REMINDER_ENABLED_KEY = 'practicePromptReminderEnabled';
const REMINDER_ID_KEY = 'practicePromptReminderId';
const RESPONSE_LOG_KEY = 'practicePromptResponses';
const DEFAULT_REMINDER_HOUR = 9;
const DEFAULT_REMINDER_MINUTE = 0;

type PracticePrompt = {
  id: string;
  targetText: string;
  nativeText: string;
  targetLanguage: string;
  nativeLanguage: string;
};

type PracticePromptResponse = {
  action: string;
  promptId: string;
  targetText: string;
  nativeText: string;
  createdAt: string;
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const firstText = (...values: unknown[]) =>
  values.map(value => String(value || '').trim()).find(Boolean) || '';

const notificationTitleFor = (prompt: PracticePrompt) => {
  const targetName = LANGUAGES[prompt.targetLanguage]?.name || 'language';
  return `Quick ${targetName} check`;
};

const promptBodyFor = (prompt: PracticePrompt) => (
  prompt.targetText
    ? `What does "${prompt.targetText}" mean?`
    : 'Ready for one quick practice question?'
);

const responseDataFromPrompt = (prompt: PracticePrompt) => ({
  kind: 'practicePrompt',
  promptId: prompt.id,
  targetText: prompt.targetText,
  nativeText: prompt.nativeText,
  targetLanguage: prompt.targetLanguage,
  nativeLanguage: prompt.nativeLanguage,
  url: 'lingobooth://conversation',
});

async function getNotificationPermission(requestIfNeeded = true) {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return current;
  if (!requestIfNeeded) return current;
  return Notifications.requestPermissionsAsync();
}

async function configureNotificationSurface() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Practice prompts',
      importance: Notifications.AndroidImportance.DEFAULT,
      sound: 'default',
      vibrationPattern: [0, 180, 120, 180],
      lightColor: '#58cc02',
    });
  }

  await Notifications.setNotificationCategoryAsync(CATEGORY_ID, [
    {
      identifier: ACTION_KNOW,
      buttonTitle: 'I know it',
      options: { opensAppToForeground: false },
    },
    {
      identifier: ACTION_REVIEW,
      buttonTitle: 'Review',
      options: { opensAppToForeground: true },
    },
    {
      identifier: ACTION_LATER,
      buttonTitle: 'Later',
      options: { opensAppToForeground: false },
    },
  ]);
}

function textForCard(card: Record<string, unknown>, language: string) {
  const field = getLangField(language);
  return firstText(card[field], card[language], language === 'ko' ? card.korean : '', language === 'en' ? card.english : '');
}

async function buildPracticePrompt(): Promise<PracticePrompt> {
  const { targetLanguage, nativeLanguage } = useSettingsStore.getState();
  const { userId, isGuest } = useAuthStore.getState();
  const target = targetLanguage || 'ko';
  const native = nativeLanguage || 'en';
  const seed = Date.now();

  try {
    const response = userId && !isGuest
      ? await flashcardService.getFlashcards(userId, 1, 25, { shuffle: true, seed })
      : await flashcardService.getGuestFlashcards(1, 25, { shuffle: true, seed });
    const cards = Array.isArray(response.data?.cards) ? response.data.cards : [];
    const card = cards.find((item: Record<string, unknown>) => textForCard(item, target));

    if (card) {
      const targetText = textForCard(card, target);
      const nativeText = textForCard(card, native);
      return {
        id: String(card._id || `${seed}`),
        targetText,
        nativeText,
        targetLanguage: target,
        nativeLanguage: native,
      };
    }
  } catch {
    // Fall through to a local prompt if flashcards are not reachable.
  }

  return {
    id: `local-${seed}`,
    targetText: LANGUAGES[target]?.hello || 'Hello',
    nativeText: LANGUAGES[native]?.hello || 'Hello',
    targetLanguage: target,
    nativeLanguage: native,
  };
}

async function cancelStoredReminder() {
  const existingId = await AsyncStorage.getItem(REMINDER_ID_KEY);
  if (existingId) {
    try {
      await Notifications.cancelScheduledNotificationAsync(existingId);
    } catch {}
    await AsyncStorage.removeItem(REMINDER_ID_KEY);
  }
}

async function scheduleDailyPracticePrompt(requestPermission = true) {
  await configureNotificationSurface();
  const permission = await getNotificationPermission(requestPermission);
  if (!permission.granted) return false;

  await cancelStoredReminder();
  const prompt = await buildPracticePrompt();
  const id = await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationTitleFor(prompt),
      subtitle: `${LANGUAGES[prompt.nativeLanguage]?.name || prompt.nativeLanguage} -> ${LANGUAGES[prompt.targetLanguage]?.name || prompt.targetLanguage}`,
      body: promptBodyFor(prompt),
      data: responseDataFromPrompt(prompt),
      categoryIdentifier: CATEGORY_ID,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: DEFAULT_REMINDER_HOUR,
      minute: DEFAULT_REMINDER_MINUTE,
      channelId: CHANNEL_ID,
    },
  });
  await AsyncStorage.setItem(REMINDER_ID_KEY, id);
  return true;
}

async function scheduleLaterPracticePrompt() {
  const prompt = await buildPracticePrompt();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationTitleFor(prompt),
      body: promptBodyFor(prompt),
      data: responseDataFromPrompt(prompt),
      categoryIdentifier: CATEGORY_ID,
      sound: 'default',
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 3,
      channelId: CHANNEL_ID,
    },
  });
}

async function recordPracticeResponse(action: string, data: Record<string, unknown>) {
  const entry: PracticePromptResponse = {
    action,
    promptId: String(data.promptId || ''),
    targetText: String(data.targetText || ''),
    nativeText: String(data.nativeText || ''),
    createdAt: new Date().toISOString(),
  };
  const raw = await AsyncStorage.getItem(RESPONSE_LOG_KEY);
  let history: PracticePromptResponse[] = [];
  try {
    history = raw ? JSON.parse(raw) : [];
  } catch {
    history = [];
  }
  const next = Array.isArray(history) ? [...history, entry].slice(-100) : [entry];
  await AsyncStorage.setItem(RESPONSE_LOG_KEY, JSON.stringify(next));
}

export async function initializePracticeNotifications() {
  await configureNotificationSurface();
  const enabled = await getPracticeRemindersEnabled();
  if (enabled) await refreshPracticeReminderSchedule();
}

export function registerPracticeNotificationResponseHandler() {
  const subscription = Notifications.addNotificationResponseReceivedListener(async (response) => {
    const data = response.notification.request.content.data || {};
    if (data.kind !== 'practicePrompt') return;

    if (response.actionIdentifier === ACTION_KNOW) {
      await recordPracticeResponse('known', data);
      return;
    }

    if (response.actionIdentifier === ACTION_LATER) {
      await recordPracticeResponse('later', data);
      await scheduleLaterPracticePrompt();
      return;
    }

    if (
      response.actionIdentifier === ACTION_REVIEW
      || response.actionIdentifier === Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      await recordPracticeResponse('review', data);
      const url = String(data.url || 'lingobooth://conversation');
      Linking.openURL(url).catch(() => {});
    }
  });

  return () => subscription.remove();
}

export async function getPracticeRemindersEnabled() {
  return (await AsyncStorage.getItem(REMINDER_ENABLED_KEY)) === 'true';
}

export async function setPracticeRemindersEnabled(enabled: boolean) {
  await AsyncStorage.setItem(REMINDER_ENABLED_KEY, enabled ? 'true' : 'false');
  if (!enabled) {
    await cancelStoredReminder();
    return { enabled: false, granted: true };
  }
  const granted = await scheduleDailyPracticePrompt();
  if (!granted) {
    await AsyncStorage.setItem(REMINDER_ENABLED_KEY, 'false');
    await cancelStoredReminder();
  }
  return { enabled: granted, granted };
}

export async function refreshPracticeReminderSchedule() {
  const enabled = await getPracticeRemindersEnabled();
  if (!enabled) return false;
  return scheduleDailyPracticePrompt(false);
}

export async function sendTestPracticePrompt() {
  await configureNotificationSurface();
  const permission = await getNotificationPermission();
  if (!permission.granted) return false;

  const prompt = await buildPracticePrompt();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: notificationTitleFor(prompt),
      subtitle: prompt.nativeText ? `Answer: ${prompt.nativeText}` : undefined,
      body: promptBodyFor(prompt),
      data: responseDataFromPrompt(prompt),
      categoryIdentifier: CATEGORY_ID,
      sound: 'default',
    },
    trigger: null,
  });
  return true;
}

export async function getPracticeNotificationStatus() {
  const permission = await Notifications.getPermissionsAsync();
  return {
    granted: permission.granted,
    status: permission.status,
    enabled: await getPracticeRemindersEnabled(),
  };
}
