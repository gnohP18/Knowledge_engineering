<script lang="ts" setup>
import { USER_TOKEN } from "~/constants/authentication";
import type { QueryParamsEntity } from "~/entities/common";
import * as Pagination from "~/constants/pagination";
import { userStore } from "~/stores/user/user";

useHead({ title: "Job finding" });

definePageMeta({
  layout: "default",
});

const store = userStore();
const route = useRoute();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const userAuth = computed(() => store.user);
const posts = computed(() => store.posts);
const currentPage = ref<number>(1);

let queryParams = reactive<QueryParamsEntity>({
  page: "1",
  limit: String(Pagination.PAGE_LIMIT_DEFAULT),
});

onMounted(async () => {
  const param = {};
  if (checkAuth(USER_TOKEN)) {
    queryParams = Object.assign(queryParams, {
      hashtag: userAuth.value.hashtag,
    });
  }

  await store.getIndexPost(param);
});

const handleScroll = async () => {
  const postIndex = document.getElementById("post_index");
  const scrollTop = postIndex?.scrollTop ?? 0;
  const clientHeight = postIndex?.clientHeight ?? 0;
  const scrollHeight = postIndex?.scrollHeight ?? 0;

  // Kiểm tra nếu đã cuộn xuống dưới cùng
  if (scrollTop + clientHeight >= scrollHeight && !isLoading.value) {
    queryParams.page = String(currentPage.value + 1);
    await store.getIndexPost(queryParams);
  }
};
</script>

<template>
  <div class="grow flex flex-col items-center justify-center h-full">
    <div
      id="post_index"
      class="overflow-scroll w-full post-list flex flex-col gap-2"
      @scroll="handleScroll"
    >
      <UserCreatePost :user="userAuth" />

      <PostList :posts="posts" />
    </div>
    <div v-if="isLoading" class="w-full relative flex justify-center">
      <ProgressSpinner
        :class="{ 'loading-container': isLoading }"
        class="w-[30px] h-[30px] absolute bottom-[20px] bg-transparent"
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.post-list {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.loading-container {
  background-color: transparent;
  position: fixed;
  bottom: -30px; /* Vị trí ban đầu */
  left: 50%;
  transform: translateX(-50%);
  animation:
    moveUp 0.5s forwards,
    moveDown 0.5s 1s forwards;
}

@keyframes moveUp {
  from {
    bottom: -30px;
  }
  to {
    bottom: 100px; /* Di chuyển lên */
  }
}

@keyframes moveDown {
  0% {
    bottom: 100px; /* Giữ vị trí trên */
  }
  100% {
    bottom: -30px; /* Quay lại vị trí ban đầu */
  }
}
</style>
