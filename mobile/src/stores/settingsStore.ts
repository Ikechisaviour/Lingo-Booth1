import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '../i18n';

interface SettingsState {
  nativeLanguage: string;
  targetLanguage: string;
  preferredVoice: string | null;

  setLanguages: (native: string, target: string) => void;
  setNativeLanguage: (lang: string) => void;
  setTargetLanguage: (lang: string) => void;
  setVoice: (voice: string | null) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      nativeLanguage: '',
      targetLanguage: '',
      preferredVoice: null,

      setLanguages: (native, target) => {
        i18n.changeLanguage(native);
        set({ nativeLanguage: native, targetLanguage: target });
      },

      setNativeLanguage: (lang) => {
        i18n.changeLanguage(lang);
        set({ nativeLanguage: lang });
      },

      setTargetLanguage: (lang) =>
        set({ targetLanguage: lang }),

      setVoice: (voice) =>
        set({ preferredVoice: voice }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const useLanguagesReady = () =>
  useSettingsStore((s) => !!s.nativeLanguage && !!s.targetLanguage);
