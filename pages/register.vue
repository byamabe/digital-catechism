<!-- pages/register.vue -->
<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create a new account
        </h2>
      </div>
      <RegisterForm @register-success="handleRegisterSuccess" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "#imports";

const router = useRouter();

const handleRegisterSuccess = () => {
  // Redirect to home page or onboarding page after successful registration
  router.push("/");
};
</script>
