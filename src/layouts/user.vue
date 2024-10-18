<script setup>
import AppTopBar from "~/components/layouts/user/AppTopbar.vue";
</script>
<template>
  <div class="flex flex-col w-full h-screen items-center">
    <AppTopBar />
    <Toast />
    <div class="container py-4">
      <slot />
    </div>
  </div>
</template>
