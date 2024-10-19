<script setup lang="ts">
import { sleep } from "@whoj/utils-core";
import { APPLICATION_SAMPLE } from "~/constants/sample";
import ApplicationList from "~/components/user/ApplicationList.vue";
import { applicationStore } from "~/stores/user/application";

useHead({ title: "Interview" });
definePageMeta({
  layout: "user",
  middleware: "auth-user",
});

const store = applicationStore();
const isLoading = computed(() => store.isLoading);
const applications = computed(() => store.applications);

onMounted(async () => {
  await store.getList();
  console.log(applications.value);
});
</script>
<template>
  <div class="layout-main">
    <CommonKTALoading v-if="isLoading" />
    <div v-else>
      <ApplicationList :applications="applications" />
    </div>
  </div>
</template>
