<script setup lang="ts">
import { AuthStore } from "~/stores/company/auth";
import CompanyProfileForm from "~/components/company/CompanyProfileForm.vue";
import { MODE_FORM_UPDATE } from "~/constants/common";

const pageTitle = "Profile";
useHead({ title: pageTitle });
definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

const companyAuthStore = AuthStore();
const me = computed(() => companyAuthStore.profile);
const isLoading = computed(() => companyAuthStore.isLoading);
const isSucceed = computed(() => companyAuthStore.isSucceed);

onMounted(async () => {
  await companyAuthStore.getMe();
});
</script>
<template>
  <LayoutsCompanyManageCompanyLayout :screen-name="pageTitle">
    <CompanyProfileForm
      v-if="!isLoading && me"
      :mode="MODE_FORM_UPDATE"
      :profile="me"
    />
  </LayoutsCompanyManageCompanyLayout>
</template>
