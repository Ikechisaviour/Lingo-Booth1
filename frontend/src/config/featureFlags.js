/**
 * Lightweight feature-flag check.
 *
 * Sources, in order of precedence:
 *   1. localStorage `featureFlags` JSON object — used by pilot opt-in.
 *   2. User role 'admin' — admins always have access.
 *   3. Env-driven defaults (REACT_APP_FEATURE_*).
 *
 * Pilot opt-in (from browser console):
 *   localStorage.setItem('featureFlags', JSON.stringify({ curriculumV2: true }));
 *
 * Opt-out:
 *   localStorage.removeItem('featureFlags');
 */

const FLAG_STORAGE_KEY = 'featureFlags';

function readLocalFlags() {
  try {
    const raw = localStorage.getItem(FLAG_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

export function isFeatureEnabled(flagName) {
  const flags = readLocalFlags();
  if (flags[flagName] === true) return true;
  if (localStorage.getItem('userRole') === 'admin') return true;
  const envKey = `REACT_APP_FEATURE_${flagName.toUpperCase()}`;
  return process.env[envKey] === 'true';
}

export function setFeatureFlag(flagName, value) {
  const flags = readLocalFlags();
  if (value) {
    flags[flagName] = true;
  } else {
    delete flags[flagName];
  }
  localStorage.setItem(FLAG_STORAGE_KEY, JSON.stringify(flags));
}

export const FEATURE_FLAGS = {
  CURRICULUM_V2: 'curriculumV2',
};
