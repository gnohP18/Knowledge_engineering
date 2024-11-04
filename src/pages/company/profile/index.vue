<script setup lang="ts">
const pageTitle = "Profile";
useHead({ title: pageTitle });
definePageMeta({
  layout: "company",
  middleware: "auth-company",
});

onMounted(async () => {});
</script>
<template>
  <LayoutsCompanyManageCompanyLayout :screen-name="pageTitle">
  </LayoutsCompanyManageCompanyLayout>
</template>
