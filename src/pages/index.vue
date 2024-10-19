<script lang="ts" setup>
import type { PostEntity } from "~/entities/user/post";

useHead({ title: "Job finding" });

definePageMeta({
  layout: "default",
});

const postIndex: PostEntity[] = [
  {
    id: 1,
    title: "Test title",
    content: "Test content",
    job_id: 1,
    company_avatar: "/images/avatar_3.jpeg",
    thumbnail: "/images/post_1.jpg",
    company_name: "MCS",
    updated_at: "2024-09-01",
  },
  {
    id: 2,
    title: "Test title",
    content: "Test content",
    job_id: 2,
    company_avatar: "/images/avatar_2.jpg",
    thumbnail: "/images/post_2.jpeg",
    company_name: "MCS",
    updated_at: "2024-09-01",
  },
  {
    id: 3,
    title: "Test title",
    content: "Test content",
    job_id: 3,
    company_avatar: "/images/avatar_3.jpeg",
    thumbnail: "/images/post_3.jpeg",
    company_name: "MCS",
    updated_at: "2024-09-01",
  },
  {
    id: 4,
    title: "Test title",
    content: "Test content",
    job_id: 4,
    company_avatar: "/images/avatar_2.jpg",
    thumbnail: "/images/post_2.jpeg",
    company_name: "MCS",
    updated_at: "2024-09-01",
  },
  {
    id: 5,
    title: "Test title",
    content: "Test content",
    job_id: 5,
    company_avatar: "/images/avatar_2.jpg",
    thumbnail: "/images/post_3.jpeg",
    company_name: "MCS",
    updated_at: "2024-09-01",
  },
];
</script>

<template>
  <div class="grow flex flex-col items-center justify-center h-full">
    <div class="overflow-scroll w-full post-list">
      <PostList :posts="postIndex" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.post-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
