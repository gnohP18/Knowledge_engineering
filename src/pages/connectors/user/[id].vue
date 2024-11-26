<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import Profile from "~/components/user/Profile.vue";
import { CONNECTOR_TYPE_USER } from "~/constants/common";
import { userStageConnectorStore } from "~/stores/user/connector";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const router = useRouter();
const store = userStageConnectorStore();

const isLoading = computed(() => store.isLoading);
const isConnector = computed(
  () =>
    !isEmpty(route.query.is_connector) &&
    Boolean(Number(route.query.is_connector)) === true,
);

const connector = computed(() => store.connectorUser);

onMounted(async () => {
  if (isConnector.value) {
    await store.getDetailConnector(route.params.id, CONNECTOR_TYPE_USER);
  } else {
    router.push("/");
  }
});
</script>

<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="primary-card">
    <Profile
      :user="connector"
      :is-preview="false"
      :is-blocked="true"
      :is-connector="true"
    />
  </div>
</template>
<style lang="scss" scoped></style>
