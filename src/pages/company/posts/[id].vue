<script setup lang="ts">
import { PostStore } from "~/stores/company/post";
import CImageUploadV1 from "~/components/common/CImageUploadV1.vue";

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
    <CommonKTAInput v-model="post.title" class="w-full" />
    <CImageUploadV1
      :default-img-value="post.media_file"
      label="Thumbnail"
      name="logo"
      class="text-sm"
      :max-size="5"
      @handle-remove-file="handleRemoveFile"
    />
  </LayoutsCompanyManageCompanyLayout>
</template>
