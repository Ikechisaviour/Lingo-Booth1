// One sessionId per session-shell mount, shared by all lesson-page event
// emissions in that session. Used to group CurriculumV2Event rows for
// analytics and the failure-recovery trigger (item 21).

export function makeSessionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const rand = Math.floor(Math.random() * 1e9).toString(36);
  return `s-${Date.now().toString(36)}-${rand}`;
}
