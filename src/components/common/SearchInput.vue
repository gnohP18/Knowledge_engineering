<script setup lang="ts">
const props = defineProps({
  isShowButtonClear: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["handleResetInput"]);

const resetInputSearch = () => {
  emit("handleResetInput");
};
</script>

<template>
  <span class="relative flex p-input-icon-left w-[400px]">
    <i class="pi pi-search" />
    <InputText v-bind="$attrs" input-class="w-full" class="input-search" />
    <img
      v-if="props.isShowButtonClear"
      src="/assets/images/icon/close-en.svg"
      class="absolute flex items-center w-5 h-5 top-[9px] right-3 cursor-pointer"
      @click="resetInputSearch()"
    />
  </span>
</template>

<style>
.input-search {
  padding-right: 2.5rem;
}
</style>
