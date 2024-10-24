<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
  name: String,
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
const { value, errorMessage } = useField(() => props.name);
</script>
<template>
  <div :class="props.parentClass">
    <label v-if="label.length > 0" class="block mb-2 text-sm">
      {{ props.label }}
      <strong v-if="props.required" class="text-red-500">*</strong>
    </label>
    <Dropdown
      v-bind="$attrs"
      v-model="value"
      class="border"
      :class="`${props.inputClass} ${props.invalid ? 'p-invalid' : ''}`"
      input-class="w-full"
    />
    <small v-if="props.invalid" class="p-error">{{
      props.validateMessage ?? ""
    }}</small>
  </div>
</template>

<style></style>
