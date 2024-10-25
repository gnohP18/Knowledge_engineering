<script setup>
import AppTopBar from "~/components/layouts/user/AppTopbar.vue";
import Rightbar from "~/components/layouts/user/Rightbar.vue";
import Leftbar from "~/components/layouts/user/Leftbar.vue";
import { USER_TOKEN } from "~/constants/authentication";
import { userStore } from "~/stores/user/user";

const store = userStore();

onMounted(async () => {
  await store.getDetail();
  await store.getSuggestConnector();
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
        <div
          v-if="checkAuth(USER_TOKEN)"
          class="left-bar-container h-full py-4 pr-2"
        >
          <Leftbar />
        </div>
        <div class="flex-1 py-4 px-2">
          <slot />
        </div>
        <div
          v-if="checkAuth(USER_TOKEN)"
          class="right-bar-container h-full py-4 pl-2"
        >
          <Rightbar />
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.layout-container {
  max-width: 1440px;
}

.left-bar-container,
.right-bar-container {
  position: sticky;
  width: 25%;
  top: 0;
}

@media (min-width: 992px) and (max-width: 1199px) {
  .layout-container {
    max-width: 768px;
  }
}

@media (min-width: 1200px) and (max-width: 1399px) {
  .layout-container {
    max-width: 992px;
  }

  .left-bar-container,
  .right-bar-container {
    width: 20%;
  }
}

@media (min-width: 1400px) and (max-width: 1599px) {
  .layout-container {
    max-width: 1200px;
  }

  .left-bar-container,
  .right-bar-container {
    width: 25%;
  }
}
</style>
