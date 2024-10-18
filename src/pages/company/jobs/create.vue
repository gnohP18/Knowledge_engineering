<script setup lang="ts">
import { JobStore } from "~/stores/company/job";

useHead({ title: "List job" });

definePageMeta({ layout: "company" });

const route = useRoute();

const store = JobStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);

onMounted(async () => {
  const id = route.params.id[0];
  await store.getDetail(id);
});
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="'Create job'"
  >
    <CommonKTAInput />
  </LayoutsCompanyManageCompanyLayout>
</template>
