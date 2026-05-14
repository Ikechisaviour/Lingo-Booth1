import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';
import { normalizeLanguageCode } from '../utils/languagePairPolicy';

interface SettingsState {
  nativeLanguage: string;
  targetLanguage: string;
  preferredVoice: string | null;
  preferredVoices: Record<string, string | null>;

  setLanguages: (native: string, target: string) => void;
  setNativeLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setVoice: (voice: string | null, language?: string) => void;
  setVoiceMap: (voices: Record<string, string | null>) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      nativeLanguage: '',
      targetLanguage: '',
      preferredVoice: null,
      preferredVoices: {},

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
