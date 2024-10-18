<script setup lang="ts">
const props = defineProps({
  parentClass: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default: "",
  },
});
</script>
<template>
  <div :class="props.parentClass">
    <Button
      v-bind="$attrs"
      class="custom-button w-[80px] h-[40px]"
      :class="`${props.inputClass}`"
      input-class="w-full"
    />
  </div>
</template>

<style scoped lang="scss">
/* .custom-button {
  background-color: #10b981;
  color: white;
  
  &:hover {
    background-color: white;
    color: black;
    border-width: 1px;
    border-color: #10b981;
  }
} */
</style>
