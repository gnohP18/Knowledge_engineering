<script lang="ts" setup>
import { USER_TOKEN } from "~/constants/authentication";
import { userStore } from "~/stores/user/user";
import KTALoading from "~/components/common/KTALoading.vue";
import JobDetailCard from "~/components/user/JobDetailCard.vue";

definePageMeta({
  layout: "user",
});

const store = userStore();
const route = useRoute();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);

const job = computed(() => store.job);

useHead({ title: computed(() => store.job.title).value });

onMounted(async () => {
  await store.getDetailJob(Number(route.params.id));
});

const applyJob = async (resumeId: number) => {
  if (checkAuth(USER_TOKEN)) {
    await store.applyJob(Number(route.params.id), resumeId);

    if (!isLoading.value && isSucceed.value) {
      toastSuccess("Success", "Apply job successfully");
    }
  }
};
</script>

<template>
  <KTALoading v-if="isLoading" />
  <div v-else class="w-full flex flex-col">
    <JobDetailCard :job="job" @apply-job="applyJob" />
  </div>
</template>
<style lang="scss" scoped></style>
