<script lang="ts" setup>
const props = defineProps({
  message: {
    type: String,
    default: "No data",
  },
});
</script>

<template>
  <div class="flex flex-col items-center gap-4 my-11">
    <img
      src="assets/images/icon/icon-empty-data.svg"
      alt=""
      class="w-[100px] h-[88px]"
    />
    <div class="text-sm font-normal">{{ props.message }}</div>
  </div>
</template>
