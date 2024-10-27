<script lang="ts" setup>
import type { BasicPostEntity } from "~/entities/user/post";

const props = defineProps({
  posts: {
    type: Array<BasicPostEntity>,
    default: [],
  },
});

onMounted(() => {});
</script>
<template>
  <div class="flex flex-col gap-y-6 w-full">
    <div v-for="post in props.posts">
      <Post :post="post" />
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
