// @ts-ignore
export default defineNuxtRouteMiddleware((to) => {
  // @ts-ignore
  const user = useSupabaseUser();

  const publicRoutes = [
    "/",
    "/login",
    "/register",
    "/about",
    "/contact",
    "/all-podcasts"
  ];
  const isPublicRoute =
    publicRoutes.includes(to.path) || to.path.startsWith("/podcast/");

  // @ts-ignore
  if (process.env.NODE_ENV === "development") {
    console.log(`Navigating to: ${to.path}`);
    console.log(`Is public route: ${isPublicRoute}`);
    console.log(`User authenticated: ${!!user.value}`);
  }

  if (!isPublicRoute && !user.value) {
    // @ts-ignore
    if (process.env.NODE_ENV === "development") {
      console.log("Redirecting to login");
    }
    // @ts-ignore
    return navigateTo("/login");
  }
});
