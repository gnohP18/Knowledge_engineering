<script lang="ts" setup>
import CompanyProfile from "~/components/user/CompanyProfile.vue";
import { companyStore } from "~/stores/user/company";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const store = companyStore();
const company = computed(() => store.company);
const recentlyPostJobs = computed(() => store.recentlyPostedJobs);

const isLoading = computed(() => store.isLoading);

onMounted(async () => {
  await store.getDetail(route.params.id);
});
</script>

<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="flex flex-col gap-y-2">
    <div class="primary-card">
      <CompanyProfile :company="company" />
    </div>
    <div class="flex flex-col gap-2" v-if="recentlyPostJobs.length > 0">
      <label
        class="text-xl font-bold w-full primary-text p-2 primary-card"
        for="recently-post-job"
        >Recently posted job</label
      >
      <UserJobList :jobs="recentlyPostJobs" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
