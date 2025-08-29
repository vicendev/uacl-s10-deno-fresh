import { createStore } from "zustand/vanilla";
import type { User } from "../schemas/auth.ts";

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (u: User | null) => void;
  setLoading: (v: boolean) => void;
  setError: (m: string | null) => void;
  reset: () => void;
}

/**
 * Store para manejar el estado de autenticación del usuario
 */
export const authStore = createStore<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,
  setUser: (u) => set({ user: u }),
  setLoading: (v) => set({ loading: v }),
  setError: (m) => set({ error: m }),
  reset: () => set({ user: null, loading: false, error: null }),
}));
