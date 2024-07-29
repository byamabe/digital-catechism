<template>
  <div class="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
    <h1 class="text-2xl font-bold mb-5">Reset Your Password</h1>
    <div v-if="!hasResetCode">
      <p class="text-red-500 mb-4">
        Invalid or missing reset code. Please request a new password reset link.
      </p>
      <button
        @click="goToHome"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Go to Home Page
      </button>
    </div>
    <form v-else @submit.prevent="handleSubmit">
      <div class="mb-4">
        <label for="new-password" class="block mb-2">New Password</label>
        <input
          id="new-password"
          v-model="newPassword"
          type="password"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <div class="mb-4">
        <label for="confirm-password" class="block mb-2"
          >Confirm Password</label
        >
        <input
          id="confirm-password"
          v-model="confirmPassword"
          type="password"
          required
          class="w-full px-3 py-2 border rounded-md"
        />
      </div>
      <p v-if="error" class="text-red-500 mb-4">{{ error }}</p>
      <p v-if="success" class="text-green-500 mb-4">{{ success }}</p>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        :disabled="isLoading"
      >
        {{ isLoading ? "Processing..." : "Reset Password" }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useSupabaseClient } from "#imports";

const supabase = useSupabaseClient();
const route = useRoute();
const router = useRouter();

const newPassword = ref("");
const confirmPassword = ref("");
const error = ref("");
const success = ref("");
const isLoading = ref(false);
const hasResetToken = ref(false);

onMounted(() => {
  const token = route.query.token;
  hasResetToken.value = !!token;
});

const handleSubmit = async () => {
  if (newPassword.value !== confirmPassword.value) {
    error.value = "Passwords do not match";
    return;
  }

  isLoading.value = true;
  error.value = "";
  success.value = "";

  try {
    const token = route.query.token as string;

    // Call the secure_password_reset function
    const { data, error: resetError } = await supabase.rpc(
      "secure_password_reset",
      {
        reset_token: token,
        new_password: newPassword.value
      }
    );

    if (resetError) throw resetError;

    if (data) {
      success.value = "Password reset successfully. Redirecting to login...";
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } else {
      throw new Error(
        "Password reset failed. The reset token may be invalid or expired."
      );
    }
  } catch (e) {
    error.value = (e as Error).message;
  } finally {
    isLoading.value = false;
  }
};

const goToHome = () => {
  router.push("/");
};
</script>
