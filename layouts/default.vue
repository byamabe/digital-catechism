<template>
  <div v-if="isAuthReady">
    <header class="bg-blue-900 text-white p-4">
      <div class="container mx-auto">
        <div class="flex flex-col items-start mb-2">
          <NuxtLink to="/" class="text-xl font-bold">Catechize.org</NuxtLink>
        </div>
        <div class="flex justify-between items-center">
          <nav class="flex space-x-4">
            <NuxtLink to="/" class="text-white hover:text-gray-300"
              >Home</NuxtLink
            >
            <NuxtLink to="/all-podcasts" class="text-white hover:text-gray-300"
              >All Podcasts</NuxtLink
            >
            <NuxtLink
              v-if="isAdmin"
              to="/admin"
              class="text-white hover:text-gray-300"
              >Admin</NuxtLink
            >
          </nav>
          <div class="flex items-center space-x-4">
            <template v-if="!authStore.user">
              <button
                @click="openLoginModal"
                class="text-white hover:text-gray-300"
              >
                Login
              </button>
              <button
                @click="openRegisterModal"
                class="text-white hover:text-gray-300"
              >
                Register
              </button>
            </template>
            <template v-else>
              <div class="relative">
                <button
                  @click="toggleDropdown"
                  class="flex items-center space-x-2 text-white hover:text-gray-300"
                  ref="dropdownToggle"
                >
                  <span>{{ authStore.user.email }}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </button>
                <ul
                  v-show="isDropdownOpen"
                  class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700"
                  ref="dropdown"
                >
                  <li>
                    <NuxtLink
                      to="/profile"
                      class="block px-4 py-2 hover:bg-gray-100"
                      >Profile</NuxtLink
                    >
                  </li>
                  <li>
                    <button
                      @click="logout"
                      class="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
    <AuthModal
      v-if="isAuthModalOpen"
      :is-open="isAuthModalOpen"
      :title="authModalTitle"
      :mode="authModalMode"
      @close="closeAuthModal"
      @auth-success="handleAuthSuccess"
      @forgot-password="openForgotPasswordModal"
    />
    <ForgotPasswordModal
      v-if="isForgotPasswordModalOpen"
      :is-open="isForgotPasswordModalOpen"
      @close="closeForgotPasswordModal"
      @reset-success="handleResetSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { useAuthStore } from "~/stores/auth";
import type { UserRole } from "~/stores/auth";
import AuthModal from "~/components/AuthModal.vue";
import ForgotPasswordModal from "~/components/ForgotPasswordModal.vue";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isAdmin } = storeToRefs(authStore);
const isAuthReady = ref(false);

const isDropdownOpen = ref(false);
const isAuthModalOpen = ref(false);
const isForgotPasswordModalOpen = ref(false);
const authModalTitle = ref("");

type AuthModalMode = "login" | "register";
const authModalMode = ref<AuthModalMode>("login");

const showAdminLink = computed(() => {
  return authStore.checkIsAdmin();
});

onMounted(async () => {
  console.log("Default layout mounted");
  await authStore.initializeAuth();
  isAuthReady.value = true;
  console.log("Auth ready. isAdmin:", authStore.checkIsAdmin());
});

watch(
  () => authStore.user,
  (newUser) => {
    console.log("User changed in auth store:", newUser);
  }
);

watch(
  () => authStore.userRole,
  (newRole: UserRole) => {
    console.log("Role changed in auth store:", newRole);
  }
);

const openLoginModal = () => {
  authModalTitle.value = "Login";
  authModalMode.value = "login";
  isAuthModalOpen.value = true;
};

const openRegisterModal = () => {
  authModalTitle.value = "Register";
  authModalMode.value = "register";
  isAuthModalOpen.value = true;
};

const closeAuthModal = () => {
  isAuthModalOpen.value = false;
};

const openForgotPasswordModal = () => {
  closeAuthModal();
  isForgotPasswordModalOpen.value = true;
};

const closeForgotPasswordModal = () => {
  isForgotPasswordModalOpen.value = false;
};

const handleAuthSuccess = () => {
  closeAuthModal();
};

const handleResetSuccess = () => {
  closeForgotPasswordModal();
  // You might want to show a success message or redirect the user
};

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const logout = async () => {
  try {
    await authStore.logout();
    isDropdownOpen.value = false;
    // The page will automatically refresh and redirect to home
  } catch (error) {
    console.error("Logout failed:", error);
    // Handle error (e.g., show an error message to the user)
  }
};

// Close dropdown when clicking outside
const dropdownToggle = ref<HTMLElement | null>(null);
const dropdown = ref<HTMLElement | null>(null);

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});

function handleClickOutside(event: MouseEvent) {
  if (
    dropdownToggle.value &&
    !dropdownToggle.value.contains(event.target as Node) &&
    dropdown.value &&
    !dropdown.value.contains(event.target as Node)
  ) {
    isDropdownOpen.value = false;
  }
}
</script>
