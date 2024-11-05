<script setup lang="ts">
import { JobStore } from "~/stores/company/job";

import type { JobEntity } from "~/entities/company/job";
import { MODE_FORM_CREATE } from "~/constants/common";

useHead({ title: "Create job" });

definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

const router = useRouter();

const store = JobStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);

onMounted(async () => {
  await store.getIndexCreate();
});

const onSubmit = async (entity: JobEntity) => {
  await store.createJob(entity);
  console.log(entity);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Create job successfully");
    // router.push({ path: COMPANY_JOB });
  }
};
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="'Create job'"
  >
    <LayoutsCompanyJobForm :mode="MODE_FORM_CREATE" @submit="onSubmit" />
  </LayoutsCompanyManageCompanyLayout>
</template>
<style lang="scss" scoped>
:deep(.p-treeselect-label) {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .p-treeselect-token {
    display: block;
    width: fit-content;
  }
}
</style>
