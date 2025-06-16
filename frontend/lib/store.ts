import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  accessToken?: string;
  setAccessToken: (t: string) => void;
  clearToken: () => void;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      accessToken: undefined,
      setAccessToken: (token: string) => set({ accessToken: token }),
      clearToken: () => set({ accessToken: undefined }),
      hasHydrated: false,
      setHasHydrated: (v: boolean) => set({ hasHydrated: v }),
    }),
    {
      name: 'auth-storage',
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
