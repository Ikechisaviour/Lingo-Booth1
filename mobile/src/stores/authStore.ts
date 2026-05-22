import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type SubscriptionTier = 'free' | 'plus' | 'pro' | 'ultra';
type AIMemoryScope = 'none' | 'device' | 'cloud';

type AiEntitlements = {
  subscriptionTier?: SubscriptionTier;
  canUseAI?: boolean;
  canSendAI?: boolean;
  canSyncAIMemory?: boolean;
  canUsePracticeContext?: boolean;
  canManageOrganization?: boolean;
  billingSource?: string;
  aiMemoryScope?: AIMemoryScope;
  subscription?: Record<string, any>;
  tokenUsage?: {
    quotaExceeded: boolean;
    resetAt: string;
    resetInMs?: number;
    dateKey?: string;
  };
};

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  userId: string | null;
  username: string | null;
  fullName: string | null;
  userRole: string | null;
  subscriptionTier: SubscriptionTier;
  aiEntitlements: AiEntitlements | null;
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
      fullName?: string;
      role: string;
      subscriptionTier?: SubscriptionTier;
      aiEntitlements?: AiEntitlements;
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
  setFullName: (fullName: string | null) => void;
  setNeedsLanguageSetup: (val: boolean) => void;
}

const effectiveSubscriptionTier = (user: { role?: string; subscriptionTier?: SubscriptionTier }): SubscriptionTier => {
  if (user.role === 'admin') return 'pro';
  return user.subscriptionTier || 'plus';
};

const effectiveAiEntitlements = (user: {
  role?: string;
  subscriptionTier?: SubscriptionTier;
  aiEntitlements?: AuthState['aiEntitlements'];
}) => {
  if (user.role === 'admin') {
    return {
      ...(user.aiEntitlements || {}),
      subscriptionTier: 'pro' as const,
      canUseAI: true,
      canSyncAIMemory: true,
      canUsePracticeContext: true,
      aiMemoryScope: 'cloud' as const,
    };
  }
  if (user.aiEntitlements) return user.aiEntitlements;

  const subscriptionTier = effectiveSubscriptionTier(user);
  const hasCloudFeatures = subscriptionTier === 'pro' || subscriptionTier === 'ultra';
  return {
    subscriptionTier,
    canUseAI: true,
    canSyncAIMemory: hasCloudFeatures,
    canUsePracticeContext: hasCloudFeatures,
    aiMemoryScope: hasCloudFeatures ? 'cloud' as const : subscriptionTier === 'plus' ? 'device' as const : 'none' as const,
  };
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      refreshToken: null,
      userId: null,
      username: null,
      fullName: null,
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
          fullName: data.user.fullName || null,
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
          fullName: null,
          userRole: null,
          subscriptionTier: 'free',
          aiEntitlements: null,
          isGuest: false,
          challengeMode: false,
          needsLanguageSetup: false,
        }),

      enterGuestMode: () =>
        set({ isGuest: true, token: null, userId: null, username: null, fullName: null, userRole: null, subscriptionTier: 'free', aiEntitlements: null }),

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

      setFullName: (fullName) =>
        set({ fullName }),

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
