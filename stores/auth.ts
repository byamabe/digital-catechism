// stores/auth.ts
import { defineStore } from "pinia";
import { useSupabaseClient } from "#imports";
import type { User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  role: string | null;
  isInitialized: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    role: null,
    isInitialized: false
  }),
  actions: {
    async login(email: string, password: string) {
      const client = useSupabaseClient();
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      await this.fetchUser();
      await this.fetchUserRole();
    },
    async logout() {
      const client = useSupabaseClient();
      const { error } = await client.auth.signOut();
      if (error) throw error;
      this.user = null;
      this.role = null;
    },
    async fetchUser() {
      const client = useSupabaseClient();
      const {
        data: { user },
        error
      } = await client.auth.getUser();
      if (error) throw error;
      this.user = user;
    },
    async fetchUserRole() {
      if (!this.user) return;

      const client = useSupabaseClient();
      const { data, error } = await client
        .from("user_roles")
        .select("role")
        .eq("user_id", this.user.id)
        .single();

      if (error) throw error;
      this.role = data?.role ?? null;
    },
    isAdmin(): boolean {
      return this.role === "admin";
    },
    async initializeAuth() {
      if (this.isInitialized) return;

      try {
        await this.fetchUser();
        if (this.user) {
          await this.fetchUserRole();
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        // Handle initialization error (e.g., redirect to login page)
      } finally {
        this.isInitialized = true;
      }
    },
    resetInitialization() {
      this.isInitialized = false;
    }
  }
});
