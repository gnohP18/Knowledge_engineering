<script setup>
import AppTopBar from "~/components/layouts/user/AppTopbar.vue";
</script>
<template>
  <div class="flex flex-col w-full h-screen items-center">
    <Toast />
    <AppTopBar />
    <slot />
  </div>
</template>
