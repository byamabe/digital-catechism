// global.d.ts
declare module "#app" {
  interface NuxtApp {
    $supabase: any;
  }
}

export {};
