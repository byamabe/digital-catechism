declare module "#app" {
  interface NuxtApp {
    $router: Router;
  }
}

declare module "nuxt/dist/app/nuxt" {
  interface NuxtApp {
    $navigateTo: (to: string) => void;
  }
}

export {};
