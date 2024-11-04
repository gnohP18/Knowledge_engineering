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
  placeholder: {
    type: String,
    default: "",
  },
  validateMessage: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div :class="props.parentClass">
    <label class="block mb-2 text-sm">{{ props.label }}</label>
    <Password
      v-bind="$attrs"
      :class="`${props.inputClass} ${props.invalid ? 'p-invalid' : ''}`"
      input-class="w-full p-2"
      toggle-mask
      :feedback="false"
      :placeholder="props.placeholder"
    />
    <small v-if="props.invalid" class="p-error">{{
      props.validateMessage ?? ""
    }}</small>
  </div>
</template>
