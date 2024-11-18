<script lang="ts" setup>
import { MENU_USER } from "~/constants/menu-item";
</script>
<template>
  <Menubar
    :model="MENU_USER"
    class="w-full gap-x-4 justify-center text-center bg-transparent"
  >
    <template #item="{ item, props, hasSubmenu }">
      <a class="px-10" :href="item.route"
        ><span class="text-xl menu-item" :class="item.icon"></span
      ></a>
    </template>
  </Menubar>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    color: #11b9b5;
  }
}
</style>
