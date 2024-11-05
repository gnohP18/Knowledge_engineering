<script lang="ts" setup>
import type { MenuItem } from "primevue/menuitem";
import { USER_TROUBLESHOOTING } from "~/constants/route";

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
    icon: "pi pi-search",
    route: "/jobs",
  },
  {
    icon: "pi pi-file",
    route: "/applications",
  },
  {
    icon: "pi pi-user",
    route: "/profile",
  },
  {
    icon: "pi pi-question-circle",
    route: USER_TROUBLESHOOTING,
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
