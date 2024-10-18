<script lang="ts" setup>
import type { CompanyEntity } from "~/entities/user/company";

const props = defineProps({
  company: {
    type: Object as PropType<CompanyEntity>,
  },
});

onMounted(() => {});
</script>
<template>
  <div class="flex flex-col">
    <UserCompanyProfileCard :company="company" />
  </div>
</template>
<style lang="scss" scoped></style>
