<script lang="ts" setup>
import {
  CONNECTOR_ACTION_BLOCK,
  CONNECTOR_ACTION_DISCONNECT,
  CONNECTOR_TYPE,
  CONNECTOR_TYPE_USER,
  RELATIONSHIP_TYPE,
  RELATIONSHIP_TYPE_BLOCKED,
  RELATIONSHIP_TYPE_CONNECTED,
  RELATIONSHIP_TYPE_TOOLTIP,
} from "~/constants/common";
import { COMPANY_TYPE } from "~/constants/company";
import type { ConnectorEntity } from "~/entities/user/user";
import { userStageConnectorStore } from "~/stores/user/connector";

const props = defineProps({
  connector: {
    type: Object as PropType<ConnectorEntity>,
  },
});

const emits = defineEmits(["reload"]);

const store = userStageConnectorStore();
const isLoading = computed(() => store.isLoadingConnect);
const isSucceed = computed(() => store.isSucceedConnect);
const mappingAction = {
  [RELATIONSHIP_TYPE_BLOCKED]: "UNBLOCK",
  [RELATIONSHIP_TYPE_CONNECTED]: "DISCONNECT",
  2: "BLOCK",
};

const action = async (actionType: string) => {
  switch (actionType) {
    case mappingAction[RELATIONSHIP_TYPE_CONNECTED]:
      await store.connect(
        props.connector?.id,
        props.connector?.type,
        CONNECTOR_ACTION_DISCONNECT,
      );
      if (!isLoading.value && isSucceed.value) {
        toastInfo("Tips", "You can follow in the next time!!");
        emits("reload");
      }
      break;

    case mappingAction[RELATIONSHIP_TYPE_BLOCKED]:
      await store.connect(
        props.connector?.id,
        props.connector?.type,
        CONNECTOR_ACTION_DISCONNECT,
      );
      if (!isLoading.value && isSucceed.value) {
        toastInfo("Success", "Let's connect with them again!!🥰");
        emits("reload");
      }
      break;

    case mappingAction[2]:
      await store.connect(
        props.connector?.id,
        props.connector?.type,
        CONNECTOR_ACTION_BLOCK,
      );

      if (!isLoading.value && isSucceed.value) {
        toastInfo("Success", "They can't find your info... Reloading....");
        emits("reload");
      }
      break;

    default:
      break;
  }
};
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
      :href="`/connectors/${props.connector?.type === CONNECTOR_TYPE_USER ? 'user' : 'company'}/${props.connector?.relationship_id}?is_connector=1`"
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
      <span>{{
        CONNECTOR_TYPE[props.connector?.type as keyof typeof CONNECTOR_TYPE]
      }}</span>
    </div>
    <span class="w-full text-center text-sm secondary-text min-h-[48px]">
      {{
        props.connector?.type === CONNECTOR_TYPE_USER
          ? props.connector?.job_position?.name
          : COMPANY_TYPE[
              props.connector?.job_position?.id as keyof typeof COMPANY_TYPE
            ]
      }}
    </span>
    <div class="flex gap-1 w-full">
      <Button
        class="rounded-md flex-1"
        v-tooltip="
          RELATIONSHIP_TYPE_TOOLTIP[
            props.connector
              ?.relationship_type as keyof typeof RELATIONSHIP_TYPE_TOOLTIP
          ]
        "
        :class="{
          'blocked-button w-full':
            props.connector?.relationship_type === RELATIONSHIP_TYPE_BLOCKED,
          'connect-button':
            props.connector?.relationship_type === RELATIONSHIP_TYPE_CONNECTED,
        }"
        :label="
          RELATIONSHIP_TYPE[
            props.connector?.relationship_type as keyof typeof RELATIONSHIP_TYPE
          ]
        "
        @click="
          action(
            mappingAction[
              props.connector?.relationship_type as keyof typeof mappingAction
            ],
          )
        "
      />
      <span
        v-if="
          props.connector?.relationship_type === RELATIONSHIP_TYPE_CONNECTED
        "
        v-tooltip="'Block this user'"
        class="pi pi-ban text-center p-3 flex items-center justify-center rounded-md blocked-button w-[25px] h-[25px] text-md"
        @click="action(mappingAction[2])"
      >
      </span>
    </div>
    <!-- <Button v-else class="common-rounded primary-button" label="Connect" /> -->
  </div>
</template>
<style lang="scss" scoped>
.primary-card {
  &:hover {
    border-color: #11b9b5;
  }
}

.blocked-button {
  background-color: rgb(255, 35, 35);
  border-width: 1px;
  border-color: rgb(255, 35, 35);
  color: white;

  &:hover {
    border-color: rgb(255, 35, 35);
    background-color: white;
    color: rgb(255, 35, 35);
  }
}

.connect-button {
  background-color: white;
  border-width: 1px;
  border-color: #11b9b5;
  color: #666666;

  &:hover {
    background-color: #11b9b5;
    color: white;
  }
}
</style>
