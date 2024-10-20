<script setup lang="ts">
import { useForm } from "vee-validate";
import { companyJobSchema } from "~/schemas/company/job.schema";
import { JobStore } from "~/stores/company/job";
import Validate from "~/components/common/Validate.vue";
import {
  INTERVIEW_TYPE_OPTIONS,
  JOB_STATUS_OPTIONS,
  TYPE_OF_EMPLOYEE_OPTIONS,
} from "~/constants/job";
import type { OptionSelect } from "~/entities/common";
import KTAInputNumber from "~/components/common/KTAInputNumber.vue";
import type { TreeNode } from "primevue/treenode";
import type { CreateJobEntity, JobEntity } from "~/entities/company/job";
import { COMPANY_JOB } from "~/constants/route";
import { MODE_FORM_CREATE } from "~/constants/common";

useHead({ title: "List job" });

definePageMeta({ layout: "company" });

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
    router.push({ path: COMPANY_JOB });
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
