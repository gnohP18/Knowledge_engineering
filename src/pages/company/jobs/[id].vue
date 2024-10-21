<script setup lang="ts">
import { MODE_FORM_UPDATE } from "~/constants/common";
import type { JobEntity } from "~/entities/company/job";
import { JobStore } from "~/stores/company/job";

useHead({ title: "List job" });

definePageMeta({ layout: "company" });

const route = useRoute();

const store = JobStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const job = computed(() => store.job);

onMounted(async () => {
  const id = route.params.id[0];
  await store.getDetail(id);
});

const update = async (entity: JobEntity) => {
  await store.updateJob(route.params.id[0], entity);
  console.log(entity);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Update job successfully");
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
