<script lang="ts" setup>
import { DEFAULT_AVATAR_URL, LIMIT_NAME_CHARACTERS } from "~/constants/common";
import { USER_POST } from "~/constants/route";
import type { BasicPostEntity } from "~/entities/user/post";

const props = defineProps({
  post: {
    type: Object as PropType<BasicPostEntity>,
  },
});

const content = computed(() =>
  substringWithLimitCharacters(props.post?.content ?? "", 40, true),
);

const copyLink = () => {
  navigator.clipboard.writeText(
    `${window.location.href}${USER_POST.slice(1)}/${props.post?.id}`,
  );
};
</script>
<template>
  <div class="primary-card w-full min-h-[600px] p-2 flex flex-col gap-y-3">
    <div class="flex gap-x-2">
      <img
        :src="
          props.post?.company_avatar
            ? props.post.company_avatar
            : DEFAULT_AVATAR_URL
        "
        alt=""
        class="w-[60px] h-[60px] rounded-full"
      />
      <div class="flex flex-col">
        <label
          v-tooltip="props.post?.company_name"
          class="span-primary-hover"
          >{{ props.post?.company_name }}</label
        >
        <span class="text-sm span-primary-hover"
          >Posted at: {{ props.post?.updated_at }}</span
        >
      </div>
    </div>
    <CommonLimitSpan
      :limit="LIMIT_NAME_CHARACTERS"
      :text="props.post?.title"
      class="max-h-[80px] span-primary-hover"
    />
    <div v-html="content.textSub" />
    <a class="font-bold" :href="`${USER_POST}/${props.post?.id}`">See more</a>
    <div class="w-full max-h-[300px] bg-slate-100 rounded-md">
      <img
        :src="props.post?.thumbnail"
        class="rounded-md w-full max-h-[300px] object-contain"
      />
    </div>
    <div class="flex py-2 w-full">
      <div class="flex gap-x-4 justify-between w-full h-full">
        <span
          v-tooltip.right="'View detail and apply now'"
          class="icon-movement flex-1 text-xl pi pi-briefcase text-center"
        ></span>
        <span
          class="icon-movement flex-1 text-xl pi pi-heart text-center"
        ></span>
        <span
          class="icon-movement flex-1 text-xl pi pi-link text-center"
          @click="copyLink"
        ></span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
