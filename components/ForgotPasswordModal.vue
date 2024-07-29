<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
  >
    <div class="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
      <button
        @click="close"
        class="float-right text-gray-500 hover:text-gray-700"
      >
        <svg
          class="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <h2 class="text-2xl font-bold mb-4">Reset Password</h2>
      <form @submit.prevent="handleSubmit">
        <div v-if="!resetSent">
          <div class="mb-4">
            <label for="email" class="block mb-2">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              required
              class="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            :disabled="isLoading"
          >
            {{ isLoading ? "Sending..." : "Send Reset Link" }}
          </button>
        </div>
        <div v-else>
          <p class="text-green-500 mb-4">
            Password reset link sent. Please check your email.
          </p>
          <button
            @click="close"
            class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useSupabaseClient } from "#imports";

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(["close", "reset-success"]);

const email = ref("");
const error = ref("");
const isLoading = ref(false);
const resetSent = ref(false);

const supabase = useSupabaseClient();

const close = () => {
  emit("close");
};

const handleSubmit = async () => {
  isLoading.value = true;
  error.value = "";

  try {
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(
      email.value,
      {
        redirectTo: `${window.location.origin}/reset-password?token=`
      }
    );

    if (resetError) throw resetError;

    resetSent.value = true;
    emit("reset-success");
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    isLoading.value = false;
  }
};
</script>
