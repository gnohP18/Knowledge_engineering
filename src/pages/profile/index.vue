<script lang="ts" setup>
import SuggestConnector from "~/components/common/SuggestConnector.vue";
import CompleteProfile from "~/components/user/CompleteProfile.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import ProfileTab from "~/components/user/ProfileTab.vue";
import { AuthStore } from "~/stores/user/auth";
import { userStore } from "~/stores/user/user";

useHead({ title: "Profile" });

definePageMeta({
  layout: "user",
  middleware: "auth-user",
});

const store = AuthStore();
const userStoreStage = userStore();
const me = computed(() => userStoreStage.profile);
const maybeKnowConnectors = computed(() => userStoreStage.suggestConnectors);
const isLoading = computed(() => userStoreStage.isLoading);

onMounted(async () => {
  await userStoreStage.getIndexProfile({ Limit: 100 }, { Limit: 100 });
});

const signOut = () => {
  store.resetState();
  store.logout();
};
</script>
<template>
  <KTALoading v-if="isLoading" />
  <div v-else class="w-full h-full flex flex-col md:flex-row gap-2">
    <div class="container-card md:w-[75%] bg-white rounded-2xl p-2">
      <ProfileTab :user="me" />
    </div>
    <div class="flex flex-1 flex-col gap-2 items-start justify-start">
      <!-- <CompleteProfile v-if="me" :user="me" /> -->
      <div class="flex w-full justify-center">
        <a
          href="/profile/preview"
          class="custom-button item-right w-full p-3 bg-white rounded-2xl font-bold gap-2"
        >
          <span class="pi pi-eye font-bold pr-2"></span>Preview profile
        </a>
      </div>
      <div class="w-full p-3 bg-white rounded-2xl font-bold">
        <span class="pi pi-users font-bold pr-2"></span>
        Suggest Connector
        <SuggestConnector
          v-if="maybeKnowConnectors"
          :connectors="maybeKnowConnectors"
        />
      </div>
      <Button
        label="Sign out"
        class="custom-button w-full h-[40px] common-rounded"
        @click="signOut"
      />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
