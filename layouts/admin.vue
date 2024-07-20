<!-- layouts/admin.vue -->
<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-4">
        <h1 class="text-2xl font-bold text-gray-800">Admin Panel</h1>
      </div>
      <nav class="mt-4">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block px-4 py-2 text-gray-600 hover:bg-gray-200"
          active-class="bg-gray-200 text-gray-900"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-8 overflow-y-auto">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const menuItems = [
  { label: "Dashboard", path: "/admin" },
  { label: "Podcasts", path: "/admin/podcasts" },
  { label: "Episodes", path: "/admin/episodes" },
  { label: "Categories", path: "/admin/categories" }
];

// Check if the user has admin permissions
const user = useSupabaseUser();
const client = useSupabaseClient();

const { data: userRole } = await useAsyncData("userRole", async () => {
  const { data, error } = await client
    .from("user_roles")
    .select("role")
    .eq("user_id", user.value?.id)
    .single();

  if (error) throw error;
  return data?.role;
});

// Redirect if the user is not an admin
if (userRole.value !== "admin") {
  navigateTo("/");
}
</script>
