<script lang="ts" setup>
import { DEFAULT_AVATAR_URL } from "~/constants/common";
import type { UserEntity } from "~/entities/user/user";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
    default: {},
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  isPreview: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <div class="flex p-4 gap-4">
    <div class="flex flex-col gap-3 w-[25%]">
      <img
        :src="props.user.avatar ?? DEFAULT_AVATAR_URL"
        alt="Avatar"
        class="rounded-full max-h-[300px] max-w-[300px]"
      />
      <Button
        v-if="props.isPreview"
        :label="`Connect to ${props.user?.last_name}`"
        class="primary-button h-[50px]"
      />
      <div class="flex flex-col justify-start">
        <p class="text-2xl font-bold">
          {{ `${props.user?.first_name} ${props.user?.last_name}` }}
        </p>
        <p class="text-lg text-stone-500">
          {{ props.user.email }}
        </p>
      </div>
      <div class="gap-2 columns-2">
        <div class="flex gap-2 justify-start items-center">
          <span class="pi pi-users"></span>
          <span class="font-bold">{{ props.user.total_connects }}</span>
          <span class="text-stone-500 span-primary-hover">Connection</span>
        </div>
        <div class="flex gap-2 justify-start items-center">
          <span class="pi pi-tags"></span>
          <span class="font-bold">{{ props.user.hashtag?.length }}</span>
          <span class="text-stone-500 span-primary-hover">Hashtag</span>
        </div>
      </div>
      <div class="flex gap-2 items-center">
        <span class="pi pi-calendar"></span>
        <span>{{
          convertDateTimeServer(
            props.user.date_of_birth ?? new Date().toDateString(),
          )
        }}</span>
      </div>
      <div class="flex gap-2 items-center">
        <span class="pi pi-map-marker"></span>
        <span>{{ props.user.address }}</span>
      </div>
      <div class="flex gap-2 items-center">
        <span class="pi pi-building"></span>
        <span>{{ props.user.detail_address }}</span>
      </div>
      <div class="flex flex-col gap-2">
        <div class="flex gap-2 items-center">
          <span class="pi pi-tags"></span>
          <span>Hashtag</span>
        </div>
        <div class="flex flex-wrap gap-2">
          <div v-for="hashtag in props.user.hashtag">
            <Chip class="text-xs p-1 hashtag-item" :label="`#${hashtag}`" />
          </div>
        </div>
      </div>
    </div>
    <div class="border rounded-2xl w-full h-full flex flex-col gap-4 p-2">
      <div class="flex flex-col gap-1">
        <label class="font-bold span-primary-hover" for="self_introduce"
          >Introduction</label
        >
        <div
          class="text-sm p-1 whitespace-pre-line"
          v-html="props.user.self_introduce"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-bold span-primary-hover" for="self_introduce"
          >Left goal</label
        >
        <div
          class="text-sm p-1 whitespace-pre-line"
          v-html="props.user.life_goal"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.hashtag-item {
  &:hover {
    color: #11b9b5;
  }
}
</style>
