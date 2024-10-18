<script setup lang="ts">
import type { ApplicationEntity } from "~/entities/user/application";
import ApplicationCard from "./ApplicationCard.vue";

const props = defineProps({
  applications: {
    type: Array<ApplicationEntity>,
    default: [],
  },
});
</script>
<template>
  <div class="flex flex-col gap-2">
    <div v-for="item in props.applications">
      <ApplicationCard :application="item" />
    </div>
  </div>
</template>
