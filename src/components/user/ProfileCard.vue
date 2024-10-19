<script lang="ts" setup>
import type { UserEntity } from "~/entities/user/user";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="flex flex-col w-full h-full">
    <div class="bg-black w-full h-1/2"></div>
    <div class="bg-white w-full h-1/2 flex flex-col justify-between gap-2 px-2">
      <div class="w-full relative">
        <img
          :src="props.user?.avatar"
          alt=""
          class="absolute rounded-full w-[75px] h-[75px] top-[-35px]"
        />
      </div>
      <div class="flex flex-col justify-end items-end">
        <a href="/profile" class="text-md">{{
          `${props.user?.first_name} ${props.user?.last_name}`
        }}</a>
        <span class="text-md">{{ props.user?.job_title }}</span>
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
