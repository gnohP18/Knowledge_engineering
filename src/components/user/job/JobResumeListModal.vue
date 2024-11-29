<script lang="ts" setup>
import { isEmpty } from "lodash-es";
import KTADataTable from "~/components/common/KTADataTable.vue";
import * as Pagination from "~/constants/pagination";
import type { BasicResumeEntity } from "~/entities/user/resume";
import { userResumeStore } from "~/stores/user/resume";
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(["close", "choose"]);
const store = userResumeStore();
const isLoading = computed(() => store.isLoading);
const isSucceed = computed(() => store.isSucceed);
const meta = computed(() => store.meta);
const resumes = computed(() => store.resumes);
const selectedRows = ref<BasicResumeEntity[]>([resumes.value[0]]);
interface QueryParamsEntity {
  page?: string;
  limit?: string;
  status?: string;
  keyword?: string;
}
let queryParams = reactive<QueryParamsEntity>({
  page: "1",
  limit: String(Pagination.PAGE_LIMIT_DEFAULT),
});

const close = () => {
  emits("close");
};

const chose = () => {
  emits("choose", selectedRows.value[0].id);
};

const onRowClick = (event: { originalEvent: any; data: { id: number } }) => {
  if (
    event.originalEvent.target.type === "radio" ||
    event.originalEvent.target.closest(".p-radiobutton-icon")
  ) {
    event.originalEvent.stopPropagation();
  } else {
    selectedRows.value = [event.data];
  }
};
</script>
<template>
  <Dialog
    v-model:visible="props.visible"
    modal
    :closable="false"
    :style="{ width: '75rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <template #header>
      <div>Your Resume</div>
    </template>
    <KTADataTable
      v-model:selection="selectedRows"
      :is-empty="isEmpty(resumes)"
      data-key="id"
      :value="resumes"
      :meta="meta"
      :query-params="queryParams"
      :loading="isLoading"
      class="cursor-pointer"
      :lazy="true"
      @row-click="onRowClick"
      has-paginator
    >
      <Column selectionMode="single" headerStyle="width: 3rem"></Column>
      <Column field="id" header="ID" />
      <Column field="name" header="Name" />
    </KTADataTable>
    <div class="flex">
      <Button class="primary-button" label="Chose" @click="chose" />
      <Button class="primary-button" label="Close" @click="close" />
    </div>
  </Dialog>
</template>
