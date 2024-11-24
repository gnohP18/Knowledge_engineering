<script lang="ts" setup>
import type { CompanyEntity } from "~/entities/user/company";
import CompanyProfileCard from "./CompanyProfileCard.vue";

const props = defineProps({
  company: {
    type: Object as PropType<CompanyEntity>,
  },
  isConnector: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["reload"]);

const reload = (actionType: number) => {
  emits("reload", actionType);
};
</script>
<template>
  <div class="flex flex-col">
    <CompanyProfileCard
      :company="props.company"
      :is-connector="props.isConnector"
      @reload="reload"
    />
  </div>
</template>
<style lang="scss" scoped></style>
