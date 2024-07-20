// plugins/auth.ts
import { useAuthStore } from "~/stores/auth";
import { defineNuxtPlugin, useRouter } from "#app";

export default defineNuxtPlugin(async (nuxtApp) => {
  const authStore = useAuthStore();
  const router = useRouter();

  // Initialize auth state
  await authStore.initializeAuth();

  // Add a route middleware to check auth state before each route change
  router.beforeEach(async (to, from, next) => {
    // If auth is not initialized, wait for it
    if (!authStore.isInitialized) {
      await authStore.initializeAuth();
    }
    next();
  });
});
