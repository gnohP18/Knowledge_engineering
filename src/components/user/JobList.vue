<script lang="ts" setup>
import type { SearchingJobEntity } from "~/entities/user/job";
import JobCard from "~/components/user/JobCard.vue";

const props = defineProps({
  jobs: {
    type: Array<SearchingJobEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="grid w-full h-full grid-cols-2 gap-2">
    <div v-for="job in props.jobs">
      <JobCard :job="job" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
