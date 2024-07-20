<!-- pages/admin/index.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Admin Dashboard</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Podcasts</h3>
        <p class="text-3xl font-bold">{{ stats.podcastCount }}</p>
        <NuxtLink to="/admin/podcasts" class="text-blue-500 hover:underline"
          >Manage Podcasts</NuxtLink
        >
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Episodes</h3>
        <p class="text-3xl font-bold">{{ stats.episodeCount }}</p>
        <NuxtLink to="/admin/episodes" class="text-blue-500 hover:underline"
          >Manage Episodes</NuxtLink
        >
      </div>
      <div class="bg-white p-4 rounded shadow">
        <h3 class="text-lg font-semibold mb-2">Categories</h3>
        <p class="text-3xl font-bold">{{ stats.categoryCount }}</p>
        <NuxtLink to="/admin/categories" class="text-blue-500 hover:underline"
          >Manage Categories</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSupabaseClient } from "#imports";

const client = useSupabaseClient();

const stats = ref({
  podcastCount: 0,
  episodeCount: 0,
  categoryCount: 0
});

onMounted(async () => {
  await fetchStats();
});

async function fetchStats() {
  const [podcastCount, episodeCount, categoryCount] = await Promise.all([
    client.from("podcasts").select("id", { count: "exact", head: true }),
    client.from("episodes").select("id", { count: "exact", head: true }),
    client.from("categories").select("id", { count: "exact", head: true })
  ]);

  stats.value = {
    podcastCount: podcastCount.count || 0,
    episodeCount: episodeCount.count || 0,
    categoryCount: categoryCount.count || 0
  };
}
</script>
