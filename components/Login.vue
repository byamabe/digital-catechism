<!-- components/Login.vue -->
<template>
  <div class="max-w-md mx-auto mt-8">
    <form
      @submit.prevent="handleLogin"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <!-- Form fields remain the same -->
    </form>
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";

const email = ref("");
const password = ref("");
const error = ref("");

const supabase = useSupabaseClient();
const authStore = useAuthStore();
const router = useRouter();

const handleLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });
    if (error) throw error;
    authStore.setUser(data.user);
    router.push("/");
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = "An unknown error occurred";
    }
  }
};
</script>
