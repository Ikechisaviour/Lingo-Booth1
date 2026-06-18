import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';

// Per-target curriculum version. Source of truth is the User document
// on the server; this is a local cache so synchronous surfaces (HomeScreen,
// navigation) can route conditionally without an API hop. `hydrate*` from
// `getProfile()` keeps the cache in sync after login / language change.
type CurriculumVersion = 'v1' | 'v2';

interface SettingsState {
  nativeLanguage: string;
  targetLanguage: string;
  preferredVoice: string | null;
  preferredVoices: Record<string, string | null>;
  curriculumPreferences: Record<string, CurriculumVersion>;

  setLanguages: (native: string, target: string) => void;
  setNativeLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setVoice: (voice: string | null, language?: string) => void;
  setVoiceMap: (voices: Record<string, string | null>) => void;
  setCurriculumPreference: (target: string, version: CurriculumVersion) => void;
  hydrateCurriculumPreferences: (
    preferences: Record<string, CurriculumVersion> | undefined | null
  ) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      nativeLanguage: '',
      targetLanguage: '',
      preferredVoice: null,
      preferredVoices: {},
      curriculumPreferences: {},

      setLanguages: (native, target) => {
        const nativeCode = normalizeLanguageCode(native);
        const targetCode = normalizeLanguageCode(target);
        i18n.changeLanguage(nativeCode);
        set({ nativeLanguage: nativeCode, targetLanguage: targetCode });
      },

      setNativeLanguage: (lang) => {
        const code = normalizeLanguageCode(lang);
        i18n.changeLanguage(code);
        set({ nativeLanguage: code });
      },

      setTargetLanguage: (lang) =>
        set({ targetLanguage: normalizeLanguageCode(lang) }),

      setVoice: (voice, language) =>
        set((state) => {
          const code = language || state.targetLanguage || '';
          const nextVoices = code
            ? { ...state.preferredVoices, [code]: voice }
            : state.preferredVoices;
          return {
            preferredVoice: !code || code === state.targetLanguage ? voice : state.preferredVoice,
            preferredVoices: nextVoices,
          };
        }),

      setVoiceMap: (voices) =>
        set({ preferredVoices: voices || {} }),

      setCurriculumPreference: (target, version) => {
        const code = normalizeLanguageCode(target);
        if (!code) return;
        set((state) => ({
          curriculumPreferences: { ...state.curriculumPreferences, [code]: version },
        }));
      },

      hydrateCurriculumPreferences: (preferences) => {
        if (!preferences || typeof preferences !== 'object') return;
        const normalized: Record<string, CurriculumVersion> = {};
        for (const [target, version] of Object.entries(preferences)) {
          const code = normalizeLanguageCode(target);
          if (code && (version === 'v1' || version === 'v2')) normalized[code] = version;
        }
        set({ curriculumPreferences: normalized });
      },
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
      merge: (persisted, current) => {
        const saved = (persisted || {}) as Partial<SettingsState>;
        return {
          ...current,
          ...saved,
          nativeLanguage: normalizeLanguageCode(saved.nativeLanguage) || current.nativeLanguage,
          targetLanguage: normalizeLanguageCode(saved.targetLanguage) || current.targetLanguage,
        };
      },
    }
  )
);

export const useLanguagesReady = () =>
  useSettingsStore((s) => !!s.nativeLanguage && !!s.targetLanguage);

// Read the active target language's curriculum version with derived flags.
// `isUnset` means the learner has never picked — the chooser modal should
// fire (when v2 is available for that target).
export const useCurriculumVersion = () =>
  useSettingsStore((s) => {
    const target = (s.targetLanguage || '').toLowerCase();
    const version = target ? s.curriculumPreferences[target] || null : null;
    return {
      target,
      version,
      isV2: version === 'v2',
      isV1: version === 'v1',
      isUnset: !version,
    };
  });
