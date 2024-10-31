<script lang="ts" setup>
import { MENU_ITEM_LEFT_BAR } from "~/constants/menu-item";
import ProfileCard from "../../user/ProfileCard.vue";
import type { UserEntity } from "~/entities/user/user";
import { USER_TOKEN } from "~/constants/authentication";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
  },
});
</script>
<template>
  <div class="w-full h-full flex flex-col gap-y-2">
    <div class="primary-card common-rounded min-h-[30%] w-full">
      <ProfileCard v-if="props.user" :user="props.user" />
    </div>
    <div v-if="checkAuth(USER_TOKEN)" class="primary-card w-full">
      <Menu :model="MENU_ITEM_LEFT_BAR" class="w-full">
        <template #submenuheader="{ item }">
          <span class="text-black font-bold">{{ item.label }}</span>
        </template>
        <template #item="{ item, props }">
          <div v-ripple class="flex align-items-center" v-bind="props.action">
            <span :class="item.icon" />
            <a :href="item.url" class="pl-2">{{ item.label }}</a>
            <Badge v-if="item.badge" class="ml-auto" :value="item.badge" />
            <span
              v-if="item.shortcut"
              class="ml-auto border-1 surface-border border-round surface-100 text-xs p-1"
              >{{ item.shortcut }}</span
            >
          </div>
        </template>
      </Menu>
    </div>
    <div
      v-if="checkAuth(USER_TOKEN)"
      class="primary-card min-h-[20%] w-full px-4 py-2 overflow-scroll"
    >
      <span class="text-md">SKILL HASHTAG</span>
      <hr class="w-full py-1" />
      <div class="flex flex-wrap gap-2">
        <div v-for="hashtag in props.user?.hashtag">
          <Chip class="text-xs p-1" :label="`#${mappingHashtag(hashtag)}`" />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
