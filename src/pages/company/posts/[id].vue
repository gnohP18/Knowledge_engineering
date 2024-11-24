<script setup lang="ts">
import { PostStore } from "~/stores/company/post";
import { MODE_FORM_UPDATE } from "~/constants/common";

useHead({ title: "List job" });

definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

const route = useRoute();

const store = PostStore();
const post = computed(() => store.post);
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const postUpdate = ref({});
onMounted(async () => {
  const id = route.params.id[0];
  await store.getDetail(id);
  console.log(post.value.media_file);
});

const handleRemoveFile = () => {
  postUpdate.value.media_file = "";
};
</script>

<template>
  <LayoutsCompanyManageCompanyLayout
    :is-loading="isLoading"
    :is-succeed="isSucceed"
    :screen-name="'Detail post'"
  >
    <CompanyPostForm :mode="MODE_FORM_UPDATE" :post="post" />
  </LayoutsCompanyManageCompanyLayout>
</template>
