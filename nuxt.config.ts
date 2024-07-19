// nuxt.config.ts
import { defineNuxtConfig, NuxtConfig } from "nuxt/config";

// Extend the NuxtConfig interface
interface SupabaseConfig {
  url?: string;
  key?: string;
}

interface ExtendedNuxtConfig extends NuxtConfig {
  supabase?: SupabaseConfig;
}

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt"],

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,

    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/**"] // This will exclude all routes from automatic redirection
    }
  },

  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },

  compatibilityDate: "2024-07-18"
} as ExtendedNuxtConfig); // Use type assertion here
