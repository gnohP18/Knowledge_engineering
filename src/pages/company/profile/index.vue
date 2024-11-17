<script setup lang="ts">
import { AuthStore } from "~/stores/company/auth";
import CompanyProfileForm from "~/components/company/CompanyProfileForm.vue";
import { MODE_FORM_UPDATE } from "~/constants/common";
import KTALoading from "~/components/common/KTALoading.vue";

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

const update = async (form: FormData) => {
  await companyAuthStore.updateMe(form);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Update successfully");
    await companyAuthStore.getMe();
  }
};
</script>
<template>
  <LayoutsCompanyManageCompanyLayout :screen-name="pageTitle">
    <KTALoading v-if="isLoading" />
    <CompanyProfileForm
      class="max-w-full overflow-scroll"
      v-if="!isLoading && me"
      :mode="MODE_FORM_UPDATE"
      :profile="me"
      @submit="update"
    />
  </LayoutsCompanyManageCompanyLayout>
</template>
