import { create } from 'zustand';
import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  loading: false,
  
  setUser: (user) => set({ user, error: null }),
  
  clearError: () => set({ error: null }),
  
  logout: async () => {
    try {
      await signOut(auth);
      set({ user: null, error: null });
    } catch (error) {
      set({ error: error.message });
    }
  }
})); 