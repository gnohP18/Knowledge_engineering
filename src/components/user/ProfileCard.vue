<script lang="ts" setup>
import { USER_TOKEN } from "~/constants/authentication";
import { DEFAULT_AVATAR_URL } from "~/constants/common";
import { USER_LOGIN } from "~/constants/route";
import type { UserEntity } from "~/entities/user/user";

const props = defineProps({
  user: {
    type: Object as PropType<UserEntity>,
  },
});
const urlBg = ref<string>("/images/bg_1.jfif");

const urlBgArr = [
  "/images/bg_1.jfif",
  "/images/bg_2.jfif",
  "/images/bg_3.jfif",
  "/images/bg_4.jfif",
];

onMounted(() => {
  urlBg.value = urlBgArr[Math.floor(Math.random() * urlBgArr.length)];
});
</script>
<template>
  <div
    class="flex flex-col w-full h-full"
    :class="{ 'justify-between gap-2': checkAuth(USER_TOKEN) }"
  >
    <img :src="urlBg" alt="" class="w-full h-1/2 common-rounded object-cover" />
    <div
      v-if="checkAuth(USER_TOKEN)"
      class="bg-white w-full h-1/2 flex flex-col justify-between gap-2 px-2"
    >
      <div class="w-full relative">
        <img
          :src="props.user?.avatar ?? DEFAULT_AVATAR_URL"
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
    <div v-else class="flex w-full items-center flex-1 h-full p-1">
      <Button
        label="Login to find the job"
        class="custom-button w-full h-[40px]"
        @click="navigateTo(USER_LOGIN)"
      />
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
