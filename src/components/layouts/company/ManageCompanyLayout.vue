<script setup lang="ts">
const props = defineProps({
  screenName: {
    type: String,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  isSucceed: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="w-full h-full flex p-2 gap-y-2 flex-col">
    <span class="font-bold text-2xl span-primary-hover">
      {{ props.screenName }}
    </span>
    <CommonKTALoading v-if="props.isLoading" />
    <div v-else class="primary-card !rounded-xl p-2">
      <slot />
    </div>
  </div>
</template>
