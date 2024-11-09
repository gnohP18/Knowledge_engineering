<script setup lang="ts">
import type { ConnectorEntity } from "~/entities/user/user";
import LimitSpan from "./LimitSpan.vue";
import { LIMIT_NAME_CHARACTERS, CONNECTOR_TYPE_USER } from "~/constants/common";
import { COMPANY_TYPE } from "~/constants/company";
import { userStore } from "~/stores/user/user";

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

const userStageStore = userStore();

const connect = (idConnector: number) => {};
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
              connector?.name && connector.name.length <= props.limitCharacter
            "
            class="primary-text text-sm"
            :href="`/connectors/${connector?.type === CONNECTOR_TYPE_USER ? 'user' : 'company'}/${connector?.id}`"
          >
            {{ connector.name }}
          </a>
          <a
            v-else
            v-tooltip="connector.name"
            class="primary-text text-sm"
            href="/"
          >
            {{
              substringWithLimitCharacters(
                connector.name ?? "",
                props.limitCharacter,
              ).textSub
            }}
            ...
          </a>
          <div class="flex justify-between">
            <LimitSpan
              v-if="connector.job_position"
              :parent-class="'text-sm'"
              :limit="props.limitCharacter"
              :is-primary-text="false"
              :text="
                connector.type === CONNECTOR_TYPE_USER
                  ? connector.job_position.name
                  : COMPANY_TYPE[
                      connector.job_position.id as keyof typeof COMPANY_TYPE
                    ]
              "
            />
            <Button
              class="text-xs"
              icon="pi pi-plus"
              @click="connect(connector.id)"
            />
          </div>
        </div>
      </div>
      <hr class="w-full h-[1px]" />
    </div>
  </div>
</template>

<style></style>
