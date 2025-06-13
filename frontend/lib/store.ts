import { create } from 'zustand';

export interface AuthStore {
	accessToken?: string;
}

export const useAuthStore = create<AuthStore>()((set, get) => ({
	accessToken: undefined,
	setAccessToken: (t: string) => set({ accessToken: t })
}));