<!-- app.vue -->
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
// You can keep these if you need them elsewhere in your app
const user = useSupabaseUser();
const supabase = useSupabaseClient();

// If you need to perform any actions on mount, you can keep this
// onMounted(async () => {
//   const { data, error } = await supabase.auth.getSession();
//   if (error) console.error("Error getting session:", error);
// });
</script>
