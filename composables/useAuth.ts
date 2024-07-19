export const useAuth = () => {
  const user = useSupabaseUser();

  const isLoggedIn = computed(() => !!user.value);

  // Make sure there's no automatic redirect here

  return {
    user,
    isLoggedIn
  };
};
