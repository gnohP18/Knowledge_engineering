<script setup lang="ts">
import { COMPANY_LAST_WORKSPACE } from "~/constants/authentication";
import { COMPANY_INTERVIEW } from "~/constants/route";

useHead({ title: "List interview" });

definePageMeta({ layout: "company" });
onMounted(() => {
  setLastWorkspace(COMPANY_LAST_WORKSPACE, COMPANY_INTERVIEW);
});
</script>
<template>
  <div>a</div>
</template>
