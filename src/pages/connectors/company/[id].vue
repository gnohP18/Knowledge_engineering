<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import CompanyProfile from "~/components/user/CompanyProfile.vue";
import {
  CONNECTOR_ACTION_DISCONNECT,
  CONNECTOR_TYPE_COMPANY,
} from "~/constants/common";
import { USER_CONNECTOR } from "~/constants/route";
import { companyStore } from "~/stores/user/company";
import { userStageConnectorStore } from "~/stores/user/connector";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const store = userStageConnectorStore();
const useStageCompanyStore = companyStore();
const isConnector = computed(
  () =>
    !isEmpty(route.query.is_connector) &&
    Boolean(Number(route.query.is_connector)) === true,
);
const company = computed(() =>
  isConnector.value ? store.connectorCompany : useStageCompanyStore.company,
);
// const recentlyPostJobs = computed(() => useStageCompanyStore.recentlyPostedJobs);

const isLoading = computed(() =>
  isConnector.value ? store.isLoading : useStageCompanyStore.isLoading,
);
onMounted(async () => {
  if (isConnector.value) {
    await store.getDetailConnector(route.params.id, CONNECTOR_TYPE_COMPANY);
  } else {
    await useStageCompanyStore.getDetail(route.params.id);
  }
});

const router = useRouter();
const reloadConnector = async (actionType: number) => {
  if (actionType === CONNECTOR_ACTION_DISCONNECT) {
    router.push(`${USER_CONNECTOR}/company/${company.value.id}`);
  } else {
    await store.getDetailConnector(route.params.id, CONNECTOR_TYPE_COMPANY);
  }
};
</script>

<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="flex flex-col gap-y-2">
    <div class="primary-card">
      <CompanyProfile
        :company="company"
        :is-connector="isConnector"
        @reload="reloadConnector"
      />
    </div>
    <!-- <div class="flex flex-col gap-2" v-if="recentlyPostJobs.length > 0">
      <label
        class="text-xl font-bold w-full primary-text p-2 primary-card"
        for="recently-post-job"
        >Recently posted job</label 
      >
      <UserJobList :jobs="recentlyPostJobs" />
    </div> -->
  </div>
</template>
<style lang="scss" scoped></style>
