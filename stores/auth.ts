// stores/auth.ts
import { defineStore } from "pinia";
import { useSupabaseClient } from "#imports";
import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "user" | null;

interface AuthState {
  user: User | null;
  userRole: UserRole;
  isInitialized: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    userRole: null,
    isInitialized: false
  }),
  getters: {
    isAdmin: (state): boolean => state.userRole === "admin"
  },
  actions: {
    async initializeAuth() {
      const supabase = useSupabaseClient();

      if (process.server) {
        // Server-side initialization
        const nuxtApp = useNuxtApp();
        const event = nuxtApp.ssrContext?.event;
        if (event && event.context.auth) {
          this.setUser(event.context.auth.user);
          await this.fetchUserRole();
        }
      } else {
        // Client-side initialization
        const {
          data: { session }
        } = await supabase.auth.getSession();
        if (session) {
          this.setUser(session.user);
          await this.fetchUserRole();
        }
      }
      this.isInitialized = true;
    },
    setUser(user: User | null) {
      this.user = user;
    },
    async login(email: string, password: string) {
      const supabase = useSupabaseClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error.message);
        throw error;
      }

      if (data.user) {
        this.setUser(data.user);
        await this.fetchUserRole();
      }

      return data;
    },
    async logout() {
      const supabase = useSupabaseClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error during logout:", error.message);
        throw error;
      }

      this.clearUser();
      this.resetInitialization();

      // Navigate to home page and force a refresh
      await navigateTo("/", { external: true });
    },
    clearUser() {
      this.user = null;
      this.userRole = null;
    },
    async fetchUserRole() {
      if (!this.user) return;

      const supabase = useSupabaseClient();
      const { data, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", this.user.id)
        .single();

      if (data && !error) {
        this.userRole = data.role;
      } else {
        console.error("Error fetching user role:", error);
      }
    },
    resetInitialization() {
      this.isInitialized = false;
    },
    // New method to check if user is admin
    checkIsAdmin(): boolean {
      return this.isAdmin;
    }
  }
});
