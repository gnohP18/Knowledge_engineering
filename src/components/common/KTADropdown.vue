<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  parentClass: {
    type: String,
    default: "",
  },
  inputClass: {
    type: String,
    default: "",
  },
  invalid: {
    type: Boolean,
    default: false,
  },
  validateMessage: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div :class="props.parentClass">
    <label v-if="label.length > 0" class="block mb-2 text-sm">
      {{ props.label }}
      <strong v-if="props.required" class="text-red-500">*</strong>
    </label>
    <Dropdown
      v-bind="$attrs"
      class="border custom-input"
      :class="`${props.inputClass} ${props.invalid ? 'p-invalid' : ''}`"
      input-class="w-full"
    />
    <small v-if="props.invalid" class="p-error">{{
      props.validateMessage ?? ""
    }}</small>
  </div>
</template>

<style scoped lang="scss">
.custom-input {
  &:hover {
    border: 1px solid #11b9b5;
  }
}
</style>
