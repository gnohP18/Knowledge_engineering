<script lang="ts" setup>
import { userStore } from "~/stores/user/user";
import PostDetailCard from "~/components/post/PostDetailCard.vue";
import AttachmentJob from "~/components/user/AttachmentJob.vue";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const store = userStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const post = computed(() => store.post);
const jobs = computed(() => store.attachmentJobs);

const pageTitle = computed(() => store.post.title);
useHead({ title: pageTitle.value });

onMounted(async () => {
  await store.getDetailPost(Number(route.params.id));
});
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <PostDetailCard :post="post" />
    <label
      v-if="jobs"
      class="primary-card p-3 font-bold text-2xl span-primary-hover"
      for="attachment_job"
      >Attachment jobs</label
    >
    <AttachmentJob v-if="jobs" :jobs="jobs" />
  </div>
</template>
<style lang="scss" scoped></style>
