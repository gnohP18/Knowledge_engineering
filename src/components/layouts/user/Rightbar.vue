<script lang="ts" setup>
import { USER_TOKEN } from "~/constants/authentication";
import SuggestConnector from "../../common/SuggestConnector.vue";
import { AuthStore } from "~/stores/user/auth";

const store = AuthStore();

const suggestionConnector = computed(() => store.suggestConnectors);
const urlBg = ref<string>("/images/finding_job_1.gif");
const urlBgArr = [
  "/images/finding_job_1.gif",
  "/images/finding_job_2.gif",
  "/images/finding_job_3.gif",
  "/images/finding_job_4.gif",
];
onMounted(() => {
  urlBg.value = urlBgArr[Math.floor(Math.random() * urlBgArr.length)];
});

const spanArr =
  "Discover free and easy ways to find a great hire, fast. ".split(" ");
</script>
<template>
  <div class="w-full h-full flex flex-col gap-y-2">
    <div class="primary-card max-h-[40%] w-full flex flex-col gap-2">
      <img :src="urlBg" class="common-rounded max-h-[80%]" />
      <div class="w-full flex flex-wrap gap-x-2 justify-center flex-1">
        <span
          v-for="text in spanArr"
          class="span-primary-hover font-normal text-md text-center"
          >{{ text }}</span
        >
      </div>
    </div>
    <div v-if="checkAuth(USER_TOKEN)" class="primary-card w-full flex flex-col">
      <label for="connector" class="w-full text-start p-2 font-bold"
        >People you maybe know:</label
      >
      <SuggestConnector :connectors="suggestionConnector" />
    </div>
    <div class="primary-card h-[20%] flex gap-2 flex-col justify-between p-2">
      <div class="w-full flex-wrap flex gap-2 justify-center">
        <a class="primary-text" href="/">About</a>
        <a class="primary-text" href="/">Accessibility</a>
        <a class="primary-text" href="/">Help center</a>
        <a class="primary-text" href="/">Privacy & Term</a>
        <a class="primary-text" href="/">Advertisement</a>
        <a class="primary-text" href="/">Business Service</a>
      </div>
      <span class="font-bold text-center"> KE Team © 2024 </span>
    </div>
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
