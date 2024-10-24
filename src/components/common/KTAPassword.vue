<script setup lang="ts">
import { useField } from 'vee-validate';
const props = defineProps({
  name: String,
    type: {
        type: String,
        default: 'text', 
    },
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
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
const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div :class="props.parentClass">
    <label class="block mb-2 text-sm">{{ props.label }}</label>
    <Password
      :id="props.id"
      v-bind="$attrs"
      v-model="value"
      :type="props.type"
      :class="`${props.inputClass} ${props.invalid ? 'p-invalid' : ''}`"
      input-class="w-full p-2"
      toggle-mask
      :feedback="false"
      :placeholder="props.placeholder"
    />
    <small v-if="props.invalid" id="username-help" class="p-error">{{
      props.validateMessage ?? ""
    }}</small>
  </div>
</template>
