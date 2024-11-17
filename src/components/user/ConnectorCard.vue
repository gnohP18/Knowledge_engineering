<script lang="ts" setup>
import { CONNECTOR_TYPE_USER } from "~/constants/common";
import type { ConnectorEntity } from "~/entities/user/user";

const props = defineProps({
  connector: {
    type: Object as PropType<ConnectorEntity>,
  },
});
</script>

<template>
  <div
    class="primary-card border p-2 min-w-150 h-full flex flex-col justify-between items-center gap-2"
  >
    <img
      :src="props.connector?.avatar"
      alt=""
      class="w-[100px] h-[100px] rounded-full border-[2px]"
    />
    <a
      :href="`/connectors/${props.connector?.type === CONNECTOR_TYPE_USER ? 'user' : 'company'}/${props.connector?.id}`"
      class="span-primary-hover w-full text-md text-center min-h-[48px]"
    >
      {{ props.connector?.name }}
    </a>
    <div class="flex gap-2 items-center">
      <span
        v-if="props.connector?.type !== CONNECTOR_TYPE_USER"
        class="pi pi-building"
      />
      <span v-else class="pi pi-user" />
      <span>{{ props.connector?.type }}</span>
    </div>
    <span class="w-full text-center text-sm secondary-text min-h-[48px]">
      {{ props.connector?.type }}
    </span>
    <Button class="common-rounded primary-button" label="Connect" />
  </div>
</template>
<style lang="scss" scoped>
.primary-card {
  &:hover {
    border-color: #11b9b5;
  }
}
</style>
