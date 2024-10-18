<script lang="ts" setup>
import { DEFAULT_AVATAR_URL } from "~/constants/common";
import type { PostEntity } from "~/entities/user/post";

const props = defineProps({
  post: {
    type: Object as PropType<PostEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="primary-card w-full max-h-[500px] p-2 flex flex-col gap-y-3">
    <div class="flex gap-x-2">
      <img
        :src="
          props.post?.company_avatar
            ? props.post.company_avatar
            : DEFAULT_AVATAR_URL
        "
        alt=""
        class="w-[50px] h-[50px] rounded-full"
      />
      <div class="flex flex-col">
        <label v-tooltip="props.post?.company_name">{{
          props.post?.company_name
        }}</label>
        <span class="text-sm">Posted at: {{ props.post?.updated_at }}</span>
      </div>
    </div>
    <div v-html="props.post?.title" />
    <div class="w-full max-h-[300px] bg-slate-100 rounded-md">
      <img
        :src="props.post?.thumbnail"
        class="rounded-md w-full max-h-[300px] object-contain"
      />
    </div>
    <div class="flex py-2 w-full">
      <div class="flex gap-x-4 justify-between w-full">
        <span
          class="icon-movement flex-1 text-xl pi pi-briefcase text-center"
        ></span>
        <span
          class="icon-movement flex-1 text-xl pi pi-heart text-center"
        ></span>
        <span
          class="icon-movement flex-1 text-xl pi pi-link text-center"
        ></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11b9b5;
    border-width: 2px;
  }
}
</style>
