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
      <p>
        That's all the podcasts in our library. Contact us if there are others
        you'd like to see incorporated.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { useSupabaseClient } from "#imports";
import PodcastItem from "~/components/PodcastItem.vue";

const supabase = useSupabaseClient();

const searchQuery = ref("");
const displayedPodcasts = ref([]);
const page = ref(1);
const podcastsPerPage = 9;
const isLoading = ref(false);
const reachedEnd = ref(false);

const loadMorePodcasts = async () => {
  if (isLoading.value || reachedEnd.value) return;

  isLoading.value = true;

  try {
    let query = supabase
      .from("podcasts")
      .select("id, title, description, image_url, episodes(count)")
      .range(
        (page.value - 1) * podcastsPerPage,
        page.value * podcastsPerPage - 1
      )
      .order("created_at", { ascending: false });

    if (searchQuery.value) {
      query = query.or(
        `title.ilike.%${searchQuery.value}%,description.ilike.%${searchQuery.value}%`
      );
    }

    const { data: newPodcasts, error } = await query;

    if (error) throw error;

    if (newPodcasts.length > 0) {
      displayedPodcasts.value.push(
        ...newPodcasts.map((podcast) => ({
          ...podcast,
          coverImage: podcast.image_url,
          episodeCount: podcast.episodes[0].count
        }))
      );
      page.value++;
    } else {
      reachedEnd.value = true;
    }
  } catch (error) {
    console.error("Error fetching podcasts:", error);
  } finally {
    isLoading.value = false;
  }
};

const handleScroll = () => {
  const bottomOfWindow =
    document.documentElement.scrollTop + window.innerHeight >=
    document.documentElement.offsetHeight - 100;
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
