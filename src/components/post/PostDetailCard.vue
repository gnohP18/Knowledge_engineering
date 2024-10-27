<script lang="ts" setup>
import { DEFAULT_AVATAR_URL } from "~/constants/common";
import type { BasicPostEntity } from "~/entities/user/post";

const props = defineProps({
  post: {
    type: Object as PropType<BasicPostEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="flex flex-col w-full primary-card p-4 gap-4">
    <div class="flex justify-center">
      <img :src="props.post?.thumbnail" :alt="props.post?.title" />
    </div>
    <span class="span-primary-hover text-3xl font-bold">
      {{ props.post?.title }}
    </span>
    <div class="flex gap-x-2">
      <img
        :src="
          props.post?.company_avatar
            ? props.post.company_avatar
            : DEFAULT_AVATAR_URL
        "
        alt=""
        class="w-[80px] h-[80px] rounded-full border"
      />
      <div class="flex flex-col">
        <label
          v-tooltip="props.post?.company_name"
          class="text-xl span-primary-hover"
          >{{ props.post?.company_name }}</label
        >
        <span class="text-md span-primary-hover"
          >Posted at: {{ props.post?.updated_at }}</span
        >
      </div>
    </div>
    <div class="border common-rounded p-3">
      <div
        class="whitespace-pre-line"
        v-html="convertHTMLtoString(props.post?.content ?? '')"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
