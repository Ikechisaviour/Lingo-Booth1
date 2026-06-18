import { useCallback, useEffect, useState } from 'react';

// localStorage shape: { 'ko': 'v2', 'ja': 'v1', ... }.
// Source of truth lives on the User document; this cache exists so synchronous
// surfaces (Navbar, HomePage CTA) can route conditionally without an API call.
const STORAGE_KEY = 'curriculumPreferences';
const CHANGE_EVENT = 'curriculumPreferencesChanged';

function readPrefs() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch (_) {
    return {};
  }
}

function readTarget() {
  return (localStorage.getItem('targetLanguage') || '').toLowerCase();
}

function compute() {
  const target = readTarget();
  const version = target ? (readPrefs()[target] || null) : null;
  return {
    target,
    version,
    isV2: version === 'v2',
    isV1: version === 'v1',
    isUnset: !version,
  };
}

export function useCurriculumVersion() {
  const get = useCallback(compute, []);
  const [state, setState] = useState(get);
  useEffect(() => {
    const sync = () => setState(get());
    window.addEventListener(CHANGE_EVENT, sync);
    window.addEventListener('targetLanguageChanged', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CHANGE_EVENT, sync);
      window.removeEventListener('targetLanguageChanged', sync);
      window.removeEventListener('storage', sync);
    };
  }, [get]);
  return state;
}

export function setCurriculumPreferenceCache(targetLanguage, version) {
  if (!targetLanguage) return;
  const prefs = readPrefs();
  prefs[String(targetLanguage).toLowerCase()] = version;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function hydrateCurriculumPreferences(curriculumV2) {
  if (!curriculumV2 || !curriculumV2.preferences) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(curriculumV2.preferences));
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}

export function clearCurriculumPreferenceCache() {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new CustomEvent(CHANGE_EVENT));
}
