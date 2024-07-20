<!-- components/AuthModal.vue -->
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
      <h2 class="text-2xl font-bold mb-4">{{ title }}</h2>
      <LoginForm v-if="mode === 'login'" @login-success="handleSuccess" />
      <RegisterForm
        v-else-if="mode === 'register'"
        @register-success="handleSuccess"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import LoginForm from "./LoginForm.vue";
import RegisterForm from "./RegisterForm.vue";

const props = defineProps<{
  isOpen: boolean;
  title: string;
  mode: "login" | "register";
}>();

const emit = defineEmits(["close", "auth-success"]);

const close = () => {
  emit("close");
};

const handleSuccess = () => {
  emit("auth-success");
  close();
};
</script>
