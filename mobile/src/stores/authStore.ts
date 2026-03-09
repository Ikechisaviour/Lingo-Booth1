import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  userId: string | null;
  username: string | null;
  userRole: string | null;
  isGuest: boolean;
  challengeMode: boolean;
  guestXP: number;

  login: (data: {
    token: string;
    user: {
      id: string;
      username: string;
      role: string;
      xpDecayEnabled?: boolean;
    };
  }) => void;
  logout: () => void;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  setChallengeMode: (enabled: boolean) => void;
  addGuestXP: (points: number) => void;
  clearGuestXP: () => void;
  setUsername: (username: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      userId: null,
      username: null,
      userRole: null,
      isGuest: false,
      challengeMode: false,
      guestXP: 0,

      login: (data) =>
        set({
          token: data.token,
          userId: data.user.id,
          username: data.user.username,
          userRole: data.user.role,
          isGuest: false,
          challengeMode: data.user.xpDecayEnabled || false,
        }),

      logout: () =>
        set({
          token: null,
          userId: null,
          username: null,
          userRole: null,
          isGuest: false,
          challengeMode: false,
        }),

      enterGuestMode: () =>
        set({ isGuest: true, token: null, userId: null, username: null, userRole: null }),

      exitGuestMode: () =>
        set({ isGuest: false, guestXP: 0 }),

      setChallengeMode: (enabled) =>
        set({ challengeMode: enabled }),

      addGuestXP: (points) =>
        set((state) => ({ guestXP: state.guestXP + points })),

      clearGuestXP: () =>
        set({ guestXP: 0 }),

      setUsername: (username) =>
        set({ username }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
