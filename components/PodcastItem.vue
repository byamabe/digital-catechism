<!-- components/PodcastItem.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <NuxtLink :to="`/podcast/${podcast.id}`">
      <img
        :src="podcast.coverImage"
        :alt="podcast.title"
        class="w-full h-48 object-cover"
      />
      <div class="p-4">
        <h3 class="font-semibold text-lg mb-2">{{ podcast.title }}</h3>
        <p class="text-gray-600 text-sm mb-2">{{ podcast.description }}</p>
        <p class="text-sm text-indigo-600">
          {{ podcast.episodeCount }} episodes
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  podcast: {
    type: Object,
    required: true
  }
});
</script>
