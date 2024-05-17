import { create } from 'zustand';

export const useAuthStore = create((set) => ({
  user: null,
  isAuthInitialized: false,
  setUser: (user) => set({ user }),
  setIsAuthInitialized: (isInitialized) =>
    set({ isAuthInitialized: isInitialized }),
}));
