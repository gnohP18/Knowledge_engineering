<script setup lang="ts">
import CompanyPostForm from "~/components/company/CompanyPostForm.vue";
import { MODE_FORM_CREATE } from "~/constants/common";
import { COMPANY_POST } from "~/constants/route";
import { PostStore } from "~/stores/company/post";

useHead({ title: "Create post" });

definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

const router = useRouter();
const companyStagePost = PostStore();
const isLoading = computed(() => companyStagePost.isLoading);
const isSucceed = computed(() => companyStagePost.isSucceed);
const hashtags = computed(() => companyStagePost.hashtag);
onMounted(async () => {
  await companyStagePost.getIndexForm();
});

const onSubmit = async (entity: FormData) => {
  await companyStagePost.createPost(entity);

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Success", "Create post successfully");
    router.push({ path: COMPANY_POST });
  }
};
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="'Create post'"
  >
    <CompanyPostForm
      :mode="MODE_FORM_CREATE"
      :hashtags="hashtags"
      @submit="onSubmit"
    />
  </LayoutsCompanyManageCompanyLayout>
</template>
<style lang="scss" scoped></style>
