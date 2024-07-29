// plugins/auth.ts
import { useAuthStore } from "~/stores/auth";
import { useSupabaseClient } from "#imports";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();

  // Function to initialize auth
  const initAuth = async () => {
    try {
      if (!authStore.isInitialized) {
        await authStore.initializeAuth();
      }
    } catch (error) {
      console.error("Failed to initialize auth:", error);
    }
  };

  // Initialize auth
  if (process.client) {
    // On client-side, initialize immediately
    await initAuth();

    // Set up auth state change listener
    const supabase = useSupabaseClient();
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session) {
        await authStore.setUser(session.user);
        await authStore.fetchUserRole();
      } else if (event === "SIGNED_OUT") {
        authStore.clearUser();
      }
    });
  } else {
    // On server-side, add a hook to initialize auth after app is mounted
    nuxtApp.hooks.hook("app:created", async () => {
      await initAuth();
    });
  }

  // Optionally, you can still use the page:finish hook if needed
  if (process.client) {
    nuxtApp.hook("page:finish", () => {
      authStore.resetInitialization();
    });
  }
});
