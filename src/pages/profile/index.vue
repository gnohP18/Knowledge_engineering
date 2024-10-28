<script lang="ts" setup>
import ApplicationTab from "~/components/user/ApplicationTab.vue";
import ProfileTab from "~/components/user/ProfileTab.vue";
import ResumeTab from "~/components/user/ResumeTab.vue";
import { MENU_PROFILE } from "~/constants/menu-item";
import SuggestConnector from "~/components/common/SuggestConnector.vue";
import CompleteProfile from "~/components/user/CompleteProfile.vue";
import { CONNECTOR_SAMPLE, USER_EXAMPLE } from "~/constants/sample";
import type { ConnectorEntity } from "~/entities/user/user";
import { userStore } from "~/stores/user/user";

definePageMeta({
  layout: "user",
  middleware: "auth-user",
});

const store = userStore();
const user = computed(() => store.user);

const active = ref<number>(2);

const maybeKnowConnectors = ref<ConnectorEntity[]>();

onMounted(async () => {
  await store.getDetail();
});
</script>

<template>
  <div class="w-full flex gap-2">
    <div class="container-card w-[75%] bg-white rounded-2xl p-2">
      <TabMenu v-model:activeIndex="active" :model="MENU_PROFILE" />
      <ApplicationTab v-if="active == 0" />
      <ResumeTab v-if="active == 1" />
      <ProfileTab :user="user" v-if="active == 2" />
    </div>
    <div class="flex flex-1 flex-col gap-2 items-start justify-start">
      <CompleteProfile :user="user" />
      <div class="flex w-full justify-center">
        <a
          href="/profile/preview"
          class="custom-button item-right w-full p-3 bg-white rounded-2xl font-bold gap-2"
        >
          <span class="pi pi-eye font-bold pr-2"></span>Preview profile
        </a>
      </div>
      <!-- <label class="w-full p-3 bg-white rounded-2xl font-bold">
        <span class="pi pi-users font-bold pr-2"></span>
        Suggest Connector
        <SuggestConnector :connectors="maybeKnowConnectors" />
      </label> -->
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
