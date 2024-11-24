<script lang="ts" setup>
const techStack = [{ url: "/images/techStack/vue.png", alt: "vue" }];
</script>
<template>
  <section class="flex items-center justify-center background-default-45deg">
    <div v-for="image in techStack">
      <img :src="image.url" :alt="image.alt" class="w-[200px] h-[200px]" />
    </div>
  </section>
</template>
<style lang="scss" scoped></style>
