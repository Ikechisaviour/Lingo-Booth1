// Mobile twin of frontend/src/services/studyHeartbeat.js.
// Fires `study_heartbeat` while the app is in the foreground so passive
// engagement (autoplay flashcards, replaying a tutor reply, browsing
// lesson items) resets the XP decay timer. Awards 0 XP by design.
//
// Mechanics:
//   - Stamp `lastInteractionAt` whenever the app foregrounds or whenever
//     `markStudyInteraction()` is called from a touch wrapper.
//   - Every minute, if the user is logged in, the app is foregrounded, and
//     they interacted within the last 5 min, fire the event. Backend
//     dedupes per 2-min bucket so over-firing is harmless.

import { AppState } from 'react-native';
import { userService } from './api';
import { useAuthStore } from '../stores/authStore';

const ACTIVE_WINDOW_MS = 5 * 60 * 1000;
const TICK_MS = 60 * 1000;

let lastInteractionAt = Date.now();
let lastFireAt = 0;
let appStateSubscription: { remove: () => void } | null = null;
let tickHandle: ReturnType<typeof setInterval> | null = null;
let installed = false;

export function markStudyInteraction() {
  lastInteractionAt = Date.now();
}

async function maybeFireHeartbeat() {
  if (AppState.currentState !== 'active') return;
  const { userId, isGuest } = useAuthStore.getState();
  if (!userId || isGuest) return;

  const now = Date.now();
  if (now - lastInteractionAt > ACTIVE_WINDOW_MS) return;
  if (now - lastFireAt < TICK_MS) return;

  lastFireAt = now;
  try {
    await userService.recordLearningEvent(userId, { eventType: 'study_heartbeat' });
  } catch (_) {
    // Non-fatal; next tick will retry.
  }
}

export function installStudyHeartbeat() {
  if (installed) return () => {};
  installed = true;

  appStateSubscription = AppState.addEventListener('change', (state) => {
    if (state === 'active') markStudyInteraction();
  });
  tickHandle = setInterval(() => { maybeFireHeartbeat(); }, TICK_MS);
  // Fire shortly after install so the first session minute counts.
  setTimeout(() => { maybeFireHeartbeat(); }, 5000);

  return () => {
    if (tickHandle) clearInterval(tickHandle);
    if (appStateSubscription) appStateSubscription.remove();
    installed = false;
  };
}
