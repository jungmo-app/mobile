import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  setAccessToken: (value: string | null) => void;
}

export const authStore = create<AuthState>(set => ({
  accessToken: null,
  setAccessToken: (value: string | null) => set(() => ({ accessToken: value })),
}));
