<!-- pages/index.vue -->
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">Welcome to PodcastHub</h2>

    <!-- Featured Podcasts -->
    <section class="mb-12">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-xl font-semibold">Featured Podcasts</h3>
        <NuxtLink
          to="/all-podcasts"
          class="text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          View All Podcasts
        </NuxtLink>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <PodcastItem
          v-for="podcast in featuredPodcasts"
          :key="podcast.id"
          :podcast="podcast"
        />
      </div>
    </section>

    <!-- Topics -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-4">Explore by Topic</h2>
      <div class="flex flex-wrap gap-4">
        <button
          v-for="topic in topics"
          :key="topic"
          class="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors"
        >
          {{ topic }}
        </button>
      </div>
    </section>

    <!-- Recent Episodes -->
    <section>
      <h2 class="text-2xl font-semibold mb-4">Recent Episodes</h2>
      <div class="space-y-4">
        <div
          v-for="episode in recentEpisodes"
          :key="episode.id"
          class="bg-white rounded-lg shadow-md p-4"
        >
          <h3 class="font-semibold text-lg mb-2">{{ episode.title }}</h3>
          <p class="text-gray-600 mb-2">
            {{ episode.podcastName }} • {{ episode.duration }}
          </p>
          <p class="text-sm text-gray-500">{{ episode.description }}</p>
        </div>
      </div>
    </section>

    <!-- Optional: Conditional content for logged-in users -->
    <section v-if="isLoggedIn" class="mt-8">
      <h2 class="text-2xl font-semibold mb-4">
        Your Personalized Recommendations
      </h2>
      <!-- Add personalized content for logged-in users here -->
    </section>
  </div>
</template>

<script setup lang="ts">
console.log("Index page loaded");
import PodcastItem from "../components/PodcastItem.vue";
import { useAuth } from "../composables/useAuth";

const { isLoggedIn } = useAuth();

const featuredPodcasts = [
  {
    id: 1,
    title: "Tech Talk",
    description: "Latest in technology",
    coverImage: "/api/placeholder/400/300"
  },
  {
    id: 2,
    title: "Science Hour",
    description: "Exploring scientific discoveries",
    coverImage: "/api/placeholder/400/300"
  },
  {
    id: 3,
    title: "Business Insights",
    description: "Strategies for success",
    coverImage: "/api/placeholder/400/300"
  }
];

const topics = [
  "Technology",
  "Science",
  "Business",
  "Politics",
  "Entertainment",
  "Sports",
  "Health"
];

const recentEpisodes = [
  {
    id: 1,
    title: "The Future of AI",
    podcastName: "Tech Talk",
    duration: "45 min",
    description: "Exploring the latest developments in artificial intelligence."
  },
  {
    id: 2,
    title: "Climate Change Update",
    podcastName: "Science Hour",
    duration: "30 min",
    description: "Recent findings on global climate patterns."
  },
  {
    id: 3,
    title: "Effective Leadership",
    podcastName: "Business Insights",
    duration: "50 min",
    description: "Key traits of successful business leaders."
  }
];
</script>
