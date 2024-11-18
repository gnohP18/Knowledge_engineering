<script lang="ts" setup>
import ConnectorCard from "~/components/user/ConnectorCard.vue";
import KTALoading from "~/components/common/KTALoading.vue";
import { userStore } from "~/stores/user/user";

definePageMeta({
  layout: "user",
  middleware: ["auth-user"],
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
    <div class="grid grid-cols-2 md:grid-cols-8 gap-3 h-full">
      <div v-for="connector in connectors">
        <ConnectorCard :connector="connector" />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
