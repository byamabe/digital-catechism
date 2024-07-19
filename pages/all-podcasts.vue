<!-- pages/all-podcasts.vue -->
<template>
  <div>
    <h2 class="text-2xl font-semibold mb-6">All Podcasts</h2>

    <!-- Search -->
    <div class="mb-8">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search podcasts..."
        class="w-full p-2 border border-gray-300 rounded-md"
      />
    </div>

    <!-- Podcast Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <PodcastItem
        v-for="podcast in displayedPodcasts"
        :key="podcast.id"
        :podcast="podcast"
      />
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-center py-4">
      <p>Loading more podcasts...</p>
    </div>

    <!-- End of list indicator -->
    <div v-if="reachedEnd" class="text-center py-4">
      <p>You've reached the end of the list!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import PodcastItem from "~/components/PodcastItem.vue";

// Sample data - replace with actual data or API call
const allPodcasts = ref([
  {
    id: 1,
    title: "Tech Talk",
    description: "Latest in technology",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 50
  },
  {
    id: 2,
    title: "Science Hour",
    description: "Exploring scientific discoveries",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 30
  },
  {
    id: 3,
    title: "Business Insights",
    description: "Strategies for success",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 40
  },
  {
    id: 4,
    title: "Tech Talk",
    description: "Latest in technology",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 50
  },
  {
    id: 5,
    title: "Science Hour",
    description: "Exploring scientific discoveries",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 30
  },
  {
    id: 6,
    title: "Business Insights",
    description: "Strategies for success",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 40
  },
  {
    id: 7,
    title: "Tech Talk",
    description: "Latest in technology",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 50
  },
  {
    id: 8,
    title: "Science Hour",
    description: "Exploring scientific discoveries",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 30
  },
  {
    id: 9,
    title: "Business Insights",
    description: "Strategies for success",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 40
  },
  {
    id: 10,
    title: "Tech Talk",
    description: "Latest in technology",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 50
  },
  {
    id: 11,
    title: "Science Hour",
    description: "Exploring scientific discoveries",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 30
  },
  {
    id: 12,
    title: "Business Insights",
    description: "Strategies for success",
    coverImage: "/api/placeholder/400/300",
    episodeCount: 40
  }
  // Add more podcast objects here...
]);

const searchQuery = ref("");
const displayedPodcasts = ref([]);
const page = ref(1);
const podcastsPerPage = 9;
const isLoading = ref(false);
const reachedEnd = ref(false);

const filteredPodcasts = computed(() => {
  return allPodcasts.value.filter(
    (podcast) =>
      podcast.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      podcast.description
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase())
  );
});

const loadMorePodcasts = () => {
  if (isLoading.value || reachedEnd.value) return;

  isLoading.value = true;
  setTimeout(() => {
    const start = (page.value - 1) * podcastsPerPage;
    const end = start + podcastsPerPage;
    const newPodcasts = filteredPodcasts.value.slice(start, end);

    if (newPodcasts.length > 0) {
      displayedPodcasts.value.push(...newPodcasts);
      page.value++;
    } else {
      reachedEnd.value = true;
    }

    isLoading.value = false;
  }, 500); // Simulating API delay
};

const handleScroll = () => {
  console.log("HANDLE SCROLL");
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight ===
    document.documentElement.offsetHeight;
  if (bottomOfWindow) {
    loadMorePodcasts();
  }
};

onMounted(() => {
  loadMorePodcasts();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

// Reset displayed podcasts when search query changes
watch(searchQuery, () => {
  displayedPodcasts.value = [];
  page.value = 1;
  reachedEnd.value = false;
  loadMorePodcasts();
});
</script>
