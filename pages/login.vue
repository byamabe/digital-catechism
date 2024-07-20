<!-- pages/login.vue -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
      </div>
      <LoginForm @login-success="handleLoginSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "#imports";

const router = useRouter();

const handleLoginSuccess = () => {
  // Redirect to home page or dashboard after successful login
  router.push("/");
};
</script>
