<script lang="ts" setup>
import Profile from "~/components/user/Profile.vue";
import { CONNECTOR_TYPE_USER } from "~/constants/common";
import { userStageConnectorStore } from "~/stores/user/connector";

definePageMeta({
  layout: "user",
});
const route = useRoute();
const store = userStageConnectorStore();
const connector = computed(() => store.connectorUser);
const isLoading = computed(() => store.isLoading);

onMounted(async () => {
  await store.getDetailConnector(route.params.id, CONNECTOR_TYPE_USER);
});
</script>

<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="primary-card">
    <Profile :user="connector" :is-preview="true" :is-blocked="true" />
  </div>
</template>
<style lang="scss" scoped></style>
