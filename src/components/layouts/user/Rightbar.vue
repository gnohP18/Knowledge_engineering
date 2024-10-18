<script lang="ts" setup>
import { USER_TOKEN } from "~/constants/authentication";
import SuggestConnector from "../../common/SuggestConnector.vue";
import { userStore } from "~/stores/user/user";

const store = userStore();

const suggestionConnector = computed(() => store.suggestConnectors);
</script>
<template>
  <div class="w-full h-full flex flex-col gap-y-2">
    <div class="primary-card h-[30%] w-full"></div>
    <div class="primary-card w-full">
      <label for="connector" class="w-full text-start p-4"
        >People you maybe know:</label
      >
      <SuggestConnector :connectors="suggestionConnector" />
    </div>
    <div class="primary-card h-[20%] w-full"></div>
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
