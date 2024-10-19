<script setup lang="ts">
import { useField } from 'vee-validate';

const props = defineProps({
    name: String,
    type: String,
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
    <div class="flex flex-col" :class="props.parentClass">
    <label v-if="label?.length > 0" class="block mb-2 text-sm font-bold">
      {{ props.label }}
      <strong v-if="props.required" class="text-red-500">*</strong>
    </label>
    <InputText
        v-model="value" 
      class="p-2 border"
      :class="`${props.inputClass} ${errorMessage ? 'p-invalid' : ''}`"
      input-class="w-full"
      :type="type || 'text'" 
    />
    <small v-if="errorMessage" id="username-help" class="p-error">{{
      errorMessage?? ""
    }}</small>
  </div>
</template>

