// @ts-ignore
export default defineNuxtRouteMiddleware((to) => {
  // @ts-ignore
  const user = useSupabaseUser();

  if (to.meta.requiresAuth && !user.value) {
    // @ts-ignore
    return navigateTo("/login");
  }
});
