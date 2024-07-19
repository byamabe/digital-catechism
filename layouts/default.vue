<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-indigo-600 text-white">
      <div class="container mx-auto px-4 py-6">
        <h1 class="text-3xl font-bold">Catechize.org</h1>
        <nav class="mt-2">
          <NuxtLink to="/" class="text-white hover:text-indigo-200 mr-4"
            >Home</NuxtLink
          >
          <NuxtLink to="/all-podcasts" class="text-white hover:text-indigo-200"
            >All Podcasts</NuxtLink
          >
        </nav>
      </div>
    </header>

    <!-- Main content -->
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white">
      <div class="container mx-auto px-4 py-6 text-center">
        <p>&copy; 2024 Catechize.org. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>
