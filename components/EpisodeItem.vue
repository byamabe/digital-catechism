<!-- components/EpisodeItem.vue -->
<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-4">
    <h3 class="font-semibold text-lg mb-2">{{ episode.title }}</h3>
    <p class="text-gray-600 text-sm mb-2">
      {{ formatDate(episode.publishDate) }} • {{ episode.duration }}
    </p>
    <p class="text-gray-700 mb-2">{{ episode.description }}</p>
    <button
      class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
    >
      Play Episode
    </button>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  episode: {
    type: Object,
    required: true
  }
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}
</script>
