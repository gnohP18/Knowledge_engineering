<script setup lang="ts">
import { MENU_COMPANY } from "~/constants/menu-item";
import AppTopBar from "~/components/layouts/company/AppTopBar.vue";
import type { CompanyEntity } from "~/entities/user/company";
import { DETAIL_COMPANY_SAMPLE } from "~/constants/sample";
import type { MenuItem } from "primevue/menuitem";
import {
  COMPANY_LAST_WORKSPACE,
  COMPANY_TOKEN,
} from "~/constants/authentication";
import { COMPANY_LOGIN } from "~/constants/route";

const companyAuth = ref<CompanyEntity>();
onMounted(() => {
  companyAuth.value = DETAIL_COMPANY_SAMPLE;
});

const router = useRouter();
const route = useRoute();
const items = ref<MenuItem[]>(MENU_COMPANY);

onBeforeMount(() => {
  const keys = items.value.map((item) => item.key);
  const activeMenu = route.fullPath.split("/")[2];
  if (activeMenu) {
    keys.forEach((item) => {
      if (activeMenu === item) {
        expandedKeys.value = {
          [activeMenu]: true,
        };

        return;
      }
    });
  } else {
    expandedKeys.value = {
      [MENU_COMPANY[0].key as keyof MenuItem]: true,
    };
  }
});

const expandedKeys = ref();

const logout = () => {
  setToken(COMPANY_TOKEN, "");
  router.push({ path: COMPANY_LOGIN });
};
</script>
<template>
  <div class="flex flex-col w-screen min-h-screen">
    <!-- Header -->
    <AppTopBar :company-auth="companyAuth" />
    <!-- Main Layout -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-1/6 bg-gray-200 p-2 flex flex-col justify-between">
        <PanelMenu :model="MENU_COMPANY" v-model:expandedKeys="expandedKeys">
          <template #item="{ item }">
            <div class="p-2">
              <a :href="item.route">
                <span :class="[item.icon, 'text-primary']" />
                <span :class="['ml-2']">{{ item.label }}</span>
              </a>
            </div>
          </template>
        </PanelMenu>
        <CommonKTAButton label="Log out" class="w-full" @click="logout" />
      </aside>

      <!-- Main Content -->
      <main class="flex-1 bg-gray-100 p-4">
        <!-- Add your main content here -->
        <slot />
      </main>
    </div>
  </div>
</template>
<style lang="scss" scoped>
:deep(.p-panelmenu .p-panelmenu-panel) {
  margin-bottom: 0px;
  padding: 1px;

  &:hover {
    color: #11b9b5;
  }
}

.menu-item {
  &:hover {
    color: #11b9b5;
  }
}
</style>
