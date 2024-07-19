<!-- pages/podcast/[id].vue -->
<template>
  <div v-if="podcast">
    <div class="flex items-center mb-6">
      <img
        :src="podcast.coverImage"
        :alt="podcast.title"
        class="w-24 h-24 object-cover rounded-lg mr-4"
      />
      <div>
        <h2 class="text-2xl font-semibold">{{ podcast.title }}</h2>
        <p class="text-gray-600">{{ podcast.description }}</p>
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-xl font-semibold mb-4">Episodes</h3>
      <EpisodeItem
        v-for="episode in displayedEpisodes"
        :key="episode.id"
        :episode="episode"
      />
    </div>

    <!-- Loading indicator -->
    <div v-if="isLoading" class="text-center py-4">
      <p>Loading more episodes...</p>
    </div>

    <!-- End of list indicator -->
    <div v-if="reachedEnd" class="text-center py-4">
      <p>You've reached the end of the episodes list!</p>
    </div>
  </div>
  <div v-else>
    <p>Loading podcast...</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import EpisodeItem from "~/components/EpisodeItem.vue";
const route = useRoute();

const podcastId = route.params.id;

console.log("Podcast page loaded", podcastId);
console.log("Full route object:", route);

onMounted(() => {
  console.log("Podcast page mounted");
});

const { isLoggedIn } = useAuth();

const user = useSupabaseUser();
console.log("Current user:", user.value);

const podcast = ref(null);
const displayedEpisodes = ref([]);
const page = ref(1);
const episodesPerPage = 10;
const isLoading = ref(false);
const reachedEnd = ref(false);

// Simulated API call to fetch podcast details
const fetchPodcastDetails = async (id) => {
  // In a real app, this would be an API call
  return {
    id: id,
    title: "Example Podcast",
    description: "This is an example podcast description.",
    coverImage: "/api/placeholder/200/200",
    totalEpisodes: 100 // Added total episodes count
  };
};

// Simulated API call to fetch podcast episodes in reverse chronological order
const fetchPodcastEpisodes = async (id, page, perPage) => {
  // In a real app, this would be an API call
  const podcast = await fetchPodcastDetails(id);
  const totalEpisodes = podcast.totalEpisodes;
  const start = Math.max(totalEpisodes - page * perPage, 0);
  const end = totalEpisodes - (page - 1) * perPage;

  return Array.from({ length: end - start }, (_, i) => ({
    id: end - i,
    title: `Episode ${end - i}`,
    description: `This is the description for episode ${end - i}.`,
    publishDate: new Date(
      Date.now() - (totalEpisodes - (end - i)) * 24 * 60 * 60 * 1000
    ).toISOString(),
    duration: "30:00"
  }));
};

const loadMoreEpisodes = async () => {
  if (isLoading.value || reachedEnd.value) return;

  isLoading.value = true;
  const newEpisodes = await fetchPodcastEpisodes(
    podcastId,
    page.value,
    episodesPerPage
  );

  if (newEpisodes.length > 0) {
    displayedEpisodes.value.push(...newEpisodes);
    page.value++;
  } else {
    reachedEnd.value = true;
  }

  isLoading.value = false;
};

const handleScroll = () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.offsetHeight - 100;
  if (bottomOfWindow) {
    loadMoreEpisodes();
  }
};

onMounted(async () => {
  podcast.value = await fetchPodcastDetails(podcastId);
  await loadMoreEpisodes();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
