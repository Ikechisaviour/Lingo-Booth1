// Resets the XP-decay "last answered" timestamp for passive but engaged
// activity (auto-play flashcards, replaying a tutor reply, browsing class
// items, listening to pronunciation guides, watching the conversation pane
// without typing). Without this, only explicit answers reset decay — so a
// learner who genuinely studied via listening would still lose XP.
//
// Mechanics:
//   - Listen for user-interaction events globally (mousedown, keydown,
//     touchstart, focus, visibilitychange). Stamp `lastInteractionAt`.
//   - Every minute, if the user (a) is logged in, (b) interacted within the
//     last 5 minutes, and (c) the tab is visible, fire a `study_heartbeat`
//     event. The backend dedupes per 2-minute wall bucket so calling more
//     often than that is a no-op.
//   - The heartbeat awards 0 XP. Its only effect is updating
//     `user.lastAnsweredAt` (see backend/utils/xpRewards.js markStudyActivity).

import { userService } from './api';

const ACTIVE_WINDOW_MS = 5 * 60 * 1000;
const TICK_MS = 60 * 1000;

let lastInteractionAt = Date.now();
let lastFireAt = 0;
let installed = false;
let tickHandle = null;

function markInteraction() {
  lastInteractionAt = Date.now();
}

async function maybeFireHeartbeat() {
  if (typeof document === 'undefined') return;
  if (document.visibilityState && document.visibilityState !== 'visible') return;

  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');
  if (!userId || !token) return;
  if (localStorage.getItem('guestMode') === 'true') return;

  const now = Date.now();
  if (now - lastInteractionAt > ACTIVE_WINDOW_MS) return;
  // Throttle even harder than the server bucket so we don't waste requests.
  if (now - lastFireAt < TICK_MS) return;

  lastFireAt = now;
  try {
    await userService.recordLearningEvent(userId, { eventType: 'study_heartbeat' });
  } catch (_) {
    // Network errors are non-fatal — the next tick will retry.
  }
}

export function installStudyHeartbeat() {
  if (installed || typeof window === 'undefined') return () => {};
  installed = true;

  const events = ['mousedown', 'keydown', 'touchstart', 'pointerdown', 'wheel', 'focus'];
  events.forEach((event) => window.addEventListener(event, markInteraction, { passive: true, capture: true }));
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') markInteraction();
    });
  }
  tickHandle = setInterval(() => { maybeFireHeartbeat(); }, TICK_MS);

  // Fire once shortly after install so the very first session minute counts.
  setTimeout(() => { maybeFireHeartbeat(); }, 5000);

  return () => {
    if (tickHandle) clearInterval(tickHandle);
    events.forEach((event) => window.removeEventListener(event, markInteraction, { capture: true }));
    installed = false;
  };
}
