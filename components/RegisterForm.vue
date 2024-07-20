<!-- components/RegisterForm.vue -->
<template>
  <form @submit.prevent="handleRegister" class="space-y-4">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700"
        >Name</label
      >
      <input
        v-model="name"
        type="text"
        id="name"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700"
        >Email</label
      >
      <input
        v-model="email"
        type="email"
        id="email"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-gray-700"
        >Password</label
      >
      <input
        v-model="password"
        type="password"
        id="password"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
    <button
      type="submit"
      :disabled="loading"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {{ loading ? "Registering..." : "Register" }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref("");
const loading = ref(false);

const emit = defineEmits(["register-success"]);

const handleRegister = async () => {
  loading.value = true;
  error.value = "";
  try {
    const { error: signUpError } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: { name: name.value }
      }
    });
    if (signUpError) throw signUpError;
    emit("register-success");
  } catch (e) {
    if (e instanceof Error) {
      error.value = e.message;
    } else {
      error.value = "An unexpected error occurred";
    }
  } finally {
    loading.value = false;
  }
};
</script>
