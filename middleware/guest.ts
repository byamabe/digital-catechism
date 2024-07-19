// @ts-ignore
export default defineNuxtRouteMiddleware((to, from) => {
  // @ts-ignore
  const user = useSupabaseUser();

  // If the user is authenticated, redirect to home page
  if (user.value) {
    // @ts-ignore
    return navigateTo("/");
  }
});
