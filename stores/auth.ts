// stores/auth.ts
import { defineStore } from "pinia";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null
  }),
  getters: {
    isLoggedIn: (state): boolean => !!state.user
  },
  actions: {
    setUser(user: User | null) {
      this.user = user;
    },
    clearUser() {
      this.user = null;
    }
  }
});
