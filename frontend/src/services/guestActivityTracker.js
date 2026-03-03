/**
 * guestActivityTracker
 *
 * Accumulates engagement metrics for anonymous (guest) sessions and
 * periodically flushes them to the backend via POST /auth/guest-activity.
 * On page close, a final flush is sent via navigator.sendBeacon so it
 * survives the unload lifecycle.
 *
 * Usage:
 *   guestActivityTracker.init()       — call when guest mode starts
 *   guestActivityTracker.destroy()    — call on logout / sign-up
 *   guestActivityTracker.trackCard(isCorrect)
 *   guestActivityTracker.trackAudio()
 *   guestActivityTracker.trackLesson()
 *   guestActivityTracker.setActivity('flashcards' | 'lessons' | 'home')
 */

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
const FLUSH_INTERVAL_MS = 30_000; // send update every 30 seconds

// Module-level singleton — accumulates across the full guest session
const state = {
  cardsStudied:   0,
  cardsCorrect:   0,
  cardsIncorrect: 0,
  lessonsViewed:  0,
  audioPlays:     0,
  lastActivity:   'home',
  sessionStart:   0,
  flushTimer:     null,
  initialized:    false,
};

function isGuest() {
  return localStorage.getItem('guestMode') === 'true';
}

function buildPayload() {
  return {
    timeSpent:      Math.floor((Date.now() - state.sessionStart) / 1000),
    cardsStudied:   state.cardsStudied,
    cardsCorrect:   state.cardsCorrect,
    cardsIncorrect: state.cardsIncorrect,
    lessonsViewed:  state.lessonsViewed,
    audioPlays:     state.audioPlays,
    lastActivity:   state.lastActivity,
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
  } catch (_) {
    // silent — tracking is best-effort
  }
}

function scheduleFlush() {
  if (state.flushTimer) clearTimeout(state.flushTimer);
  state.flushTimer = setTimeout(async () => {
    await flush();
    if (state.initialized) scheduleFlush(); // reschedule only if still active
  }, FLUSH_INTERVAL_MS);
}

function handleBeforeUnload() {
  if (!state.initialized || !isGuest()) return;
  const data = JSON.stringify(buildPayload());
  // sendBeacon is reliable across page-close; falls back silently if unsupported
  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      `${API_URL}/auth/guest-activity`,
      new Blob([data], { type: 'application/json' })
    );
  }
}

const guestActivityTracker = {
  init() {
    if (state.initialized) return;
    state.sessionStart   = Date.now();
    state.cardsStudied   = 0;
    state.cardsCorrect   = 0;
    state.cardsIncorrect = 0;
    state.lessonsViewed  = 0;
    state.audioPlays     = 0;
    state.lastActivity   = 'home';
    state.initialized    = true;
    scheduleFlush();
    window.addEventListener('beforeunload', handleBeforeUnload);
  },

  destroy() {
    if (!state.initialized) return;
    flush(); // best-effort final flush
    if (state.flushTimer) clearTimeout(state.flushTimer);
    window.removeEventListener('beforeunload', handleBeforeUnload);
    state.initialized = false;
    state.flushTimer  = null;
  },

  /** Called when the guest rates a card correct or incorrect */
  trackCard(isCorrect) {
    if (!state.initialized) return;
    state.cardsStudied++;
    if (isCorrect) state.cardsCorrect++;
    else state.cardsIncorrect++;
    state.lastActivity = 'flashcards';
  },

  /** Called each time the guest triggers a TTS audio play */
  trackAudio() {
    if (!state.initialized) return;
    state.audioPlays++;
    state.lastActivity = 'flashcards';
  },

  /** Called when the guest opens a lesson detail page */
  trackLesson() {
    if (!state.initialized) return;
    state.lessonsViewed++;
    state.lastActivity = 'lessons';
  },

  /** Update the last-activity label without incrementing a counter */
  setActivity(type) {
    if (!state.initialized) return;
    state.lastActivity = type;
  },
};

export default guestActivityTracker;
