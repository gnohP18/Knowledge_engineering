<script setup>
import AppTopBar from "~/components/layouts/user/AppTopbar.vue";
</script>
<template>
  <div
    class="flex flex-col w-full h-full items-center background-default-135deg"
  >
    <AppTopBar />
    <Toast />
    <div class="container py-4 px-2 md:px-0">
      <slot />
    </div>
  </div>
</template>
