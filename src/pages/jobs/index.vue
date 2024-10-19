<script lang="ts" setup>
import { JOB_SAMPLE } from "~/constants/sample";
import type { BasicJobEntity } from "~/entities/user/job";
import JobList from "~/components/user/JobList.vue";

useHead({ title: "Job finding" });

definePageMeta({
  layout: "user",
});

const jobs = ref<BasicJobEntity[]>([]);

onMounted(() => {
  jobs.value = JOB_SAMPLE;
});
</script>

<template>
  <div class="flex flex-col gap-2">
    <label class="text-xl font-bold" for="search-input">Search you job</label>
    <CommonKTASearchInput />
    <JobList :jobs="jobs" />
  </div>
</template>
<style lang="scss" scoped></style>
