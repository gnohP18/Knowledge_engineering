<script setup lang="ts">
const props = defineProps({
  icon: {
    type: String,
  },
  url: {
    type: String,
    default: "/",
  },
  nane: {
    type: String,
    default: "",
  },
  maxHeight: {
    type: Number,
    default: 50,
  },
});
</script>

<template>
  <a :href="props.url" class="w-full p-4">
    <span
      :class="{
        'w-full': true,
        [`h-[${props.maxHeight}] ${props.icon}`]: true,
      }"
    >
      {{ props.nane }}
    </span>
  </a>
</template>

<style></style>
