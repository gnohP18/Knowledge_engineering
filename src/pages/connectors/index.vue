<script lang="ts" setup>
import { sleep } from "@whoj/utils-core";
import { CONNECTOR_SAMPLE } from "~/constants/sample";
import type { ConnectorEntity } from "~/entities/user/user";
import ConnectorCard from "~/components/user/ConnectorCard.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import { userStore } from "~/stores/user/user";

definePageMeta({
  layout: "empty",
});
const store = userStore();
const connectors = computed(() => store.suggestConnectors);
const isLoading = computed(() => store.isLoading);

onMounted(async () => {
  await store.getSuggestConnectorList({});
});
</script>

<template>
  <KTALoading v-if="isLoading" />
  <div v-else class="layout-main container">
    <div class="grid grid-cols-8 gap-3">
      <div v-for="connector in connectors">
        <ConnectorCard :connector="connector" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
