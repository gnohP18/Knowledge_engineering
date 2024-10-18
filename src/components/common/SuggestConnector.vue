<script setup lang="ts">
import type { ConnectorEntity } from "~/entities/user/user";
import LimitSpan from "./LimitSpan.vue";
import { LIMIT_NAME_CHARACTERS } from "~/constants/common";

const props = defineProps({
  connectors: {
    type: Array<ConnectorEntity>,
    default: [],
  },
  limitCharacter: {
    type: Number,
    default: LIMIT_NAME_CHARACTERS,
  },
});
</script>

<template>
  <div
    v-if="props.connectors?.length ?? [].length > 0"
    class="primary-card w-full flex-col gap-y-2"
  >
    <div v-for="connector in props.connectors" :key="connector.id">
      <div class="card w-full p-2 flex gap-x-2 items-center">
        <img :src="connector.avatar" class="rounded-full h-[40px] w-[40px]" />
        <div class="flex flex-col flex-1 gap-y-1">
          <a
            v-if="
              `${connector.last_name}${connector.first_name}`.length <=
              props.limitCharacter
            "
            class="primary-text text-sm"
            href="/"
          >
            {{ connector.last_name }} {{ connector.first_name }}
          </a>
          <a
            v-else
            v-tooltip="`${connector.last_name}${connector.first_name}`"
            class="primary-text text-sm"
            href="/"
          >
            {{
              substringWithLimitCharacters(
                `${connector.last_name}${connector.first_name}`,
                props.limitCharacter,
              ).textSub
            }}
            ...
          </a>
          <div class="flex justify-between">
            <LimitSpan
              v-if="connector.connector_position"
              :parent-class="'text-sm'"
              :limit="props.limitCharacter"
              :is-primary-text="false"
              :text="connector.connector_position"
            />
            <Button class="text-xs" icon="pi pi-plus" />
          </div>
        </div>
      </div>
      <hr class="w-full h-[1px]" />
    </div>
  </div>
</template>

<style></style>
