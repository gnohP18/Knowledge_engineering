<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";

const items: MenuItem[] = [
  {
    icon: "pi pi-home",
    route: "/",
  },
  {
    icon: "pi pi-users",
    route: "/connectors",
  },
  {
    icon: "pi pi-briefcase",
    route: "/jobs",
  },
  {
    icon: "pi pi-file",
    route: "/applications",
  },
  // {
  //   icon: "pi pi-search",
  //   route: "/login",
  // },
  {
    icon: "pi pi-user",
    route: "/profile",
  },
];
</script>
<template>
  <Menubar :model="items" class="w-full gap-x-4 justify-center text-center">
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
