<!-- pages/admin/podcasts.vue -->
<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">Manage Podcasts</h2>

    <!-- Add Podcast Form -->
    <form @submit.prevent="addPodcast" class="mb-8 bg-white p-4 rounded shadow">
      <h3 class="text-xl font-semibold mb-4">Add New Podcast</h3>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label for="title" class="block mb-2">Title</label>
          <input
            v-model="newPodcast.title"
            id="title"
            type="text"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label for="author" class="block mb-2">Author</label>
          <input
            v-model="newPodcast.author"
            id="author"
            type="text"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label for="description" class="block mb-2">Description</label>
          <textarea
            v-model="newPodcast.description"
            id="description"
            required
            class="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label for="category" class="block mb-2">Category</label>
          <select
            v-model="newPodcast.category_id"
            id="category"
            required
            class="w-full p-2 border rounded"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="image_url" class="block mb-2">Image URL</label>
          <input
            v-model="newPodcast.image_url"
            id="image_url"
            type="url"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label for="rss_feed_url" class="block mb-2">RSS Feed URL</label>
          <input
            v-model="newPodcast.rss_feed_url"
            id="rss_feed_url"
            type="url"
            required
            class="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label for="website_url" class="block mb-2">Website URL</label>
          <input
            v-model="newPodcast.website_url"
            id="website_url"
            type="url"
            required
            class="w-full p-2 border rounded"
          />
        </div>
      </div>
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Podcast
      </button>
    </form>

    <!-- Podcast List -->
    <div class="bg-white p-4 rounded shadow">
      <h3 class="text-xl font-semibold mb-4">Existing Podcasts</h3>
      <ul>
        <li
          v-for="podcast in podcasts"
          :key="podcast.id"
          class="mb-4 p-4 border rounded"
        >
          <h4 class="text-lg font-semibold">{{ podcast.title }}</h4>
          <p>Author: {{ podcast.author }}</p>
          <p>Category: {{ getCategoryName(podcast.category_id) }}</p>
          <button
            @click="deletePodcast(podcast.id)"
            class="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useSupabaseClient } from "#imports";
import type { Database } from "~/types/database.types";

type Podcast = Database["public"]["Tables"]["podcasts"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];

const client = useSupabaseClient<Database>();

const podcasts = ref<Podcast[]>([]);
const categories = ref<Category[]>([]);
const newPodcast = ref<Omit<Podcast, "id">>({
  title: "",
  description: "",
  author: "",
  image_url: "",
  rss_feed_url: "",
  website_url: "",
  category_id: ""
});

onMounted(async () => {
  await fetchPodcasts();
  await fetchCategories();
});

async function fetchPodcasts() {
  const { data, error } = await client.from("podcasts").select("*");
  if (error) console.error("Error fetching podcasts:", error);
  else podcasts.value = data || [];
}

async function fetchCategories() {
  const { data, error } = await client.from("categories").select("*");
  if (error) console.error("Error fetching categories:", error);
  else categories.value = data || [];
}

async function addPodcast() {
  const { data, error } = await client
    .from("podcasts")
    .insert(newPodcast.value);
  if (error) console.error("Error adding podcast:", error);
  else {
    await fetchPodcasts();
    newPodcast.value = {
      title: "",
      description: "",
      author: "",
      image_url: "",
      rss_feed_url: "",
      website_url: "",
      category_id: ""
    };
  }
}

async function deletePodcast(id: string) {
  const { error } = await client.from("podcasts").delete().eq("id", id);
  if (error) console.error("Error deleting podcast:", error);
  else await fetchPodcasts();
}

function getCategoryName(categoryId: string) {
  const category = categories.value.find((c) => c.id === categoryId);
  return category ? category.name : "Unknown";
}
</script>
