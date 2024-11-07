<script lang="ts" setup>
import AppTopBar from "~/components/layouts/user/AppTopbar.vue";
import Rightbar from "~/components/layouts/user/Rightbar.vue";
import Leftbar from "~/components/layouts/user/Leftbar.vue";
import { USER_TOKEN } from "~/constants/authentication";
import { AuthStore } from "~/stores/user/auth";

const store = AuthStore();
const me = computed(() => store.me);
onBeforeMount(async () => {
  if (checkAuth(USER_TOKEN)) {
    await store.getMe();
  }
});
</script>
<template>
  <div class="flex flex-col w-full h-screen items-center bg-[#F6F6F6]">
    <Toast />
    <div class="w-full bg-[#FFFFFF] flex justify-center">
      <AppTopBar class="layout-container" />
    </div>
    <div class="w-full h-screen overflow-scroll flex justify-center">
      <div class="layout-container flex">
        <div class="hidden md:block flex-grow-0 h-full py-4 pr-2">
          <Leftbar :user="me" />
        </div>
        <div class="py-4 px-2 flex-grow-0">
          <slot />
        </div>
        <div class="hidden md:block flex-grow-0 h-full py-4 pl-2">
          <Rightbar />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout-container {
  max-width: 1440px;
  padding-inline: 4px;
}

// .left-bar-container,
// .right-bar-container {
//   position: sticky;
//   width: 25%;
//   top: 0;
// }

@media (min-width: 992px) and (max-width: 1199px) {
  .layout-container {
    max-width: 992px;
  }
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .layout-container {
    max-width: 992px;
  }

  // .left-bar-container,
  // .right-bar-container {
  //   width: 20%;
  // }
}

@media (min-width: 1400px) and (max-width: 1599px) {
  .layout-container {
    max-width: 1200px;
  }

  // .left-bar-container,
  // .right-bar-container {
  //   width: 25%;
  // }
}
</style>
