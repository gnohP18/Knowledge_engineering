<script lang="ts" setup>
import Section1 from "~/components/user/landingPage/Section1.vue";
import Section2 from "~/components/user/landingPage/Section2.vue";
import Section3 from "~/components/user/landingPage/Section3.vue";
import Section4 from "~/components/user/landingPage/Section4.vue";
useHead({ title: "Welcome to Job Finding" });

definePageMeta({
  layout: "default",
});
</script>

<template>
  <div class="h-full w-full flex flex-col">
    <div class="h-screen w-full">
      <Section1 class="h-full w-full" />
    </div>
    <div class="h-screen w-full">
      <Section2 class="h-full w-full" />
    </div>
    <div class="h-screen w-full">
      <Section3 class="h-full w-full" />
    </div>
    <div class="h-screen w-full">
      <Section4 class="h-full w-full" />
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
