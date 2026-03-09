import { AppState, AppStateStatus } from 'react-native';
import { API_URL } from '../config/api';
import { useAuthStore } from '../stores/authStore';

const FLUSH_INTERVAL_MS = 30_000;

const state = {
  cardsStudied: 0,
  cardsCorrect: 0,
  cardsIncorrect: 0,
  lessonsViewed: 0,
  audioPlays: 0,
  lastActivity: 'home',
  sessionStart: 0,
  flushTimer: null as ReturnType<typeof setTimeout> | null,
  initialized: false,
  appStateSubscription: null as ReturnType<typeof AppState.addEventListener> | null,
};

function isGuest(): boolean {
  return useAuthStore.getState().isGuest;
}

function buildPayload() {
  return {
    timeSpent: Math.floor((Date.now() - state.sessionStart) / 1000),
    cardsStudied: state.cardsStudied,
    cardsCorrect: state.cardsCorrect,
    cardsIncorrect: state.cardsIncorrect,
    lessonsViewed: state.lessonsViewed,
    audioPlays: state.audioPlays,
    lastActivity: state.lastActivity,
  };
}

async function flush() {
  if (!state.initialized || !isGuest()) return;
  try {
    await fetch(`${API_URL}/auth/guest-activity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(buildPayload()),
    });
  } catch {
    // silent — tracking is best-effort
  }
}

function scheduleFlush() {
  if (state.flushTimer) clearTimeout(state.flushTimer);
  state.flushTimer = setTimeout(async () => {
    await flush();
    if (state.initialized) scheduleFlush();
  }, FLUSH_INTERVAL_MS);
}

function handleAppStateChange(nextState: AppStateStatus) {
  if (nextState === 'background' || nextState === 'inactive') {
    flush(); // flush when app goes to background
  }
}

const guestActivityTracker = {
  init() {
    if (state.initialized) return;
    state.sessionStart = Date.now();
    state.cardsStudied = 0;
    state.cardsCorrect = 0;
    state.cardsIncorrect = 0;
    state.lessonsViewed = 0;
    state.audioPlays = 0;
    state.lastActivity = 'home';
    state.initialized = true;
    scheduleFlush();
    state.appStateSubscription = AppState.addEventListener('change', handleAppStateChange);
  },

  destroy() {
    if (!state.initialized) return;
    flush();
    if (state.flushTimer) clearTimeout(state.flushTimer);
    state.appStateSubscription?.remove();
    state.initialized = false;
    state.flushTimer = null;
    state.appStateSubscription = null;
  },

  trackCard(isCorrect: boolean) {
    if (!state.initialized) return;
    state.cardsStudied++;
    if (isCorrect) state.cardsCorrect++;
    else state.cardsIncorrect++;
    state.lastActivity = 'flashcards';
  },

  trackAudio() {
    if (!state.initialized) return;
    state.audioPlays++;
    state.lastActivity = 'flashcards';
  },

  trackLesson() {
    if (!state.initialized) return;
    state.lessonsViewed++;
    state.lastActivity = 'lessons';
  },

  setActivity(type: string) {
    if (!state.initialized) return;
    state.lastActivity = type;
  },
};

export default guestActivityTracker;
