<script setup lang="ts">
import type { ConnectorEntity } from "~/entities/user/user";
import LimitSpan from "./LimitSpan.vue";
import {
  LIMIT_NAME_CHARACTERS,
  CONNECTOR_TYPE_USER,
  CONNECTOR_ACTION_CONNECT,
} from "~/constants/common";
import { COMPANY_TYPE } from "~/constants/company";
import { userStageConnectorStore } from "~/stores/user/connector";

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

const { connectors } = toRefs(props);

const connectorStore = userStageConnectorStore();
const isLoading = computed(() => connectorStore.isLoadingConnect);
const isSucceed = computed(() => connectorStore.isSucceedConnect);

const visibleButtonArr = ref<Object>({});
onMounted(() => {
  connectors.value.forEach((connector) => {
    visibleButtonArr.value[connector.id] = true;
  });
});
const connect = async (idConnector: number, connectorType: number) => {
  console.log(idConnector, connectorType);

  await connectorStore.connect(
    idConnector,
    connectorType,
    CONNECTOR_ACTION_CONNECT,
  );

  if (!isLoading.value && isSucceed.value) {
    toastSuccess("Great!!!", "You have connected...🥳🎉");

    // Reject current connector from suggestion list connectors
    // connectors.value = connectors.value.filter(
    //   (connector) => connector.id !== idConnector,
    // );
    visibleButtonArr.value[idConnector] = false;
  }
};
</script>

<template>
  <div
    v-if="props.connectors?.length ?? [].length > 0"
    class="primary-card w-full flex-col gap-y-2"
  >
    <div v-for="connector in connectors" :key="connector.id">
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
              v-if="visibleButtonArr[connector.id]"
              class="text-xs"
              icon="pi pi-plus"
              @click="connect(connector.id, connector.type)"
            />
          </div>
        </div>
      </div>
      <hr class="w-full h-[1px]" />
    </div>
  </div>
</template>

<style></style>
