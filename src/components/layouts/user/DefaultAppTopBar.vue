<script lang="ts" setup>
import { USER_TOKEN } from "~/constants/authentication";
import { DEFAULT_MENU_USER } from "~/constants/menu-item";
import { USER_LOGIN, USER_SIGNUP } from "~/constants/route";
import { AuthStore } from "~/stores/user/auth";

const userAuthStore = AuthStore();
const me = computed(() => userAuthStore.me);
</script>
<template>
  <div class="container flex justify-between items-center">
    <div class="w-[250px] p-2" @click="navigateTo('/')">
      <img src="/images/logo.svg" alt="" class="p-2" />
    </div>
    <Menubar
      :model="DEFAULT_MENU_USER"
      class="flex-1 w-full h-full gap-x-2 justify-center text-center bg-transparent"
    >
      <template #item="{ item, props, hasSubmenu }">
        <a class="p-[10px]" :href="item.route"
          ><span class="text-xl montserrat-font-500">{{ item.label }}</span></a
        >
      </template>
    </Menubar>
    <div class="flex gap-2">
      <Button
        v-if="!getToken(USER_TOKEN)"
        label="Sign Up"
        class="custom-button w-[80px] h-[40px]"
        @click="navigateTo(USER_SIGNUP)"
      />
      <Button
        v-if="!getToken(USER_TOKEN)"
        label="Sign In"
        class="custom-button w-[80px] h-[40px]"
        @click="navigateTo(USER_LOGIN)"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    color: #11b9b5;
  }
}
:deep(.p-menubar-root-list) {
  gap: 30px;
}
</style>
