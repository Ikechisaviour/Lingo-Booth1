// Single source of truth for "which target languages have v2 lessons seeded."
// When a new language is added to backend/curriculum/lessons/, append its
// code here so the version-picker modal and settings toggle surface it.
const V2_AVAILABLE_TARGETS = ['ko'];

function normalizeLang(code) {
  return String(code || '').toLowerCase();
}

function isV2AvailableForTarget(code) {
  return V2_AVAILABLE_TARGETS.includes(normalizeLang(code));
}

function getCurriculumPreference(user, targetLang) {
  if (!user || !targetLang) return null;
  const code = normalizeLang(targetLang);
  const prefs = user.curriculumPreferences;
  if (!prefs) return null;
  // Handle both Map (live document) and plain object (lean docs).
  if (typeof prefs.get === 'function') return prefs.get(code) || null;
  return prefs[code] || null;
}

function userPrefersV2(user, targetLang) {
  return getCurriculumPreference(user, targetLang) === 'v2';
}

module.exports = {
  V2_AVAILABLE_TARGETS,
  isV2AvailableForTarget,
  getCurriculumPreference,
  userPrefersV2,
  normalizeLang,
};
