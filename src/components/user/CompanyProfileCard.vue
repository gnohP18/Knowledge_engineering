<script lang="ts" setup>
import type { CompanyEntity } from "~/entities/user/company";
import { COMPANY_TYPE } from "~/constants/company";
import {
  RELATIONSHIP_TYPE_BLOCKED,
  RELATIONSHIP_TYPE_TOOLTIP,
  RELATIONSHIP_TYPE_CONNECTED,
  RELATIONSHIP_TYPE,
  CONNECTOR_ACTION_DISCONNECT,
  CONNECTOR_ACTION_BLOCK,
  CONNECTOR_TYPE_COMPANY,
} from "~/constants/common";
import { userStageConnectorStore } from "~/stores/user/connector";

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

const connectorStore = userStageConnectorStore();
const isLoading = computed(() => connectorStore.isLoadingConnect);
const isSucceed = computed(() => connectorStore.isSucceedConnect);
// const relationshipType =  computed(() => connectorStore.connectorCompany);
const mappingAction = {
  [RELATIONSHIP_TYPE_BLOCKED]: "UNBLOCK",
  [RELATIONSHIP_TYPE_CONNECTED]: "DISCONNECT",
  2: "BLOCK",
};

const action = async (actionType: string) => {
  if (!props.isConnector) {
    return;
  }

  switch (actionType) {
    case mappingAction[RELATIONSHIP_TYPE_CONNECTED]:
      await connectorStore.connect(
        props.company?.id,
        CONNECTOR_TYPE_COMPANY,
        CONNECTOR_ACTION_DISCONNECT,
      );
      if (!isLoading.value && isSucceed.value) {
        toastInfo("Tips", "You can follow in the next time!!");
        emits("reload", CONNECTOR_ACTION_DISCONNECT);
      }
      break;

    case mappingAction[RELATIONSHIP_TYPE_BLOCKED]:
      // Unblock = disconnect to remove record relationship
      await connectorStore.connect(
        props.company?.id,
        CONNECTOR_TYPE_COMPANY,
        CONNECTOR_ACTION_DISCONNECT,
      );
      if (!isLoading.value && isSucceed.value) {
        toastInfo("Success", "Let's connect with them again!!🥰");
        emits("reload", CONNECTOR_ACTION_DISCONNECT);
      }
      break;

    case mappingAction[2]:
      await connectorStore.connect(
        props.company?.id,
        CONNECTOR_TYPE_COMPANY,
        CONNECTOR_ACTION_BLOCK,
      );

      if (!isLoading.value && isSucceed.value) {
        toastInfo("Success", "They can't find your info... Reloading....");
        emits("reload", CONNECTOR_ACTION_BLOCK);
      }
      break;

    default:
      break;
  }
};
onMounted(() => {});
</script>
<template>
  <div class="flex flex-col justify-center items-center p-4 gap-2">
    <img
      :src="props.company?.logo"
      alt=""
      class="w-[200px] h-[200px] border rounded-md"
    />
    <div class="flex justify-center w-1/3 gap-4">
      <div class="w-1/2 flex justify-between">
        <label class="text-md font-bold">Connectors</label>
        <div class="flex gap-2 items-center">
          <span class="text-md">
            {{
              Number(
                props.company?.connect_company
                  ? props.company?.connect_company.length
                  : 0,
              ) +
              Number(
                props.company?.connect_user
                  ? props.company?.connect_user.length
                  : 0,
              )
            }}</span
          >
          <span class="pi pi-users"> </span>
        </div>
      </div>
    </div>
    <div v-if="props.isConnector" class="flex gap-1 w-[200px] h-[25px]">
      <Button
        class="rounded-md flex-1"
        v-tooltip="
          RELATIONSHIP_TYPE_TOOLTIP[
            props.company
              ?.relationship_type as keyof typeof RELATIONSHIP_TYPE_TOOLTIP
          ]
        "
        :class="{
          'blocked-button w-full':
            props.company?.relationship_type === RELATIONSHIP_TYPE_BLOCKED,
          'connect-button':
            props.company?.relationship_type === RELATIONSHIP_TYPE_CONNECTED,
        }"
        :label="
          RELATIONSHIP_TYPE[
            props.company?.relationship_type as keyof typeof RELATIONSHIP_TYPE
          ]
        "
        @click="
          action(
            mappingAction[
              props.company?.relationship_type as keyof typeof mappingAction
            ],
          )
        "
      />
      <span
        v-if="props.company?.relationship_type === RELATIONSHIP_TYPE_CONNECTED"
        v-tooltip="'Block this user'"
        class="pi pi-ban text-center p-3 flex items-center justify-center rounded-md blocked-button w-[25px] h-[25px] text-md"
        @click="action(mappingAction[2])"
      >
      </span>
    </div>
    <div class="border w-full rounded-md grid grid-cols-4 p-2 gap-y-2">
      <span class="font-bold span-primary-hover text-md">Company name</span>
      <span class="col-span-3 text-xl text-center">{{
        props.company?.name
      }}</span>
      <span class="font-bold span-primary-hover text-md">Name in charge</span>
      <span class="col-span-3">{{ props.company?.name_in_charge }}</span>
      <span class="font-bold span-primary-hover text-md">Phone</span>
      <span class="col-span-3">{{ props.company?.phone }}</span>
      <span class="font-bold span-primary-hover text-md">Email</span>
      <span class="col-span-3">{{ props.company?.email }}</span>
      <span class="font-bold span-primary-hover text-md">Company type</span>
      <span class="col-span-3">{{
        COMPANY_TYPE[props.company?.company_type as keyof typeof COMPANY_TYPE]
      }}</span>
      <span class="font-bold span-primary-hover text-md">Address</span>
      <span class="col-span-3">{{ props.company?.address }}</span>
      <span class="font-bold span-primary-hover text-md">Detail address</span>
      <span class="col-span-3">{{ props.company?.detail_address }}</span>
      <span class="font-bold span-primary-hover text-md">Company size</span>
      <span class="col-span-3">{{ props.company?.size }}</span>
      <span
        v-if="props.company?.accessibility"
        class="font-bold span-primary-hover text-md"
        >Accessibility</span
      >
      <div class="col-span-3 frame-map" v-html="props.company?.accessibility" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.frame-map iframe {
  height: 200px !important;
  width: 100% !important;
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
