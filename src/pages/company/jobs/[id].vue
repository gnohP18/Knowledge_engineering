<script setup lang="ts">
import { MODE_FORM_UPDATE } from "~/constants/common";
import type { JobEntity } from "~/entities/company/job";
import { JobStore } from "~/stores/company/job";

useHead({ title: "Update job" });

definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

const route = useRoute();

const store = JobStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const job = computed(() => store.job);

onMounted(async () => {
  const id = route.params.id;
  await store.getIndexCreate();
  await store.getDetail(id);
});

const update = async (entity: JobEntity) => {
  await store.updateJob(route.params.id, entity);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Update job successfully");
    await store.getDetail(route.params.id);
  }
};
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="'Detail job'"
  >
    <LayoutsCompanyJobForm
      v-if="job"
      :job="job"
      :mode="MODE_FORM_UPDATE"
      @submit="update"
    />
  </LayoutsCompanyManageCompanyLayout>
</template>
