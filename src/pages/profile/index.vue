<script lang="ts" setup>
import ApplicationTab from "~/components/user/ApplicationTab.vue";
import CompleteProfile from "~/components/user/CompleteProfile.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import ProfileTab from "~/components/user/ProfileTab.vue";
import ResumeTab from "~/components/user/ResumeTab.vue";
import { MENU_PROFILE } from "~/constants/menu-item";
import { AuthStore } from "~/stores/user/auth";
import SuggestConnector from "~/components/common/SuggestConnector.vue";
import { userStore } from "~/stores/user/user";

definePageMeta({
  layout: "user",
  middleware: "auth-user",
});

const store = AuthStore();
const userStoreStage = userStore();
const me = computed(() => store.me);
const maybeKnowConnectors = computed(() => store.suggestConnectors);
const isLoading = computed(() => store.isLoading);
const active = ref<number>(2);

onMounted(async () => {
  await store.getMe();
  // await userStoreStage.get
});

const signOut = () => {
  store.resetState();
  store.logout();
};
</script>
<template>
  <KTALoading v-if="isLoading" />
  <div v-else class="w-full flex gap-2">
    <div class="container-card w-[75%] bg-white rounded-2xl p-2">
      <TabMenu v-model:activeIndex="active" :model="MENU_PROFILE" />
      <ApplicationTab v-if="active == 0" />
      <ResumeTab v-if="active == 1" />
      <ProfileTab :user="me" v-if="active == 2 && me" />
    </div>
    <div class="flex flex-1 flex-col gap-2 items-start justify-start">
      <CompleteProfile v-if="me" :user="me" />
      <div class="flex w-full justify-center">
        <a
          href="/profile/preview"
          class="custom-button item-right w-full p-3 bg-white rounded-2xl font-bold gap-2"
        >
          <span class="pi pi-eye font-bold pr-2"></span>Preview profile
        </a>
      </div>
      <label class="w-full p-3 bg-white rounded-2xl font-bold">
        <span class="pi pi-users font-bold pr-2"></span>
        Suggest Connector
        <SuggestConnector
          v-if="maybeKnowConnectors"
          :connectors="maybeKnowConnectors"
        />
      </label>
      <Button
        label="Sign out"
        class="custom-button w-full h-[40px] common-rounded"
        @click="signOut"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
