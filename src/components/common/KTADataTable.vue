<script lang="ts" setup>
import * as Pagination from "~/constants/pagination";
import EmptyData from "./EmptyData.vue";
const props = defineProps({
  meta: {
    type: Object,
    default: () => {},
  },
  hasPaginator: {
    type: Boolean,
    default: false,
  },
  queryParams: {
    type: Object,
    default: () => {},
  },
  isEmpty: {
    type: Boolean,
    default: false,
  },
  textEmpty: {
    type: String,
    default: "",
  },
});

const route = useRoute();
const currentPage = ref<number>(1);
const firstRecordIndex = computed(() => {
  return (currentPage.value - 1) * props.meta?.per_page;
});

const onChangePaginator = (event: any) => {
  const query = Object.assign(props.queryParams, {
    page: event.page + 1,
    limit: event.rows,
  });

  navigateTo({ path: route.path, query });
};

watch(
  () => route.query.page,
  (newPage) => {
    currentPage.value = Number(newPage) || 1;
  },
  { immediate: true },
);
</script>

<template>
  <div class="primary-card font-14" style="padding: 0px">
    <DataTable v-bind="$attrs" responsive-layout="scroll">
      <slot name="header" />
      <template #loading>
        <div class="flex items-center justify-center min-h-[500px]">
          <img
            class="w-[35px] h-[35px] animate-spin"
            src="/images/loading.svg"
            alt="Loading icon"
          />
        </div>
      </template>
      <slot v-if="!isEmpty" />
      <EmptyData v-else />
      <template v-if="textEmpty && !isEmpty" #empty>
        <div class="text-center">{{ textEmpty }}</div>
      </template>
    </DataTable>
    <Paginator
      v-if="props.hasPaginator && !isEmpty"
      class="flex justify-end mr-5 font-14"
      :rows="props.meta?.per_page"
      :total-records="props.meta?.total"
      :page-link-size="Pagination.PAGE_LINK_SIZE"
      :first="firstRecordIndex"
      @page="onChangePaginator"
    />
  </div>
</template>

<style lang="scss" scoped>
.font-14 {
  font-size: 0, 875rem;
}

:deep(.p-checkbox),
:deep(.p-checkbox-box) {
  width: 24px;
  height: 24px;
}
</style>
