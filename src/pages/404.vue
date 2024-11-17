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
  <div class="flex h-screen w-screen bg-[#f8fcff] items-center justify-center">
    <img
      src="/images/404.png"
      alt=""
      class="object-contain max-w-[450px] max-h-[450px]"
    />
    <a class="py-4 flex items-baseline" href="/"
      ><span class="pi pi-arrow-left px-2"></span>BACK TO HOME</a
    >
  </div>
</template>
