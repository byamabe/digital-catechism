// nuxt.config.ts
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/supabase", "@pinia/nuxt"],
  plugins: ["~/plugins/auth.ts"],

  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: "/login",
      callback: "/confirm",
      exclude: ["/**"]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config.js"
  },

  // Remove the pinia configuration
  // pinia: {
  //   autoImports: ['defineStore', 'storeToRefs']
  // },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
      compatibilityDate: "2024-07-18"
    }
  },

  devtools: { enabled: true },
  compatibilityDate: "2024-07-19"
});
