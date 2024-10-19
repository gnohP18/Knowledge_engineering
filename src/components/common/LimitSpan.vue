<script setup lang="ts">
import { LIMIT_NAME_CHARACTERS } from "~/constants/common";

const props = defineProps({
  text: {
    type: String,
    default: "",
  },
  limit: {
    type: Number,
    default: LIMIT_NAME_CHARACTERS,
  },
  parentClass: {
    type: String,
    default: "",
  },
  isPrimaryText: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div>
    <span
      v-if="props.text?.length <= props.limit"
      :class="`${props.parentClass} ${props.isPrimaryText ? 'primary-text' : ''}`"
    >
      {{ props.text }}
    </span>
    <span
      v-else
      v-tooltip="props.text"
      :class="`${props.parentClass} ${props.isPrimaryText ? 'primary-text' : ''}`"
    >
      {{ substringWithLimitCharacters(props.text, props.limit).textSub }}...
    </span>
  </div>
</template>

<style></style>
