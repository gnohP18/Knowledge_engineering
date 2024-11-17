<script lang="ts" setup>
definePageMeta({
  layout: "",
});

const spanArr1 = "Sorry, we are having some technical difficulties...".split(
  " ",
);
const spanArr2 = "We will fix it as soon as possible.".split(" ");
</script>
<template>
  <div
    class="h-screen w-screen flex flex-col sm:flex-row bg-white justify-center gap-2"
  >
    <div class="flex h-full items-center justify-center">
      <img
        :src="'/images/500.jpeg'"
        alt=""
        class="max-w-[300px] max-h-[300px]"
      />
    </div>
    <div class="h-full flex justify-center items-center flex-col">
      <span class="text-[100px] span-primary-hover">500</span>
      <div class="flex flex-wrap items-center gap-x-1 justify-center">
        <span class="text-xl span-primary-hover" v-for="text in spanArr1"
          >{{ text }}
        </span>
      </div>
      <div class="flex flex-wrap items-center gap-x-1">
        <span class="text-xl span-primary-hover" v-for="text in spanArr2"
          >{{ text }}
        </span>
      </div>
      <a class="py-4 flex items-baseline" href="/"
        ><span class="pi pi-arrow-left px-2"></span>BACK TO HOME</a
      >
    </div>
  </div>
</template>
