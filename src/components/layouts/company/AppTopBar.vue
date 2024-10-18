<script lang="ts" setup>
import { DETAIL_COMPANY_SAMPLE } from "~/constants/sample";
import type { CompanyEntity } from "~/entities/user/company";

const props = defineProps({
  companyAuth: {
    type: Object as PropType<CompanyEntity>,
  },
});
</script>
<template>
  <header class="w-full">
    <nav class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
      <div class="flex justify-end items-center">
        <!-- Logo and Company Name -->
        <div class="flex items-center gap-2">
          <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
          >
            {{ props.companyAuth?.name }}
          </span>
          <img
            :src="props.companyAuth?.logo"
            class="mr-3 h-8"
            alt="Company Logo"
          />
        </div>
      </div>
    </nav>
  </header>
</template>
<style lang="scss" scoped>
.menu-item {
  &:hover {
    color: #11b9b5;
  }
}
</style>
