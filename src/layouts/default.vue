<script setup>
import DefaultAppTopBar from "~/components/layouts/user/DefaultAppTopBar.vue";
</script>
<template>
  <div
    class="max-w-full flex flex-col w-screen items-center background-default-135deg"
  >
    <DefaultAppTopBar />
    <Toast />
    <slot />
  </div>
</template>
<style lang="scss"></style>
