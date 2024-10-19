<script lang="ts" setup>
import { sleep } from "@whoj/utils-core";
import { APPLICATION_SAMPLE } from "~/constants/sample";
import type { ApplicationEntity } from "~/entities/user/application";

const props = defineProps({
  applications: {
    type: Array<ApplicationEntity>,
  },
});

const applications = ref<ApplicationEntity[]>([]);
const isLoading = ref<boolean>(false);

onMounted(() => {
  isLoading.value = true;
  sleep(2000);
  applications.value = APPLICATION_SAMPLE;
  isLoading.value = false;
});
</script>
<template>
  <CommonKTALoading v-if="isLoading" />
  <div v-else class="w-full">
    <ApplicationList :applications="applications" />
  </div>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    border-color: #11b9b5;
    border-width: 2px;
  }
}
</style>
