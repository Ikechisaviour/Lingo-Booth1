import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  username: string | null;
  userRole: string | null;
  subscriptionTier: 'free' | 'plus' | 'pro';
  aiEntitlements: {
    subscriptionTier?: 'free' | 'plus' | 'pro';
    canUseAI?: boolean;
    canSendAI?: boolean;
    canSyncAIMemory?: boolean;
    aiMemoryScope?: 'none' | 'device' | 'cloud';
    tokenUsage?: {
      quotaExceeded: boolean;
      resetAt: string;
      resetInMs?: number;
      dateKey?: string;
    };
  } | null;
  isGuest: boolean;
  challengeMode: boolean;
  guestXP: number;
  needsLanguageSetup: boolean;

  login: (data: {
    token: string;
    refreshToken?: string;
    user: {
      id: string;
      username: string;
      role: string;
      subscriptionTier?: 'free' | 'plus' | 'pro';
      aiEntitlements?: {
        subscriptionTier?: 'free' | 'plus' | 'pro';
        canUseAI?: boolean;
        canSendAI?: boolean;
        canSyncAIMemory?: boolean;
        aiMemoryScope?: 'none' | 'device' | 'cloud';
        tokenUsage?: {
          quotaExceeded: boolean;
          resetAt: string;
          resetInMs?: number;
          dateKey?: string;
        };
      };
      xpDecayEnabled?: boolean;
      languageSetupComplete?: boolean;
    };
  }) => void;
  setToken: (token: string) => void;
  logout: () => void;
  enterGuestMode: () => void;
  exitGuestMode: () => void;
  setChallengeMode: (enabled: boolean) => void;
  addGuestXP: (points: number) => void;
  clearGuestXP: () => void;
  setUsername: (username: string) => void;
  setNeedsLanguageSetup: (val: boolean) => void;
}

type SubscriptionTier = 'free' | 'plus' | 'pro';

const effectiveSubscriptionTier = (user: { role?: string; subscriptionTier?: SubscriptionTier }): SubscriptionTier => {
  if (user.role === 'admin') return 'pro';
  return user.subscriptionTier || 'plus';
};

const effectiveAiEntitlements = (user: {
  role?: string;
  aiEntitlements?: AuthState['aiEntitlements'];
}) => {
  if (user.role === 'admin') {
    return {
      ...(user.aiEntitlements || {}),
      subscriptionTier: 'pro' as const,
      canUseAI: true,
      canSyncAIMemory: true,
      aiMemoryScope: 'cloud' as const,
    };
  }
  return user.aiEntitlements || {
    subscriptionTier: 'plus' as const,
    canUseAI: true,
    canSyncAIMemory: false,
    aiMemoryScope: 'device' as const,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      userId: null,
      username: null,
      userRole: null,
      subscriptionTier: 'free',
      aiEntitlements: null,
      isGuest: false,
      challengeMode: false,
      guestXP: 0,
      needsLanguageSetup: false,

      login: (data) =>
        set({
          token: data.token,
          refreshToken: data.refreshToken || null,
          userId: data.user.id,
          username: data.user.username,
          userRole: data.user.role,
          subscriptionTier: effectiveSubscriptionTier(data.user),
          aiEntitlements: effectiveAiEntitlements(data.user),
          isGuest: false,
          challengeMode: data.user.xpDecayEnabled || false,
          needsLanguageSetup: data.user.languageSetupComplete === false,
        }),

      setToken: (token) => set({ token }),

      logout: () =>
        set({
          token: null,
          refreshToken: null,
          userId: null,
          username: null,
          userRole: null,
          subscriptionTier: 'free',
          aiEntitlements: null,
          isGuest: false,
          challengeMode: false,
          needsLanguageSetup: false,
        }),

      enterGuestMode: () =>
        set({ isGuest: true, token: null, userId: null, username: null, userRole: null, subscriptionTier: 'free', aiEntitlements: null }),

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

      setNeedsLanguageSetup: (val) =>
        set({ needsLanguageSetup: val }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => () => {
        useAuthStore.setState({ _hasHydrated: true } as any);
      },
    }
  )
);

// Non-persisted selector for hydration status
export const useHasHydrated = () =>
  useAuthStore((s: any) => !!s._hasHydrated);
